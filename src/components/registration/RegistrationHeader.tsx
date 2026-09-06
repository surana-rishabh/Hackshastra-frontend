import * as React from 'react';
import { Radio } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RegistrationHeaderProps {
  eventTitle?: string;
  className?: string;
}

export const RegistrationHeader: React.FC<RegistrationHeaderProps> = ({
  eventTitle = 'BEYOND THE SCREEN',
  className,
}) => {
  return (
    <header className={cn('text-center space-y-2 select-none mb-2 sm:mb-3', className)}>
      {/* Top telemetry tag */}
      <div className="flex items-center justify-center gap-2 font-mono text-xs uppercase text-amber-300 font-bold">
        <span>POKÉMON TOURNAMENT REGISTRATION</span>
        <span>•</span>
        <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full text-[10px] border border-emerald-500/40">
          <Radio className="h-3 w-3 animate-pulse" /> ARENA LIVE
        </span>
      </div>

      {/* Main Title */}
      <h1 className="font-pokemon text-3xl sm:text-5xl tracking-wider text-[#FFCC03] [-webkit-text-stroke:2px_#2B5FA7] drop-shadow-[0_4px_16px_rgba(43,95,167,0.75)] uppercase pt-1">
        {eventTitle}
      </h1>
    </header>
  );
};
