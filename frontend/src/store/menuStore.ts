import { create } from 'zustand';
import { apiClient } from '../lib/api';
import { MenuItem, ApiResponse } from '../types';

interface MenuState {
  // State
  items: MenuItem[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  lastFetched: Date | null;

  // Actions
  fetchMenuItems: () => Promise<boolean>;
  fetchCategories: () => Promise<boolean>;
  searchItems: (query: string) => MenuItem[];
  getItemsByCategory: (category: string) => MenuItem[];
  getItemById: (id: number) => MenuItem | undefined;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useMenuStore = create<MenuState>((set, get) => ({
  // Initial state
  items: [],
  categories: [],
  isLoading: false,
  error: null,
  lastFetched: null,

  // Actions
  fetchMenuItems: async () => {
    set({ isLoading: true, error: null });

    try {
      const data: ApiResponse<{ items: MenuItem[]; total: number }> =
        await apiClient.menu.getAll();

      if (data.success && data.data) {
        set({
          items: data.data.items,
          isLoading: false,
          lastFetched: new Date(),
        });
        return true;
      } else {
        set({
          error: data.message || 'Failed to fetch menu items',
          isLoading: false,
        });
        return false;
      }
    } catch (error: unknown) {
      console.error('Error fetching menu items:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch menu items';
      set({
        error: errorMessage,
        isLoading: false,
      });
      return false;
    }
  },

  fetchCategories: async () => {
    try {
      const data: ApiResponse<{ categories: string[] }> =
        await apiClient.menu.getCategories();

      if (data.success && data.data) {
        set({ categories: data.data.categories });
        return true;
      } else {
        console.error('Failed to fetch categories:', data.message);
        return false;
      }
    } catch (error: unknown) {
      console.error('Error fetching categories:', error);
      return false;
    }
  },

  searchItems: (query: string) => {
    const { items } = get();
    const lowercaseQuery = query.toLowerCase();
    return items.filter(item =>
      item.name.toLowerCase().includes(lowercaseQuery)
    );
  },

  getItemsByCategory: (category: string) => {
    const { items } = get();
    return items.filter(item => item.category === category);
  },

  getItemById: (id: number) => {
    const { items } = get();
    return items.find(item => item.id === id);
  },

  clearError: () => {
    set({ error: null });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
