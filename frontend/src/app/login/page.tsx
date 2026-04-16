'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusModal from '@/components/StatusModal';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ isOpen: boolean, type: 'success' | 'error' | 'info', title: string, message: string }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: ''
  });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('imboni_token', data.token);
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-6 transition-colors duration-500">
      <StatusModal 
        isOpen={modal.isOpen} 
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-slate-100 dark:border-white/5">
        <div className="text-center mb-10">
           <div className="w-16 h-16 overflow-hidden rounded-2xl mx-auto mb-4 scale-125">
             <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
           </div>
           <h1 className="text-2xl font-bold text-[#0A2647] dark:text-white">Admin Login</h1>
           <p className="text-slate-500 dark:text-slate-400">Imboni Application Hub Control</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="p-4 bg-red-50 text-red-500 text-sm rounded-xl border border-red-100">{error}</div>}
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@imbonihub.com" 
              className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-[#0A2647] dark:focus:ring-[#E1B12C]" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
              <button 
                type="button" 
                onClick={() => setModal({
                  isOpen: true,
                  type: 'info',
                  title: 'Reset Password',
                  message: 'Security policy: Please contact your senior system administrator directly to reset your access credentials.'
                })} 
                className="text-[10px] font-bold text-[#E1B12C] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-[#0A2647] dark:focus:ring-[#E1B12C]" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full !py-4"
          >
            {loading ? 'Authenticating...' : 'Login to Dashboard'}
          </button>

          <div className="pt-4 text-center">
            <Link href="/" className="text-sm text-slate-400 hover:text-[#0A2647] font-medium transition-colors">
              ← Back to Homepage
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
