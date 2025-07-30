'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import LoadingSpinner from '../LoadingSpinner';
import { isTokenExpired } from '../../utils/tokenValidation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  fallback,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, token, isLoading, clearAuth } = useAuthStore();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      // If not authenticated, redirect immediately
      if (!isAuthenticated || !token) {
        router.push(redirectTo);
        return;
      }

      // Check if token is expired
      if (isTokenExpired(token)) {
        clearAuth();
        router.push(redirectTo);
        return;
      }

      // Token is valid, allow access
      setIsValidating(false);
    };

    // Only validate if we're not already loading
    if (!isLoading) {
      validateAuth();
    }
  }, [isAuthenticated, token, isLoading, router, redirectTo, clearAuth]);

  // Show loading spinner while validating
  if (isLoading || isValidating) {
    return (
      fallback || (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-amber-300 font-medium">Validating authentication...</p>
          </div>
        </div>
      )
    );
  }

  // If not authenticated, don't render children
  if (!isAuthenticated || !token) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
} 