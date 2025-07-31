'use client';

import React, { useState, useEffect } from 'react';
import { useOrdersStore, useLoadingStore } from '../../../store';
import {
  LoadingSpinner,
  OrdersTable,
  ErrorDisplay,
  SkeletonTable,
  SkeletonStats,
} from '../../../components';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import { Order } from '../../../types';

export default function OrdersPage() {
  const {
    orders,
    dailyOrders,
    dailySummary,
    isLoading,
    error,
    fetchAllOrders,
    fetchDailyOrders,
    clearError,
  } = useOrdersStore();
  const { ordersLoading, setOrdersLoading } = useLoadingStore();

  const [activeTab, setActiveTab] = useState<'all' | 'today'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchAllOrders();
    fetchDailyOrders();
  }, [fetchAllOrders, fetchDailyOrders]);

  // Clear loading state when data is loaded
  useEffect(() => {
    if (!isLoading && !error) {
      setOrdersLoading(false);
    }
  }, [isLoading, error, setOrdersLoading]);

  // Filter orders based on search query
  const filteredOrders = (activeTab === 'all' ? orders : dailyOrders).filter(
    order =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Handle retry
  const handleRetry = () => {
    clearError();
    fetchAllOrders();
    fetchDailyOrders();
  };

  // Handle order click to show details
  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Show skeleton loading for orders page
  if (ordersLoading || isLoading) {
    return (
      <div className="space-y-6">
        {/* Page Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="h-8 bg-slate-700/50 rounded-lg w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-slate-700/50 rounded w-64 animate-pulse"></div>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <div className="h-10 bg-slate-700/50 rounded-lg w-32 animate-pulse"></div>
            <div className="h-10 bg-slate-700/50 rounded-lg w-40 animate-pulse"></div>
          </div>
        </div>

        {/* Stats Skeleton */}
        <SkeletonStats />

        {/* Filters Skeleton */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="h-4 bg-slate-700/50 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-10 bg-slate-700/50 rounded-lg animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 bg-slate-700/50 rounded w-20 mb-2 animate-pulse"></div>
              <div className="h-10 bg-slate-700/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Table Skeleton */}
        <SkeletonTable rows={8} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <ErrorDisplay
          error={error}
          title="Failed to Load Orders"
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Orders Management</h1>
          <p className="text-slate-300 mt-2">
            Manage and view all customer orders
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 mt-4 sm:mt-0">
          <div className="bg-slate-700/50 backdrop-blur-xl rounded-lg p-4 border border-slate-600/50">
            <div className="text-2xl font-bold text-white">{orders.length}</div>
            <div className="text-slate-300 text-sm">Total Orders</div>
          </div>
          {dailySummary && (
            <div className="bg-slate-700/50 backdrop-blur-xl rounded-lg p-4 border border-slate-600/50">
              <div className="text-2xl font-bold text-white">
                {formatCurrency(dailySummary.totalAmount)}
              </div>
              <div className="text-slate-300 text-sm">Today&apos;s Revenue</div>
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-1">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-amber-500 text-white shadow-lg'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'today'
                ? 'bg-amber-500 text-white shadow-lg'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Today&apos;s Orders ({dailyOrders.length})
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search orders by ID or item name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-600/50 rounded-lg bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Orders Table */}
      <OrdersTable
        orders={filteredOrders}
        title={activeTab === 'all' ? 'All Orders' : 'Today&apos;s Orders'}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
        emptyMessage={
          searchQuery
            ? 'No orders found matching your search'
            : activeTab === 'all'
              ? 'No Orders Found'
              : 'No Orders Today'
        }
        emptyDescription={
          searchQuery
            ? 'Try adjusting your search terms'
            : activeTab === 'all'
              ? 'No order history available.'
              : 'No orders have been placed today yet.'
        }
        onOrderClick={handleOrderClick}
      />

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowOrderDetails(false)}
          />
          <div className="relative bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Order Details
              </h2>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
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

            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-400">
                    Order ID
                  </label>
                  <p className="text-white font-mono">{selectedOrder.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400">
                    Date
                  </label>
                  <p className="text-white">
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400">
                    Total Amount
                  </label>
                  <p className="text-white font-semibold">
                    {formatCurrency(selectedOrder.totalAmount)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400">
                    Items Count
                  </label>
                  <p className="text-white">{selectedOrder.itemCount}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-slate-400 text-sm">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        <p className="text-slate-400 text-sm">
                          {formatCurrency(item.price)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-slate-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-white">Total</span>
                  <span className="text-xl font-bold text-amber-400">
                    {formatCurrency(selectedOrder.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
