import { forwardRef, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-accent-500 text-neutral-950 hover:bg-accent-400 shadow-sm hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]',
      secondary:
        'bg-elevated/50 text-fg-secondary hover:bg-elevated border border-edge-hover/50 hover:border-edge-hover',
      ghost: 'text-fg-muted hover:text-fg-secondary hover:bg-elevated/50',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-sm px-5 py-2.5',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
