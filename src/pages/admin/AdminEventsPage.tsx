import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Radio,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const AdminEventsPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    eventType: 'HACKATHON',
    startDate: '',
    endDate: '',
    location: 'SRM University-AP',
    capacity: 500,
    status: 'PUBLISHED',
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/api/admin/events');
      if (res.success && res.data) {
        setEvents(res.data.events || res.data || []);
      }
    } catch (err) {
      console.error('Error fetching admin events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenCreate = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      eventType: 'HACKATHON',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      location: 'SRM University-AP',
      capacity: 500,
      status: 'PUBLISHED',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (ev: any) => {
    setEditingEvent(ev);
    setFormData({
      title: ev.title || '',
      subtitle: ev.subtitle || '',
      description: ev.description || '',
      eventType: ev.event_type || ev.eventType || 'HACKATHON',
      startDate: ev.start_date ? ev.start_date.split('T')[0] : '',
      endDate: ev.end_date ? ev.end_date.split('T')[0] : '',
      location: ev.location || 'SRM University-AP',
      capacity: ev.capacity || 500,
      status: ev.status || 'PUBLISHED',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this event from the database?')) return;
    try {
      await api.delete(`/api/admin/events/${id}`);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      setMessage('Event removed from database successfully.');
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to delete event');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingEvent) {
        await api.put(`/api/admin/events/${editingEvent.id}`, formData);
        setMessage('Event updated in database.');
      } else {
        await api.post('/api/admin/events', formData);
        setMessage('Event created and saved in database.');
      }
      setModalOpen(false);
      fetchEvents();
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Error saving event');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="font-mono text-xs uppercase text-[#0DA5F0] font-bold mb-1">
            [ DATABASE EVENT HUB ]
          </div>
          <h1 className="font-heading text-3xl font-bold text-[#FFFFFF]">
            Manage Hackathons & Events
          </h1>
        </div>

        <Button onClick={handleOpenCreate} variant="primary" size="sm" className="font-mono text-xs gap-1.5 cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>ADD NEW EVENT</span>
        </Button>
      </div>

      {message && (
        <div className="p-3 rounded-[2px] bg-emerald-950/40 border border-emerald-800 text-emerald-300 font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}

      {/* Events Table / Card List */}
      <div className="rounded-[2px] border border-[#1E293B] bg-[#0D121A] overflow-hidden">
        <div className="p-4 border-b border-[#1E293B] font-mono text-xs text-[#94A3B8] uppercase flex items-center justify-between font-bold">
          <span>SCHEDULED EVENTS ({events.length})</span>
          <span className="text-[10px] text-[#0DA5F0]">REALTIME POSTGRESQL SYNC</span>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12 text-[#64748B] font-mono text-xs">
            No events found in database. Click "Add New Event" to publish one.
          </div>
        ) : (
          <div className="divide-y divide-[#1E293B]">
            {events.map((ev, idx) => (
              <div key={ev.id ? `event-${ev.id}` : `event-${ev.title}-${idx}`} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#121824] transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-lg font-bold text-[#FFFFFF]">{ev.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0DA5F0]/10 text-[#0DA5F0] border border-[#0DA5F0]/30 font-semibold">
                      {ev.event_type || ev.eventType || 'EVENT'}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                      {ev.status || 'PUBLISHED'}
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] max-w-xl">{ev.description || ev.subtitle}</p>
                  <div className="flex items-center gap-4 text-[11px] font-mono text-[#64748B] pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-[#0DA5F0]" /> {ev.start_date ? new Date(ev.start_date).toLocaleDateString() : 'Upcoming 2026'}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-[#0DA5F0]" /> {ev.location || 'SRM University-AP'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    onClick={() => handleOpenEdit(ev)}
                    variant="outline"
                    size="sm"
                    className="font-mono text-xs border-[#334155] text-[#F8FAFC] hover:border-[#0DA5F0]"
                  >
                    <Edit3 className="h-3.5 w-3.5 mr-1" />
                    <span>EDIT</span>
                  </Button>
                  <Button
                    onClick={() => handleDelete(ev.id)}
                    variant="outline"
                    size="sm"
                    className="font-mono text-xs border-red-900 text-red-400 hover:bg-red-950/60"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    <span>DELETE</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Event Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full rounded-[2px] border border-[#1E293B] bg-[#0D121A] p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-4 mb-5">
              <h2 className="font-heading text-xl font-bold text-[#FFFFFF]">
                {editingEvent ? 'Edit Event Details' : 'Create New Event'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-[#64748B] hover:text-[#FFFFFF] cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-xs text-[#94A3B8] block uppercase">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. HackShastra National Hackathon 2026"
                  className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#0DA5F0] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-xs text-[#94A3B8] block uppercase">Event Type</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#0DA5F0] focus:outline-none"
                  >
                    <option value="HACKATHON">HACKATHON</option>
                    <option value="WORKSHOP">WORKSHOP</option>
                    <option value="BOOTCAMP">BOOTCAMP</option>
                    <option value="EXPO">EXPO</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs text-[#94A3B8] block uppercase">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#0DA5F0] focus:outline-none"
                  >
                    <option value="PUBLISHED">PUBLISHED (Live)</option>
                    <option value="DRAFT">DRAFT (Hidden)</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs text-[#94A3B8] block uppercase">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details about format, prize pool, mentors..."
                  className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#0DA5F0] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-xs text-[#94A3B8] block uppercase">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#0DA5F0] focus:outline-none"
                  >
                  </input>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs text-[#94A3B8] block uppercase">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#0DA5F0] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#1E293B]">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="font-mono text-xs">
                  CANCEL
                </Button>
                <Button type="submit" variant="primary" loading={saving} className="font-mono text-xs">
                  SAVE TO DATABASE
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
