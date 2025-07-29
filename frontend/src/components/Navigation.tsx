'use client';

import { useAuthStore } from '../store/authStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
  };

  // Don't show navigation on auth pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <nav className="relative z-50 backdrop-blur-xl bg-black/20 border-b border-white/10 sticky top-0">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300">
                <span className="text-white text-xl font-bold">☕</span>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-orange-400 rounded-2xl blur opacity-50 animate-pulse"></div>
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400 bg-clip-text text-transparent">
                Enzi Coffee
              </span>
              <div className="text-xs text-amber-300/60 font-medium tracking-wider">
                PROFESSIONAL POS
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === '/dashboard'
                      ? 'bg-amber-800/50 text-white backdrop-blur-xl'
                      : 'text-amber-100 hover:bg-amber-800/50 hover:text-white backdrop-blur-xl'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/sales"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === '/dashboard/sales'
                      ? 'bg-amber-800/50 text-white backdrop-blur-xl'
                      : 'text-amber-100 hover:bg-amber-800/50 hover:text-white backdrop-blur-xl'
                  }`}
                >
                  Sales
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-amber-300 hover:text-amber-100 font-medium transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/5"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="relative group bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          {isAuthenticated && user && (
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-amber-200">Welcome, </span>
                <span className="font-medium text-white">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-amber-100 hover:bg-amber-800/50 hover:text-white transition-colors backdrop-blur-xl"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
