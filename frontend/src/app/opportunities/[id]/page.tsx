'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function OpportunityDetails() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      Promise.all([
        fetch(`http://localhost:5000/api/opportunities`),
        fetch(`http://localhost:5000/api/settings`)
      ])
        .then(async ([resOp, resSet]) => {
          const ops = await resOp.json();
          const sets = await resSet.json();
          const found = ops.find((o: any) => o.id === id);
          setOpportunity(found);
          setSettings(sets);
          setLoading(false);

          // Track view count silently
          if (found) {
             fetch(`http://localhost:5000/api/opportunities/${id}/view`, { method: 'POST' }).catch(() => {});
          }
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-[#020617] flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-[#E1B12C] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!opportunity) return (
    <div className="min-h-screen bg-white dark:bg-[#020617] flex flex-col items-center justify-center">
       <h1 className="text-2xl font-bold mb-4">Opportunity not found</h1>
       <a href="/opportunities" className="btn-primary">Back to Directory</a>
    </div>
  );

  return (
    <main className="min-h-screen bg-white dark:bg-[#020617]">
      <Navbar />
      
      {/* Hero Header */}
      <div className="pt-32 pb-20 bg-[#0A2647] relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {opportunity.image && (
              <div className="w-full md:w-1/3 aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10">
                <img src={opportunity.image} alt={opportunity.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block px-4 py-1.5 bg-[#E1B12C] text-[#0A2647] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                {opportunity.tag}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {opportunity.title}
              </h1>
              <div className="flex flex-wrap gap-8 justify-center md:justify-start text-slate-300">
                <div className="flex items-center gap-2">
                   <svg className="w-5 h-5 text-[#E1B12C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                   <span className="font-bold">Deadline: {opportunity.deadline}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E1B12C]/5 skew-x-12 translate-x-1/4" />
      </div>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-[#0A2647] dark:text-white mb-6">About this Opportunity</h2>
                <div className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed whitespace-pre-wrap">
                  {opportunity.description}
                </div>
              </div>

              <div className="p-8 bg-blue-50 dark:bg-white/5 rounded-3xl border border-blue-100 dark:border-white/5">
                <h3 className="text-xl font-bold text-[#0A2647] dark:text-white mb-4">Why Apply?</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  This opportunity has been vetted by the Imboni team. It offers high impact and professional growth for African scholars.
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* Dynamic Contact Sidebar */}
                <div className="bg-[#0A2647] p-8 rounded-[2.5rem] text-white shadow-2xl space-y-4">
                  <h3 className="text-xl font-bold mb-4">Ready to Apply?</h3>
                  
                  {/* Call Me */}
                  <a 
                    href={`tel:${settings?.contactPhone || '+250780000000'}`}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-[#E1B12C] text-[#0A2647] rounded-2xl font-black transform hover:scale-105 transition-all shadow-lg active:scale-95"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    Call me now
                  </a>

                  {/* Text me (WhatsApp) */}
                  <a 
                    href={`https://wa.me/${settings?.whatsappNumber || '250780000000'}`}
                    target="_blank"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-white/10 text-white rounded-2xl font-bold border border-white/20 hover:bg-white/20 transition-all active:scale-95"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72 1.0 3.82 1.528 5.96 1.528h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    Text me (WhatsApp)
                  </a>

                  {/* Email Us */}
                  <a 
                    href={`mailto:${settings?.contactEmail || 'contact@imbonihub.com'}`}
                    className="block text-center text-sm font-medium text-slate-400 hover:text-white transition-colors py-2"
                  >
                    Or Email: {settings?.contactEmail || 'contact@imbonihub.com'}
                  </a>

                  {/* Official Link (Kept as secondary utility) */}
                  <div className="pt-4 border-t border-white/10 mt-4">
                    <a 
                      href={opportunity.link} 
                      target="_blank" 
                      className="text-[10px] text-slate-500 hover:text-white transition-all uppercase tracking-widest block text-center"
                    >
                      View Official Link →
                    </a>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5">
                  <h3 className="text-lg font-bold text-[#0A2647] dark:text-white mb-4">Need help?</h3>
                  <p className="text-sm text-slate-500 mb-6 font-medium">
                    Our team can help you write your motivation letter or prepare your CV for this specific scholarship.
                  </p>
                  <a href="/services" className="text-[#E1B12C] font-bold hover:underline flex items-center gap-2">
                    Our Writing Services →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
