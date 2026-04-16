import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Contact Imboni Hub | Expert Scholarship Support",
  description: "Get in touch with Imboni Hub for expert guidance on scholarships, essay writing, and visa applications.",
};

export default async function ContactPage() {
  let settings = {
    whatsappNumber: '250780000000',
    contactPhone: '+250 780 000 000',
    contactEmail: 'contact@imbonihub.com',
    instagramHandle: 'imbonihub'
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/settings`, { 
      next: { revalidate: 60 } 
    });
    if (res.ok) {
      const data = await res.json();
      if (data) {
        settings = { ...settings, ...data };
      }
    }
  } catch (error) {
    console.error("Failed to fetch platform settings", error);
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors">
      <Navbar />
      
      {/* Header */}
      <div className="pt-40 pb-20 bg-[#0A2647] text-white overflow-hidden relative">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Have questions about a scholarship or our services? Our team is here to help you navigate your academic journey.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E1B12C]/5 skew-x-12 translate-x-1/2" />
      </div>

      <div className="container mx-auto px-6 md:px-12 -mt-16 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl shadow-blue-500/5 border border-slate-100 dark:border-white/5 transition-colors">
              <h3 className="text-xl font-bold text-[#0A2647] dark:text-white mb-8">Direct Channels</h3>
              
              <div className="space-y-8">
                {/* Email */}
                {settings.contactEmail && (
                  <a href={`mailto:${settings.contactEmail}`} className="flex gap-4 items-center group transition-transform hover:translate-x-2">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Us</h5>
                      <p className="text-[#0A2647] dark:text-white font-bold">{settings.contactEmail}</p>
                    </div>
                  </a>
                )}

                {/* WhatsApp */}
                {settings.whatsappNumber && (
                  <a href={`https://wa.me/${settings.whatsappNumber.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="flex gap-4 items-center group transition-transform hover:translate-x-2">
                    <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72 1.0 3.82 1.528 5.96 1.528h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">WhatsApp</h5>
                      <p className="text-[#0A2647] dark:text-white font-bold">+{settings.whatsappNumber.replace('+', '')}</p>
                    </div>
                  </a>
                )}

                {/* Call */}
                {settings.contactPhone && (
                  <a href={`tel:${settings.contactPhone.replace(/[\s-]/g, '')}`} className="flex gap-4 items-center group transition-transform hover:translate-x-2">
                    <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Call Us</h5>
                      <p className="text-[#0A2647] dark:text-white font-bold">{settings.contactPhone}</p>
                    </div>
                  </a>
                )}

                {/* Instagram */}
                {settings.instagramHandle && (
                  <a href={`https://instagram.com/${settings.instagramHandle.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex gap-4 items-center group transition-transform hover:translate-x-2">
                    <div className="w-12 h-12 bg-pink-50 dark:bg-pink-900/20 text-pink-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-pink-600 group-hover:text-white transition-all shadow-sm">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Instagram</h5>
                      <p className="text-[#0A2647] dark:text-white font-bold">@{settings.instagramHandle.replace('@', '')}</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-xl shadow-blue-500/5 border border-slate-100 dark:border-white/5 transition-colors">
              <h3 className="text-2xl font-bold text-[#0A2647] dark:text-white mb-8">Send us a Message</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#0A2647] dark:text-slate-300">Full Name</label>
                  <input type="text" placeholder="John Doe" className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[#E1B12C] outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#0A2647] dark:text-slate-300">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[#E1B12C] outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-[#0A2647] dark:text-slate-300">Service Interest</label>
                  <select className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-[#E1B12C] transition-all">
                    <option className="dark:bg-slate-900">Scholarship Inquiry</option>
                    <option className="dark:bg-slate-900">CV/Resume Writing</option>
                    <option className="dark:bg-slate-900">Admission Essay</option>
                    <option className="dark:bg-slate-900">Visa Assistance</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-[#0A2647] dark:text-slate-300">Your Message</label>
                  <textarea rows={5} placeholder="How can we help you?" className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[#E1B12C] outline-none transition-all resize-none placeholder-slate-400 dark:placeholder-slate-500"></textarea>
                </div>
                <div className="md:col-span-2 pt-4">
                  <button type="submit" className="btn-primary w-full !py-4 text-lg">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
