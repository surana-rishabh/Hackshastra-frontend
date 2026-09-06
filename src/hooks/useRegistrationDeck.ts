import { useState, useCallback, useRef } from 'react';

export interface UseRegistrationDeckOptions {
  totalCards: number;
  onValidateCard?: (cardIndex: number) => boolean;
  onDeckComplete?: () => void;
  transitionDurationMs?: number;
}

export function useRegistrationDeck({
  totalCards,
  onValidateCard,
  onDeckComplete,
  transitionDurationMs = 450,
}: UseRegistrationDeckOptions) {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());
  const [isSlapping, setIsSlapping] = useState<boolean>(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const lockTransition = useCallback(() => {
    setIsTransitioning(true);
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setIsSlapping(false);
    }, transitionDurationMs);
  }, [transitionDurationMs]);

  const nextCard = useCallback(() => {
    if (isTransitioning) return false;

    // Validate current card
    if (onValidateCard && !onValidateCard(currentCard)) {
      return false;
    }

    // Mark current card as completed
    setCompletedCards((prev) => new Set(prev).add(currentCard));

    if (currentCard < totalCards - 1) {
      setIsSlapping(true);
      setDirection(1);
      setCurrentCard((prev) => prev + 1);
      lockTransition();
      return true;
    } else {
      // Reached the final card
      if (onDeckComplete) {
        onDeckComplete();
      }
      return true;
    }
  }, [currentCard, totalCards, isTransitioning, onValidateCard, onDeckComplete, lockTransition]);

  const prevCard = useCallback(() => {
    if (isTransitioning || currentCard <= 0) return false;

    setDirection(-1);
    setCurrentCard((prev) => prev - 1);
    lockTransition();
    return true;
  }, [currentCard, isTransitioning, lockTransition]);

  const goToCard = useCallback(
    (targetIndex: number) => {
      if (isTransitioning || targetIndex === currentCard || targetIndex < 0 || targetIndex >= totalCards) {
        return;
      }

      // If jumping forward, validate intervening cards
      if (targetIndex > currentCard) {
        if (onValidateCard && !onValidateCard(currentCard)) {
          return;
        }
      }

      setDirection(targetIndex > currentCard ? 1 : -1);
      setCurrentCard(targetIndex);
      lockTransition();
    },
    [currentCard, totalCards, isTransitioning, onValidateCard, lockTransition]
  );

  const resetDeck = useCallback(() => {
    setCurrentCard(0);
    setDirection(1);
    setIsTransitioning(false);
    setCompletedCards(new Set());
    setIsSlapping(false);
  }, []);

  return {
    currentCard,
    direction,
    isTransitioning,
    isSlapping,
    completedCards,
    isFirstCard: currentCard === 0,
    isLastCard: currentCard === totalCards - 1,
    nextCard,
    prevCard,
    goToCard,
    resetDeck,
  };
}
