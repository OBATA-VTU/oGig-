
import React from 'react';
import { Globe, Github, Twitter, Code2, Award, Zap, Briefcase, Facebook } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 animate-in fade-in slide-in-from-bottom-8 duration-700 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Humble Profile Section */}
        <div className="lg:col-span-5 space-y-10">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="relative rounded-[48px] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl aspect-[4/5] bg-slate-100 dark:bg-slate-800">
              {/* Note: User requested their picture, using a professional high-quality placeholder for now */}
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover grayscale transition-all duration-700 hover:grayscale-0" 
                alt="Founder Portrait" 
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <Award className="w-5 h-5 text-indigo-600" />
              <p className="text-slate-900 dark:text-white font-black text-sm">Verified Developer</p>
            </div>
          </div>

          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">The Mission.</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              I am a software engineer dedicated to creating simple, effective digital solutions for the Nigerian community. oGig is a personal commitment to bridging the gap between talent and opportunity.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <a href="https://facebook.com/OBAOFAAUA" target="_blank" className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-md hover:text-indigo-600 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="https://twitter.com/OBA_AAUA" target="_blank" className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-md hover:text-indigo-600 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="https://github.com/Edunetx" target="_blank" className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-md hover:text-indigo-600 transition-colors"><Github className="w-5 h-5" /></a>
              <a href="https://obaofaaua.vercel.app" target="_blank" className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-md hover:text-indigo-600 transition-colors"><Globe className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        {/* Story & Projects Area */}
        <div className="lg:col-span-7 space-y-12">
          <section className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <Code2 className="w-6 h-6 text-indigo-600" />
              Empowering Through Code
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              <p>
                My name is OBA. I believe technology should be a utility that makes everyday life easier. oGig was built to provide a reliable space for Nigerians to connect with professional gigs without unnecessary complexity.
              </p>
              <p>
                The platform is designed to be mobile-first, lightweight, and focused on performance—ensuring that every user, regardless of their device, can find their next gig efficiently.
              </p>
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              Community Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:border-indigo-400">
                <h4 className="font-black text-lg mb-2 dark:text-white">oPlug</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">A seamless utility hub for bill payments and digital services.</p>
                <a href="https://oplug.vercel.app" target="_blank" className="text-xs font-black text-indigo-600 uppercase mt-4 block tracking-widest">Visit Platform</a>
              </div>
              <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:border-indigo-400">
                <h4 className="font-black text-lg mb-2 dark:text-white">oBanum</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Secure verification tools for modern online interactions.</p>
                <a href="https://obanum.vercel.app" target="_blank" className="text-xs font-black text-indigo-600 uppercase mt-4 block tracking-widest">Visit Platform</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
