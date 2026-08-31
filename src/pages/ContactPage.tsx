import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Instagram, Linkedin, MessageCircle, Copy, Check, Loader2 } from 'lucide-react';
import { MaskReveal } from '@/components/ui/MotionPrimitives';
import siteData from '@/data/siteData';

export default function ContactPage() {
  const contactData = siteData.contact;
  const socials = siteData.socialLinks;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'b1d033c4-4b57-41ab-85f8-80f074d0dbd9',
          email_to: contactData.email,
          name: formData.name,
          email: formData.email,
          subject: `[HackShastra Contact] ${formData.subject}`,
          message: formData.message,
          from_name: `${formData.name} (HackShastra Website)`
        })
      });

      const result = await response.json();
      if (result.success || response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        triggerMailtoFallback();
      }
    } catch {
      triggerMailtoFallback();
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerMailtoFallback = () => {
    const mailtoLink = `mailto:${contactData.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-[#071014] text-[#F4F7F8] min-h-screen pt-24 pb-16">
      {/* ── Section Header ── */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-[#1e2e38] pb-4 mb-16">
          <span className="text-xs font-mono text-[#A8B3BA] tracking-widest uppercase">06 / CONTACT & CONNECT</span>
          <span className="text-xs font-mono text-primary tracking-widest uppercase">[ DISPATCH ]</span>
        </div>

        <div className="max-w-7xl mx-auto mb-16">
          <MaskReveal>
            <h1 className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#F4F7F8] mb-6">
              Get in <span className="text-primary">Touch</span>
            </h1>
          </MaskReveal>
          <p className="text-[#A8B3BA] text-base sm:text-lg max-w-2xl font-body leading-relaxed">
            {contactData.subtitle}
          </p>
        </div>
      </section>

      <section className="px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#0c181f] border border-[#1e2e38] rounded-[2px] p-8 flex flex-col gap-6">
              <h2 className="font-heading font-bold text-xl uppercase tracking-wider text-[#F4F7F8]">
                Contact Directory
              </h2>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-4 bg-[#071014] border border-[#1e2e38] rounded-[2px]">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-heading font-bold text-xs uppercase text-[#F4F7F8]">Official Email</h3>
                      <p className="text-xs font-mono text-[#A8B3BA]">{contactData.email}</p>
                    </div>
                  </div>
                  <button onClick={() => handleCopy(contactData.email, 'email')} className="text-[#A8B3BA] hover:text-primary">
                    {copiedType === 'email' ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#071014] border border-[#1e2e38] rounded-[2px]">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-heading font-bold text-xs uppercase text-[#F4F7F8]">Campus Location</h3>
                      <p className="text-xs font-body text-[#A8B3BA] whitespace-pre-line">{contactData.location}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#071014] border border-[#1e2e38] rounded-[2px]">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-heading font-bold text-xs uppercase text-[#F4F7F8]">Phone Line</h3>
                      <p className="text-xs font-mono text-[#A8B3BA]">{contactData.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1e2e38]">
                <h3 className="font-heading font-bold text-xs uppercase text-[#A8B3BA] mb-3">Community Channels</h3>
                <div className="flex gap-4">
                  <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#F4F7F8] hover:text-primary transition-colors flex items-center gap-1.5">
                    <Instagram className="w-4 h-4 text-primary" /> INSTAGRAM
                  </a>
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#F4F7F8] hover:text-primary transition-colors flex items-center gap-1.5">
                    <Linkedin className="w-4 h-4 text-primary" /> LINKEDIN
                  </a>
                  <a href={socials.discord} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#F4F7F8] hover:text-primary transition-colors flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-primary" /> DISCORD
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7 bg-[#0c181f] border border-[#1e2e38] rounded-[2px] p-8">
            <h2 className="font-heading font-bold text-2xl uppercase tracking-tight text-[#F4F7F8] mb-2">
              Send a Direct Message
            </h2>
            <p className="text-xs font-body text-[#A8B3BA] mb-8">
              Fill out the form below. Your message will be sent directly to the HackShastra organizing team.
            </p>

            {submitted ? (
              <div className="p-8 bg-[#071014] border border-[#1e2e38] rounded-[2px] text-center flex flex-col items-center gap-4">
                <Check className="w-8 h-8 text-primary" />
                <h3 className="font-heading font-bold text-xl uppercase text-[#F4F7F8]">Message Transmitted</h3>
                <p className="text-xs font-body text-[#A8B3BA] max-w-md">
                  Thank you for reaching out to HackShastra SRM-AP. Our team will review your inquiry shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-6 py-3 bg-[#14222b] border border-[#1e2e38] text-[#F4F7F8] hover:border-primary font-mono text-xs uppercase tracking-widest"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase text-[#A8B3BA] mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#071014] border border-[#1e2e38] rounded-[2px] text-sm text-[#F4F7F8] focus:border-primary focus:outline-none font-body"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase text-[#A8B3BA] mb-2">Your Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#071014] border border-[#1e2e38] rounded-[2px] text-sm text-[#F4F7F8] focus:border-primary focus:outline-none font-body"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono uppercase text-[#A8B3BA] mb-2">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#071014] border border-[#1e2e38] rounded-[2px] text-sm text-[#F4F7F8] focus:border-primary focus:outline-none font-body"
                    placeholder="Inquiry / Sponsorship / Query"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase text-[#A8B3BA] mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#071014] border border-[#1e2e38] rounded-[2px] text-sm text-[#F4F7F8] focus:border-primary focus:outline-none font-body resize-none"
                    placeholder="Type your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-[#071014] hover:bg-[#8DD9FA] font-heading font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>DISPATCH MESSAGE</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
