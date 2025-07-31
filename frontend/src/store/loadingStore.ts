import { create } from 'zustand';

interface LoadingState {
  // Global loading states
  isPageLoading: boolean;
  isNavigating: boolean;
  loadingMessage: string;
  
  // Individual page loading states
  dashboardLoading: boolean;
  menuLoading: boolean;
  ordersLoading: boolean;
  salesLoading: boolean;
  
  // Actions
  setPageLoading: (loading: boolean, message?: string) => void;
  setNavigating: (navigating: boolean) => void;
  setDashboardLoading: (loading: boolean) => void;
  setMenuLoading: (loading: boolean) => void;
  setOrdersLoading: (loading: boolean) => void;
  setSalesLoading: (loading: boolean) => void;
  clearAllLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  // Initial state
  isPageLoading: false,
  isNavigating: false,
  loadingMessage: '',
  dashboardLoading: false,
  menuLoading: false,
  ordersLoading: false,
  salesLoading: false,

  // Actions
  setPageLoading: (loading: boolean, message: string = '') => {
    set({ isPageLoading: loading, loadingMessage: message });
  },

  setNavigating: (navigating: boolean) => {
    set({ isNavigating: navigating });
  },

  setDashboardLoading: (loading: boolean) => {
    set({ dashboardLoading: loading });
  },

  setMenuLoading: (loading: boolean) => {
    set({ menuLoading: loading });
  },

  setOrdersLoading: (loading: boolean) => {
    set({ ordersLoading: loading });
  },

  setSalesLoading: (loading: boolean) => {
    set({ salesLoading: loading });
  },

  clearAllLoading: () => {
    set({
      isPageLoading: false,
      isNavigating: false,
      loadingMessage: '',
      dashboardLoading: false,
      menuLoading: false,
      ordersLoading: false,
      salesLoading: false,
    });
  },
})); 