import * as React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeckProgressProps {
  currentCard: number;
  totalCards: number;
  completedCards: Set<number>;
  activeAccent?: string;
  onSelectCard?: (index: number) => void;
  className?: string;
}

export const DeckProgress: React.FC<DeckProgressProps> = ({
  currentCard,
  totalCards,
  completedCards,
  activeAccent = '#1789E5',
  onSelectCard,
  className,
}) => {
  return (
    <div className={cn('w-full flex flex-col items-center gap-2 select-none z-20', className)}>
      {/* Top telemetry text */}
      <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-white/80 drop-shadow-md">
        <span>POKÉDEX SYNC</span>
        <span>•</span>
        <span style={{ color: activeAccent }} className="font-extrabold tracking-wide">
          MODULE 0{currentCard + 1} / 0{totalCards}
        </span>
      </div>

      {/* Translucent Stepper Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 shadow-xl">
        {Array.from({ length: totalCards }).map((_, idx) => {
          const isActive = idx === currentCard;
          const isDone = completedCards.has(idx);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectCard && isDone ? onSelectCard(idx) : undefined}
              disabled={!isDone && idx !== currentCard}
              title={`Card 0${idx + 1}`}
              className={cn(
                'relative flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 rounded-full',
                isActive
                  ? 'px-3.5 py-1 text-black shadow-lg font-black'
                  : isDone
                  ? 'px-3 py-1 bg-emerald-950/50 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 cursor-pointer backdrop-blur-sm'
                  : 'px-3 py-1 bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
              )}
              style={{
                backgroundColor: isActive ? activeAccent : undefined,
                boxShadow: isActive ? `0 0 16px ${activeAccent}80` : undefined,
              }}
            >
              {isDone && !isActive ? (
                <span className="flex items-center gap-1 text-[11px]">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>0{idx + 1}</span>
                </span>
              ) : (
                <span>0{idx + 1}</span>
              )}

              {isActive && (
                <motion.div
                  layoutId="activeDeckProgressIndicator"
                  className="absolute inset-0 rounded-full ring-2 ring-white/60 pointer-events-none"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DeckProgress;
