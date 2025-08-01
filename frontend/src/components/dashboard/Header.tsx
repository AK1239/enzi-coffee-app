'use client';

import { usePathname } from 'next/navigation';
import { useCartStore, useLoadingStore } from '../../store';

// Navigation items for header title mapping
const navigationItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Menu', href: '/dashboard/menu' },
  { name: 'Orders', href: '/dashboard/orders' },
  { name: 'Sales Analytics', href: '/dashboard/sales' },
  { name: 'Settings', href: '/dashboard/settings' },
];

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  user: {
    name?: string;
    email?: string;
  } | null;
}

export default function Header({ setSidebarOpen, user }: HeaderProps) {
  const pathname = usePathname();
  const currentPage =
    navigationItems.find(item => item.href === pathname)?.name || 'Dashboard';
  const { toggleCart, getItemCount } = useCartStore();
  const { isNavigating } = useLoadingStore();

  return (
    <header className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-lg">
      <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6">
        {/* Mobile menu button with improved touch target */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 sm:p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors touch-manipulation"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          <svg
            className="w-6 h-6 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Page Title with improved responsive layout */}
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1 lg:flex-none ml-2 sm:ml-4">
          <div className="flex items-center space-x-2 min-w-0">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">
              {currentPage}
            </h1>
            {isNavigating && (
              <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
            )}
          </div>
          <div className="hidden sm:block w-px h-6 bg-slate-600 flex-shrink-0" />
          <p className="hidden sm:block text-sm text-slate-400 truncate flex-shrink-0">
            Welcome back, {user?.name}
          </p>
        </div>

        {/* Header Actions with improved mobile layout */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Cart Button with improved touch target */}
          <button
            onClick={toggleCart}
            className="flex items-center justify-center relative p-2 sm:p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-colors touch-manipulation"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
              />
            </svg>
            {getItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {getItemCount() > 99 ? '99+' : getItemCount()}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
