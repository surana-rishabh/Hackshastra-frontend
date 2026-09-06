import * as React from 'react';
import { useMotionValue, useSpring, useTransform } from 'motion/react';
import { useReducedMotion } from './useReducedMotion';

export interface UseCardTiltOptions {
  maxRotateX?: number; // default 2.5
  maxRotateY?: number; // default 4
  stiffness?: number;  // default 300
  damping?: number;    // default 30
  disabled?: boolean;
}

export function useCardTilt({
  maxRotateX = 2.5,
  maxRotateY = 4,
  stiffness = 280,
  damping = 25,
  disabled = false,
}: UseCardTiltOptions = {}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Normalized pointer positions between -0.5 and 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth physical springs
  const springX = useSpring(x, { stiffness, damping, mass: 0.5 });
  const springY = useSpring(y, { stiffness, damping, mass: 0.5 });

  // 3D rotations: moving mouse right tilts card Y right (+), moving mouse down tilts card X top toward viewer (-)
  const rotateX = useTransform(springY, [-0.5, 0.5], [maxRotateX, -maxRotateX]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxRotateY, maxRotateY]);

  // Gloss coordinates (0% to 100%)
  const glossX = useTransform(springX, [-0.5, 0.5], ['20%', '80%']);
  const glossY = useTransform(springY, [-0.5, 0.5], ['20%', '80%']);

  const isInteractive = !disabled && !prefersReducedMotion;

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isInteractive || e.pointerType === 'touch') return;
      const el = cardRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Calculate normalized position relative to center (-0.5 to 0.5)
      const normX = Math.max(-0.5, Math.min(0.5, clientX / rect.width - 0.5));
      const normY = Math.max(-0.5, Math.min(0.5, clientY / rect.height - 0.5));

      x.set(normX);
      y.set(normY);
    },
    [isInteractive, x, y]
  );

  const handlePointerLeave = React.useCallback(() => {
    if (!isInteractive) return;
    x.set(0);
    y.set(0);
  }, [isInteractive, x, y]);

  return {
    cardRef,
    rotateX: isInteractive ? rotateX : 0,
    rotateY: isInteractive ? rotateY : 0,
    glossX: isInteractive ? glossX : '50%',
    glossY: isInteractive ? glossY : '50%',
    handlePointerMove,
    handlePointerLeave,
  };
}
