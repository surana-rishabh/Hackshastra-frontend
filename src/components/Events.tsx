import TechExpoCard from '@/components/TechExpoCard';
import siteData, { getImageUrl } from '@/data/siteData';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { FadeReveal, MaskReveal } from '@/components/ui/MotionPrimitives';
import { Link } from 'react-router-dom';

export default function EventsSection() {
  const upcomingEvents = siteData.events.upcoming;
  const completedEvents = siteData.events.completed;

  return (
    <div className="bg-white text-[#071014] py-20 md:py-32 border-t border-[#E2E8F0]">
      {/* ── Section Index Header ── */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-16">
          <span className="text-xs font-mono text-[#64748B] tracking-widest uppercase">03 / EVENTS & HACKATHONS</span>
          <span className="text-xs font-mono text-primary tracking-widest uppercase">[ INITIATIVES ]</span>
        </div>

        <div className="max-w-7xl mx-auto mb-16">
          <MaskReveal>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-7xl uppercase tracking-tight text-[#071014] mb-6">
              Our <span className="text-primary">Events & Hackathons</span>
            </h2>
          </MaskReveal>
          <p className="text-[#64748B] text-base sm:text-lg max-w-2xl font-body leading-relaxed">
            From 48-hour national hackathons to hands-on AI & Web3 workshops, explore our upcoming line-up and past student innovations.
          </p>
        </div>
      </section>

      <section className="px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">

          {/* UPCOMING EVENTS */}
          <div>
            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-[#E2E8F0]">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-heading font-bold text-xl sm:text-2xl uppercase tracking-wider text-[#071014]">
                Upcoming Events
              </h3>
            </div>

            <div className="grid gap-6">
              {upcomingEvents.map((evt, idx) => (
                <FadeReveal key={idx} delay={0.1 * idx}>
                  <div className="p-8 bg-[#F4F7F8] border border-[#E2E8F0] rounded-[2px] hover:border-primary transition-all group shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-[#E8F7FE] border border-primary/30 text-primary text-xs font-mono font-bold uppercase tracking-wider">
                            {(evt as any).announcement || "UPCOMING"}
                          </span>
                          <span className="text-xs text-[#64748B] font-mono uppercase tracking-widest">SRM UNIVERSITY-AP</span>
                        </div>
                        <h4 className="font-heading font-bold text-2xl text-[#071014] group-hover:text-primary transition-colors uppercase">
                          {evt.title}
                        </h4>
                        <p className="text-[#64748B] text-sm font-body leading-relaxed max-w-2xl">
                          {evt.subtitle}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <Link
                          to="/join"
                          className="inline-flex items-center gap-2 bg-primary text-white hover:bg-[#0877AF] px-6 py-3 rounded-[2px] font-heading font-bold text-xs tracking-wider uppercase transition-colors shadow-sm"
                        >
                          <span>STAY NOTIFIED</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeReveal>
              ))}
            </div>
          </div>

          {/* COMPLETED EVENTS & EXPO */}
          <div>
            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-[#E2E8F0]">
              <h3 className="font-heading font-bold text-xl sm:text-2xl uppercase tracking-wider text-[#64748B]">
                Completed Events & Expo
              </h3>
            </div>

            <div className="flex flex-col gap-8">
              {completedEvents.map((evt, idx) => (
                <TechExpoCard
                  key={idx}
                  title={evt.title}
                  subtitle={evt.subtitle}
                  image={getImageUrl(evt.image)}
                  completed={true}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}