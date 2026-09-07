import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { siteData } from '@/data/siteData';
import { 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Save, 
  X,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  image?: string;
  linkedin?: string;
  github?: string;
}

export const AdminTeamPage: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState<TeamMember>({
    name: '',
    role: '',
    department: 'Leadership',
    image: '',
    linkedin: '',
    github: '',
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadTeam = async () => {
    try {
      const res = await api.get('/api/admin/team');
      if (res.success && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setMembers(res.data);
      } else {
        // Flatten siteData if no database override yet
        const initialList: TeamMember[] = [
          ...siteData.team.clubAdvisory.map(m => ({ ...m, department: 'Advisory' })),
          ...siteData.team.leadership.map(m => ({ ...m, department: 'Leadership' })),
          ...siteData.team.technicalTeam.map(m => ({ ...m, department: 'Technical Core' })),
          ...siteData.team.designTeam.map(m => ({ ...m, department: 'Design & Social' })),
          ...siteData.team.eventsTeam.map(m => ({ ...m, department: 'Events' })),
          ...siteData.team.internalAffairsLogisticsTeam.map(m => ({ ...m, department: 'Logistics' })),
          ...siteData.team.socialMediaPrTeam.map(m => ({ ...m, department: 'PR & Outreach' })),
        ];
        setMembers(initialList);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const saveToDatabase = async (updatedList: TeamMember[]) => {
    setSaving(true);
    try {
      await api.put('/api/admin/team', updatedList);
      setMessage('Team roster successfully synchronized with PostgreSQL database.');
      setTimeout(() => setMessage(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Failed to save team to database');
    } finally {
      setSaving(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setFormData({
      name: '',
      role: '',
      department: 'Leadership',
      image: '',
      linkedin: '',
      github: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (m: TeamMember, index: number) => {
    setEditingIndex(index);
    setFormData({ ...m });
    setModalOpen(true);
  };

  const handleDelete = (index: number) => {
    if (!confirm(`Are you sure you want to remove ${members[index].name} from the roster?`)) return;
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
    saveToDatabase(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: TeamMember[];
    if (editingIndex !== null) {
      updated = members.map((m, idx) => (idx === editingIndex ? formData : m));
    } else {
      updated = [formData, ...members];
    }
    setMembers(updated);
    setModalOpen(false);
    saveToDatabase(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="font-mono text-xs uppercase text-[#1789E5] font-bold mb-1">
            [ TEAM & ROSTER CONTROL ]
          </div>
          <h1 className="font-heading text-3xl font-bold text-[#FFFFFF]">
            Manage Members & Leads
          </h1>
        </div>

        <Button onClick={handleOpenAdd} variant="primary" size="sm" className="font-mono text-xs gap-1.5 cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>ADD NEW MEMBER</span>
        </Button>
      </div>

      {message && (
        <div className="p-3 rounded-[2px] bg-emerald-950/40 border border-emerald-800 text-emerald-300 font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}

      {/* Team Grid */}
      <div className="rounded-[2px] border border-[#1E293B] bg-[#0D121A] p-5">
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-4 mb-4">
          <span className="font-mono text-xs text-[#94A3B8] uppercase font-bold">
            COMMUNITY MEMBERS DIRECTORY ({members.length})
          </span>
          <span className="font-mono text-[10px] text-[#1789E5]">CHANGES PERSIST TO DB IMMEDIATELY</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member, index) => (
            <div
              key={`${member.name}-${index}`}
              className="rounded-[2px] border border-[#1E293B] bg-[#090D12] p-4 flex items-start justify-between gap-3 hover:border-[#1789E5]/50 transition-colors"
            >
              <div className="flex items-start gap-3 overflow-hidden">
                <div className="h-12 w-12 rounded-[2px] bg-[#1E293B] border border-[#334155] overflow-hidden shrink-0 flex items-center justify-center font-bold font-mono text-[#1789E5]">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>
                <div className="overflow-hidden">
                  <div className="font-heading text-sm font-bold text-[#FFFFFF] truncate">{member.name}</div>
                  <div className="text-xs text-[#1789E5] truncate">{member.role}</div>
                  <div className="text-[10px] font-mono text-[#64748B] mt-1 uppercase">{member.department}</div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleOpenEdit(member, index)}
                  className="p-1 text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[#1E293B] rounded cursor-pointer"
                  title="Edit member"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="p-1 text-red-400 hover:text-red-200 hover:bg-red-950/60 rounded cursor-pointer"
                  title="Remove member"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Member Edit / Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-[2px] border border-[#1E293B] bg-[#0D121A] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-4 mb-5">
              <h2 className="font-heading text-xl font-bold text-[#FFFFFF]">
                {editingIndex !== null ? 'Edit Member' : 'Add New Member'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-[#64748B] hover:text-[#FFFFFF] cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-xs text-[#94A3B8] block uppercase">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kartikay Mishra"
                  className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#1789E5] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-xs text-[#94A3B8] block uppercase">Role / Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Technical Lead"
                    className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#1789E5] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs text-[#94A3B8] block uppercase">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#1789E5] focus:outline-none"
                  >
                    <option value="Leadership">Leadership</option>
                    <option value="Technical Core">Technical Core</option>
                    <option value="Design & Social">Design & Social</option>
                    <option value="Events">Events</option>
                    <option value="Logistics">Logistics</option>
                    <option value="PR & Outreach">PR & Outreach</option>
                    <option value="Advisory">Advisory</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs text-[#94A3B8] block uppercase">Photo Image URL</label>
                <input
                  type="text"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://... or /src/assets/..."
                  className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#1789E5] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-xs text-[#94A3B8] block uppercase">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.linkedin || ''}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#1789E5] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-xs text-[#94A3B8] block uppercase">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.github || ''}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#1789E5] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#1E293B]">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="font-mono text-xs">
                  CANCEL
                </Button>
                <Button type="submit" variant="primary" loading={saving} className="font-mono text-xs">
                  SAVE MEMBER
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
