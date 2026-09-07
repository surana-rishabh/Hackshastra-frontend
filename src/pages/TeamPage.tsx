import * as React from 'react';
import { siteData } from '@/data/siteData';
import { useTeam } from '@/hooks/useTeam';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { TeamCard } from '@/components/ui/TeamCard';
import { Radio } from 'lucide-react';

export const TeamPage: React.FC = () => {
  const { teamSections, isLive } = useTeam();

  return (
    <div className="py-12 md:py-20 bg-[#FCF6D9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#CF4B00] font-bold mb-3">
            <span>HACKSHASTRA SRM-AP</span>
            <span>•</span>
            <span>[ COMMUNITY DIRECTORY ]</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-[#0F172A]">
            Meet the Builders & Leaders
          </h1>
          <p className="mt-4 text-base text-[#0F172A]/90 max-w-2xl font-medium">
            The passionate team of engineers, researchers, designers, and organizers powering the HackShastra student chapter at SRM University-AP.
          </p>
        </FadeUp>

        <div className="mt-16 space-y-20">
          {teamSections.map((sec) => {
            if (!sec.data || sec.data.length === 0) return null;
            return (
              <div key={sec.title} className="pt-8 border-t border-[#85b5cd]">
                <FadeUp>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0F172A]">
                      {sec.title}
                    </h2>
                    <span className="font-mono text-xs text-[#CF4B00] font-black">
                      [ {sec.data.length} {sec.data.length === 1 ? 'MEMBER' : 'MEMBERS'} ]
                    </span>
                  </div>
                </FadeUp>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sec.data.map((member: any, mIdx: number) => (
                    <FadeUp key={member.name} delay={mIdx * 0.05}>
                      <TeamCard
                        name={member.name}
                        role={member.role}
                        department={member.specialty || sec.dept}
                        year={'year' in member ? member.year : undefined}
                        image={member.image}
                        linkedin={'linkedin' in member ? member.linkedin : undefined}
                        github={'github' in member ? member.github : undefined}
                        instagram={'instagram' in member ? member.instagram : undefined}
                      />
                    </FadeUp>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
