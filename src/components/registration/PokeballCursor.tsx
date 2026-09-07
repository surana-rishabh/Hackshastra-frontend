import * as React from 'react';

export interface PokeballOption {
  id: string;
  name: string;
  src: string;
}

export const POKEBALL_OPTIONS: PokeballOption[] = [
  { id: 'normal', name: 'Pokéball', src: 'https://i.postimg.cc/qvLJKBzM/Zeichenfl-che-2.png' },
  { id: 'super', name: 'Great Ball', src: 'https://i.postimg.cc/hPzk7chQ/Zeichenfl-che-2-Kopie.png' },
  { id: 'ultra', name: 'Ultra Ball', src: 'https://i.postimg.cc/KY7MxrdR/hyberball.png' },
  { id: 'master', name: 'Master Ball', src: 'https://i.postimg.cc/9MWqMwh1/masterball.png' },
];

export const PokeballCursor: React.FC = () => {
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const [currentBall, setCurrentBall] = React.useState<string>(POKEBALL_OPTIONS[0].src);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      {/* Scope global cursor hiding for desktop when on this event page */}
      <style>{`
        @media (min-width: 768px) {
          .pokeball-cursor-page,
          .pokeball-cursor-page * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Floating Pokéball Selector UI */}
      <div className="fixed bottom-4 right-4 z-[9999] flex items-center gap-2 bg-[#0F172A]/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#85b5cd]/40 shadow-2xl">
        <span className="text-[11px] font-mono text-[#FCF6D9] uppercase tracking-wider font-bold mr-1 hidden sm:inline">
          Pokéball Cursor:
        </span>
        <div className="flex items-center gap-1.5">
          {POKEBALL_OPTIONS.map((ball) => (
            <button
              key={ball.id}
              type="button"
              onClick={() => setCurrentBall(ball.src)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-125 ${
                currentBall === ball.src
                  ? 'bg-[#CF4B00]/30 ring-2 ring-[#CF4B00] scale-110'
                  : 'opacity-70 hover:opacity-100 bg-white/10'
              }`}
              title={`Equip ${ball.name}`}
            >
              <img src={ball.src} alt={ball.name} className="w-5 h-5 object-contain pointer-events-none" />
            </button>
          ))}
        </div>
      </div>

      {/* High Performance 60FPS Follower Pokéball Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[999999] transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } hidden md:block`}
        style={{ willChange: 'transform' }}
      >
        <img
          src={currentBall}
          alt="Pokéball Cursor"
          className="w-10 h-10 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] select-none pointer-events-none"
        />
      </div>
    </>
  );
};
