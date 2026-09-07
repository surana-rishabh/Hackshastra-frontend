import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#FFFFFF]">
      <span className="font-mono text-sm text-[#1789E5] font-bold mb-2">[ ERROR 404 ]</span>
      <h1 className="font-heading text-6xl sm:text-8xl font-bold tracking-tight text-[#090D12]">
        404
      </h1>
      <p className="mt-4 text-base text-[#334155] max-w-md">
        The coordinate or route you requested does not exist in the HackShastra directory.
      </p>
      <div className="mt-8">
        <Link to="/">
          <Button variant="primary" size="lg" className="font-mono text-xs gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO BASE</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
