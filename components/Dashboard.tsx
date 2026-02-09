
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { storageService } from '../services/storageService';
import { doc, getDoc, collection, getDocs, query, where, limit } from 'firebase/firestore';
import { Job, UserProfile, UserRole } from '../types';
import JobCard from './JobCard';
import { LayoutDashboard, Users, Briefcase, PlusCircle, UserPlus, Heart, Sparkles, Star, ChevronRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [recentTalent, setRecentTalent] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;
    
    const fetchData = async () => {
      setLoading(true);
      const profileSnap = await getDoc(doc(db, 'users', auth.currentUser!.uid));
      if (profileSnap.exists()) {
        const userData = profileSnap.data() as UserProfile;
        setProfile(userData);

        if (userData.role === UserRole.EMPLOYER) {
          // Scout for talent
          const talentQuery = query(collection(db, 'users'), where('role', '==', UserRole.EMPLOYEE), limit(5));
          const talentSnap = await getDocs(talentQuery);
          setRecentTalent(talentSnap.docs.map(d => d.data() as UserProfile));
        }
      }

      const unsubscribeJobs = storageService.subscribeToJobs((allJobs) => {
        const filtered = allJobs.filter(job => (job as any).creatorId === auth.currentUser?.uid);
        setMyJobs(filtered);
        setLoading(false);
      });
      
      return unsubscribeJobs;
    };

    const unsubPromise = fetchData();
    return () => { unsubPromise.then(u => u?.()); };
  }, []);

  if (loading) return <div className="py-40 text-center animate-pulse"><div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div></div>;

  return (
    <div className="space-y-16 animate-fade-in">
      <div className="bg-slate-900 rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden shadow-3xl">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-indigo-400 font-black text-xs uppercase tracking-[0.3em] backdrop-blur-md">
              <LayoutDashboard className="w-5 h-5" />
              {profile?.role === UserRole.EMPLOYER ? 'Hirer Dashboard' : 'Talent Dashboard'}
            </div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">Nexus <br /><span className="text-indigo-500">Command.</span></h2>
            <p className="text-slate-400 font-bold text-xl max-w-lg leading-relaxed">Manage your active disseminations and monitor your ecosystem growth.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[48px] text-center min-w-[280px]">
            <p className="text-7xl font-black text-white leading-none mb-2 tracking-tighter">{profile?.role === UserRole.EMPLOYER ? myJobs.length : profile?.followers.length || 0}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">{profile?.role === UserRole.EMPLOYER ? 'Active Projects' : 'Followers'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-10">
          {profile?.role === UserRole.EMPLOYER ? (
             <>
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">My Active Gigs</h3>
                <button onClick={() => window.location.hash = 'post'} className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-xl">
                  <PlusCircle className="w-5 h-5" /> NEW DISSEMINATION
                </button>
              </div>
              <div className="space-y-8">
                {myJobs.length > 0 ? myJobs.map(job => <JobCard key={job.id} job={job} />) : <div className="p-20 text-center bg-slate-50 dark:bg-slate-900 rounded-[40px] border-4 border-dashed border-slate-100 dark:border-slate-800 font-black text-slate-400 text-2xl">No active links detected.</div>}
              </div>
             </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">My Work Showcase</h3>
                <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-xl">
                  <Sparkles className="w-5 h-5" /> ADD PORTFOLIO
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile?.portfolioItems?.length ? profile.portfolioItems.map(item => (
                   <div key={item.id} className="relative aspect-video rounded-[32px] overflow-hidden group">
                      <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 flex items-end">
                        <p className="text-white font-black text-xl">{item.title}</p>
                      </div>
                   </div>
                )) : <div className="md:col-span-2 p-20 text-center bg-slate-50 dark:bg-slate-900 rounded-[40px] border-4 border-dashed border-slate-100 dark:border-slate-800 font-black text-slate-400 text-2xl">Showcase your skills here.</div>}
              </div>
            </>
          )}
        </div>

        {/* Sidebar Ecosystem */}
        <div className="lg:col-span-4 space-y-10">
          {profile?.role === UserRole.EMPLOYER ? (
            <div className="bg-white dark:bg-slate-900 rounded-[48px] p-10 shadow-2xl border border-slate-50 dark:border-slate-800 space-y-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600">Talent Scouts</h4>
              <div className="space-y-6">
                {recentTalent.map(talent => (
                  <div key={talent.uid} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${talent.uid}`} alt="" />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-slate-900 dark:text-white leading-none mb-1">{talent.displayName}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{talent.skills[0] || 'Verified Pro'}</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-indigo-600 rounded-[48px] p-10 shadow-4xl text-white space-y-8">
               <Star className="w-12 h-12 mb-4" />
               <h4 className="text-3xl font-black tracking-tight leading-none">Social Growth</h4>
               <p className="text-indigo-100 font-medium leading-relaxed">Follow other professionals at AAUA and across Nigeria to share ideas and grow your professional reach.</p>
               <div className="pt-4 flex items-center gap-4">
                 <div className="flex -space-x-3">
                   {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-indigo-600 bg-white/20"></div>)}
                 </div>
                 <p className="text-sm font-black uppercase tracking-widest">+ {profile?.followers.length || 0} Followers</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
