import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { isTokenExpired } from '../utils/tokenValidation';

interface UseAuthOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  redirectIfAuthenticated?: boolean;
}

export const useAuth = (options: UseAuthOptions = {}) => {
  const router = useRouter();
  const { isAuthenticated, token, isLoading, clearAuth } = useAuthStore();
  const {
    redirectTo = '/login',
    requireAuth = false,
    redirectIfAuthenticated = false,
  } = options;

  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Don't do anything while loading
    if (isLoading) return;

    // Clear any pending redirect
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
    }

    // Check if token is expired (local check only, no API call)
    if (token && isTokenExpired(token)) {
      clearAuth();
      if (requireAuth) {
        redirectTimeoutRef.current = setTimeout(() => {
          router.replace(redirectTo);
        }, 100);
      }
      return;
    }

    // Handle authentication requirements
    if (requireAuth && !isAuthenticated) {
      redirectTimeoutRef.current = setTimeout(() => {
        router.replace(redirectTo);
      }, 100);
      return;
    }

    // Handle redirect if already authenticated (for login/register pages)
    if (redirectIfAuthenticated && isAuthenticated) {
      redirectTimeoutRef.current = setTimeout(() => {
        router.replace('/dashboard');
      }, 100);
      return;
    }
  }, [
    isAuthenticated,
    token,
    isLoading,
    requireAuth,
    redirectIfAuthenticated,
    redirectTo,
    router,
    clearAuth,
  ]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  return {
    isAuthenticated,
    isLoading,
    token,
    user: useAuthStore(state => state.user),
  };
};
