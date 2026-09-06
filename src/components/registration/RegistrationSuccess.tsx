import * as React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Calendar, Clock, MapPin, Download, ArrowRight, Share2, Sparkles, MailCheck } from 'lucide-react';
import { RegistrationFormData } from '@/hooks/useRegistrationForm';
import { getImageUrl } from '@/lib/assets';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import pokedexRedFrameImg from '@/assets/events/beyond-the-screen/pokedex-red-frame.jpg';

interface RegistrationSuccessProps {
  formData: RegistrationFormData;
  registrationResult?: any;
  cardBackKey?: string;
  onReset?: () => void;
  className?: string;
}

export const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({
  formData,
  registrationResult,
  cardBackKey = 'card-back.png',
  onReset,
  className,
}) => {
  const cardBackUrl = getImageUrl(cardBackKey);

  // Generate a clean entry ID if returned or create an accredited token
  const entryId = registrationResult?.id
    ? `BTS-${String(registrationResult.id).slice(0, 8).toUpperCase()}`
    : `BTS-${Math.floor(100000 + Math.random() * 900000)}`;

  const isPendingVerification = registrationResult?.status === 'PENDING_VERIFICATION' || !registrationResult?.verified_at;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Beyond the Screen Registration Deck',
          text: `I just registered my trainer deck for Beyond the Screen at SRM University-AP!`,
          url: window.location.href,
        });
      } catch {
        // Ignored
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Event registration link copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className={cn('w-full max-w-[560px] sm:max-w-[620px] mx-auto text-center space-y-6', className)}
    >
      {/* 3D Classic Red Pokédex Pass */}
      <div className="relative rounded-[26px] bg-[#0A0306]/75 backdrop-blur-2xl border-2 border-red-500/60 shadow-2xl p-5 overflow-hidden text-white">
        {/* Ambient atmospheric glows */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#0DA5F0]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Pokédex Pass Image Container */}
        <div className="relative rounded-[16px] overflow-hidden border border-white/20 shadow-inner bg-slate-950 flex flex-col items-center">
          <img
            src={pokedexRedFrameImg}
            alt="Beyond the Screen Red Pokédex Pass"
            className="w-full h-auto object-cover max-h-[240px] select-none opacity-90"
          />

          {/* Holographic gloss overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
        </div>

        {/* Accredited Trainer Badge */}
        <div className="mt-4 pt-4 border-t border-[#1E293B] text-left space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-pokemon tracking-wide text-xs text-[#FFCC03] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <Sparkles className="w-3.5 h-3.5 text-[#0DA5F0]" />
              <span>DECK ACCREDITATION PASS</span>
            </div>

            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 font-bold">
              ✓ ENTRY RESERVED
            </span>
          </div>

          <div className="p-3.5 rounded-[8px] bg-[#121824] border border-[#1E293B] space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#94A3B8]">
                  TRAINER ACCREDITED
                </div>
                <div className="font-heading text-base font-bold text-white uppercase tracking-wide">
                  {formData.fullName || 'TRAINER'}
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#94A3B8]">
                  PASS TOKEN
                </div>
                <div className="font-mono text-xs font-bold text-[#FFCC03]">
                  {entryId}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1E293B] text-[11px] font-mono text-[#94A3B8]">
              <div>
                <span className="text-[#64748B]">STARTER: </span>
                <span className="text-white uppercase font-bold">{formData.favouritePokemon || 'NOT SELECTED'}</span>
              </div>
              <div className="text-right">
                <span className="text-[#64748B]">STATUS: </span>
                <span className="text-amber-400 font-bold uppercase">{formData.participationInterest === 'yes' ? 'BATTLE READY' : 'RESERVED'}</span>
              </div>
            </div>
          </div>

          {/* Event Schedule Info Box */}
          <div className="p-3 rounded-[8px] bg-black/60 border border-white/10 space-y-1.5">
            <div className="font-mono text-[9px] uppercase tracking-wider text-amber-400 font-bold">
              EVENT SCHEDULE & LOCATION
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono text-white/90">
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                <Calendar className="w-3.5 h-3.5 text-[#0DA5F0] shrink-0" />
                <span>16 SEP 2026</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>2:30 PM — 5:30 PM</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>CV 402, SRM-AP</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Verification notice if applicable */}
      {isPendingVerification && (
        <div className="p-3.5 rounded-[4px] bg-sky-50 border border-sky-200 text-sky-900 font-mono text-xs flex items-start gap-2.5 text-left">
          <MailCheck className="w-4 h-4 text-[#0DA5F0] shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-[#0284C7]">VERIFICATION LINK TRANSMITTED</div>
            <p className="text-[11px] text-slate-600 mt-0.5">
              We have dispatched a verification email to <strong>{formData.email}</strong>. Check your inbox to confirm your seat.
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Button
          onClick={handleShare}
          variant="outline"
          className="w-full sm:w-auto font-mono text-xs border-[#CBD5E1] text-[#090D12] hover:border-[#0DA5F0] gap-1.5"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>SHARE DECK</span>
        </Button>

        <Link to="/events" className="w-full sm:w-auto">
          <Button variant="primary" className="w-full font-mono text-xs gap-1.5">
            <span>EXPLORE ALL EVENTS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-mono text-[#64748B] hover:text-[#0DA5F0] underline cursor-pointer"
        >
          Register another trainer deck
        </button>
      )}
    </motion.div>
  );
};
