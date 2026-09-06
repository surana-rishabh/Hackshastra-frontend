import * as React from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { RegistrationDeckConfig } from '@/data/registration/beyondTheScreen';
import { RegistrationFormData, FormValidationErrors } from '@/hooks/useRegistrationForm';
import { useCardTilt } from '@/hooks/useCardTilt';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { RegistrationCard } from './RegistrationCard';
import { cn } from '@/lib/utils';

interface CardStackProps {
  config: RegistrationDeckConfig;
  currentCard: number;
  direction: 1 | -1;
  formData: RegistrationFormData;
  errors: FormValidationErrors;
  completedCards: Set<number>;
  onFieldChange: (field: keyof RegistrationFormData, value: string) => void;
  onEditCard: (cardIndex: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onSubmit?: () => void;
  isFirstCard?: boolean;
  isLastCard?: boolean;
  isTransitioning?: boolean;
  isSubmitting?: boolean;
  className?: string;
}

export const CardStack: React.FC<CardStackProps> = ({
  config,
  currentCard,
  direction,
  formData,
  errors,
  completedCards,
  onFieldChange,
  onEditCard,
  onNext,
  onPrev,
  onSubmit,
  isFirstCard = false,
  isLastCard = false,
  isTransitioning = false,
  isSubmitting = false,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const {
    cardRef,
    rotateX,
    rotateY,
    glossX,
    glossY,
    handlePointerMove,
    handlePointerLeave,
  } = useCardTilt();

  const totalCards = config.cards.length;
  const activeCardConfig = config.cards[currentCard];

  // Motion variants for active card enter / exit
  const cardVariants: Variants = {
    enter: (dir: 1 | -1) => ({
      x: prefersReducedMotion ? 0 : dir === 1 ? 130 : -130,
      y: prefersReducedMotion ? 0 : 15,
      rotate: prefersReducedMotion ? 0 : dir === 1 ? 6 : -6,
      scale: 0.95,
      opacity: 0,
    }),
    center: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 24, mass: 0.8 },
        y: { type: 'spring' as const, stiffness: 280, damping: 24, mass: 0.8 },
        rotate: { type: 'spring' as const, stiffness: 280, damping: 24, mass: 0.8 },
        scale: { type: 'spring' as const, stiffness: 280, damping: 24, mass: 0.8 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: 1 | -1) => ({
      x: prefersReducedMotion ? 0 : dir === 1 ? -90 : 90,
      y: prefersReducedMotion ? 0 : 25,
      rotate: prefersReducedMotion ? 0 : dir === 1 ? -5 : 5,
      scale: 0.94,
      opacity: 0,
      transition: {
        x: { duration: 0.35, ease: [0.32, 0, 0.67, 0] },
        y: { duration: 0.35, ease: [0.32, 0, 0.67, 0] },
        rotate: { duration: 0.35 },
        scale: { duration: 0.35 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  // Pre-calculate rear stack cards configuration
  const rearCards = React.useMemo(() => {
    const rear = [];
    for (let i = 1; i <= 2; i++) {
      const targetIdx = currentCard + i;
      if (targetIdx < totalCards) {
        rear.push({
          card: config.cards[targetIdx],
          index: targetIdx,
          offsetY: i * 12,
          scale: 1 - i * 0.025,
          rotate: i === 1 ? -1.5 : 1.5,
          zIndex: 10 - i,
          opacity: 1 - i * 0.25,
        });
      }
    }
    return rear;
  }, [config.cards, currentCard, totalCards]);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'relative w-full max-w-[560px] sm:max-w-[620px] md:max-w-[650px] mx-auto min-h-[550px] sm:min-h-[600px] flex items-center justify-center perspective-[1200px]',
        className
      )}
    >
      {/* Background Deck Shadow */}
      <div className="absolute inset-x-8 bottom-2 h-8 bg-black/15 blur-xl rounded-full pointer-events-none" />

      {/* Rear Stack Cards (Physical Deck visual effect) */}
      {rearCards.map((rc) => (
        <motion.div
          key={`rear-${rc.card.id}`}
          initial={false}
          animate={{
            y: rc.offsetY,
            scale: rc.scale,
            rotate: rc.rotate,
            opacity: rc.opacity,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          className="absolute inset-x-0 top-0 pointer-events-none select-none"
          style={{ zIndex: rc.zIndex }}
        >
          <RegistrationCard
            card={rc.card}
            cardIndex={rc.index}
            totalCards={totalCards}
            formData={formData}
            errors={{}}
            isCompleted={completedCards.has(rc.index)}
            onFieldChange={() => {}}
            onEditCard={() => {}}
            isRear={true}
          />
        </motion.div>
      ))}

      {/* Active Interactive Top Card */}
      <div className="relative w-full z-20">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={`active-${activeCardConfig.id}`}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <RegistrationCard
              card={activeCardConfig}
              cardIndex={currentCard}
              totalCards={totalCards}
              formData={formData}
              errors={errors}
              isCompleted={completedCards.has(currentCard)}
              onFieldChange={onFieldChange}
              onEditCard={onEditCard}
              onNext={onNext}
              onPrev={onPrev}
              onSubmit={onSubmit}
              isFirstCard={isFirstCard}
              isLastCard={isLastCard}
              isTransitioning={isTransitioning}
              isSubmitting={isSubmitting}
              rotateX={rotateX}
              rotateY={rotateY}
              glossX={glossX}
              glossY={glossY}
              isRear={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
