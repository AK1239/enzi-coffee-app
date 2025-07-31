// Frontend types for Enzi Coffee Shop

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  itemCount: number;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: 'hot' | 'cold' | 'espresso';
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  category: 'hot' | 'cold' | 'espresso';
  available: boolean;
  image: string;
}

// Frontend-specific types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface DailySummary {
  totalOrders: number;
  totalAmount: number;
  totalItems: number;
  date: string;
}
