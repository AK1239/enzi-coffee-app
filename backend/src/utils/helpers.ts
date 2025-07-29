import { Order } from "@/types";

// Utility functions for the coffee shop backend
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100); // Assuming amounts are stored in cents
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const calculateOrderTotal = (items: Order["items"]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
