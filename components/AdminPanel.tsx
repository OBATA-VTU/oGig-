
import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, CheckCircle2, AlertCircle, ShieldCheck, MessageCircle, Phone, Mail, Terminal, Database, Activity, Zap, Cpu } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { storageService } from '../services/storageService';
import { Job } from '../types';

const AdminPanel: React.FC = () => {
  const [rawText, setRawText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [jobCount, setJobCount] = useState(0);

  // Subscribe to real-time job updates to display accurate network pulse
  useEffect(() => {
    const unsubscribe = storageService.subscribeToJobs((jobs) => {
      setJobCount(jobs.length);
    });
    return () => unsubscribe();
  }, []);

  const handleDisseminate = async () => {
    if (!rawText.trim()) return;
    setIsProcessing(true);
    setStatus('idle');
    
    try {
      const result = await geminiService.processJobContent(rawText);
      const newJob: Job = {
        ...result,
        id: Math.random().toString(36).substr(2, 9),
        postedAt: new Date().toISOString(),
        isAdminPosted: true,
      };
      // Await the async save operation
      await storageService.saveJob(newJob);
      setStatus('success');
      setRawText('');
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      {/* Admin Header */}
      <div className="bg-slate-900 rounded-[60px] p-12 md:p-20 text-white shadow-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-indigo-400 font-black text-xs uppercase tracking-[0.3em] backdrop-blur-md">
              <Terminal className="w-5 h-5" />
              Secure Protocol Alpha
            </div>
            <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-none">Smart <br /><span className="text-indigo-500">Disseminator</span></h2>
            <p className="text-slate-400 font-bold text-xl max-w-lg leading-relaxed">Sophisticated parsing engine for instant gig structuring. Distribute raw intelligence to the global oGig network.</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {/* Correctly display the job count from component state */}
            <StatBox label="Network Pulse" value={jobCount.toString()} icon={<Database className="w-6 h-6" />} />
            <StatBox label="Stability" value="100%" icon={<Activity className="w-6 h-6 text-emerald-500" />} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[60px] border border-slate-100 p-12 md:p-16 shadow-2xl shadow-indigo-50/50">
            <div className="flex justify-between items-center mb-10">
              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Intelligence Stream</label>
              <div className="flex gap-4">
                <div className="w-4 h-4 rounded-full bg-rose-500/20 border-2 border-rose-500 animate-pulse"></div>
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 border-2 border-emerald-500"></div>
              </div>
            </div>
            
            <div className="relative">
              <textarea
                className="w-full h-[450px] p-10 bg-slate-50 border-4 border-slate-50 rounded-[48px] focus:bg-white focus:border-indigo-600 outline-none transition-all resize-none font-mono text-base leading-relaxed text-slate-700 shadow-inner"
                placeholder="PROMPT: Paste messy text, social media ads, or emails. The smart engine will extract states, contacts, and requirements automatically."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
              />
              <div className="absolute bottom-10 right-10 flex gap-4 p-4 bg-white/80 backdrop-blur rounded-[24px] shadow-xl border border-slate-100">
                <MessageCircle className="w-6 h-6 text-emerald-500 fill-emerald-500" />
                <Phone className="w-6 h-6 text-blue-500 fill-blue-500" />
                <Mail className="w-6 h-6 text-indigo-500 fill-indigo-500" />
              </div>
            </div>
            
            <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4 text-slate-400 bg-slate-50 px-6 py-3 rounded-2xl">
                <Cpu className="w-6 h-6 text-indigo-500" />
                <p className="text-xs font-black uppercase tracking-widest leading-none">Smart Formatting Active</p>
              </div>
              <button
                onClick={handleDisseminate}
                disabled={isProcessing || !rawText.trim()}
                className={`group flex items-center gap-6 px-14 py-6 rounded-[32px] font-black text-xl transition-all shadow-3xl ${
                  isProcessing 
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-slate-900 hover:-translate-y-1 active:scale-95 shadow-indigo-100'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-7 h-7 animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    DECODE & PUBLISH
                    <Zap className="w-6 h-6 fill-white" />
                  </>
                )}
              </button>
            </div>
          </div>

          {status === 'success' && (
            <div className="bg-emerald-50 border-4 border-emerald-100 text-emerald-900 p-10 rounded-[48px] flex items-center gap-8 animate-in slide-in-from-top-4 duration-500">
              <div className="bg-emerald-100 p-5 rounded-[24px] shadow-lg">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <p className="font-black text-3xl leading-none tracking-tighter mb-2">Protocol Complete</p>
                <p className="text-lg font-bold opacity-70">Intelligence data formatted and synced to public oGig nexus.</p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white rounded-[60px] p-12 border border-slate-100 shadow-xl space-y-12">
            <h3 className="font-black text-slate-900 uppercase tracking-[0.2em] text-sm flex items-center gap-4">
              <ShieldCheck className="w-6 h-6 text-indigo-600" />
              System Guidelines
            </h3>
            <div className="space-y-10">
              <GuidelineItem icon="01" title="Localization" text="Include Nigerian State and Area for precise geofencing." />
              <GuidelineItem icon="02" title="Contact Triggers" text="WhatsApp strings will be converted to instant buttons." />
              <GuidelineItem icon="03" title="Trust Badge" text="All admin postings receive the premium verified seal." />
            </div>
            
            <div className="pt-12 border-t border-slate-50">
              <div className="bg-slate-900 p-8 rounded-[40px] text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-3">Global Health Rating</p>
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-2 flex-1 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>)}
                </div>
                <p className="text-white font-black text-xl tracking-tight">System Peak</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
  <div className="bg-white/10 border border-white/20 p-8 rounded-[32px] text-center min-w-[160px] backdrop-blur-lg">
    <div className="text-indigo-400 mb-4 flex justify-center">{icon}</div>
    <p className="text-4xl font-black text-white leading-none mb-2 tracking-tighter">{value}</p>
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
  </div>
);

const GuidelineItem = ({ icon, title, text }: { icon: string, title: string, text: string }) => (
  <div className="flex gap-6 items-start">
    <span className="text-2xl font-black text-indigo-600/20 tabular-nums">{icon}</span>
    <div>
      <h4 className="text-lg font-black text-slate-900 mb-1">{title}</h4>
      <p className="text-sm font-bold text-slate-400 leading-relaxed">{text}</p>
    </div>
  </div>
);

export default AdminPanel;
