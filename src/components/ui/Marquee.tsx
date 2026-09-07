import * as React from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
  separator?: string;
  className?: string;
  itemClassName?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  speed = 35,
  reverse = false,
  separator = '•',
  className,
  itemClassName,
}) => {
  const repeated = [...items, ...items, ...items, ...items];
  const duration = Math.max(15, (items.length * 20) / (speed / 20));

  return (
    <div className={cn('relative w-full overflow-hidden whitespace-nowrap py-3.5 border-y border-[#E2E8F0] bg-[#F8FAFC] select-none shadow-xs', className)}>
      <div
        className="inline-flex items-center"
        style={{
          animation: `marqueeScroll ${duration}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {repeated.map((text, i) => (
          <div key={i} className="inline-flex items-center">
            <span className={cn('font-mono text-xs uppercase tracking-widest text-[#475569] font-medium', itemClassName)}>
              {text}
            </span>
            <span className="mx-6 text-[#1789E5] font-mono text-sm font-bold">{separator}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
