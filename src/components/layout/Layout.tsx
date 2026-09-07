import * as React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { AdisyonShaderBackground } from '@/components/ui/AdisyonShaderBackground';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SmoothScrollProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#CF4B00] focus:text-[#FFFFFF] focus:font-bold focus:rounded-[2px] focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <CustomCursor />

      <div className="relative min-h-screen flex flex-col bg-[#FCF6D9] text-[#0F172A] selection:bg-[#CF4B00]/30 selection:text-[#0F172A]">
        <AdisyonShaderBackground />

        <Navbar />

        <main id="main-content" className="relative z-10 flex-1 pt-16">
          {children}
        </main>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};
