import * as React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface DeckControlsProps {
  currentCard: number;
  totalCards: number;
  isFirstCard: boolean;
  isLastCard: boolean;
  isTransitioning: boolean;
  isSubmitting?: boolean;
  activeAccent?: string;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  className?: string;
}

export const DeckControls: React.FC<DeckControlsProps> = ({
  currentCard,
  totalCards,
  isFirstCard,
  isLastCard,
  isTransitioning,
  isSubmitting = false,
  activeAccent = '#0DA5F0',
  onPrev,
  onNext,
  onSubmit,
  className,
}) => {
  return (
    <div className={cn('w-full flex items-center justify-between gap-4 select-none pt-2', className)}>
      {/* Back Button */}
      <div>
        {!isFirstCard ? (
          <motion.button
            type="button"
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onPrev}
            disabled={isTransitioning || isSubmitting}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-[2px] border border-[#CBD5E1] bg-white hover:bg-slate-50 text-[#334155] font-mono text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK</span>
          </motion.button>
        ) : (
          <div className="w-[84px]" />
        )}
      </div>

      {/* Main Next / Confirm Button */}
      <div>
        {isLastCard ? (
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSubmit}
            disabled={isTransitioning || isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-[2px] text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: activeAccent,
              boxShadow: `0 4px 14px ${activeAccent}50`,
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>FINALIZING DECK...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>CONFIRM REGISTRATION</span>
              </>
            )}
          </motion.button>
        ) : (
          <motion.button
            type="button"
            whileHover={{ x: 2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            disabled={isTransitioning || isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-[2px] text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: activeAccent,
              boxShadow: `0 4px 14px ${activeAccent}40`,
            }}
          >
            <span>NEXT CARD</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
};
