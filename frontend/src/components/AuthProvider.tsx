'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../lib/api';
import LoadingSpinner from './LoadingSpinner';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { token, isAuthenticated, isLoading, setLoading, clearAuth } =
    useAuthStore();

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = async () => {
      if (token && isAuthenticated && !isLoading) {
        setLoading(true);
        try {
          // Verify token with backend using API client
          const data = await apiClient.auth.me();

          if (data.success && data.data?.user) {
            // Token is valid, update user data if needed
            useAuthStore.getState().setUser(data.data.user);
          } else {
            throw new Error('Invalid response from server');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          // If token verification fails, clear auth state
          clearAuth();
        } finally {
          setLoading(false);
        }
      } else if (!token && !isAuthenticated) {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token, isAuthenticated, setLoading, clearAuth, isLoading]);

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
