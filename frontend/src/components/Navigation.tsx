'use client';

import { useAuthStore } from '../store/authStore';
import { useNavigationWithLoading } from '../hooks';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { navigateWithLoading } = useNavigationWithLoading();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
  };

  const handleNavigation = (href: string, message?: string) => {
    navigateWithLoading(href, message);
  };

  // Don't show navigation on auth pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <nav className="z-50 backdrop-blur-xl bg-black/20 border-b border-white/10 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand with improved mobile layout */}
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300">
                <span className="text-white text-lg sm:text-xl font-bold">
                  ☕
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-orange-400 rounded-2xl blur opacity-50 animate-pulse"></div>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400 bg-clip-text text-transparent truncate block">
                Enzi Coffee
              </span>
              <div className="text-xs text-amber-300/60 font-medium tracking-wider hidden sm:block">
                PROFESSIONAL POS
              </div>
            </div>
          </div>

          {/* Navigation Links with improved responsive design */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() =>
                    handleNavigation('/dashboard', 'Loading Dashboard...')
                  }
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    pathname === '/dashboard'
                      ? 'bg-amber-800/50 text-white backdrop-blur-xl'
                      : 'text-amber-100 hover:bg-amber-800/50 hover:text-white backdrop-blur-xl'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() =>
                    handleNavigation('/dashboard/sales', 'Loading Sales...')
                  }
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer mr-8 ${
                    pathname === '/dashboard/sales'
                      ? 'bg-amber-800/50 text-white backdrop-blur-xl'
                      : 'text-amber-100 hover:bg-amber-800/50 hover:text-white backdrop-blur-xl'
                  }`}
                >
                  Sales
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    handleNavigation('/login', 'Loading Sign In...')
                  }
                  className="text-amber-300 hover:text-amber-100 font-medium transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/5 cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() =>
                    handleNavigation('/register', 'Loading Registration...')
                  }
                  className="relative group bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </>
            )}
          </div>

          {/* User Menu with improved mobile layout */}
          {isAuthenticated && user && (
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-xs sm:text-sm hidden sm:block">
                <span className="text-amber-200">Welcome, </span>
                <span className="font-medium text-white truncate">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium text-amber-100 hover:bg-amber-800/50 hover:text-white transition-colors backdrop-blur-xl touch-manipulation cursor-pointer"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">↪</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
