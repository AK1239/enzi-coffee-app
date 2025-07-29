export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  itemCount: number;
  items: any; // JSON field
  createdAt: Date;
  updatedAt: Date;
}

// Extended types for API responses
export interface UserResponse {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderResponse {
  id: string;
  userId: string;
  totalAmount: number;
  itemCount: number;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
  user?: UserResponse;
}

// Order item structure for the JSON field
export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

// Input types for API requests
export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateOrderInput {
  items: OrderItem[];
  totalAmount: number;
  itemCount: number;
}
