import * as React from 'react';
import { RegistrationFormData } from '@/hooks/useRegistrationForm';
import { POKEMON_OPTIONS, PARTICIPATION_OPTIONS } from '@/data/registration/beyondTheScreen';
import { getImageUrl } from '@/lib/assets';
import { Edit2, ShieldCheck, Mail, Phone, BookOpen, User, Flame, Droplets, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RegistrationSummaryProps {
  formData: RegistrationFormData;
  onEditCard: (cardIndex: number) => void;
  className?: string;
}

export const RegistrationSummary: React.FC<RegistrationSummaryProps> = ({
  formData,
  onEditCard,
  className,
}) => {
  const selectedPokemon = POKEMON_OPTIONS.find(
    (p) => p.id.toLowerCase() === formData.favouritePokemon.toLowerCase()
  ) || POKEMON_OPTIONS[0];

  const selectedParticipation = PARTICIPATION_OPTIONS.find(
    (p) => p.value.toLowerCase() === formData.participationInterest.toLowerCase()
  ) || PARTICIPATION_OPTIONS[0];

  const getPartnerIcon = (id: string) => {
    switch (id) {
      case 'squirtle':
        return <Droplets className="w-3.5 h-3.5 text-[#1789E5]" />;
      case 'charmander':
        return <Flame className="w-3.5 h-3.5 text-[#F97316]" />;
      case 'bulbasaur':
      default:
        return <Leaf className="w-3.5 h-3.5 text-[#65A30D]" />;
    }
  };

  return (
    <div className={cn('w-full space-y-2.5 text-left', className)}>
      <div className="flex items-center justify-between border-b border-white/15 pb-2">
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#1789E5]">
          <ShieldCheck className="w-4 h-4" />
          <span>DECK SPECIFICATION // VERIFY</span>
        </div>
        <span className="font-mono text-[9px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/50">
          ALL FIELDS CAPTURED
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {/* Trainer Profile Block */}
        <div className="p-2.5 rounded-[4px] bg-black/60 border border-white/20 relative group hover:border-[#1789E5] transition-colors">
          <button
            type="button"
            onClick={() => onEditCard(0)}
            className="absolute top-2 right-2 text-slate-400 hover:text-[#1789E5] cursor-pointer"
            title="Edit Trainer Profile"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <div className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-slate-400 mb-0.5 flex items-center gap-1 font-bold">
            <User className="w-3 h-3 text-[#1789E5]" /> TRAINER PROFILE
          </div>
          <div className="font-heading font-bold text-xs sm:text-sm text-white truncate">
            {formData.fullName || '—'}
          </div>
          <div className="font-mono text-[10px] text-slate-300 mt-0.5 truncate">
            ID: {formData.studentId || '—'} • {formData.gender || '—'}
          </div>
        </div>

        {/* Comms Signal Block */}
        <div className="p-2.5 rounded-[4px] bg-black/60 border border-white/20 relative group hover:border-[#1789E5] transition-colors">
          <button
            type="button"
            onClick={() => onEditCard(1)}
            className="absolute top-2 right-2 text-slate-400 hover:text-[#1789E5] cursor-pointer"
            title="Edit Contact Signal"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <div className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-slate-400 mb-0.5 flex items-center gap-1 font-bold">
            <Mail className="w-3 h-3 text-[#1789E5]" /> COMMS SIGNAL
          </div>
          <div className="font-sans font-medium text-xs text-white truncate">
            {formData.email || '—'}
          </div>
          <div className="font-mono text-[10px] text-slate-300 mt-0.5 flex items-center gap-1 truncate">
            <Phone className="w-2.5 h-2.5 text-[#1789E5]" /> {formData.contactNumber || '—'}
          </div>
        </div>

        {/* Academic & Battle Class */}
        <div className="p-2.5 rounded-[4px] bg-black/60 border border-white/20 relative group hover:border-[#F97316] transition-colors">
          <button
            type="button"
            onClick={() => onEditCard(2)}
            className="absolute top-2 right-2 text-slate-400 hover:text-[#F97316] cursor-pointer"
            title="Edit Academic Class"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <div className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-slate-400 mb-0.5 flex items-center gap-1 font-bold">
            <BookOpen className="w-3 h-3 text-[#F97316]" /> TRAINER CLASS
          </div>
          <div className="font-heading font-bold text-xs text-white truncate">
            {formData.department || '—'}
          </div>
          <div className="font-mono text-[10px] text-slate-300 mt-0.5 flex items-center gap-2">
            <span>{formData.year || '—'}</span>
            <span>•</span>
            <span
              className="px-1.5 py-0.2 rounded font-bold uppercase text-[9px]"
              style={{
                backgroundColor: '#F9731630',
                color: '#F97316',
                border: '1px solid #F9731660',
              }}
            >
              {selectedParticipation.badge}
            </span>
          </div>
        </div>

        {/* Chosen Partner Pokémon */}
        <div className="p-2.5 rounded-[4px] bg-black/60 border border-white/20 relative group hover:border-[#65A30D] transition-colors flex items-center justify-between">
          <button
            type="button"
            onClick={() => onEditCard(3)}
            className="absolute top-2 right-2 text-slate-400 hover:text-[#65A30D] cursor-pointer"
            title="Edit Partner Pokémon"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <div className="space-y-0.5">
            <div className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-slate-400 mb-0.5 flex items-center gap-1 font-bold">
              {getPartnerIcon(selectedPokemon.id)} CHOSEN PARTNER
            </div>
            <div
              className="font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider"
              style={{ color: selectedPokemon.typeColor }}
            >
              {selectedPokemon.name}
            </div>
            <div className="font-mono text-[9px] text-slate-300">
              {selectedPokemon.type} TYPE
            </div>
          </div>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[4px] overflow-hidden border border-white/20 shrink-0 mr-3">
            <img
              src={getImageUrl(selectedPokemon.imageKey)}
              alt={selectedPokemon.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      <div className="p-2 rounded-[4px] bg-black/50 border border-white/10 font-mono text-[10px] text-slate-300 flex items-center justify-between">
        <span>ARENA: <strong className="text-white">CV 402</strong></span>
        <span>DATE: <strong className="text-white">16 SEP 2026</strong></span>
      </div>
    </div>
  );
};
