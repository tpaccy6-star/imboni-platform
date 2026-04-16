'use client';

import React, { useState, useEffect } from 'react';
import StatusModal from '@/components/StatusModal';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    whatsappNumber: '',
    contactPhone: '',
    contactEmail: '',
    instagramHandle: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<{ isOpen: boolean, type: 'success' | 'error' | 'info', title: string, message: string }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem('imboni_token');
    try {
      const res = await fetch('http://localhost:5000/api/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setModal({
          isOpen: true,
          type: 'success',
          title: 'Settings Saved',
          message: 'Your platform configurations have been updated successfully.'
        });
      } else {
        setModal({
          isOpen: true,
          type: 'error',
          title: 'Save Failed',
          message: 'We could not save your settings. Please ensure you are logged in and try again.'
        });
      }
    } catch (err) {
      console.error(err);
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Network Error',
        message: 'Could not connect to the backend server. Please check your connection.'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading settings...</div>;

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
          <h1 className="text-4xl font-bold text-[#0A2647] dark:text-white mb-2">Platform Settings</h1>
          <p className="text-slate-500">Update your global contact information across the platform.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-white/5 space-y-6">
          <h3 className="text-xl font-bold text-[#0A2647] dark:text-white mb-4">Contact Channels</h3>
          
          <div className="flex flex-col gap-2 shadow-sm">
            <label className="text-sm font-bold text-slate-400">WhatsApp Number (For links)</label>
            <input 
              type="text" 
              name="whatsappNumber"
              value={settings.whatsappNumber || ''}
              onChange={handleChange}
              placeholder="e.g. 250780000000 (digits only)" 
              className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white underline-none focus:ring-2 focus:ring-[#E1B12C]" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-400">Contact Phone (For display/calls)</label>
            <input 
              type="text" 
              name="contactPhone"
              value={settings.contactPhone || ''}
              onChange={handleChange}
              placeholder="e.g. +250 780 000 000" 
              className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-400">Contact Email</label>
            <input 
              type="email" 
              name="contactEmail"
              value={settings.contactEmail || ''}
              onChange={handleChange}
              placeholder="contact@imbonihub.com" 
              className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-400">Instagram Handle</label>
            <input 
              type="text" 
              name="instagramHandle"
              value={settings.instagramHandle || ''}
              onChange={handleChange}
              placeholder="imbonihub" 
              className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white" 
            />
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-white/5 p-8 rounded-3xl border border-blue-100 dark:border-white/5 flex flex-col justify-center text-center">
           <div className="w-16 h-16 bg-[#E1B12C] text-[#0A2647] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
           <h4 className="text-xl font-bold mb-4">Why this matters?</h4>
           <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
             Setting these correctly ensures that all 'Call me', 'Text me' and WhatsApp buttons across the entire platform point to your current active numbers. You can change these anytime if you switch support numbers.
           </p>
        </div>
      </div>
    </div>
  );
}
