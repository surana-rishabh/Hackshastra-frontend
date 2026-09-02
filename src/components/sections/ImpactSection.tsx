import * as React from 'react';
import { FadeUp } from '@/components/ui/MotionWrapper';

export const ImpactSection: React.FC = () => {
  const stats = [
    { number: '300K+', label: 'CREATOR REACH', detail: 'National audience across tech ecosystems' },
    { number: '2,600+', label: 'ACTIVE COMMUNITY', detail: 'Engineers, designers & innovators' },
    { number: '50+', label: 'CORE MEMBERS', detail: 'Dedicated SRM-AP chapter team' },
    { number: '5+', label: 'DEPARTMENTS', detail: 'Technical, Events, Design, Logistics, PR' },
    { number: '3+', label: 'EVENTS HOSTED', detail: 'Hackathons, expos & workshops' },
    { number: '1', label: 'NATIONAL HACKATHON', detail: 'Flagship 36-hr codefest' },
  ];

  return (
    <section className="relative border-b border-[#E2E8F0] bg-[#F8FAFC] py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#0DA5F0] font-bold mb-4">
            <span>04 / IMPACT & REACH</span>
            <span>•</span>
            <span>[ BY THE NUMBERS ]</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#090D12] mb-12">
            Measurable Community Momentum
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((item, index) => (
            <FadeUp key={item.label} delay={index * 0.08}>
              <div className="rounded-[2px] border border-[#E2E8F0] bg-[#FFFFFF] p-5 h-full flex flex-col justify-between hover:border-[#0DA5F0] hover:shadow-md transition-all">
                <div>
                  <span className="font-mono text-xs text-[#94A3B8] block mb-1">
                    [ 0{index + 1} ]
                  </span>
                  <span className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0DA5F0] block">
                    {item.number}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#090D12] mt-1 block">
                    {item.label}
                  </span>
                </div>
                <p className="mt-3 text-[11px] text-[#64748B] border-t border-[#E2E8F0] pt-2">
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
