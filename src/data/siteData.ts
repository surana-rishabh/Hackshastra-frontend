import websiteData from './websiteData.json';
import { getImageUrl } from '@/lib/assets';

export const siteData = {
  ...websiteData,
  siteCoordinates: {
    display: '16.4627° N / 80.5068° E',
    lat: 16.462717,
    lng: 80.506813,
  },
  socialsList: [
    { platform: 'Instagram', url: websiteData.socialLinks.instagram },
    { platform: 'LinkedIn', url: websiteData.socialLinks.linkedin },
    { platform: 'Discord', url: websiteData.socialLinks.discord },
  ],
  getImageUrl,
};

export { getImageUrl };
export default siteData;
