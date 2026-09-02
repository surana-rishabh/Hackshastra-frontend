/// <reference types="vite/client" />

const assetFiles = import.meta.glob<{ default: string }>(
  '/src/assets/**/*.{png,jpg,jpeg,svg,webp,gif,mp4}',
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
  if (!path) return '/logo.svg';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  if (path.startsWith('@/assets/')) {
    const fullPath = path.replace('@/assets/', '/src/assets/');
    if (assetMap.has(fullPath)) return assetMap.get(fullPath)!;
  }
  const filename = path.split('/').pop()?.toLowerCase();
  if (filename && filenameMap.has(filename)) {
    return filenameMap.get(filename)!;
  }
  return path;
}
