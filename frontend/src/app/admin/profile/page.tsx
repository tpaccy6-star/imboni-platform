'use client';

import React, { useState } from 'react';
import { User, Mail, Lock, Shield, Settings, Key } from 'lucide-react';
import StatusModal from '@/components/StatusModal';

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: 'Webmaster Admin',
    email: 'admin@imbonihub.com',
    role: 'SUPERADMIN',
    password: ''
  });
  
  const [modal, setModal] = useState({ isOpen: false, type: 'success' as 'success' | 'error', title: '', message: '' });
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Simulate updating API endpoint
    setTimeout(() => {
      setSaving(false);
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Profile Updated',
        message: 'Your personal information has been successfully updated.'
      });
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <StatusModal 
        isOpen={modal.isOpen} 
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-[#0A2647] dark:text-white mb-2">My Profile</h1>
          <p className="text-slate-500">Manage your personal information and security settings.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2 px-8"
        >
          {saving ? 'Updating...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card Sidebar */}
        <div className="md:col-span-1 space-y-6">
           <div className="bg-[#0A2647] p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 w-full h-32 bg-gradient-to-br from-[#E1B12C]/20 to-transparent" />
              <div className="relative z-10 w-24 h-24 bg-[#E1B12C] text-[#0A2647] rounded-full flex items-center justify-center text-3xl font-black mb-6 shadow-2xl ring-8 ring-white/10">
                 {profile.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold mb-1">{profile.name}</h3>
              <p className="text-sm text-slate-300 font-bold bg-white/10 px-4 py-1.5 rounded-full mt-2 inline-flex items-center gap-2">
                 <Shield size={14} className="text-[#E1B12C]" />
                 {profile.role}
              </p>
           </div>
        </div>

        {/* Profile Information Form */}
        <div className="md:col-span-2 space-y-8">
           <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-white/5 space-y-6">
              <h3 className="text-xl font-bold text-[#0A2647] dark:text-white mb-6 flex items-center gap-3">
                 <User className="text-[#E1B12C]" size={24} />
                 Personal Information
              </h3>
              
              <div className="space-y-4">
                 <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-2">Full Name</label>
                    <div className="relative">
                       <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input 
                         type="text" 
                         value={profile.name}
                         onChange={(e) => setProfile({...profile, name: e.target.value})}
                         className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-[#E1B12C]" 
                       />
                    </div>
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-2">Email Address</label>
                    <div className="relative">
                       <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input 
                         type="email" 
                         value={profile.email}
                         onChange={(e) => setProfile({...profile, email: e.target.value})}
                         className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-[#E1B12C]" 
                       />
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-white/5 space-y-6">
              <h3 className="text-xl font-bold text-[#0A2647] dark:text-white mb-6 flex items-center gap-3">
                 <Lock className="text-[#E1B12C]" size={24} />
                 Security
              </h3>
              
              <div className="space-y-4">
                 <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-2">Change Password</label>
                    <div className="relative">
                       <Key size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input 
                         type="password" 
                         placeholder="Leave blank to keep current"
                         value={profile.password}
                         onChange={(e) => setProfile({...profile, password: e.target.value})}
                         className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-[#E1B12C]" 
                       />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
