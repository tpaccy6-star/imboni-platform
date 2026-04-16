'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  BarChart3, 
  ShieldCheck, 
  Bell, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Activity
} from 'lucide-react';
import AdminChatbot from '@/components/AdminChatbot';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('imboni_token');
    if (!token) {
      router.push('/login');
    } else {
      // Simplistic decode/fetch for now
      setUser({ role: 'SUPERADMIN', name: 'Webmaster' });
      setLoading(false);
    }
  }, [router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
       <div className="w-12 h-12 border-4 border-[#E1B12C] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const menuItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'User Management', path: '/admin/users', icon: Users, role: ['SUPERADMIN', 'ADMIN'] },
    { label: 'Content (CMS)', path: '/admin/cms', icon: FileText, role: ['SUPERADMIN', 'ADMIN', 'EDITOR'] },
    { label: 'Audit Trails', path: '/admin/logs', icon: ShieldCheck, role: ['SUPERADMIN'] },
    { label: 'System Health', path: '/admin/health', icon: Activity, role: ['SUPERADMIN'] },
    { label: 'Platform Settings', path: '/admin/settings', icon: Settings, role: ['SUPERADMIN', 'ADMIN'] },
    { label: 'My Profile', path: '/admin/profile', icon: Users, role: ['SUPERADMIN', 'ADMIN', 'EDITOR'] },
  ];

  const handleLogout = () => {
    localStorage.removeItem('imboni_token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] flex transition-colors duration-500">
      {/* Dynamic Sidebar */}
      <aside className={`bg-[#0A2647] text-white flex flex-col transition-all duration-300 relative border-r border-white/5 ${collapsed ? 'w-20' : 'w-72'}`}>
        <div className="p-6 mb-8 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E1B12C] text-[#0A2647] rounded-xl flex items-center justify-center font-bold">I</div>
              <span className="font-extrabold text-xl tracking-tighter">IMBONI <span className="text-[#E1B12C]">PRO</span></span>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.filter(item => !item.role || item.role.includes(user?.role)).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
                  active 
                  ? 'bg-[#E1B12C] text-[#0A2647] font-bold shadow-lg shadow-yellow-500/10' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={20} className={active ? 'text-[#0A2647]' : 'group-hover:scale-110 transition-transform'} />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
           <div className={`flex items-center gap-4 p-4 rounded-2xl bg-white/5 ${collapsed ? 'justify-center' : ''}`}>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{user?.name}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">{user?.role}</p>
                </div>
              )}
              <button 
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 p-2 hover:bg-white/5 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content Hub */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header Bar */}
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 z-20">
           <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-[#0A2647] dark:text-white capitalize">
                {pathname.split('/').pop() || 'Dashboard'}
              </h2>
           </div>
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase tracking-wider">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Systems Operational
              </div>
              <button className="relative p-2 text-slate-400 hover:text-[#0A2647] dark:hover:text-white transition-colors">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="avatar" />
              </div>
           </div>
        </header>

         <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12">
           {children}
         </div>
         
         <AdminChatbot />
       </main>
     </div>
   );
 }
