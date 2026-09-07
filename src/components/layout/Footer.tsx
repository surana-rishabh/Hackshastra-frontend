import * as React from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '@/data/siteData';
import { Marquee } from '@/components/ui/Marquee';
import { Mail, MapPin, ExternalLink, Linkedin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const marqueeItems = [
    'ARCHITECTING THE FUTURE OF ENGINEERING',
    'WHERE TRADITION MEETS TECHNOLOGY',
    'BREAKTHROUGHS HAPPEN',
    'SRM UNIVERSITY-AP CHAPTER',
  ];

  return (
    <footer className="relative border-t border-[#85b5cd] bg-[#9CC6DB] text-[#0F172A] pt-12 pb-16 overflow-hidden">
      <div className="mb-12">
        <Marquee items={marqueeItems} speed={30} separator="—" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#85b5cd]">
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.svg" alt="HackShastra Logo" className="h-7 w-7" />
                <span className="font-heading text-lg font-bold tracking-tight text-[#0F172A]">
                  {siteData.siteInfo.name}
                </span>
              </div>
              <p className="text-sm text-[#0F172A]/90 leading-relaxed max-w-md font-body font-medium">
                India's premier student technical and engineering chapter. Empowering builders, researchers, and innovators at SRM University-AP to construct the next era of technology.
              </p>
            </div>

            <div className="mt-8 font-mono text-xs text-[#0F172A]/80 font-semibold">
              <span>SRM UNIVERSITY-AP STUDENT CHAPTER</span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#CF4B00] font-black mb-4">
              [ DIRECTORY ]
            </h4>
            <ul className="space-y-2.5">
              {siteData.navigation.links.map((link, idx) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-mono text-xs text-[#0F172A]/90 hover:text-[#CF4B00] transition-colors inline-flex items-center gap-2 font-semibold"
                  >
                    <span className="text-[#0F172A]/60">0{idx + 1}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={siteData.navigation.joinHref}
                  className="font-mono text-xs text-[#0F172A] hover:text-[#CF4B00] hover:underline inline-flex items-center gap-2 font-bold"
                >
                  <span className="text-[#0F172A]/60">07</span>
                  <span>JOIN CHAPTER</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#CF4B00] font-black mb-4">
              [ HEADQUARTERS ]
            </h4>
            <div className="space-y-4 text-xs font-mono text-[#0F172A]">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#CF4B00] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#0F172A] font-bold">{siteData.siteInfo.university}</p>
                  <p className="text-[#0F172A]/80 text-[11px] mt-0.5 font-medium">Neerukonda, Mangalagiri Mandal, AP 522502</p>
                  <a
                    href="https://www.google.com/maps?q=16.462717,80.506813"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0F172A] hover:text-[#CF4B00] hover:underline inline-flex items-center gap-1 mt-1 text-[11px] font-bold"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#CF4B00] shrink-0" />
                <a
                  href={`mailto:${siteData.siteInfo.contactEmail}`}
                  className="hover:text-[#CF4B00] transition-colors font-semibold text-[#0F172A]"
                >
                  {siteData.siteInfo.contactEmail}
                </a>
              </div>

              <div className="pt-2 flex items-center gap-3">
                {siteData.socialsList.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`HackShastra on ${social.platform}`}
                    className="flex h-8 w-8 items-center justify-center rounded-[2px] border border-[#CF4B00] bg-[#CF4B00] text-[#FFFFFF] hover:bg-[#DDBA7D] hover:text-[#0F172A] hover:border-[#DDBA7D] transition-colors shadow-xs"
                  >
                    {social.platform === 'LinkedIn' && <Linkedin className="h-4 w-4" />}
                    {social.platform === 'Instagram' && <Instagram className="h-4 w-4" />}
                    {social.platform === 'Discord' && (
                      <span className="font-mono text-xs font-bold">DC</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#0F172A]/80 font-semibold">
          <p>© {new Date().getFullYear()} HackShastra SRM-AP Student Chapter. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-[#0F172A] font-bold">{siteData.siteCoordinates.display}</span>
            <span>•</span>
            <span>INDIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
