import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Menu, X, ArrowUpRight } from 'lucide-react';
import { siteData } from '@/data/siteData';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-[#85b5cd] bg-[#9CC6DB] shadow-md'
          : 'border-b border-[#85b5cd] bg-[#9CC6DB]'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {!isHome && (
            <button
              onClick={handleBack}
              aria-label="Go back"
              className="flex h-9 w-9 items-center justify-center rounded-[2px] border border-[#CF4B00] bg-[#CF4B00] text-[#FFFFFF] hover:bg-[#b04000] transition-colors cursor-pointer shadow-xs font-bold"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}

          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.svg"
              alt="HackShastra Logo"
              className="h-6 w-6 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-heading text-sm font-bold tracking-tight text-[#0F172A] group-hover:text-[#CF4B00] transition-colors">
                {siteData.siteInfo.name}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#0F172A]/80 font-semibold">
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
                    ? 'text-[#CF4B00] font-black'
                    : 'text-[#0F172A] hover:text-[#CF4B00]'
                )}
              >
                <span className="text-[#0F172A]/60 text-[10px] mr-1">{indexStr}</span>
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#CF4B00]" />
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
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-[2px] border border-[#CF4B00] bg-[#CF4B00] text-[#FFFFFF] hover:bg-[#b04000] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-[#9CC6DB] md:hidden flex flex-col justify-between p-6 border-t border-[#85b5cd] animate-in fade-in duration-200">
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
                      ? 'border-[#CF4B00] bg-[#CF4B00] text-[#FFFFFF]'
                      : 'border-[#85b5cd] bg-[#FCF6D9] text-[#0F172A] hover:border-[#CF4B00]'
                  )}
                >
                  <div className="flex items-center gap-3 font-mono text-sm">
                    <span className={isActive ? 'text-[#FFFFFF]/80 text-xs' : 'text-[#0F172A]/60 text-xs'}>{indexStr}</span>
                    <span className="font-bold uppercase">{link.label}</span>
                  </div>
                  <ArrowUpRight className={cn('h-4 w-4', isActive ? 'text-[#FFFFFF]' : 'text-[#CF4B00]')} />
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-[#85b5cd] flex flex-col gap-4">
            <Link to={siteData.navigation.joinHref} onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="lg" className="w-full justify-between font-mono">
                <span>{siteData.navigation.joinButtonText}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>

            <div className="flex items-center justify-between text-xs font-mono text-[#0F172A]/80 font-semibold">
              <span>SRM UNIVERSITY  -  AP</span>
              <span>{siteData.siteCoordinates.display}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
