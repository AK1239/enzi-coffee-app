import React from 'react';
import {
  ErrorType,
  getErrorType,
  getErrorIcon,
  getErrorColorClass,
  extractValidationErrors,
  formatValidationErrors,
} from '../utils/errorHandling';

interface ErrorDisplayProps {
  error: unknown;
  title?: string;
  onRetry?: () => void;
  className?: string;
  showIcon?: boolean;
  showDetails?: boolean;
}

export default function ErrorDisplay({
  error,
  title,
  onRetry,
  className = '',
  showIcon = true,
  showDetails = false,
}: ErrorDisplayProps) {
  const errorType = getErrorType(error);
  const errorIcon = getErrorIcon(errorType);
  const colorClass = getErrorColorClass(errorType);
  
  // Get error message
  let errorMessage = 'An unexpected error occurred';
  if (typeof error === 'object' && error !== null) {
    const apiError = error as any;
    errorMessage = apiError.message || errorMessage;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  // Get validation errors if any
  const validationErrors = extractValidationErrors(error);
  const formattedValidationErrors = formatValidationErrors(validationErrors);

  return (
    <div className={`rounded-xl border p-6 ${colorClass} ${className}`}>
      <div className="flex items-start space-x-3">
        {showIcon && (
          <div className="flex-shrink-0 text-2xl">{errorIcon}</div>
        )}
        
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
          )}
          
          <p className="text-sm leading-relaxed">{errorMessage}</p>
          
          {/* Show validation errors if any */}
          {formattedValidationErrors.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Please fix the following issues:</p>
              <ul className="space-y-1">
                {formattedValidationErrors.map((error, index) => (
                  <li key={index} className="text-sm flex items-center">
                    <span className="w-1 h-1 rounded-full mr-2 opacity-60"></span>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Show error details in development */}
          {showDetails && process.env.NODE_ENV === 'development' && (
            <details className="mt-4">
              <summary className="text-sm cursor-pointer hover:opacity-80">
                Error Details
              </summary>
              <pre className="mt-2 text-xs bg-black/20 p-3 rounded-lg overflow-auto">
                {JSON.stringify(error, null, 2)}
              </pre>
            </details>
          )}
          
          {/* Retry button */}
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Specialized error components for common use cases
export function NetworkError({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  return (
    <ErrorDisplay
      error={error}
      title="Connection Error"
      onRetry={onRetry}
      showIcon={true}
    />
  );
}

export function ValidationError({ error }: { error: unknown }) {
  return (
    <ErrorDisplay
      error={error}
      title="Validation Error"
      showIcon={true}
    />
  );
}

export function ServerError({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  return (
    <ErrorDisplay
      error={error}
      title="Server Error"
      onRetry={onRetry}
      showIcon={true}
    />
  );
}

export function AuthError({ error }: { error: unknown }) {
  return (
    <ErrorDisplay
      error={error}
      title="Authentication Error"
      showIcon={true}
    />
  );
} 