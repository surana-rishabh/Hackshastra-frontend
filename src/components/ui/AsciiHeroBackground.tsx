import React, { useEffect, useRef } from 'react';

interface AsciiHeroBackgroundProps {
  className?: string;
  color?: string;
  densityChars?: string;
  cellSize?: number;
}

export const AsciiHeroBackground: React.FC<AsciiHeroBackgroundProps> = ({
  className = '',
  color = '#1789E5',
  densityChars = ' .:-=+*#%@',
  cellSize = 16,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let mouseX = -1000;
    let mouseY = -1000;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(container);
    updateSize();

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;
    const chars = densityChars.split('');
    const charCount = chars.length;

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellSize + cellSize / 2;
          const y = r * cellSize + cellSize / 2;

          // Wave equation for dynamic ASCII density
          const distToMouse = Math.hypot(x - mouseX, y - mouseY);
          const mouseEffect = Math.max(0, 1 - distToMouse / 180) * 1.5;

          const n1 = Math.sin(c * 0.12 + time * 0.8);
          const n2 = Math.cos(r * 0.12 + time * 0.6);
          const n3 = Math.sin((c + r) * 0.08 + time);
          
          let val = (n1 + n2 + n3 + 3) / 6; // Range [0, 1]
          val = Math.min(1, Math.max(0, val + mouseEffect * 0.3));

          const charIndex = Math.floor(val * (charCount - 1));
          const char = chars[charIndex];

          if (char && char !== ' ') {
            const alpha = 0.08 + val * 0.35 + mouseEffect * 0.4;
            ctx.fillStyle = color;
            ctx.globalAlpha = alpha;
            ctx.fillText(char, x, y);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [color, densityChars, cellSize]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-auto overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
};
