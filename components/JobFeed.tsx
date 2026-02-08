
import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { storageService } from '../services/storageService';
import { Job } from '../types';
import { Search, SlidersHorizontal, AlertCircle, Loader2, RefreshCcw, ShieldX } from 'lucide-react';

const CATEGORIES = ['Development', 'Design', 'Marketing', 'Logistics', 'Home Services', 'Writing', 'Tech', 'Healthcare', 'Sales', 'Other'];
const NIGERIAN_STATES = [
  'Lagos', 'Abuja', 'Kano', 'Oyo', 'Rivers', 'Enugu', 'Kaduna', 'Delta', 'Anambra', 'Edo', 
  'Abia', 'Ogun', 'Ondo', 'Osun', 'Plateau', 'Kwara', 'Imo', 'Akwa Ibom'
];

const JobFeed: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<'network' | 'permission' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');

  useEffect(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = storageService.subscribeToJobs(
      (fetchedJobs) => {
        setJobs(fetchedJobs);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setLoading(false);
        if (err.code === 'permission-denied') {
          setError('permission');
        } else {
          setError('network');
        }
      }
    );
    
    return () => unsubscribe();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const title = job.title?.toLowerCase() || '';
    const desc = job.description?.toLowerCase() || '';
    const loc = job.location?.toLowerCase() || '';
    const q = searchQuery.toLowerCase();

    const matchesSearch = title.includes(q) || desc.includes(q) || loc.includes(q) ||
                          (job.tags && job.tags.some(t => t.toLowerCase().includes(q)));
    const matchesType = filterType === 'all' || job.type === filterType;
    const matchesCategory = selectedCategory === 'all' || job.category?.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesState = selectedState === 'all' || job.location?.toLowerCase().includes(selectedState.toLowerCase());
    
    return matchesSearch && matchesType && matchesCategory && matchesState;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 animate-in fade-in duration-500">
        <div className="relative">
          <Loader2 className="w-16 h-16 animate-spin text-indigo-600 mb-6" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-indigo-100 rounded-full"></div>
        </div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">Updating Feed...</h3>
        <p className="text-slate-400 dark:text-slate-500 mt-2 font-bold uppercase tracking-widest text-[10px]">Connecting to oGig Secure Board</p>
      </div>
    );
  }

  if (error === 'permission') {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center px-4 animate-in zoom-in-95">
        <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-[32px] mb-8">
          <ShieldX className="w-12 h-12 text-amber-500" />
        </div>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Security Lockout</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm font-medium">Firestore permissions are currently denied. Please update your Security Rules in the Firebase Console to allow public reads for the 'jobs' collection.</p>
        <div className="mt-8 p-4 bg-slate-900 rounded-xl text-left font-mono text-xs text-indigo-300">
          allow read: if true;
        </div>
      </div>
    );
  }

  if (error === 'network') {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center px-4 animate-in zoom-in-95">
        <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-[32px] mb-8">
          <AlertCircle className="w-12 h-12 text-rose-500" />
        </div>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Network Latency</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm font-medium">We're having trouble reaching the database. Please verify your connection or try a manual reload.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-8 px-10 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl"
        >
          <RefreshCcw className="w-5 h-5" />
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white dark:bg-slate-900 rounded-[40px] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex-1 space-y-6 w-full">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Browse Opportunities</h2>
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 w-6 h-6 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search job titles, skills, or location..."
                className="w-full pl-16 pr-8 py-5 rounded-[24px] border-2 border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-600 outline-none transition-all shadow-sm text-xl font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 px-6 py-4 rounded-3xl text-center border border-indigo-100 dark:border-indigo-900/50">
              <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">{filteredJobs.length}</p>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 dark:text-indigo-300">Live Gigs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-xl sticky top-28">
            <div className="flex items-center gap-2 mb-8">
              <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
              <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Filter By</h3>
            </div>

            <div className="space-y-10">
              <section>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Job Type</label>
                <div className="grid grid-cols-1 gap-2">
                  {['all', 'Full-time', 'Contract', 'Gig', 'Service'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setFilterType(t)}
                      className={`text-left px-5 py-3 rounded-2xl text-sm font-bold transition-all ${filterType === t ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                      {t === 'all' ? 'Any Type' : t}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Category</label>
                <select 
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white outline-none font-bold"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </section>

              <section>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Location</label>
                <select 
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white outline-none font-bold"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="all">Everywhere</option>
                  {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </section>
            </div>
          </div>
        </div>

        <div className="lg:col-span-9 space-y-8">
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {filteredJobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          ) : (
            <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
              <AlertCircle className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-6" />
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">No Matches Found</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-10 font-medium">We couldn't find any gigs matching your criteria. Try adjusting your search filters.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedState('all'); setFilterType('all'); }}
                className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg hover:scale-105 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobFeed;
