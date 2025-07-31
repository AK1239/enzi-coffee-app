// Error handling utilities

export interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
  isNetworkError?: boolean;
  errors?: Record<string, string[]>;
}

export interface ValidationErrors {
  [key: string]: string[];
}

/**
 * Error types for better error categorization
 */
export enum ErrorType {
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  VALIDATION = 'VALIDATION',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

/**
 * Get error type from API error
 */
export const getErrorType = (error: unknown): ErrorType => {
  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError;

    if (apiError.isNetworkError) {
      return ErrorType.NETWORK;
    }

    switch (apiError.status) {
      case 400:
        return ErrorType.VALIDATION;
      case 401:
        return ErrorType.AUTHENTICATION;
      case 403:
        return ErrorType.AUTHORIZATION;
      case 404:
        return ErrorType.NOT_FOUND;
      case 409:
        return ErrorType.CONFLICT;
      case 500:
      case 502:
      case 503:
      case 504:
        return ErrorType.SERVER;
      default:
        return ErrorType.UNKNOWN;
    }
  }
  return ErrorType.UNKNOWN;
};

/**
 * Process authentication errors and return user-friendly messages
 */
export const processAuthError = (error: unknown): string => {
  const errorType = getErrorType(error);

  switch (errorType) {
    case ErrorType.NETWORK:
      return 'Network error. Please check your connection and try again.';
    case ErrorType.AUTHENTICATION:
      return 'Invalid email or password. Please try again.';
    case ErrorType.VALIDATION:
      return 'Please check your input and try again.';
    case ErrorType.SERVER:
      return 'Server error. Please try again later.';
    default:
      if (typeof error === 'object' && error !== null) {
        const apiError = error as ApiError;
        return apiError.message || 'An unexpected error occurred. Please try again.';
      }
      return 'An unexpected error occurred. Please try again.';
  }
};

/**
 * Process general API errors and return user-friendly messages
 */
export const processApiError = (error: unknown): string => {
  const errorType = getErrorType(error);

  switch (errorType) {
    case ErrorType.NETWORK:
      return 'Network error. Please check your connection and try again.';
    case ErrorType.AUTHENTICATION:
      return 'Please log in again to continue.';
    case ErrorType.AUTHORIZATION:
      return 'You do not have permission to perform this action.';
    case ErrorType.VALIDATION:
      return 'Please check your input and try again.';
    case ErrorType.NOT_FOUND:
      return 'The requested resource was not found.';
    case ErrorType.CONFLICT:
      return 'This resource already exists or conflicts with existing data.';
    case ErrorType.SERVER:
      return 'Server error. Please try again later.';
    default:
      if (typeof error === 'object' && error !== null) {
        const apiError = error as ApiError;
        return apiError.message || 'An unexpected error occurred. Please try again.';
      }
      return 'An unexpected error occurred. Please try again.';
  }
};

/**
 * Extract validation errors from API error response
 */
export const extractValidationErrors = (error: unknown): ValidationErrors => {
  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError;
    return apiError.errors || {};
  }
  return {};
};

/**
 * Check if error is a network error
 */
export const isNetworkError = (error: unknown): boolean => {
  return getErrorType(error) === ErrorType.NETWORK;
};

/**
 * Check if error is an authentication error
 */
export const isAuthError = (error: unknown): boolean => {
  return getErrorType(error) === ErrorType.AUTHENTICATION;
};

/**
 * Check if error is a validation error
 */
export const isValidationError = (error: unknown): boolean => {
  return getErrorType(error) === ErrorType.VALIDATION;
};

/**
 * Check if error is a server error
 */
export const isServerError = (error: unknown): boolean => {
  return getErrorType(error) === ErrorType.SERVER;
};

/**
 * Get error icon based on error type
 */
export const getErrorIcon = (errorType: ErrorType): string => {
  switch (errorType) {
    case ErrorType.NETWORK:
      return '🌐';
    case ErrorType.AUTHENTICATION:
      return '🔐';
    case ErrorType.AUTHORIZATION:
      return '🚫';
    case ErrorType.VALIDATION:
      return '⚠️';
    case ErrorType.NOT_FOUND:
      return '🔍';
    case ErrorType.CONFLICT:
      return '⚡';
    case ErrorType.SERVER:
      return '🛠️';
    default:
      return '❌';
  }
};

/**
 * Get error color class based on error type
 */
export const getErrorColorClass = (errorType: ErrorType): string => {
  switch (errorType) {
    case ErrorType.NETWORK:
      return 'text-blue-400 bg-blue-500/10 border-blue-400/30';
    case ErrorType.AUTHENTICATION:
      return 'text-yellow-400 bg-yellow-500/10 border-yellow-400/30';
    case ErrorType.AUTHORIZATION:
      return 'text-orange-400 bg-orange-500/10 border-orange-400/30';
    case ErrorType.VALIDATION:
      return 'text-amber-400 bg-amber-500/10 border-amber-400/30';
    case ErrorType.NOT_FOUND:
      return 'text-gray-400 bg-gray-500/10 border-gray-400/30';
    case ErrorType.CONFLICT:
      return 'text-purple-400 bg-purple-500/10 border-purple-400/30';
    case ErrorType.SERVER:
      return 'text-red-400 bg-red-500/10 border-red-400/30';
    default:
      return 'text-red-400 bg-red-500/10 border-red-400/30';
  }
};

/**
 * Format validation errors for display
 */
export const formatValidationErrors = (errors: ValidationErrors): string[] => {
  const formattedErrors: string[] = [];
  
  Object.entries(errors).forEach(([field, fieldErrors]) => {
    fieldErrors.forEach(error => {
      formattedErrors.push(`${field}: ${error}`);
    });
  });
  
  return formattedErrors;
};

/**
 * Create a standardized error object
 */
export const createError = (
  message: string,
  status?: number,
  errors?: ValidationErrors
): ApiError => {
  return {
    message,
    status,
    errors,
    isNetworkError: false,
  };
};

/**
 * Create a network error object
 */
export const createNetworkError = (message?: string): ApiError => {
  return {
    message: message || 'Network error. Please check your connection.',
    isNetworkError: true,
  };
};
