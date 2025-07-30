'use client';

import { useAuth } from '../../hooks';
import { ProtectedRoute } from '../../components';

export default function DashboardPage() {
  const { user } = useAuth({ requireAuth: true });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8">
            <h1 className="text-4xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            
            <div className="text-white">
              <p className="text-lg mb-4">
                Welcome back, <span className="text-amber-300 font-semibold">{user?.name}</span>!
              </p>
              
              <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-amber-300 mb-4">
                  Protected Route Test
                </h2>
                <p className="text-gray-300">
                  If you can see this page, the authentication middleware is working correctly!
                </p>
                <p className="text-gray-300 mt-2">
                  This page is protected and only accessible to authenticated users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 