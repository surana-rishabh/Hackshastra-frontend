import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { siteData } from '@/data/siteData';

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  image?: string;
  linkedin?: string;
  github?: string;
  year?: string;
  specialty?: string;
}

export function useTeam() {
  const [teamSections, setTeamSections] = useState<any[]>([
    { title: 'Club Advisory', data: siteData.team.clubAdvisory, dept: 'Advisory' },
    { title: 'Community Leadership', data: siteData.team.leadership, dept: 'Leadership' },
    { title: 'Technical Core Team', data: siteData.team.technicalTeam, dept: 'Technical Core' },
    { title: 'Design & Social Media Team', data: siteData.team.designTeam, dept: 'Design & Social Media' },
    { title: 'Events & Management Team', data: siteData.team.eventsTeam, dept: 'Events & Management' },
    { title: 'Internal Affairs & Logistics Team', data: siteData.team.internalAffairsLogisticsTeam, dept: 'Internal Affairs' },
    { title: 'Social Media & PR Team', data: siteData.team.socialMediaPrTeam, dept: 'PR & Outreach' },
  ]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchTeam() {
      try {
        const res = await api.get('/api/team');
        if (res.success && res.data && Array.isArray(res.data) && res.data.length > 0 && isMounted) {
          const list: TeamMember[] = res.data;
          
          const advisory = list.filter(m => m.department?.toLowerCase().includes('advisory'));
          const leadership = list.filter(m => m.department?.toLowerCase().includes('leadership'));
          const tech = list.filter(m => m.department?.toLowerCase().includes('tech'));
          const design = list.filter(m => m.department?.toLowerCase().includes('design') || m.department?.toLowerCase().includes('social'));
          const events = list.filter(m => m.department?.toLowerCase().includes('event'));
          const logistics = list.filter(m => m.department?.toLowerCase().includes('logistics') || m.department?.toLowerCase().includes('internal'));
          const pr = list.filter(m => m.department?.toLowerCase().includes('pr') || m.department?.toLowerCase().includes('outreach'));

          setTeamSections([
            { title: 'Club Advisory', data: advisory.length ? advisory : siteData.team.clubAdvisory, dept: 'Advisory' },
            { title: 'Community Leadership', data: leadership.length ? leadership : siteData.team.leadership, dept: 'Leadership' },
            { title: 'Technical Core Team', data: tech.length ? tech : siteData.team.technicalTeam, dept: 'Technical Core' },
            { title: 'Design & Social Media Team', data: design.length ? design : siteData.team.designTeam, dept: 'Design & Social Media' },
            { title: 'Events & Management Team', data: events.length ? events : siteData.team.eventsTeam, dept: 'Events & Management' },
            { title: 'Internal Affairs & Logistics Team', data: logistics.length ? logistics : siteData.team.internalAffairsLogisticsTeam, dept: 'Internal Affairs' },
            { title: 'Social Media & PR Team', data: pr.length ? pr : siteData.team.socialMediaPrTeam, dept: 'PR & Outreach' },
          ]);
          setIsLive(true);
        }
      } catch {
        // Fallback
      }
    }
    fetchTeam();
    return () => {
      isMounted = false;
    };
  }, []);

  return { teamSections, isLive };
}
