import { useState, useEffect } from 'react';
import api from './api';

/**
 * Custom React Hook to fetch CMS dynamic content with static fallback
 * @param key Section key (e.g., 'hero', 'about', 'announcements', 'footer')
 * @param fallbackData Static local fallback data from siteData
 */
export function useCMSContent<T = any>(key: string, fallbackData: T): { data: T; loading: boolean; error: boolean } {
  const [data, setData] = useState<T>(fallbackData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchCMS() {
      try {
        const res = await api.getContent(key);
        if (isMounted && res.success && res.data) {
          setData(res.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCMS();
    return () => {
      isMounted = false;
    };
  }, [key]);

  return { data, loading, error };
}

/**
 * Custom React Hook to fetch dynamic structured collections (Events, Blogs, Projects)
 */
export function useCMSCollection<T>(
  fetcher: () => Promise<{ success: boolean; data?: T[] }>,
  fallbackData: T[]
): { items: T[]; loading: boolean } {
  const [items, setItems] = useState<T[]>(fallbackData);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadCollection() {
      try {
        const res = await fetcher();
        if (isMounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setItems(res.data);
        }
      } catch {
        // Fallback to static audited content
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCollection();
    return () => {
      isMounted = false;
    };
  }, []);

  return { items, loading };
}
