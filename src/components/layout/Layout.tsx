import * as React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SmoothScrollProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#0DA5F0] focus:text-[#FFFFFF] focus:font-semibold focus:rounded-[2px] focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <CustomCursor />

      <div className="relative min-h-screen flex flex-col bg-[#FFFFFF] text-[#090D12] selection:bg-[#0DA5F0]/20 selection:text-[#090D12]">
        <div className="fixed inset-0 pointer-events-none bg-radial-atmosphere z-0" />
        <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-60 z-0" />

        <Navbar />

        <main id="main-content" className="relative z-10 flex-1 pt-16">
          {children}
        </main>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};
