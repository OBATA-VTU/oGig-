
import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { storageService } from '../services/storageService';
import { Job } from '../types';
import { Search, SlidersHorizontal, MapPin, Filter, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

const CATEGORIES = ['Development', 'Design', 'Marketing', 'Logistics', 'Home Services', 'Writing', 'Tech', 'Healthcare', 'Sales', 'Other'];
const NIGERIAN_STATES = [
  'Lagos', 'Abuja', 'Kano', 'Oyo', 'Rivers', 'Enugu', 'Kaduna', 'Delta', 'Anambra', 'Edo', 
  'Abia', 'Ogun', 'Ondo', 'Osun', 'Plateau', 'Kwara', 'Imo', 'Akwa Ibom'
];

const JobFeed: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');

  useEffect(() => {
    setLoading(true);
    const unsubscribe = storageService.subscribeToJobs((fetchedJobs) => {
      setJobs(fetchedJobs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || job.type === filterType;
    const matchesCategory = selectedCategory === 'all' || job.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesState = selectedState === 'all' || job.location.toLowerCase().includes(selectedState.toLowerCase());
    
    return matchesSearch && matchesType && matchesCategory && matchesState;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="w-16 h-16 animate-spin text-indigo-600 mb-6" />
        <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Syncing Nexus Intelligence...</h3>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Search Header */}
      <div className="relative">
        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-indigo-50/50 overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">The Gig Feed</h2>
                <p className="text-slate-500 font-medium">Real-time opportunities across Nigeria, updated by the community.</p>
              </div>
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-6 h-6 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="E.g. Plumber in Lekki, Web Designer, Logistics..."
                  className="w-full pl-16 pr-8 py-6 rounded-[28px] border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none transition-all shadow-sm text-xl font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full md:w-auto flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="bg-indigo-50 px-6 py-4 rounded-3xl text-center border border-indigo-100 flex-1">
                  <p className="text-2xl font-black text-indigo-600 tracking-tighter">{filteredJobs.length}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Gigs Found</p>
                </div>
                <div className="bg-slate-50 px-6 py-4 rounded-3xl text-center border border-slate-100 flex-1">
                  <p className="text-2xl font-black text-slate-900 tracking-tighter">{NIGERIAN_STATES.length}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">States Covered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-slate-100/50 sticky top-24">
            <div className="flex items-center gap-2 mb-8">
              <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Filters</h3>
            </div>

            <div className="space-y-10">
              <section>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Commitment</label>
                <div className="grid grid-cols-1 gap-2">
                  {['all', 'Full-time', 'Contract', 'Gig', 'Service'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setFilterType(t)}
                      className={`text-left px-5 py-3 rounded-2xl text-sm font-bold transition-all ${filterType === t ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-100'}`}
                    >
                      {t === 'all' ? 'Any Type' : t}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Top Category</label>
                <select 
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 outline-none font-bold text-slate-700"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">Every Category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </section>

              <section>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Location (Nigeria)</label>
                <select 
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 outline-none font-bold text-slate-700"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="all">Entire Nation</option>
                  {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </section>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-50">
              <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 p-4 rounded-2xl">
                <Sparkles className="w-5 h-5 shrink-0" />
                <p className="text-[11px] font-bold leading-tight">Verified gigs are always at the top of our feed.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-9 space-y-6">
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
              <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">No Gigs Found</h3>
              <p className="text-slate-500 font-medium mb-8">We couldn't find anything matching your current filters.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedState('all'); setFilterType('all'); }}
                className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all active:scale-95"
              >
                Reset All Search Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobFeed;
