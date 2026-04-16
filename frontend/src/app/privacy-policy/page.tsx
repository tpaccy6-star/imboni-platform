import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#020617]">
      <Navbar />
      
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A2647] dark:text-white mb-8">Privacy Policy</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-12">Last Updated: April 14, 2026</p>
          
          <div className="space-y-12 text-slate-600 dark:text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-[#0A2647] dark:text-white mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when you create an account, request a service, or sign up for our newsletter. This may include your name, email address, academic credentials, and any documents you upload for our writing services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0A2647] dark:text-white mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Provide and improve our scholarship and writing services.</li>
                <li>Send you updates about new opportunities that match your profile.</li>
                <li>Process payments and manage your account.</li>
                <li>Communicate with you about your application status.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0A2647] dark:text-white mb-4">3. Data Security</h2>
              <p>We implement a variety of security measures to maintain the safety of your personal information. Your documents are stored securely and are only accessible by our certified professional writers and visa consultants.</p>
            </section>

            <section className="bg-[#F8FAFC] dark:bg-white/5 p-8 rounded-3xl border border-slate-100 dark:border-white/5">
              <h2 className="text-2xl font-bold text-[#0A2647] dark:text-white mb-4">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p className="font-bold text-[#0A2647] dark:text-white mt-4">privacy@imbonihub.com</p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
