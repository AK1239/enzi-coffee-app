'use client';

import { useState } from 'react';
import { useAuth } from '../../hooks';
import {
  ProtectedRoute,
  LoadingSpinner,
  Sidebar,
  Header,
} from '../../components';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading } = useAuth({ requireAuth: true });

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
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <Header setSidebarOpen={setSidebarOpen} user={user} />

          {/* Page Content */}
          <main className="p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
