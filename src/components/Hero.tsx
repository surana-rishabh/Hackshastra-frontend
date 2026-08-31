import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SplitReveal, MagneticButton } from "@/components/ui/MotionPrimitives";
import PixelCard from "@/components/ui/PixelCard";
import OptionWheel from "@/components/ui/OptionWheel";
import DotMatrixText from "@/components/ui/DotMatrixText";
import siteData, { getImageUrl } from "@/data/siteData";

interface HeroProps {
  loadingComplete?: boolean;
  userInteracted?: boolean;
}

const categoryTickers: Record<string, string> = {
  'HACKATHONS': 'HACKATHONS • 24H SPRINT • BUILD & WIN',
  'WORKSHOPS': 'WORKSHOPS • HANDS-ON BOOTCAMPS • MENTORSHIP',
  'AI & WEB3': 'AI & WEB3 • DEEPTECH INNOVATION • AGENTS & SMARTS',
  'BUILD EXPONENT': 'BUILD EXPONENT • SHIP PRODUCTS • SPEED RUNS',
  'COMMUNITY MEETS': 'COMMUNITY MEETS • NETWORKING • SRM UNIVERSITY-AP'
};

const Hero = ({ loadingComplete = false, userInteracted = false }: HeroProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('HACKATHONS');
  const [isMuted, setIsMuted] = useState(true);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(() => {
    return sessionStorage.getItem('videoPlayed') === 'true';
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = getImageUrl(siteData.hero.video);
  const subtitle = siteData.hero.subtitle;
  const description = siteData.hero.description;

  useEffect(() => {
    if (!loadingComplete || hasPlayedOnce) return;
    
    const video = videoRef.current;
    if (!video) return;
    
    if (userInteracted) {
      video.muted = false;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
    
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (!video.muted) {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(e => console.log('Autoplay muted fallback failed:', e));
        }
      });
    }

    const handleEnded = () => {
      video.pause();
      video.currentTime = 0;
      sessionStorage.setItem('videoPlayed', 'true');
      setHasPlayedOnce(true);
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [loadingComplete, hasPlayedOnce, userInteracted]);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <section className="relative min-h-screen bg-white text-[#071014] pt-24 pb-16 flex flex-col justify-between overflow-hidden">
      
      {/* ── PixelCard Background Canvas Layer ── */}
      <PixelCard variant="blue" className="absolute inset-0 z-0 opacity-40 pointer-events-none" />

      {/* ── Top Index Bar ── */}
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between text-xs font-mono text-[#64748B] tracking-widest uppercase mb-4 border-b border-[#E2E8F0] pb-4 relative z-10">
        <span>01 / COMMUNITY STATEMENT</span>
        <span className="hidden sm:inline">SRM UNIVERSITY-AP CHAPTER</span>
        <span>16.4627° N / 80.5068° E</span>
      </div>

      {/* ── Dynamic Dot Matrix LED Ticker Banner (Synced with OptionWheel) ── */}
      <div className="max-w-7xl mx-auto px-6 w-full mb-8 relative z-10">
        <div className="bg-[#071014] border border-[#35434B] p-3 rounded-[2px] flex items-center justify-between overflow-x-auto shadow-inner transition-all">
          <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#0DA5F0] animate-pulse" />
            <span>LIVE LED TICKER:</span>
          </div>
          <DotMatrixText text={categoryTickers[selectedCategory] || "HACKSHASTRA 2026 • REGISTRATIONS OPEN"} dotSize={3} color="#0DA5F0" />
        </div>
      </div>

      {/* ── Main Editorial Split Hero ── */}
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: Tagline & Subtitle */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F7FE] border border-primary/30 rounded-[2px] text-primary text-xs font-mono tracking-widest uppercase w-fit">
            <span>[</span> INDIA'S FIRST CREATOR-LED MOVEMENT <span>]</span>
          </div>

          <PixelCard variant="blue" className="p-6 sm:p-8 border border-[#E2E8F0] shadow-sm rounded-[4px]">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight leading-[0.95] uppercase text-[#071014]">
              <SplitReveal text="WE HACK." delay={0.1} />
              <SplitReveal text="WE BUILD." delay={0.3} />
              <span className="text-primary"><SplitReveal text="WE SHIP." delay={0.5} /></span>
            </h1>
          </PixelCard>

          <p className="text-[#64748B] text-lg sm:text-xl font-body max-w-2xl leading-relaxed mt-2">
            {subtitle} — {description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <MagneticButton>
              <Link
                to="/join"
                className="inline-flex items-center gap-3 bg-primary text-white hover:bg-[#0877AF] px-8 py-4 rounded-[2px] font-heading font-bold text-sm tracking-wider uppercase transition-colors shadow-md"
              >
                <span>JOIN THE COMMUNITY</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </MagneticButton>

            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-[#F4F7F8] border border-[#E2E8F0] text-[#071014] hover:border-primary px-6 py-4 rounded-[2px] font-mono text-xs tracking-widest uppercase transition-colors"
            >
              EXPLORE EVENTS
            </Link>
          </div>
        </div>

        {/* Center/Right Column: Interactive Category Filter Wheel & Video Frame */}
        <div className="md:col-span-5 flex flex-col gap-6 items-center">
          
          {/* Minimalist Interactive Category Filter Wheel */}
          <div className="w-full bg-white border border-[#E2E8F0] rounded-[2px] p-4 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2 mb-3 text-[10px] font-mono text-[#64748B] uppercase tracking-widest">
              <span>01 / EVENT CATEGORY WHEEL</span>
              <span className="text-primary font-bold">[ DRAG TO FILTER ]</span>
            </div>

            <div className="w-full h-[160px] relative">
              <OptionWheel
                items={['HACKATHONS', 'WORKSHOPS', 'AI & WEB3', 'BUILD EXPONENT', 'COMMUNITY MEETS']}
                defaultSelected={0}
                textColor="#94A3B8"
                activeColor="#0DA5F0"
                fontSize={1.1}
                spacing={1.2}
                tilt={4}
                blur={1}
                fade={0.3}
                inset={20}
                loop={true}
                onChange={(_idx, label) => {
                  setSelectedCategory(label);
                }}
              />
            </div>

            <div className="mt-2 pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
              <span>SELECT EVENT TYPE</span>
              <Link to="/events" className="text-primary hover:underline uppercase font-bold flex items-center gap-1">
                VIEW ALL ↗
              </Link>
            </div>
          </div>

          {/* Video / Image Media Frame */}
          <div className="w-full relative h-[240px] sm:h-[260px] rounded-[2px] overflow-hidden border border-[#E2E8F0] shadow-md group z-10">
            <video
              ref={videoRef}
              muted={isMuted}
              playsInline
              preload="auto"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

            <button
              onClick={toggleMute}
              className="absolute bottom-4 left-4 z-20 p-2.5 rounded-[2px] bg-white/90 text-[#071014] border border-[#E2E8F0] hover:text-primary transition-colors backdrop-blur-md"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
