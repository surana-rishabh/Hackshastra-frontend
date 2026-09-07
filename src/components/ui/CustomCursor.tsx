import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hoverType, setHoverType] = React.useState<'default' | 'link' | 'button' | 'media' | null>(null);
  const [isClicking, setIsClicking] = React.useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  React.useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHoverable = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a')) {
        setHoverType('link');
      } else if (target?.closest('button') || target?.closest('[role="button"]')) {
        setHoverType('button');
      } else if (target?.closest('video') || target?.closest('img')) {
        setHoverType('media');
      } else {
        setHoverType(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', checkHoverable);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mouseleave', handleMouseLeave);
    document.removeEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', checkHoverable);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  const isInteractive = hoverType !== null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="relative transition-all duration-200"
          style={{
            width: isInteractive ? 36 : 22,
            height: isInteractive ? 36 : 22,
          }}
          animate={{
            rotate: isInteractive ? 45 : 0,
            scale: isClicking ? 0.75 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <span className="absolute top-0 left-0 h-2 w-2 border-t-[1.5px] border-l-[1.5px] border-[#1789E5]" />
          <span className="absolute top-0 right-0 h-2 w-2 border-t-[1.5px] border-r-[1.5px] border-[#1789E5]" />
          <span className="absolute bottom-0 left-0 h-2 w-2 border-b-[1.5px] border-l-[1.5px] border-[#1789E5]" />
          <span className="absolute bottom-0 right-0 h-2 w-2 border-b-[1.5px] border-r-[1.5px] border-[#1789E5]" />
        </motion.div>

        {isInteractive && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 28 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 -translate-y-1/2 whitespace-nowrap bg-[#090D12] border border-[#1789E5] px-1.5 py-0.5 rounded-[2px] font-mono text-[9px] uppercase tracking-wider text-[#FFFFFF] shadow-md"
          >
            {hoverType === 'link' && 'OPEN // LINK'}
            {hoverType === 'button' && 'ACTION // EXEC'}
            {hoverType === 'media' && 'VIEW // MEDIA'}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full bg-[#1789E5] shadow-[0_0_6px_#1789E5]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 4,
          height: 4,
        }}
      />
    </div>
  );
};
