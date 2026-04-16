'use client';

import React from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'info' | 'confirm';
  title: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
}

export default function StatusModal({ isOpen, onClose, type, title, message, onConfirm, confirmText = 'Confirm' }: StatusModalProps) {
  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle2 className="text-green-500" size={48} />,
    error: <XCircle className="text-red-500" size={48} />,
    info: <Info className="text-[#E1B12C]" size={48} />,
    confirm: <Info className="text-[#E1B12C]" size={48} />,
  };

  const ringColors = {
    success: 'ring-green-500/20',
    error: 'ring-red-500/20',
    info: 'ring-[#E1B12C]/20',
    confirm: 'ring-[#E1B12C]/20',
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0A2647]/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={cn(
        "relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 dark:border-white/5",
        "animate-in zoom-in-95 fade-in duration-300 slide-in-from-bottom-4"
      )}>
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className={cn(
            "p-4 rounded-3xl mb-6 ring-8",
            ringColors[type]
          )}>
            {icons[type]}
          </div>

          <h3 className="text-2xl font-black text-[#0A2647] dark:text-white mb-2">
            {title}
          </h3>
          
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
            {message}
          </p>

          {type === 'confirm' ? (
            <div className="flex gap-3 w-full">
               <button
                 onClick={onClose}
                 className="flex-1 py-4 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all font-bold"
               >
                 Cancel
               </button>
               <button
                 onClick={() => {
                   if (onConfirm) onConfirm();
                   onClose();
                 }}
                 className="flex-1 py-4 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-all shadow-lg"
               >
                 {confirmText}
               </button>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-4 bg-[#0A2647] dark:bg-[#E1B12C] text-white dark:text-[#0A2647] font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
