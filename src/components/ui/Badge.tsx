import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-[2px] border transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-[#9CC6DB]/30 text-[#0F172A] border-[#9CC6DB] font-bold',
        cyan:
          'bg-[#CF4B00] text-[#FFFFFF] border-[#CF4B00] font-black shadow-sm',
        success:
          'bg-[#DDBA7D]/30 text-[#0F172A] border-[#DDBA7D] font-bold',
        warning:
          'bg-[#CF4B00]/15 text-[#CF4B00] border-[#CF4B00]/40 font-bold',
        muted:
          'bg-[#FCF6D9] text-[#475569] border-[#C8DBE5]',
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
