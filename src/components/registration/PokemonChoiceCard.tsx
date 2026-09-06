import * as React from 'react';
import { motion } from 'motion/react';
import { Check, Shield, Zap, Droplets, Flame, Leaf, Sparkles } from 'lucide-react';
import { PokemonOption } from '@/data/registration/beyondTheScreen';
import { cn } from '@/lib/utils';

interface PokemonChoiceCardProps {
  pokemon: PokemonOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  className?: string;
}

export const PokemonChoiceCard: React.FC<PokemonChoiceCardProps> = ({
  pokemon,
  isSelected,
  onSelect,
  className,
}) => {
  const getElementalIcon = () => {
    if (pokemon.id === 'charmander') return <Flame className="w-8 h-8 text-[#F97316]" />;
    if (pokemon.id === 'bulbasaur') return <Leaf className="w-8 h-8 text-[#65A30D]" />;
    return <Droplets className="w-8 h-8 text-[#0DA5F0]" />;
  };

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={`Select ${pokemon.name} as partner Pokémon`}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      onClick={() => onSelect(pokemon.id)}
      className={cn(
        'relative group rounded-[10px] border p-2.5 text-left cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden',
        isSelected
          ? 'bg-black/90 shadow-xl border-2'
          : 'bg-black/50 hover:bg-black/75 border-white/20 hover:border-white/40',
        className
      )}
      style={{
        borderColor: isSelected ? pokemon.typeColor : undefined,
        boxShadow: isSelected
          ? `0 0 24px ${pokemon.typeColor}60, inset 0 1px 0 rgba(255,255,255,0.25)`
          : undefined,
      }}
    >
      {/* Background elemental ambient glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-40"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${pokemon.typeColor} 0%, transparent 80%)`,
        }}
      />

      {/* Top Bar: Type Badge & Selection Checkmark */}
      <div className="relative z-10 flex items-center justify-between mb-2">
        <span
          className="font-mono text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] tracking-wider uppercase"
          style={{
            backgroundColor: `${pokemon.typeColor}30`,
            color: pokemon.typeColor,
            border: `1px solid ${pokemon.typeColor}60`,
          }}
        >
          {pokemon.type}
        </span>

        {isSelected ? (
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-4 h-4 rounded-full flex items-center justify-center text-black shadow-xs font-bold"
            style={{ backgroundColor: pokemon.typeColor }}
          >
            <Check className="w-3 h-3 stroke-[3]" />
          </motion.div>
        ) : (
          <span className="font-mono text-[8px] text-white/40 uppercase">READY</span>
        )}
      </div>

      {/* Holographic Elemental Emblem Container */}
      <div
        className="relative z-10 w-full h-16 rounded-[8px] overflow-hidden bg-black/60 mb-2 flex flex-col items-center justify-center border border-white/10 group-hover:border-white/25 transition-colors"
        style={{
          boxShadow: isSelected ? `inset 0 0 16px ${pokemon.typeColor}30` : undefined,
        }}
      >
        <div className="relative">
          {getElementalIcon()}
          {isSelected && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="absolute -inset-2 rounded-full border border-dashed opacity-60 pointer-events-none"
              style={{ borderColor: pokemon.typeColor }}
            />
          )}
        </div>
        <span className="font-mono text-[8px] text-white/50 tracking-widest mt-1 uppercase">
          HOLOGRAM-SYNC
        </span>
      </div>

      {/* Name and Stats */}
      <div className="relative z-10 space-y-1">
        <div className="flex items-center justify-between">
          <h4
            className="font-heading font-extrabold text-xs tracking-wider uppercase transition-colors"
            style={{ color: isSelected ? pokemon.typeColor : '#FFFFFF' }}
          >
            {pokemon.name}
          </h4>
          <span className="font-mono text-[9px] text-slate-300 font-bold">HP {pokemon.stats.hp}</span>
        </div>

        {/* Mini Stat Indicators */}
        <div className="pt-0.5 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-slate-400">
          <span className="flex items-center gap-0.5 text-amber-300">
            <Zap className="w-2.5 h-2.5" /> ATK {pokemon.stats.attack}
          </span>
          <span className="flex items-center gap-0.5 text-sky-300">
            <Shield className="w-2.5 h-2.5" /> DEF {pokemon.stats.defense}
          </span>
        </div>
      </div>
    </motion.button>
  );
};

export default PokemonChoiceCard;
