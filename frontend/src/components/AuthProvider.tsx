'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import LoadingSpinner from './LoadingSpinner';

// Backend API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { token, isAuthenticated, isLoading, setLoading, clearAuth } =
    useAuthStore();

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = async () => {
      if (token && isAuthenticated) {
        setLoading(true);
        try {
          // Verify token with backend
          const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Token verification failed');
          }

          const data = await response.json();
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
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token, isAuthenticated, setLoading, clearAuth]);

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
