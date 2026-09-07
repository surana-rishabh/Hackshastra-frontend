import * as React from 'react';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { TechBorderCard } from '@/components/ui/TechBorderCard';
import { Rocket, Users, Lightbulb, Target } from 'lucide-react';

export const MissionSection: React.FC = () => {
  const pillars = [
    {
      title: 'Builder-First Innovation',
      description: 'A thriving national student technology chapter with 300K+ reach and 2,600+ active members across universities.',
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
    <section className="relative border-b border-[#85b5cd] bg-[#FCF6D9] py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#CF4B00] font-bold mb-4">
            <span>03 / PILLARS OF EXCELLENCE</span>
            <span>•</span>
            <span>[ CORE INITIATIVES ]</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A]">
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
                      <div className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#85b5cd] bg-[#FCF6D9] text-[#CF4B00] group-hover:border-[#CF4B00] group-hover:bg-[#CF4B00] group-hover:text-[#FFFFFF] transition-colors shadow-xs">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs text-[#0F172A]/60 font-semibold">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-[#0F172A] group-hover:text-[#CF4B00] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#0F172A]/80 leading-relaxed font-medium">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#85b5cd] flex items-center justify-between font-mono text-[11px] text-[#0F172A]/70 font-semibold">
                    <span>PILLAR // HS-AP</span>
                    <span className="text-[#CF4B00] font-bold">ACTIVE</span>
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
