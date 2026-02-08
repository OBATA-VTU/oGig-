
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Clock, Tag, Briefcase, BadgeCheck, Sparkles, Loader2, 
  X, MessageCircle, Phone, Mail, FileText, ClipboardList, ExternalLink, Globe,
  Share2, Flag, AlertTriangle, CheckCircle, Copy, Zap
} from 'lucide-react';
import { Job } from '../types';
import { imageService } from '../services/imageService';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [logo, setLogo] = useState<string | null>(job.logo || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGenerateLogo = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsGenerating(true);
    const generatedUrl = await imageService.generateLogo(job.company);
    if (generatedUrl) {
      setLogo(generatedUrl);
    }
    setIsGenerating(false);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Check out this gig: ${job.title} at ${job.company} in ${job.location} on oGig!`;
    const shareUrl = window.location.origin;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `oGig: ${job.title}`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setShowReportModal(false);
      setReportSuccess(false);
    }, 2000);
  };

  const contactMethods = [
    { type: 'link', value: job.link, icon: Globe, color: 'bg-slate-900', label: 'Apply via Link', link: job.link?.startsWith('http') ? job.link : `https://${job.link}` },
    { type: 'whatsapp', value: job.whatsapp, icon: MessageCircle, color: 'bg-[#25D366]', label: 'WhatsApp', link: `https://wa.me/${job.whatsapp?.replace(/\D/g, '')}` },
    { type: 'phone', value: job.phone, icon: Phone, color: 'bg-blue-600', label: 'Call Now', link: `tel:${job.phone}` },
    { type: 'email', value: job.email, icon: Mail, color: 'bg-indigo-600', label: 'Email CV', link: `mailto:${job.email}` }
  ].filter(m => !!m.value);

  return (
    <>
      <div className="bg-white rounded-[32px] border border-slate-100 p-8 hover:shadow-2xl hover:shadow-indigo-50/50 transition-all group relative">
        {job.isAdminPosted && (
          <div className="absolute top-6 right-6 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 z-10 border border-indigo-100 shadow-sm">
            <BadgeCheck className="w-4 h-4 fill-indigo-600 text-white" />
            Verified oGig
          </div>
        )}
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="flex gap-6 flex-1">
            <div className="shrink-0">
              <div className="w-20 h-20 rounded-[28px] border border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden relative group/logo shadow-inner">
                {logo ? (
                  <img src={logo} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-slate-300 flex flex-col items-center justify-center h-full">
                    {isGenerating ? (
                      <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                    ) : (
                      <>
                        <div className="text-3xl font-black text-slate-200">{job.company.charAt(0)}</div>
                        <button 
                          onClick={handleGenerateLogo}
                          className="absolute inset-0 bg-white/95 opacity-0 group-hover/logo:opacity-100 flex flex-col items-center justify-center transition-all duration-300"
                        >
                          <Zap className="w-5 h-5 text-indigo-600 mb-2 fill-indigo-600" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">Smart Logo</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">{job.title}</h3>
                <p className="text-indigo-600 font-bold uppercase tracking-widest text-xs mt-1">{job.company}</p>
              </div>
              
              <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-slate-500 font-bold">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-rose-500" />{job.location}</div>
                <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-slate-400" />{job.type}</div>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-xl text-slate-700"><Tag className="w-4 h-4 text-indigo-400" />{job.category}</div>
              </div>

              <p className="text-slate-500 font-medium line-clamp-2 leading-relaxed text-base">{job.description}</p>
            </div>
          </div>

          <div className="flex flex-col items-stretch md:items-end justify-between min-w-[180px] gap-6">
            <div className="text-3xl font-black text-slate-900 tracking-tighter text-right">{job.salary || 'Competitive'}</div>
            <div className="flex flex-col w-full gap-3">
              <button 
                onClick={() => setShowDetails(true)}
                className="w-full px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100 active:scale-95"
              >
                Apply Details
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 text-slate-600 rounded-2xl text-xs font-black hover:bg-slate-100 transition-colors uppercase tracking-widest"
                >
                  <Share2 className="w-4 h-4" />
                  {copySuccess ? 'Copied' : 'Share'}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowReportModal(true); }}
                  className="px-4 py-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-rose-500 hover:bg-rose-50 transition-colors"
                  title="Report Posting"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col animate-in zoom-in-95 slide-in-from-bottom-12 duration-500">
            <div className="p-10 border-b border-slate-50 flex justify-between items-start">
              <div className="flex gap-6">
                <div className="w-20 h-20 rounded-[28px] overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center shadow-inner">
                  {logo ? <img src={logo} alt="" className="w-full h-full object-cover" /> : <div className="text-4xl font-black text-slate-200">{job.company.charAt(0)}</div>}
                </div>
                <div>
                  <h2 className="text-4xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-2">{job.title}</h2>
                  <p className="text-indigo-600 font-black uppercase tracking-widest text-xs">{job.company} • <span className="text-slate-400">{job.location}</span></p>
                </div>
              </div>
              <button onClick={() => setShowDetails(false)} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                <X className="w-8 h-8 text-slate-300" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-12">
              <section className="space-y-4">
                <h4 className="flex items-center gap-3 text-slate-900 font-black text-xl tracking-tight">
                  <div className="p-2 bg-indigo-50 rounded-lg"><FileText className="w-5 h-5 text-indigo-600" /></div>
                  Job Overview
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-line text-lg">{job.description}</p>
              </section>

              {job.requirements && (
                <section className="space-y-4">
                  <h4 className="flex items-center gap-3 text-slate-900 font-black text-xl tracking-tight">
                    <div className="p-2 bg-emerald-50 rounded-lg"><ClipboardList className="w-5 h-5 text-emerald-600" /></div>
                    Skills Required
                  </h4>
                  <div className="bg-slate-50 p-8 rounded-[32px] text-slate-600 font-medium leading-relaxed whitespace-pre-line border border-slate-100">
                    {job.requirements}
                  </div>
                </section>
              )}

              {job.procedure && (
                <section className="space-y-4">
                  <h4 className="flex items-center gap-3 text-slate-900 font-black text-xl tracking-tight">
                    <div className="p-2 bg-amber-50 rounded-lg"><Zap className="w-5 h-5 text-amber-600 fill-amber-600" /></div>
                    Application Protocol
                  </h4>
                  <div className="bg-indigo-50/30 p-8 rounded-[32px] text-indigo-900 font-bold leading-relaxed border border-indigo-100/50">
                    {job.procedure}
                  </div>
                </section>
              )}

              <section className="pt-8 space-y-6">
                <h4 className="text-slate-900 font-black text-2xl tracking-tight">Connect with Client</h4>
                {contactMethods.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contactMethods.map((m, idx) => (
                      <a 
                        key={idx} 
                        href={m.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className={`${m.color} text-white flex items-center justify-center gap-4 py-5 rounded-[24px] font-black text-lg hover:opacity-90 transition-all shadow-xl active:scale-95`}
                      >
                        <m.icon className="w-6 h-6" />
                        {m.label}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="bg-rose-50 border border-rose-100 p-6 rounded-[24px] text-rose-900 font-bold text-base flex items-center gap-4">
                    <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0" />
                    Follow the procedure above to apply. No direct digital contact links found.
                  </div>
                )}
              </section>
            </div>
            
            <div className="p-10 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-400 font-bold text-sm flex items-center gap-3">
                <Clock className="w-5 h-5" />
                Posted {new Date(job.postedAt).toLocaleDateString()}
              </span>
              <div className="flex gap-4">
                <button 
                  onClick={handleShare}
                  className="px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-[20px] font-black text-sm hover:bg-slate-50 transition-colors flex items-center gap-3 uppercase tracking-widest"
                >
                  <Share2 className="w-5 h-5" />
                  {copySuccess ? 'Copied' : 'Share'}
                </button>
                <button onClick={() => setShowDetails(false)} className="px-12 py-4 bg-slate-900 text-white rounded-[20px] font-black text-sm hover:bg-indigo-600 transition-all shadow-xl active:scale-95">
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-md p-12 shadow-3xl relative overflow-hidden animate-in zoom-in-95 duration-500">
            {reportSuccess ? (
              <div className="text-center py-10 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-emerald-100 w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-12 h-12 text-emerald-600" />
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Report Saved</h3>
                <p className="text-slate-500 font-bold text-lg leading-snug">Our security unit will review this posting within the next hour.</p>
              </div>
            ) : (
              <>
                <div className="bg-rose-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-10">
                  <AlertTriangle className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">Security Alert</h3>
                <p className="text-slate-500 font-bold text-lg mb-10">Why are you flagging this project?</p>
                
                <form onSubmit={handleReport} className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {['Scam or Fraud', 'Wrong Contact Info', 'Inappropriate Content', 'Expired Opportunity', 'Other Issue'].map(reason => (
                      <label key={reason} className="flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-50 hover:bg-slate-50 hover:border-indigo-100 cursor-pointer transition-all">
                        <input type="radio" name="report_reason" required className="w-5 h-5 text-indigo-600 focus:ring-indigo-600" />
                        <span className="text-slate-700 font-black text-sm uppercase tracking-widest">{reason}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-8">
                    <button 
                      type="button"
                      onClick={() => setShowReportModal(false)}
                      className="flex-1 px-4 py-5 bg-white border-2 border-slate-100 text-slate-600 rounded-[20px] font-black text-sm uppercase tracking-widest"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 px-4 py-5 bg-rose-600 text-white rounded-[20px] font-black text-sm uppercase tracking-widest shadow-xl shadow-rose-100 active:scale-95"
                    >
                      Submit Flag
                    </button>
                  </div>
                </form>
              </>
            )}
            {!reportSuccess && (
              <button 
                onClick={() => setShowReportModal(false)}
                className="absolute top-8 right-8 p-3 text-slate-300 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;
