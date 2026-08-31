import { useState, useCallback, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Menu, X } from 'lucide-react';
import siteData from '@/data/siteData';
import OptionWheel from '@/components/ui/OptionWheel';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = siteData.navigation.links;
  const siteName = siteData.siteInfo.name;
  const joinButtonText = siteData.navigation.joinButtonText;
  const joinHref = siteData.navigation.joinHref;

  const navItems = navLinks.map(link => link.label);

  const isLinkActive = useCallback((href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  }, [location.pathname]);

  const handleBackClick = useCallback(() => {
    if (window.history.length > 2 && location.pathname !== '/') {
      navigate(-1);
    } else {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleOptionWheelChange = (index: number) => {
    const targetLink = navLinks[index];
    if (targetLink) {
      navigate(targetLink.href);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LEFT SECTION: Back Button + Brand Title */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 px-3 py-1 bg-[#F4F7F8] border border-[#E2E8F0] rounded-[2px] text-[#071014] text-xs font-mono tracking-widest uppercase hover:bg-primary hover:text-white transition-all group focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Go back"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>BACK</span>
          </button>

          <Link
            to="/"
            className="font-heading font-bold tracking-wider text-base sm:text-xl text-primary uppercase hover:opacity-90 transition-opacity"
          >
            {siteName}
          </Link>
        </div>

        {/* CENTER SECTION: Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F4F7F8] border border-[#E2E8F0] px-3 py-1.5 rounded-[2px]" aria-label="Main Navigation">
          {navLinks.map((link, idx) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`px-3.5 py-1 text-xs font-mono tracking-wider uppercase transition-all ${
                  active
                    ? 'text-primary font-bold border-b-2 border-primary'
                    : 'text-[#64748B] hover:text-[#071014]'
                }`}
              >
                <span className="text-primary/60 mr-1.5 font-mono text-[10px]">0{idx + 1}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SECTION: Join Button & Mobile Option Wheel Toggle */}
        <div className="flex items-center gap-4">
          <Link
            to={joinHref}
            className="hidden sm:inline-flex items-center justify-center bg-primary text-white hover:bg-[#0877AF] px-5 py-2 rounded-[2px] font-heading font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm"
          >
            {joinButtonText}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-[2px] bg-[#F4F7F8] border border-[#E2E8F0] text-[#071014] hover:text-primary focus:outline-none"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION OVERLAY WITH OPTION WHEEL */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] bg-white z-50 flex flex-col items-center justify-center p-8 border-t border-[#E2E8F0] animate-in fade-in duration-200">
          <div className="text-center mb-6">
            <span className="text-xs font-mono text-primary uppercase tracking-widest">[ DRAG / CLICK TO SELECT SECTION ]</span>
          </div>

          <div className="w-full h-[320px] max-w-sm">
            <OptionWheel
              items={navItems}
              defaultSelected={0}
              textColor="#64748b"
              activeColor="#0DA5F0"
              fontSize={1.75}
              onChange={handleOptionWheelChange}
            />
          </div>

          <div className="w-full max-w-sm mt-8">
            <Link
              to={joinHref}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center bg-primary text-white hover:bg-[#0877AF] py-4 rounded-[2px] font-heading font-bold text-sm tracking-wider uppercase transition-colors shadow-md"
            >
              {joinButtonText}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
