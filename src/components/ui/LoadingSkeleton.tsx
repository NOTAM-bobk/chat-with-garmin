import { Loader2 } from 'lucide-react';

export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800 ${className}`} />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <LoadingSkeleton className="h-8 w-48" />
        <LoadingSkeleton className="h-8 w-32" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <LoadingSkeleton key={i} className="h-28" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <LoadingSkeleton className="h-64" />
        <LoadingSkeleton className="h-64" />
      </div>
      <LoadingSkeleton className="h-48" />
    </div>
  );
}

export function FullPageLoader({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-accent-500" />
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{message}</p>
      </div>
    </div>
  );
}
