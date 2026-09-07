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
  typeAccent = '#1789E5',
  className,
  priority = false,
}) => {
  const imageUrl = getImageUrl(imageKey);

  return (
    <div className={cn('relative w-full overflow-hidden rounded-[8px] select-none group', className)}>
      {/* Dynamic elemental backdrop glow */}
      <div
        className="absolute inset-0 opacity-20 blur-xl pointer-events-none transition-all duration-500 group-hover:opacity-30 bg-[#1789E5]/20 backdrop-blur-md"
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

        {/* Solid glassmorphism overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] pointer-events-none opacity-60" />

        {/* Inner vignette frame */}
        <div className="absolute inset-0 ring-1 ring-inset ring-black/20 pointer-events-none rounded-[6px]" />
      </div>
    </div>
  );
};
