import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MagneticButton } from "@/components/ui/MotionPrimitives";

const CTA = () => {
  return (
    <section id="join" className="py-24 px-6 bg-white text-[#071014] border-t border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
        <span className="text-xs font-mono text-primary tracking-widest uppercase bg-[#E8F7FE] border border-primary/30 px-3 py-1 rounded-[2px]">
          [ JOIN THE MOVEMENT ]
        </span>
        <h2 className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-[0.95] text-[#071014]">
          Ready to join the <span className="text-primary">technical avant-garde</span>?
        </h2>
        <p className="text-[#64748B] text-base sm:text-lg max-w-2xl font-body leading-relaxed">
          Become part of SRM University-AP's most prestigious student technical chapter. Master your craft with discipline, build real products, and shape the future.
        </p>
        <div className="mt-4">
          <MagneticButton>
            <Link
              to="/join"
              className="inline-flex items-center gap-3 bg-primary text-white hover:bg-[#0877AF] px-10 py-5 rounded-[2px] font-heading font-bold text-base tracking-wider uppercase transition-colors shadow-lg"
            >
              <span>JOIN HACKSHASTRA NOW</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default CTA;
