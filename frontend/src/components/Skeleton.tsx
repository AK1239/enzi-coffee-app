interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export default function Skeleton({
  className = '',
  width = 'w-full',
  height = 'h-4',
  rounded = 'md',
}: SkeletonProps) {
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  return (
    <div
      className={`${width} ${height} ${roundedClasses[rounded]} bg-slate-700/50 animate-pulse ${className}`}
    />
  );
}

// Predefined skeleton components for common use cases
export function SkeletonText({ lines = 1, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="h-4"
          width={i === lines - 1 ? 'w-3/4' : 'w-full'}
          rounded="md"
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-slate-700/50 backdrop-blur-xl rounded-xl p-4 border border-slate-600/50 ${className}`}>
      <div className="space-y-3">
        <Skeleton height="h-32" rounded="lg" />
        <SkeletonText lines={2} />
        <Skeleton height="h-10" rounded="lg" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, className = '' }: { rows?: number; className?: string }) {
  return (
    <div className={`bg-slate-700/50 backdrop-blur-xl rounded-xl border border-slate-600/50 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-600/50">
        <div className="grid grid-cols-4 gap-4">
          <Skeleton height="h-4" />
          <Skeleton height="h-4" />
          <Skeleton height="h-4" />
          <Skeleton height="h-4" />
        </div>
      </div>
      
      {/* Rows */}
      <div className="divide-y divide-slate-600/50">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4">
            <div className="grid grid-cols-4 gap-4">
              <Skeleton height="h-4" width="w-3/4" />
              <Skeleton height="h-4" width="w-1/2" />
              <Skeleton height="h-4" width="w-2/3" />
              <Skeleton height="h-4" width="w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonStats({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-slate-700/50 backdrop-blur-xl rounded-lg p-4 border border-slate-600/50">
          <div className="space-y-2">
            <Skeleton height="h-4" width="w-1/2" />
            <Skeleton height="h-8" width="w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
} 