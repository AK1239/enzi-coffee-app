interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  className?: string;
}

export default function LoadingOverlay({
  isVisible,
  message = 'Loading...',
  className = '',
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center ${className}`}
    >
      <div className="bg-slate-800/90 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50 shadow-2xl">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-300 font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
} 