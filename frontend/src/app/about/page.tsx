import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "About Imboni Hub | Our Mission and Team",
  description: "Learn about Imboni Hub's mission to bridge the gap between African scholars and global opportunities.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#020617]">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 bg-[url('/bg-pattern.svg')] bg-cover relative overflow-hidden">
        <div className="absolute inset-0 bg-white/80 dark:bg-[#020617]/90 z-0" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-[#0A2647] dark:text-white mb-8">
            Our Mission: Your <span className="text-[#E1B12C]">Success</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Imboni Application Hub was founded on the belief that geography should never limit potential. We bridge the gap between ambitious African scholars and global opportunities.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="w-full aspect-video bg-[#0A2647] rounded-[40px] overflow-hidden shadow-2xl">
              <img src="/rwandan_smart_classroom.png" alt="Students studying in a Rwandan Smart College Classroom" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#E1B12C] rounded-[32px] flex items-center justify-center p-8 shadow-xl hidden md:flex">
              <p className="text-[#0A2647] font-bold text-center leading-tight text-xl">
                500+ <br /> Scholars Helped
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-[#0A2647] dark:text-white">Why we do what we do</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              Every year, thousands of fully-funded scholarships and high-impact job opportunities go unclaimed or under-represented by African candidates simply due to a lack of information or guidance.
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              At Imboni Hub, we don't just list links; we provide the professional tools—CVs, essays, and visa advice—to ensure our scholars don't just apply, but get accepted.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-bold text-[#E1B12C] mb-2">98%</h4>
                <p className="text-sm font-bold text-[#0A2647] dark:text-slate-300 uppercase tracking-widest">Visa Success</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-[#E1B12C] mb-2">45+</h4>
                <p className="text-sm font-bold text-[#0A2647] dark:text-slate-300 uppercase tracking-widest">Countries Reached</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#F8FAFC] dark:bg-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold text-[#0A2647] dark:text-white text-center mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { t: "Excellence", d: "We strive for the highest standards in every CV and essay we write." },
              { t: "Integrity", d: "Honest guidance and transparent results for every scholar." },
              { t: "Impact", d: "We measure success by the number of dreams we help realize." }
            ].map((v, i) => (
              <div key={i} className="bg-white dark:bg-[#0A2647] p-10 rounded-3xl shadow-xl shadow-blue-500/5 border border-slate-100 dark:border-white/5">
                <div className="w-12 h-12 bg-[#E1B12C] text-[#0A2647] rounded-xl flex items-center justify-center font-bold text-xl mb-6">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-bold text-[#0A2647] dark:text-white mb-4">{v.t}</h3>
                <p className="text-slate-500 dark:text-slate-400">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developers Team Section */}
      <section className="py-24 bg-white dark:bg-[#020617]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold text-[#0A2647] dark:text-white mb-4">Meet the <span className="text-[#E1B12C]">Team</span></h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-16">
            The visionary and technical minds behind the Imboni Enterprise Dashboard. Building scalable solutions for modern education access.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              {
                name: "Imboni CEO",
                role: "Chief Executive Officer",
                icon: "👔",
                image: "/Ceo.jpeg",
                socials: { email: "imboniapplyhub@gmail.com", whatsapp: "0789211992", instagram: "https://www.instagram.com/imboniapplyhub", twitter: "https://x.com/TuyishimeJohnwa" }
              },
              {
                name: "Lead Dev",
                role: "Head Developer",
                icon: "👨‍💻",
                image: "/Developer.jpg",
                socials: { email: "tpaccy@gmail.com", whatsapp: "+250781343621", instagram: "https://www.instagram.com/tr_pacifique/", X: "https://x.com/Tuyipaccy" }
              }
            ].map((dev, i) => (
              <div key={i} className="group flex flex-col items-center bg-slate-50 dark:bg-white/5 p-8 rounded-[3rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-white/10">
                <div className="w-32 h-32 bg-white dark:bg-slate-900 rounded-full mb-6 flex items-center justify-center text-5xl shadow-lg border-4 border-slate-50 dark:border-white/5 group-hover:scale-110 group-hover:border-[#E1B12C] transition-all duration-300 overflow-hidden">
                  {dev.image ? (
                    <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
                  ) : (
                    dev.icon
                  )}
                </div>
                <h3 className="text-2xl font-black text-[#0A2647] dark:text-white mb-2">{dev.name}</h3>
                <p className="text-[#E1B12C] font-black text-[10px] uppercase tracking-widest bg-[#E1B12C]/10 px-4 py-1.5 rounded-full mb-8">{dev.role}</p>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  <a href={dev.socials.email !== '#' ? `mailto:${dev.socials.email}` : '#'} title="Email" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:scale-110 hover:-translate-y-1 transition-all shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </a>
                  <a href={dev.socials.whatsapp !== '#' ? `https://wa.me/${dev.socials.whatsapp.replace('+', '')}` : '#'} title="WhatsApp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 hover:scale-110 hover:-translate-y-1 transition-all shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path></svg>
                  </a>
                  <a href={dev.socials.instagram} title="Instagram" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-500/10 hover:scale-110 hover:-translate-y-1 transition-all shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  </a>
                  <a href={dev.socials.twitter || dev.socials.X} title="X" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-200 dark:hover:text-white dark:hover:bg-white/10 hover:scale-110 hover:-translate-y-1 transition-all shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4l16 16M4 20L20 4"></path></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </main>
  );
}
