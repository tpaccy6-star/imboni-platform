'use client';

import React from 'react';
import Link from 'next/link';

interface OpportunityProps {
  id: string;
  title: string;
  desc: string;
  deadline: string;
  tag: string;
  image?: string;
}

export default function OpportunityCard({ id, title, desc, deadline, tag, image }: OpportunityProps) {
  return (
    <Link href={`/opportunities/${id}`} className="block h-full transition-transform hover:scale-[1.02] active:scale-95 duration-300">
      <div className="group relative glass-morphism p-6 rounded-[2.5rem] border-slate-200 dark:border-white/10 card-hover bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl flex flex-col h-full overflow-hidden">
        {/* Image Header */}
        {image && (
          <div className="relative w-full h-48 mb-6 rounded-3xl overflow-hidden -mt-2 -mx-2">
            <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2647]/60 to-transparent" />
          </div>
        )}

        {/* Decorative Blur for Dark Mode */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#E1B12C]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 text-[#0A2647] dark:text-[#E1B12C] rounded-2xl flex items-center justify-center group-hover:bg-[#E1B12C] group-hover:text-[#0A2647] transition-all duration-500 border border-blue-100 dark:border-white/5 shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 bg-[#E1B12C]/10 text-[#E1B12C] rounded-full border border-[#E1B12C]/20">
            {tag}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-[#0A2647] dark:text-white group-hover:text-[#E1B12C] transition-colors line-clamp-2 leading-tight relative z-10">
          {title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow relative z-10">
          {desc}
        </p>

        <div className="mt-auto relative z-10 space-y-4">
          <div className="flex justify-between items-center pt-5 border-t border-slate-100 dark:border-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-slate-400 dark:text-slate-500 font-black tracking-widest">Deadline</span>
              <span className="text-sm font-bold text-red-500 dark:text-red-400">{deadline}</span>
            </div>
            <div className="flex items-center gap-4">
               <button 
                 onClick={(e) => {
                   e.preventDefault();
                   window.open(`https://wa.me/250780000000?text=I%20need%20help%20with%20this%20scholarship:%20${encodeURIComponent(title)}`, '_blank');
                 }}
                 className="px-4 py-2 bg-[#E1B12C]/10 text-[#E1B12C] text-xs font-bold rounded-xl border border-[#E1B12C]/20 hover:bg-[#E1B12C] hover:text-[#0A2647] transition-all"
               >
                 Ask Help
               </button>
               <div className="flex items-center gap-2 text-[#0A2647] dark:text-white font-bold text-sm">
                 <span className="group-hover:text-[#E1B12C] transition-colors">Details</span>
                 <div className="w-8 h-8 rounded-full bg-[#0A2647] dark:bg-white/5 flex items-center justify-center group-hover:bg-[#E1B12C]">
                    <svg className="w-4 h-4 text-white dark:text-[#E1B12C] group-hover:text-[#0A2647]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
