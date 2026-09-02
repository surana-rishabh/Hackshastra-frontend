import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { siteData } from '@/data/siteData';

export interface EventItem {
  id?: string | number;
  title: string;
  subtitle: string;
  status?: 'upcoming' | 'completed' | 'active' | string;
  announcement?: string;
  location?: string;
  date?: string;
  registerUrl?: string;
  completed?: boolean;
  image?: string;
  [key: string]: any;
}

export function useEvents() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>(siteData.events.upcoming);
  const [completedEvents, setCompletedEvents] = useState<EventItem[]>(siteData.events.completed);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchEvents() {
      try {
        const res = await api.get('/api/events');
        if (res.success && Array.isArray(res.data) && res.data.length > 0 && isMounted) {
          const apiEvents = res.data;
          const up = apiEvents.filter((e: any) => e.status === 'upcoming' || e.status === 'active');
          const comp = apiEvents.filter((e: any) => e.status === 'completed');
          
          if (up.length > 0) setUpcomingEvents(up);
          if (comp.length > 0) setCompletedEvents(comp);
          setIsLive(true);
        }
      } catch {
        // Silently fallback to bundled static data
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  return { upcomingEvents, completedEvents, loading, isLive };
}
