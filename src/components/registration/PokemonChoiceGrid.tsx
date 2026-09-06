import * as React from 'react';
import { PokemonOption } from '@/data/registration/beyondTheScreen';
import { PokemonChoiceCard } from './PokemonChoiceCard';
import { cn } from '@/lib/utils';

interface PokemonChoiceGridProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: PokemonOption[];
  error?: string;
  className?: string;
}

export const PokemonChoiceGrid: React.FC<PokemonChoiceGridProps> = ({
  id,
  value,
  onChange,
  options,
  error,
  className,
}) => {
  return (
    <div className={cn('w-full space-y-2 text-left', className)} role="radiogroup" aria-labelledby={`${id}-label`}>
      <div className="flex items-center justify-between">
        <label
          id={`${id}-label`}
          className="block font-mono text-[11px] uppercase font-bold tracking-wider text-[#334155]"
        >
          SELECT YOUR PARTNER POKÉMON <span className="text-red-500">*</span>
        </label>
        <span className="font-mono text-[10px] text-[#64748B]">Starter Arena Companion</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((pokemon) => (
          <PokemonChoiceCard
            key={pokemon.id}
            pokemon={pokemon}
            isSelected={value.toLowerCase() === pokemon.id.toLowerCase()}
            onSelect={onChange}
          />
        ))}
      </div>

      {error && (
        <p className="font-mono text-[11px] text-red-600 font-medium mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
