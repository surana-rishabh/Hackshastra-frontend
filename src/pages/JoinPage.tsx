import * as React from 'react';
import { siteData } from '@/data/siteData';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const JoinPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-16 bg-[#FFFFFF]">
      <div className="mx-auto max-w-xl px-4 sm:px-6 text-center">
        <FadeUp>
          <Badge variant="cyan" dot className="mb-4">
            RECRUITMENT COHORT // 2026
          </Badge>

          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#090D12]">
            {siteData.join.title}
          </h1>

          <p className="mt-4 text-base text-[#334155] leading-relaxed font-body">
            {siteData.join.description}
          </p>

          <p className="mt-2 text-xs font-mono text-[#64748B]">
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

          <div className="mt-12 pt-8 border-t border-[#E2E8F0] flex items-center justify-center gap-4">
            {siteData.socialsList.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#64748B] hover:text-[#0DA5F0] transition-colors font-medium"
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
