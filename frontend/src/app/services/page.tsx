import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Professional Writing & Visa Services | Imboni Hub",
  description: "Get professional help with CV writing, admission essays, and visa applications from the experts at Imboni Hub.",
};

export default function ServicesPage() {
  const services = [
    {
      title: "CV & Resume Writing",
      desc: "Stand out from thousands of applicants with a professionally structured, ATS-friendly CV that highlights your potential.",
      features: ["ATS Optimization", "Tailored to Scholarships", "Professional Formatting", "2 Revisions Included"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Admission Essays",
      desc: "Your story matters. We help you draft compelling Personal Statements and Motivation Letters that capture the attention of admission committees.",
      features: ["Personalized Storytelling", "Grammar & Tone Check", "Academic Alignment", "Plagiarism Free"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: "Visa Assistance",
      desc: "Navigating visa requirements can be stressful. We provide expert guidance on documentation and interview preparation to ensure a smooth process.",
      features: ["Document Checklist", "Interview Mock Prep", "SOP for Visa", "Application Guidance"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2 2 0 012 2v.65m2.403-3.04a11.323 11.323 0 01.63 3.09m-3.113 4.476A10.957 10.957 0 0112 21a10.957 10.957 0 01-8.112-3.609m15.51-7.215a11.36 11.36 0 01-3.328-3.06" />
        </svg>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#020617] transition-colors">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-[url('/bg-pattern.svg')] bg-cover">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h4 className="text-[#E1B12C] font-bold uppercase tracking-[0.2em] text-sm mb-6">Our Expertise</h4>
          <h1 className="text-5xl md:text-7xl font-bold text-[#0A2647] dark:text-white mb-8 leading-tight">
            Professional Support for <br /> Your <span className="text-[#E1B12C]">Academic Journey</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
            From your first CV draft to your final visa interview, we provide the expert touch needed to unlock international opportunities.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#F8FAFC] dark:bg-slate-950 transition-colors">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {services.map((s, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all border border-slate-100 dark:border-white/5 flex flex-col">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-[#0A2647] dark:text-blue-400 rounded-2xl flex items-center justify-center mb-8 transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#0A2647] dark:text-white mb-4">{s.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                  {s.desc}
                </p>
                <ul className="space-y-4 mb-10">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="mt-auto">
                  <button className="btn-outline w-full !py-4 font-bold">
                    Request Service
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-[#0A2647] text-white">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Why Choose <br /> Imboni Hub?</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#E1B12C] text-[#0A2647] rounded-full flex items-center justify-center shrink-0 font-bold">01</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Expert Knowledge</h4>
                  <p className="text-slate-400">Our consultants are former scholars who know exactly what committees look for.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#E1B12C] text-[#0A2647] rounded-full flex items-center justify-center shrink-0 font-bold">02</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Personalized Approach</h4>
                  <p className="text-slate-400">No templates here. Every document is built from scratch to reflect your unique journey.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#E1B12C] text-[#0A2647] rounded-full flex items-center justify-center shrink-0 font-bold">03</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Track Record</h4>
                  <p className="text-slate-400">Over 500+ successful applications to universities in Europe, Asia, and the Americas.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-[#144272] to-[#0A2647] rounded-[60px] border border-white/10 flex items-center justify-center p-12">
               <div className="text-center">
                 <h3 className="text-7xl font-bold text-[#E1B12C] mb-4">98%</h3>
                 <p className="text-xl font-medium">Success Rate in <br /> Visa Approvals</p>
               </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
