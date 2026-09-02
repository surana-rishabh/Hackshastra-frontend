import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-[2px] border transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-[#F8FAFC] text-[#0284C7] border-[#E2E8F0]',
        cyan:
          'bg-[#0DA5F0]/10 text-[#0284C7] border-[#0DA5F0]/30 shadow-sm',
        success:
          'bg-emerald-50 text-emerald-700 border-emerald-200',
        warning:
          'bg-amber-50 text-amber-700 border-amber-200',
        muted:
          'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
