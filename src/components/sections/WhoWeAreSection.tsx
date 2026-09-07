import * as React from 'react';
import { siteData } from '@/data/siteData';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { Code2, Sparkles, Terminal } from 'lucide-react';

export const WhoWeAreSection: React.FC = () => {
  return (
    <section className="relative border-b border-[#85b5cd] bg-[#FCF6D9] py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#CF4B00] font-bold mb-4">
            <span>02 / WHO WE ARE</span>
            <span>•</span>
            <span>[ THE MANIFESTO ]</span>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <FadeUp delay={0.1}>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight">
                {siteData.about.visionTitle}
              </h2>
            </FadeUp>
          </div>

          <div className="lg:col-span-7 space-y-6 text-[#0F172A]/90 leading-relaxed text-base sm:text-lg">
            <FadeUp delay={0.2}>
              <p>
                {siteData.about.heroDescription}
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-sm sm:text-base text-[#0F172A]/80 font-medium">
                {siteData.about.visionDescription}
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-3.5 border border-[#85b5cd] bg-[#9CC6DB] rounded-[2px] shadow-xs">
                  <Code2 className="h-4 w-4 text-[#CF4B00] mb-2" />
                  <span className="text-[#0F172A] font-bold block">BUILD FIRST</span>
                  <span className="text-[#0F172A]/70 text-[11px] font-medium">Real product engineering</span>
                </div>
                <div className="p-3.5 border border-[#85b5cd] bg-[#9CC6DB] rounded-[2px] shadow-xs">
                  <Sparkles className="h-4 w-4 text-[#CF4B00] mb-2" />
                  <span className="text-[#0F172A] font-bold block">CREATOR LED</span>
                  <span className="text-[#0F172A]/70 text-[11px] font-medium">300K+ national reach</span>
                </div>
                <div className="p-3.5 border border-[#85b5cd] bg-[#9CC6DB] rounded-[2px] shadow-xs">
                  <Terminal className="h-4 w-4 text-[#CF4B00] mb-2" />
                  <span className="text-[#0F172A] font-bold block">OPEN ACCESS</span>
                  <span className="text-[#0F172A]/70 text-[11px] font-medium">No barriers to entry</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};
