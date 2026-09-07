import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Volume2, VolumeX, Activity, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EntrancePortalProps {
  onEnter: () => void;
}

export const EntrancePortal: React.FC<EntrancePortalProps> = ({ onEnter }) => {
  const [isClosing, setIsClosing] = React.useState(false);
  const [targetTilt, setTargetTilt] = React.useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = React.useState('');
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // Live IST Clock
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Lock scroll & setup keyboard listener
  React.useEffect(() => {
    document.body.classList.add('entrance-portal-active');
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        triggerEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('entrance-portal-active');
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Mouse Parallax & Tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xRatio = (clientX / innerWidth - 0.5) * 2;
    const yRatio = (clientY / innerHeight - 0.5) * 2;

    setTargetTilt({ x: -yRatio * 14, y: xRatio * 14 });
  };

  // Interactive Particle Constellation Canvas
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }> = [];

    const colors = ['#CF4B00', '#9CC6DB', '#DDBA7D', '#0F172A'];
    const particleCount = Math.min(45, Math.floor(width / 30));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle tech matrix grid
      ctx.strokeStyle = 'rgba(207, 75, 0, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Draw node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#CF4B00';
            ctx.globalAlpha = (1 - dist / 130) * 0.14;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Audio chime feedback via Web Audio API
  const playEnterChime = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(440, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.35);

      osc2.frequency.setValueAtTime(554.37, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(1108.73, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.45);
      osc2.stop(ctx.currentTime + 0.45);
    } catch {
      // AudioContext policy catch
    }
  };

  const triggerEnter = () => {
    if (isClosing) return;
    playEnterChime();
    setIsClosing(true);
  };

  const handleExitComplete = () => {
    onEnter();
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isClosing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to HackShastra Portal"
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-between bg-[#FCF6D9] p-4 sm:p-6 select-none overflow-hidden text-[#0F172A]"
        >
          {/* 1. Interactive Constellation Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

          {/* Ambient Warm Vignette & Radial Aura */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#FCF6D9]/40 to-[#F4ECCD]/90 pointer-events-none z-0" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#CF4B00]/8 blur-[100px] pointer-events-none z-0" />

          {/* 2. TOP HUD NAVIGATION BAR */}
          <header className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between pt-2 px-1">
            {/* Left Telemetry: Time & Coordinates */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#9CC6DB]/40 border border-[#85b5cd] font-mono text-[11px] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-[#0F172A]">SRM-AP IST</span>
                <span className="text-[#0F172A]/70 font-mono font-medium pl-1 border-l border-[#85b5cd]">
                  {currentTime || '00:00:00'}
                </span>
              </div>
              <div className="hidden md:flex items-center gap-1 text-[11px] font-mono text-[#0F172A]/60">
                <Compass className="w-3.5 h-3.5 text-[#CF4B00]" />
                <span>16.4627° N, 80.5068° E</span>
              </div>
            </div>

            {/* Center Status Banner */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCF6D9] border border-[#CF4B00]/30 shadow-xs">
              <Activity className="w-3.5 h-3.5 text-[#CF4B00] animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-[#CF4B00]">
                CORE PROTOCOL ONLINE // v2.0
              </span>
            </div>

            {/* Right Controls: Sound Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 rounded-[2px] border border-[#85b5cd] bg-[#9CC6DB]/40 hover:bg-[#9CC6DB] text-[#0F172A] transition-colors cursor-pointer"
                title={soundEnabled ? 'Mute audio feedback' : 'Unmute audio feedback'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-[#CF4B00]" />}
              </button>
            </div>
          </header>

          {/* 3. MAIN CENTERPORTAL CORE */}
          <main className="relative z-20 flex flex-col items-center justify-center text-center max-w-xl w-full my-auto py-4">
            
            {/* 3D HOLOGRAPHIC MANDALA EMBLEM */}
            <div
              className="relative mb-6 flex items-center justify-center cursor-pointer transition-transform duration-200"
              style={{
                perspective: 1000,
                transform: `rotateX(${targetTilt.x}deg) rotateY(${targetTilt.y}deg)`,
              }}
              onClick={triggerEnter}
            >
              {/* Outer Rotating Radar Rings */}
              <div className="absolute h-56 w-56 sm:h-64 sm:w-64 rounded-full border border-[#CF4B00]/30 animate-spin [animation-duration:32s]" />
              <div className="absolute h-64 w-64 sm:h-76 sm:w-76 rounded-full border border-dashed border-[#85b5cd]/60 animate-spin [animation-duration:44s] [animation-direction:reverse]" />
              <div className="absolute h-44 w-44 sm:h-52 sm:w-52 rounded-full border border-[#DDBA7D]/40 animate-pulse [animation-duration:3s]" />

              {/* Orbital Ticks around Emblem */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="absolute top-0 font-mono text-[8px] text-[#CF4B00]/60 font-bold">000°</span>
                <span className="absolute right-0 font-mono text-[8px] text-[#CF4B00]/60 font-bold">090°</span>
                <span className="absolute bottom-0 font-mono text-[8px] text-[#CF4B00]/60 font-bold">180°</span>
                <span className="absolute left-0 font-mono text-[8px] text-[#CF4B00]/60 font-bold">270°</span>
              </div>

              {/* Glowing Warm Energy Orb */}
              <div className="absolute h-36 w-36 rounded-full bg-[#CF4B00]/25 blur-2xl animate-pulse" />

              {/* Center Core Emblem Vessel */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full border-2 border-[#CF4B00] bg-[#9CC6DB] p-5 sm:p-6 shadow-[0_0_50px_rgba(207,75,0,0.35)] group"
              >
                <img
                  src="/logo.svg"
                  alt="HackShastra Sacred Trident Emblem"
                  className="h-full w-full object-contain filter drop-shadow-md group-hover:rotate-6 transition-transform duration-300"
                />

                {/* Ring Orbit Indicator */}
                <div className="absolute -inset-1.5 rounded-full border border-[#CF4B00]/50 border-t-transparent animate-spin [animation-duration:6s] pointer-events-none" />
              </motion.div>
            </div>

            {/* TYPOGRAPHY & CHAPTER BRANDING */}
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-center mb-7 space-y-2.5"
            >
              {/* Main Heading */}
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F172A] leading-tight drop-shadow-xs">
                HACKSHASTRA
              </h1>

              {/* Clean Subtitle */}
              <p className="max-w-md mx-auto text-sm sm:text-base text-[#0F172A]/90 font-mono font-bold tracking-wide leading-relaxed uppercase">
                FORGING BUILDERS, ARCHITECTS & INNOVATORS
              </p>
            </motion.div>

            {/* "ENTER PORTAL" ACTION BUTTON */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              <button
                type="button"
                onClick={triggerEnter}
                className={cn(
                  'group relative inline-flex items-center justify-center gap-2.5 px-9 py-3.5 rounded-[2px]',
                  'bg-[#CF4B00] hover:bg-[#b04000] text-white font-mono text-sm sm:text-base font-black tracking-widest uppercase',
                  'border-2 border-[#CF4B00] hover:border-[#8f3400] shadow-[0_12px_32px_rgba(207,75,0,0.35)]',
                  'hover:shadow-[0_16px_40px_rgba(207,75,0,0.5)] active:scale-98 transition-all duration-200 cursor-pointer overflow-hidden'
                )}
              >
                {/* Button Shimmer / Laser Scanline */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                <span className="relative z-10 flex items-center gap-2">
                  <span>ENTER PORTAL</span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                </span>
              </button>
            </motion.div>
          </main>

          {/* 4. FOOTER TELEMETRY */}
          <footer className="relative z-20 w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#85b5cd]/50 pt-3 pb-1 text-[10px] font-mono text-[#0F172A]/70">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#CF4B00]">HACKSHASTRA</span>
              <span>//</span>
              <span>STUDENT TECHNICAL COMMUNITY</span>
            </div>

            <div className="flex items-center gap-4">
              <span>LAT: 16.4627° N / LONG: 80.5068° E</span>
              <span className="hidden sm:inline-block">•</span>
              <span className="hidden sm:inline-block font-bold text-[#0F172A]">SRM UNIVERSITY-AP</span>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default EntrancePortal;
