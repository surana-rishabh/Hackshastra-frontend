import { Users, TrendingUp, Rocket, Code, Lightbulb, Target, Zap, ArrowUpRight } from 'lucide-react';
import { FadeReveal, MaskReveal } from '@/components/ui/MotionPrimitives';
import siteData from '@/data/siteData';
import { Link } from 'react-router-dom';

const iconMap: Record<string, any> = {
  Rocket,
  Code,
  Lightbulb,
  Target,
  TrendingUp,
  Users
};

const stats = [
  {
    index: '01',
    number: '3+',
    title: 'EVENTS HOSTED',
    description: 'From tech expos to blockchain workshops, we curate hands-on experiences that push boundaries.',
  },
  {
    index: '02',
    number: '50+',
    title: 'ACTIVE MEMBERS',
    description: 'A growing community of builders, designers, and innovators across all departments.',
  },
  {
    index: '03',
    number: '5+',
    title: 'DEPARTMENTS',
    description: 'Technical, Events, Design, Internal Affairs, and Social Media — working as one cohesive team.',
  },
  {
    index: '04',
    number: '1',
    title: 'NATIONAL HACKATHON',
    description: 'Our flagship event bringing together students from across the country to build, compete, and innovate.',
  },
];

export default function AboutPage() {
  const aboutData = siteData.about;

  return (
    <div className="bg-[#071014] text-[#F4F7F8] min-h-screen pt-24 pb-16">
      {/* ── Section Header ── */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-[#1e2e38] pb-4 mb-16">
          <span className="text-xs font-mono text-[#A8B3BA] tracking-widest uppercase">02 / ABOUT HACKSHASTRA</span>
          <span className="text-xs font-mono text-primary tracking-widest uppercase">[ MANIFESTO & STATS ]</span>
        </div>

        <div className="max-w-7xl mx-auto mb-16">
          <MaskReveal>
            <h1 className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#F4F7F8] mb-6">
              {aboutData.heroTitle}
            </h1>
          </MaskReveal>
          <p className="text-[#A8B3BA] text-base sm:text-lg max-w-2xl font-body leading-relaxed">
            {aboutData.heroDescription}
          </p>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-16 px-6 bg-[#0c181f] border-y border-[#1e2e38]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <FadeReveal key={stat.index} delay={0.1}>
                <div className="flex flex-col gap-3 p-6 bg-[#071014] border border-[#1e2e38] rounded-[2px] hover:border-primary transition-colors">
                  <span className="font-mono text-xs text-primary tracking-widest">
                    [ {stat.index} ]
                  </span>
                  <h3 className="font-heading font-bold text-3xl md:text-4xl text-[#F4F7F8] uppercase">
                    {stat.number} <span className="text-sm block text-primary font-mono mt-1">{stat.title}</span>
                  </h3>
                  <p className="text-[#A8B3BA] text-xs font-body leading-relaxed mt-2">
                    {stat.description}
                  </p>
                </div>
              </FadeReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Department Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-6 flex flex-col gap-6">
              <span className="text-xs font-mono text-primary tracking-widest uppercase">[ VISION ]</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl uppercase tracking-tight text-[#F4F7F8]">
                {aboutData.visionTitle}
              </h2>
              <p className="text-[#A8B3BA] text-base font-body leading-relaxed">
                {aboutData.visionDescription}
              </p>
              <div className="space-y-3 mt-2">
                {aboutData.visionBullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Zap className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <p className="text-[#F4F7F8] text-sm font-body">{bullet}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-6 grid grid-cols-2 gap-4">
              {aboutData.departments.map((dept, index) => {
                const IconComponent = iconMap[dept.icon] || Code;
                return (
                  <div key={index} className="p-6 bg-[#0c181f] border border-[#1e2e38] rounded-[2px] flex flex-col items-start gap-3 hover:border-primary transition-colors">
                    <IconComponent className="h-6 w-6 text-primary" />
                    <p className="font-heading font-bold text-sm text-[#F4F7F8] uppercase tracking-wide">{dept.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#0c181f] border-t border-[#1e2e38]">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="font-heading font-bold text-3xl sm:text-5xl uppercase tracking-tight text-[#F4F7F8] leading-tight">
            Together, We Break Barriers.
            <br />
            <span className="text-primary">Together, We Build Bold.</span>
          </h2>
          <p className="text-[#A8B3BA] text-base font-body max-w-xl">
            Let's make {siteData.siteInfo.university} the home of India's next big innovation wave.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link
              to="/join"
              className="inline-flex items-center gap-2 bg-primary text-[#071014] hover:bg-[#8DD9FA] px-8 py-4 rounded-[2px] font-heading font-bold text-xs tracking-wider uppercase transition-colors"
            >
              <span>JOIN HACKSHASTRA</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

