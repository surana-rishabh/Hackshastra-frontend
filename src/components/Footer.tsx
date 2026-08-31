import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import MarqueeText from "@/components/ui/MarqueeText";
import siteData from "@/data/siteData";
import { Link004 } from "@/components/ui/skiper-ui/skiper40";
import DotMatrixText from "@/components/ui/DotMatrixText";

const Footer = () => {
  const siteName = siteData.siteInfo.name;
  const socials = siteData.socialLinks;
  const email = siteData.siteInfo.contactEmail;
  const links = siteData.navigation.links;

  return (
    <>
      {/* ── Scrolling Marquee Quote Strip with Dot Matrix ── */}
      <div className="bg-[#071014] border-t border-[#35434B] py-6 sm:py-8 overflow-hidden flex flex-col gap-4">
        <MarqueeText
          items={[
            'WHERE TRADITION MEETS TECHNOLOGY',
            'BREAKTHROUGHS HAPPEN',
            'INDIA\'S FIRST CREATOR-LED TECH COMMUNITY',
          ]}
          speed={30}
          reverse
          className="text-[#0DA5F0] text-3xl sm:text-5xl md:text-7xl font-heading font-bold"
          separator="—"
        />
        <div className="flex justify-center py-2 bg-[#03415F]/20">
          <DotMatrixText text="HACKSHASTRA • LIVE HACKATHONS • BUILD THE FUTURE" dotSize={3} color="#8DD9FA" />
        </div>
      </div>

      {/* ── Main Footer ── */}
      <footer className="bg-white border-t border-[#E2E8F0]">
        {/* Navigation Row */}
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10 flex flex-wrap gap-4 sm:gap-8 border-b border-[#E2E8F0]">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-[#64748B] hover:text-primary transition-colors text-xs font-mono uppercase tracking-[0.2em]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to={siteData.navigation.joinHref}
            className="text-primary hover:text-[#0877AF] transition-colors text-xs font-mono uppercase tracking-[0.2em] font-bold"
          >
            {siteData.navigation.joinButtonText}
          </Link>
        </div>

        {/* ── 3-Column Contact Grid ── */}
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          
          {/* Column 1: OUR ADDRESS */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#64748B] text-[11px] font-mono uppercase tracking-[0.3em]">
              Our Address
            </h4>
            <div className="h-px w-16 bg-primary/60" />
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-[#071014] text-sm leading-relaxed font-body">
                SRM University-AP
                <br />
                Neerukonda, Mangalagiri
                <br />
                Andhra Pradesh 522502
              </p>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=16.462717,80.506813"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#64748B] hover:text-primary transition-colors text-xs font-mono tracking-wider uppercase group"
            >
              <span>[</span>Open in Maps<span>]</span>
              <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
            </a>
          </div>

          {/* Column 2: GET IN TOUCH */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#64748B] text-[11px] font-mono uppercase tracking-[0.3em]">
              Get In Touch
            </h4>
            <div className="h-px w-16 bg-primary/60" />
            <div className="flex flex-col gap-3">
              <Link004 href={`mailto:${email}`} className="text-[#071014] text-sm font-mono font-medium">
                {email}
              </Link004>
              <p className="text-[#64748B] text-sm font-mono">
                {siteData.siteInfo.contactPhone}
              </p>
            </div>
          </div>

          {/* Column 3: SOCIALS */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#64748B] text-[11px] font-mono uppercase tracking-[0.3em]">
              Socials
            </h4>
            <div className="h-px w-16 bg-primary/60" />
            <div className="flex flex-col gap-3">
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#071014] hover:text-primary transition-colors text-sm font-mono"
              >
                Instagram
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#071014] hover:text-primary transition-colors text-sm font-mono"
              >
                LinkedIn
              </a>
              <a
                href={socials.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#071014] hover:text-primary transition-colors text-sm font-mono"
              >
                Discord
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[#64748B] text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-center sm:text-left">
              &copy; {new Date().getFullYear()} {siteName}. All Rights Reserved.
            </p>
            <p className="text-[#94A3B8] text-[10px] font-mono tracking-widest">
              16.462717 / 80.506813
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
