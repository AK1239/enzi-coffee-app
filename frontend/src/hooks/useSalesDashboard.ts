import { useState, useEffect, useCallback } from 'react';
import { useOrdersStore } from '../store';
import { getTodayDateString } from '../utils/formatters';

export const useSalesDashboard = () => {
  const {
    dailyOrders,
    dailySummary,
    orders,
    isLoading,
    error,
    fetchDailyOrders,
    fetchAllOrders,
    clearError,
  } = useOrdersStore();

  const [activeTab, setActiveTab] = useState<'daily' | 'history'>('daily');
  const [selectedDate, setSelectedDate] =
    useState<string>(getTodayDateString());

  // Fetch data on component mount
  useEffect(() => {
    fetchDailyOrders();
    fetchAllOrders();
  }, [fetchDailyOrders, fetchAllOrders]);

  // Handle date change
  const handleDateChange = useCallback((date: string) => {
    setSelectedDate(date);
    // In a real implementation, you would fetch orders for the selected date
    // For now, we'll just show the current daily orders
  }, []);

  // Handle tab change
  const handleTabChange = useCallback((tab: 'daily' | 'history') => {
    setActiveTab(tab);
  }, []);

  // Handle retry
  const handleRetry = useCallback(() => {
    clearError();
    fetchDailyOrders();
    fetchAllOrders();
  }, [clearError, fetchDailyOrders, fetchAllOrders]);

  return {
    // State
    dailyOrders,
    dailySummary,
    orders,
    isLoading,
    error,
    activeTab,
    selectedDate,

    // Actions
    handleDateChange,
    handleTabChange,
    handleRetry,
  };
};
