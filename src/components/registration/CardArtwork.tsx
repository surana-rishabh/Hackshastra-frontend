import * as React from 'react';
import { getImageUrl } from '@/lib/assets';
import { cn } from '@/lib/utils';

interface CardArtworkProps {
  imageKey: string;
  altText?: string;
  typeAccent?: string;
  className?: string;
  priority?: boolean;
}

export const CardArtwork: React.FC<CardArtworkProps> = ({
  imageKey,
  altText = 'Card Artwork',
  typeAccent = '#0DA5F0',
  className,
  priority = false,
}) => {
  const imageUrl = getImageUrl(imageKey);

  return (
    <div className={cn('relative w-full overflow-hidden rounded-[8px] select-none group', className)}>
      {/* Dynamic elemental backdrop glow */}
      <div
        className="absolute inset-0 opacity-20 blur-xl pointer-events-none transition-all duration-500 group-hover:opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${typeAccent} 0%, transparent 75%)`,
        }}
      />

      {/* Artwork container */}
      <div className="relative w-full overflow-hidden rounded-[6px] border border-white/20 bg-slate-950/40 shadow-inner">
        <img
          src={imageUrl}
          alt={altText}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-cover object-top block transition-transform duration-500 group-hover:scale-103"
        />

        {/* Subtle holographic foil diagonal light reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-60" />

        {/* Inner vignette frame */}
        <div className="absolute inset-0 ring-1 ring-inset ring-black/20 pointer-events-none rounded-[6px]" />
      </div>
    </div>
  );
};
