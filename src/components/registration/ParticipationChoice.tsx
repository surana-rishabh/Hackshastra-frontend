import * as React from 'react';
import { motion } from 'motion/react';
import { Swords, ShieldAlert, Users, Check } from 'lucide-react';
import { ParticipationOption } from '@/data/registration/beyondTheScreen';
import { cn } from '@/lib/utils';

interface ParticipationChoiceProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: ParticipationOption[];
  typeAccent?: string;
  error?: string;
  className?: string;
}

export const ParticipationChoice: React.FC<ParticipationChoiceProps> = ({
  id,
  value,
  onChange,
  options,
  typeAccent = '#F97316',
  error,
  className,
}) => {
  const getIcon = (val: string) => {
    switch (val) {
      case 'yes':
        return <Swords className="w-3.5 h-3.5" />;
      case 'maybe':
        return <Users className="w-3.5 h-3.5" />;
      case 'no':
      default:
        return <ShieldAlert className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className={cn('w-full space-y-1.5 text-left', className)} role="radiogroup" aria-labelledby={`${id}-label`}>
      <div className="flex items-center justify-between">
        <label
          id={`${id}-label`}
          className="block font-pokemon text-[11px] sm:text-xs uppercase tracking-wider text-amber-200"
        >
          READY FOR THE BATTLE? <span className="text-red-400">*</span>
        </label>
        <span className="font-mono text-[9px] sm:text-[10px] text-slate-400">Battle Mode</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <motion.button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(opt.value)}
              className={cn(
                'relative p-2.5 rounded-[4px] border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between group',
                isSelected
                  ? 'bg-black/90 shadow-md border-2'
                  : 'bg-black/50 hover:bg-black/70 border-white/20 hover:border-white/40'
              )}
              style={{
                borderColor: isSelected ? typeAccent : undefined,
                boxShadow: isSelected ? `0 0 16px ${typeAccent}40` : undefined,
              }}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span
                  className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] flex items-center gap-1 uppercase"
                  style={{
                    backgroundColor: isSelected ? `${typeAccent}30` : '#33415550',
                    color: isSelected ? typeAccent : '#94A3B8',
                  }}
                >
                  {getIcon(opt.value)}
                  <span>{opt.badge}</span>
                </span>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-black"
                    style={{ backgroundColor: typeAccent }}
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </motion.div>
                )}
              </div>

              <div className="mt-0.5">
                <div
                  className="font-pokemon text-[11px] sm:text-xs tracking-wide transition-colors"
                  style={{ color: isSelected ? typeAccent : '#F8FAFC' }}
                >
                  {opt.label}
                </div>
                <div className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                  {opt.subtext}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {error && (
        <p className="font-mono text-[10px] sm:text-[11px] text-red-400 font-medium mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
};
