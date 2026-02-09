
import React from 'react';
import { 
  ArrowRight, Zap, Sparkles, Briefcase, Users, Globe, 
  Target, Rocket, ShieldCheck, School, Building2, ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
  onPost: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onPost }) => {
  const logos = [
    { name: 'AAUA', icon: <School className="text-orange-500" /> },
    { name: 'Flutterwave', icon: <Zap className="text-blue-500" /> },
    { name: 'Dangote', icon: <Building2 className="text-green-600" /> },
    { name: 'Google', icon: <Globe className="text-red-500" /> },
    { name: 'UNILAG', icon: <School className="text-maroon-500" /> },
    { name: 'Microsoft', icon: <Target className="text-blue-400" /> },
    { name: 'Zenith', icon: <ShieldCheck className="text-red-600" /> },
    { name: 'UI', icon: <School className="text-blue-900" /> }
  ];

  return (
    <div className="space-y-0 overflow-hidden bg-white dark:bg-slate-950">
      {/* 1. HERO IMAGE (ABOVE HEADLINE) */}
      <section className="relative pt-12 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-white dark:border-slate-900 group h-[400px] md:h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000" 
              alt="High Performance Team" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-12 left-12 animate-fade-up">
              <div className="px-6 py-2 bg-indigo-600 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-2xl">
                Nigeria's Verified Nexus
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HERO HEADLINE */}
      <section className="relative pt-20 pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-6xl md:text-[9rem] font-black text-slate-900 dark:text-white leading-[0.8] tracking-tighter mb-12">
            Find Talent.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">Claim Gigs.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed mb-16">
            Connecting Nigeria's brightest talent with premium professional opportunities. From AAUA to the World.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-8 justify-center">
            <button 
              onClick={onExplore}
              className="group relative w-full sm:w-auto px-16 py-8 bg-slate-900 dark:bg-indigo-600 text-white rounded-[32px] font-black text-2xl flex items-center justify-center gap-4 hover:scale-105 transition-all shadow-3xl active:scale-95"
            >
              Explore Gigs
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={onPost}
              className="w-full sm:w-auto px-16 py-8 bg-white dark:bg-slate-900 dark:text-white text-slate-900 border-4 border-slate-900 dark:border-slate-800 rounded-[32px] font-black text-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xl"
            >
              Post a Project
            </button>
          </div>
        </div>
      </section>

      {/* 3. LOGO MARQUEE */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden border-y border-slate-100 dark:border-slate-800">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Trusted By Entities & Institutions</p>
        </div>
        <div className="flex whitespace-nowrap animate-marquee items-center gap-20">
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center gap-4 text-slate-400 grayscale hover:grayscale-0 transition-all">
              <div className="w-10 h-10">{logo.icon}</div>
              <span className="text-2xl font-black tracking-tighter uppercase">{logo.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DUAL PATHWAY */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-16 bg-white dark:bg-slate-900 rounded-[60px] border border-slate-100 dark:border-slate-800 shadow-3xl animate-slide-left">
              <Users className="w-16 h-16 text-indigo-600 mb-8" />
              <h3 className="text-5xl font-black dark:text-white mb-6 tracking-tight">For Talent</h3>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed">Complete your profile, showcase your works, and network with other professionals to share ideas.</p>
              <button onClick={onExplore} className="px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black hover:bg-slate-900 transition-all">Find a Gig</button>
            </div>
            <div className="p-16 bg-slate-900 rounded-[60px] border border-slate-800 shadow-3xl animate-slide-right">
              <Briefcase className="w-16 h-16 text-indigo-500 mb-8" />
              <h3 className="text-5xl font-black text-white mb-6 tracking-tight">For Hirers</h3>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">Access verified individual accounts and skills. Scout talent based on recent professional searches.</p>
              <button onClick={onPost} className="px-10 py-5 bg-white text-slate-900 rounded-3xl font-black hover:bg-indigo-600 hover:text-white transition-all">Post Project</button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT FOUNDER SECTION */}
      <section className="py-40 bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-1/2 relative animate-zoom-in">
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden border-[12px] border-white dark:border-slate-900 shadow-4xl">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" alt="Founder" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-indigo-600 p-8 rounded-[40px] text-white shadow-3xl animate-bounce-slow">
              <School className="w-12 h-12 mb-2" />
              <p className="text-xl font-black">AAUA Student</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-10 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-black text-xs uppercase tracking-widest">
              <Rocket className="w-4 h-4" /> The Visionary
            </div>
            <h2 className="text-6xl font-black dark:text-white leading-[0.9] tracking-tighter">Ayuba Boluwatife <br />Oluwapelumi <br /><span className="text-indigo-600">(OBA)</span></h2>
            <p className="text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
              "As a Finance student at Adekunle Ajasin University (AAUA), I built oGig to solve the trust gap in Nigeria's service economy."
            </p>
            <button onClick={() => window.location.hash = 'founder'} className="px-10 py-5 bg-slate-900 dark:bg-white dark:text-slate-950 text-white rounded-3xl font-black text-lg flex items-center gap-3 hover:scale-105 transition-all">
              Founder Profile <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
