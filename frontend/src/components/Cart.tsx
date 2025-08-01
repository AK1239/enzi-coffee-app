'use client';

import { useCartStore } from '../store';
import { CartItem } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { useState } from 'react';
import OrderModal from './OrderModal';

interface CartProps {
  className?: string;
}

export default function Cart({ className = '' }: CartProps) {
  const {
    items,
    isOpen,
    removeItem,
    updateQuantity,
    clearCart,
    closeCart,
    getTotal,
    getItemCount,
  } = useCartStore();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: number) => {
    removeItem(itemId);
  };

  const handleClearCart = () => {
    if (items.length > 0) {
      clearCart();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hot':
        return 'bg-red-500/20 text-red-300 border border-red-500/30';
      case 'cold':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'espresso':
        return 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={closeCart}
      />

      {/* Cart Sidebar with improved responsive design */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-slate-800/95 backdrop-blur-xl border-l border-slate-700/50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${className} ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ touchAction: 'pan-y' }}
      >
        {/* Cart Header with improved mobile spacing */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-white"
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
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                Shopping Cart
              </h2>
              <p className="text-sm text-slate-400 truncate">
                {getItemCount()} {getItemCount() === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 sm:p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors text-slate-300 hover:text-white touch-manipulation flex-shrink-0 cursor-pointer"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items with improved mobile spacing */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-amber-400 text-4xl mb-4">☕</div>
              <h3 className="text-lg font-medium text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-slate-400">
                Add some delicious coffee to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  getCategoryColor={getCategoryColor}
                />
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer with improved mobile spacing */}
        {items.length > 0 && (
          <div className="border-t border-slate-700/50 p-4 sm:p-6 space-y-4">
            {/* Clear Cart Button */}
            <button
              onClick={handleClearCart}
              className="w-full py-2 px-4 text-sm text-red-400 hover:text-red-300 font-medium transition-colors cursor-pointer"
            >
              Clear Cart
            </button>

            {/* Total */}
            <div className="flex justify-between items-center py-4 border-t border-slate-700/50">
              <span className="text-lg font-semibold text-white">Total:</span>
              <span className="text-2xl font-bold text-green-400">
                ${getTotal().toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 shadow-lg cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSuccess={orderId => {
          console.log('Order created successfully:', orderId);
          // Could show a success notification here
        }}
      />
    </>
  );
}

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (itemId: number, quantity: number) => void;
  onRemove: (itemId: number) => void;
  getCategoryColor: (category: string) => string;
}

function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
  getCategoryColor,
}: CartItemCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    setIsUpdating(true);
    try {
      onQuantityChange(item.id, newQuantity);
      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 100));
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-slate-700/50 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-slate-600/50">
      {/* Item Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate text-sm sm:text-base">
            {item.name}
          </h3>
          <div className="flex items-center space-x-2 mt-1 flex-wrap">
            <span
              className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                item.category
              )}`}
            >
              {item.category}
            </span>
            <span className="text-green-400 font-semibold text-sm">
              ${item.price.toFixed(2)}
            </span>
          </div>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center justify-center p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-colors ml-2 touch-manipulation flex-shrink-0 cursor-pointer"
          title="Remove item"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* Quantity Controls with improved touch targets */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={isUpdating}
            className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-slate-600/50 hover:bg-slate-500/50 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation cursor-pointer"
            style={{ minWidth: '40px', minHeight: '40px' }}
          >
            -
          </button>
          <span className="w-10 sm:w-8 text-center text-white font-semibold text-sm sm:text-base">
            {isUpdating ? <LoadingSpinner size="sm" /> : item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={isUpdating}
            className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-slate-600/50 hover:bg-slate-500/50 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation cursor-pointer"
            style={{ minWidth: '40px', minHeight: '40px' }}
          >
            +
          </button>
        </div>
        <div className="text-right">
          <div className="text-base sm:text-lg font-bold text-green-400">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
