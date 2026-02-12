
import React from 'react';
import { Github, Twitter, Facebook, School, Award, Briefcase, Zap, Heart, MapPin, Globe, ArrowRight, Star, ShieldCheck } from 'lucide-react';

const FounderPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-24 px-4 space-y-32 animate-fade-in">
      {/* 1. IDENTITY BLOCK */}
      <section className="flex flex-col md:flex-row items-center gap-20">
        <div className="w-full md:w-5/12 relative">
           <div className="aspect-[3/4] rounded-[80px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[16px] border-white dark:border-slate-900 group">
             <img 
               src="https://api.dicebear.com/7.x/avataaars/svg?seed=AyubaBolu" 
               className="w-full h-full object-cover bg-slate-100 dark:bg-slate-800 transition-transform duration-700 group-hover:scale-110" 
               alt="OBA"
             />
           </div>
           <div className="absolute -bottom-10 -right-10 bg-indigo-600 p-10 rounded-[40px] text-white shadow-3xl animate-float">
              <School className="w-16 h-16 mb-4" />
              <p className="text-2xl font-black leading-none tracking-tighter">AAUA</p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mt-2">Finance Unit</p>
           </div>
        </div>
        
        <div className="w-full md:w-7/12 space-y-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-[0.4em] mb-4">
               <Star className="w-4 h-4" /> The Architect
            </div>
            <h1 className="text-7xl md:text-[9rem] font-black text-slate-900 dark:text-white leading-[0.8] tracking-tighter">
              Ayuba <br />
              Boluwatife <br />
              <span className="text-indigo-600">Oluwapelumi.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6 p-8 bg-slate-50 dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800">
            <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-xl text-white shrink-0">
               <Zap className="w-10 h-10 fill-white" />
            </div>
            <p className="text-2xl font-black dark:text-white tracking-tight">Popularly known as <span className="text-indigo-600 italic">OBA.</span></p>
          </div>

          <p className="text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
            A strategic visionary and Finance student at <span className="text-slate-900 dark:text-white font-black underline decoration-indigo-500 decoration-4 underline-offset-8">Adekunle Ajasin University, Akungba Akoko (AAUA)</span>, Ondo State.
          </p>

          <div className="flex gap-6 pt-4">
             <SocialBtn icon={<Facebook />} link="https://facebook.com/OBAOFAAUA" />
             <SocialBtn icon={<Twitter />} link="https://twitter.com/OBA_AAUA" />
             <SocialBtn icon={<Github />} link="https://github.com/Edunetx" />
             <SocialBtn icon={<Globe />} link="https://obaofaaua.vercel.app" />
          </div>
        </div>
      </section>

      {/* 2. THE MISSION MATRIX */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
         <MissionCard 
           icon={<ShieldCheck />} 
           title="Trust Nexus" 
           desc="Solving the trust gap in the Nigerian service economy through clean financial logic and verifiable code." 
         />
         <MissionCard 
           icon={<Target />} 
           title="AAUA Focus" 
           desc="Empowering the student workforce and alumni to reach global corporations directly from Akungba." 
         />
         <MissionCard 
           icon={<Rocket />} 
           title="Hyper-Speed" 
           desc="Designed for rapid professional dissemination. Minimal friction, maximal professional impact." 
         />
      </section>

      {/* 3. FINAL NOTE */}
      <section className="py-32 text-center bg-slate-950 rounded-[80px] text-white overflow-hidden relative border border-white/5">
        <div className="absolute inset-0 bg-indigo-600/5 rotate-12 scale-150"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-12">
          <Star className="w-20 h-20 text-indigo-500 mx-auto animate-pulse" />
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic">
            "Software is the <br /> New Finance."
          </h2>
          <p className="text-2xl text-slate-400 font-medium px-8">
            The future of oGig is built on the intersection of strategic financial management and high-performance digital architecture.
          </p>
          <button 
            onClick={() => window.location.hash = ''} 
            className="group px-16 py-8 bg-indigo-600 text-white rounded-[40px] font-black text-2xl shadow-3xl hover:scale-105 transition-all flex items-center gap-4 mx-auto"
          >
            Nexus Core <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

const SocialBtn = ({ icon, link }: { icon: React.ReactNode, link: string }) => (
  <a href={link} target="_blank" rel="noreferrer" className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl hover:text-indigo-600 transition-all border border-slate-50 dark:border-slate-800 text-slate-400 group">
    <div className="group-hover:scale-110 transition-transform">{icon}</div>
  </a>
);

const MissionCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-16 bg-white dark:bg-slate-900 rounded-[60px] border border-slate-50 dark:border-slate-800 shadow-3xl space-y-8 hover:-translate-y-4 transition-all group">
     <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/30 rounded-[32px] flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">{icon}</div>
     <h3 className="text-4xl font-black dark:text-white leading-none tracking-tight">{title}</h3>
     <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default FounderPage;
