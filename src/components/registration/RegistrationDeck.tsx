import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RegistrationDeckConfig } from '@/data/registration/beyondTheScreen';
import { useRegistrationForm } from '@/hooks/useRegistrationForm';
import { useRegistrationDeck } from '@/hooks/useRegistrationDeck';
import { api } from '@/lib/api';
import { CardStack } from './CardStack';
import { DeckProgress } from './DeckProgress';
import { RegistrationSuccess } from './RegistrationSuccess';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RegistrationDeckProps {
  config: RegistrationDeckConfig;
  className?: string;
}

export const RegistrationDeck: React.FC<RegistrationDeckProps> = ({
  config,
  className,
}) => {
  const totalCards = config.cards.length;

  const {
    formData,
    errors,
    setFieldValue,
    validateCard,
    validateAll,
    resetForm,
  } = useRegistrationForm();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionError, setSubmissionError] = React.useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [registrationResult, setRegistrationResult] = React.useState<any>(null);
  const [announcement, setAnnouncement] = React.useState<string>('');

  // Deck state
  const {
    currentCard,
    direction,
    isTransitioning,
    completedCards,
    isFirstCard,
    isLastCard,
    nextCard,
    prevCard,
    goToCard,
    resetDeck,
  } = useRegistrationDeck({
    totalCards,
    onValidateCard: (cardIdx) => validateCard(cardIdx, config),
  });

  const activeCard = config.cards[currentCard];
  const activeAccent = activeCard?.typeAccent || '#0DA5F0';

  // Live accessibility announcement on card change
  React.useEffect(() => {
    if (activeCard) {
      setAnnouncement(`Card ${currentCard + 1} of ${totalCards}: ${activeCard.title}. ${activeCard.subtitle}`);
    }
  }, [currentCard, totalCards, activeCard]);

  // Submission handler
  const handleSubmit = async () => {
    setSubmissionError(null);

    // Validate entire deck
    const isValid = validateAll(config);
    if (!isValid) {
      setSubmissionError('Please resolve the highlighted card fields before finalizing your registration.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        studentId: formData.studentId.trim(),
        gender: formData.gender,
        email: formData.email.trim().toLowerCase(),
        contactNumber: formData.contactNumber.trim(),
        department: formData.department,
        year: formData.year,
        favouritePokemon: formData.favouritePokemon,
        participationInterest: formData.participationInterest,
        college: 'SRM University-AP',
      };

      const res = await api.post(`/api/events/${config.eventId}/register`, payload);

      if (res.success || res.data) {
        setRegistrationResult(res.data?.registration || res.data || {});
        setIsSubmitted(true);
      } else {
        throw new Error(res.message || 'Registration request could not be processed.');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      const errMsg = err.message || 'Registration failed. Please check your network and try again.';
      if (errMsg.toLowerCase().includes('already registered')) {
        setSubmissionError('This email is already registered for Beyond the Screen. Your trainer pass is already locked in!');
      } else {
        setSubmissionError(errMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    resetForm();
    resetDeck();
    setIsSubmitted(false);
    setRegistrationResult(null);
    setSubmissionError(null);
  };

  return (
    <section
      aria-label="Interactive Collectible Registration Deck"
      className={cn('w-full flex flex-col items-center gap-6 relative', className)}
    >
      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {isSubmitted ? (
        <RegistrationSuccess
          formData={formData}
          registrationResult={registrationResult}
          cardBackKey={config.cardBackKey}
          onReset={handleReset}
        />
      ) : (
        <div className="w-full max-w-[620px] sm:max-w-[660px] flex flex-col items-center gap-5">
          {/* Deck Progress Stepper */}
          <DeckProgress
            currentCard={currentCard}
            totalCards={totalCards}
            completedCards={completedCards}
            activeAccent={activeAccent}
            onSelectCard={(idx) => goToCard(idx)}
          />

          {/* Submission Error Banner */}
          <AnimatePresence>
            {submissionError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full p-3.5 rounded-[4px] bg-red-50 border border-red-200 text-red-700 font-mono text-xs flex items-start justify-between gap-3 text-left shadow-xs"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-red-800">REGISTRATION COULD NOT BE COMPLETED</strong>
                    <span>{submissionError}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmissionError(null)}
                  className="text-red-500 hover:text-red-800 font-bold p-1 cursor-pointer"
                  title="Dismiss error"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3D Physical Card Stack with integrated on-card next/back controls */}
          <CardStack
            config={config}
            currentCard={currentCard}
            direction={direction}
            formData={formData}
            errors={errors}
            completedCards={completedCards}
            onFieldChange={setFieldValue}
            onEditCard={(idx) => goToCard(idx)}
            onNext={nextCard}
            onPrev={prevCard}
            onSubmit={handleSubmit}
            isFirstCard={isFirstCard}
            isLastCard={isLastCard}
            isTransitioning={isTransitioning}
            isSubmitting={isSubmitting}
          />
        </div>
      )}
    </section>
  );
};
