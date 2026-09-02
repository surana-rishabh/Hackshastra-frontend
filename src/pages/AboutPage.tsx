import * as React from 'react';
import { siteData } from '@/data/siteData';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { Badge } from '@/components/ui/Badge';
import { Marquee } from '@/components/ui/Marquee';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import {
  Code,
  Rocket,
  Lightbulb,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  Building,
  GraduationCap
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const marqueeItems = [
    'BUILD',
    'LEARN',
    'INNOVATE',
    'HACK',
    'CREATE',
    'DISRUPT',
    'SHIP',
    'REPEAT'
  ];

  const stats = [
    { label: 'EVENTS HOSTED', value: '3+', description: 'From tech expos to blockchain workshops and national meetups.' },
    { label: 'ACTIVE MEMBERS', value: '50+', description: 'A growing community of builders, designers, and organizers.' },
    { label: 'DEPARTMENTS', value: '5+', description: 'Technical, Events, Design, Internal Affairs, and Social Media.' },
    { label: 'NATIONAL HACKATHON', value: '1', description: 'Our flagship 36-hour event uniting talent across India.' },
  ];

  const departmentIcons = [Rocket, Code, Lightbulb, Target, TrendingUp, Users];

  return (
    <div className="py-12 md:py-20 bg-[#FFFFFF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#0DA5F0] font-bold mb-3">
            <span>{siteData.about.heroTagline}</span>
            <span>•</span>
            <span>[ ORIGIN & VISION ]</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-[#090D12] max-w-4xl">
            {siteData.about.heroTitle}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#334155] max-w-3xl leading-relaxed">
            {siteData.about.heroDescription}
          </p>
        </FadeUp>

        <div className="mt-16 pt-8 border-t border-[#E2E8F0]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <div className="rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-xs hover:border-[#0DA5F0] transition-colors">
                  <span className="font-mono text-xs text-[#0DA5F0] font-bold block mb-2">
                    [ 0{i + 1} ]
                  </span>
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-[#090D12]">
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs uppercase text-[#0284C7] mt-1 font-bold">
                    {stat.label}
                  </div>
                  <p className="mt-3 text-xs text-[#64748B]">
                    {stat.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      <div className="my-16">
        <Marquee items={marqueeItems} speed={30} separator="•" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start py-8">
          <div className="lg:col-span-5">
            <FadeUp>
              <Badge variant="cyan" className="mb-3">{siteData.about.visionTagline}</Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#090D12]">
                {siteData.about.visionTitle}
              </h2>
              <p className="mt-4 text-sm text-[#64748B] leading-relaxed">
                {siteData.about.visionDescription}
              </p>
              <div className="mt-6 space-y-4 text-sm text-[#334155] leading-relaxed">
                {siteData.about.visionBullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-[#0DA5F0] shrink-0 mt-0.5" />
                    <p>{bullet}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-7">
            <FadeUp delay={0.2}>
              <h3 className="font-mono text-xs uppercase text-[#64748B] font-bold tracking-widest mb-6">
                [ ORGANIZATIONAL DEPARTMENTS ]
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {siteData.about.departments.map((dept, idx) => {
                  const Icon = departmentIcons[idx % departmentIcons.length];
                  return (
                    <div
                      key={dept.name}
                      className="rounded-[2px] border border-[#E2E8F0] bg-[#FFFFFF] p-4 hover:border-[#0DA5F0] hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <Icon className="h-4 w-4 text-[#0DA5F0]" />
                        <h4 className="font-heading text-sm font-bold text-[#090D12]">
                          {dept.name}
                        </h4>
                      </div>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        Dedicated departmental wing driving initiatives across the SRM-AP campus.
                      </p>
                    </div>
                  );
                })}
              </div>
            </FadeUp>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-[#E2E8F0]">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="font-mono text-xs text-[#0DA5F0] uppercase font-bold tracking-widest mb-2">
                [ STRATEGIC PARTNERSHIPS ]
              </div>
              <h2 className="font-heading text-3xl font-bold text-[#090D12]">
                Why HackShastra × SRM University-AP
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteData.about.partnerships.map((item, pIdx) => (
                <div key={pIdx} className="rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] p-5 shadow-xs">
                  <GraduationCap className="h-5 w-5 text-[#0DA5F0] mb-3" />
                  <h4 className="font-heading text-base font-bold text-[#090D12]">{item.title}</h4>
                  <p className="mt-2 text-xs text-[#64748B]">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h3 className="font-heading text-2xl font-bold text-[#090D12] mb-6">
                Together, We Break Barriers. Together, We Build Bold.
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/join">
                  <Button variant="primary" size="lg" className="font-mono text-xs">
                    JOIN THE CHAPTER
                  </Button>
                </Link>
                <Link to="/events">
                  <Button variant="secondary" size="lg" className="font-mono text-xs">
                    EXPLORE LINEUP
                  </Button>
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
};
