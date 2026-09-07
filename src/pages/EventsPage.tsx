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
    <div className="py-12 md:py-20 bg-[#FCF6D9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#CF4B00] font-bold mb-3">
            <span>HACKSHASTRA LINEUP</span>
            <span>•</span>
            <span>[ CALENDAR & ARCHIVE ]</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-[#0F172A]">
            All Events & Hackathons
          </h1>
          <p className="mt-4 text-base text-[#0F172A]/90 max-w-2xl font-medium">
            Explore our ecosystem of 36-hour hackathons, AI bootcamps, developer workshops, and technology expos.
          </p>
        </FadeUp>

        <div className="mt-16">
          <FadeUp>
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#CF4B00] font-black mb-6">
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
                      <span className="font-mono text-xs text-[#0F172A]/70 font-semibold">
                        SRM-AP CHAPTER
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-[#0F172A] hover:text-[#CF4B00] transition-colors">
                      {ev.title}
                    </h3>
                    <p className="font-mono text-xs text-[#CF4B00] mt-1 font-bold">
                      {ev.subtitle}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#85b5cd] flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1 font-mono text-xs text-[#0F172A]/80 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-[#CF4B00]" />
                        <span>Upcoming 2026</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-[#CF4B00]" />
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
                          <Button variant="primary" size="sm" className="font-mono text-xs">
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

        <div className="mt-20 pt-12 border-t border-[#85b5cd]">
          <FadeUp>
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#CF4B00] font-black mb-6">
              [ COMPLETED EVENTS & EXPOS ]
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {completedEvents.map((ev, i) => (
              <FadeUp key={ev.title} delay={i * 0.1}>
                <div className="rounded-[2px] border border-[#DDBA7D] bg-[#DDBA7D]/25 p-6 h-full flex flex-col justify-between hover:border-[#CF4B00] hover:shadow-sm transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="success">
                        <CheckCircle2 className="h-3 w-3 text-[#CF4B00] mr-1" />
                        COMPLETED
                      </Badge>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-[#0F172A]">
                      {ev.title}
                    </h3>
                    <p className="mt-3 text-xs text-[#0F172A]/80 leading-relaxed font-medium">
                      {ev.subtitle}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#DDBA7D]/50 flex items-center justify-between text-xs font-mono text-[#0F172A]/70 font-semibold">
                    <span>SRM University-AP</span>
                    <span className="text-xs font-bold text-[#CF4B00]">Concluded</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-[2px] border border-[#85b5cd] bg-[#9CC6DB] p-8 md:p-12 text-center shadow-sm">
          <FadeUp>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Want to Host or Partner on an Event?
            </h3>
            <p className="mt-3 text-sm text-[#0F172A]/80 max-w-xl mx-auto font-medium">
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
