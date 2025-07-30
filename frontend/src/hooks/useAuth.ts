import { useEffect } from 'react';
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

  useEffect(() => {
    // Don't do anything while loading
    if (isLoading) return;

    // Check if token is expired
    if (token && isTokenExpired(token)) {
      clearAuth();
      if (requireAuth) {
        router.push(redirectTo);
      }
      return;
    }

    // Handle authentication requirements
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Handle redirect if already authenticated (for login/register pages)
    if (redirectIfAuthenticated && isAuthenticated) {
      router.push('/dashboard');
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

  return {
    isAuthenticated,
    isLoading,
    token,
    user: useAuthStore(state => state.user),
  };
}; 