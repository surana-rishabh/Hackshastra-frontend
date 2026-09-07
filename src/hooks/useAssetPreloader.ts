import * as React from 'react';

interface AssetPreloadConfig {
  images?: string[];
  videos?: string[];
  fonts?: boolean;
  minDisplayTimeMs?: number;
  maxWaitTimeMs?: number;
}

interface PreloadState {
  isLoading: boolean;
  progress: number; // 0 to 100
  statusMessage: string;
  loadedCount: number;
  totalCount: number;
}

const preloadSingleImage = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!src) return resolve(true);
    const img = new Image();
    img.src = src;
    if (img.complete && img.naturalWidth !== 0) {
      return resolve(true);
    }
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false); // don't freeze whole loader if an asset network errors
  });
};

const preloadSingleVideo = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!src) return resolve(true);
    const video = document.createElement('video');
    video.src = src;
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;

    let finished = false;
    const cleanupAndResolve = (success: boolean) => {
      if (finished) return;
      finished = true;
      video.removeEventListener('canplaythrough', onReady);
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('error', onError);
      resolve(success);
    };

    const onReady = () => cleanupAndResolve(true);
    const onError = () => cleanupAndResolve(false);

    video.addEventListener('canplaythrough', onReady);
    video.addEventListener('loadeddata', onReady);
    video.addEventListener('error', onError);

    // If video is already ready or cached in memory
    if (video.readyState >= 2) {
      return cleanupAndResolve(true);
    }

    // Safety timeout per video
    setTimeout(() => cleanupAndResolve(true), 3500);
  });
};

const preloadDocumentFonts = async (): Promise<boolean> => {
  if (typeof document !== 'undefined' && 'fonts' in document) {
    try {
      await document.fonts.ready;
      return true;
    } catch {
      return false;
    }
  }
  return true;
};

export const useAssetPreloader = ({
  images = [],
  videos = [],
  fonts = true,
  minDisplayTimeMs = 800, // Short cinematic reveal minimum
  maxWaitTimeMs = 6000,   // Safety ceiling so slow 3G never blocks user forever
}: AssetPreloadConfig): PreloadState => {
  const [state, setState] = React.useState<PreloadState>({
    isLoading: true,
    progress: 0,
    statusMessage: 'INITIALIZING POKÉDEX KERNEL...',
    loadedCount: 0,
    totalCount: images.length + videos.length + (fonts ? 1 : 0),
  });

  React.useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();

    const uniqueImages = Array.from(new Set(images.filter(Boolean)));
    const uniqueVideos = Array.from(new Set(videos.filter(Boolean)));
    const totalItems = uniqueImages.length + uniqueVideos.length + (fonts ? 1 : 0);

    if (totalItems === 0) {
      setState({
        isLoading: false,
        progress: 100,
        statusMessage: 'READY',
        loadedCount: 0,
        totalCount: 0,
      });
      return;
    }

    let loadedItems = 0;

    const updateItemLoaded = (message: string) => {
      if (!isMounted) return;
      loadedItems += 1;
      const calculatedProgress = Math.min(100, Math.round((loadedItems / totalItems) * 100));

      setState((prev) => ({
        ...prev,
        loadedCount: loadedItems,
        totalCount: totalItems,
        progress: calculatedProgress,
        statusMessage: message,
      }));
    };

    const tasks: Promise<any>[] = [];

    // 1. Preload Videos
    uniqueVideos.forEach((videoSrc, idx) => {
      const task = preloadSingleVideo(videoSrc).then(() => {
        updateItemLoaded(`BUFFERING ARENA VIDEO FEED [0${idx + 1}]...`);
      });
      tasks.push(task);
    });

    // 2. Preload Images
    uniqueImages.forEach((imgSrc) => {
      const task = preloadSingleImage(imgSrc).then(() => {
        const basename = imgSrc.split('/').pop()?.split('?')[0] || 'ASSET';
        updateItemLoaded(`CACHING ${basename.toUpperCase().slice(0, 18)}...`);
      });
      tasks.push(task);
    });

    // 3. Preload Fonts
    if (fonts) {
      const task = preloadDocumentFonts().then(() => {
        updateItemLoaded('SYNCHRONIZING TYPOGRAPHY & HOLO FONTS...');
      });
      tasks.push(task);
    }

    // Safety timeout to avoid hanging indefinitely on stalled connections
    const safetyTimer = setTimeout(() => {
      if (isMounted) {
        setState((prev) => ({
          ...prev,
          progress: 100,
          statusMessage: 'BOOT COMPLETE',
          isLoading: false,
        }));
      }
    }, maxWaitTimeMs);

    // When all tasks finish
    Promise.allSettled(tasks).then(() => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTimeMs - elapsed);

      setTimeout(() => {
        if (isMounted) {
          clearTimeout(safetyTimer);
          setState((prev) => ({
            ...prev,
            progress: 100,
            statusMessage: 'BOOT SEQUENCE COMPLETE',
          }));

          // Small pause at 100% for smooth visual transition
          setTimeout(() => {
            if (isMounted) {
              setState((prev) => ({
                ...prev,
                isLoading: false,
              }));
            }
          }, 350);
        }
      }, remainingTime);
    });

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
    };
  }, []);

  return state;
};
