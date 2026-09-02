import * as React from 'react';
import { cn } from '@/lib/utils';

interface TechBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  active?: boolean;
}

export const TechBorderCard: React.FC<TechBorderCardProps> = ({
  children,
  className,
  active = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative rounded-[2px] border bg-[#FFFFFF] p-6 transition-all duration-300 shadow-sm',
        active
          ? 'border-[#0DA5F0] shadow-[0_4px_25px_rgba(13,165,240,0.15)] ring-1 ring-[#0DA5F0]/20'
          : 'border-[#E2E8F0] hover:border-[#0DA5F0] hover:shadow-[0_4px_20px_rgba(13,165,240,0.1)]',
        className
      )}
      {...props}
    >
      {/* Corner Bracket Accents */}
      <span className="absolute -top-[1px] -left-[1px] h-2 w-2 border-t-2 border-l-2 border-[#0DA5F0]" />
      <span className="absolute -top-[1px] -right-[1px] h-2 w-2 border-t-2 border-r-2 border-[#0DA5F0]" />
      <span className="absolute -bottom-[1px] -left-[1px] h-2 w-2 border-b-2 border-l-2 border-[#0DA5F0]" />
      <span className="absolute -bottom-[1px] -right-[1px] h-2 w-2 border-b-2 border-r-2 border-[#0DA5F0]" />

      {children}
    </div>
  );
};
