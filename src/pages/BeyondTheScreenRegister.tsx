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
      // In development or offline preview mode, show card preview if backend isn't reachable
      if (import.meta.env.DEV) {
        setRegistrationResult({
          id: `BTS-DEV-${Math.floor(100000 + Math.random() * 900000)}`,
          status: 'VERIFIED',
          verified_at: new Date().toISOString(),
        });
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmissionError(err.message || 'Registration could not be completed. Please verify your details.');
      }
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
    <div className="relative min-h-screen w-full bg-[#06090E] flex flex-col justify-start items-center pt-5 sm:pt-8 pb-12 px-3 sm:px-4 overflow-x-hidden text-white selection:bg-[#F59E0B]/30 selection:text-white">
      {/* Full-Page Continuous Video Background Loop */}
      <PingPongVideoBackground
        src={bgVideoUrl || '/events/beyond-the-screen/bg-loop.webm'}
        overlayClassName="bg-black/40 backdrop-blur-[0.5px]"
      />

      {/* Floating Top-Left Corner Back Button */}
      <div className="fixed top-3 left-3 sm:top-5 sm:left-5 z-50">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-[#090D12] border border-white/25 hover:border-[#F59E0B] backdrop-blur-md text-white/90 hover:text-white font-mono text-xs transition-all shadow-xl hover:shadow-[#F59E0B]/30 group cursor-pointer"
          title="Go back to previous page"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-semibold tracking-wider uppercase text-[11px]">BACK</span>
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
