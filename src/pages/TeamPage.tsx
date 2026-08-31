import React from 'react';
import { Linkedin, Github, Globe, Instagram } from 'lucide-react';
import { FadeReveal, MaskReveal } from '@/components/ui/MotionPrimitives';
import siteData, { getImageUrl } from '@/data/siteData';

interface MemberProps {
  name: string;
  role: string;
  specialty: string;
  image: string;
  year?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  instagram?: string;
}

const TeamMemberCard = React.memo(function TeamMemberCard({ member }: { member: MemberProps }) {
  const imageSrc = getImageUrl(member.image);

  return (
    <div className="flex flex-col bg-[#0c181f] border border-[#1e2e38] rounded-[2px] overflow-hidden hover:border-primary transition-colors group">
      <div className="h-64 w-full overflow-hidden relative">
        <img
          src={imageSrc}
          alt={member.name}
          className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c181f] via-transparent to-transparent opacity-80" />
      </div>
      
      <div className="p-5 flex flex-col gap-2">
        <h3 className="font-heading font-bold text-lg text-[#F4F7F8] uppercase tracking-wide group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <p className="text-xs font-mono text-primary uppercase tracking-wider">{member.role}</p>
        <p className="text-xs font-body text-[#A8B3BA]">{member.specialty}</p>

        {(member.linkedin || member.github || member.portfolio || member.instagram) && (
          <div className="flex gap-3 mt-3 pt-3 border-t border-[#1e2e38]">
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#A8B3BA] hover:text-primary transition-colors" aria-label={`${member.name} LinkedIn`}>
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {member.github && (
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-[#A8B3BA] hover:text-primary transition-colors" aria-label={`${member.name} GitHub`}>
                <Github className="w-4 h-4" />
              </a>
            )}
            {member.portfolio && (
              <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className="text-[#A8B3BA] hover:text-primary transition-colors" aria-label={`${member.name} Portfolio`}>
                <Globe className="w-4 h-4" />
              </a>
            )}
            {member.instagram && (
              <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-[#A8B3BA] hover:text-primary transition-colors" aria-label={`${member.name} Instagram`}>
                <Instagram className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default function TeamPage() {
  const teamData = siteData.team;

  return (
    <div className="bg-[#071014] text-[#F4F7F8] min-h-screen pt-24 pb-16">
      {/* ── Section Header ── */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-[#1e2e38] pb-4 mb-16">
          <span className="text-xs font-mono text-[#A8B3BA] tracking-widest uppercase">04 / TEAM DIRECTORY</span>
          <span className="text-xs font-mono text-primary tracking-widest uppercase">[ PEOPLE & LEADS ]</span>
        </div>

        <div className="max-w-7xl mx-auto mb-16">
          <MaskReveal>
            <h1 className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#F4F7F8] mb-6">
              The Minds Behind <span className="text-primary">{siteData.siteInfo.name}</span>
            </h1>
          </MaskReveal>
          <p className="text-[#A8B3BA] text-base sm:text-lg max-w-2xl font-body leading-relaxed">
            Our dedicated team of leaders, builders, and creators working together to cultivate a world-class technology community.
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      {teamData.leadership && teamData.leadership.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-[#1e2e38]">
              <h2 className="font-heading font-bold text-xl uppercase tracking-wider text-[#F4F7F8]">
                Community Board & Leads
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamData.leadership.map((member) => (
                <FadeReveal key={member.name} delay={0.1}>
                  <TeamMemberCard member={member} />
                </FadeReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technical Team Section */}
      {teamData.technicalTeam && teamData.technicalTeam.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-[#1e2e38]">
              <h2 className="font-heading font-bold text-xl uppercase tracking-wider text-[#A8B3BA]">
                Technical Team
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamData.technicalTeam.map((member) => (
                <FadeReveal key={member.name} delay={0.1}>
                  <TeamMemberCard member={member} />
                </FadeReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Design and Creative Team Section */}
      {teamData.designTeam && teamData.designTeam.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-[#1e2e38]">
              <h2 className="font-heading font-bold text-xl uppercase tracking-wider text-[#A8B3BA]">
                Design & Creative Team
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamData.designTeam.map((member) => (
                <FadeReveal key={member.name} delay={0.1}>
                  <TeamMemberCard member={member} />
                </FadeReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events and Management Team Section */}
      {teamData.eventsTeam && teamData.eventsTeam.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-[#1e2e38]">
              <h2 className="font-heading font-bold text-xl uppercase tracking-wider text-[#A8B3BA]">
                Events & Operations Team
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamData.eventsTeam.map((member) => (
                <FadeReveal key={member.name} delay={0.1}>
                  <TeamMemberCard member={member} />
                </FadeReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
