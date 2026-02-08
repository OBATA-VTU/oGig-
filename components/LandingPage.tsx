
import React from 'react';
import { 
  ArrowRight, Zap, ShieldCheck, Search, CheckCircle2, 
  TrendingUp, Star, MessageSquare, Briefcase, Globe,
  Rocket, Users, Shield, Award
} from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onExplore }) => {
  return (
    <div className="space-y-0 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-20">
        <div className="absolute inset-0 z-[-1]">
          <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl dark:bg-indigo-900/20"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl dark:bg-purple-900/20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full font-bold text-xs uppercase tracking-widest">
                <Star className="w-3.5 h-3.5 fill-current" />
                Empowering Local Talent
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                Connect With <br />
                <span className="text-indigo-600">Great Gigs.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                oGig is a simple platform dedicated to helping Nigerians find meaningful work and reliable services. Start your next project today.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button 
                  onClick={onExplore}
                  className="w-full sm:w-auto px-10 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl active:scale-95"
                >
                  Explore Gigs
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => window.location.hash = 'post'}
                  className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-slate-900 dark:text-white text-slate-900 border-2 border-slate-900 dark:border-slate-700 rounded-2xl font-black text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Post a Job
                </button>
              </div>
              
              <div className="flex items-center gap-4 justify-center lg:justify-start pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900" alt="User" />
                  ))}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">Trusted by 500+ active workers</p>
              </div>
            </div>

            <div className="relative animate-fade-up hidden lg:block" style={{ animationDelay: '0.2s' }}>
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1000" 
                  alt="Team working" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xl font-black dark:text-white tracking-tighter">Verified</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">100% Secure Posts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-black dark:text-white tracking-tight">Built for Reliability</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Simple tools to bridge the gap between skill and opportunity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="w-8 h-8" />}
              title="Secure Connections"
              desc="We verify employers and service providers to ensure a safe workspace for everyone."
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8" />}
              title="Instant Updates"
              desc="Real-time notifications for the latest gigs in your location and category."
            />
            <FeatureCard 
              icon={<Award className="w-8 h-8" />}
              title="Verified Talent"
              desc="Showcase your skills with a professional profile that employers can trust."
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black dark:text-white tracking-tight">Getting Started is Easy</h2>
              <div className="space-y-8">
                <Step num="01" title="Create a Profile" desc="Set up your account in minutes. Add your skills and preferred job types." />
                <Step num="02" title="Browse Open Gigs" desc="Use our advanced search to find work that fits your schedule and rate." />
                <Step num="03" title="Apply & Connect" desc="Contact employers directly through our secure messaging or provided links." />
              </div>
            </div>
            <div className="bg-slate-900 dark:bg-indigo-950 p-12 rounded-[40px] text-white space-y-8">
              <h3 className="text-3xl font-black">Why oGig?</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                oGig was created by OBA with a simple goal: to help the hardworking Nigerian community find gigs without the hassle of complex corporate portals.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> No hidden service fees</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> Direct communication with hirers</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> Mobile-first user experience</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Spotlight */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <h2 className="text-4xl font-black dark:text-white tracking-tight">Popular Service Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Logistics', 'Web Design', 'Construction', 'Cleaning', 'Marketing', 'Writing', 'Repair', 'Tailoring'].map(cat => (
              <div key={cat} className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-indigo-500 transition-all cursor-pointer">
                <p className="font-bold dark:text-white">{cat}</p>
              </div>
            ))}
          </div>
          <button onClick={onExplore} className="text-indigo-600 dark:text-indigo-400 font-black flex items-center gap-2 mx-auto hover:gap-4 transition-all">
            See All Gigs <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 dark:bg-indigo-700 rounded-[48px] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 max-w-2xl space-y-8">
              <ShieldCheck className="w-16 h-16" />
              <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">Your Safety is Our Top Priority.</h2>
              <p className="text-xl text-indigo-100 font-medium">
                We implement strict security measures to protect users from scams and low-quality posts. Every gig on oGig is manually reviewed or posted by trusted community members.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button onClick={() => window.location.hash = 'safety'} className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-black text-sm hover:scale-105 transition-all">Safety Tips</button>
                <button onClick={() => window.location.hash = 'privacy'} className="px-8 py-3 bg-indigo-500 text-white border border-indigo-400 rounded-xl font-black text-sm">Privacy Shield</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 text-center space-y-10">
        <h2 className="text-5xl font-black dark:text-white tracking-tighter">Ready to Work?</h2>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Join the community today and unlock a world of professional opportunities tailored for the Nigerian market.
        </p>
        <div className="pt-6">
          <button 
            onClick={onExplore}
            className="px-16 py-6 bg-slate-900 dark:bg-indigo-600 text-white rounded-[24px] font-black text-2xl shadow-2xl hover:scale-105 transition-all"
          >
            Start Earning Now
          </button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all">
    <div className="text-indigo-600 dark:text-indigo-400 mb-6">{icon}</div>
    <h3 className="text-xl font-black mb-3 dark:text-white">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">{desc}</p>
  </div>
);

const Step = ({ num, title, desc }: any) => (
  <div className="flex gap-6">
    <div className="text-3xl font-black text-indigo-600/20 tabular-nums">{num}</div>
    <div>
      <h4 className="text-xl font-black mb-2 dark:text-white">{title}</h4>
      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default LandingPage;
