import * as React from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '@/data/siteData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SplitText, FadeUp } from '@/components/ui/MotionWrapper';
import { ArrowUpRight, Volume2, VolumeX, Play, Pause, ShieldCheck, Activity } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [isMuted, setIsMuted] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hasPlayed = sessionStorage.getItem('videoPlayed');
    if (hasPlayed === 'true') {
      video.pause();
      setIsPlaying(false);
    }

    const handleEnded = () => {
      sessionStorage.setItem('videoPlayed', 'true');
      setIsPlaying(false);
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, []);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center border-b border-[#E2E8F0] bg-[#FFFFFF] py-12 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <FadeUp delay={0.1}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4 mb-8 font-mono text-xs text-[#64748B]">
            <div className="flex items-center gap-3">
              <span className="text-[#0DA5F0] font-bold">01 / COMMUNITY STATEMENT</span>
              <span className="text-[#CBD5E1]">•</span>
              <span className="uppercase text-[#090D12] font-semibold">{siteData.siteInfo.subTagline}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-1" />
              <span>SYSTEM ONLINE // {siteData.siteCoordinates.display}</span>
            </div>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <FadeUp delay={0.2}>
              <Badge variant="cyan" dot className="mb-4">
                [ {siteData.siteInfo.tagline.toUpperCase()} ]
              </Badge>
            </FadeUp>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#090D12] leading-[1.05] uppercase">
              <SplitText text="WE HACK. WE BUILD. WE SHIP." delay={0.3} />
            </h1>

            <FadeUp delay={0.4}>
              <p className="mt-6 text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl font-body">
                {siteData.hero.description}
              </p>
            </FadeUp>

            <FadeUp delay={0.5}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/join">
                  <Button variant="gradient" size="lg" className="font-mono text-xs tracking-wider gap-2">
                    <span>JOIN THE COMMUNITY</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/events">
                  <Button variant="secondary" size="lg" className="font-mono text-xs tracking-wider">
                    <span>EXPLORE EVENTS</span>
                  </Button>
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={0.6}>
              <div className="mt-12 pt-6 border-t border-[#E2E8F0] flex flex-wrap items-center gap-8 font-mono text-xs text-[#64748B]">
                <div>
                  <span className="text-[#0DA5F0] font-bold text-base block">300K+</span>
                  <span className="text-[10px] text-[#94A3B8] uppercase font-medium">CREATOR REACH</span>
                </div>
                <div>
                  <span className="text-[#0284C7] font-bold text-base block">2,600+</span>
                  <span className="text-[10px] text-[#94A3B8] uppercase font-medium">COMMUNITY MEMBERS</span>
                </div>
                <div>
                  <span className="text-[#090D12] font-bold text-base block">₹30,000+</span>
                  <span className="text-[10px] text-[#94A3B8] uppercase font-medium">HACKATHON PRIZES</span>
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-5 relative">
            <FadeUp delay={0.3}>
              <div className="relative rounded-[2px] border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-[0_8px_30px_rgba(13,165,240,0.1)] hover:border-[#0DA5F0] transition-all">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 mb-4 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <img src="/logo.svg" alt="Logo" className="h-4 w-4" />
                    <span className="text-[#090D12] font-bold">HACKSHASTRA // HUB</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#0DA5F0] font-semibold">
                    <Activity className="h-3 w-3 animate-pulse" />
                    <span>LIVE TELEMETRY</span>
                  </div>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-[2px] border border-[#E2E8F0] bg-[#090D12] group shadow-inner">
                  <video
                    ref={videoRef}
                    src="/src/assets/Image_to_Video_Generation.mp4"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition-all duration-300"
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-[#FFFFFF]/90 backdrop-blur-sm border border-[#E2E8F0] px-3 py-1.5 rounded-[2px] shadow-sm">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-[#090D12]">
                      <button
                        onClick={togglePlay}
                        aria-label={isPlaying ? 'Pause teaser' : 'Play teaser'}
                        className="hover:text-[#0DA5F0] transition-colors cursor-pointer"
                      >
                        {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                      </button>
                      <span className="font-semibold">TEASER // SRM-AP</span>
                    </div>

                    <button
                      onClick={toggleAudio}
                      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                      className="text-[#64748B] hover:text-[#0DA5F0] transition-colors cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 border border-[#E2E8F0] bg-[#F8FAFC] rounded-[2px] flex items-center justify-between">
                    <span className="text-[#64748B]">AI / WEB3</span>
                    <span className="text-[#0DA5F0] font-bold">ACTIVE</span>
                  </div>
                  <div className="p-2.5 border border-[#E2E8F0] bg-[#F8FAFC] rounded-[2px] flex items-center justify-between">
                    <span className="text-[#64748B]">NATIONAL HACK</span>
                    <span className="text-[#0284C7] font-bold">36-HR</span>
                  </div>
                  <div className="p-2.5 border border-[#E2E8F0] bg-[#F8FAFC] rounded-[2px] flex items-center justify-between">
                    <span className="text-[#64748B]">COMMUNITY</span>
                    <span className="text-[#090D12] font-bold">CREATOR-LED</span>
                  </div>
                  <div className="p-2.5 border border-[#E2E8F0] bg-[#F8FAFC] rounded-[2px] flex items-center justify-between">
                    <span className="text-[#64748B]">CAMPUS</span>
                    <span className="text-[#0DA5F0] font-bold">SRM-AP</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3 w-3 text-[#0DA5F0]" />
                    <span className="font-medium">VERIFIED CHAPTER</span>
                  </div>
                  <span>ID: HS-AP-2026</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};
