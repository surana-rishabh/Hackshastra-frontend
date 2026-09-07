import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { 
  FileText, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Database
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const AdminContentPage: React.FC = () => {
  const [heroTagline, setHeroTagline] = useState("Where Ancient Wisdom Fuels Tomorrow's Architecture");
  const [heroDesc, setHeroDesc] = useState("We are a community of students driven by curiosity and a shared passion for technology.");
  const [statsReach, setStatsReach] = useState("300K+");
  const [statsMembers, setStatsMembers] = useState("2,600+");
  const [statsPrizes, setStatsPrizes] = useState("₹30,000+");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await api.get('/api/admin/content/hero_section');
        if (res.success && res.data?.metadata) {
          const m = typeof res.data.metadata === 'string' ? JSON.parse(res.data.metadata) : res.data.metadata;
          if (m.heroTagline) setHeroTagline(m.heroTagline);
          if (m.heroDesc) setHeroDesc(m.heroDesc);
          if (m.statsReach) setStatsReach(m.statsReach);
          if (m.statsMembers) setStatsMembers(m.statsMembers);
          if (m.statsPrizes) setStatsPrizes(m.statsPrizes);
        }
      } catch {
        // Fallback
      }
    }
    loadContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/api/admin/content/hero_section', {
        title: 'Hero Section & Telemetry',
        content: heroDesc,
        metadata: {
          heroTagline,
          heroDesc,
          statsReach,
          statsMembers,
          statsPrizes,
        },
      });
      setMessage('Site content successfully updated and stored in database.');
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="font-mono text-xs uppercase text-[#1789E5] font-bold mb-1">
            [ LIVE NO-CODE CMS ]
          </div>
          <h1 className="font-heading text-3xl font-bold text-[#FFFFFF]">
            Site Copy & Live Metrics
          </h1>
        </div>
      </div>

      {message && (
        <div className="p-3 rounded-[2px] bg-emerald-950/40 border border-emerald-800 text-emerald-300 font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-[2px] border border-[#1E293B] bg-[#0D121A] p-6 space-y-4">
          <div className="font-mono text-xs text-[#1789E5] uppercase font-bold border-b border-[#1E293B] pb-3">
            [ 01 / HERO STATEMENT ]
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-xs text-[#94A3B8] block uppercase font-semibold">Hero Main Tagline</label>
            <input
              type="text"
              value={heroTagline}
              onChange={(e) => setHeroTagline(e.target.value)}
              className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#1789E5] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-xs text-[#94A3B8] block uppercase font-semibold">Hero Description</label>
            <textarea
              rows={4}
              value={heroDesc}
              onChange={(e) => setHeroDesc(e.target.value)}
              className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#1789E5] focus:outline-none"
            />
          </div>
        </div>

        <div className="rounded-[2px] border border-[#1E293B] bg-[#0D121A] p-6 space-y-4">
          <div className="font-mono text-xs text-[#1789E5] uppercase font-bold border-b border-[#1E293B] pb-3">
            [ 02 / TELEMETRY METRIC COUNTERS ]
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#94A3B8] block uppercase">Creator Reach</label>
              <input
                type="text"
                value={statsReach}
                onChange={(e) => setStatsReach(e.target.value)}
                className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#1789E5] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#94A3B8] block uppercase">Community Members</label>
              <input
                type="text"
                value={statsMembers}
                onChange={(e) => setStatsMembers(e.target.value)}
                className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#1789E5] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#94A3B8] block uppercase">Hackathon Prizes</label>
              <input
                type="text"
                value={statsPrizes}
                onChange={(e) => setStatsPrizes(e.target.value)}
                className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#1789E5] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Button type="submit" variant="primary" size="lg" loading={saving} className="font-mono text-xs gap-2 cursor-pointer">
            <Save className="h-4 w-4" />
            <span>SAVE CONTENT TO DATABASE</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
