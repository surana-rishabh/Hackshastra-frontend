import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight } from 'lucide-react';

interface EntrancePortalProps {
  onEnter: () => void;
}

export const EntrancePortal: React.FC<EntrancePortalProps> = ({ onEnter }) => {
  const [isClosing, setIsClosing] = React.useState(false);

  const handleEnterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClosing(true);

    if ('startViewTransition' in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => { ready: Promise<void> } }).startViewTransition(() => {
        onEnter();
      });
    } else {
      setTimeout(() => {
        onEnter();
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to HackShastra"
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#030708] p-6 select-none overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,165,240,0.15)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

          <div className="relative mb-8 flex items-center justify-center">
            <div className="absolute h-44 w-44 rounded-full border border-[#0DA5F0]/20 animate-spin [animation-duration:18s]" />
            <div className="absolute h-56 w-56 rounded-full border border-dashed border-[#2563EB]/30 animate-spin [animation-duration:28s] [animation-direction:reverse]" />

            <div className="absolute h-28 w-28 rounded-full bg-[#0DA5F0]/20 blur-2xl animate-pulse" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border border-[#0DA5F0]/40 bg-[#0B1317] p-5 shadow-[0_0_40px_rgba(13,165,240,0.35)]"
            >
              <img
                src="/logo.svg"
                alt="HackShastra Emblem"
                className="h-full w-full object-contain"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8 max-w-lg"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-[#0DA5F0] mb-2">
              [ SRM UNIVERSITY-AP CHAPTER ]
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF]">
              HACKSHASTRA
            </h1>
            <p className="mt-2 text-sm text-[#94A3B8] font-mono">
              India's First Creator-Led Tech Community
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              variant="glow"
              size="lg"
              onClick={handleEnterClick}
              className="font-mono tracking-wider text-sm px-8 py-3 rounded-[2px]"
            >
              <span>ENTER PORTAL</span>
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </motion.div>

          <div className="absolute bottom-6 font-mono text-[11px] text-[#94A3B8] tracking-widest">
            16.4627° N / 80.5068° E
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
