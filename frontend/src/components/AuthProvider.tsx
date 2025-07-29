'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import LoadingSpinner from './LoadingSpinner';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { token, isAuthenticated, isLoading, setLoading } = useAuthStore();

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = async () => {
      if (token && isAuthenticated) {
        setLoading(true);
        try {
          // TODO: Verify token with backend when API client is set up
          // For now, we'll assume the token is valid if it exists
          // In a real app, you'd make a request to /auth/me to verify the token
          console.log('Token exists, user is authenticated');
        } catch (error) {
          console.error('Token verification failed:', error);
          // If token verification fails, clear auth state
          useAuthStore.getState().clearAuth();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token, isAuthenticated, setLoading]);

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
