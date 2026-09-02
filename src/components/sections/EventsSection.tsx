import * as React from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '@/data/siteData';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { TechBorderCard } from '@/components/ui/TechBorderCard';
import { Calendar, MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const EventsSection: React.FC = () => {
  return (
    <section className="relative border-b border-[#E2E8F0] bg-[#FFFFFF] py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <FadeUp>
            <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#0DA5F0] font-bold mb-3">
              <span>05 / EVENTS & HACKATHONS</span>
              <span>•</span>
              <span>[ INITIATIVES ]</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#090D12]">
              Our Events & Hackathons
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <Link to="/events">
              <Button variant="outline" size="sm" className="font-mono text-xs gap-1.5">
                <span>VIEW FULL LINEUP</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {siteData.events.upcoming.map((ev, idx) => (
            <FadeUp key={ev.title} delay={idx * 0.15}>
              <TechBorderCard active={idx === 0} className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="cyan" dot>
                      {ev.announcement}
                    </Badge>
                    <span className="font-mono text-xs text-[#94A3B8]">
                      SRM-AP // 2026
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-[#090D12] hover:text-[#0284C7] transition-colors">
                    {ev.title}
                  </h3>
                  <p className="font-mono text-xs text-[#0DA5F0] mt-1 font-semibold">
                    {ev.subtitle}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1 font-mono text-xs text-[#64748B]">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-[#0DA5F0]" />
                      <span>Upcoming 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-[#0DA5F0]" />
                      <span>SRM University-AP</span>
                    </div>
                  </div>

                  <Link to="/join">
                    <Button variant="primary" size="sm" className="font-mono text-xs">
                      <span>GET NOTIFIED</span>
                      <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </TechBorderCard>
            </FadeUp>
          ))}
        </div>

        {siteData.events.completed.length > 0 && (
          <div className="mt-12">
            <FadeUp>
              <div className="font-mono text-xs text-[#64748B] uppercase tracking-wider mb-4 font-bold">
                [ COMPLETED FLAGSHIP SHOWCASE ]
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {siteData.events.completed.map((ev) => (
                  <div
                    key={ev.title}
                    className="rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] p-5 flex flex-col justify-between hover:border-[#0DA5F0] hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="muted">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600 mr-1" />
                          COMPLETED
                        </Badge>
                      </div>
                      <h4 className="font-heading text-lg font-bold text-[#090D12]">
                        {ev.title}
                      </h4>
                      <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                        {ev.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                      <span>SRM University-AP</span>
                      {ev.registerUrl && (
                        <a
                          href={ev.registerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0DA5F0] hover:underline flex items-center gap-1 font-semibold"
                        >
                          <span>Unstop</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        )}
      </div>
    </section>
  );
};
