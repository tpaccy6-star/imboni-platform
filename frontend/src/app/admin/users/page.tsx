'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  MoreVertical, 
  Shield, 
  Trash2, 
  Mail, 
  Activity,
  Filter
} from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/users`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('imboni_token')}` }
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/users/role`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('imboni_token')}`
      },
      body: JSON.stringify({ userId, role: newRole })
    });
    if (res.ok) fetchUsers();
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold text-[#0A2647] dark:text-white mb-2">User Management</h1>
          <p className="text-slate-500">Manage system roles, permissions, and administrative access levels.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 !px-8 h-14">
          <UserPlus size={20} />
          Create New User
        </button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
        <div className="relative flex-1 w-full">
           <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
           <input 
             type="text" 
             placeholder="Search by name, email or role..." 
             className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl focus:ring-2 focus:ring-[#E1B12C] outline-none transition-all"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
        <div className="flex gap-2">
           <button className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-slate-500 hover:text-[#0A2647]">
             <Filter size={20} />
           </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-slate-400 font-bold text-xs uppercase tracking-widest border-b border-slate-100 dark:border-white/5">
                <th className="px-8 py-5">Full Name</th>
                <th className="px-8 py-5">System Role</th>
                <th className="px-8 py-5">Activity</th>
                <th className="px-8 py-5">2FA Status</th>
                <th className="px-8 py-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="p-12 text-center animate-pulse">Synchronizing directory...</td></tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold mb-0">
                          {user.name?.[0] || user.email[0]}
                       </div>
                       <div>
                         <p className="font-bold text-[#0A2647] dark:text-white">{user.name || 'No Name'}</p>
                         <p className="text-xs text-slate-400">{user.email}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <select 
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="bg-slate-100 dark:bg-white/10 dark:text-white px-3 py-1.5 rounded-lg text-xs font-bold border-none outline-none focus:ring-2 focus:ring-[#E1B12C]"
                    >
                      <option value="VIEWER">Viewer</option>
                      <option value="EDITOR">Editor</option>
                      <option value="ADMIN">Admin</option>
                      <option value="SUPERADMIN">Super Admin</option>
                    </select>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <Activity size={14} className="text-green-500" />
                       <span className="text-xs font-medium text-slate-500">{user._count?.auditLogs} operations performed</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${user.twoFactorEnabled ? 'bg-green-500/10 text-green-500' : 'bg-slate-100 text-slate-400'}`}>
                       {user.twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button title="View Logs" className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-400 transition-all">
                          <Activity size={18} />
                       </button>
                       <button title="Restrict Access" className="p-2 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 rounded-lg text-yellow-500 transition-all">
                          <Shield size={18} />
                       </button>
                       <button title="Delete Account" className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg text-red-400 transition-all">
                          <Trash2 size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
