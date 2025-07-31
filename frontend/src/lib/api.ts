import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useAuthStore } from '../store/authStore';

// Backend API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  error => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Token is invalid or expired
      useAuthStore.getState().clearAuth();

      // Redirect to login if we're in the browser
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        isNetworkError: true,
      });
    }

    // Extract error information
    const errorData = error.response?.data;
    const errorMessage = errorData?.message || 'An unexpected error occurred';
    const validationErrors = errorData?.errors || {};

    // Log detailed error information for debugging
    console.error('API Error:', {
      status: error.response?.status,
      message: errorMessage,
      data: errorData,
      url: error.config?.url,
      method: error.config?.method,
    });

    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: errorData,
      errors: validationErrors,
    });
  }
);

// API methods
export const apiClient = {
  // Authentication endpoints
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      const response = await api.post('/api/auth/login', credentials);
      return response.data;
    },

    register: async (credentials: {
      name: string;
      email: string;
      password: string;
    }) => {
      const response = await api.post('/api/auth/register', credentials);
      return response.data;
    },

    me: async () => {
      const response = await api.get('/api/auth/me');
      return response.data;
    },
  },

  // Menu endpoints
  menu: {
    getAll: async () => {
      const response = await api.get('/api/menu');
      return response.data;
    },

    getCategories: async () => {
      const response = await api.get('/api/menu/categories');
      return response.data;
    },

    getByCategory: async (category: string) => {
      const response = await api.get(`/api/menu/category/${category}`);
      return response.data;
    },

    getById: async (id: number) => {
      const response = await api.get(`/api/menu/item/${id}`);
      return response.data;
    },

    search: async (query: string) => {
      const response = await api.get(
        `/api/menu/search?q=${encodeURIComponent(query)}`
      );
      return response.data;
    },
  },

  // Order endpoints
  orders: {
    create: async (orderData: {
      items: unknown[];
      totalAmount: number;
      itemCount: number;
    }) => {
      const response = await api.post('/api/orders', orderData);
      return response.data;
    },

    getAll: async () => {
      const response = await api.get('/api/orders');
      return response.data;
    },

    getDaily: async () => {
      const response = await api.get('/api/orders/daily');
      return response.data;
    },
  },
};

// Export the raw axios instance for custom requests
export { api };

// Export types for better type safety
export type ApiError = {
  message: string;
  status?: number;
  data?: unknown;
  isNetworkError?: boolean;
};
