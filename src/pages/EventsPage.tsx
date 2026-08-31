import TechExpoCard from '@/components/TechExpoCard';
import siteData, { getImageUrl } from '@/data/siteData';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { FadeReveal, MaskReveal } from '@/components/ui/MotionPrimitives';
import { Link } from 'react-router-dom';

export default function EventsPage() {
  const upcomingEvents = siteData.events.upcoming;
  const completedEvents = siteData.events.completed;

  return (
    <div className="bg-[#071014] text-[#F4F7F8] min-h-screen pt-24 pb-16">
      {/* ── Section Header ── */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-[#1e2e38] pb-4 mb-16">
          <span className="text-xs font-mono text-[#A8B3BA] tracking-widest uppercase">03 / EVENTS DIRECTORY</span>
          <span className="text-xs font-mono text-primary tracking-widest uppercase">[ INITIATIVES ]</span>
        </div>

        <div className="max-w-7xl mx-auto mb-16">
          <MaskReveal>
            <h1 className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#F4F7F8] mb-6">
              All <span className="text-primary">Events & Hackathons</span>
            </h1>
          </MaskReveal>
          <p className="text-[#A8B3BA] text-base sm:text-lg max-w-2xl font-body leading-relaxed">
            Join us for exciting technology events, workshops, and competitions that bring together students, creators, and industry professionals.
          </p>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">

          {/* UPCOMING EVENTS */}
          <div>
            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-[#1e2e38]">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-bold text-xl sm:text-2xl uppercase tracking-wider text-[#F4F7F8]">
                Upcoming Events & Bootcamps
              </h2>
            </div>

            <div className="grid gap-6">
              {upcomingEvents.map((evt, idx) => (
                <FadeReveal key={idx} delay={0.1 * idx}>
                  <div className="p-8 bg-[#0c181f] border border-[#1e2e38] rounded-[2px] hover:border-primary transition-all group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-[#14222b] border border-[#1e2e38] text-primary text-xs font-mono font-bold uppercase tracking-wider">
                            {(evt as any).announcement || "UPCOMING"}
                          </span>
                          <span className="text-xs text-[#A8B3BA] font-mono uppercase tracking-widest">SRM UNIVERSITY-AP</span>
                        </div>
                        <h3 className="font-heading font-bold text-2xl text-[#F4F7F8] group-hover:text-primary transition-colors uppercase">
                          {evt.title}
                        </h3>
                        <p className="text-[#A8B3BA] text-sm font-body leading-relaxed max-w-2xl">
                          {evt.subtitle}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <Link
                          to="/join"
                          className="inline-flex items-center gap-2 bg-primary text-[#071014] hover:bg-[#8DD9FA] px-6 py-3 rounded-[2px] font-heading font-bold text-xs tracking-wider uppercase transition-colors"
                        >
                          <span>GET NOTIFIED</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeReveal>
              ))}
            </div>
          </div>

          {/* COMPLETED EVENTS */}
          <div>
            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-[#1e2e38]">
              <h2 className="font-heading font-bold text-xl sm:text-2xl uppercase tracking-wider text-[#A8B3BA]">
                Completed Events & Past Editions
              </h2>
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

      {/* PARTNER CALL-TO-ACTION */}
      <section className="py-16 px-6 bg-[#0c181f] border-t border-[#1e2e38] mt-16">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl uppercase tracking-tight text-[#F4F7F8]">
            Want to Host or Partner on an Event?
          </h2>
          <p className="text-[#A8B3BA] text-base font-body max-w-xl">
            We collaborate with technical clubs, creators, startups, and enterprise sponsors.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#14222b] border border-[#1e2e38] hover:border-primary text-[#F4F7F8] px-8 py-4 rounded-[2px] font-heading font-bold text-xs tracking-widest uppercase transition-colors"
          >
            <span>PARTNER WITH US</span>
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </Link>
        </div>
      </section>
    </div>
  );
}
