import * as React from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  PARTICIPATION_OPTIONS,
  DEPARTMENT_OPTIONS,
  YEAR_OPTIONS,
  GENDER_OPTIONS,
} from '@/data/registration/beyondTheScreen';
import { RegistrationFormData, FormValidationErrors } from '@/hooks/useRegistrationForm';
import { CardField } from './CardField';
import { SelectField } from './SelectField';
import { ParticipationChoice } from './ParticipationChoice';
import { StarterPartnerRevealGrid } from './StarterPartnerRevealGrid';
import { api } from '@/lib/api';
import {
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  User,
  Mail,
  GraduationCap,
  Flame,
  Swords,
  ShieldCheck,
  Send,
  KeyRound,
} from 'lucide-react';

interface PokedexDeviceProps {
  formData: RegistrationFormData;
  errors: FormValidationErrors;
  isSubmitting: boolean;
  submissionError: string | null;
  onFieldChange: (field: keyof RegistrationFormData, value: string) => void;
  onSubmit: (e: React.FormEvent, verificationProofToken?: string) => void;
  onDismissError?: () => void;
}

const TOTAL_STEPS = 5;

const STEP_METADATA = [
  { step: 1, title: 'Trainer Card Registration', icon: User },
  { step: 2, title: 'PokeGear Comm-Link', icon: Mail },
  { step: 3, title: 'Academy Gym Clearance', icon: GraduationCap },
  { step: 4, title: 'Tournament Battle Format', icon: Swords },
  { step: 5, title: 'Choose Starter Pokemon', icon: Flame },
];

