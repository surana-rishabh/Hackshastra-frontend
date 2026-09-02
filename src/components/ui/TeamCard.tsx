import * as React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Linkedin, Github, Instagram } from 'lucide-react';
import { getImageUrl } from '@/lib/assets';
import { Badge } from '@/components/ui/Badge';

export interface TeamCardProps {
  name: string;
  role: string;
  department: string;
  year?: string;
  image?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

export const TeamCard: React.FC<TeamCardProps> = React.memo(({
  name,
  role,
  department,
  year,
  image,
  linkedin,
  github,
  instagram,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 180 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 180 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const resolvedImage = getImageUrl(image);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative h-full rounded-[2px] border border-[#E2E8F0] bg-[#FFFFFF] p-4 transition-all duration-300 hover:border-[#0DA5F0] hover:shadow-[0_8px_30px_rgba(13,165,240,0.12)] flex flex-col justify-between shadow-sm"
    >
      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-[2px] bg-[#F8FAFC] border border-[#E2E8F0] mb-4">
          <img
            src={resolvedImage}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 team-member-img"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/logo.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090D12]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {year && (
            <div className="absolute top-2 right-2">
              <Badge variant="muted" className="text-[10px] bg-[#FFFFFF]/90 backdrop-blur-sm">
                {year}
              </Badge>
            </div>
          )}
        </div>

        <h3 className="font-heading text-lg font-bold text-[#090D12] group-hover:text-[#0284C7] transition-colors leading-tight">
          {name}
        </h3>
        <p className="font-mono text-xs text-[#0DA5F0] uppercase tracking-wider mt-1 font-semibold">
          {role}
        </p>
        <p className="text-xs text-[#64748B] mt-0.5">
          {department}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center gap-3">
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} LinkedIn`}
            className="text-[#64748B] hover:text-[#0DA5F0] transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} GitHub`}
            className="text-[#64748B] hover:text-[#0DA5F0] transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} Instagram`}
            className="text-[#64748B] hover:text-[#0DA5F0] transition-colors"
          >
            <Instagram className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
});
TeamCard.displayName = 'TeamCard';
