import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Mail, 
  ShieldCheck,
  Archive,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const AdminContactPage: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/contact');
      if (res.success && res.data) {
        setMessages(res.data.contactRequests || res.data || []);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    const handleSync = () => fetchContacts();
    window.addEventListener('hackshastra-db-sync', handleSync);
    return () => window.removeEventListener('hackshastra-db-sync', handleSync);
  }, []);

  const updateStatus = async (id: string | number, status: string) => {
    try {
      await api.put(`/api/admin/contact/${id}`, { status });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="font-mono text-xs uppercase text-[#1789E5] font-bold mb-1">
            [ VERIFIED COMMUNICATIONS ]
          </div>
          <h1 className="font-heading text-3xl font-bold text-[#FFFFFF]">
            Contact & Partnership Inquiries
          </h1>
        </div>

        <Button onClick={fetchContacts} variant="outline" size="sm" className="font-mono text-xs gap-1.5 cursor-pointer">
          <RefreshCw className="h-3.5 w-3.5" />
          <span>REFRESH INBOX</span>
        </Button>
      </div>

      <div className="rounded-[2px] border border-[#1E293B] bg-[#0D121A] overflow-hidden">
        <div className="p-4 border-b border-[#1E293B] font-mono text-xs text-[#94A3B8] uppercase flex items-center justify-between font-bold">
          <span>ALL MESSAGES ({messages.length})</span>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> OTP VERIFIED SENDER IDENTITY
          </span>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-16 text-[#64748B] font-mono text-xs">
            No incoming contact messages yet.
          </div>
        ) : (
          <div className="divide-y divide-[#1E293B]">
            {messages.map((item) => (
              <div key={item.id} className="p-5 space-y-3 hover:bg-[#121824] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-base font-bold text-[#FFFFFF]">{item.name}</span>
                    <a
                      href={`mailto:${item.email}`}
                      className="font-mono text-xs text-[#1789E5] hover:underline flex items-center gap-1"
                    >
                      <Mail className="h-3 w-3" />
                      <span>{item.email}</span>
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                      item.status === 'RESOLVED'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {item.status || 'NEW'}
                    </span>
                    <span className="text-[11px] font-mono text-[#64748B]">
                      {item.created_at ? new Date(item.created_at).toLocaleString() : ''}
                    </span>
                  </div>
                </div>

                <div className="font-heading text-sm font-semibold text-[#CBD5E1]">
                  Subject: {item.subject}
                </div>

                <p className="text-xs text-[#94A3B8] bg-[#090D12] p-3 rounded-[2px] border border-[#1E293B] leading-relaxed whitespace-pre-wrap">
                  {item.message}
                </p>

                <div className="flex items-center justify-end gap-2 pt-2">
                  {item.status !== 'RESOLVED' && (
                    <Button
                      onClick={() => updateStatus(item.id, 'RESOLVED')}
                      variant="outline"
                      size="sm"
                      className="font-mono text-xs border-emerald-900 text-emerald-400 hover:bg-emerald-950/60"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      <span>MARK RESOLVED</span>
                    </Button>
                  )}
                  {item.status !== 'ARCHIVED' && (
                    <Button
                      onClick={() => updateStatus(item.id, 'ARCHIVED')}
                      variant="outline"
                      size="sm"
                      className="font-mono text-xs border-[#334155] text-[#94A3B8] hover:text-[#FFFFFF]"
                    >
                      <Archive className="h-3.5 w-3.5 mr-1" />
                      <span>ARCHIVE</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
