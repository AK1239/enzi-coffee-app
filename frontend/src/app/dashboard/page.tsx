'use client';

import { useState } from 'react';
import { useAuth } from '../../hooks';
import { useMenuStore, useCartStore } from '../../store';
import { MenuGrid, OrderModal, LoadingSpinner } from '../../components';
import { MenuItem } from '../../types';

export default function DashboardPage() {
  const { user } = useAuth({ requireAuth: true });
  const { items, isLoading, error } = useMenuStore();
  const {
    items: cartItems,
    getTotal,
    clearCart,
    addItem,
    removeItem,
    updateQuantity,
  } = useCartStore();

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // Handle add to cart
  const handleAddToCart = (item: MenuItem) => {
    addItem(item);
  };

  // Handle order submission
  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) return;

    setIsSubmittingOrder(true);
    try {
      // Here you would typically call your API to submit the order
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart after successful order
      clearCart();
      setShowOrderModal(false);

      // You could show a success message here
      console.log('Order submitted successfully');
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">POS Dashboard</h1>
          <p className="text-slate-300 mt-2">
            Welcome back, {user?.name || 'User'}. Ready to take orders?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 mt-4 sm:mt-0">
          <div className="bg-slate-700/50 backdrop-blur-xl rounded-lg p-4 border border-slate-600/50">
            <div className="text-2xl font-bold text-white">{items.length}</div>
            <div className="text-slate-300 text-sm">Menu Items</div>
          </div>
          <div className="bg-slate-700/50 backdrop-blur-xl rounded-lg p-4 border border-slate-600/50">
            <div className="text-2xl font-bold text-white">
              {cartItems.length}
            </div>
            <div className="text-slate-300 text-sm">Cart Items</div>
          </div>
        </div>
      </div>

      {/* Main Content - Menu Grid and Cart Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Grid - Takes up 2/3 of the space */}
        <div className="lg:col-span-2">
          <div className="bg-slate-700/50 backdrop-blur-xl rounded-xl p-6 border border-slate-600/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Menu</h2>
              <div className="text-slate-300 text-sm">
                {items.length} items available
              </div>
            </div>

            <MenuGrid onAddToCart={handleAddToCart} />
          </div>
        </div>

        {/* Cart Sidebar - Takes up 1/3 of the space */}
        <div className="lg:col-span-1">
          <div className="bg-slate-700/50 backdrop-blur-xl rounded-xl p-6 border border-slate-600/50 sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Current Order
              </h2>
              {cartItems.length > 0 && (
                <button
                  onClick={() => clearCart()}
                  className="text-red-400 hover:text-red-300 text-sm transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-slate-400 text-lg mb-2">
                    Cart is empty
                  </div>
                  <div className="text-slate-500 text-sm">
                    Add items from the menu to get started
                  </div>
                </div>
              ) : (
                cartItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-slate-600/30 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-slate-300 text-sm">
                        ${item.price.toFixed(2)} each
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-white font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <div className="border-t border-slate-600/50 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-300">Subtotal:</span>
                  <span className="text-white font-semibold">
                    ${getTotal().toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => setShowOrderModal(true)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  disabled={cartItems.length === 0}
                >
                  Place Order (${getTotal().toFixed(2)})
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
