import * as React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, Flame, Droplets, Leaf, Lock } from 'lucide-react';
import squirtleCardImg from '@/assets/events/beyond-the-screen/squirtle-card.png';
import charmanderCardImg from '@/assets/events/beyond-the-screen/charmander-card.png';
import bulbasaurCardImg from '@/assets/events/beyond-the-screen/bulbasaur-card.png';
import cardBackImg from '@/assets/events/beyond-the-screen/card-back.jpg';
import { cn } from '@/lib/utils';

interface StarterPartnerRevealGridProps {
  selectedPokemon: string;
  onSelectPokemon: (id: string) => void;
  error?: string;
}

interface StarterData {
  id: 'squirtle' | 'charmander' | 'bulbasaur';
  name: string;
  number: string;
  type: string;
  typeColor: string;
  cardImage: string;
  stats: { hp: number; attack: number; defense: number };
}

const STARTERS: StarterData[] = [
  {
    id: 'bulbasaur',
    name: 'BULBASAUR',
    number: '#001',
    type: 'GRASS / POISON',
    typeColor: '#65A30D',
    cardImage: bulbasaurCardImg,
    stats: { hp: 45, attack: 49, defense: 49 },
  },
  {
    id: 'charmander',
    name: 'CHARMANDER',
    number: '#004',
    type: 'FIRE',
    typeColor: '#F97316',
    cardImage: charmanderCardImg,
    stats: { hp: 39, attack: 52, defense: 43 },
  },
  {
    id: 'squirtle',
    name: 'SQUIRTLE',
    number: '#007',
    type: 'WATER',
    typeColor: '#1789E5',
    cardImage: squirtleCardImg,
    stats: { hp: 44, attack: 48, defense: 65 },
  },
];

