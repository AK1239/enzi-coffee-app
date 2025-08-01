'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import { useLoadingStore } from '../../store';

// Navigation items configuration
const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: (
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
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
        />
      </svg>
    ),
  },
  {
    name: 'Menu',
    href: '/dashboard/menu',
    icon: (
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
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>
    ),
  },
  {
    name: 'Orders',
    href: '/dashboard/orders',
    icon: (
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
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    name: 'Sales Analytics',
    href: '/dashboard/sales',
    icon: (
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
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  user: {
    name?: string;
    email?: string;
  } | null;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  user,
}: SidebarProps) {
  const pathname = usePathname();
  const logout = useAuthStore(state => state.logout);
  const { setNavigating } = useLoadingStore();

  const handleLogout = () => {
    logout();
  };

  const handleNavigation = () => {
    setNavigating(true);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile sidebar overlay with improved touch handling */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          style={{ touchAction: 'none' }}
        />
      )}

      {/* Sidebar with improved responsive design */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-80 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:inset-0 lg:w-64 xl:w-72 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ touchAction: 'pan-y' }}
      >
        {/* Sidebar Header with improved mobile spacing */}
        <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 border-b border-slate-700/50">
          <Link href="/dashboard" className="flex items-center space-x-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent truncate block">
                Enzi Coffee
              </span>
            </div>
          </Link>

          {/* Close button for mobile with improved touch target */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 sm:p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors touch-manipulation cursor-pointer"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <svg
              className="w-5 h-5 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation with improved mobile spacing and touch targets */}
        <nav className="mt-6 sm:mt-8 px-3 sm:px-4 flex-1 overflow-y-auto">
          <div className="space-y-2">
            {navigationItems.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavigation}
                  className={`flex items-center space-x-3 px-3 sm:px-4 py-3 sm:py-4 rounded-xl transition-all duration-200 group touch-manipulation cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 text-amber-300 shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white active:bg-slate-700/50'
                  }`}
                  style={{ minHeight: '48px' }}
                >
                  <div
                    className={`transition-colors duration-200 flex-shrink-0 ${
                      isActive
                        ? 'text-amber-400'
                        : 'text-slate-400 group-hover:text-white'
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm sm:text-base truncate flex-1">
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-amber-400 rounded-full animate-pulse flex-shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile Section with improved mobile layout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-xl bg-slate-800/50 backdrop-blur-xl">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white font-semibold text-sm sm:text-base">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-medium text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 sm:p-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-colors touch-manipulation cursor-pointer"
              title="Logout"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
