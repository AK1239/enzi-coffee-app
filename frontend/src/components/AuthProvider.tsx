'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../lib/api';
import LoadingSpinner from './LoadingSpinner';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { token, isAuthenticated, isLoading, setLoading, clearAuth } =
    useAuthStore();
  const isCheckingAuth = useRef(false);

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = async () => {
      // Prevent multiple simultaneous auth checks
      if (isCheckingAuth.current) return;

      // Only check if we have a token and are authenticated, but not currently loading
      if (token && isAuthenticated && !isLoading) {
        isCheckingAuth.current = true;
        setLoading(true);
        try {
          // Verify token with backend using API client
          const data = await apiClient.auth.me();

          if (data.success && data.data?.user) {
            // Token is valid, update user data if needed
            // Only update if user data is different to avoid unnecessary re-renders
            const currentUser = useAuthStore.getState().user;
            if (
              !currentUser ||
              JSON.stringify(currentUser) !== JSON.stringify(data.data.user)
            ) {
              useAuthStore.getState().setUser(data.data.user);
            }
          } else {
            throw new Error('Invalid response from server');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          // If token verification fails, clear auth state
          clearAuth();
        } finally {
          setLoading(false);
          isCheckingAuth.current = false;
        }
      } else if (!token && !isAuthenticated && isLoading) {
        // If no token and not authenticated but still loading, stop loading
        setLoading(false);
        isCheckingAuth.current = false;
      }
    };

    checkAuth();
  }, [token, isAuthenticated, setLoading, clearAuth]); // Removed isLoading from dependencies

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-amber-800 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
