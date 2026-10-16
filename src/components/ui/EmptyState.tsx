import { type LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 p-8 text-center dark:border-neutral-800">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
        <Icon className="h-6 w-6 text-neutral-400" />
      </div>
      <h3 className="mt-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">{title}</h3>
      {description && <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
