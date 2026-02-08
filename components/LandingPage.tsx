
import React from 'react';
import { ArrowRight, Sparkles, Users, Zap, ShieldCheck, MapPin, Search, Globe, ChevronRight, CheckCircle2, TrendingUp, Handshake, Target, Briefcase, Star, MessageSquare } from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onExplore }) => {
  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative pt-24 pb-40 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 -z-10 w-[1200px] h-[1200px] bg-indigo-50/40 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-[800px] h-[800px] bg-purple-50/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-14 text-center lg:text-left">
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-slate-900 rounded-full shadow-2xl shadow-slate-200">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Nigeria's Premium Job Network</span>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-black text-slate-900 leading-[0.85] tracking-tighter">
                Better Gigs.<br />
                <span className="text-indigo-600">Pure Hustle.</span><br />
                Total Freedom.
              </h1>
              
              <p className="text-2xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-semibold">
                Verified opportunities for the Nigerian spirit. Connect directly with clients. No middleman, no stress.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
                <button 
                  onClick={onExplore}
                  className="group px-14 py-7 bg-slate-900 text-white rounded-[40px] font-black text-2xl flex items-center gap-5 hover:bg-indigo-600 transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.4)] active:scale-95"
                >
                  Explore Now
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </button>
                <div className="flex flex-col items-center lg:items-start gap-2">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user-${i}`} className="w-14 h-14 rounded-[20px] border-4 border-white shadow-xl" alt="Active User" />
                    ))}
                  </div>
                  <p className="font-black text-slate-400 text-xs uppercase tracking-widest">Join 12,000+ Verified Hustlers</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-[80px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-[16px] border-white transform lg:-rotate-2 hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Productivity" 
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-16 left-16 right-16 text-white">
                  <div className="bg-white/20 backdrop-blur-md p-6 rounded-[32px] border border-white/20">
                    <h4 className="text-3xl font-black tracking-tight mb-2">Social Media Specialist</h4>
                    <p className="font-black text-indigo-400 text-sm uppercase tracking-widest">Lagos • ₦250k / Month</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-12 -right-12 z-20 bg-indigo-600 p-10 rounded-[48px] shadow-3xl animate-bounce-slow">
                <Star className="w-12 h-12 text-white fill-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-40 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-6xl font-black text-slate-900 tracking-tighter">Choose Your Path</h2>
              <p className="text-2xl text-slate-500 font-bold leading-relaxed">From tech giants to local home services, oGig covers it all.</p>
            </div>
            <div className="bg-white px-8 py-5 rounded-3xl border border-slate-200 flex items-center gap-4">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
              <div>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">800+</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Gigs Added This Week</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <ModernCategoryCard title="Tech & Dev" img="https://images.pexels.com/photos/3183158/pexels-photo-3183158.jpeg?auto=compress&cs=tinysrgb&w=800" count="210" color="bg-blue-500" />
            <ModernCategoryCard title="Logistics" img="https://images.pexels.com/photos/6169033/pexels-photo-6169033.jpeg?auto=compress&cs=tinysrgb&w=800" count="450" color="bg-emerald-500" />
            <ModernCategoryCard title="Home Services" img="https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=800" count="820" color="bg-amber-500" />
            <ModernCategoryCard title="Writing" img="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800" count="180" color="bg-rose-500" />
            <ModernCategoryCard title="Marketing" img="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" count="140" color="bg-indigo-500" />
            <ModernCategoryCard title="Healthcare" img="https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=800" count="95" color="bg-teal-500" />
          </div>
        </div>
      </section>

      {/* Trust & Verification Section */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[100px] p-20 md:p-32 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">Security Built In.</h2>
                <p className="text-2xl text-slate-400 font-medium leading-relaxed">We protect your hustle. Every gig marked with the oGig seal is verified by our specialist team.</p>
                <div className="grid grid-cols-1 gap-8">
                  <TrustFeature icon={<ShieldCheck />} title="Vetted Employers" text="We audit every partner project for safety and fair pay." />
                  <TrustFeature icon={<Zap />} title="Direct Contact" text="Call or WhatsApp clients instantly with zero fees." />
                  <TrustFeature icon={<MessageSquare />} title="Real Support" text="Our Lagos-based support team is always active." />
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-2xl p-16 rounded-[80px] border border-white/10 text-center">
                <div className="bg-indigo-600 w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-2xl">
                  <Globe className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-4xl font-black mb-6">Nigeria's Trust Network</h3>
                <p className="text-slate-400 text-xl font-medium mb-12 leading-relaxed">The only platform that understands the local landscape perfectly.</p>
                <button onClick={onExplore} className="w-full py-7 bg-white text-slate-900 rounded-[40px] font-black text-2xl hover:bg-indigo-50 transition-all shadow-2xl">Start Searching</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Final CTA */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-20">
          <div className="space-y-6">
            <h2 className="text-6xl font-black text-slate-900 tracking-tighter">Ready to earn?</h2>
            <p className="text-2xl text-slate-500 font-bold leading-relaxed">Join the thousands of Nigerians who find their next paycheck on oGig every single day.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <button onClick={onExplore} className="px-14 py-7 bg-slate-900 text-white rounded-[40px] font-black text-2xl shadow-3xl hover:bg-indigo-600 transition-all">Browse Gigs Now</button>
            <button onClick={() => window.location.hash = 'post'} className="px-14 py-7 bg-white border-4 border-slate-900 text-slate-900 rounded-[40px] font-black text-2xl hover:bg-slate-50 transition-all">Post a Gig</button>
          </div>

          <div className="pt-20 border-t border-slate-100 flex flex-wrap justify-center gap-x-16 gap-y-10">
            <StatSmall label="Active Gigs" value="2.5k+" />
            <StatSmall label="Monthly Earners" value="10k+" />
            <StatSmall label="Verified Partners" value="150+" />
          </div>
        </div>
      </section>
    </div>
  );
};

const ModernCategoryCard = ({ title, img, count, color }: { title: string, img: string, count: string, color: string }) => (
  <div className="group relative h-[450px] rounded-[60px] overflow-hidden shadow-2xl cursor-pointer">
    <img src={img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={title} />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
    <div className="absolute top-10 right-10">
      <div className={`${color} px-6 py-2 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-xl`}>{count} Live</div>
    </div>
    <div className="absolute bottom-12 left-12 right-12 space-y-4">
      <h3 className="text-4xl font-black text-white tracking-tight">{title}</h3>
      <div className="h-2 w-12 bg-indigo-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
    </div>
  </div>
);

const TrustFeature = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <div className="flex gap-8 items-start group">
    <div className="p-5 bg-white/10 rounded-[28px] group-hover:bg-indigo-600 transition-colors">{React.cloneElement(icon as React.ReactElement, { className: 'w-8 h-8 text-white' })}</div>
    <div>
      <h4 className="text-2xl font-black text-white tracking-tight mb-2">{title}</h4>
      <p className="text-lg text-slate-400 font-medium leading-snug">{text}</p>
    </div>
  </div>
);

const StatSmall = ({ label, value }: { label: string, value: string }) => (
  <div className="text-center">
    <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{value}</p>
    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</p>
  </div>
);

export default LandingPage;
