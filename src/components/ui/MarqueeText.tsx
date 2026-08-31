import { useRef } from 'react';

interface MarqueeTextProps {
  /** The text items to scroll (joined with bullet separator) */
  items?: string[];
  /** Scroll speed in pixels per second */
  speed?: number;
  /** Additional CSS class names */
  className?: string;
  /** Whether to reverse scroll direction */
  reverse?: boolean;
  /** Separator character between items */
  separator?: string;
}

/**
 * MarqueeText Component
 * Infinite horizontally scrolling text strip inspired by Next Tech Lab's visual dividers.
 * Uses pure CSS animation for buttery smooth 60fps performance.
 */
const MarqueeText = ({
  items = ['HACKSHASTRA', 'INNOVATE', 'BUILD', 'HACK', 'CREATE', 'DISRUPT', 'LEARN', 'SHIP'],
  speed = 40,
  className = '',
  reverse = false,
  separator = '•',
}: MarqueeTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Build the repeated text string
  const textContent = items.join(` ${separator} `) + ` ${separator} `;

  // Calculate animation duration based on speed
  const duration = Math.max(10, (items.length * 8) / (speed / 40));

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap select-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="inline-flex"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite${reverse ? ' reverse' : ''}`,
        }}
      >
        {/* Duplicate the text 4 times for seamless infinite loop */}
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="inline-block font-black tracking-[0.15em] uppercase"
          >
            {textContent}&nbsp;
          </span>
        ))}
      </div>

      {/* Inject keyframe animation via style tag */}
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default MarqueeText;
