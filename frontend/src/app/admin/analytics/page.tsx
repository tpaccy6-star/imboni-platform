'use client';

import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { Users, MousePointer2, Clock, Activity, Globe, Monitor, Smartphone, Tablet, BarChart3 } from 'lucide-react';

export default function AdminAnalytics() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/analytics/traffic', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('imboni_token')}` }
    })
      .then(res => res.json())
      .then(stats => {
        setData(stats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Analyzing records...</div>;

  const COLORS = ['#E1B12C', '#0A2647', '#3B82F6'];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-[#0A2647] dark:text-white mb-2">Website Analytics</h1>
          <p className="text-slate-500">Real-time audience monitoring and traffic distribution.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-bold">Week</button>
           <button className="px-4 py-2 bg-[#E1B12C] text-[#0A2647] rounded-lg text-sm font-bold">Month</button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Users', value: data?.totalUsers, growth: '+12%', icon: Users, color: 'text-blue-500' },
          { label: 'Active Sessions', value: data?.activeSessions, growth: '+5%', icon: Activity, color: 'text-green-500' },
          { label: 'Avg. Duration', value: '4m 32s', growth: '-2%', icon: Clock, color: 'text-yellow-500' },
          { label: 'Bounce Rate', value: '24.5%', growth: '-10%', icon: MousePointer2, color: 'text-purple-500' },
        ].map((m, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl bg-slate-50 dark:bg-white/5 ${m.color}`}>
                   <m.icon size={24} />
                </div>
                <span className={`text-xs font-bold ${m.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{m.growth}</span>
             </div>
             <p className="text-sm font-bold text-slate-400 mb-1">{m.label}</p>
             <h3 className="text-3xl font-black text-[#0A2647] dark:text-white">{m.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Traffic Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-2xl">
           <h3 className="text-xl font-bold mb-10 flex items-center gap-3">
             <BarChart3 className="text-[#E1B12C]" />
             User Interactivity Flow
           </h3>
           <div className="h-[400px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data?.trafficChart}>
                 <defs>
                   <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#E1B12C" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#E1B12C" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.3}/>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
                 <RechartsTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                 <Area type="monotone" dataKey="visits" stroke="#E1B12C" strokeWidth={4} fillOpacity={1} fill="url(#colorVisits)" />
                 <Area type="monotone" dataKey="sessions" stroke="#0A2647" strokeWidth={4} fill="transparent" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-[#0A2647] p-10 rounded-[3rem] text-white flex flex-col items-center justify-center text-center shadow-2xl">
           <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
             <Monitor className="text-[#E1B12C]" />
             Device Access
           </h3>
           <div className="h-[250px] w-full mb-8">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={data?.deviceStats}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={90}
                   paddingAngle={10}
                   dataKey="value"
                 >
                   {data?.deviceStats.map((entry: any, index: any) => (
                     <Cell key={`cell-${index}`} fill={index === 0 ? '#E1B12C' : index === 1 ? '#3B82F6' : '#94A3B8'} stroke="none" />
                   ))}
                 </Pie>
                 <RechartsTooltip />
               </PieChart>
             </ResponsiveContainer>
           </div>
           
           <div className="grid grid-cols-3 gap-6 w-full">
              {[
                { name: 'Desktop', val: '65%', icon: Monitor },
                { name: 'Mobile', val: '30%', icon: Smartphone },
                { name: 'Tablet', val: '5%', icon: Tablet },
              ].map((d, i) => (
                <div key={i} className="space-y-2">
                   <d.icon className="mx-auto text-slate-400" size={18} />
                   <p className="font-bold text-lg">{d.val}</p>
                   <p className="text-[10px] text-slate-400 uppercase tracking-widest">{d.name}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
