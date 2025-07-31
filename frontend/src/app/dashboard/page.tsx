'use client';

import React, { useState } from 'react';
import { useMenuStore, useCartStore, useLoadingStore } from '../../store';
import { useAuthStore } from '../../store/authStore';
import {
  MenuGrid,
  OrderModal,
  LoadingSpinner,
  SkeletonCard,
} from '../../components';
import { MenuItem } from '../../types';

export default function DashboardPage() {
  const { items, isLoading, error, fetchMenuItems } = useMenuStore();
  const {
    items: cartItems,
    getTotal,
    clearCart,
    addItem,
    removeItem,
    updateQuantity,
  } = useCartStore();
  const { dashboardLoading, setDashboardLoading } = useLoadingStore();
  const { isAuthenticated } = useAuthStore();

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Fetch menu data when authenticated and items are empty
  React.useEffect(() => {
    if (isAuthenticated && items.length === 0 && !isLoading) {
      fetchMenuItems();
    }
  }, [isAuthenticated, items.length, isLoading, fetchMenuItems]);

  // Clear loading state when data is loaded
  React.useEffect(() => {
    if (!isLoading && !error) {
      setDashboardLoading(false);
      // Add a small delay to show the loading state for better UX
      setTimeout(() => {
        setIsInitializing(false);
      }, 500);
    }
  }, [isLoading, error, setDashboardLoading]);

  // Handle add to cart
  const handleAddToCart = (item: MenuItem) => {
    addItem(item);
  };



  // Show initialization loading for dashboard
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome to Dashboard
          </h2>
          <p className="text-amber-300 font-medium">
            Loading your workspace...
          </p>
        </div>
      </div>
    );
  }

  // Show skeleton loading for dashboard
  if (dashboardLoading || isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="h-8 bg-slate-700/50 rounded-lg w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-slate-700/50 rounded w-80 animate-pulse"></div>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <div className="bg-slate-700/50 backdrop-blur-xl rounded-lg p-4 border border-slate-600/50 w-24">
              <div className="h-6 bg-slate-600/50 rounded w-12 mb-1 animate-pulse"></div>
              <div className="h-3 bg-slate-600/50 rounded w-16 animate-pulse"></div>
            </div>
            <div className="bg-slate-700/50 backdrop-blur-xl rounded-lg p-4 border border-slate-600/50 w-24">
              <div className="h-6 bg-slate-600/50 rounded w-12 mb-1 animate-pulse"></div>
              <div className="h-3 bg-slate-600/50 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menu Grid Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-slate-700/50 backdrop-blur-xl rounded-xl p-6 border border-slate-600/50">
              <div className="flex items-center justify-between mb-6">
                <div className="h-6 bg-slate-600/50 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-slate-600/50 rounded w-24 animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Cart Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-slate-700/50 backdrop-blur-xl rounded-xl p-6 border border-slate-600/50">
              <div className="flex items-center justify-between mb-6">
                <div className="h-6 bg-slate-600/50 rounded w-32 animate-pulse"></div>
              </div>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-slate-600/30 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="h-4 bg-slate-600/50 rounded w-24 mb-1 animate-pulse"></div>
                      <div className="h-3 bg-slate-600/50 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-600/50 rounded-full animate-pulse"></div>
                      <div className="w-8 h-8 bg-slate-600/50 rounded animate-pulse"></div>
                      <div className="w-8 h-8 bg-slate-600/50 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-400 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with improved mobile layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">
            POS Dashboard
          </h1>
          <p className="text-slate-300 mt-2 text-sm sm:text-base">
            Welcome back, User. Ready to take orders?
          </p>
        </div>

        {/* Quick Stats with improved mobile layout */}
        <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-0">
          <div className="bg-slate-700/50 backdrop-blur-xl rounded-lg p-3 sm:p-4 border border-slate-600/50 flex-1 sm:flex-none">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {items.length}
            </div>
            <div className="text-slate-300 text-xs sm:text-sm">Menu Items</div>
          </div>
          <div className="bg-slate-700/50 backdrop-blur-xl rounded-lg p-3 sm:p-4 border border-slate-600/50 flex-1 sm:flex-none">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {cartItems.length}
            </div>
            <div className="text-slate-300 text-xs sm:text-sm">Cart Items</div>
          </div>
        </div>
      </div>

      {/* Main Content - Menu Grid and Cart Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Menu Grid - Takes up 2/3 of the space */}
        <div className="lg:col-span-2">
          <div className="bg-slate-700/50 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-slate-600/50">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Menu
              </h2>
              <div className="text-slate-300 text-xs sm:text-sm">
                {items.length} items available
              </div>
            </div>

            <MenuGrid onAddToCart={handleAddToCart} />
          </div>
        </div>

        {/* Cart Sidebar - Takes up 1/3 of the space */}
        <div className="lg:col-span-1">
          <div className="bg-slate-700/50 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-slate-600/50 sticky top-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Current Order
              </h2>
              {cartItems.length > 0 && (
                <button
                  onClick={() => clearCart()}
                  className="text-red-400 hover:text-red-300 text-xs sm:text-sm transition-colors touch-manipulation"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Cart Items with improved mobile layout */}
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="text-slate-400 text-base sm:text-lg mb-2">
                    Cart is empty
                  </div>
                  <div className="text-slate-500 text-xs sm:text-sm">
                    Add items from the menu to get started
                  </div>
                </div>
              ) : (
                cartItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-slate-600/30 rounded-lg"
                  >
                    <div className="flex-1 min-w-0 mr-3">
                      <div className="font-medium text-white text-sm sm:text-base truncate">
                        {item.name}
                      </div>
                      <div className="text-slate-300 text-xs sm:text-sm">
                        ${item.price.toFixed(2)} each
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 sm:w-8 sm:h-8 bg-slate-600 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors touch-manipulation"
                        disabled={item.quantity <= 1}
                        style={{ minWidth: '32px', minHeight: '32px' }}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-white font-medium text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 sm:w-8 sm:h-8 bg-slate-600 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors touch-manipulation"
                        style={{ minWidth: '32px', minHeight: '32px' }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-1 sm:ml-2 text-red-400 hover:text-red-300 transition-colors touch-manipulation p-1"
                        style={{ minWidth: '32px', minHeight: '32px' }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary with improved mobile layout */}
            {cartItems.length > 0 && (
              <div className="border-t border-slate-600/50 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-300 text-sm sm:text-base">
                    Subtotal:
                  </span>
                  <span className="text-white font-semibold text-sm sm:text-base">
                    ${getTotal().toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => setShowOrderModal(true)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors touch-manipulation"
                  disabled={cartItems.length === 0}
                  style={{ minHeight: '44px' }}
                >
                  <span className="text-sm sm:text-base">
                    Place Order (${getTotal().toFixed(2)})
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      <OrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        onSuccess={orderId => {
          // Optionally: show a toast, but DO NOT close the modal here!
          console.log('Order submitted successfully:', orderId);
        }}
      />
    </div>
  );
}
