import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PokedexBootLoaderProps {
  isLoading: boolean;
  progress: number;
  statusMessage?: string;
  onComplete?: () => void;
}

export const PokedexBootLoader: React.FC<PokedexBootLoaderProps> = ({
  isLoading,
  progress,
  statusMessage = 'SYNCHRONIZING POKÉDEX ASSETS...',
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="pokedex-boot-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] w-full h-full bg-[#070A0F] flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden"
        >
          {/* Ambient Background Grid & Glows */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#EF4444]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#38BDF8]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

          {/* Main Pokédex Chassis Terminal Box */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-md bg-[#131A26] border-2 border-[#EF4444]/40 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(239,68,68,0.15)] overflow-hidden"
          >
            {/* Top Red Device Banner with Triple Status LEDs */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-5">
              <div className="flex items-center gap-3">
                {/* Master Blue Sensor Eye */}
                <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#38BDF8] via-[#0284C7] to-[#0369A1] p-[2px] shadow-[0_0_20px_rgba(56,189,248,0.6)] border-2 border-white/80 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white/70 blur-[1px] -translate-x-1 -translate-y-1" />
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-full border-2 border-[#38BDF8] pointer-events-none"
                  />
                </div>

                {/* Triple Mini Diagnostic LEDs */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444] shadow-[0_0_8px_#EF4444] animate-ping" />
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B] animate-pulse" />
                  <span className="w-3 h-3 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                </div>
              </div>

              {/* Firmware Badge */}
              <div className="text-right">
                <span className="text-[10px] font-mono tracking-widest text-[#EF4444] font-bold uppercase bg-[#EF4444]/10 px-2 py-0.5 rounded border border-[#EF4444]/30">
                  POKÉDEX V2.4
                </span>
                <p className="text-[9px] font-mono text-[#94A3B8] tracking-wider mt-0.5">SRM-AP ARENA</p>
              </div>
            </div>

            {/* CRT Screen Display */}
            <div className="relative bg-[#0A0E17] border-2 border-[#1E293B] rounded-2xl p-5 overflow-hidden shadow-inner">
              {/* Scanlines Effect Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] z-20 pointer-events-none opacity-60" />

              {/* CRT Vignette & Screen Glow */}
              <div className="absolute inset-0 bg-radial from-transparent via-[#38BDF8]/5 to-black/60 pointer-events-none z-10" />

              <div className="relative z-30 flex flex-col items-center text-center space-y-4">
                {/* Animated Glowing Pokéball */}
                <div className="relative w-16 h-16 my-1">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    className="w-full h-full"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]">
                      {/* Top Half Red */}
                      <path d="M 5,50 A 45,45 0 0,1 95,50 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="6" />
                      {/* Bottom Half White */}
                      <path d="M 5,50 A 45,45 0 0,0 95,50 Z" fill="#F8FAFC" stroke="#0F172A" strokeWidth="6" />
                      {/* Center Divider */}
                      <line x1="5" y1="50" x2="95" y2="50" stroke="#0F172A" strokeWidth="7" />
                      {/* Outer Button Ring */}
                      <circle cx="50" cy="50" r="14" fill="#0F172A" />
                      {/* Inner Button Core */}
                      <circle cx="50" cy="50" r="8" fill="#FFFFFF" />
                      <circle cx="50" cy="50" r="4" fill="#EF4444" />
                    </svg>
                  </motion.div>
                </div>

                {/* Title & Status */}
                <div>
                  <h3 className="text-sm font-mono font-bold tracking-widest text-[#F8FAFC] uppercase">
                    BOOTING POKÉDEX ARENA
                  </h3>
                  <p className="text-[11px] font-mono text-[#38BDF8] tracking-wider mt-1 h-5 flex items-center justify-center">
                    {statusMessage}
                  </p>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full space-y-1.5 pt-1">
                  <div className="flex justify-between text-[10px] font-mono text-[#94A3B8]">
                    <span>BUFFERING MATRIX</span>
                    <span className="font-bold text-[#F8FAFC]">{Math.round(progress)}%</span>
                  </div>

                  <div className="w-full h-2.5 bg-[#1E293B] rounded-full overflow-hidden p-[2px] border border-white/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#38BDF8] rounded-full shadow-[0_0_10px_#38BDF8]"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Diagnostic Protocol Output */}
                <div className="w-full bg-[#05080E] rounded-lg p-2.5 border border-white/5 font-mono text-[9px] text-[#64748B] text-left space-y-0.5">
                  <div className="text-[#10B981] flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                    <span>SYSTEM STATUS: {progress >= 100 ? 'ONLINE // READY' : 'PRE-FETCHING ASSETS'}</span>
                  </div>
                  <div>DEVICE: CV 402 TERMINAL NODE #07</div>
                  <div className="text-[#38BDF8]/80">MEM: OK • HOLO: SYNCED • VIDEO: PRELOADED</div>
                </div>
              </div>
            </div>

            {/* Bottom Mechanical Footers */}
            <div className="flex items-center justify-between pt-4 mt-2">
              <div className="flex gap-1.5">
                <span className="w-8 h-2 rounded-sm bg-[#1E293B]" />
                <span className="w-8 h-2 rounded-sm bg-[#1E293B]" />
              </div>
              <span className="text-[10px] font-mono text-[#475569]">BEYOND THE SCREEN • 2026</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
