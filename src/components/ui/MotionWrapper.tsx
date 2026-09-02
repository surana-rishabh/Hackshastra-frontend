import * as React from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export const FadeUp: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  yOffset = 20,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SplitText: React.FC<{ text: string; className?: string; delay?: number }> = ({
  text,
  className,
  delay = 0,
}) => {
  const words = text.split(' ');
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <span ref={ref} className={cn('inline-block', className)}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: 0.55,
              delay: delay + index * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export const MaskReveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.7,
}) => {
  return (
    <motion.div
      initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', opacity: 0 }}
      whileInView={{ clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
