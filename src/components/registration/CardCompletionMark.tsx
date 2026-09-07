import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CardCompletionMarkProps {
  isCompleted: boolean;
  typeAccent?: string;
  className?: string;
  label?: string;
}

export const CardCompletionMark: React.FC<CardCompletionMarkProps> = ({
  isCompleted,
  typeAccent = '#1789E5',
  className,
  label = 'CAPTURED',
}) => {
  return (
    <AnimatePresence>
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className={cn(
            'absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] backdrop-blur-md shadow-md border font-mono text-[10px] font-bold uppercase tracking-wider',
            className
          )}
          style={{
            backgroundColor: 'rgba(9, 13, 18, 0.85)',
            borderColor: typeAccent,
            color: typeAccent,
            boxShadow: `0 0 14px ${typeAccent}40`,
          }}
        >
          <div
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: typeAccent }}
          >
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </div>
          <span>✓ {label}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
