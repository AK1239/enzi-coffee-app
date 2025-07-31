import { create } from 'zustand';
import { apiClient } from '../lib/api';
import { Order, ApiResponse } from '../types';

interface DailySummary {
  totalOrders: number;
  totalAmount: number;
  totalItems: number;
  date: string;
}

interface OrdersState {
  // State
  orders: Order[];
  dailyOrders: Order[];
  dailySummary: DailySummary | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: Date | null;

  // Actions
  fetchDailyOrders: () => Promise<boolean>;
  fetchAllOrders: () => Promise<boolean>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  // Initial state
  orders: [],
  dailyOrders: [],
  dailySummary: null,
  isLoading: false,
  error: null,
  lastFetched: null,

  // Actions
  fetchDailyOrders: async () => {
    set({ isLoading: true, error: null });

    try {
      const data: ApiResponse<{
        orders: Order[];
        summary: DailySummary;
      }> = await apiClient.orders.getDaily();

      if (data.success && data.data) {
        set({
          dailyOrders: data.data.orders,
          dailySummary: data.data.summary,
          isLoading: false,
          lastFetched: new Date(),
        });
        return true;
      } else {
        set({
          error: data.message || 'Failed to fetch daily orders',
          isLoading: false,
        });
        return false;
      }
    } catch (error: unknown) {
      console.error('Error fetching daily orders:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch daily orders';
      set({
        error: errorMessage,
        isLoading: false,
      });
      return false;
    }
  },

  fetchAllOrders: async () => {
    set({ isLoading: true, error: null });

    try {
      const data: ApiResponse<{
        orders: Order[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          totalPages: number;
        };
      }> = await apiClient.orders.getAll();

      if (data.success && data.data) {
        set({
          orders: data.data.orders,
          isLoading: false,
          lastFetched: new Date(),
        });
        return true;
      } else {
        set({
          error: data.message || 'Failed to fetch orders',
          isLoading: false,
        });
        return false;
      }
    } catch (error: unknown) {
      console.error('Error fetching orders:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch orders';
      set({
        error: errorMessage,
        isLoading: false,
      });
      return false;
    }
  },

  clearError: () => {
    set({ error: null });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
})); 