export const StarterPartnerRevealGrid: React.FC<StarterPartnerRevealGridProps> = ({
  selectedPokemon,
  onSelectPokemon,
  error,
}) => {
  // Randomize card order on initial mount so position of pokemon is completely secret & unpredictable
  const [shuffledStarters] = React.useState<StarterData[]>(() => {
    return [...STARTERS].sort(() => Math.random() - 0.5);
  });

  // Mystery state: true once player taps a card
  const [hasRevealed, setHasRevealed] = React.useState<boolean>(Boolean(selectedPokemon));

  const handleCardClick = (id: string) => {
    // If already revealed, choice is locked in permanently
    if (hasRevealed) return;

    setHasRevealed(true);
    onSelectPokemon(id);
  };

  const getElementalIcon = (id: string) => {
    if (id === 'charmander') return <Flame className="w-3.5 h-3.5 text-[#F97316]" />;
    if (id === 'bulbasaur') return <Leaf className="w-3.5 h-3.5 text-[#65A30D]" />;
    return <Droplets className="w-3.5 h-3.5 text-[#0EA5E9]" />;
  };

  return (
    <div className="w-full space-y-2.5 select-none">
      {/* Top Interactive Prompt */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-amber-300 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="font-pokemon text-[10px] sm:text-[11px] tracking-wide text-amber-200 uppercase">
            {!hasRevealed
              ? 'MYSTERY CARDS • TOUCH ANY CARD TO CHOOSE YOUR PARTNER'
              : 'DESTINY LOCKED • YOUR PARTNER HAS CHOSEN YOU!'}
          </span>
        </div>

        {hasRevealed && (
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold">
            <Lock className="w-2.5 h-2.5" />
            <span>LOCKED</span>
          </div>
        )}
      </div>

      {/* 3D Flippable Cards Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 perspective-[1000px]">
        {shuffledStarters.map((starter) => {
          const isSelected = selectedPokemon === starter.id;

          return (
            <motion.div
              key={starter.id}
              whileHover={!hasRevealed ? { y: -4, scale: 1.03 } : undefined}
              whileTap={!hasRevealed ? { scale: 0.96 } : undefined}
              onClick={() => handleCardClick(starter.id)}
              className={cn(
                'relative aspect-[3/4.4] w-full',
                !hasRevealed ? 'cursor-pointer' : 'cursor-default'
              )}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* FLIPPABLE CARD CONTAINER */}
              <motion.div
                animate={{ rotateY: hasRevealed ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 220, damping: 20 }}
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 1. CARD BACK (Initial Face-Down Mystery View) */}
                <div
                  className="absolute inset-0 w-full h-full rounded-[10px] sm:rounded-[12px] overflow-hidden border-2 border-amber-400/50 bg-black shadow-xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <img
                    src={cardBackImg}
                    alt="Mystery Card Back"
                    className="w-full h-full object-cover select-none"
                  />
                  <div className="absolute inset-x-0 bottom-1 sm:bottom-2 text-center">
                    <span className="font-pokemon text-[8px] sm:text-[9px] uppercase text-[#FFCC03] bg-black/90 px-2 py-0.5 rounded-full border border-amber-400/50 shadow-md">
                      TAP TO REVEAL
                    </span>
                  </div>
                </div>

                {/* 2. CARD FRONT (Revealed Face-Up View - Clean & Crisp without glassmorphism) */}
                <div
                  className={cn(
                    'absolute inset-0 w-full h-full rounded-[10px] sm:rounded-[12px] overflow-hidden border-2 shadow-2xl transition-all duration-300 flex flex-col justify-between bg-black',
                    isSelected
                      ? 'border-white ring-2 ring-white/60 opacity-100 z-20 scale-[1.03]'
                      : 'border-white/20 opacity-60 hover:opacity-85'
                  )}
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    borderColor: isSelected ? starter.typeColor : 'rgba(255,255,255,0.2)',
                    boxShadow: isSelected
                      ? `0 0 20px ${starter.typeColor}, 0 4px 14px rgba(0,0,0,0.8)`
                      : '0 4px 10px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Card Artwork */}
                  <img
                    src={starter.cardImage}
                    alt={starter.name}
                    className="absolute inset-0 w-full h-full object-cover select-none"
                  />

                  {/* Selected Badge Indicator */}
                  {isSelected && (
                    <div className="relative z-10 p-1 sm:p-1.5 flex items-center justify-end">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-black font-black shadow-lg"
                        style={{ backgroundColor: starter.typeColor }}
                      >
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Partner Stat Card Readout */}
      {hasRevealed && selectedPokemon && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-2 sm:p-2.5 rounded-[10px] bg-[#0A0F14] border border-amber-400/40 flex items-center justify-between text-left shadow-lg"
        >
          {(() => {
            const current = STARTERS.find((s) => s.id === selectedPokemon) || STARTERS[0];
            return (
              <>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shadow-md shrink-0"
                    style={{ backgroundColor: `${current.typeColor}30`, border: `1px solid ${current.typeColor}` }}
                  >
                    {getElementalIcon(current.id)}
                  </div>
                  <div>
                    <div className="font-pokemon text-xs sm:text-sm uppercase text-white flex items-center gap-1">
                      <span style={{ color: current.typeColor }}>{current.name}</span>
                      <span className="font-mono text-[9px] text-white/50">{current.number}</span>
                    </div>
                    <div className="font-mono text-[9px] font-bold" style={{ color: current.typeColor }}>
                      AURA SYNCED // {current.type}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-[9px] text-white/80 shrink-0">
                  <span>HP: <strong className="text-white">{current.stats.hp}</strong></span>
                  <span>ATK: <strong className="text-amber-300">{current.stats.attack}</strong></span>
                  <span>DEF: <strong className="text-sky-300">{current.stats.defense}</strong></span>
                </div>
              </>
            );
          })()}
        </motion.div>
      )}

      {error && (
        <p className="font-mono text-[10px] sm:text-[11px] text-red-400 font-semibold text-left">
          {error}
        </p>
      )}
    </div>
  );
};

export default StarterPartnerRevealGrid;
