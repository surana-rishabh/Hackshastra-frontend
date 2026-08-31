import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Sparkles, Filter } from 'lucide-react';
import TiltedCard from '@/components/ui/TiltedCard';
import DotMatrixText from '@/components/ui/DotMatrixText';
import siteData, { getImageUrl } from '@/data/siteData';

const categories = ['ALL', 'TEXPO', 'HACKATHONS', 'WORKSHOPS', 'COMMUNITY'];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; caption: string } | null>(null);

  const galleryImages = siteData.gallery;

  return (
    <div className="bg-[#071014] text-white min-h-screen w-full relative pt-24 pb-20">
      
      {/* ── Page Header Bar (Vigilante / Cipher style) ── */}
      <div className="max-w-7xl mx-auto px-6 mb-12 border-b border-[#35434B] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4 text-primary animate-spin" />
            <span>03 / VISUAL ARCHIVE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-heading font-bold uppercase tracking-tight text-white">
            CIPHER <span className="text-primary">GALLERY</span> STAGE
          </h1>
          <p className="text-[#A8B3BA] text-sm sm:text-base font-body max-w-xl mt-2">
            Explore moments, hackathons, building sessions, and community highlights captured across the HackShastra SRM University-AP ecosystem.
          </p>
        </div>

        <DotMatrixText text="CIPHER • 3D ARCHIVE VIEW" dotSize={3} color="#0DA5F0" />
      </div>

      {/* ── Category Filter Bar ── */}
      <div className="max-w-7xl mx-auto px-6 mb-10 flex items-center justify-between overflow-x-auto pb-2">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-primary shrink-0" />
          <span className="text-xs font-mono text-[#A8B3BA] uppercase tracking-widest mr-2 shrink-0">FILTER:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all rounded-[2px] border shrink-0 ${
                selectedCategory === cat
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                  : 'bg-[#071014] text-[#A8B3BA] border-[#35434B] hover:border-primary hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs font-mono text-[#A8B3BA] hidden sm:inline">
          {galleryImages.length} ARCHIVED SNAPSHOTS
        </span>
      </div>

      {/* ── 3D Interactive Tilt Media Grid (Cipher.tv pattern) ── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((item, idx) => {
            const imageSrc = getImageUrl(item.img);
            const caption = (item as { caption?: string }).caption || `HackShastra Moment #${item.id}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="cursor-pointer group"
                onClick={() => setEnlargedImage({ src: imageSrc, caption })}
              >
                <div className="bg-[#071014] border border-[#35434B] rounded-[4px] p-3 group-hover:border-primary transition-all duration-300 shadow-xl">
                  <div className="relative aspect-video overflow-hidden rounded-[2px]">
                    <TiltedCard
                      imageSrc={imageSrc}
                      altText={caption}
                      captionText={caption}
                      containerHeight="100%"
                      containerWidth="100%"
                      imageHeight="100%"
                      imageWidth="100%"
                      rotateAmplitude={12}
                      scaleOnHover={1.05}
                      showMobileWarning={false}
                      showTooltip={true}
                    />
                    <div className="absolute top-3 right-3 z-20 p-2 bg-[#071014]/80 text-primary border border-primary/30 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-[#35434B] flex items-center justify-between text-xs font-mono text-[#A8B3BA]">
                    <span>ARCHIVE #{item.id}</span>
                    <span className="text-primary font-bold">[ VIEW SNAPSHOT ]</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Fullscreen Lightbox Zoom Modal (Cipher.tv pattern) ── */}
      <AnimatePresence>
        {enlargedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071014]/95 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setEnlargedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[90vh] bg-[#071014] border border-[#35434B] p-4 sm:p-6 rounded-[4px] shadow-2xl flex flex-col gap-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#35434B] pb-3 text-xs font-mono text-[#A8B3BA]">
                <span>FULLSCREEN ARCHIVE PREVIEW</span>
                <button
                  onClick={() => setEnlargedImage(null)}
                  className="p-1.5 bg-[#35434B]/40 hover:bg-primary text-white transition-colors rounded-[2px]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative overflow-hidden rounded-[2px] max-h-[75vh]">
                <img
                  src={enlargedImage.src}
                  alt={enlargedImage.caption}
                  className="w-full h-full object-contain max-h-[75vh]"
                />
              </div>

              <div className="pt-2 border-t border-[#35434B] flex items-center justify-between text-xs font-mono text-[#A8B3BA]">
                <span>{enlargedImage.caption}</span>
                <span className="text-primary font-bold">HACKSHASTRA SRM-AP</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}