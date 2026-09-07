import * as React from 'react';
import { siteData } from '@/data/siteData';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { Button } from '@/components/ui/Button';
import { Mail, Copy, Check, Send, ExternalLink, ShieldCheck, Lock, KeyRound, AlertCircle, RefreshCw } from 'lucide-react';
import { api } from '@/lib/api';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // OTP Verification State
  const [isEmailVerified, setIsEmailVerified] = React.useState(false);
  const [verifiedEmail, setVerifiedEmail] = React.useState('');
  const [verificationToken, setVerificationToken] = React.useState('');
  const [otpCode, setOtpCode] = React.useState('');
  const [isSendingOtp, setIsSendingOtp] = React.useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = React.useState(false);
  const [otpSent, setOtpSent] = React.useState(false);
  const [otpCooldown, setOtpCooldown] = React.useState(0);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);
  const [copiedField, setCopiedField] = React.useState<'email' | 'address' | null>(null);

  // OTP countdown timer
  React.useEffect(() => {
    if (otpCooldown > 0) {
      const timer = setTimeout(() => setOtpCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCooldown]);

  const handleCopy = (text: string, field: 'email' | 'address') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const [initialOtpEmail, setInitialOtpEmail] = React.useState<string>('');
  const [emailChangedHalfway, setEmailChangedHalfway] = React.useState(false);
  const [failedAttempts, setFailedAttempts] = React.useState(0);
  const [activeOtp, setActiveOtp] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);

    // Detect if email address is changed halfway through OTP verification
    if (name === 'email' && (otpSent || isEmailVerified)) {
      if (value.trim().toLowerCase() !== initialOtpEmail.trim().toLowerCase()) {
        setEmailChangedHalfway(true);
        setIsEmailVerified(false);
        setVerificationToken('');
        setOtpSent(false);
        setActiveOtp(null);
        setOtpCode('');
        setFailedAttempts(0);
        setErrorMessage('Security Alert: Email address was modified halfway through verification. Session cache destroyed. Please refresh the page and try again.');
      }
    }
  };

  // Request 6-digit OTP code from backend
  const handleRequestOtp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = formData.email.trim();

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address first.');
      return;
    }

    setIsSendingOtp(true);
    setErrorMessage(null);
    setStatusMessage(null);
    setEmailChangedHalfway(false);

    try {
      const res = await api.post('/api/contact/otp', { email: cleanEmail });
      if (res.success) {
        setOtpSent(true);
        setInitialOtpEmail(cleanEmail);
        setOtpCooldown(45);
        setFailedAttempts(0);
        const code = res.data?.otp;
        if (code) setActiveOtp(code);
        setStatusMessage(res.message || `A 6-digit verification code was sent to ${cleanEmail}.`);
      } else {
        throw new Error(res.message || 'Failed to send verification code.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Verify entered OTP with 3-attempt cache destruction
  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.trim().length !== 6) {
      setErrorMessage('Please enter the full 6-digit OTP code.');
      return;
    }

    setIsVerifyingOtp(true);
    setErrorMessage(null);

    try {
      const res = await api.post('/api/contact/verify', {
        email: formData.email.trim(),
        otp: otpCode.trim(),
      });

      if (res.success && res.data?.verificationToken) {
        setIsEmailVerified(true);
        setVerifiedEmail(formData.email.trim().toLowerCase());
        setVerificationToken(res.data.verificationToken);
        setFailedAttempts(0);
        setStatusMessage('Email verified successfully! You can now send your message.');
      } else {
        const attempts = failedAttempts + 1;
        setFailedAttempts(attempts);

        if (res.data?.attemptsExceeded || attempts >= 3) {
          // Destroy cache after 3 failed attempts
          setOtpSent(false);
          setActiveOtp(null);
          setOtpCode('');
          setIsEmailVerified(false);
          setVerificationToken('');
          setFailedAttempts(0);
          setErrorMessage('SECURITY ALERT: 3 failed OTP attempts detected. Email session cache destroyed. Please refresh or re-enter your email to request a new code.');
        } else {
          setErrorMessage(res.message || `Invalid 6-digit OTP code. ${3 - attempts} attempt(s) remaining before security cache is destroyed.`);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to verify OTP.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailVerified || !verificationToken) {
      setErrorMessage('Please verify your email with OTP before sending.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await api.post('/api/contact', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        verificationToken,
      });

      if (result.success) {
        setSubmitted(true);
        setStatusMessage('Your message was sent directly to hssc2025@srmap.edu.in. We will respond shortly!');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsEmailVerified(false);
        setVerificationToken('');
        setOtpSent(false);
        setOtpCode('');
        setFailedAttempts(0);
      } else {
        throw new Error(result.message || 'Failed to submit message');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error submitting message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-[#FCF6D9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#CF4B00] font-bold mb-3">
            <span>GET IN TOUCH</span>
            <span>•</span>
            <span>[ SECURE OTP DISPATCH ]</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-[#0F172A]">
            {siteData.contact.title}
          </h1>
          <p className="mt-4 text-base text-[#0F172A]/90 max-w-2xl font-medium">
            {siteData.contact.subtitle}
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <FadeUp delay={0.1}>
              <div className="rounded-[2px] border border-[#85b5cd] bg-[#9CC6DB] p-6 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#CF4B00] font-bold">OFFICIAL EMAIL</span>
                    <button
                      onClick={() => handleCopy(siteData.siteInfo.contactEmail, 'email')}
                      className="text-xs font-mono text-[#0F172A]/70 hover:text-[#CF4B00] flex items-center gap-1 cursor-pointer font-medium"
                    >
                      {copiedField === 'email' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#CF4B00]" />
                          <span className="text-[#CF4B00] font-bold">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </div>
                  <a
                    href={`mailto:${siteData.siteInfo.contactEmail}`}
                    className="font-heading text-lg font-bold text-[#0F172A] hover:text-[#CF4B00] transition-colors"
                  >
                    {siteData.siteInfo.contactEmail}
                  </a>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="rounded-[2px] border border-[#85b5cd] bg-[#9CC6DB] p-6 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#CF4B00] font-bold">CHAPTER HEADQUARTERS</span>
                  <a
                    href="https://www.google.com/maps?q=16.462717,80.506813"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#0F172A]/80 hover:text-[#CF4B00] flex items-center gap-1 font-semibold"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>MAPS</span>
                  </a>
                </div>
                <h4 className="font-heading text-base font-bold text-[#0F172A]">
                  {siteData.siteInfo.university}
                </h4>
                <p className="mt-1 text-xs text-[#0F172A]/80 leading-relaxed font-medium">
                  Neerukonda, Mangalagiri Mandal, Guntur District, Andhra Pradesh 522502
                </p>
                <div className="mt-3 font-mono text-xs text-[#0F172A]/70 font-semibold">
                  {siteData.siteCoordinates.display}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="relative aspect-video w-full overflow-hidden rounded-[2px] border border-[#85b5cd] bg-[#9CC6DB] shadow-sm">
                <iframe
                  title="HackShastra Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.663177699927!2d80.50462431486358!3d16.46271708863756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f253b87d44b3%3A0x591c2967f32d4198!2sSRM%20University%20AP!5e0!3m2!1sen!2sin!4v1645000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </FadeUp>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7">
            <FadeUp delay={0.2}>
              <div className="rounded-[2px] border border-[#85b5cd] bg-[#9CC6DB] p-8 md:p-10 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="h-12 w-12 rounded-full bg-[#CF4B00]/10 border border-[#CF4B00] text-[#CF4B00] flex items-center justify-center mx-auto mb-4">
                      <Check className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-[#0F172A]">
                      Verified Message Sent!
                    </h3>
                    <p className="mt-2 text-sm text-[#0F172A]/80 max-w-md mx-auto font-medium">
                      Thank you for reaching out to HackShastra SRM-AP. Your verified message was delivered to our leadership desk.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 font-mono text-xs"
                    >
                      SEND ANOTHER MESSAGE
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#85b5cd] pb-3 mb-4">
                      <div className="font-mono text-xs text-[#CF4B00] font-black uppercase tracking-wider">
                        [ VERIFIED DISPATCH PORTAL ]
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono">
                        {isEmailVerified ? (
                          <span className="inline-flex items-center gap-1 text-[#CF4B00] bg-[#FCF6D9] px-2 py-0.5 rounded border border-[#CF4B00] font-bold">
                            <ShieldCheck className="h-3.5 w-3.5" /> OTP VERIFIED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[#0F172A]/70 bg-[#FCF6D9] px-2 py-0.5 rounded border border-[#85b5cd] font-semibold">
                            <Lock className="h-3 w-3" /> VERIFICATION REQUIRED
                          </span>
                        )}
                      </div>
                    </div>

                    {emailChangedHalfway && (
                      <div className="p-4 rounded-[2px] bg-amber-100 border border-amber-400 text-amber-950 font-mono text-xs space-y-2 font-semibold shadow-sm">
                        <div className="flex items-center gap-2 text-[#CF4B00] font-black">
                          <AlertCircle className="h-4 w-4 shrink-0 text-[#CF4B00]" />
                          <span>SECURITY ALERT: EMAIL ADDRESS CHANGED HALFWAY</span>
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          You modified your email address after initiating verification. To protect data integrity, your security session cache was destroyed. Please refresh the page and try again.
                        </p>
                        <Button
                          type="button"
                          variant="primary"
                          size="sm"
                          onClick={() => window.location.reload()}
                          className="font-mono text-xs mt-1 cursor-pointer gap-1"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          <span>REFRESH PAGE & TRY AGAIN</span>
                        </Button>
                      </div>
                    )}

                    {errorMessage && !emailChangedHalfway && (
                      <div className="p-3 rounded-[2px] bg-red-100 border border-red-300 text-red-900 text-xs font-mono flex items-center gap-2 font-semibold">
                        <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {statusMessage && (
                      <div className="p-3 rounded-[2px] bg-[#FCF6D9] border border-[#CF4B00] text-[#CF4B00] text-xs font-mono flex items-center gap-2 font-bold">
                        <Check className="h-4 w-4 shrink-0 text-[#CF4B00]" />
                        <span>{statusMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-mono text-xs text-[#0F172A] block font-bold uppercase">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full rounded-[2px] border border-[#85b5cd] bg-[#FCF6D9] px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#0F172A]/50 focus:border-[#CF4B00] focus:bg-[#FCF6D9] focus:ring-2 focus:ring-[#CF4B00]/20 focus:outline-none transition-all font-medium"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="font-mono text-xs text-[#0F172A] block font-bold uppercase">
                            Your Email *
                          </label>
                          {isEmailVerified && (
                            <span className="text-[10px] font-mono text-[#CF4B00] font-bold">✓ VERIFIED</span>
                          )}
                        </div>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full rounded-[2px] border border-[#85b5cd] bg-[#FCF6D9] px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#0F172A]/50 focus:border-[#CF4B00] focus:bg-[#FCF6D9] focus:ring-2 focus:ring-[#CF4B00]/20 focus:outline-none transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* OTP Verification Box */}
                    {!isEmailVerified && (
                      <div className="rounded-[2px] border border-[#CF4B00] bg-[#FCF6D9] p-4 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-mono text-xs text-[#0F172A] font-bold">
                            <KeyRound className="h-4 w-4 text-[#CF4B00]" />
                            <span>Email Security Verification</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#0F172A]/70 font-semibold">Step 1 of 2</span>
                        </div>

                        {!otpSent ? (
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                            <p className="text-xs text-[#0F172A]/80 font-medium">
                              Click to receive a 6-digit OTP code to verify your identity.
                            </p>
                            <Button
                              type="button"
                              variant="primary"
                              size="sm"
                              loading={isSendingOtp}
                              onClick={handleRequestOtp}
                              className="font-mono text-xs shrink-0 cursor-pointer"
                            >
                              <Mail className="h-3.5 w-3.5 mr-1" />
                              <span>SEND OTP CODE</span>
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3 pt-1">
                            {activeOtp && (
                              <div className="p-2 rounded-[2px] bg-[#9CC6DB]/40 border border-[#85b5cd] text-[#0F172A] font-mono text-xs flex items-center justify-between font-bold">
                                <span>VERIFICATION CODE DISPATCHED:</span>
                                <span className="px-2 py-0.5 rounded bg-[#CF4B00] text-white tracking-widest">{activeOtp}</span>
                              </div>
                            )}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                              <input
                                type="text"
                                maxLength={6}
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                placeholder="Enter 6-digit OTP"
                                className="w-full sm:w-48 text-center tracking-widest font-mono text-base font-bold rounded-[2px] border border-[#CF4B00] bg-[#FCF6D9] px-3 py-2 text-[#0F172A] focus:border-[#CF4B00] focus:ring-2 focus:ring-[#CF4B00]/20 focus:outline-none"
                              />
                              <Button
                                type="button"
                                variant="primary"
                                size="sm"
                                loading={isVerifyingOtp}
                                onClick={handleVerifyOtp}
                                className="font-mono text-xs cursor-pointer gap-1"
                              >
                                <ShieldCheck className="h-3.5 w-3.5" />
                                <span>VERIFY & UNLOCK</span>
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={otpCooldown > 0 || isSendingOtp}
                                onClick={handleRequestOtp}
                                className="font-mono text-xs cursor-pointer gap-1 ml-auto"
                              >
                                <RefreshCw className="h-3 w-3" />
                                <span>{otpCooldown > 0 ? `RESEND (${otpCooldown}s)` : 'RESEND OTP'}</span>
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="font-mono text-xs text-[#0F172A] block font-bold uppercase">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Hackathon Inquiry / Partnership / Query"
                        className="w-full rounded-[2px] border border-[#85b5cd] bg-[#FCF6D9] px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#0F172A]/50 focus:border-[#CF4B00] focus:bg-[#FCF6D9] focus:ring-2 focus:ring-[#CF4B00]/20 focus:outline-none transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-xs text-[#0F172A] block font-bold uppercase">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Type your message here..."
                        className="w-full rounded-[2px] border border-[#85b5cd] bg-[#FCF6D9] px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#0F172A]/50 focus:border-[#CF4B00] focus:bg-[#FCF6D9] focus:ring-2 focus:ring-[#CF4B00]/20 focus:outline-none transition-all font-medium"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant={isEmailVerified ? 'primary' : 'secondary'}
                      size="lg"
                      loading={isSubmitting}
                      disabled={!isEmailVerified}
                      className="w-full font-mono text-xs tracking-wider justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isEmailVerified ? (
                        <>
                          <span>SEND VERIFIED MESSAGE</span>
                          <Send className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 text-[#0F172A]/60" />
                          <span>UNLOCK DISPATCH BY VERIFYING OTP ABOVE</span>
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </div>
  );
};

