import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass-morphism py-4 px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg">
            <img 
              src="/logo.png" 
              alt="Imboni Logo" 
              className="object-contain w-full h-full"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#0A2647] dark:text-white transition-colors">
            Imboni<span className="text-[#E1B12C]">Hub</span>
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 font-medium text-[#0A2647] dark:text-slate-200">
        <Link href="/opportunities" className="hover:text-[#E1B12C] transition-colors">Opportunities</Link>
        <Link href="/services" className="hover:text-[#E1B12C] transition-colors">Services</Link>
        <Link href="/success-stories" className="hover:text-[#E1B12C] transition-colors">Success Stories</Link>
        <Link href="/about" className="hover:text-[#E1B12C] transition-colors">About</Link>
        <Link href="/contact" className="hover:text-[#E1B12C] transition-colors">Contact</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/admin" className="btn-primary flex items-center gap-2 !py-2 group shadow-lg shadow-blue-500/20">
          <svg className="w-4 h-4 text-[#E1B12C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Admin Portal
        </Link>
      </div>
    </nav>
  );
}
