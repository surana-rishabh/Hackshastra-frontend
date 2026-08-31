import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface CurtainTransitionProps {
  children: React.ReactNode;
}

export const CurtainTransition: React.FC<CurtainTransitionProps> = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname} className="relative w-full min-h-screen">
        {/* Top Curtain Overlay */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
          className="fixed inset-0 z-50 bg-[#071014] border-b border-primary/40 pointer-events-none flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.9 }}
            exit={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-primary font-mono text-xs tracking-[0.3em] uppercase flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span>HACKSHASTRA // LOADING</span>
          </motion.div>
        </motion.div>

        {/* Page Content Viewport */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CurtainTransition;
