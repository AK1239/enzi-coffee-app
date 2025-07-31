'use client';

import { useAuth } from '../../../hooks';
import { useSalesDashboard } from '../../../hooks';
import { LoadingSpinner } from '../../../components';
import {
  SalesHeader,
  SalesSummaryCards,
  SalesTabs,
  OrdersTable,
} from '../../../components/dashboard';
import { formatCurrency, formatDate } from '../../../utils/formatters';

export default function SalesDashboardPage() {
  const { user } = useAuth({ requireAuth: true });
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
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
      {/* Page Header */}
      <SalesHeader
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />

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
