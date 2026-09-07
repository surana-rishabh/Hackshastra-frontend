import * as React from 'react';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { FlipClockCounter } from '@/components/ui/FlipClockCounter';

export const ImpactSection: React.FC = () => {
  const stats = [
    { number: '300K+', label: 'CREATOR REACH', detail: 'National audience across tech ecosystems' },
    { number: '2,600+', label: 'ACTIVE COMMUNITY', detail: 'Engineers, designers & innovators' },
    { number: '50+', label: 'CORE MEMBERS', detail: 'Dedicated SRM-AP chapter team' },
    { number: '5+', label: 'DEPARTMENTS', detail: 'Technical, Events, Design, Logistics, PR' },
    { number: '3+', label: 'EVENTS HOSTED', detail: 'Hackathons, expos & workshops', syncWithDb: true },
    { number: '1', label: 'NATIONAL HACKATHON', detail: 'Flagship 36-hr codefest' },
  ];

  return (
    <section className="relative border-b border-[#85b5cd] bg-[#FCF6D9] py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#CF4B00] font-bold mb-4">
            <span>03 / IMPACT & REACH</span>
            <span>•</span>
            <span>[ BY THE NUMBERS ]</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">
            Measurable Community Momentum
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((item, index) => (
            <FadeUp key={item.label} delay={index * 0.08}>
              <div className="rounded-[2px] border border-[#85b5cd] bg-[#9CC6DB] p-5 h-full flex flex-col justify-between hover:border-[#CF4B00] hover:shadow-md transition-all">
                <div>
                  <span className="font-mono text-xs text-[#0F172A]/70 font-semibold block mb-1">
                    [ 0{index + 1} ]
                  </span>
                  <span className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#CF4B00] block">
                    <FlipClockCounter value={item.number} syncWithDbEvents={item.syncWithDb} />
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0F172A] mt-1 block">
                    {item.label}
                  </span>
                </div>
                <p className="mt-3 text-[11px] text-[#0F172A]/80 border-t border-[#85b5cd] pt-2 font-medium">
                  {item.detail}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};
