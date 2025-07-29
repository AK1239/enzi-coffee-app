// Error handling utilities

export interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
  isNetworkError?: boolean;
}

/**
 * Process authentication errors and return user-friendly messages
 */
export const processAuthError = (error: unknown): string => {
  // Handle API errors
  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError;

    if (apiError.isNetworkError) {
      return 'Network error. Please check your connection and try again.';
    }

    if (apiError.status === 401) {
      return 'Invalid email or password. Please try again.';
    }

    if (apiError.status === 409) {
      return 'Email already registered. Please use a different email or try logging in.';
    }

    if (apiError.message) {
      return apiError.message;
    }
  }

  // Handle generic errors
  if (error instanceof Error) {
    return error.message;
  }

  // Fallback error message
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Check if error is a network error
 */
export const isNetworkError = (error: unknown): boolean => {
  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError;
    return apiError.isNetworkError === true;
  }
  return false;
};

/**
 * Check if error is an authentication error
 */
export const isAuthError = (error: unknown): boolean => {
  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError;
    return apiError.status === 401;
  }
  return false;
};

/**
 * Check if error is a validation error
 */
export const isValidationError = (error: unknown): boolean => {
  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError;
    return apiError.status === 400;
  }
  return false;
};
