import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full h-10 px-3 rounded-lg border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400 transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-500 ${error ? 'border-red-400 dark:border-red-600' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
