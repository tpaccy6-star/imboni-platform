import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SuccessStoriesPage() {
  const testimonials = [
    {
      name: "Pacifique T.",
      university: "Massachusetts Institute of Technology, USA",
      story: "Imboni Hub completely transformed my admission essay. I was struggling to find the right words to tell my story, but their consultants helped me structure my life experiences perfectly. I secured a fully funded scholarship!",
      color: "bg-blue-500"
    },
    {
      name: "Divine M.",
      university: "University of Toronto, Canada",
      story: "The visa assistance service was an absolute lifesaver. They prepared a comprehensive checklist and conducted multiple mock interviews that made me so confident. I got my study permit approved in just 3 weeks with zero hassle!",
      color: "bg-green-500"
    },
    {
      name: "Christian K.",
      university: "Oxford University, UK",
      story: "I had an average GPA and didn't think I stood a chance globally. The experts at Imboni highlighted my extracurriculars, volunteer work, and leadership profile in my CV, which made all the difference. Thank you for believing in me!",
      color: "bg-[#E1B12C]"
    },
    {
      name: "Aline U.",
      university: "Melbourne University, Australia",
      story: "I didn’t even know where to start looking for scholarships. Imboni Hub provided a personalized list of opportunities that matched my major, and their guidance through the portal was top-tier. I am forever grateful for your team.",
      color: "bg-purple-500"
    },
    {
      name: "Jean B.",
      university: "DAAD Scholar, Germany",
      story: "My CV was basically just a list of jobs before Imboni Hub revamped it. They optimized it for ATS systems and used action verbs I never thought of. I applied to DAAD and finally got accepted after 3 previous rejections. Excellent service!",
      color: "bg-orange-500"
    },
    {
      name: "Sandrine N.",
      university: "Kyoto University, Japan",
      story: "Writing the Statement of Purpose for the MEXT scholarship is brutal, but Imboni Hub's team reviewed my drafts patiently and gave me critical feedback. Their attention to detail is insane.",
      color: "bg-pink-500"
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#020617] transition-colors">
      <Navbar />
      
      {/* Header */}
      <section className="pt-40 pb-20 bg-[#0A2647] text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Success Stories</h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Hear from the scholars we've helped achieve their academic dreams across the globe. Thousands of students say "thank you" to Imboni Hub every year!
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#F8FAFC] dark:bg-slate-950 transition-colors">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl shadow-blue-500/5 hover:-translate-y-2 transition-all border border-slate-100 dark:border-white/5 relative flex flex-col">
                <svg className="absolute top-6 right-8 w-12 h-12 text-blue-50 dark:text-blue-900/10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div className="flex items-center gap-4 mb-6">
                  {/* Generate Initial Avatar to avoid broken images */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md ${t.color}`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A2647] dark:text-white">{t.name}</h3>
                    <p className="text-sm text-[#E1B12C] font-semibold">{t.university}</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic relative z-10 leading-relaxed grow">"{t.story}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-[#020617]">
        <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0A2647] dark:text-white mb-6">Ready to be our next Success Story?</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto">Don't leave your academic future strictly to chance. Reach out to our expert consultants today and let's craft a winning strategy together.</p>
            <a href="/contact" className="btn-primary inline-flex">
                Contact Our Team
            </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
