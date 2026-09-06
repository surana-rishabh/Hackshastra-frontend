import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  beyondTheScreenConfig,
  POKEMON_OPTIONS,
  PARTICIPATION_OPTIONS,
  DEPARTMENT_OPTIONS,
  YEAR_OPTIONS,
  GENDER_OPTIONS,
} from '@/data/registration/beyondTheScreen';
import { RegistrationFormData, FormValidationErrors } from '@/hooks/useRegistrationForm';
import { CardField } from './CardField';
import { SelectField } from './SelectField';
import { PokemonChoiceGrid } from './PokemonChoiceGrid';
import { ParticipationChoice } from './ParticipationChoice';
import {
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Wifi,
  BatteryCharging,
  Zap,
  Radio,
  User,
  Mail,
  GraduationCap,
  Flame,
  Swords,
  ShieldCheck,
} from 'lucide-react';
import pokedexFrameImg from '@/assets/events/beyond-the-screen/pokedex-frame.jpg';

interface PokedexTerminalProps {
  formData: RegistrationFormData;
  errors: FormValidationErrors;
  isSubmitting: boolean;
  submissionError: string | null;
  onFieldChange: (field: keyof RegistrationFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDismissError?: () => void;
}

export const PokedexTerminal: React.FC<PokedexTerminalProps> = ({
  formData,
  errors,
  isSubmitting,
  submissionError,
  onFieldChange,
  onSubmit,
  onDismissError,
}) => {
  // Calculate completion percentage
  const fields = [
    formData.fullName,
    formData.studentId,
    formData.gender,
    formData.email,
    formData.contactNumber,
    formData.department,
    formData.year,
    formData.favouritePokemon,
    formData.participationInterest,
  ];
  const filledCount = fields.filter((f) => Boolean(f && f.trim().length > 0)).length;
  const completionPercentage = Math.round((filledCount / fields.length) * 100);

  // Active accent dynamically updates with selected starter Pokemon
  const activeAccent =
    formData.favouritePokemon === 'charmander'
      ? '#F97316'
      : formData.favouritePokemon === 'bulbasaur'
      ? '#65A30D'
      : '#0DA5F0';

  return (
    <div className="w-full max-w-[640px] sm:max-w-[700px] md:max-w-[760px] mx-auto z-10 select-none">
      {/* POKÉDEX HARDWARE CHASSIS CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          borderColor: `${activeAccent}80`,
          boxShadow: `0 30px 90px -15px rgba(0, 0, 0, 0.9), 0 0 45px ${activeAccent}35, inset 0 1px 0 rgba(255, 255, 255, 0.25)`,
        }}
        className="relative rounded-[26px] sm:rounded-[32px] bg-[#06090E]/55 backdrop-blur-2xl border-2 overflow-hidden text-white shadow-2xl ring-1 ring-white/15"
      >
        {/* HARDWARE BACKGROUND WITH TRANSLUCENT POKÉDEX CHASSIS */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-[24px] sm:rounded-[30px] z-0 select-none">
          <img
            src={pokedexFrameImg}
            alt="Pokédex Chassis Frame"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 filter contrast-125 brightness-95"
          />

          {/* Translucent Cyber Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, rgba(6,9,14,0.65) 0%, rgba(6,9,14,0.3) 25%, rgba(6,9,14,0.88) 75%, rgba(6,9,14,0.98) 100%)`,
            }}
          />

          {/* Dynamic Top Ambient Aura */}
          <div
            className="absolute top-0 inset-x-0 h-48 opacity-30 pointer-events-none transition-colors duration-500"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${activeAccent} 0%, transparent 80%)`,
            }}
          />

          {/* Cyber HUD Grid Overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(${activeAccent} 1.2px, transparent 1.2px)`,
              backgroundSize: '22px 22px',
            }}
          />

