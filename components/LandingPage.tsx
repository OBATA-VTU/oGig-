
import React from 'react';
import { 
  ArrowRight, Zap, ShieldCheck, Search, CheckCircle2, 
  TrendingUp, Star, MessageSquare, Briefcase, Globe,
  Rocket, Users, Shield, Award, Sparkles, Target, 
  MapPin, Phone, Mail, ChevronRight, HelpCircle,
  Smartphone, Lock, Share2, Layers
} from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onExplore }) => {
  return (
    <div className="space-y-0 overflow-hidden bg-white dark:bg-slate-950">
      {/* 1. HERO SECTION - ULTRA PREMIUM */}
      <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] dark:bg-indigo-900/20 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] dark:bg-purple-900/20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 text-center lg:text-left animate-fade-up">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-50/50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-black text-xs uppercase tracking-[0.2em] backdrop-blur-sm border border-indigo-100 dark:border-indigo-800">
                <Sparkles className="w-4 h-4 fill-current animate-pulse" />
                Nigeria's #1 Gig Nexus
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                Find Talent.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x">Claim Gigs.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                The high-performance platform connecting verified talent with premium opportunities. Built for the modern Nigerian workforce.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                <button 
                  onClick={onExplore}
                  className="group relative w-full sm:w-auto px-12 py-6 bg-slate-900 dark:bg-indigo-600 text-white rounded-[24px] font-black text-xl flex items-center justify-center gap-4 hover:scale-105 transition-all shadow-2xl active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  Start Exploring
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                <button 
                  onClick={() => window.location.hash = 'post'}
                  className="w-full sm:w-auto px-12 py-6 bg-white dark:bg-slate-900 dark:text-white text-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-[24px] font-black text-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xl"
                >
                  Post a Gig
                </button>
              </div>
              
              <div className="flex items-center gap-6 justify-center lg:justify-start pt-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=oba${i}`} className="w-14 h-14 rounded-full border-4 border-white dark:border-slate-950 shadow-lg" alt="User" />
                  ))}
                  <div className="w-14 h-14 rounded-full border-4 border-white dark:border-slate-950 bg-indigo-600 flex items-center justify-center text-white text-xs font-black">+1k</div>
                </div>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">Trusted by over 5,000 users</p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-up hidden lg:block" style={{ animationDelay: '0.3s' }}>
              <div className="relative z-10 rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-white dark:border-slate-900 group">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
                  alt="Productive Team" 
                  className="w-full h-auto object-cover aspect-[4/5] group-hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white text-lg font-bold italic leading-relaxed">"oGig completely changed how I source freelance talent in Lagos. Instant, verified, and professional."</p>
                  <p className="text-indigo-300 font-black uppercase tracking-widest text-xs mt-4">— Adewale P., Tech Lead</p>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-10 -right-10 z-20 bg-white dark:bg-slate-800 p-8 rounded-[40px] shadow-3xl border border-slate-100 dark:border-slate-700 animate-bounce-slow">
                <TrendingUp className="w-10 h-10 text-emerald-500 mb-2" />
                <p className="text-2xl font-black dark:text-white tracking-tighter">98%</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Success Rate</p>
              </div>

              <div className="absolute top-1/2 -left-20 z-20 bg-indigo-600 p-8 rounded-[40px] shadow-3xl text-white animate-float">
                <Briefcase className="w-10 h-10 mb-2" />
                <p className="text-2xl font-black tracking-tighter">500+</p>
                <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">Active Jobs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMPACT STATS SECTION */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Active Talent', value: '12K+', color: 'text-indigo-600' },
              { label: 'Successful Gigs', value: '8.5K', color: 'text-purple-600' },
              { label: 'Cities Covered', value: '36', color: 'text-rose-600' },
              { label: 'Verified Partners', value: '450+', color: 'text-emerald-600' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <p className={`text-5xl md:text-6xl font-black tracking-tighter ${stat.color}`}>{stat.value}</p>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES - INTERACTIVE GRID */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest">
                <Target className="w-4 h-4" />
                Specialized Verticals
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                Opportunities Across <br /> Every Sector.
              </h2>
            </div>
            <button onClick={onExplore} className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-indigo-600 hover:text-white transition-all">
              View All Categories <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SectorCard 
              image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
              title="Tech & Creative"
              desc="From frontend developers to cinematic editors, we connect elite digital talent."
              tags={['Development', 'UI/UX', 'Video']}
              color="bg-blue-600"
            />
            <SectorCard 
              image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800"
              title="Professional Services"
              desc="Legal advisors, accountants, and marketing strategists for growing businesses."
              tags={['Consulting', 'Sales', 'Admin']}
              color="bg-purple-600"
            />
            <SectorCard 
              image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"
              title="Physical Logistics"
              desc="Last-mile delivery, construction, and specialized technical home services."
              tags={['Delivery', 'Home', 'Security']}
              color="bg-rose-600"
            />
          </div>
        </div>
      </section>

      {/* 4. THE VISION SECTION (Image heavy) */}
      <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Community" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-10">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              Empowering the <br /><span className="text-indigo-500">Hardworking</span> Nigerian.
            </h2>
            <p className="text-2xl text-slate-400 font-medium leading-relaxed">
              oGig was born from a simple observation: Nigeria is overflowing with talent, but the paths to professional gigs are often broken. We fixed that.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                <div className="space-y-4">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Users className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black">Community First</h4>
                    <p className="text-slate-500 font-bold">We prioritize local connections and community trust over corporate red tape.</p>
                </div>
                <div className="space-y-4">
                    <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black">Zero Fee Model</h4>
                    <p className="text-slate-500 font-bold">Find work and hire talent without predatory platform fees cutting into your profits.</p>
                </div>
            </div>
            <div className="pt-10">
                <button onClick={() => window.location.hash = 'about'} className="px-10 py-5 bg-white text-slate-950 rounded-[20px] font-black text-lg hover:bg-indigo-50 transition-all flex items-center gap-3">
                    Our Full Story
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DUAL PATHWAYS - WORK VS HIRE */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* For Talent */}
            <div className="group relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-16 rounded-[60px] shadow-2xl transition-all hover:scale-[1.02]">
                <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] group-hover:bg-indigo-500/20 transition-all"></div>
                <div className="space-y-8 relative z-10">
                    <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-[32px] flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <Briefcase className="w-10 h-10" />
                    </div>
                    <h3 className="text-4xl font-black dark:text-white tracking-tight">I Want to Work</h3>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        Join 12,000+ professionals getting matched with high-paying gigs daily. Set your rates, showcase your portfolio, and grow your career.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-4 text-slate-700 dark:text-slate-200 font-black"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> Direct Client Access</li>
                        <li className="flex items-center gap-4 text-slate-700 dark:text-slate-200 font-black"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> Professional Dashboard</li>
                        <li className="flex items-center gap-4 text-slate-700 dark:text-slate-200 font-black"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> Identity Verification</li>
                    </ul>
                    <button onClick={onExplore} className="w-full py-6 bg-indigo-600 text-white rounded-[24px] font-black text-xl shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-slate-900 transition-all">Start Finding Work</button>
                </div>
            </div>

            {/* For Employers */}
            <div className="group relative overflow-hidden bg-slate-900 border border-slate-800 p-16 rounded-[60px] shadow-2xl transition-all hover:scale-[1.02]">
                <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-white/5 rounded-full blur-[80px] group-hover:bg-white/10 transition-all"></div>
                <div className="space-y-8 relative z-10">
                    <div className="w-20 h-20 bg-white/10 rounded-[32px] flex items-center justify-center text-white">
                        <Users className="w-10 h-10" />
                    </div>
                    <h3 className="text-4xl font-black text-white tracking-tight">I Want to Hire</h3>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed">
                        Access Nigeria's most reliable talent pool. Post gigs in seconds and let our Smart AI format and distribute your requirement to the right people.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-4 text-slate-200 font-black"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> AI-Enhanced Postings</li>
                        <li className="flex items-center gap-4 text-slate-200 font-black"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> Applicant Screening</li>
                        <li className="flex items-center gap-4 text-slate-200 font-black"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> Enterprise Support</li>
                    </ul>
                    <button onClick={() => window.location.hash = 'post'} className="w-full py-6 bg-white text-slate-900 rounded-[24px] font-black text-xl shadow-xl hover:bg-indigo-50 transition-all">Post a Job Requirement</button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRUST & SECURITY DEEP DIVE */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full font-black text-[10px] uppercase tracking-widest">
                    <Shield className="w-4 h-4" />
                    Security Protocol
                </div>
                <h2 className="text-5xl font-black dark:text-white tracking-tight leading-none">Marketplace Built on Trust.</h2>
                <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">We've implemented industry-leading measures to keep the oGig nexus safe for everyone.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <SecurityFeature icon={<Lock className="w-8 h-8" />} title="Verified ID" desc="All professional accounts undergo identity validation." />
                <SecurityFeature icon={<MessageSquare className="w-8 h-8" />} title="Safe Chat" desc="Communication encryption protects your contact data." />
                <SecurityFeature icon={<Layers className="w-8 h-8" />} title="Review System" desc="Transparency through community feedback and ratings." />
                <SecurityFeature icon={<ShieldCheck className="w-8 h-8" />} title="Fraud Detection" desc="AI monitors the board for suspicious or scam activities." />
            </div>
        </div>
      </section>

      {/* 7. MOBILE EXPERIENCE TEASER */}
      <section className="py-32 overflow-hidden bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-indigo-600 dark:bg-indigo-700 rounded-[60px] p-12 md:p-24 text-white relative flex flex-col lg:flex-row items-center gap-20">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[20%] w-[100%] h-[100%] bg-white rounded-full blur-[120px]"></div>
                </div>
                
                <div className="flex-1 space-y-10 relative z-10 text-center lg:text-left">
                    <Smartphone className="w-20 h-20 mb-6 mx-auto lg:mx-0" />
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">The oGig Mobile <br /> Advantage.</h2>
                    <p className="text-2xl text-indigo-100 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Get instant push notifications the moment a gig is posted in your area. Never miss an opportunity again.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 flex items-center gap-4">
                            <Zap className="w-6 h-6 fill-white" />
                            <p className="text-sm font-black uppercase tracking-widest">Ultra-Fast Performance</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 flex items-center gap-4">
                            <Share2 className="w-6 h-6" />
                            <p className="text-sm font-black uppercase tracking-widest">Instant Social Sharing</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <div className="relative z-10 w-[300px] h-[600px] bg-slate-950 rounded-[60px] border-[12px] border-slate-900 shadow-3xl overflow-hidden mx-auto">
                        <div className="absolute top-0 inset-x-0 h-8 bg-slate-900 rounded-b-3xl"></div>
                        <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Mobile App" />
                        <div className="absolute inset-0 bg-indigo-600/20"></div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 space-y-6">
                <HelpCircle className="w-16 h-16 text-indigo-600 mx-auto" />
                <h2 className="text-5xl font-black dark:text-white tracking-tight">Common Inquiries.</h2>
                <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">Everything you need to know about the oGig platform.</p>
            </div>

            <div className="space-y-6">
                <FAQItem 
                    question="How does oGig verify employers?" 
                    answer="We use a multi-step verification process including business ID validation and community reporting. All Admin-posted jobs are manually checked by our security unit."
                />
                <FAQItem 
                    question="Is it completely free to find work?" 
                    answer="Yes. oGig is dedicated to the Nigerian workforce. We do not charge talent any commission or registration fees for basic gig matching."
                />
                <FAQItem 
                    question="Can I post a gig from any state in Nigeria?" 
                    answer="Absolutely. We cover all 36 states and the FCT. You can filter for specific Local Government Areas during your search."
                />
                <FAQItem 
                    question="What if I encounter a suspicious post?" 
                    answer="Every job card has a 'Report' button. If you flag a post, our team investigates within 1 hour. We maintain a zero-tolerance policy for scams."
                />
            </div>
        </div>
      </section>

      {/* 9. FINAL CTA - COMMUNITY HUB */}
      <section className="py-40 relative">
        <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-500/5 rounded-full blur-[140px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="space-y-12">
                <div className="flex justify-center">
                    <div className="bg-slate-900 dark:bg-indigo-600 p-8 rounded-[40px] shadow-3xl animate-bounce-slow">
                        <Rocket className="w-16 h-16 text-white" />
                    </div>
                </div>
                <h2 className="text-6xl md:text-8xl font-black dark:text-white tracking-tighter leading-none">
                    Your Future Gigs <br /> Start <span className="text-indigo-600">Right Here.</span>
                </h2>
                <p className="text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                    Join thousands of professionals already dominating the gig economy. Simple, secure, and built for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
                    <button 
                        onClick={onExplore}
                        className="px-16 py-8 bg-indigo-600 text-white rounded-[32px] font-black text-2xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:scale-105 transition-all active:scale-95"
                    >
                        Explore the Nexus
                    </button>
                    <button 
                        onClick={() => window.location.hash = 'post'}
                        className="px-16 py-8 bg-slate-900 dark:bg-white dark:text-slate-950 text-white rounded-[32px] font-black text-2xl hover:scale-105 transition-all shadow-2xl"
                    >
                        Deploy a Gig
                    </button>
                </div>
                <div className="flex items-center justify-center gap-10 pt-20 opacity-40 grayscale filter dark:invert">
                    <p className="font-black tracking-widest text-xs uppercase">Trusted By Leading Entities Across Nigeria</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

const SectorCard = ({ image, title, desc, tags, color }: any) => (
  <div className="group bg-white dark:bg-slate-900 rounded-[48px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-3xl transition-all hover:-translate-y-2">
    <div className="h-64 relative overflow-hidden">
        <img src={image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={title} />
        <div className={`absolute inset-0 ${color}/20 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
    </div>
    <div className="p-10 space-y-6">
        <h3 className="text-3xl font-black dark:text-white tracking-tight">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
        <div className="flex flex-wrap gap-2">
            {tags.map((t: string) => (
                <span key={t} className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700">
                    {t}
                </span>
            ))}
        </div>
    </div>
  </div>
);

const SecurityFeature = ({ icon, title, desc }: any) => (
  <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm hover:border-emerald-400 transition-all group">
    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-all mb-8">
        {icon}
    </div>
    <h4 className="text-xl font-black dark:text-white mb-3 tracking-tight">{title}</h4>
    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">{desc}</p>
  </div>
);

const FAQItem = ({ question, answer }: any) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-8 flex items-center justify-between text-left group"
            >
                <span className="text-xl font-black dark:text-white group-hover:text-indigo-600 transition-colors">{question}</span>
                <div className={`p-2 rounded-xl transition-all ${isOpen ? 'bg-indigo-600 text-white rotate-180' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
                    <ChevronRight className="w-6 h-6" />
                </div>
            </button>
            <div className={`px-8 transition-all duration-300 ${isOpen ? 'pb-8 opacity-100 max-h-[500px]' : 'pb-0 opacity-0 max-h-0'}`}>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-50 dark:border-slate-800 pt-6">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
