import * as React from 'react';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { TechBorderCard } from '@/components/ui/TechBorderCard';
import { Rocket, Users, Lightbulb, Target } from 'lucide-react';

export const MissionSection: React.FC = () => {
  const pillars = [
    {
      title: 'Creator-Led Movement',
      description: "India's first creator-led tech community with 300K+ reach and 2,600+ active members across universities.",
      icon: Rocket,
    },
    {
      title: 'Student Empowerment',
      description: 'A launchpad platform where students build, learn, lead, and grow together through peer collaboration.',
      icon: Users,
    },
    {
      title: 'Innovation First',
      description: 'From beginners to advanced developers, we create spaces for real-world problem solving and product launches.',
      icon: Lightbulb,
    },
    {
      title: 'Builder Culture',
      description: 'Ideas are shared without fear, teams built across departments, and careers launched directly from side-projects.',
      icon: Target,
    },
  ];

  return (
    <section className="relative border-b border-[#E2E8F0] bg-[#FFFFFF] py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#0DA5F0] font-bold mb-4">
            <span>03 / PILLARS OF EXCELLENCE</span>
            <span>•</span>
            <span>[ CORE INITIATIVES ]</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#090D12]">
            Building India's most accessible student-led tech ecosystem.
          </h2>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <FadeUp key={pillar.title} delay={index * 0.1}>
                <TechBorderCard className="h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] text-[#0DA5F0] group-hover:border-[#0DA5F0] group-hover:bg-[#0DA5F0]/10 transition-colors shadow-xs">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs text-[#94A3B8]">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-[#090D12] group-hover:text-[#0284C7] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#E2E8F0] flex items-center justify-between font-mono text-[11px] text-[#94A3B8]">
                    <span>PILLAR // HS-AP</span>
                    <span className="text-[#0DA5F0] font-semibold">ACTIVE</span>
                  </div>
                </TechBorderCard>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};
