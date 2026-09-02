import * as React from 'react';
import { siteData } from '@/data/siteData';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { Button } from '@/components/ui/Button';
import { Mail, Copy, Check, Send, ExternalLink } from 'lucide-react';

import { api } from '@/lib/api';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [copiedField, setCopiedField] = React.useState<'email' | 'address' | null>(null);

  const handleCopy = (text: string, field: 'email' | 'address') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(null);
  };

  const triggerMailtoFallback = () => {
    const subject = encodeURIComponent(`[HackShastra Contact] ${formData.subject || 'Inquiry'}`);
    const body = encodeURIComponent(`From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${siteData.siteInfo.contactEmail}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await api.post('/api/contact', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.message || 'Failed to submit message');
      }
    } catch (err: any) {
      console.warn('Backend API submit error, trying web3forms/mailto fallback:', err);
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: 'b1d033c4-4b57-41ab-85f8-80f074d0dbd9',
            email_to: siteData.siteInfo.contactEmail,
            name: formData.name,
            email: formData.email,
            subject: `[HackShastra Contact] ${formData.subject}`,
            message: formData.message,
            from_name: `${formData.name} (HackShastra Website)`,
          }),
        });
        const resJson = await response.json();
        if (resJson.success || response.ok) {
          setSubmitted(true);
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          triggerMailtoFallback();
        }
      } catch {
        triggerMailtoFallback();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-[#FFFFFF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#0DA5F0] font-bold mb-3">
            <span>GET IN TOUCH</span>
            <span>•</span>
            <span>[ DIRECT COMMUNICATION ]</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-[#090D12]">
            {siteData.contact.title}
          </h1>
          <p className="mt-4 text-base text-[#334155] max-w-2xl">
            {siteData.contact.subtitle}
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <FadeUp delay={0.1}>
              <div className="rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] p-6 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#0DA5F0] font-bold">OFFICIAL EMAIL</span>
                    <button
                      onClick={() => handleCopy(siteData.siteInfo.contactEmail, 'email')}
                      className="text-xs font-mono text-[#64748B] hover:text-[#0DA5F0] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedField === 'email' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-600 font-semibold">COPIED</span>
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
                    className="font-heading text-lg font-bold text-[#090D12] hover:text-[#0284C7] transition-colors"
                  >
                    {siteData.siteInfo.contactEmail}
                  </a>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#0DA5F0] font-bold">CHAPTER HEADQUARTERS</span>
                  <a
                    href="https://www.google.com/maps?q=16.462717,80.506813"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#64748B] hover:text-[#0DA5F0] flex items-center gap-1 font-semibold"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>MAPS</span>
                  </a>
                </div>
                <h4 className="font-heading text-base font-bold text-[#090D12]">
                  {siteData.siteInfo.university}
                </h4>
                <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                  Neerukonda, Mangalagiri Mandal, Guntur District, Andhra Pradesh 522502
                </p>
                <div className="mt-3 font-mono text-xs text-[#94A3B8]">
                  {siteData.siteCoordinates.display}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="relative aspect-video w-full overflow-hidden rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] shadow-sm">
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

          <div className="lg:col-span-7">
            <FadeUp delay={0.2}>
              <div className="rounded-[2px] border border-[#E2E8F0] bg-[#FFFFFF] p-8 md:p-10 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="h-12 w-12 rounded-full bg-[#0DA5F0]/10 border border-[#0DA5F0] text-[#0DA5F0] flex items-center justify-center mx-auto mb-4">
                      <Check className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-[#090D12]">
                      Message Sent Successfully!
                    </h3>
                    <p className="mt-2 text-sm text-[#64748B] max-w-md mx-auto">
                      Thank you for reaching out to HackShastra SRM-AP. Our leadership team will review your query and get back to you shortly.
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
                    <div className="font-mono text-xs text-[#0DA5F0] font-bold uppercase tracking-wider mb-2">
                      [ DIRECT MESSAGE DISPATCH ]
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-mono text-xs text-[#334155] block font-semibold uppercase">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#090D12] placeholder-[#94A3B8] focus:border-[#0DA5F0] focus:bg-[#FFFFFF] focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-mono text-xs text-[#334155] block font-semibold uppercase">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#090D12] placeholder-[#94A3B8] focus:border-[#0DA5F0] focus:bg-[#FFFFFF] focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-xs text-[#334155] block font-semibold uppercase">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Hackathon Inquiry / Partnership / Query"
                        className="w-full rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#090D12] placeholder-[#94A3B8] focus:border-[#0DA5F0] focus:bg-[#FFFFFF] focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-xs text-[#334155] block font-semibold uppercase">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Type your message here..."
                        className="w-full rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#090D12] placeholder-[#94A3B8] focus:border-[#0DA5F0] focus:bg-[#FFFFFF] focus:outline-none transition-all"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isSubmitting}
                      className="w-full font-mono text-xs tracking-wider justify-center gap-2 cursor-pointer"
                    >
                      <span>SEND MESSAGE</span>
                      <Send className="h-4 w-4" />
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
