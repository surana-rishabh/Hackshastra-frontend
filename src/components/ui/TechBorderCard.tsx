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
        'relative rounded-[2px] border bg-[#9CC6DB] p-6 transition-all duration-300 shadow-sm',
        active
          ? 'border-[#CF4B00] shadow-[0_4px_25px_rgba(207,75,0,0.2)] ring-1 ring-[#CF4B00]/30'
          : 'border-[#85b5cd] hover:border-[#CF4B00] hover:shadow-[0_4px_20px_rgba(207,75,0,0.12)]',
        className
      )}
      {...props}
    >
      {/* Corner Bracket Accents */}
      <span className="absolute -top-[1px] -left-[1px] h-2 w-2 border-t-2 border-l-2 border-[#CF4B00]" />
      <span className="absolute -top-[1px] -right-[1px] h-2 w-2 border-t-2 border-r-2 border-[#CF4B00]" />
      <span className="absolute -bottom-[1px] -left-[1px] h-2 w-2 border-b-2 border-l-2 border-[#CF4B00]" />
      <span className="absolute -bottom-[1px] -right-[1px] h-2 w-2 border-b-2 border-r-2 border-[#CF4B00]" />

      {children}
    </div>
  );
};
