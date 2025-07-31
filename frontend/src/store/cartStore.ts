import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MenuItem } from '../types';

interface CartState {
  // State
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (menuItem: MenuItem) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Computed values
  getTotal: () => number;
  getItemCount: () => number;
  getItemQuantity: (itemId: number) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isOpen: false,

      // Actions
      addItem: (menuItem: MenuItem) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === menuItem.id);

        if (existingItem) {
          // Update quantity if item already exists
          set({
            items: items.map(item =>
              item.id === menuItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Add new item
          const cartItem: CartItem = {
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
            category: menuItem.category,
          };
          set({ items: [...items, cartItem] });
        }
      },

      removeItem: (itemId: number) => {
        const { items } = get();
        set({
          items: items.filter(item => item.id !== itemId),
        });
      },

      updateQuantity: (itemId: number, quantity: number) => {
        const { items } = get();
        
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          get().removeItem(itemId);
          return;
        }

        set({
          items: items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        const { isOpen } = get();
        set({ isOpen: !isOpen });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      // Computed values
      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      getItemQuantity: (itemId: number) => {
        const { items } = get();
        const item = items.find(item => item.id === itemId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: 'cart-storage',
      partialize: state => ({
        items: state.items,
      }),
    }
  )
); 