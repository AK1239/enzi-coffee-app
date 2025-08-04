import { useRouter } from 'next/navigation';
import { useLoadingStore } from '../store/loadingStore';

export const useNavigationWithLoading = () => {
  const router = useRouter();
  const { setNavigating, setPageLoading } = useLoadingStore();

  const navigateWithLoading = (href: string, message?: string) => {
    // Set loading states
    setNavigating(true);

    // Only set page loading for non-auth routes
    // Auth routes will handle their own loading states
    if (!['/login', '/register'].includes(href)) {
      setPageLoading(true, message || 'Loading...');
    }

    // Navigate to the new page
    router.push(href);

    // Don't clear loading states here - let the new page handle it
    // The loading will be cleared when the new page mounts and data is loaded
  };

  return { navigateWithLoading };
};
