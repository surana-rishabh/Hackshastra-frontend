import * as React from 'react';
import { siteData } from '@/data/siteData';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const JoinPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-16 bg-[#FCF6D9]">
      <div className="mx-auto max-w-xl px-4 sm:px-6 text-center">
        <FadeUp>
          <Badge variant="cyan" dot className="mb-4">
            RECRUITMENT COHORT // 2026
          </Badge>

          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A]">
            {siteData.join.title}
          </h1>

          <p className="mt-4 text-base text-[#0F172A]/90 leading-relaxed font-body font-medium">
            {siteData.join.description}
          </p>

          <p className="mt-2 text-xs font-mono text-[#0F172A]/70 font-semibold">
            {siteData.join.subtext}
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="font-mono text-xs gap-1.5">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>BACK TO HOME</span>
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="primary" size="sm" className="font-mono text-xs">
                CONTACT CHAPTER
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-[#85b5cd] flex items-center justify-center gap-4">
            {siteData.socialsList.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#0F172A]/80 hover:text-[#CF4B00] transition-colors font-bold"
              >
                {s.platform.toUpperCase()}
              </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </div>
  );
};
