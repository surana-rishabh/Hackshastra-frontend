/// <reference types="vite/client" />
import mediaUrlsData from '@/data/mediaUrls.json';

const cdnMediaMap = new Map<string, string>(Object.entries(mediaUrlsData.mediaMap || {}));
const cdnFilenameMap = new Map<string, string>(Object.entries(mediaUrlsData.filenameMap || {}));

const assetFiles = import.meta.glob<{ default: string }>(
  '/src/assets/**/*.{png,jpg,jpeg,svg,webp,gif,mp4,webm}',
  { eager: true }
);

const assetMap = new Map<string, string>();
const filenameMap = new Map<string, string>();

for (const path in assetFiles) {
  const asset = assetFiles[path];
  const url = (asset && typeof asset === 'object' && 'default' in asset)
    ? asset.default
    : (asset as unknown as string);
  assetMap.set(path, url);
  const filename = path.split('/').pop()?.toLowerCase();
  if (filename) {
    filenameMap.set(filename, url);
  }
}

export function getImageUrl(path: string | undefined | null): string {
  if (!path) return cdnFilenameMap.get('logo.svg') || '/logo.svg';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // 1. Direct CDN lookup
  if (cdnMediaMap.has(path)) {
    return cdnMediaMap.get(path)!;
  }

  const filename = path.split('/').pop()?.toLowerCase();
  if (filename && cdnFilenameMap.has(filename)) {
    return cdnFilenameMap.get(filename)!;
  }

  // 2. Vite Bundled Fallback
  if (path.startsWith('@/assets/')) {
    const fullPath = path.replace('@/assets/', '/src/assets/');
    if (assetMap.has(fullPath)) return assetMap.get(fullPath)!;
  }
  if (filename && filenameMap.has(filename)) {
    return filenameMap.get(filename)!;
  }
  return path;
}

