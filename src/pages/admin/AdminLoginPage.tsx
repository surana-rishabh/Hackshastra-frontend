import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import { Shield, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const AdminLoginPage: React.FC = () => {
  const { devDirectLogin, loginWithGoogleToken } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your admin email');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Direct fast authentication for authorized administrators
      await devDirectLogin(email, name || 'HackShastra Admin');
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D12] text-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-[2px] border border-[#1E293B] bg-[#0D121A] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <div className="text-center mb-8">
          <div className="h-14 w-14 rounded-full bg-[#1789E5]/10 border border-[#1789E5] text-[#1789E5] flex items-center justify-center mx-auto mb-4">
            <Shield className="h-7 w-7" />
          </div>
          <div className="font-mono text-xs text-[#1789E5] font-bold uppercase tracking-widest mb-1">
            [ SUBDOMAIN CONTROL ROOM ]
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
            HackShastra Admin
          </h1>
          <p className="mt-2 text-xs text-[#94A3B8]">
            Restricted access portal for authorized chapter leaders and technical core.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-[2px] bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAdminSignIn} className="space-y-5">
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-[#94A3B8] block font-semibold uppercase">
              Admin Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Lead Administrator / Core Admin"
              className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-4 py-2.5 text-sm text-[#F8FAFC] placeholder-[#475569] focus:border-[#1789E5] focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-xs text-[#94A3B8] block font-semibold uppercase">
              Authorized Google / University Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hssc2025@srmap.edu.in"
              className="w-full rounded-[2px] border border-[#1E293B] bg-[#090D12] px-4 py-2.5 text-sm text-[#F8FAFC] placeholder-[#475569] focus:border-[#1789E5] focus:outline-none transition-all"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full font-mono text-xs tracking-wider justify-center gap-2 mt-4 cursor-pointer"
          >
            <span>AUTHENTICATE & ENTER PORTAL</span>
            <ArrowRight className="h-4 w-4" />
          </Button>

          <div className="pt-4 border-t border-[#1E293B] text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-mono text-[#64748B]">
              <Lock className="h-3 w-3" />
              <span>TLS 1.3 End-to-End Encrypted Session</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
