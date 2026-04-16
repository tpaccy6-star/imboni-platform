import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import OpportunityCard from '@/components/OpportunityCard';
import SocialBanner from '@/components/SocialBanner';

export default async function Home() {
  let featuredScholarships: any[] = [];
  try {
    // Fetch from backend, caches by default but revalidates every 60 seconds
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/opportunities`, { 
      next: { revalidate: 60 } 
    });
    if (res.ok) {
      const data = await res.json();
      featuredScholarships = Array.isArray(data) ? data.slice(0, 3) : [];
    }
  } catch (error) {
    console.error("Failed to fetch featured scholarships", error);
    // Silent fallback if backend is momentarily down
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Featured Section */}
      <section className="py-24 bg-white dark:bg-[#020617] px-6 md:px-12 bg-[url('/grid.svg')] bg-center transition-colors duration-500">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h4 className="text-[#E1B12C] font-bold uppercase tracking-widest text-sm mb-4">Latest Opportunities</h4>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A2647] dark:text-white">Featured Scholarships</h2>
            </div>
            <Link href="/opportunities">
              <button className="hidden md:block btn-outline dark:border-white/20 dark:text-white !py-2">
                View All Opportunities
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredScholarships.length > 0 ? featuredScholarships.map((s) => (
              <OpportunityCard 
                key={s.id}
                id={s.id.toString()}
                title={s.title}
                desc={s.description || s.content?.substring(0, 150) || ''}
                deadline={s.deadline || 'Ongoing'}
                tag={s.tag || 'Scholarship'}
                image={s.image}
              />
            )) : (
               <div className="col-span-3 text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
                  <p className="text-slate-400 font-bold">No active opportunities at the moment. Please check back later!</p>
               </div>
            )}
          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section className="py-24 bg-[#0A2647] text-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="bg-gradient-to-br from-[#144272] to-[#0A2647] p-12 md:p-20 rounded-[40px] border border-white/10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Need help with your <span className="text-[#E1B12C]">Application?</span></h2>
              <p className="text-slate-300 text-lg mb-10 max-w-xl">
                Our expert writers and visa consultants are here to help you craft the perfect motivation letter and secure your admission.
              </p>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#E1B12C]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span>CV Writing</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#E1B12C]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span>Admission Essays</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#E1B12C]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span>Visa Support</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link href="/services">
                <button className="btn-primary !text-2xl !px-10 !py-6">
                  Get Started Now
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px]" />
      </section>

      <SocialBanner />

      <Footer />
    </main>

  );
}