export const PokedexDevice: React.FC<PokedexDeviceProps> = ({
  formData,
  errors,
  isSubmitting,
  submissionError,
  onFieldChange,
  onSubmit,
  onDismissError,
}) => {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [direction, setDirection] = React.useState<1 | -1>(1);
  const [stepErrors, setStepErrors] = React.useState<Record<string, string>>({});

  // OTP Email Verification State
  const [isOtpRequested, setIsOtpRequested] = React.useState<boolean>(false);
  const [isOtpSending, setIsOtpSending] = React.useState<boolean>(false);
  const [isOtpVerifying, setIsOtpVerifying] = React.useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = React.useState<boolean>(false);
  const [otpCode, setOtpCode] = React.useState<string>('');
  const [otpError, setOtpError] = React.useState<string | null>(null);
  const [otpSuccessMessage, setOtpSuccessMessage] = React.useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = React.useState<number>(0);
  const [verificationProofToken, setVerificationProofToken] = React.useState<string>('');

  // Resend OTP countdown timer
  React.useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Dynamic starter theme color with warm Pokémon defaults
  const activeAccent =
    formData.favouritePokemon === 'charmander'
      ? '#F97316'
      : formData.favouritePokemon === 'bulbasaur'
      ? '#65A30D'
      : formData.favouritePokemon === 'squirtle'
      ? '#0EA5E9'
      : '#10B981';

  const [initialOtpEmail, setInitialOtpEmail] = React.useState<string>('');
  const [emailChangedHalfway, setEmailChangedHalfway] = React.useState<boolean>(false);
  const [failedAttempts, setFailedAttempts] = React.useState<number>(0);

  // Handle field change and clear step errors
  const handleFieldChange = (field: keyof RegistrationFormData, value: string) => {
    onFieldChange(field, value);
    setStepErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

    if (field === 'email') {
      setOtpError(null);
      setOtpSuccessMessage(null);

      // Detect if email was changed halfway through verification
      if (isOtpRequested || isEmailVerified) {
        if (value.trim().toLowerCase() !== initialOtpEmail.trim().toLowerCase()) {
          setEmailChangedHalfway(true);
          setIsEmailVerified(false);
          setIsOtpRequested(false);
          setOtpCode('');
          setFailedAttempts(0);
          setOtpError('Security Alert: Email address was modified halfway through verification. Session cache destroyed. Please refresh the page and try again.');
        }
      }
    }
  };

  // Request 6-digit OTP from Backend
  const handleRequestOtp = async () => {
    const emailVal = (formData.email || '').trim().toLowerCase();
    setOtpError(null);
    setOtpSuccessMessage(null);
    setEmailChangedHalfway(false);

    if (!emailVal) {
      const msg = 'Please enter your SRM University-AP email address';
      setStepErrors((prev) => ({ ...prev, email: msg }));
      setOtpError(msg);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      const msg = 'Please enter a valid email format (e.g. your_name@srmap.edu.in)';
      setStepErrors((prev) => ({ ...prev, email: msg }));
      setOtpError(msg);
      return;
    }

    if (!emailVal.endsWith('@srmap.edu.in')) {
      const msg = 'Registration is exclusive to SRM University-AP students. Email must end with @srmap.edu.in';
      setStepErrors((prev) => ({ ...prev, email: msg }));
      setOtpError(msg);
      return;
    }

    // Clear email errors before requesting
    setStepErrors((prev) => {
      const next = { ...prev };
      delete next.email;
      return next;
    });

    setIsOtpSending(true);
    try {
      const res = await api.post('/api/registrations/otp', {
        email: emailVal,
        fullName: formData.fullName || 'Trainer',
        eventId: 'beyond-the-screen',
      });

      if (res.success || res.data) {
        setIsOtpRequested(true);
        setInitialOtpEmail(emailVal);
        setResendCooldown(45);
        setFailedAttempts(0);
        setOtpSuccessMessage(res.message || '6-digit OTP dispatched to your university inbox!');
      } else {
        throw new Error(res.message || 'Failed to dispatch verification OTP');
      }
    } catch (err: any) {
      console.error('OTP Request error:', err);
      const msg = err.message || 'Unable to send OTP. Please check your network connection.';
      setOtpError(msg);
    } finally {
      setIsOtpSending(false);
    }
  };

  // Verify 6-digit OTP with 3-attempt cache destruction
  const handleVerifyOtp = async () => {
    setOtpError(null);
    const trimmedOtp = otpCode.trim();

    if (!trimmedOtp || trimmedOtp.length !== 6) {
      setOtpError('Please enter the complete 6-digit OTP code');
      return;
    }

    setIsOtpVerifying(true);
    try {
      const res = await api.post('/api/registrations/verify-otp', {
        email: formData.email.trim().toLowerCase(),
        otp: trimmedOtp,
      });

      if (res.success && res.data?.verified) {
        setIsEmailVerified(true);
        setFailedAttempts(0);
        const token = res.data?.verificationProofToken || '';
        setVerificationProofToken(token);
        setOtpSuccessMessage('SRM-AP Identity verified! You may proceed to Gym Clearance.');
        setStepErrors((prev) => {
          const next = { ...prev };
          delete next.email;
          return next;
        });
      } else {
        const attempts = failedAttempts + 1;
        setFailedAttempts(attempts);

        if (res.data?.attemptsExceeded || attempts >= 3) {
          // Destroy session cache after 3 failed attempts
          setIsOtpRequested(false);
          setOtpCode('');
          setIsEmailVerified(false);
          setFailedAttempts(0);
          setOtpError('SECURITY ALERT: 3 failed OTP attempts detected. Email session cache destroyed. Please refresh or re-enter your email to request a new code.');
        } else {
          setOtpError(res.message || `Invalid 6-digit OTP code. ${3 - attempts} attempt(s) remaining before security cache destruction.`);
        }
      }
    } catch (err: any) {
      console.error('OTP Verify error:', err);
      const msg = err.message || 'Invalid or expired OTP code. Please check and try again.';
      setOtpError(msg);
    } finally {
      setIsOtpVerifying(false);
    }
  };

  // Step Validation Logic
  const validateCurrentStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Trainer name is required';
      if (!formData.studentId.trim()) errs.studentId = 'Trainer ID / Reg No. is required';
      if (!formData.gender) errs.gender = 'Please select your gender';
    } else if (step === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailVal = formData.email.trim().toLowerCase();

      if (!emailVal) {
        errs.email = 'SRM University-AP email is required';
      } else if (!emailRegex.test(emailVal)) {
        errs.email = 'Enter a valid email address format';
      } else if (!emailVal.endsWith('@srmap.edu.in')) {
        errs.email = 'Email must end with @srmap.edu.in';
      }

      const digits = formData.contactNumber.replace(/\D/g, '');
      if (!formData.contactNumber.trim()) errs.contactNumber = 'Contact number is required';
      else if (digits.length < 10) errs.contactNumber = 'Enter a valid 10-digit mobile number';
    } else if (step === 3) {
      if (!formData.department) errs.department = 'Please select your department';
      if (!formData.year) errs.year = 'Please select your year of study';
    } else if (step === 4) {
      if (!formData.participationInterest) errs.participationInterest = 'Please select your participation format';
    } else if (step === 5) {
      if (!formData.favouritePokemon) errs.favouritePokemon = 'Please choose your starter partner';
    }

    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep(currentStep)) {
      setStepErrors({});
      if (currentStep < TOTAL_STEPS) {
        setDirection(1);
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    setStepErrors({});
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCurrentStep(currentStep)) {
      onSubmit(e, verificationProofToken);
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        if (e.key === 'Enter') {
          if (currentStep < TOTAL_STEPS) {
            e.preventDefault();
            handleNext();
          }
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentStep < TOTAL_STEPS) handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        if (currentStep > 1) handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, formData, isEmailVerified]);

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 26,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.2,
      },
    }),
  };

  const CurrentIcon = STEP_METADATA[currentStep - 1].icon;

  return (
    <div className="w-full max-w-[390px] sm:max-w-[450px] md:max-w-[480px] mx-auto z-10 select-none">
      {/* REALISTIC RED POKÉDEX HARDWARE DEVICE CHASSIS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative rounded-[24px] sm:rounded-[30px] bg-[#B91C1C] p-2.5 sm:p-3.5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(220,38,38,0.35)] border-2 sm:border-3 border-[#EF4444]/60 ring-1 ring-black/40 overflow-hidden font-mono"
      >
        {/* Hardware Specular Highlights */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-0.5 bg-white/40" />

        {/* 1. TOP POKÉDEX HARDWARE BEZEL (Scanner Lens & Indicators) */}
        <div className="relative pb-2 flex items-center justify-between px-1 sm:px-2">
          {/* Glowing Big Blue Scanner Lens & Status LEDs */}
          <div className="flex items-center gap-2">
            {/* Primary Optical Scanner Lens */}
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#1789E5] shadow-[0_0_10px_#1789E5] flex items-center justify-center border border-white/60 relative overflow-hidden">
                  <div className="absolute top-0.5 left-0.5 w-2 h-1 rounded-full bg-white/70 blur-[0.5px]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-200/50 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Tri-Color Mini LEDs */}
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400 border border-white/40 shadow-[0_0_4px_#F87171] animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-amber-400 border border-white/40 shadow-[0_0_4px_#FBBF24]" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 border border-white/40 shadow-[0_0_4px_#34D399]" />
            </div>
          </div>

          {/* Right: Model Badge in Pokémon Font */}
          <div className="text-right flex flex-col items-end">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/50 border border-amber-400/40 backdrop-blur-md shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-pokemon text-[11px] sm:text-xs tracking-wider text-[#FFCC03] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] uppercase">
                POKEDEX V2.4
              </span>
            </div>
          </div>
        </div>

        {/* 2. POKÉDEX HOLOGRAPHIC TRANSLUCENT SCREEN (Step-by-Step Questions) */}
        <div className="relative rounded-[16px] sm:rounded-[18px] bg-[#0A0F14]/80 backdrop-blur-2xl border-2 border-amber-400/30 shadow-[inset_0_0_20px_rgba(245,158,11,0.12),0_0_15px_rgba(0,0,0,0.6)] overflow-hidden">

          {/* Screen Top Status Bar */}
          <div className="relative z-10 px-3 sm:px-4 py-1.5 bg-black/75 backdrop-blur-xl border-b border-amber-400/20 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-1 text-amber-300 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="tracking-wider uppercase font-pokemon text-[11px] text-[#FFCC03]">
                STEP {currentStep} OF {TOTAL_STEPS}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="font-pokemon text-[11px] text-amber-200 tracking-wide uppercase truncate max-w-[170px] sm:max-w-none">
                {STEP_METADATA[currentStep - 1].title}
              </span>
            </div>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="relative z-10 px-3 sm:px-4 py-1 bg-amber-950/20 border-b border-white/10 flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1">
              {STEP_METADATA.map((m) => {
                const isCurrent = m.step === currentStep;
                const isPassed = m.step < currentStep;

                return (
                  <button
                    key={m.step}
                    type="button"
                    onClick={() => {
                      if (m.step < currentStep) {
                        setDirection(-1);
                        setCurrentStep(m.step);
                      }
                    }}
                    disabled={m.step > currentStep}
                    className={cn(
                      'px-2 py-0.5 rounded-full font-pokemon text-[10px] font-bold transition-all duration-200',
                      isCurrent
                        ? 'bg-amber-400 text-black shadow-[0_0_8px_#FBBF24] font-black'
                        : isPassed
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 cursor-pointer hover:border-emerald-300'
                        : 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
                    )}
                  >
                    {m.step}
                  </button>
                );
              })}
            </div>

            <span className="font-mono text-[10px] text-amber-200/70 font-semibold">
              {Math.round((currentStep / TOTAL_STEPS) * 100)}%
            </span>
          </div>

          {/* STEP VIEWPORT WITH SMOOTH MOTION TRANSITIONS */}
          <div className="relative z-10 p-3 sm:p-4 min-h-[290px] sm:min-h-[320px] flex flex-col justify-between overflow-hidden">
            {/* Global Error Banner if any */}
            <AnimatePresence>
              {submissionError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-2.5 p-2 rounded-[6px] bg-red-950/90 border border-red-500/70 text-red-200 font-mono text-xs flex items-start justify-between gap-2 text-left shadow-lg backdrop-blur-md"
                >
                  <div className="flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-pokemon text-[11px] text-red-300 uppercase">
                        TRANSMISSION ERROR
                      </strong>
                      <span className="text-[11px]">{submissionError}</span>
                    </div>
                  </div>

                  {onDismissError && (
                    <button
                      type="button"
                      onClick={onDismissError}
                      className="text-red-400 hover:text-red-200 font-bold p-0.5 cursor-pointer text-xs"
                    >
                      ✕
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Slide Question Container */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full space-y-3 text-left"
              >
                {/* Step Header Title in Pokémon Font */}
                <div className="flex items-center gap-2 pb-1.5 border-b border-amber-400/20">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shadow-md shrink-0"
                    style={{ backgroundColor: `${activeAccent}30`, border: `1px solid ${activeAccent}` }}
                  >
                    <CurrentIcon className="w-3.5 h-3.5" style={{ color: activeAccent }} />
                  </div>
                  <div>
                    <h3 className="font-pokemon text-xs sm:text-sm tracking-wider uppercase text-[#FFCC03] drop-shadow-sm">
                      {STEP_METADATA[currentStep - 1].title}
                    </h3>
                  </div>
                </div>

                {/* 1. STEP 1: TRAINER IDENTITY */}
                {currentStep === 1 && (
                  <div className="space-y-2.5 pt-0.5">
                    {/* Pokémon Professor Dialogue Box */}
                    <div className="p-2 rounded-md bg-black/70 border border-amber-400/25 backdrop-blur-sm shadow-inner">
                      <p className="font-mono text-[11px] sm:text-xs text-amber-100/90 leading-relaxed">
                        <strong className="font-pokemon text-xs text-[#FFCC03] tracking-wide">PROF. OAK: </strong>
                        "First, tell me about yourself! What is your Trainer name, and what is your ID in the SRM League?"
                      </p>
                    </div>

                    <CardField
                      id="fullName"
                      name="fullName"
                      label="TRAINER NAME"
                      type="text"
                      value={formData.fullName}
                      onChange={(val) => handleFieldChange('fullName', val)}
                      placeholder="e.g. Red / Ash / Alex Morgan"
                      helperText="Official name for Trainer Card"
                      error={stepErrors.fullName || errors.fullName}
                      required
                      typeAccent={activeAccent}
                      autoFocus
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <CardField
                        id="studentId"
                        name="studentId"
                        label="TRAINER REG NO. / ID"
                        type="text"
                        value={formData.studentId}
                        onChange={(val) => handleFieldChange('studentId', val)}
                        placeholder="e.g. AP24110010001"
                        helperText="SRM-AP League ID"
                        error={stepErrors.studentId || errors.studentId}
                        required
                        typeAccent={activeAccent}
                      />

                      <SelectField
                        id="gender"
                        name="gender"
                        label="TRAINER GENDER"
                        value={formData.gender}
                        onChange={(val) => handleFieldChange('gender', val)}
                        options={GENDER_OPTIONS}
                        placeholder="Select Trainer gender"
                        helperText="Profile avatar"
                        error={stepErrors.gender || errors.gender}
                        required
                        typeAccent={activeAccent}
                      />
                    </div>
                  </div>
                )}

                {/* 2. STEP 2: COMMS & POKÉGEAR CHANNEL (WITH 6-DIGIT OTP VERIFICATION) */}
                {currentStep === 2 && (
                  <div className="space-y-2.5 pt-0.5">
                    {/* Pokémon PokéGear Dialogue Box */}
                    <div className="p-2 rounded-md bg-black/70 border border-amber-400/25 backdrop-blur-sm shadow-inner">
                      <p className="font-mono text-[11px] sm:text-xs text-amber-100/90 leading-relaxed">
                        <strong className="font-pokemon text-xs text-[#FFCC03] tracking-wide">POKEGEAR COMM-LINK: </strong>
                        "Enter your official <span className="text-amber-300 font-semibold">@srmap.edu.in</span> email and verify with 6-digit OTP to lock in your Arena transmission."
                      </p>
                    </div>

                    {/* Email Input & OTP Dispatcher */}
                    <div className="space-y-1.5">
                      <div className="relative">
                        <CardField
                          id="email"
                          name="email"
                          label="TRAINER SRM EMAIL DISPATCH"
                          type="email"
                          value={formData.email}
                          onChange={(val) => handleFieldChange('email', val)}
                          placeholder="trainer@srmap.edu.in"
                          helperText="Must end with @srmap.edu.in"
                          error={stepErrors.email || errors.email}
                          required
                          typeAccent={activeAccent}
                          autoFocus
                        />

                        {/* Verified Badge / Request OTP Action inside/below email */}
                        <div className="pt-1 flex items-center justify-between gap-2">
                          {isEmailVerified ? (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-[10px] font-mono font-bold shadow-md">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span className="font-pokemon text-[10px] tracking-wide">SRM-AP EMAIL VERIFIED ✓</span>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={handleRequestOtp}
                              disabled={isOtpSending || resendCooldown > 0}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-amber-500 hover:bg-amber-400 disabled:bg-white/10 text-black disabled:text-white/40 font-mono text-[10px] font-black uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:cursor-not-allowed"
                            >
                              {isOtpSending ? (
                                <>
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                  <span>SENDING CODE...</span>
                                </>
                              ) : resendCooldown > 0 ? (
                                <span>RESEND IN {resendCooldown}S</span>
                              ) : (
                                <>
                                  <Send className="w-3 h-3" />
                                  <span>{isOtpRequested ? 'RESEND OTP' : 'SEND OTP CODE'}</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Error banner outside if request failed */}
                      {otpError && !isOtpRequested && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-2 rounded-[4px] bg-red-950/90 border border-red-500/70 text-red-200 font-mono text-[11px] flex items-start gap-1.5 mt-1 shadow-md"
                        >
                          <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                          <span>{otpError}</span>
                        </motion.div>
                      )}

                      {/* 6-Digit OTP Verification Box */}
                      {isOtpRequested && !isEmailVerified && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-2.5 rounded-[6px] bg-black/80 border border-amber-400/40 backdrop-blur-md space-y-2 mt-1 shadow-lg"
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono text-amber-200">
                            <span className="flex items-center gap-1 font-bold">
                              <KeyRound className="w-3 h-3 text-amber-400" />
                              ENTER 6-DIGIT VERIFICATION OTP
                            </span>
                            <span className="text-white/60 truncate max-w-[160px]">Sent to {formData.email}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              maxLength={6}
                              value={otpCode}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                                setOtpCode(val);
                                if (val.length === 6) setOtpError(null);
                              }}
                              placeholder="123456"
                              className="w-32 px-2.5 py-1.5 bg-black/90 border border-amber-400/50 rounded-[4px] font-mono text-base tracking-[0.25em] text-center text-amber-300 font-bold focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 outline-none"
                            />

                            <button
                              type="button"
                              onClick={handleVerifyOtp}
                              disabled={isOtpVerifying || otpCode.length !== 6}
                              className="px-3 py-1.5 rounded-[4px] bg-emerald-500 hover:bg-emerald-400 disabled:bg-white/10 text-black disabled:text-white/40 font-mono text-xs font-black tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed shadow-md"
                            >
                              {isOtpVerifying ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <ShieldCheck className="w-3.5 h-3.5" />
                              )}
                              <span>VERIFY</span>
                            </button>
                          </div>

                          {otpError && (
                            <p className="font-mono text-[10px] text-red-400 flex items-center gap-1 font-semibold">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              <span>{otpError}</span>
                            </p>
                          )}

                          {otpSuccessMessage && !otpError && (
                            <p className="font-mono text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                              <CheckCircle2 className="w-3 h-3 shrink-0" />
                              <span>{otpSuccessMessage}</span>
                            </p>
                          )}
                        </motion.div>
                      )}
                    </div>

                    <CardField
                      id="contactNumber"
                      name="contactNumber"
                      label="POKÉGEAR HOLO-NUMBER"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(val) => handleFieldChange('contactNumber', val)}
                      placeholder="+91 98765 43210"
                      helperText="Live emergency broadcast & WhatsApp updates"
                      error={stepErrors.contactNumber || errors.contactNumber}
                      required
                      typeAccent={activeAccent}
                    />
                  </div>
                )}

                {/* 3. STEP 3: ACADEMIC GYM CLEARANCE */}
                {currentStep === 3 && (
                  <div className="space-y-2.5 pt-0.5">
                    {/* Pokémon Gym Dialogue Box */}
                    <div className="p-2 rounded-md bg-black/70 border border-amber-400/25 backdrop-blur-sm shadow-inner">
                      <p className="font-mono text-[11px] sm:text-xs text-amber-100/90 leading-relaxed">
                        <strong className="font-pokemon text-xs text-[#FFCC03] tracking-wide">GYM REGISTRAR: </strong>
                        "Present your Academy Branch and Batch level to earn your official Gym Badge clearance!"
                      </p>
                    </div>

                    <SelectField
                      id="department"
                      name="department"
                      label="TRAINER ACADEMY BRANCH"
                      value={formData.department}
                      onChange={(val) => handleFieldChange('department', val)}
                      options={DEPARTMENT_OPTIONS}
                      placeholder="Select your branch (e.g. CSE)"
                      helperText="SRM-AP Academy Division"
                      error={stepErrors.department || errors.department}
                      required
                      typeAccent={activeAccent}
                    />

                    <SelectField
                      id="year"
                      name="year"
                      label="TRAINER LEVEL / YEAR"
                      value={formData.year}
                      onChange={(val) => handleFieldChange('year', val)}
                      options={YEAR_OPTIONS}
                      placeholder="Select study year (e.g. 2nd Year)"
                      helperText="Academic battle tier accreditation"
                      error={stepErrors.year || errors.year}
                      required
                      typeAccent={activeAccent}
                    />
                  </div>
                )}

                {/* 4. STEP 4: BATTLE PARTICIPATION FORMAT */}
                {currentStep === 4 && (
                  <div className="space-y-2.5 pt-0.5">
                    {/* Pokémon Stadium Dialogue Box */}
                    <div className="p-2 rounded-md bg-black/70 border border-amber-400/25 backdrop-blur-sm shadow-inner">
                      <p className="font-mono text-[11px] sm:text-xs text-amber-100/90 leading-relaxed">
                        <strong className="font-pokemon text-xs text-[#FFCC03] tracking-wide">STADIUM ANNOUNCER: </strong>
                        "A wild challenge appeared! How will you enter the Beyond the Screen Arena?"
                      </p>
                    </div>

                    <ParticipationChoice
                      id="participationInterest"
                      value={formData.participationInterest}
                      onChange={(val) => handleFieldChange('participationInterest', val)}
                      options={PARTICIPATION_OPTIONS}
                      typeAccent={activeAccent}
                      error={stepErrors.participationInterest || errors.participationInterest}
                    />
                  </div>
                )}

                {/* 5. STEP 5: CHOOSE STARTER PARTNER */}
                {currentStep === 5 && (
                  <div className="space-y-2.5 pt-0.5">
                    {/* Pokémon Starter Dialogue Box */}
                    <div className="p-2 rounded-md bg-black/70 border border-amber-400/25 backdrop-blur-sm shadow-inner">
                      <p className="font-mono text-[11px] sm:text-xs text-amber-100/90 leading-relaxed">
                        <strong className="font-pokemon text-xs text-[#FFCC03] tracking-wide">PROF. OAK: </strong>
                        "On the table are three Poké Balls. Touch any mystery card to reveal your starter Pokémon!"
                      </p>
                    </div>

                    <StarterPartnerRevealGrid
                      selectedPokemon={formData.favouritePokemon}
                      onSelectPokemon={(id) => handleFieldChange('favouritePokemon', id)}
                      error={stepErrors.favouritePokemon || errors.favouritePokemon}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* SCREEN HUD FOOTER STATUS BAR */}
            <div className="pt-2 mt-2 border-t border-amber-400/20 flex items-center justify-between text-[10px] font-mono text-amber-200/80">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-pokemon text-[10px] text-emerald-300">POKEDEX ONLINE</span>
              </div>
              <div className="text-white/60">
                {currentStep < TOTAL_STEPS ? (
                  <span>PRESS <strong className="font-pokemon text-emerald-400 text-xs font-normal">NEXT</strong> OR <strong className="font-pokemon text-amber-400 text-xs font-normal">[A]</strong></span>
                ) : (
                  <span>PRESS <strong className="font-pokemon text-emerald-400 text-xs font-normal">SYNC</strong> OR <strong className="font-pokemon text-amber-400 text-xs font-normal">[A]</strong></span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. POKÉDEX HARDWARE CONTROLS BEZEL (D-Pad, Select, Action Buttons) */}
        <div className="relative pt-2.5 pb-0.5 px-2 sm:px-4 flex items-center justify-between">
          {/* Tactile Directional D-Pad (clickable for navigation) */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
            {/* D-Pad Cross Background */}
            <div className="w-5 h-14 sm:w-5.5 sm:h-16 bg-[#1E293B] rounded-md shadow-inner border border-black/50 absolute" />
            <div className="w-14 h-5 sm:w-16 sm:h-5.5 bg-[#1E293B] rounded-md shadow-inner border border-black/50 absolute" />
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#0F172A] z-10 shadow-xs border border-white/10 flex items-center justify-center" />

            {/* Interactive Left/Right Buttons on D-Pad */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="absolute left-0 w-4 h-4 sm:w-5 sm:h-5 z-20 cursor-pointer disabled:opacity-30 flex items-center justify-center text-[10px] text-white/70 hover:text-white"
              title="Previous Step"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={() => {
                if (currentStep < TOTAL_STEPS) handleNext();
              }}
              disabled={currentStep === TOTAL_STEPS}
              className="absolute right-0 w-4 h-4 sm:w-5 sm:h-5 z-20 cursor-pointer disabled:opacity-30 flex items-center justify-center text-[10px] text-white/70 hover:text-white"
              title="Next Step"
            >
              ▶
            </button>
          </div>

          {/* Center: Glowing Green SELECT Button */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-2 rounded-full bg-[#1E293B] border border-black/60 shadow-inner" />
              <div className="w-6 h-2 rounded-full bg-[#1E293B] border border-black/60 shadow-inner" />
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                if (currentStep < TOTAL_STEPS) handleNext();
                else handleFinalSubmit({ preventDefault: () => {} } as React.FormEvent);
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 border-2 border-white/80 shadow-[0_0_12px_#10B981] flex items-center justify-center cursor-pointer transition-colors"
              title="Press to Advance"
            >
              <span className="font-pokemon text-[11px] sm:text-xs text-black tracking-wider">
                {currentStep < TOTAL_STEPS ? 'NEXT' : 'SYNC'}
              </span>
            </motion.button>
          </div>

          {/* Right: Tactile A & B Action Buttons */}
          <div className="flex items-center gap-2">
            {/* B Button: Prev */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#991B1B] hover:bg-[#B91C1C] border border-white/50 shadow-md flex items-center justify-center text-white font-pokemon text-xs sm:text-sm cursor-pointer disabled:opacity-30 transition-all"
              title="B Button (Back)"
            >
              B
            </motion.button>

            {/* A Button: Next / Submit */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                if (currentStep < TOTAL_STEPS) handleNext();
                else handleFinalSubmit({ preventDefault: () => {} } as React.FormEvent);
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-400 hover:bg-amber-300 border border-white/80 shadow-[0_0_12px_#F59E0B] flex items-center justify-center text-black font-pokemon text-xs sm:text-sm cursor-pointer transition-all"
              title="A Button (Next / Confirm)"
            >
              A
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PokedexDevice;
