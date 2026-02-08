
import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Terminal, Database, Activity, Zap, Cpu, MessageCircle, Phone, Mail } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { storageService } from '../services/storageService';
import { Job } from '../types';

const AdminPanel: React.FC = () => {
  const [rawText, setRawText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    const unsubscribe = storageService.subscribeToJobs((jobs) => {
      setJobCount(jobs.length);
    });
    return () => unsubscribe();
  }, []);

  const handlePublish = async () => {
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
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      {/* Admin Header */}
      <div className="bg-slate-900 rounded-[48px] p-12 md:p-16 text-white shadow-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-indigo-400 font-bold text-xs uppercase tracking-widest backdrop-blur-md">
              <Terminal className="w-4 h-4" />
              Admin Management Console
            </div>
            <h2 className="text-5xl font-black tracking-tight leading-none">Smart Job <br /><span className="text-indigo-500">Processor</span></h2>
            <p className="text-slate-400 font-bold text-lg max-w-lg leading-relaxed">Instantly format messy job descriptions into professional postings for the platform.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatBox label="Database Count" value={jobCount.toString()} icon={<Database className="w-5 h-5" />} />
            <StatBox label="System Status" value="Online" icon={<Activity className="w-5 h-5 text-emerald-500" />} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-10 md:p-12 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Input Raw Content</label>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
            </div>
            
            <div className="relative">
              <textarea
                className="w-full h-[400px] p-8 bg-slate-50 dark:bg-slate-950 border-2 border-transparent dark:border-slate-800 rounded-[32px] focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-600 outline-none transition-all resize-none font-sans text-base leading-relaxed text-slate-700 dark:text-slate-300"
                placeholder="Paste raw text from WhatsApp, emails, or websites here..."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
              />
            </div>
            
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-slate-400 bg-slate-50 dark:bg-slate-800 px-5 py-2.5 rounded-xl">
                <Cpu className="w-5 h-5 text-indigo-500" />
                <p className="text-[10px] font-black uppercase tracking-widest">AI Extraction Active</p>
              </div>
              <button
                onClick={handlePublish}
                disabled={isProcessing || !rawText.trim()}
                className={`flex items-center gap-4 px-12 py-5 rounded-2xl font-black text-lg transition-all ${
                  isProcessing 
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-slate-900 shadow-xl shadow-indigo-100 active:scale-95'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Format & Publish
                    <Zap className="w-5 h-5 fill-white" />
                  </>
                )}
              </button>
            </div>
          </div>

          {status === 'success' && (
            <div className="bg-emerald-50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-800 text-emerald-900 dark:text-emerald-400 p-8 rounded-[32px] flex items-center gap-6 animate-in slide-in-from-top-4">
              <CheckCircle2 className="w-8 h-8" />
              <div>
                <p className="font-black text-xl tracking-tight">Post Successful</p>
                <p className="text-sm font-bold opacity-80">Job has been formatted and added to the board.</p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[40px] p-10 border border-slate-100 dark:border-slate-800 shadow-xl space-y-8">
            <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Standard Operating Procedure</h3>
            <div className="space-y-6">
              <GuideStep num="1" title="Data Intake" text="Paste the raw advertisement text into the processor." />
              <GuideStep num="2" title="Auto-Format" text="AI extracts contacts, location, and requirements." />
              <GuideStep num="3" title="Validation" text="Admin verified badge is automatically attached." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value, icon }: any) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center min-w-[140px] backdrop-blur-lg">
    <div className="text-indigo-400 mb-2 flex justify-center">{icon}</div>
    <p className="text-2xl font-black text-white tracking-tight leading-none mb-1">{value}</p>
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
  </div>
);

const GuideStep = ({ num, title, text }: any) => (
  <div className="flex gap-4">
    <div className="text-xl font-black text-indigo-600/20">{num}</div>
    <div>
      <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">{title}</h4>
      <p className="text-xs font-bold text-slate-400 leading-relaxed">{text}</p>
    </div>
  </div>
);

export default AdminPanel;
