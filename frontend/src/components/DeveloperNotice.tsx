"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function DeveloperNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    // Function to schedule the next appearance
    const scheduleNextAppearance = () => {
      // Random delay between 15s and 45s after hiding
      const delay = Math.floor(Math.random() * 30000) + 15000;
      
      timerId = setTimeout(() => {
        setIsVisible(true);
        
        // Hide after 15 seconds
        timerId = setTimeout(() => {
          setIsVisible(false);
          // Recursively schedule next appearance
          scheduleNextAppearance();
        }, 15000);
      }, delay);
    };

    // Initial appearance after a short delay (e.g. 5s)
    timerId = setTimeout(() => {
      setIsVisible(true);
      
      timerId = setTimeout(() => {
        setIsVisible(false);
        scheduleNextAppearance();
      }, 15000);
    }, 5000);
    
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-6 left-6 z-[100] max-w-[340px] w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border border-indigo-100/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-2xl p-6 relative overflow-hidden group">
        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-full transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Accent Gradient */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1E40AF] via-purple-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />

        <div className="flex flex-col gap-3 mt-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100 shadow-sm shrink-0">
               <img src="/Developer.jpg" alt="Lead Developer" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-[#0A2647] text-[1.1rem]">
              Need Custom Software?
            </h3>
          </div>
          <p className="text-[0.9rem] text-gray-600 leading-relaxed font-medium">
            If you want an app, custom software, any system developed, or even maintenance, please reach out to the developer!
          </p>
          
          <div className="flex items-center justify-between gap-3 mt-3 pt-4 border-t border-gray-100">
            <span className="text-[0.7rem] font-black text-gray-400 uppercase tracking-widest">Connect</span>
            <div className="flex gap-2">
              <a href="mailto:tpaccy@gmail.com" className="p-2.5 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:scale-110 hover:shadow-md transition-all duration-300" title="Email Developer">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </a>
              <a href="https://wa.me/250781343621" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:scale-110 hover:shadow-md transition-all duration-300" title="WhatsApp">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path></svg>
              </a>
              <a href="https://www.instagram.com/tr_pacifique/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 hover:scale-110 hover:shadow-md transition-all duration-300" title="Instagram">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="https://x.com/Tuyipaccy" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-slate-50 text-slate-700 hover:bg-slate-200 hover:text-black hover:scale-110 hover:shadow-md transition-all duration-300" title="Twitter/X">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4l16 16M4 20L20 4"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
