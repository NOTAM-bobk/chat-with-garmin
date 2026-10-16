type BadgeVariant = 'connected' | 'disconnected' | 'expired' | 'default';

const variantStyles: Record<BadgeVariant, string> = {
  connected: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900',
  disconnected: 'bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700',
  expired: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900',
  default: 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700',
};

export function Badge({
  variant = 'default',
  children,
  className = '',
}: {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}) {
  const dotColor: Record<BadgeVariant, string> = {
    connected: 'bg-green-500',
    disconnected: 'bg-neutral-400',
    expired: 'bg-amber-500',
    default: 'bg-neutral-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor[variant]}`} />
      {children}
    </span>
  );
}
