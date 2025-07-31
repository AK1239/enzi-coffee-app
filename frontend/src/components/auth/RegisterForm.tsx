import { useState } from 'react';
import Link from 'next/link';
import { RegisterCredentials } from '../../types';
import { useAuthForm } from '../../hooks/useAuthForm';
import { useNavigationWithLoading } from '../../hooks';
import LoadingSpinner from '../LoadingSpinner';

interface RegisterFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export default function RegisterForm({
  onSuccess,
  redirectTo,
}: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { errors, submitError, isLoading, handleRegister, clearFieldError } =
    useAuthForm({
      onSuccess: () => {
        onSuccess?.();
      },
      redirectTo,
    });

  const { navigateWithLoading } = useNavigationWithLoading();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      clearFieldError(name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Set loading state for registration process
    const success = await handleRegister(formData);

    if (success) {
      // Use loading navigation to redirect to dashboard
      navigateWithLoading('/dashboard', 'Welcome aboard! Loading dashboard...');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {/* Glassmorphism form container */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-transparent rounded-3xl"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Name Field */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-amber-200 mb-3"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-xl border-2 ${
                  errors.name
                    ? 'border-red-400/50 focus:border-red-400'
                    : 'border-white/20 focus:border-amber-400/50'
                } rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {errors.name}
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-amber-200 mb-3"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-xl border-2 ${
                  errors.email
                    ? 'border-red-400/50 focus:border-red-400'
                    : 'border-white/20 focus:border-amber-400/50'
                } rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-amber-200 mb-3"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-xl border-2 ${
                  errors.password
                    ? 'border-red-400/50 focus:border-red-400'
                    : 'border-white/20 focus:border-amber-400/50'
                } rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300`}
                placeholder="Create a password (min. 6 characters)"
              />

              {/* Show/Hide Password Button */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-300 transition-colors duration-200 focus:outline-none focus:text-amber-300"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>

              {errors.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          {/* Submit Error */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-500/10 backdrop-blur-xl border border-red-400/30 rounded-2xl">
              <p className="text-sm text-red-300 flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                {submitError}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="space-y-4">
        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-300 text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() =>
                navigateWithLoading('/login', 'Loading Sign In...')
              }
              className="font-semibold text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text hover:from-amber-200 hover:to-orange-300 transition-all duration-300"
            >
              Sign in here
            </button>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => navigateWithLoading('/', 'Loading Home...')}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-amber-300 transition-colors duration-300 text-sm"
          >
            <span>←</span>
            <span>Back to home</span>
          </button>
        </div>
      </div>
    </form>
  );
}
