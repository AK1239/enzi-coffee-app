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
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
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

        {/* Page Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white">{currentPage}</h1>
            {isNavigating && (
              <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
          <div className="hidden sm:block w-px h-6 bg-slate-600" />
          <p className="hidden sm:block text-sm text-slate-400">
            Welcome back, {user?.name}
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-3">
          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-colors"
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

          {/* Notifications */}
          <button className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-colors">
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
                d="M15 17h5l-5 5v-5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </button>

          {/* Quick Actions */}
          <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-medium shadow-lg">
            New Order
          </button>
        </div>
      </div>
    </header>
  );
}
