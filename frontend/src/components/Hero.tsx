import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Imboni Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2647]/95 to-[#0A2647]/60 z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 text-white">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Unlocking <span className="text-[#E1B12C]">Global</span><br />
            Opportunities for You
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed">
            The ultimate hub for African scholars. Discover fully-funded scholarships, international jobs, and professional writing services crafted for your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/opportunities">
              <button className="btn-primary text-lg w-full sm:w-auto">
                Explore Scholarships
              </button>
            </Link>
            <Link href="/services">
              <button className="btn-outline text-lg w-full sm:w-auto">
                Our Services
              </button>
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-[#0A2647] bg-slate-400 overflow-hidden transform hover:scale-110 transition-all">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-slate-400">
              <span className="text-white font-bold">500+</span> Scholars already applied this week
            </p>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-[#E1B12C]/10 blur-[120px] rounded-full z-10" />
    </section>
  );
}
