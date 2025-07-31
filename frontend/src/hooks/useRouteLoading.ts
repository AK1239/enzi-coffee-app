import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLoadingStore } from '../store';

export const useRouteLoading = () => {
  const pathname = usePathname();
  const { setNavigating, setDashboardLoading, setMenuLoading, setOrdersLoading, setSalesLoading } = useLoadingStore();

  useEffect(() => {
    // Set navigating state when route changes
    setNavigating(true);

    // Set specific page loading based on current route
    const currentPath = pathname;
    
    if (currentPath === '/dashboard') {
      setDashboardLoading(true);
    } else if (currentPath === '/dashboard/menu') {
      setMenuLoading(true);
    } else if (currentPath === '/dashboard/orders') {
      setOrdersLoading(true);
    } else if (currentPath === '/dashboard/sales') {
      setSalesLoading(true);
    }

    // Clear navigating state after a short delay to allow for smooth transitions
    const timer = setTimeout(() => {
      setNavigating(false);
    }, 100);

    return () => {
      clearTimeout(timer);
      setNavigating(false);
    };
  }, [pathname, setNavigating, setDashboardLoading, setMenuLoading, setOrdersLoading, setSalesLoading]);

  return {
    isNavigating: useLoadingStore(state => state.isNavigating),
    dashboardLoading: useLoadingStore(state => state.dashboardLoading),
    menuLoading: useLoadingStore(state => state.menuLoading),
    ordersLoading: useLoadingStore(state => state.ordersLoading),
    salesLoading: useLoadingStore(state => state.salesLoading),
  };
}; 