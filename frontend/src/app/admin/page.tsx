'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState({
    stats: {
      totalOpportunities: 0,
      activeRequests: 0,
      monthlyScholars: 0,
      leadsConvertedPercent: 0
    },
    recentRequests: [],
    popularOpportunities: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('imboni_token')}` }
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else if (res.status === 401) {
          router.push('/admin/login');
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboard();
  }, [router]);

  const statsRender = [
    { label: "Total Opportunities", value: data.stats.totalOpportunities.toString(), icon: "🚀", trend: "Live Metric" },
    { label: "Active Requests", value: data.stats.activeRequests.toString(), icon: "📑", trend: "Live Metric" },
    { label: "Monthly Scholars", value: data.stats.monthlyScholars.toString(), icon: "🎓", trend: "Live Metric" },
    { label: "Leads Converted", value: `${data.stats.leadsConvertedPercent}%`, icon: "✅", trend: "Calculated" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-white/5 gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2647] dark:text-white">Welcome back, Admin</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">Here's what's happening at Imboni Hub today.</p>
        </div>
        <button onClick={() => router.push('/admin/upload')} className="btn-primary !py-2.5 w-full sm:w-auto flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Quick Upload
        </button>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
            {[1,2,3,4].map(i => <div key={i} className="bg-slate-100 dark:bg-slate-800 h-32 rounded-2xl"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsRender.map((s, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">{s.icon}</span>
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${
                  i % 2 === 0 ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                }`}>
                  {s.trend}
                </span>
              </div>
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest">{s.label}</h3>
              <p className="text-2xl sm:text-3xl font-bold text-[#0A2647] dark:text-white mt-1">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Service Requests */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#0A2647] dark:text-white">Recent Requests</h3>
            <button className="text-[#205295] dark:text-[#E1B12C] font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px] sm:min-w-0">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/5 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                  <th className="px-6 sm:px-8 py-4">Client Name</th>
                  <th className="px-6 sm:px-8 py-4">Service</th>
                  <th className="px-6 sm:px-8 py-4">Status</th>
                  <th className="px-6 sm:px-8 py-4 hidden sm:table-cell">Time</th>
                  <th className="px-6 sm:px-8 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                {data.recentRequests && data.recentRequests.length > 0 ? data.recentRequests.map((r: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 sm:px-8 py-4 font-bold text-[#0A2647] dark:text-white">{r.name}</td>
                    <td className="px-6 sm:px-8 py-4 text-slate-500 dark:text-slate-400">{r.service}</td>
                    <td className="px-6 sm:px-8 py-4">
                       <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                         r.status === 'New' ? 'bg-blue-500/10 text-blue-500' : 
                         r.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                       }`}>
                         {r.status}
                       </span>
                    </td>
                    <td className="px-6 sm:px-8 py-4 text-slate-400 text-sm hidden sm:table-cell">{new Date(r.date).toLocaleDateString()}</td>
                    <td className="px-6 sm:px-8 py-4 text-right">
                      <button className="text-slate-300 hover:text-[#0A2647] dark:hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-8 text-center text-slate-400">No recent requests found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Opportunities / Quick Actions */}
        <div className="bg-[#0A2647] dark:bg-slate-900 border dark:border-white/5 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col min-h-[400px]">
           <h3 className="text-xl font-bold mb-6">Popular Scholarships</h3>
           <div className="space-y-4 flex-1 relative z-10">
             {data.popularOpportunities && data.popularOpportunities.length > 0 ? data.popularOpportunities.map((op: any, index: number) => (
               <div key={op.id} className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#E1B12C]/20 text-[#E1B12C] font-bold flex items-center justify-center text-xs">
                        #{index + 1}
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-white line-clamp-1">{op.title}</h4>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{op.tag}</span>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="text-[#E1B12C] font-bold">{op.viewCount}</span>
                    <p className="text-[10px] text-slate-400">Views</p>
                 </div>
               </div>
             )) : (
                <div className="p-4 text-center text-slate-400 text-sm">No analytics available yet</div>
             )}
           </div>
           
           <div className="absolute bottom-4 right-4 opacity-10">
             <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20">
               <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
             </svg>
           </div>
        </div>
      </div>
    </div>
  );
}
