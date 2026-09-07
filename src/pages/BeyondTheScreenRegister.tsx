import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { beyondTheScreenConfig } from '@/data/registration/beyondTheScreen';
import { useRegistrationForm } from '@/hooks/useRegistrationForm';
import { RegistrationHeader } from '@/components/registration/RegistrationHeader';
import { PokedexDevice } from '@/components/registration/PokedexDevice';
import { RegistrationSuccess } from '@/components/registration/RegistrationSuccess';
import { PingPongVideoBackground } from '@/components/registration/PingPongVideoBackground';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { api } from '@/lib/api';
import bgVideoUrl from '@/assets/events/beyond-the-screen/bg-loop.webm';
import { PokeballCursor } from '@/components/registration/PokeballCursor';

export const BeyondTheScreenRegister: React.FC = () => {
  const navigate = useNavigate();

  const { formData, errors, setFieldValue, validateAll, resetForm } = useRegistrationForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submissionError, setSubmissionError] = React.useState<string | null>(null);
  const [registrationResult, setRegistrationResult] = React.useState<any>(null);

  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/events');
    }
  };

  const handleSubmit = async (e: React.FormEvent, verificationProofToken?: string) => {
    e.preventDefault();
    setSubmissionError(null);

    const isValid = validateAll(beyondTheScreenConfig);
    if (!isValid) {
      setSubmissionError('Please complete all required protocols highlighted in red to sync your Pokédex.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.contactNumber.trim(),
        student_id: formData.studentId.trim(),
        gender: formData.gender,
        department: formData.department,
        year: formData.year,
        favourite_pokemon: formData.favouritePokemon,
        participation_interest: formData.participationInterest,
        college: 'SRM University-AP',
        verificationProofToken: verificationProofToken || undefined,
        otpVerified: true,
      };

      const res = await api.post(`/api/events/${beyondTheScreenConfig.eventId}/register`, payload);

      if (res.success || res.data) {
        setRegistrationResult(res.data?.registration || res.data || {});
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(res.message || 'Registration failed to complete');
      }
    } catch (err: any) {
      setSubmissionError(err.message || 'Registration could not be completed. Please verify your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    resetForm();
    setIsSubmitted(false);
    setRegistrationResult(null);
    setSubmissionError(null);
  };

  return (
    <div className="pokeball-cursor-page relative min-h-screen w-full bg-[#FCF6D9] flex flex-col justify-start items-center pt-5 sm:pt-8 pb-12 px-3 sm:px-4 overflow-x-hidden text-[#0F172A] selection:bg-[#CF4B00]/30 selection:text-[#0F172A]">
      <PokeballCursor />
      {/* Full-Page Continuous Video Background Loop */}
      <PingPongVideoBackground
        src={bgVideoUrl || '/events/beyond-the-screen/bg-loop.webm'}
        overlayClassName="bg-[#FCF6D9]/40 backdrop-blur-[0.5px]"
      />

      {/* Floating Top-Left Corner Back Button */}
      <div className="fixed top-3 left-3 sm:top-5 sm:left-5 z-50">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#CF4B00] hover:bg-[#b04000] border border-[#CF4B00] text-[#FFFFFF] font-mono text-xs transition-all shadow-xl hover:shadow-[#CF4B00]/30 group cursor-pointer"
          title="Go back to previous page"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#FFFFFF] group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-bold tracking-wider uppercase text-[11px]">BACK</span>
        </button>
      </div>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center space-y-5 sm:space-y-7">
        {/* Page Header */}
        <FadeUp duration={0.4}>
          <RegistrationHeader
            eventTitle={beyondTheScreenConfig.eventTitle}
            className="mb-1 sm:mb-2"
          />
        </FadeUp>

        {/* Pure Pokédex Device */}
        <div className="w-full flex justify-center pt-1">
          {isSubmitted ? (
            <RegistrationSuccess
              formData={formData}
              registrationResult={registrationResult}
              cardBackKey={beyondTheScreenConfig.cardBackKey}
              onReset={handleReset}
            />
          ) : (
            <PokedexDevice
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting}
              submissionError={submissionError}
              onFieldChange={setFieldValue}
              onSubmit={handleSubmit}
              onDismissError={() => setSubmissionError(null)}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default BeyondTheScreenRegister;
