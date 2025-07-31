import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLoadingStore } from '../store';

export const useRouteLoading = () => {
  const pathname = usePathname();
  const {
    setNavigating,
    setDashboardLoading,
    setMenuLoading,
    setOrdersLoading,
    setSalesLoading,
    setPageLoading,
  } = useLoadingStore();

  useEffect(() => {
    // Set navigating state when route changes
    setNavigating(true);

    // Set specific page loading based on current route
    const currentPath = pathname;

    if (currentPath === '/') {
      setPageLoading(true, 'Loading Home...');
    } else if (currentPath === '/login') {
      setPageLoading(true, 'Loading Sign In...');
    } else if (currentPath === '/register') {
      setPageLoading(true, 'Loading Registration...');
    } else if (currentPath === '/dashboard') {
      setDashboardLoading(true);
      setPageLoading(true, 'Loading Dashboard...');
    } else if (currentPath === '/dashboard/menu') {
      setMenuLoading(true);
      setPageLoading(true, 'Loading Menu...');
    } else if (currentPath === '/dashboard/orders') {
      setOrdersLoading(true);
      setPageLoading(true, 'Loading Orders...');
    } else if (currentPath === '/dashboard/sales') {
      setSalesLoading(true);
      setPageLoading(true, 'Loading Sales...');
    }

    // Clear navigating state after a short delay to allow for smooth transitions
    const timer = setTimeout(() => {
      setNavigating(false);
      setPageLoading(false);
    }, 200);

    return () => {
      clearTimeout(timer);
      setNavigating(false);
      setPageLoading(false);
    };
  }, [
    pathname,
    setNavigating,
    setDashboardLoading,
    setMenuLoading,
    setOrdersLoading,
    setSalesLoading,
    setPageLoading,
  ]);

  return {
    isNavigating: useLoadingStore(state => state.isNavigating),
    dashboardLoading: useLoadingStore(state => state.dashboardLoading),
    menuLoading: useLoadingStore(state => state.menuLoading),
    ordersLoading: useLoadingStore(state => state.ordersLoading),
    salesLoading: useLoadingStore(state => state.salesLoading),
  };
};
