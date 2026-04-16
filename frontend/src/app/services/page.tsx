import { 
  GraduationCap, 
  Briefcase, 
  Landmark, 
  Compass, 
  FileEdit, 
  Globe,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Professional Services | Scholarship, Jobs & Irembo | Imboni Hub",
  description: "Comprehensive professional support: Scholarship applications, job hunting, Irembo & government services, and academic consultancy in Rwanda.",
};

export default function ServicesPage() {
  const services = [
    {
      title: "Scholarship & Admissions",
      desc: "Comprehensive support to secure your future in top universities worldwide.",
      features: [
        "Scholarship search (Local & int'l)",
        "University applications",
        "Motivation letter writing",
        "CV for academic purposes",
        "Deadline reminders"
      ],
      icon: GraduationCap,
      color: "blue"
    },
    {
      title: "Job Application Services",
      desc: "Optimized documents and coaching to help you land your dream role.",
      features: [
        "Professional CV writing",
        "Cover letter writing",
        "Online job applications",
        "LinkedIn optimization",
        "Interview preparation"
      ],
      icon: Briefcase,
      color: "green"
    },
    {
      title: "Irembo & Government",
      desc: "Efficient handling of Rwandan government digital services and documents.",
      features: [
        "Irembo applications",
        "Driving license & ID requests",
        "Document corrections",
        "Basic tax assistance",
        "Social services support"
      ],
      icon: Landmark,
      color: "yellow"
    },
    {
      title: "Consultancy Services",
      desc: "Expert guidance on your educational and career path strategy.",
      features: [
        "Study abroad guidance",
        "Career advice & planning",
        "Course & university selection",
        "Application strategy",
        "Visa consultation"
      ],
      icon: Compass,
      color: "purple"
    },
    {
      title: "Document Preparation",
      desc: "Polishing your professional documents to perfection.",
      features: [
        "Modern CV design",
        "Motivation letters",
        "Recommendation guidance",
        "Editing & proofreading",
        "Formatting standards"
      ],
      icon: FileEdit,
      color: "red"
    },
    {
      title: "Online App Support",
      desc: "End-to-end technical support for complex online application portals.",
      features: [
        "Account setup & management",
        "Document uploading",
        "Email management",
        "Application follow-up",
        "System troubleshooting"
      ],
      icon: Globe,
      color: "teal"
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#020617] transition-colors">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-[url('/bg-pattern.svg')] bg-cover relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <h4 className="text-[#E1B12C] font-bold uppercase tracking-[0.2em] text-sm mb-6">Our Expertise</h4>
          <h1 className="text-5xl md:text-7xl font-bold text-[#0A2647] dark:text-white mb-8 leading-tight">
            Professional Support for Every <br /> <span className="text-[#E1B12C]">Step of Your Career</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Whether you're applying for scholarships, jobs, or government documents, Imboni Hub provides the expert touch to ensure your success.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[100px] -z-10" />
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#F8FAFC] dark:bg-slate-950 transition-colors">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {services.map((s, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[2.5rem] shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all border border-slate-100 dark:border-white/5 flex flex-col group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all group-hover:scale-110 group-hover:rotate-3 ${
                  s.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' :
                  s.color === 'green' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' :
                  s.color === 'yellow' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600' :
                  s.color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600' :
                  s.color === 'red' ? 'bg-red-50 dark:bg-red-900/20 text-red-600' :
                  'bg-teal-50 dark:bg-teal-900/20 text-teal-600'
                }`}>
                  <s.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#0A2647] dark:text-white mb-4">{s.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed text-sm">
                  {s.desc}
                </p>
                <ul className="space-y-3 mb-10">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E1B12C]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="mt-auto">
                  <button className="btn-primary w-full !py-4 font-bold flex items-center justify-center gap-2 group/btn shadow-lg shadow-blue-500/10">
                    Request Service
                    <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
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