          {/* Corner Tech Brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/40" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/40" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/40" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/40" />
        </div>

        {/* 1. TOP POKÉDEX HARDWARE SENSOR & TELEMETRY BEZEL */}
        <header className="relative z-10 px-5 sm:px-7 py-3.5 bg-black/70 backdrop-blur-xl border-b border-white/15 flex items-center justify-between">
          {/* LED Scanner Apertures */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span
                className="w-3.5 h-3.5 rounded-full shadow-[0_0_12px_#0DA5F0] animate-pulse"
                style={{ backgroundColor: activeAccent }}
              />
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span className="font-mono text-[10px] font-black text-white tracking-widest uppercase">
                POKÉDEX V2.0
              </span>
            </div>
          </div>

          {/* Right: Hardware State */}
          <div className="flex items-center gap-2.5 font-mono text-[11px] text-white/80">
            <span className="hidden sm:inline-flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> ONLINE
            </span>
            <span className="hidden sm:inline-block text-white/30">•</span>
            <div className="flex items-center gap-1">
              <Wifi className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">SRM-AP</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 font-bold">
              <BatteryCharging className="w-4 h-4" />
              <span>96%</span>
            </div>
          </div>
        </header>

        {/* 2. REAL-TIME DIAGNOSTIC PROGRESS BAR */}
        <div className="relative z-10 px-5 sm:px-7 py-2 bg-black/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-[11px] text-white/90">
            <Zap className="w-3.5 h-3.5" style={{ color: activeAccent }} />
            <span className="font-bold uppercase tracking-wider">REGISTRATION TELEMETRY:</span>
            <span className="font-extrabold" style={{ color: activeAccent }}>
              {filledCount}/9 PROTOCOLS ({completionPercentage}%)
            </span>
          </div>

          <div className="w-28 sm:w-36 h-2 rounded-full bg-black/80 border border-white/15 overflow-hidden p-0.5">
            <motion.div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${completionPercentage}%`,
                backgroundColor: activeAccent,
                boxShadow: `0 0 10px ${activeAccent}`,
              }}
            />
          </div>
        </div>

        {/* 3. MAIN FORM BODY INSIDE POKÉDEX SCREEN VIEWPORT */}
        <form onSubmit={onSubmit} className="relative z-10 px-4 sm:px-7 py-5 space-y-6">
          {/* Submission Error Alert */}
          <AnimatePresence>
            {submissionError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full p-3.5 rounded-[8px] bg-red-950/80 border border-red-500/60 text-red-200 font-mono text-xs flex items-start justify-between gap-3 text-left shadow-lg backdrop-blur-md"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-red-300 uppercase tracking-wide">
                      TRANSMISSION ERROR
                    </strong>
                    <span>{submissionError}</span>
                  </div>
                </div>

                {onDismissError && (
                  <button
                    type="button"
                    onClick={onDismissError}
                    className="text-red-400 hover:text-red-200 font-bold p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* SECTION 01: TRAINER IDENTITY */}
          <section className="rounded-[16px] bg-[#06090E]/60 backdrop-blur-2xl p-4 sm:p-5 border border-white/20 shadow-xl space-y-4 text-left">
            <div className="flex items-center gap-2 pb-2 border-b border-white/15">
              <User className="w-4 h-4" style={{ color: activeAccent }} />
              <h3 className="font-heading font-extrabold text-sm sm:text-base tracking-widest uppercase text-white">
                SECTION 01 // TRAINER IDENTITY
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <CardField
                  id="fullName"
                  name="fullName"
                  label="TRAINER FULL NAME"
                  type="text"
                  value={formData.fullName}
                  onChange={(val) => onFieldChange('fullName', val)}
                  placeholder="e.g. Ash Ketchum / Rishabh Surana"
                  helperText="Your official full name for event accreditation"
                  error={errors.fullName}
                  required
                  typeAccent={activeAccent}
                />
              </div>

              <div>
                <CardField
                  id="studentId"
                  name="studentId"
                  label="REGISTRATION / STUDENT ID"
                  type="text"
                  value={formData.studentId}
                  onChange={(val) => onFieldChange('studentId', val)}
                  placeholder="e.g. AP24110010001"
                  helperText="SRM University-AP ID"
                  error={errors.studentId}
                  required
                  typeAccent={activeAccent}
                />
              </div>

              <div>
                <SelectField
                  id="gender"
                  name="gender"
                  label="GENDER"
                  value={formData.gender}
                  onChange={(val) => onFieldChange('gender', val)}
                  options={GENDER_OPTIONS}
                  placeholder="Select your gender"
                  error={errors.gender}
                  required
                  typeAccent={activeAccent}
                />
              </div>
            </div>
          </section>

          {/* SECTION 02: COMMS & DIRECT CHANNEL */}
          <section className="rounded-[16px] bg-[#06090E]/60 backdrop-blur-2xl p-4 sm:p-5 border border-white/20 shadow-xl space-y-4 text-left">
            <div className="flex items-center gap-2 pb-2 border-b border-white/15">
              <Mail className="w-4 h-4" style={{ color: activeAccent }} />
              <h3 className="font-heading font-extrabold text-sm sm:text-base tracking-widest uppercase text-white">
                SECTION 02 // COMMS & RADAR CHANNEL
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <CardField
                  id="email"
                  name="email"
                  label="EMAIL ADDRESS"
                  type="email"
                  value={formData.email}
                  onChange={(val) => onFieldChange('email', val)}
                  placeholder="trainer@srmap.edu.in"
                  helperText="Where entry pass is transmitted"
                  error={errors.email}
                  required
                  typeAccent={activeAccent}
                />
              </div>

              <div>
                <CardField
                  id="contactNumber"
                  name="contactNumber"
                  label="CONTACT / WHATSAPP NO."
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(val) => onFieldChange('contactNumber', val)}
                  placeholder="+91 98765 43210"
                  helperText="Active number for live updates"
                  error={errors.contactNumber}
                  required
                  typeAccent={activeAccent}
                />
              </div>
            </div>
          </section>

          {/* SECTION 03: ACADEMIC CLEARANCE */}
          <section className="rounded-[16px] bg-[#06090E]/60 backdrop-blur-2xl p-4 sm:p-5 border border-white/20 shadow-xl space-y-4 text-left">
            <div className="flex items-center gap-2 pb-2 border-b border-white/15">
              <GraduationCap className="w-4 h-4" style={{ color: activeAccent }} />
              <h3 className="font-heading font-extrabold text-sm sm:text-base tracking-widest uppercase text-white">
                SECTION 03 // ACADEMIC CLEARANCE
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <SelectField
                  id="department"
                  name="department"
                  label="DEPARTMENT"
                  value={formData.department}
                  onChange={(val) => onFieldChange('department', val)}
                  options={DEPARTMENT_OPTIONS}
                  placeholder="Select branch (e.g. CSE)"
                  error={errors.department}
                  required
                  typeAccent={activeAccent}
                />
              </div>

              <div>
                <SelectField
                  id="year"
                  name="year"
                  label="YEAR OF STUDY"
                  value={formData.year}
                  onChange={(val) => onFieldChange('year', val)}
                  options={YEAR_OPTIONS}
                  placeholder="Select current year"
                  error={errors.year}
                  required
                  typeAccent={activeAccent}
                />
              </div>
            </div>
          </section>

          {/* SECTION 04: STARTER COMPANION SYNC */}
          <section className="rounded-[16px] bg-[#06090E]/60 backdrop-blur-2xl p-4 sm:p-5 border border-white/20 shadow-xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-white/15">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4" style={{ color: activeAccent }} />
                <h3 className="font-heading font-extrabold text-sm sm:text-base tracking-widest uppercase text-white">
                  SECTION 04 // CHOOSE STARTER COMPANION
                </h3>
              </div>
              <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase">
                AURA SYNC
              </span>
            </div>

            <PokemonChoiceGrid
              id="favouritePokemon"
              value={formData.favouritePokemon}
              onChange={(val) => onFieldChange('favouritePokemon', val)}
              options={POKEMON_OPTIONS}
              error={errors.favouritePokemon}
            />
          </section>

          {/* SECTION 05: BATTLE FORMAT INTENT */}
          <section className="rounded-[16px] bg-[#06090E]/60 backdrop-blur-2xl p-4 sm:p-5 border border-white/20 shadow-xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-white/15">
              <div className="flex items-center gap-2">
                <Swords className="w-4 h-4" style={{ color: activeAccent }} />
                <h3 className="font-heading font-extrabold text-sm sm:text-base tracking-widest uppercase text-white">
                  SECTION 05 // BATTLE PARTICIPATION
                </h3>
              </div>
              <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase">
                ARENA FORMAT
              </span>
            </div>

            <ParticipationChoice
              id="participationInterest"
              value={formData.participationInterest}
              onChange={(val) => onFieldChange('participationInterest', val)}
              options={PARTICIPATION_OPTIONS}
              typeAccent={activeAccent}
              error={errors.participationInterest}
            />
          </section>

          {/* 4. MASTER POKÉDEX CONFIRMATION BEZEL BUTTON */}
          <div className="pt-2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-full font-heading font-black text-sm sm:text-base text-black uppercase tracking-wider shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-50"
              style={{
                backgroundColor: activeAccent,
                boxShadow: `0 0 35px ${activeAccent}95`,
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  <span>TRANSMITTING TO ARENA DATABASE...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-black" />
                  <span>LOCK & CONFIRM TRAINER REGISTRATION</span>
                </>
              )}
            </motion.button>
          </div>
        </form>

        {/* Bottom Hardware Bezel Trim */}
        <div
          className="h-2 w-full"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${activeAccent} 50%, transparent 100%)`,
          }}
        />
      </motion.div>
    </div>
  );
};

export default PokedexTerminal;
