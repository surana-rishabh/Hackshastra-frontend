import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  FileText, 
  LogOut, 
  ArrowUpRight, 
  LayoutDashboard,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Events Hub', href: '/admin/events', icon: Calendar },
    { label: 'Team Directory', href: '/admin/team', icon: Users },
    { label: 'Contact Messages', href: '/admin/contact', icon: MessageSquare },
    { label: 'Site Content', href: '/admin/content', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#090D12] text-[#F8FAFC] flex flex-col md:flex-row font-body">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0D121A] border-b md:border-b-0 md:border-r border-[#1E293B] flex flex-col shrink-0">
        <div className="p-5 border-b border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="Logo" className="h-7 w-7" />
            <div>
              <div className="font-heading text-sm font-bold text-[#FFFFFF] tracking-tight">
                HACKSHASTRA
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#0DA5F0]">
                ADMIN COMMAND
              </div>
            </div>
          </div>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0DA5F0]/10 text-[#0DA5F0] border border-[#0DA5F0]/30">
            v2.0
          </span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5 flex-1">
          <div className="font-mono text-[10px] text-[#64748B] uppercase tracking-wider px-3 py-1 font-semibold">
            WORKSPACE MANAGEMENT
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/admin' && location.pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-[2px] font-mono text-xs transition-colors',
                  isActive
                    ? 'bg-[#0DA5F0] text-[#FFFFFF] font-bold shadow-[0_2px_10px_rgba(13,165,240,0.3)]'
                    : 'text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[#1E293B]/60'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Card & Action Footer */}
        <div className="p-4 border-t border-[#1E293B] bg-[#0A0E14] space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#0DA5F0]/20 border border-[#0DA5F0] text-[#0DA5F0] flex items-center justify-center font-bold font-mono text-sm">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden flex-1">
              <div className="text-xs font-bold text-[#F8FAFC] truncate">{user?.name || 'Administrator'}</div>
              <div className="text-[10px] font-mono text-[#64748B] truncate">{user?.email || 'admin@hackshastra.org'}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 py-1.5 rounded-[2px] bg-[#1E293B] text-[11px] font-mono text-[#94A3B8] hover:text-[#FFFFFF] transition-colors"
            >
              <Globe className="h-3 w-3" />
              <span>LIVE SITE</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1 py-1.5 rounded-[2px] bg-red-950/40 border border-red-900/50 text-[11px] font-mono text-red-400 hover:bg-red-900/60 hover:text-red-200 transition-colors cursor-pointer"
            >
              <LogOut className="h-3 w-3" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-[#090D12] overflow-y-auto">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
