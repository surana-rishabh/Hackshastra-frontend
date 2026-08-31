import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';

interface MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

/** Split Reveal Typography Primitive */
export const SplitReveal: React.FC<{ text: string; className?: string; delay?: number }> = ({
  text,
  className = '',
  delay = 0,
}) => {
  const words = text.split(' ');
  return (
    <div className={`overflow-hidden flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{
            duration: 0.6,
            delay: delay + idx * 0.04,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

/** Fade Reveal Primitive */
export const FadeReveal: React.FC<MotionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

/** Mask Clip Path Reveal Primitive */
export const MaskReveal: React.FC<MotionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
}) => (
  <motion.div
    initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', opacity: 0 }}
    whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/** Image Parallax Scroll Primitive */
export const ImageParallax: React.FC<{ src: string; alt: string; className?: string }> = ({
  src,
  alt,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <motion.img src={src} alt={alt} style={{ y, scale: 1.15 }} className="w-full h-full object-cover" />
    </div>
  );
};

/** Magnetic Interactive Button Primitive */
export const MagneticButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = '', onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      onClick={onClick}
      className={`cursor-pointer inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

/** Full Curtain Transition Primitive */
export const PageCurtain: React.FC = () => (
  <motion.div
    initial={{ scaleY: 1 }}
    animate={{ scaleY: 0 }}
    exit={{ scaleY: 1 }}
    transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }}
    className="fixed inset-0 bg-primary z-50 origin-top pointer-events-none"
  />
);
