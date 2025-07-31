'use client';

import { useLoadingStore } from '../store/loadingStore';
import LoadingOverlay from './LoadingOverlay';

interface LoadingProviderProps {
  children: React.ReactNode;
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const { isNavigating, isPageLoading, loadingMessage } = useLoadingStore();

  return (
    <>
      {children}
      <LoadingOverlay
        isVisible={isNavigating || isPageLoading}
        message={loadingMessage}
      />
    </>
  );
}
