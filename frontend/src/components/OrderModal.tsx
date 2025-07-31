'use client';

import { useState } from 'react';
import { useCartStore } from '../store';
import { CartItem } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { apiClient } from '../lib/api';
import { printReceipt, downloadReceipt, ReceiptData } from '../utils/receipt';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (orderId: string) => void;
}

export default function OrderModal({
  isOpen,
  onClose,
  onSuccess,
}: OrderModalProps) {
  const { items, getTotal, getItemCount, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<{
    orderId: string;
    timestamp: Date;
  } | null>(null);

  const handleConfirmOrder = async () => {
    if (items.length === 0) {
      setError('Cart is empty');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare order data
      const orderData = {
        items: items.map(item => ({
          id: item.id, // Send as number, not string
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: getTotal(),
        itemCount: getItemCount(), // This is already the total quantity from cart store
      };

      // Submit order to backend
      const response = await apiClient.orders.create(orderData);

      if (response.success && response.data) {
        // Set order success state
        setOrderSuccess({
          orderId: response.data.id || 'unknown',
          timestamp: new Date(),
        });

        // Clear cart on successful order
        clearCart();

        // Call success callback with order ID
        if (onSuccess && response.data.id) {
          onSuccess(response.data.id);
        }
      } else {
        setError(response.message || 'Failed to create order');
      }
    } catch (err: unknown) {
      console.error('Error creating order:', err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to create order. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (!isSubmitting) {
      onClose();
      setOrderSuccess(null);
    }
  };

  const handlePrintReceipt = () => {
    if (orderSuccess) {
      const receiptData: ReceiptData = {
        orderId: orderSuccess.orderId,
        items: items,
        totalAmount: getTotal(),
        itemCount: getItemCount(),
        timestamp: orderSuccess.timestamp,
      };
      printReceipt(receiptData);
    }
  };

  const handleDownloadReceipt = () => {
    if (orderSuccess) {
      const receiptData: ReceiptData = {
        orderId: orderSuccess.orderId,
        items: items,
        totalAmount: getTotal(),
        itemCount: getItemCount(),
        timestamp: orderSuccess.timestamp,
      };
      downloadReceipt(receiptData);
    }
  };

  const handleCloseSuccess = () => {
    onClose();
    setOrderSuccess(null);
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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Confirm Order</h2>
                <p className="text-sm text-slate-400">
                  Review your order before confirming
                </p>
              </div>
            </div>
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-red-400 font-medium">{error}</span>
                </div>
              </div>
            )}

            {orderSuccess ? (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Order Confirmed!
                </h3>
                <p className="text-slate-400 mb-6">
                  Your order has been successfully placed.
                </p>
                <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
                  <div className="text-sm text-slate-300">
                    <div className="font-semibold">
                      Order #{orderSuccess.orderId}
                    </div>
                    <div className="text-slate-400">
                      {orderSuccess.timestamp.toLocaleDateString()} at{' '}
                      {orderSuccess.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={handlePrintReceipt}
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
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
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                      />
                    </svg>
                    <span>Print Receipt</span>
                  </button>
                  <button
                    onClick={handleDownloadReceipt}
                    className="w-full py-3 px-4 bg-slate-700/50 text-white font-semibold rounded-lg hover:bg-slate-600/50 transition-all duration-200 border border-slate-600/50 flex items-center justify-center space-x-2"
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
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Download Receipt</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Order Summary */
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Order Summary
                  </h3>

                  {items.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-amber-400 text-4xl mb-4">☕</div>
                      <p className="text-slate-400">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {items.map(item => (
                        <OrderItemRow
                          key={item.id}
                          item={item}
                          getCategoryColor={getCategoryColor}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Order Total */}
                {items.length > 0 && (
                  <div className="border-t border-slate-700/50 pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold text-white">
                      <span>Total ({getItemCount()} items):</span>
                      <span className="text-2xl text-green-400">
                        ${getTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-700/50">
            {orderSuccess ? (
              <button
                onClick={handleCloseSuccess}
                className="px-6 py-3 bg-slate-700/50 text-white font-semibold rounded-lg hover:bg-slate-600/50 transition-all duration-200 border border-slate-600/50"
              >
                Close
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-6 py-3 text-slate-300 hover:text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting || items.length === 0}
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Confirm Order</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

interface OrderItemRowProps {
  item: CartItem;
  getCategoryColor: (category: string) => string;
}

function OrderItemRow({ item, getCategoryColor }: OrderItemRowProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-3">
          <h4 className="font-semibold text-white truncate">{item.name}</h4>
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
              item.category
            )}`}
          >
            {item.category}
          </span>
        </div>
        <div className="flex items-center space-x-4 mt-1 text-sm text-slate-400">
          <span>Qty: {item.quantity}</span>
          <span>${item.price.toFixed(2)} each</span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-green-400">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
