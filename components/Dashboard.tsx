
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { storageService } from '../services/storageService';
import { doc, getDoc } from 'firebase/firestore';
import { Job, UserProfile, UserRole } from '../types';
import JobCard from './JobCard';
import { LayoutDashboard, Briefcase, PlusCircle, Trash2, Loader2, User, Building2, MapPin, Phone, BadgeCheck } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;
    
    setLoading(true);
    
    const fetchData = async () => {
      // Fetch User Profile
      const profileSnap = await getDoc(doc(db, 'users', auth.currentUser!.uid));
      if (profileSnap.exists()) {
        setUserProfile(profileSnap.data() as UserProfile);
      }

      // Real-time listener that filters for current user's gigs
      const unsubscribe = storageService.subscribeToJobs((allJobs) => {
        const filtered = allJobs.filter(job => (job as any).creatorId === auth.currentUser?.uid);
        setMyJobs(filtered);
        setLoading(false);
      });
      
      return unsubscribe;
    };

    const unsubscribePromise = fetchData();
    return () => { unsubscribePromise.then(u => u?.()); };
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you absolutely sure you want to terminate this opportunity listing?')) {
      try {
        await storageService.deleteJob(id);
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Transmission error. Deployment removal failed.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="w-16 h-16 animate-spin text-indigo-600 mb-6" />
        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">Syncing Profile Gigs...</h3>
      </div>
    );
  }

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="bg-slate-900 rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden shadow-3xl">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-indigo-400 font-black text-xs uppercase tracking-[0.3em] backdrop-blur-md">
              <LayoutDashboard className="w-5 h-5" />
              {userProfile?.role === UserRole.EMPLOYER ? 'Employer Command' : 'Talent Command'} Center
            </div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              Welcome, <br />
              <span className="text-indigo-500">{userProfile?.displayName || auth.currentUser?.email?.split('@')[0]}</span>
            </h2>
            <div className="flex flex-col gap-3 text-slate-400 font-bold text-lg">
              <p className="flex items-center gap-2">
                <BadgeCheck className={`w-5 h-5 ${userProfile?.role === UserRole.ADMIN ? 'text-rose-500' : 'text-indigo-500'}`} />
                Nexus Identity: <span className="uppercase tracking-widest text-sm text-indigo-400">{userProfile?.role}</span>
              </p>
              {userProfile?.role === UserRole.EMPLOYER && (
                <div className="space-y-2 mt-4 p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <p className="flex items-center gap-3 text-white"><Building2 className="w-5 h-5 text-indigo-400" /> {userProfile.businessName}</p>
                  <p className="flex items-center gap-3 text-sm"><MapPin className="w-5 h-5 text-indigo-400" /> {userProfile.businessAddress}</p>
                  <p className="flex items-center gap-3 text-sm"><Phone className="w-5 h-5 text-indigo-400" /> {userProfile.contactPhone}</p>
                  {userProfile.isLegallyRegistered && (
                    <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-black flex items-center gap-1 mt-2">
                      <BadgeCheck className="w-3 h-3" /> Legally Verified Entity
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[48px] text-center min-w-[280px]">
            <p className="text-7xl font-black text-white leading-none mb-2 tracking-tighter">{myJobs.length}</p>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">Total Active Gigs</p>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Active Nexus Links</h3>
          <button 
            onClick={() => window.location.hash = 'post'} 
            className="flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-3xl font-black text-sm hover:scale-105 transition-all shadow-xl active:scale-95"
          >
            <PlusCircle className="w-5 h-5" />
            NEW DISSEMINATION
          </button>
        </div>

        {myJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {myJobs.map(job => (
              <div key={job.id} className="group relative">
                <JobCard job={job} />
                <button 
                  onClick={() => handleDelete(job.id)}
                  className="absolute top-8 right-8 z-20 p-4 bg-white border border-slate-100 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all shadow-sm opacity-0 group-hover:opacity-100"
                  title="Terminate Listing"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-white dark:bg-slate-900 rounded-[60px] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <div className="bg-slate-50 dark:bg-slate-800 w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-8">
              <Briefcase className="w-12 h-12 text-slate-200" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">No Active Deployments</h3>
            <p className="text-slate-400 font-bold text-lg mb-10 max-w-md mx-auto">You haven't posted any professional opportunities yet. The nexus is waiting for your contribution.</p>
            <button 
              onClick={() => window.location.hash = 'post'} 
              className="px-12 py-5 bg-indigo-600 text-white rounded-[24px] font-black text-lg hover:bg-slate-900 transition-all shadow-2xl active:scale-95 shadow-indigo-100"
            >
              Post First Gig
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
