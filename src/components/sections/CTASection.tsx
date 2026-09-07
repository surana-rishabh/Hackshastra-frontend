import * as React from 'react';
import { Link } from 'react-router-dom';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="relative border-b border-[#85b5cd] bg-[#FCF6D9] py-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <FadeUp>
          <div className="font-mono text-xs uppercase tracking-widest text-[#CF4B00] font-bold mb-3">
            05 / JOIN THE MOVEMENT
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] max-w-3xl mx-auto">
            Ready to join the technical avant-garde?
          </h2>
          <p className="mt-4 text-base text-[#0F172A]/90 max-w-2xl mx-auto font-body font-medium">
            Become part of SRM University-AP's premier student technical chapter. Build real-world products, collaborate on hackathons, and shape the future of tech.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/join">
              <Button variant="primary" size="lg" className="font-mono text-xs tracking-wider gap-2">
                <span>JOIN HACKSHASTRA NOW</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="lg" className="font-mono text-xs tracking-wider">
                <span>CONTACT US</span>
              </Button>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
