import * as React from 'react';
import { motion, MotionValue } from 'motion/react';
import { DeckCardConfig } from '@/data/registration/beyondTheScreen';
import { RegistrationFormData, FormValidationErrors } from '@/hooks/useRegistrationForm';
import { CardGloss } from './CardGloss';
import { CardCompletionMark } from './CardCompletionMark';
import { CardField } from './CardField';
import { SelectField } from './SelectField';
import { PokemonChoiceGrid } from './PokemonChoiceGrid';
import { ParticipationChoice } from './ParticipationChoice';
import { RegistrationSummary } from './RegistrationSummary';
import { ArrowLeft, ArrowRight, Sparkles, Loader2, Droplets, Flame, Leaf, Wifi, BatteryCharging, Radio } from 'lucide-react';
import { cn } from '@/lib/utils';
import pokedexRedFrameImg from '@/assets/events/beyond-the-screen/pokedex-red-frame.jpg';

interface RegistrationCardProps {
  card: DeckCardConfig;
  cardIndex: number;
  totalCards: number;
  formData: RegistrationFormData;
  errors: FormValidationErrors;
  isCompleted: boolean;
  onFieldChange: (field: keyof RegistrationFormData, value: string) => void;
  onEditCard: (cardIndex: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onSubmit?: () => void;
  isFirstCard?: boolean;
  isLastCard?: boolean;
  isTransitioning?: boolean;
  isSubmitting?: boolean;
  rotateX?: MotionValue<number> | number;
  rotateY?: MotionValue<number> | number;
  glossX?: MotionValue<string> | string;
  glossY?: MotionValue<string> | string;
  isRear?: boolean;
  className?: string;
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({
  card,
  cardIndex,
  totalCards,
  formData,
  errors,
  isCompleted,
  onFieldChange,
  onEditCard,
  onNext,
  onPrev,
  onSubmit,
  isFirstCard = false,
  isLastCard = false,
  isTransitioning = false,
  isSubmitting = false,
  rotateX = 0,
  rotateY = 0,
  glossX = '50%',
  glossY = '50%',
  isRear = false,
  className,
}) => {
  const isFinalCard = card.id === 'final-check';

  const getTypeIcon = (accent: string) => {
    if (accent === '#F97316') return <Flame className="w-3.5 h-3.5 text-[#F97316]" />;
    if (accent === '#65A30D') return <Leaf className="w-3.5 h-3.5 text-[#65A30D]" />;
    return <Droplets className="w-3.5 h-3.5 text-[#0DA5F0]" />;
  };

  return (
    <motion.div
      style={{
        rotateX: !isRear ? rotateX : 0,
        rotateY: !isRear ? rotateY : 0,
        transformPerspective: 1200,
        borderColor: `${card.typeAccent}95`,
        boxShadow: !isRear
          ? `0 32px 80px -15px rgba(0, 0, 0, 0.85), 0 0 50px ${card.typeAccent}40, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
          : `0 12px 35px -10px rgba(0, 0, 0, 0.5)`,
      }}
      className={cn(
        'relative w-full max-w-[560px] sm:max-w-[620px] md:max-w-[650px] h-[700px] sm:h-[750px] md:h-[780px] rounded-[28px]',
        'bg-[#0B0407]/35 backdrop-blur-2xl border-2 overflow-hidden text-white flex flex-col justify-between select-none shadow-2xl',
        'transition-all duration-300 ring-1 ring-white/20',
        isRear && 'pointer-events-none select-none opacity-80',
        className
      )}
    >
      {/* CLASSIC RED POKÉDEX HARDWARE CHASSIS & TRANSLUCENT SCREEN VIEWPORT */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-[26px] z-0 select-none">
        {/* Red Pokédex Device Frame Image */}
        <img
          src={pokedexRedFrameImg}
          alt="Classic Red Pokédex Chassis"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-55 filter contrast-110 brightness-105"
        />

        {/* Translucent Cyber Vignette & Depth Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(8,2,4,0.55) 0%, rgba(8,2,4,0.12) 30%, rgba(8,2,4,0.75) 65%, rgba(8,2,4,0.96) 100%)`,
          }}
        />

        {/* Ambient Elemental Accent Glow */}
        <div
          className="absolute top-0 inset-x-0 h-48 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${card.typeAccent} 0%, transparent 80%)`,
          }}
        />

        {/* Cyber HUD Grid Overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${card.typeAccent} 1.2px, transparent 1.2px)`,
            backgroundSize: '22px 22px',
          }}
        />

        {/* Corner Tech Brackets */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/40" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/40" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/40" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/40" />
      </div>

      {/* Moving Specular Gloss Layer */}
      {!isRear && <CardGloss glossX={glossX} glossY={glossY} />}

      {/* Completion Mark Stamp */}
      <CardCompletionMark
        isCompleted={isCompleted}
        typeAccent={card.typeAccent}
        label="CAPTURED"
      />

      {/* POKÉDEX TOP TELEMETRY HEADER */}
      <div className="relative z-10 px-5 py-3 bg-black/60 backdrop-blur-xl border-b border-white/15 flex items-center justify-between">
        {/* Left: Classic Blue Scanner Eye & LED Sensors */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span
              className="w-3.5 h-3.5 rounded-full shadow-[0_0_12px_#0DA5F0] animate-pulse"
              style={{ backgroundColor: card.typeAccent }}
            />
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>

          <span
            className="font-mono text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider text-black shadow-xs"
            style={{ backgroundColor: card.typeAccent }}
          >
            0{cardIndex + 1} // 0{totalCards}
          </span>
        </div>

        {/* Center: Module Title */}
        <div className="text-center">
          <h3 className="font-heading font-extrabold text-sm sm:text-base tracking-widest text-white uppercase leading-none">
            {card.title}
          </h3>
        </div>

        {/* Right: Telemetry & Type Badge */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-white/80">
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 font-bold">
            {getTypeIcon(card.typeAccent)}
            <span style={{ color: card.typeAccent }}>{card.typeBadge}</span>
          </div>
          <Wifi className="w-3.5 h-3.5 text-cyan-400 hidden sm:inline-block" />
          <BatteryCharging className="w-4 h-4 text-emerald-400" />
        </div>
      </div>

      {/* CARD BODY: PROMPT & FORM SECTION OVER THE TRANSLUCENT POKÉDEX SCREEN */}
      <div className="relative z-10 px-4 sm:px-6 py-3 flex-1 flex flex-col justify-end overflow-hidden">
        {/* Subtitle Banner */}
        <div className="mb-2.5 px-3.5 py-1.5 rounded-[8px] bg-black/45 backdrop-blur-md border border-white/10 text-left flex items-center justify-between">
          <p className="font-mono text-[11px] sm:text-xs text-slate-200 truncate">
            {card.subtitle}
          </p>
          <div className="flex items-center gap-1 text-[10px] font-mono text-white/50 uppercase tracking-wider hidden sm:flex">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>POKÉDEX-OS</span>
          </div>
        </div>

        {/* Translucent Frosted Glass Form Container */}
        <div className="rounded-[18px] bg-black/40 backdrop-blur-2xl p-4 sm:p-5 text-white shadow-2xl border border-white/20 space-y-3.5 max-h-[460px] sm:max-h-[500px] overflow-y-auto">
          {isFinalCard ? (
            <RegistrationSummary
              formData={formData}
              onEditCard={onEditCard}
            />
          ) : (
            card.fields.map((field) => {
              const fieldName = field.name as keyof RegistrationFormData;
              const fieldValue = formData[fieldName] || '';
              const fieldError = errors[fieldName];

              if (field.type === 'pokemon-choice' && field.pokemonOptions) {
                return (
                  <PokemonChoiceGrid
                    key={field.name}
                    id={field.name}
                    value={fieldValue}
                    onChange={(val) => onFieldChange(fieldName, val)}
                    options={field.pokemonOptions}
                    error={fieldError}
                  />
                );
              }

              if (field.type === 'participation-choice' && field.participationOptions) {
                return (
                  <ParticipationChoice
                    key={field.name}
                    id={field.name}
                    value={fieldValue}
                    onChange={(val) => onFieldChange(fieldName, val)}
                    options={field.participationOptions}
                    typeAccent={card.typeAccent}
                    error={fieldError}
                  />
                );
              }

              if (field.type === 'select' && field.options) {
                return (
                  <SelectField
                    key={field.name}
                    id={field.name}
                    name={field.name}
                    label={field.label}
                    value={fieldValue}
                    onChange={(val) => onFieldChange(fieldName, val)}
                    options={field.options}
                    placeholder={field.placeholder}
                    helperText={field.helperText}
                    error={fieldError}
                    required={field.required}
                    typeAccent={card.typeAccent}
                  />
                );
              }

              return (
                <CardField
                  key={field.name}
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type as 'text' | 'email' | 'tel'}
                  value={fieldValue}
                  onChange={(val) => onFieldChange(fieldName, val)}
                  placeholder={field.placeholder}
                  helperText={field.helperText}
                  error={fieldError}
                  required={field.required}
                  typeAccent={card.typeAccent}
                />
              );
            })
          )}
        </div>
      </div>

      {/* INTEGRATED POKÉDEX BEZEL FOOTER WITH TACTILE ACTIONS */}
      {!isRear && (
        <div className="relative z-10 px-5 py-3 bg-black/60 backdrop-blur-xl border-t border-white/15 flex items-center justify-between gap-3">
          {/* Prev Button */}
          {!isFirstCard ? (
            <motion.button
              type="button"
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPrev}
              disabled={isTransitioning || isSubmitting}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 font-mono text-xs font-bold cursor-pointer transition-colors disabled:opacity-40"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREV</span>
            </motion.button>
          ) : (
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/50">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>POKÉDEX READY</span>
            </div>
          )}

          {/* Next / Confirm Button */}
          {isLastCard ? (
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={onSubmit}
              disabled={isTransitioning || isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full font-mono text-xs font-black text-black shadow-xl cursor-pointer transition-all disabled:opacity-50"
              style={{
                backgroundColor: card.typeAccent,
                boxShadow: `0 0 28px ${card.typeAccent}90`,
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>SYNCHRONIZING ROSTER...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>CONFIRM REGISTRATION</span>
                </>
              )}
            </motion.button>
          ) : (
            <motion.button
              type="button"
              whileHover={{ x: 2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={onNext}
              disabled={isTransitioning || isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full font-mono text-xs font-black text-black shadow-lg cursor-pointer transition-all disabled:opacity-50"
              style={{
                backgroundColor: card.typeAccent,
                boxShadow: `0 0 22px ${card.typeAccent}80`,
              }}
            >
              <span>NEXT STEP</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </motion.button>
          )}
        </div>
      )}

      {/* Bottom Foil Rim */}
      <div
        className="h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${card.typeAccent} 50%, transparent 100%)`,
        }}
      />
    </motion.div>
  );
};

export default RegistrationCard;
