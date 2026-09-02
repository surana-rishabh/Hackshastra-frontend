import * as React from 'react';
import { siteData } from '@/data/siteData';
import { FadeUp } from '@/components/ui/MotionWrapper';
import { getImageUrl } from '@/lib/assets';
import { X, ZoomIn } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeImage, setActiveImage] = React.useState<string | null>(null);

  return (
    <div className="py-12 md:py-20 bg-[#FFFFFF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#0DA5F0] font-bold mb-3">
            <span>MEDIA ARCHIVE</span>
            <span>•</span>
            <span>[ EVENT PHOTOGRAPHY ]</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-[#090D12]">
            HackShastra SRM-AP Gallery
          </h1>
          <p className="mt-4 text-base text-[#334155] max-w-2xl">
            Moments captured from hackathons, workshops, leadership meetups, and developer summits.
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.gallery.map((item, idx) => {
            const resolvedSrc = getImageUrl(item.img);
            return (
              <FadeUp key={item.id} delay={idx * 0.1}>
                <div
                  onClick={() => setActiveImage(resolvedSrc)}
                  className="group relative aspect-square cursor-pointer overflow-hidden rounded-[2px] border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0DA5F0] hover:shadow-md transition-all"
                >
                  <img
                    src={resolvedSrc}
                    alt={`HackShastra gallery moment ${item.id}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/logo.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D12]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-heading text-sm font-bold text-white">
                        SRM-AP Event
                      </span>
                      <ZoomIn className="h-4 w-4 text-[#38BDF8]" />
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>

      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
        >
          <button
            onClick={() => setActiveImage(null)}
            aria-label="Close image preview"
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-black/60 rounded-full cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={activeImage}
            alt="Enlarged gallery preview"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-[2px] border border-white/20"
          />
        </div>
      )}
    </div>
  );
};
