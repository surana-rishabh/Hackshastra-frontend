import * as React from 'react';
import { EntrancePortal } from '@/components/entrance/EntrancePortal';
import { HeroSection } from '@/components/sections/HeroSection';
import { WhoWeAreSection } from '@/components/sections/WhoWeAreSection';
import { MissionSection } from '@/components/sections/MissionSection';
import { ImpactSection } from '@/components/sections/ImpactSection';
import { EventsSection } from '@/components/sections/EventsSection';
import { CTASection } from '@/components/sections/CTASection';

export const HomePage: React.FC = () => {
  const [showEntrance, setShowEntrance] = React.useState(false);

  React.useEffect(() => {
    // Only display entrance splash if not previously completed in session
    const isCompleted = sessionStorage.getItem('loadingComplete');
    if (isCompleted !== 'true') {
      setShowEntrance(true);
    }
  }, []);

  const handleEntranceComplete = () => {
    sessionStorage.setItem('loadingComplete', 'true');
    setShowEntrance(false);
  };

  return (
    <>
      {showEntrance && <EntrancePortal onEnter={handleEntranceComplete} />}
      <div className="flex flex-col">
        <HeroSection />
        <WhoWeAreSection />
        <MissionSection />
        <ImpactSection />
        <EventsSection />
        <CTASection />
      </div>
    </>
  );
};
