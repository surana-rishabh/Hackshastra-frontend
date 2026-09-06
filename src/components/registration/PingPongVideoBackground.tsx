import * as React from 'react';

interface VideoBackgroundProps {
  src: string;
  className?: string;
  overlayClassName?: string;
  playbackSpeed?: number;
  reverseSpeed?: number;
  maxDuration?: number;
}

export const PingPongVideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  className = '',
  overlayClassName = 'bg-black/40 backdrop-blur-[0.5px]',
}) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [src]);

  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 ${className}`}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      />
      {/* Visual Overlay for Readability */}
      <div className={`absolute inset-0 ${overlayClassName}`} />
      {/* Subtle Ambient Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-[#06090E]/80 pointer-events-none" />
    </div>
  );
};

export default PingPongVideoBackground;
