import * as React from 'react';
import { siteData } from '@/data/siteData';
import { useEvents } from '@/hooks/useEvents';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TechBorderCard } from '@/components/ui/TechBorderCard';
import { Calendar, MapPin, ArrowUpRight, CheckCircle2, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EventsPage: React.FC = () => {
  const { upcomingEvents, completedEvents, isLive } = useEvents();

  return (
    <div className="py-12 md:py-20 bg-[#FFFFFF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#0DA5F0] font-bold mb-3">
            <span>HACKSHASTRA LINEUP</span>
            <span>•</span>
            <span>[ CALENDAR & ARCHIVE ]</span>
            {isLive && (
              <span className="ml-2 inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                <Radio className="h-3 w-3 animate-pulse" /> LIVE SYNC
              </span>
            )}
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-[#090D12]">
            All Events & Hackathons
          </h1>
          <p className="mt-4 text-base text-[#334155] max-w-2xl">
            Explore our ecosystem of 36-hour hackathons, AI bootcamps, developer workshops, and technology expos.
          </p>
        </FadeUp>

        <div className="mt-16">
          <FadeUp>
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#0DA5F0] font-bold mb-6">
              [ UPCOMING EVENTS — 2026 ]
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map((ev, i) => (
              <FadeUp key={ev.title} delay={i * 0.15}>
                <TechBorderCard active={i === 0} className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="cyan" dot>
                        {ev.announcement}
                      </Badge>
                      <span className="font-mono text-xs text-[#94A3B8]">
                        SRM-AP CHAPTER
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

                    {ev.registerUrl ? (
                      ev.registerUrl.startsWith('http') ? (
                        <a href={ev.registerUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" size="sm" className="font-mono text-xs">
                            <span>REGISTER NOW</span>
                            <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </a>
                      ) : (
                        <Link to={ev.registerUrl}>
                          <Button variant="primary" size="sm" className="font-mono text-xs bg-[#0DA5F0] hover:bg-[#0284C7] shadow-sm">
                            <span>REGISTER DECK</span>
                            <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </Link>
                      )
                    ) : (
                      <Link to="/join">
                        <Button variant="primary" size="sm" className="font-mono text-xs">
                          <span>GET NOTIFIED</span>
                          <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </TechBorderCard>
              </FadeUp>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-[#E2E8F0]">
          <FadeUp>
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#64748B] font-bold mb-6">
              [ COMPLETED EVENTS & EXPOS ]
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {completedEvents.map((ev, i) => (
              <FadeUp key={ev.title} delay={i * 0.1}>
                <div className="rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] p-6 h-full flex flex-col justify-between hover:border-[#0DA5F0] hover:shadow-sm transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="muted">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600 mr-1" />
                        COMPLETED
                      </Badge>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-[#090D12]">
                      {ev.title}
                    </h3>
                    <p className="mt-3 text-xs text-[#64748B] leading-relaxed">
                      {ev.subtitle}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                    <span>SRM University-AP</span>
                    <span className="text-xs font-medium text-emerald-600">Concluded</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] p-8 md:p-12 text-center">
          <FadeUp>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#090D12]">
              Want to Host or Partner on an Event?
            </h3>
            <p className="mt-3 text-sm text-[#64748B] max-w-xl mx-auto">
              We collaborate with student technical clubs, creator communities, and enterprise partners.
            </p>
            <div className="mt-6">
              <Link to="/contact">
                <Button variant="primary" size="lg" className="font-mono text-xs">
                  PARTNER WITH US
                </Button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
};
