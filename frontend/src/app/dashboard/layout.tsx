'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks';
import {
  LoadingSpinner,
  LoadingOverlay,
  Sidebar,
  Header,
  Cart,
} from '../../components';
import { useCartStore, useLoadingStore } from '../../store';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading } = useAuth({ requireAuth: true });
  const { setNavigating, setPageLoading } = useLoadingStore();

  // Clear navigation state when dashboard mounts, but preserve page loading
  useEffect(() => {
    setNavigating(false);
    // Don't clear page loading here - let the navigation system handle it
  }, [setNavigating]);

  const { isNavigating } = useLoadingStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-amber-300 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <Header setSidebarOpen={setSidebarOpen} user={user} />

          {/* Page Content with improved mobile spacing */}
          <main className="p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>

        {/* Cart Component */}
        <Cart />
      </div>
      {/* Loading Overlay for Navigation */}
      <LoadingOverlay isVisible={isNavigating} message="Loading..." />
    </>
  );
}
