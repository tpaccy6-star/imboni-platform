'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OpportunityCard from '@/components/OpportunityCard';


export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Full Funding', 'Europe', 'Global', 'Masters', 'Research'];

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/opportunities`)
      .then(res => res.json())
      .then(data => {
        // Sort by deadline (nearest first)
        const sorted = data.sort((a: any, b: any) => {
          const dateA = new Date(a.deadline || '2099-01-01').getTime();
          const dateB = new Date(b.deadline || '2099-01-01').getTime();
          return dateA - dateB;
        });

        // Limit to 12 items
        setOpportunities(sorted.slice(0, 12));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredData = (opportunities.length > 0 ? opportunities : []).filter(opt => {
    const matchesSearch = opt.title.toLowerCase().includes(search.toLowerCase()) || 
                          opt.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'All' || opt.tag === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-500">
      <Navbar />
      
      {/* Header Space */}
      <div className="pt-32 pb-12 bg-[#0A2647] text-white">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Opportunities</h1>
          <p className="text-slate-400 max-w-2xl">
            Browse through our curated list of scholarships, jobs, and internships designed for ambitious scholars.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 -mt-8">
        {/* Search and Filter Panel */}
        <div className="glass-morphism p-6 rounded-2xl shadow-xl mb-12 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search scholarships (e.g. Turkey, Masters)..." 
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-[#E1B12C] outline-none text-[#0A2647] dark:text-white dark:bg-slate-900/50 transition-all font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  activeFilter === f 
                  ? 'bg-[#E1B12C] text-[#0A2647] shadow-lg shadow-yellow-500/20' 
                  : 'bg-white dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-[#E1B12C]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 rounded-3xl" />
            ))}
          </div>
        ) : filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {filteredData.map((opt: any) => (
              <OpportunityCard 
                key={opt.id}
                id={opt.id}
                title={opt.title}
                desc={opt.description}
                deadline={opt.deadline}
                tag={opt.tag}
                image={opt.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0A2647] mb-2">No results found</h3>
            <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
