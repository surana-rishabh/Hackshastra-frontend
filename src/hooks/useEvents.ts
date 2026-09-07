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
        const eventList = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.events)
          ? res.data.events
          : null;

        if (res.success && eventList && eventList.length > 0 && isMounted) {
          const up = eventList.filter((e: any) => e.status === 'upcoming' || e.status === 'active' || e.status === 'PUBLISHED');
          const comp = eventList.filter((e: any) => e.status === 'completed' || e.status === 'COMPLETED');
          
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
    const handleSync = () => fetchEvents();
    window.addEventListener('hackshastra-db-sync', handleSync);
    return () => {
      isMounted = false;
      window.removeEventListener('hackshastra-db-sync', handleSync);
    };
  }, []);

  return { upcomingEvents, completedEvents, loading, isLive };
}
