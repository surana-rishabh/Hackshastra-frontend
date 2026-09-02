import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Menu, X, ArrowUpRight } from 'lucide-react';
import { siteData } from '@/data/siteData';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#E2E8F0] bg-[#FFFFFF]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {!isHome && (
            <button
              onClick={handleBack}
              aria-label="Go back"
              className="flex items-center gap-1.5 rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-xs font-mono text-[#475569] hover:border-[#0DA5F0] hover:text-[#0DA5F0] transition-colors cursor-pointer shadow-xs"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>BACK</span>
            </button>
          )}

          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.svg"
              alt="HackShastra Logo"
              className="h-7 w-7 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-heading text-sm font-bold tracking-tight text-[#090D12] group-hover:text-[#0284C7] transition-colors">
                {siteData.siteInfo.name}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#64748B]">
                {siteData.siteInfo.subTagline}
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {siteData.navigation.links.map((link, idx) => {
            const isActive = location.pathname === link.href;
            const indexStr = `0${idx + 1}`;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'relative px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-200',
                  isActive
                    ? 'text-[#0DA5F0] font-bold'
                    : 'text-[#475569] hover:text-[#090D12]'
                )}
              >
                <span className="text-[#94A3B8] text-[10px] mr-1">{indexStr}</span>
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0DA5F0] shadow-[0_0_8px_#0DA5F0]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link to={siteData.navigation.joinHref} className="hidden sm:inline-flex">
            <Button variant="primary" size="sm" className="gap-1.5 font-mono text-xs">
              <span>{siteData.navigation.joinButtonText}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] text-[#090D12] hover:border-[#0DA5F0] hover:text-[#0DA5F0] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-[#FFFFFF]/98 backdrop-blur-xl md:hidden flex flex-col justify-between p-6 border-t border-[#E2E8F0] animate-in fade-in duration-200">
          <nav className="flex flex-col gap-3">
            {siteData.navigation.links.map((link, idx) => {
              const isActive = location.pathname === link.href;
              const indexStr = `0${idx + 1}`;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center justify-between py-3 px-4 rounded-[2px] border transition-colors',
                    isActive
                      ? 'border-[#0DA5F0] bg-[#0DA5F0]/10 text-[#0284C7]'
                      : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#090D12] hover:border-[#0DA5F0]'
                  )}
                >
                  <div className="flex items-center gap-3 font-mono text-sm">
                    <span className="text-[#94A3B8] text-xs">{indexStr}</span>
                    <span className="font-semibold uppercase">{link.label}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 opacity-70 text-[#0DA5F0]" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-[#E2E8F0] flex flex-col gap-4">
            <Link to={siteData.navigation.joinHref} onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="lg" className="w-full justify-between font-mono">
                <span>{siteData.navigation.joinButtonText}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>

            <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
              <span>SRM UNIVERSITY-AP</span>
              <span>{siteData.siteCoordinates.display}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
