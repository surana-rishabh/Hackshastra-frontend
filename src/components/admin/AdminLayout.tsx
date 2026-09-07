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
    <div className="min-h-screen bg-[#FCF6D9] text-[#0F172A] flex flex-col md:flex-row font-body">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#9CC6DB] border-b md:border-b-0 md:border-r border-[#85b5cd] flex flex-col shrink-0">
        <div className="p-5 border-b border-[#85b5cd] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
            <div>
              <div className="font-heading text-sm font-bold text-[#0F172A] tracking-tight">
                HACKSHASTRA
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#CF4B00] font-black">
                ADMIN COMMAND
              </div>
            </div>
          </div>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#CF4B00] text-[#FFFFFF]">
            v2.0
          </span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5 flex-1">
          <div className="font-mono text-[10px] text-[#0F172A]/70 uppercase tracking-wider px-3 py-1 font-bold">
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
                    ? 'bg-[#CF4B00] text-[#FFFFFF] font-bold shadow-[0_2px_10px_rgba(207,75,0,0.3)]'
                    : 'text-[#0F172A] hover:bg-[#FCF6D9] hover:text-[#CF4B00] font-semibold'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Card & Action Footer */}
        <div className="p-4 border-t border-[#85b5cd] bg-[#9CC6DB]/80 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#CF4B00] text-[#FFFFFF] flex items-center justify-center font-bold font-mono text-sm">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden flex-1">
              <div className="text-xs font-bold text-[#0F172A] truncate">{user?.name || 'Administrator'}</div>
              <div className="text-[10px] font-mono text-[#0F172A]/80 truncate font-medium">{user?.email || 'hssc2025@srmap.edu.in'}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 py-1.5 rounded-[2px] bg-[#FCF6D9] border border-[#85b5cd] text-[11px] font-mono text-[#0F172A] hover:text-[#CF4B00] font-bold transition-colors"
            >
              <Globe className="h-3 w-3" />
              <span>LIVE SITE</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1 py-1.5 rounded-[2px] bg-[#CF4B00] text-[#FFFFFF] text-[11px] font-mono hover:bg-[#b04000] font-bold transition-colors cursor-pointer"
            >
              <LogOut className="h-3 w-3" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-[#FCF6D9] overflow-y-auto">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
