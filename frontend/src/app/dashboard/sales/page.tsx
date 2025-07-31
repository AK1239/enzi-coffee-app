'use client';

import React from 'react';
import { useSalesDashboard } from '../../../hooks';
import {
  LoadingSpinner,
  SkeletonStats,
  SkeletonTable,
} from '../../../components';
import {
  SalesHeader,
  SalesSummaryCards,
  SalesTabs,
  OrdersTable,
} from '../../../components/dashboard';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import { useLoadingStore } from '../../../store';

export default function SalesDashboardPage() {
  const {
    dailyOrders,
    dailySummary,
    orders,
    isLoading,
    error,
    activeTab,
    selectedDate,
    handleDateChange,
    handleTabChange,
    handleRetry,
  } = useSalesDashboard();
  const { salesLoading, setSalesLoading } = useLoadingStore();

  // Clear loading state when data is loaded
  React.useEffect(() => {
    if (!isLoading && !error) {
      setSalesLoading(false);
    }
  }, [isLoading, error, setSalesLoading]);

  // Show skeleton loading for sales page
  if (salesLoading || isLoading) {
    return (
      <div className="space-y-6">
        {/* Page Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="h-8 bg-slate-700/50 rounded-lg w-56 mb-2 animate-pulse"></div>
            <div className="h-4 bg-slate-700/50 rounded w-72 animate-pulse"></div>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <div className="h-10 bg-slate-700/50 rounded-lg w-32 animate-pulse"></div>
            <div className="h-10 bg-slate-700/50 rounded-lg w-40 animate-pulse"></div>
          </div>
        </div>

        {/* Stats Skeleton */}
        <SkeletonStats />

        {/* Tabs Skeleton */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
          <div className="flex space-x-4 mb-6">
            <div className="h-10 bg-slate-700/50 rounded-lg w-24 animate-pulse"></div>
            <div className="h-10 bg-slate-700/50 rounded-lg w-24 animate-pulse"></div>
          </div>
          <SkeletonTable rows={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
          <p className="text-red-400 font-medium mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header with improved mobile layout */}
      <div className="space-y-4 sm:space-y-6">
        <SalesHeader
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>

      {/* Daily Sales Summary Cards */}
      {dailySummary && (
        <SalesSummaryCards
          dailySummary={dailySummary}
          formatCurrency={formatCurrency}
        />
      )}

      {/* Tab Navigation */}
      <SalesTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'daily' ? (
          <OrdersTable
            orders={dailyOrders}
            title="Today's Orders"
            formatCurrency={formatCurrency}
            formatDate={formatDate}
            emptyMessage="No Orders Today"
            emptyDescription="No orders have been placed today yet."
          />
        ) : (
          <OrdersTable
            orders={orders}
            title="Order History"
            formatCurrency={formatCurrency}
            formatDate={formatDate}
            emptyMessage="No Orders Found"
            emptyDescription="No order history available."
          />
        )}
      </div>
    </div>
  );
}
