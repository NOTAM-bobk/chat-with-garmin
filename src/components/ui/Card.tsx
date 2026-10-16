import { type HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hover, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 ${hover ? 'transition-all duration-200 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700' : ''} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export function CardHeader({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`p-5 border-b border-neutral-200 dark:border-neutral-800 ${className}`}>{children}</div>;
}

export function CardTitle({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={`font-semibold text-neutral-900 dark:text-neutral-100 ${className}`}>{children}</h3>;
}

export function CardContent({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}
