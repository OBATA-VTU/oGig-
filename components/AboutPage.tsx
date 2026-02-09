
import React from 'react';
import { Globe, Github, Twitter, Facebook, School, Award, Briefcase, Zap, Heart, MapPin } from 'lucide-react';

interface AboutPageProps {
  type: 'platform' | 'founder';
}

const AboutPage: React.FC<AboutPageProps> = ({ type }) => {
  if (type === 'founder') {
    return (
      <div className="max-w-7xl mx-auto py-24 px-4 space-y-32 animate-fade-in">
        <section className="flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-5/12 relative">
             <div className="aspect-[3/4] rounded-[80px] overflow-hidden shadow-4xl border-[16px] border-white dark:border-slate-900">
               <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale" />
             </div>
             <div className="absolute -bottom-10 -right-10 bg-indigo-600 p-10 rounded-[40px] text-white shadow-3xl animate-float">
                <School className="w-16 h-16 mb-4" />
                <p className="text-2xl font-black leading-none">AAUA</p>
                <p className="text-xs font-black uppercase tracking-widest opacity-60 mt-1">Finance Dept</p>
             </div>
          </div>
          <div className="w-full md:w-7/12 space-y-10">
            <h1 className="text-8xl md:text-[10rem] font-black text-slate-900 dark:text-white leading-[0.8] tracking-tighter">
              Ayuba <br />Boluwatife <br /><span className="text-indigo-600">Oluwapelumi.</span>
            </h1>
            <p className="text-4xl font-black text-slate-400">Popularly Known as OBA</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
               <div className="space-y-4">
                  <h4 className="flex items-center gap-3 text-2xl font-black dark:text-white"><School className="text-indigo-600" /> Education</h4>
                  <p className="text-lg text-slate-500 font-medium">Student of Adekunle Ajasin University, Akungba Akoko (AAUA), Ondo State. Specializing in Financial Systems.</p>
               </div>
               <div className="space-y-4">
                  <h4 className="flex items-center gap-3 text-2xl font-black dark:text-white"><Award className="text-indigo-600" /> Mission</h4>
                  <p className="text-lg text-slate-500 font-medium">To create digital utilities that empower the Nigerian professional through clean code and financial logic.</p>
               </div>
            </div>
            <div className="flex gap-6 pt-10">
               <SocialBtn icon={<Facebook />} link="https://facebook.com/OBAOFAAUA" />
               <SocialBtn icon={<Twitter />} link="https://twitter.com/OBA_AAUA" />
               <SocialBtn icon={<Github />} link="https://github.com/Edunetx" />
               <SocialBtn icon={<Globe />} link="https://obaofaaua.vercel.app" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 space-y-32 animate-fade-in">
        <section className="text-center max-w-4xl mx-auto space-y-12">
           <h1 className="text-8xl font-black dark:text-white tracking-tighter leading-[0.8]">The <span className="text-indigo-600">oGig</span> <br /> Manifesto.</h1>
           <p className="text-3xl text-slate-500 font-medium leading-relaxed">oGig is more than a job board; it's a digital ecosystem built to bridge the trust gap in the Nigerian workforce.</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           <ValueCard icon={<Zap />} title="Hyper-Speed" desc="Connect with talent and clients in milliseconds." />
           <ValueCard icon={<Heart />} title="Verified Trust" desc="Security gated access for high-value professional links." />
           <ValueCard icon={<Briefcase />} title="Enterprise Class" desc="Tools designed for serious business scaling." />
        </div>
    </div>
  );
};

const SocialBtn = ({ icon, link }: any) => (
  <a href={link} target="_blank" className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl hover:text-indigo-600 transition-all text-slate-400">{icon}</a>
);

const ValueCard = ({ icon, title, desc }: any) => (
  <div className="p-16 bg-white dark:bg-slate-900 rounded-[60px] border border-slate-50 dark:border-slate-800 shadow-3xl space-y-8 hover:-translate-y-4 transition-all">
     <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-3xl flex items-center justify-center text-indigo-600">{icon}</div>
     <h3 className="text-4xl font-black dark:text-white leading-none">{title}</h3>
     <p className="text-xl text-slate-500 font-medium">{desc}</p>
  </div>
);

export default AboutPage;
