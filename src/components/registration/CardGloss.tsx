import * as React from 'react';
import { motion, MotionValue } from 'motion/react';
import { cn } from '@/lib/utils';

interface CardGlossProps {
  glossX?: MotionValue<string> | string;
  glossY?: MotionValue<string> | string;
  className?: string;
}

export const CardGloss: React.FC<CardGlossProps> = ({
  glossX = '50%',
  glossY = '50%',
  className,
}) => {
  return (
    <motion.div
      className={cn(
        'absolute inset-0 pointer-events-none rounded-[6px] overflow-hidden z-20 mix-blend-overlay opacity-30',
        className
      )}
      style={{
        background: typeof glossX === 'string'
          ? `radial-gradient(circle at ${glossX} ${glossY}, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`
          : undefined,
      }}
    >
      {typeof glossX !== 'string' && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at ${glossX} ${glossY}, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 60%)`,
          }}
        />
      )}
    </motion.div>
  );
};
