import { useReducedMotion as useMotionReducedMotion } from 'motion/react';

export function useReducedMotion(): boolean {
  const isReduced = useMotionReducedMotion();
  return Boolean(isReduced);
}
