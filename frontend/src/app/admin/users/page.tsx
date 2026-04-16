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

  const handleDeleteUser = async (userId: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete the user "${name}"? This action cannot be undone.`)) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('imboni_token')}` }
      });
      if (res.ok) fetchUsers();
      else alert("Failed to delete user. Ensure you have Super Admin privileges.");
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 sm:space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0A2647] dark:text-white mb-2">User Management</h1>
          <p className="text-slate-500 text-sm sm:text-base">Manage system roles, permissions, and administrative access levels.</p>
        </div>
        <button className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto !px-8 h-12 sm:h-14">
          <UserPlus size={20} />
          Create New User
        </button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
        <div className="relative flex-1 w-full">
           <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
           <input 
             type="text" 
             placeholder="Search by name, email or role..." 
             className="w-full pl-12 pr-4 py-2.5 sm:py-3 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl focus:ring-2 focus:ring-[#E1B12C] outline-none transition-all text-sm sm:text-base"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <button className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-slate-500 hover:text-[#0A2647] flex-1 md:flex-none flex justify-center">
             <Filter size={20} />
           </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl sm:rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[500px] sm:min-w-0">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-slate-400 font-bold text-[10px] uppercase tracking-widest border-b border-slate-100 dark:border-white/5">
                <th className="px-6 sm:px-8 py-5">Full Name</th>
                <th className="px-6 sm:px-8 py-5">System Role</th>
                <th className="px-6 sm:px-8 py-5 hidden lg:table-cell">Activity</th>
                <th className="px-6 sm:px-8 py-5 hidden md:table-cell">2FA Status</th>
                <th className="px-6 sm:px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="p-12 text-center animate-pulse tracking-widest text-[#0A2647] dark:text-white font-bold uppercase text-xs">Synchronizing directory...</td></tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 sm:px-8 py-5 sm:py-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                       <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                          {user.name?.[0] || user.email[0]}
                       </div>
                       <div className="min-w-0">
                         <p className="font-bold text-[#0A2647] dark:text-white truncate text-sm sm:text-base">{user.name || 'No Name'}</p>
                         <p className="text-[11px] sm:text-xs text-slate-400 truncate">{user.email}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 sm:px-8 py-5 sm:py-6">
                    <select 
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="bg-slate-100 dark:bg-white/10 dark:text-white px-2 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold border-none outline-none focus:ring-2 focus:ring-[#E1B12C]"
                    >
                      <option value="VIEWER" className="dark:bg-slate-900">Viewer</option>
                      <option value="EDITOR" className="dark:bg-slate-900">Editor</option>
                      <option value="ADMIN" className="dark:bg-slate-900">Admin</option>
                      <option value="SUPERADMIN" className="dark:bg-slate-900">Super Admin</option>
                    </select>
                  </td>
                  <td className="px-6 sm:px-8 py-5 sm:py-6 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                       <Activity size={14} className="text-green-500" />
                       <span className="text-xs font-medium text-slate-500">{user._count?.auditLogs} ops</span>
                    </div>
                  </td>
                  <td className="px-6 sm:px-8 py-5 sm:py-6 hidden md:table-cell">
                    <span className={`px-2 py-1 rounded-full text-[9px] font-black tracking-widest ${user.twoFactorEnabled ? 'bg-green-500/10 text-green-500' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                       {user.twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
                    </span>
                  </td>
                  <td className="px-6 sm:px-8 py-5 sm:py-6 text-right">
                    <div className="flex items-center justify-end gap-1 sm:gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                       <button onClick={() => alert("Audit log viewer...")} title="View Logs" className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-400 transition-all">
                          <Activity size={16} />
                       </button>
                       <button onClick={() => handleDeleteUser(user.id, user.name || user.email)} title="Delete Account" className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg text-red-400 transition-all">
                          <Trash2 size={16} />
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
