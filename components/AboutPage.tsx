
import React from 'react';
import { Globe, Github, Twitter, ExternalLink, Code2, Heart, Award, Sparkles, Target, Zap, User, Briefcase, Facebook, Smartphone, CreditCard } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-20">
        
        {/* Profile Sidebar */}
        <div className="lg:col-span-5 space-y-12">
          <div className="relative group mx-auto max-w-sm lg:max-w-none">
            <div className="absolute -inset-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-[80px] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative rounded-[70px] overflow-hidden border-[12px] border-white shadow-3xl bg-slate-900 aspect-square flex items-center justify-center">
              {/* Using a high-quality stylized avatar as the user image source isn't hosted, he can replace this easily */}
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=oba-founder&backgroundColor=6366f1" 
                className="w-full h-full object-cover scale-110" 
                alt="OBA - Founder" 
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-[32px] shadow-2xl border border-slate-100 flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-2xl">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-slate-900 font-black text-lg leading-tight tracking-tight">Verified Founder</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">oGig Network</p>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left space-y-8 px-4">
            <div>
              <h1 className="text-7xl font-black text-slate-900 tracking-tighter mb-2">I am OBA.</h1>
              <p className="text-2xl font-black text-indigo-600 uppercase tracking-widest text-sm flex items-center justify-center lg:justify-start gap-3">
                <Zap className="w-5 h-5 fill-indigo-600" />
                Software Architect
              </p>
            </div>
            
            <p className="text-xl text-slate-500 font-bold leading-relaxed">
              Nigerian Citizen. Yoruba Tribe. Proud Creator. My mission is to build digital tools that empower the average person to find financial success and seamless online verification.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
              <SocialLink icon={<Facebook />} href="https://facebook.com/OBAOFAAUA" label="Facebook" />
              <SocialLink icon={<Twitter />} href="https://twitter.com/OBA_AAUA" label="Twitter" />
              <SocialLink icon={<Globe />} href="https://obaofaaua.vercel.app" label="Website" />
              <SocialLink icon={<Github />} href="https://github.com/Edunetx" label="GitHub" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-7 space-y-20 pt-10">
          <section className="bg-white p-12 md:p-16 rounded-[60px] border border-slate-100 shadow-2xl shadow-indigo-50/50 space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl"></div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
              <Code2 className="w-10 h-10 text-indigo-600" />
              Building for Nigeria
            </h2>
            <div className="space-y-8 text-xl text-slate-600 font-medium leading-relaxed">
              <p>
                As a developer from the Yoruba tribe in Nigeria, I've seen the hustle firsthand. oGig isn't just a website; it's a bridge. It's built with the <strong>"Omoluabi"</strong> spirit—integrity, hard work, and excellence.
              </p>
              <p>
                I focus on high-performance architecture and user experience. My goal is to make the process of finding a gig or verifying an online presence as simple as possible for my fellow citizens.
              </p>
            </div>
          </section>

          <section className="space-y-12 px-4">
            <div className="flex items-center gap-4">
              <Briefcase className="w-8 h-8 text-indigo-600" />
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">OBA's Ecosystem</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeaturedProject 
                title="oPlug" 
                url="oplug.vercel.app" 
                desc="Purchase data, airtime, and pay bills like electricity, TV, and water subscriptions seamlessly. Also supports gift cards." 
                icon={<CreditCard className="w-8 h-8 text-white" />}
              />
              <FeaturedProject 
                title="oBanum" 
                url="obanum.vercel.app" 
                desc="Generate temporary phone numbers from 200+ countries for secure online verification purposes." 
                icon={<Smartphone className="w-8 h-8 text-white" />}
              />
            </div>
          </section>

          <section className="bg-slate-950 p-16 rounded-[80px] text-white relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-transparent"></div>
            <h3 className="text-3xl font-black tracking-tight flex items-center gap-4 mb-10 relative z-10">
              <Sparkles className="w-8 h-8 text-indigo-500" />
              Design Principles
            </h3>
            <div className="grid grid-cols-1 gap-8 relative z-10">
              <PrincipleRow title="Local First" text="Tools that understand the unique challenges of the Nigerian market." />
              <PrincipleRow title="Zero Friction" text="Instant contact, smart triggers, and verified opportunities only." />
              <PrincipleRow title="High Craft" text="Every pixel and line of code is optimized for excellence by OBA." />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const SocialLink = ({ icon, href, label }: { icon: React.ReactNode, href: string, label: string }) => (
  <a href={href} target="_blank" rel="noreferrer" className="group relative flex items-center justify-center w-16 h-16 bg-white rounded-3xl shadow-xl hover:bg-indigo-600 transition-all duration-300">
    <span className="sr-only">{label}</span>
    {React.cloneElement(icon as React.ReactElement, { className: 'w-7 h-7 text-slate-900 group-hover:text-white transition-colors' })}
  </a>
);

const FeaturedProject = ({ title, url, desc, icon }: { title: string, url: string, desc: string, icon: React.ReactNode }) => (
  <a href={`https://${url}`} target="_blank" rel="noreferrer" className="group bg-white p-10 rounded-[48px] border border-slate-100 shadow-2xl hover:shadow-indigo-100 hover:border-indigo-500 transition-all flex flex-col items-start gap-6">
    <div className="bg-slate-900 p-5 rounded-[28px] group-hover:bg-indigo-600 transition-colors shadow-xl shadow-slate-100">
      {icon}
    </div>
    <div className="space-y-3">
      <div className="flex justify-between items-center w-full">
        <h4 className="text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{title}</h4>
        <ExternalLink className="w-6 h-6 text-slate-300" />
      </div>
      <p className="text-slate-500 text-lg font-bold leading-snug">{desc}</p>
      <p className="text-indigo-600 font-black text-xs uppercase tracking-widest pt-4">{url}</p>
    </div>
  </a>
);

const PrincipleRow = ({ title, text }: { title: string, text: string }) => (
  <div className="flex gap-8 items-start">
    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-3"></div>
    <div>
      <h4 className="text-xl font-black text-indigo-400 uppercase tracking-widest mb-1">{title}</h4>
      <p className="text-slate-400 font-bold leading-relaxed">{text}</p>
    </div>
  </div>
);

export default AboutPage;
