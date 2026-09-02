import * as React from 'react';
import { Loader2 } from 'lucide-react';

export const TexpoRegisterPage: React.FC = () => {
  const targetUrl = 'https://unstop.com/competitions/texpo-2026-student-innovation-and-industry-technology-expo-srm-university-srmap-andhra-pradesh-1638340';

  React.useEffect(() => {
    window.location.href = targetUrl;
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-[#0DA5F0] mb-4" />
      <h2 className="font-heading text-2xl font-bold text-[#F4F7F8]">
        Redirecting to TEXPO'26 Registration...
      </h2>
      <p className="mt-2 text-xs font-mono text-[#8FA1AB]">
        If you are not redirected automatically,{' '}
        <a href={targetUrl} className="text-[#0DA5F0] underline">
          click here to proceed to Unstop
        </a>.
      </p>
    </div>
  );
};
