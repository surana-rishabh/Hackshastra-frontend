import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, Users, Lightbulb, Target, Sparkles, ChevronRight } from 'lucide-react';
import DotMatrixText from '@/components/ui/DotMatrixText';

const storyStages = [
  {
    step: "01",
    tag: "THE VISION",
    title: "CREATOR-LED REVOLUTION",
    subtitle: "300K+ Organic Reach across India",
    description: "Founded by Uday Sharma, HackShastra was born out of a desire to eliminate barriers in tech education and replace passive lectures with raw, hands-on hacker energy.",
    icon: Rocket,
    highlight: "#0DA5F0"
  },
  {
    step: "02",
    tag: "OUR LAUNCHPAD",
    title: "STUDENT EMPOWERMENT",
    subtitle: "SRM University-AP Chapter",
    description: "A student-first ecosystem where coders, designers, and innovators come together to turn side projects into launch-ready startups.",
    icon: Users,
    highlight: "#8DD9FA"
  },
  {
    step: "03",
    tag: "THE CULTURE",
    title: "BUILD & SHIP IN PUBLIC",
    subtitle: "2,600+ Active Builders",
    description: "Ideas are tested without fear. Hackathons, workshops, and late-night sprint sessions empower members to build real-world products.",
    icon: Lightbulb,
    highlight: "#0DA5F0"
  },
  {
    step: "04",
    tag: "THE FUTURE",
    title: "THE NEXT FRONTIER",
    subtitle: "AI, Web3 & DeepTech",
    description: "Equipping student developers with modern stacks, direct mentorship, and access to top national hackathons and industry partners.",
    icon: Target,
    highlight: "#8DD9FA"
  }
];

export const Mission = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#071014] text-white">
      {/* Sticky Pinned Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden py-10">
        
        {/* Top Header */}
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between border-b border-[#35434B] pb-4 z-20">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-primary animate-spin" />
            <span className="text-xs font-mono text-[#A8B3BA] tracking-widest uppercase">02 / PINNED STORYTELLING STAGE</span>
          </div>
          <DotMatrixText text="MANIFESTO • MISSION 2026" dotSize={2} color="#0DA5F0" />
        </div>

        {/* Horizontal Motion Stage (`consider.digital` pattern) */}
        <div className="flex-1 flex items-center relative z-10 overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 px-6 md:px-24">
            {storyStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="w-[85vw] sm:w-[500px] md:w-[600px] shrink-0 bg-[#071014]/90 border border-[#35434B] p-8 md:p-12 rounded-[4px] relative group hover:border-primary transition-all duration-500 shadow-2xl flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between border-b border-[#35434B] pb-6">
                    <span className="text-4xl font-mono font-bold text-primary">{stage.step}</span>
                    <div className="px-3 py-1 bg-[#03415F]/40 border border-primary/30 text-xs font-mono tracking-widest text-[#8DD9FA] uppercase rounded-[2px]">
                      {stage.tag}
                    </div>
                  </div>

                  <div className="my-8 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <Icon className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
                      <span className="text-xs font-mono tracking-wider text-[#A8B3BA] uppercase">{stage.subtitle}</span>
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-heading font-bold uppercase tracking-tight text-white group-hover:text-primary transition-colors">
                      {stage.title}
                    </h3>
                    <p className="text-[#A8B3BA] text-sm sm:text-base font-body leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-[#35434B] text-xs font-mono text-[#A8B3BA]">
                    <span>STAGE {idx + 1} OF 4</span>
                    <span className="flex items-center gap-1 text-primary group-hover:translate-x-1 transition-transform">
                      KEEP SCROLLING <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Pinned Scroll Progress Indicator */}
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between text-xs font-mono text-[#A8B3BA] tracking-widest uppercase z-20">
          <span>SCROLL TO UNFOLD STORY</span>
          <div className="w-48 h-1 bg-[#35434B] rounded-full overflow-hidden">
            <motion.div style={{ scaleX: scrollYProgress, originX: 0 }} className="h-full bg-primary" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Mission;
