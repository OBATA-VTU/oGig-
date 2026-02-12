
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { storageService } from '../services/storageService';
import { doc, getDoc, collection, getDocs, query, where, limit, updateDoc, arrayUnion } from 'firebase/firestore';
import { Job, UserProfile, UserRole, PortfolioItem } from '../types';
import JobCard from './JobCard';
import { 
  LayoutDashboard, Users, Briefcase, PlusCircle, UserPlus, 
  Heart, Sparkles, Star, ChevronRight, Image as ImageIcon,
  Trash2, ExternalLink, Loader2, UserCircle, Settings
} from 'lucide-react';

interface DashboardProps {
  profile: UserProfile | null;
}

const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [recentTalent, setRecentTalent] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({ title: '', imageUrl: '', description: '' });

  useEffect(() => {
    if (!auth.currentUser) return;
    
    const fetchData = async () => {
      setLoading(true);
      if (profile?.role === UserRole.EMPLOYER) {
        // Scout for talent
        const talentQuery = query(collection(db, 'users'), where('role', '==', UserRole.EMPLOYEE), limit(6));
        const talentSnap = await getDocs(talentQuery);
        setRecentTalent(talentSnap.docs.map(d => d.data() as UserProfile));
      }

      const unsubscribeJobs = storageService.subscribeToJobs((allJobs) => {
        const filtered = allJobs.filter(job => job.creatorId === auth.currentUser?.uid);
        setMyJobs(filtered);
        setLoading(false);
      });
      
      return unsubscribeJobs;
    };

    const unsubPromise = fetchData();
    return () => { unsubPromise.then(u => u?.()); };
  }, [profile]);

  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    
    const item: PortfolioItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...newPortfolio
    };

    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        portfolioItems: arrayUnion(item)
      });
      setShowPortfolioForm(false);
      setNewPortfolio({ title: '', imageUrl: '', description: '' });
      // In a real app, we'd trigger a profile refresh or use local state update
      window.location.reload();
    } catch (err) {
      alert('Portfolio deployment failed.');
    }
  };

  if (loading) return (
    <div className="py-40 text-center animate-pulse">
      <Loader2 className="w-16 h-16 animate-spin mx-auto text-indigo-600 mb-6" />
      <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Syncing Command Center</p>
    </div>
  );

  const isEmployer = profile?.role === UserRole.EMPLOYER;

  return (
    <div className="space-y-16 animate-fade-up">
      {/* 1. DASHBOARD HERO */}
      <div className="bg-slate-900 rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden shadow-3xl">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-indigo-400 font-black text-xs uppercase tracking-[0.3em] backdrop-blur-md">
              <LayoutDashboard className="w-5 h-5" />
              {isEmployer ? 'Hirer Dashboard' : 'Talent Dashboard'}
            </div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              Nexus <br />
              <span className="text-indigo-500">
                {isEmployer ? 'Hiring' : 'Professional'}
              </span>
            </h2>
            <div className="flex items-center gap-4 pt-4">
              <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center border border-white/10">
                <UserCircle className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <p className="font-black text-xl">{profile?.displayName}</p>
                <p className="text-indigo-400 font-bold uppercase tracking-widest text-[10px]">{profile?.institution || profile?.businessName || 'Verified Pro'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[48px] text-center min-w-[300px] shadow-2xl">
            <p className="text-7xl font-black text-white leading-none mb-2 tracking-tighter">
              {isEmployer ? myJobs.length : profile?.followers?.length || 0}
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
              {isEmployer ? 'Active Job Links' : 'Ecosystem Followers'}
            </p>
            <div className="mt-8 pt-8 border-t border-white/10 flex justify-center gap-10">
               <div className="text-center">
                  <p className="text-2xl font-black">{profile?.skills?.length || 0}</p>
                  <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Skills</p>
               </div>
               <div className="text-center">
                  <p className="text-2xl font-black">{profile?.following?.length || 0}</p>
                  <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Following</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-12">
          {isEmployer ? (
             <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">My Active Listings</h3>
                <button onClick={() => window.location.hash = 'post'} className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-xl">
                  <PlusCircle className="w-5 h-5" /> NEW DISSEMINATION
                </button>
              </div>
              <div className="space-y-8">
                {myJobs.length > 0 ? myJobs.map(job => <JobCard key={job.id} job={job} />) : (
                  <div className="p-32 text-center bg-slate-50 dark:bg-slate-900 rounded-[60px] border-4 border-dashed border-slate-100 dark:border-slate-800 font-black text-slate-400 text-2xl animate-pulse">
                    No active hiring links detected.
                  </div>
                )}
              </div>
             </div>
          ) : (
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">My Portfolio</h3>
                <button onClick={() => setShowPortfolioForm(true)} className="flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-xl">
                  <Sparkles className="w-5 h-5" /> ADD WORK
                </button>
              </div>

              {showPortfolioForm && (
                <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[40px] border-2 border-indigo-600/30 animate-fade-up">
                  <form onSubmit={handleAddPortfolio} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input 
                        required 
                        placeholder="Work Title" 
                        value={newPortfolio.title} 
                        onChange={e => setNewPortfolio({...newPortfolio, title: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl border-2 dark:bg-slate-800 dark:border-slate-700 outline-none focus:border-indigo-600 font-bold dark:text-white"
                      />
                      <input 
                        required 
                        placeholder="Image URL (Unsplash/Direct)" 
                        value={newPortfolio.imageUrl} 
                        onChange={e => setNewPortfolio({...newPortfolio, imageUrl: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl border-2 dark:bg-slate-800 dark:border-slate-700 outline-none focus:border-indigo-600 font-bold dark:text-white"
                      />
                    </div>
                    <textarea 
                      placeholder="Brief Description" 
                      value={newPortfolio.description} 
                      onChange={e => setNewPortfolio({...newPortfolio, description: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border-2 dark:bg-slate-800 dark:border-slate-700 outline-none focus:border-indigo-600 font-bold dark:text-white h-24"
                    />
                    <div className="flex gap-4">
                      <button type="submit" className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl">Deploy Work</button>
                      <button type="button" onClick={() => setShowPortfolioForm(false)} className="px-10 py-4 bg-slate-200 dark:bg-slate-800 dark:text-white rounded-2xl font-black">Cancel</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {profile?.portfolioItems?.length ? profile.portfolioItems.map(item => (
                   <div key={item.id} className="relative aspect-video rounded-[40px] overflow-hidden group shadow-2xl animate-zoom-in">
                      <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4s]" alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent p-8 flex flex-col justify-end">
                        <h4 className="text-white font-black text-2xl tracking-tight">{item.title}</h4>
                        <p className="text-slate-400 text-sm mt-2 line-clamp-2">{item.description}</p>
                        <div className="flex gap-4 mt-6">
                          <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white backdrop-blur-md transition-all"><ExternalLink className="w-5 h-5" /></button>
                          <button className="p-3 bg-rose-500/20 hover:bg-rose-500/40 rounded-xl text-rose-500 backdrop-blur-md transition-all"><Trash2 className="w-5 h-5" /></button>
                        </div>
                      </div>
                   </div>
                )) : (
                  <div className="md:col-span-2 p-32 text-center bg-slate-50 dark:bg-slate-900 rounded-[60px] border-4 border-dashed border-slate-100 dark:border-slate-800 font-black text-slate-400 text-2xl animate-pulse">
                    No portfolio assets detected. Deploy your first work to impress Hirers.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Ecosystem / Talent Scouting */}
        <div className="lg:col-span-4 space-y-10">
          {isEmployer ? (
            <div className="bg-white dark:bg-slate-900 rounded-[48px] p-10 shadow-2xl border border-slate-50 dark:border-slate-800 space-y-8 animate-slide-right">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600">Verified Talent Scouts</h4>
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg animate-pulse"><TrendingUp className="w-4 h-4 text-indigo-600" /></div>
              </div>
              <div className="space-y-6">
                {recentTalent.map(talent => (
                  <div key={talent.uid} className="flex items-center gap-4 group cursor-pointer p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-3xl transition-all border border-transparent hover:border-indigo-600/10">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-inner">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${talent.displayName}`} alt="" />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-slate-900 dark:text-white leading-none mb-2">{talent.displayName}</p>
                      <div className="flex flex-wrap gap-1">
                        {talent.skills?.slice(0, 2).map(s => (
                          <span key={s} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-black uppercase text-slate-400">{s}</span>
                        )) || <span className="text-[10px] text-slate-400 font-bold">New Talent</span>}
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                  </div>
                ))}
              </div>
              <button className="w-full py-5 bg-slate-900 dark:bg-white dark:text-slate-950 text-white rounded-3xl font-black text-sm shadow-xl flex items-center justify-center gap-3">
                Scout All Talent <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-indigo-600 rounded-[48px] p-10 shadow-4xl text-white space-y-8 animate-slide-right">
                 <Star className="w-12 h-12 mb-4" />
                 <h4 className="text-3xl font-black tracking-tight leading-none">Social Growth</h4>
                 <p className="text-indigo-100 font-medium leading-relaxed">Follow other professionals at AAUA and across Nigeria to share ideas and grow your reach.</p>
                 <div className="pt-4 flex items-center gap-4">
                   <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-indigo-600 bg-slate-800 shadow-xl overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=follow${i}`} alt="" />
                     </div>)}
                   </div>
                   <p className="text-xs font-black uppercase tracking-widest">+ {profile?.followers?.length || 0} Followers</p>
                 </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[48px] p-10 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6">
                <div className="flex items-center gap-3 text-indigo-600"><Settings className="w-5 h-5" /><h4 className="font-black text-xs uppercase tracking-widest">Nexus Config</h4></div>
                <p className="text-slate-500 font-medium text-sm">Fine-tune your professional visibility in the ecosystem.</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                    <span className="text-sm font-bold dark:text-white">Public Profile</span>
                    <div className="w-12 h-6 bg-indigo-600 rounded-full flex items-center px-1"><div className="w-4 h-4 bg-white rounded-full ml-auto"></div></div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl opacity-50">
                    <span className="text-sm font-bold dark:text-white">Scout Mode</span>
                    <div className="w-12 h-6 bg-slate-300 rounded-full flex items-center px-1"><div className="w-4 h-4 bg-white rounded-full"></div></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
