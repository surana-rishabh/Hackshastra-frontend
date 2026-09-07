import * as React from 'react';
import { EntrancePortal } from '@/components/entrance/EntrancePortal';
import { HeroSection } from '@/components/sections/HeroSection';
import { WhoWeAreSection } from '@/components/sections/WhoWeAreSection';
import { ImpactSection } from '@/components/sections/ImpactSection';
import { EventsSection } from '@/components/sections/EventsSection';
import { CTASection } from '@/components/sections/CTASection';

export const HomePage: React.FC = () => {
  const [showEntrance, setShowEntrance] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('loadingComplete') !== 'true';
  });

  const handleEntranceComplete = React.useCallback(() => {
    sessionStorage.setItem('loadingComplete', 'true');
    setShowEntrance(false);
  }, []);

  return (
    <>
      {showEntrance && <EntrancePortal onEnter={handleEntranceComplete} />}
      <div className="flex flex-col">
        <HeroSection />
        <WhoWeAreSection />
        <ImpactSection />
        <EventsSection />
        <CTASection />
      </div>
    </>
  );
};
