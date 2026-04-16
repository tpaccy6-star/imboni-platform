import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#020617]">
      <Navbar />
      
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A2647] dark:text-white mb-8">Terms and Conditions</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-12">Last Updated: April 14, 2026</p>
          
          <div className="space-y-12 text-slate-600 dark:text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-[#0A2647] dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using the Imboni Application Hub website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0A2647] dark:text-white mb-4">2. Description of Services</h2>
              <p>Imboni Hub provides a directory of scholarships and professional application support services, including CV writing, motivation letter drafting, and visa assistance. We do not guarantee admission to any university or the granting of any visa, as these are determined by third-party institutions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0A2647] dark:text-white mb-4">3. User Responsibilities</h2>
              <p>Users are responsible for providing accurate and truthful information. Any professional writing services provided are intended as models and templates to assist you in your applications.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0A2647] dark:text-white mb-4">4. Refund Policy</h2>
              <p>Payments for professional services are generally non-refundable once work has commenced. We offer a specific number of revisions for our writing services as outlined in the service description.</p>
            </section>

            <section className="bg-[#0A2647] text-white p-8 rounded-3xl">
              <h2 className="text-2xl font-bold text-[#E1B12C] mb-4">Agreement</h2>
              <p>By using Imboni Hub, you acknowledge that you have read and understood these terms in their entirety.</p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
