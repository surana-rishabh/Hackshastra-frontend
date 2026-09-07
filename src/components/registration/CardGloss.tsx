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
        'absolute inset-0 pointer-events-none rounded-[6px] overflow-hidden z-20 bg-white/10 backdrop-blur-[1px] opacity-30',
        className
      )}
    />
  );
};
