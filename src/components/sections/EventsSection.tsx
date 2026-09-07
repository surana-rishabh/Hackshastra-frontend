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
    <section className="relative border-b border-[#85b5cd] bg-[#FCF6D9] py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <FadeUp>
            <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#CF4B00] font-bold mb-3">
              <span>04 / EVENTS & HACKATHONS</span>
              <span>•</span>
              <span>[ INITIATIVES ]</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A]">
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
                    <span className="font-mono text-xs text-[#0F172A]/70 font-semibold">
                      SRM-AP // 2026
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
                          <span>REGISTER NOW</span>
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

        {siteData.events.completed.length > 0 && (
          <div className="mt-12">
            <FadeUp>
              <div className="font-mono text-xs text-[#CF4B00] uppercase tracking-wider mb-4 font-black">
                [ COMPLETED FLAGSHIP SHOWCASE ]
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {siteData.events.completed.map((ev) => (
                  <div
                    key={ev.title}
                    className="rounded-[2px] border border-[#DDBA7D] bg-[#DDBA7D]/25 p-5 flex flex-col justify-between hover:border-[#CF4B00] hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="success">
                          <CheckCircle2 className="h-3 w-3 text-[#CF4B00] mr-1" />
                          COMPLETED
                        </Badge>
                      </div>
                      <h4 className="font-heading text-lg font-bold text-[#0F172A]">
                        {ev.title}
                      </h4>
                      <p className="mt-2 text-xs text-[#0F172A]/80 leading-relaxed font-medium">
                        {ev.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#DDBA7D]/50 flex items-center justify-between text-xs font-mono text-[#0F172A]/70 font-semibold">
                      <span>SRM University-AP</span>
                      <span className="text-xs font-bold text-[#CF4B00]">Concluded</span>
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
