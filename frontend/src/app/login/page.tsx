'use client';

import { useEffect } from 'react';
import { useAuth } from '../../hooks';
import { useLoadingStore } from '../../store/loadingStore';
import { LoginForm, Navigation } from '../../components';
import LoadingSpinner from '../../components/LoadingSpinner';
import BackgroundEffects from '../../components/BackgroundEffects';

export default function LoginPage() {
  const { isLoading } = useAuth({ redirectIfAuthenticated: true });
  const { setNavigating, setPageLoading } = useLoadingStore();

  // Clear loading states when page mounts, but only if not already loading
  useEffect(() => {
    setNavigating(false);
    // Don't clear page loading if it was set by the form
    // The form will handle clearing it on success/failure
  }, [setNavigating]);

  // Show loading spinner if authentication is being checked
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 relative overflow-hidden">
        <BackgroundEffects scrollY={0} />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-amber-300 font-medium">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 relative overflow-hidden">
      {/* Dynamic gradient overlays */}
      <BackgroundEffects scrollY={0} />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            {/* Floating badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl border border-amber-400/30 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-medium">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span>Welcome Back</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent drop-shadow-2xl">
                Sign In
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Access your{' '}
              <span className="text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text font-semibold">
                Enzi Coffee Shop
              </span>{' '}
              dashboard
            </p>
          </div>

          {/* Login Form */}
          <LoginForm redirectTo="/dashboard" />
        </div>
      </div>
    </div>
  );
}
