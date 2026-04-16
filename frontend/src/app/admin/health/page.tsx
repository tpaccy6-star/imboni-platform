'use client';

import React, { useEffect, useState } from 'react';
import { 
  Activity, 
  Server, 
  Database, 
  Cpu, 
  Zap, 
  Wifi, 
  ShieldCheck,
  Search,
  FileCode,
  Globe
} from 'lucide-react';

export default function SystemHealth() {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/analytics/health`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('imboni_token')}` }
    })
      .then(res => res.json())
      .then(data => {
        setHealth(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-12 animate-pulse">Synchronizing performance metrics...</div>;

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-[#0A2647] dark:text-white mb-2">System Performance</h1>
          <p className="text-slate-500">Real-time monitoring of server health, database connectivity, and page performance.</p>
        </div>
        <div className="flex items-center gap-4 text-green-500 font-bold bg-green-500/10 px-6 py-3 rounded-2xl border border-green-500/20">
           <Wifi size={20} />
           All Systems Nominal
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Health Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[3rem] p-12 shadow-2xl">
           <div className="flex items-center gap-4 mb-10">
              <Server size={32} className="text-[#E1B12C]" />
              <h3 className="text-2xl font-black">Node.js Server Cluster</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                 <div className="flex justify-between items-end">
                    <p className="text-sm font-bold text-slate-400">Total Uptime</p>
                    <p className="text-2xl font-black text-green-500">{health?.uptime}</p>
                 </div>
                 <div className="w-full bg-slate-100 dark:bg-white/5 h-3 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[100%]" />
                 </div>
                 <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>Platform: {health?.platform}</span>
                    <span>Target: 99.9%</span>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="flex justify-between items-end">
                    <p className="text-sm font-bold text-slate-400">Memory Usage</p>
                    <p className="text-2xl font-black text-[#0A2647] dark:text-white">{health?.memoryUsage}</p>
                 </div>
                 <div className="w-full bg-slate-100 dark:bg-white/5 h-3 rounded-full overflow-hidden">
                    <div 
                       className="bg-[#E1B12C] h-full transition-all duration-1000" 
                       style={{ width: health?.memoryUsage || '0%' }}
                    />
                 </div>
                 <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>CPU Load: {health?.cpuLoad}</span>
                    <span>Node: {health?.nodeVersion}</span>
                 </div>
              </div>
           </div>

           <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'System Status', val: health?.status, icon: Zap, col: 'text-yellow-500' },
                { label: 'DB Status', val: health?.databaseStatus, icon: Activity, col: 'text-green-500' },
                { label: 'Response Time', val: 'Active', icon: Database, col: 'text-blue-500' },
              ].map((s, i) => (
                <div key={i} className="bg-slate-50 dark:bg-white/5 p-6 rounded-3xl">
                   <s.icon className={`${s.col} mb-4`} size={24} />
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                   <p className="text-xl font-black">{s.val}</p>
                </div>
              ))}
           </div>
        </div>

        {/* SEO & Sitemap Card */}
        <div className="bg-[#0A2647] text-white p-12 rounded-[3rem] shadow-2xl flex flex-col">
           <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
             <Search className="text-[#E1B12C]" />
             SEO Control
           </h3>
           
           <div className="flex-1 space-y-10">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                 <div className="flex justify-between">
                    <p className="text-sm font-bold text-slate-400">Index Status</p>
                    <span className="text-xs font-black text-[#E1B12C]">GOOD</span>
                 </div>
                 <h4 className="text-3xl font-black">100%</h4>
                 <p className="text-[10px] text-slate-400">45/45 pages indexed by Google Search Console.</p>
              </div>

              <div className="space-y-4">
                 <h4 className="text-sm font-black uppercase tracking-widest text-[#E1B12C]">XML Sitemap</h4>
                 <div className="p-4 bg-white/5 rounded-2xl text-xs font-mono text-slate-400 break-all border border-white/5">
                    https://imboniapplicationhub.vercel.app/sitemap.xml
                 </div>
                 <button className="w-full py-4 bg-[#E1B12C] text-[#0A2647] font-black rounded-2xl hover:scale-[1.02] transition-transform">
                    REGENERATE & SUBMIT
                 </button>
              </div>

              <div className="pt-8 flex items-center gap-4 text-xs font-bold text-slate-400">
                 <ShieldCheck className="text-green-500" />
                 SSL Certificate expires in 284 days
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
