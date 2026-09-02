import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DA5F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-[#0DA5F0] text-[#FFFFFF] font-semibold hover:bg-[#0284C7] hover:shadow-[0_4px_15px_rgba(13,165,240,0.35)] border border-[#0DA5F0]',
        secondary:
          'bg-[#F8FAFC] text-[#090D12] border border-[#E2E8F0] hover:border-[#0DA5F0] hover:bg-[#FFFFFF] hover:text-[#0DA5F0] shadow-sm',
        outline:
          'border border-[#E2E8F0] bg-transparent text-[#090D12] hover:border-[#0DA5F0] hover:text-[#0DA5F0] hover:bg-[#0DA5F0]/5',
        bracket:
          'font-mono text-xs tracking-wider text-[#64748B] hover:text-[#0DA5F0] bg-transparent border-none px-2 py-1',
        ghost:
          'text-[#334155] hover:text-[#090D12] hover:bg-[#F1F5F9] border-transparent',
        glow:
          'bg-[#090D12] text-[#FFFFFF] font-semibold hover:bg-[#0DA5F0] hover:shadow-[0_4px_20px_rgba(13,165,240,0.4)] border border-[#090D12]',
      },
      size: {
        default: 'h-10 px-5 py-2 rounded-[2px]',
        sm: 'h-8 px-3 text-xs rounded-[2px]',
        lg: 'h-12 px-8 text-base rounded-[2px]',
        icon: 'h-10 w-10 rounded-[2px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
        {variant === 'bracket' ? (
          <span>
            <span className="text-[#0DA5F0] mr-1">[</span>
            {children}
            <span className="text-[#0DA5F0] ml-1">]</span>
          </span>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
