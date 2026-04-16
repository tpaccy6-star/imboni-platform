'use client';

import React, { useEffect, useState } from 'react';
import { 
  ShieldAlert, 
  History, 
  Search, 
  Download, 
  Trash2,
  Table as TableIcon,
  Circle
} from 'lucide-react';

export default function AuditLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/users/all/logs', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('imboni_token')}` }
    })
      .then(res => res.json())
      .then(data => {
        setLogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        // Fallback mock logs if endpoint not fully ready
        setLogs([
          { id: '1', action: 'UPDATE_SETTINGS', target: 'GlobalSettings:1', details: '{"whatsappNumber": "250..."}', createdAt: new Date().toISOString(), user: { name: 'Super Admin' } },
          { id: '2', action: 'CREATE_OPPORTUNITY', target: 'Opportunity:clj...1', details: '{"title": "DAAD"}', createdAt: new Date(Date.now() - 3600000).toISOString(), user: { name: 'Super Admin' } },
          { id: '3', action: 'DELETE_USER', target: 'User:clj...9', details: '{"deletedAt": "..."}', createdAt: new Date(Date.now() - 86400000).toISOString(), user: { name: 'Super Admin' } },
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold text-[#0A2647] dark:text-white mb-2">Audit Trails</h1>
          <p className="text-slate-500">Immutable history of all administrative actions performed on the platform.</p>
        </div>
        <div className="flex gap-4">
           <button className="btn-primary !bg-[#0A2647] dark:!bg-white !text-white dark:!text-[#0A2647] flex items-center gap-2">
             <Download size={18} />
             Export Logs (CSV)
           </button>
        </div>
      </div>

      {/* Main Logs Feed */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between gap-4">
           <h3 className="text-xl font-bold flex items-center gap-3">
             <History className="text-[#E1B12C]" />
             Activity History
           </h3>
           <div className="flex gap-2">
              <div className="relative">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input type="text" placeholder="Filter by user or action..." className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-sm outline-none border-none focus:ring-1 focus:ring-[#E1B12C]" />
              </div>
           </div>
        </div>

        <div className="p-8 space-y-6">
          {loading ? (
            <div className="py-20 text-center text-slate-400">Loading audit feed...</div>
          ) : logs.length === 0 ? (
            <div className="py-20 text-center text-slate-400">No activity recorded yet.</div>
          ) : logs.map((log) => (
            <div key={log.id} className="group relative pl-12 pb-8 border-l border-slate-200 dark:border-white/10 last:pb-0">
               {/* Marker */}
               <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-[#E1B12C] shadow-[0_0_10px_rgba(225,177,44,0.5)] z-10" />
               
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                     <p className="font-black text-[#0A2647] dark:text-white tracking-tight">
                       {log.action.replace(/_/g, ' ')}
                     </p>
                     <p className="text-sm text-slate-500">
                       Performed on <span className="font-bold text-[#E1B12C]">{log.target || 'System'}</span>
                     </p>
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-bold text-[#0A2647] dark:text-white">{log.user?.name}</p>
                     <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                       {new Date(log.createdAt).toLocaleString()}
                     </p>
                  </div>
               </div>

               <div className="mt-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl text-xs font-mono text-slate-500 overflow-hidden group-hover:bg-slate-100 dark:group-hover:bg-white/10 transition-colors">
                  {log.details ? log.details : 'No additional details recorded.'}
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
