import * as React from 'react';
import { siteData } from '@/data/siteData';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { Code2, Sparkles, Terminal } from 'lucide-react';

export const WhoWeAreSection: React.FC = () => {
  return (
    <section className="relative border-b border-[#E2E8F0] bg-[#F8FAFC] py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#0DA5F0] font-bold mb-4">
            <span>02 / WHO WE ARE</span>
            <span>•</span>
            <span>[ THE MANIFESTO ]</span>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <FadeUp delay={0.1}>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#090D12] leading-tight">
                {siteData.about.visionTitle}
              </h2>
            </FadeUp>
          </div>

          <div className="lg:col-span-7 space-y-6 text-[#334155] leading-relaxed text-base sm:text-lg">
            <FadeUp delay={0.2}>
              <p>
                {siteData.about.heroDescription}
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-sm sm:text-base text-[#64748B]">
                {siteData.about.visionDescription}
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-3.5 border border-[#E2E8F0] bg-[#FFFFFF] rounded-[2px] shadow-xs">
                  <Code2 className="h-4 w-4 text-[#0DA5F0] mb-2" />
                  <span className="text-[#090D12] font-bold block">BUILD FIRST</span>
                  <span className="text-[#64748B] text-[11px]">Real product engineering</span>
                </div>
                <div className="p-3.5 border border-[#E2E8F0] bg-[#FFFFFF] rounded-[2px] shadow-xs">
                  <Sparkles className="h-4 w-4 text-[#0284C7] mb-2" />
                  <span className="text-[#090D12] font-bold block">CREATOR LED</span>
                  <span className="text-[#64748B] text-[11px]">300K+ national reach</span>
                </div>
                <div className="p-3.5 border border-[#E2E8F0] bg-[#FFFFFF] rounded-[2px] shadow-xs">
                  <Terminal className="h-4 w-4 text-[#1D4ED8] mb-2" />
                  <span className="text-[#090D12] font-bold block">OPEN ACCESS</span>
                  <span className="text-[#64748B] text-[11px]">No barriers to entry</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};
