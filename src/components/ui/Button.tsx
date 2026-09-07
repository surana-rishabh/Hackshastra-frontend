import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CF4B00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCF6D9] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-[#CF4B00] text-[#FFFFFF] font-bold hover:bg-[#b04000] hover:shadow-[0_4px_18px_rgba(207,75,0,0.35)] hover:-translate-y-0.5 border border-[#CF4B00]',
        gradient:
          'bg-[#CF4B00] text-[#FFFFFF] font-bold hover:bg-[#b04000] hover:shadow-[0_6px_22px_rgba(207,75,0,0.4)] hover:-translate-y-0.5 border border-[#CF4B00]',
        secondary:
          'bg-[#9CC6DB] text-[#0F172A] font-bold border border-[#9CC6DB] hover:bg-[#85b5cd] hover:-translate-y-0.5 shadow-xs',
        outline:
          'border-2 border-[#CF4B00] bg-[#CF4B00]/10 text-[#CF4B00] font-bold hover:bg-[#CF4B00] hover:text-[#FFFFFF] hover:-translate-y-0.5',
        bracket:
          'font-mono text-xs tracking-wider text-[#CF4B00] hover:text-[#0F172A] bg-transparent border-none px-2 py-1',
        ghost:
          'text-[#0F172A] hover:text-[#CF4B00] hover:bg-[#9CC6DB]/30 border-transparent font-semibold',
        glow:
          'bg-[#CF4B00] text-[#FFFFFF] font-bold hover:bg-[#b04000] hover:shadow-[0_4px_22px_rgba(207,75,0,0.4)] hover:-translate-y-0.5 border border-[#CF4B00]',
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
            <span className="text-[#CF4B00] mr-1">[</span>
            {children}
            <span className="text-[#CF4B00] ml-1">]</span>
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
