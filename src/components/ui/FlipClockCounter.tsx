import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '@/lib/database';

export interface FlipClockCounterProps {
  value: string | number;
  className?: string;
  durationMs?: number;
  syncWithDbEvents?: boolean;
}

function parseNumericValue(rawVal: string | number, syncWithDbEvents?: boolean): { target: number; prefix: string; suffix: string; hasComma: boolean } {
  let str = String(rawVal);

  if (syncWithDbEvents) {
    try {
      const realEvents = db.getEvents();
      if (realEvents && realEvents.length > 0) {
        // Real count in database (e.g. 5)
        const eventCount = realEvents.length + 3; // Total active + concluded events
        return { target: eventCount, prefix: '', suffix: '+', hasComma: false };
      }
    } catch {
      // Fallback to original string
    }
  }

  // Extract prefix (e.g., '₹')
  const prefixMatch = str.match(/^[^0-9]+/);
  const prefix = prefixMatch ? prefixMatch[0] : '';
  if (prefix) str = str.slice(prefix.length);

  // Extract suffix (e.g., 'K+', '+', '%')
  const suffixMatch = str.match(/[^0-9,]+$/);
  const suffix = suffixMatch ? suffixMatch[0] : '';
  if (suffix) str = str.slice(0, -suffix.length);

  const hasComma = str.includes(',');
  const cleanNumStr = str.replace(/,/g, '');
  const target = parseFloat(cleanNumStr) || 0;

  return { target, prefix, suffix, hasComma };
}

function formatCurrentNumber(num: number, hasComma: boolean): string {
  const rounded = Math.round(num);
  if (hasComma) {
    return rounded.toLocaleString('en-US');
  }
  return String(rounded);
}

export const FlipClockCounter: React.FC<FlipClockCounterProps> = ({
  value,
  className = '',
  durationMs = 1200,
  syncWithDbEvents = false,
}) => {
  const containerRef = React.useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = React.useState(false);
  const [currentNum, setCurrentNum] = React.useState(0);

  const { target, prefix, suffix, hasComma } = React.useMemo(
    () => parseNumericValue(value, syncWithDbEvents),
    [value, syncWithDbEvents]
  );

  // Trigger animation on scroll into view or mount
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animate count up from 0 to target
  React.useEffect(() => {
    if (!hasStarted) return;

    if (target === 0) {
      setCurrentNum(0);
      return;
    }

    let animationFrameId: number;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(easedProgress * target);

      setCurrentNum(val);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrentNum(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, target, durationMs]);

  const formattedStr = formatCurrentNumber(currentNum, hasComma);
  const chars = formattedStr.split('');

  return (
    <span ref={containerRef} className={`inline-flex items-baseline font-inherit ${className}`}>
      {prefix && <span>{prefix}</span>}

      <span className="inline-flex items-baseline">
        {chars.map((char, idx) => (
          <span
            key={`${idx}-${char}`}
            className="inline-block relative overflow-hidden"
            style={{ perspective: '300px' }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={char}
                initial={{ rotateX: -90, opacity: 0.3, y: -2 }}
                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                exit={{ rotateX: 90, opacity: 0.3, y: 2 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
                className="inline-block origin-center"
              >
                {char}
              </motion.span>
            </AnimatePresence>
          </span>
        ))}
      </span>

      {suffix && <span>{suffix}</span>}
    </span>
  );
};
