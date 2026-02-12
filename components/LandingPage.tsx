
import React from 'react';
import { 
  ArrowRight, Zap, Sparkles, Briefcase, Users, Globe, 
  Target, Rocket, ShieldCheck, School, Building2, ChevronRight,
  TrendingUp, Award, CheckCircle
} from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
  onPost: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onPost }) => {
  const corporateLogos = [
    { name: 'Flutterwave', icon: <Zap className="text-indigo-500" /> },
    { name: 'Dangote Group', icon: <Building2 className="text-green-600" /> },
    { name: 'Google', icon: <Globe className="text-blue-500" /> },
    { name: 'Microsoft', icon: <Target className="text-indigo-400" /> },
    { name: 'Zenith Bank', icon: <ShieldCheck className="text-red-600" /> },
    { name: 'Andela', icon: <Rocket className="text-indigo-700" /> },
    { name: 'MTN Nigeria', icon: <Zap className="text-yellow-500" /> },
    { name: 'Paystack', icon: <TrendingUp className="text-blue-600" /> },
  ];

  const universityLogos = [
    { name: 'AAUA', icon: <School className="text-orange-500" /> },
    { name: 'UNILAG', icon: <School className="text-blue-900" /> },
    { name: 'University of Ibadan', icon: <School className="text-indigo-900" /> },
    { name: 'OAU', icon: <School className="text-blue-500" /> },
    { name: 'UNN', icon: <School className="text-green-800" /> },
    { name: 'Covenant Uni', icon: <School className="text-indigo-600" /> },
  ];

  return (
    <div className="space-y-0 overflow-hidden bg-white dark:bg-slate-950">
      {/* 1. HERO VISUAL (ABOVE TEXT) */}
      <section className="relative pt-10 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-white dark:border-slate-900 group h-[400px] md:h-[650px]">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000" 
              alt="Nigerian Talent Workforce" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[8s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
            <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="animate-fade-up">
                <div className="px-6 py-2 bg-indigo-600 text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl inline-block mb-4">
                  Nigeria's Premium Talent Nexus
                </div>
                <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                  Find Talent.<br />
                  <span className="text-indigo-500 italic">Claim Gigs.</span>
                </h1>
              </div>
              <div className="flex -space-x-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-16 h-16 rounded-full border-4 border-slate-900 bg-slate-800 overflow-hidden shadow-2xl">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="User" />
                  </div>
                ))}
                <div className="w-16 h-16 rounded-full border-4 border-slate-900 bg-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-2xl">+5k</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUB-HERO DESCRIPTION & CTA */}
      <section className="relative pt-24 pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed mb-16">
            The high-performance platform connecting verified talent with premium professional opportunities. Designed in Nigeria for the global workforce.
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

      {/* 3. LOGO MARQUEE (COMPANIES & UNIVERSITIES) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden border-y border-slate-100 dark:border-slate-800">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Trusted By Global Corporations & Institutions</p>
        </div>
        <div className="flex whitespace-nowrap animate-marquee items-center gap-20 py-4">
          {[...corporateLogos, ...universityLogos, ...corporateLogos, ...universityLogos].map((logo, i) => (
            <div key={i} className="flex items-center gap-4 text-slate-400 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-default">
              <div className="w-10 h-10">{logo.icon}</div>
              <span className="text-2xl font-black tracking-tighter uppercase whitespace-nowrap">{logo.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DUAL VALUE PROPOSITION */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-16 bg-white dark:bg-slate-900 rounded-[60px] border border-slate-100 dark:border-slate-800 shadow-3xl animate-slide-left group hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-500">
              <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-5xl font-black dark:text-white mb-6 tracking-tight">For Employee</h3>
              <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium">Complete your professional profile, showcase your works, follow peers at AAUA and beyond, and claim high-paying gigs.</p>
              <button onClick={onExplore} className="px-12 py-5 bg-indigo-600 text-white rounded-3xl font-black text-lg hover:bg-slate-900 transition-all shadow-xl">Get Started</button>
            </div>
            
            <div className="p-16 bg-slate-900 rounded-[60px] border border-slate-800 shadow-3xl animate-slide-right group hover:bg-slate-800 transition-all duration-500">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <Briefcase className="w-10 h-10 text-indigo-500" />
              </div>
              <h3 className="text-5xl font-black text-white mb-6 tracking-tight">For Employer</h3>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed font-medium">Scout verified talents, browse professional portfolios, and post employment jobs. Access detailed skills from recent searches.</p>
              <button onClick={onPost} className="px-12 py-5 bg-white text-slate-900 rounded-3xl font-black text-lg hover:bg-indigo-600 hover:text-white transition-all shadow-xl">Hire Talent</button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SUBTLE FOUNDER HOOK */}
      <section className="py-40 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-[60px] p-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-slate-100 dark:border-slate-800 group cursor-pointer hover:border-indigo-600/30 transition-all" onClick={() => window.location.hash = 'founder'}>
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="relative">
                <div className="w-32 h-32 rounded-[40px] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl grayscale group-hover:grayscale-0 transition-all">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ayuba" alt="OBA" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-2 rounded-xl text-white shadow-xl">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-3xl font-black dark:text-white tracking-tighter">OBA Vision</h4>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Connecting AAUA to the World</p>
                <p className="text-slate-400 mt-4 max-w-md font-medium">"I built oGig to bridge the trust gap in the Nigerian service economy through clean financial logic and code."</p>
              </div>
            </div>
            <button className="p-6 bg-white dark:bg-slate-800 rounded-full shadow-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <ChevronRight className="w-10 h-10" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
