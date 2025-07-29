import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { LoginCredentials, RegisterCredentials } from '../types';
import {
  validateLoginForm,
  validateRegisterForm,
  hasValidationErrors,
  ValidationError,
} from '../utils/validation';
import { processAuthError } from '../utils/errorHandling';

interface UseAuthFormOptions {
  onSuccess?: () => void;
  redirectTo?: string;
}

export const useAuthForm = (options: UseAuthFormOptions = {}) => {
  const router = useRouter();
  const { login, register, isAuthenticated, isLoading } = useAuthStore();

  const [errors, setErrors] = useState<ValidationError>({});
  const [submitError, setSubmitError] = useState<string>('');

  const clearErrors = useCallback(() => {
    setErrors({});
    setSubmitError('');
  }, []);

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      clearErrors();

      // Validate form
      const validationErrors = validateLoginForm(credentials);
      if (hasValidationErrors(validationErrors)) {
        setErrors(validationErrors);
        return false;
      }

      try {
        const success = await login(credentials);

        if (success) {
          const redirectPath = options.redirectTo || '/dashboard';
          router.push(redirectPath);
          options.onSuccess?.();
          return true;
        } else {
          setSubmitError('Invalid email or password. Please try again.');
          return false;
        }
      } catch (error) {
        const errorMessage = processAuthError(error);
        setSubmitError(errorMessage);
        return false;
      }
    },
    [login, router, clearErrors, options]
  );

  const handleRegister = useCallback(
    async (credentials: RegisterCredentials) => {
      clearErrors();

      // Validate form
      const validationErrors = validateRegisterForm(credentials);
      if (hasValidationErrors(validationErrors)) {
        setErrors(validationErrors);
        return false;
      }

      try {
        const success = await register(credentials);

        if (success) {
          const redirectPath = options.redirectTo || '/dashboard';
          router.push(redirectPath);
          options.onSuccess?.();
          return true;
        } else {
          setSubmitError('Registration failed. Please try again.');
          return false;
        }
      } catch (error) {
        const errorMessage = processAuthError(error);
        setSubmitError(errorMessage);
        return false;
      }
    },
    [register, router, clearErrors, options]
  );

  const clearFieldError = useCallback(
    (fieldName: string) => {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });

      if (submitError) {
        setSubmitError('');
      }
    },
    [submitError]
  );

  return {
    // State
    errors,
    submitError,
    isLoading,
    isAuthenticated,

    // Actions
    handleLogin,
    handleRegister,
    clearErrors,
    clearFieldError,
    setErrors,
    setSubmitError,
  };
};
