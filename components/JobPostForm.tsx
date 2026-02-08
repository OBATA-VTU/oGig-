
import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { Send, CheckCircle, Globe, MapPin, Tag } from 'lucide-react';
import { storageService } from '../services/storageService';
import { JobType } from '../types';

const JobPostForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: JobType.GIG,
    category: '',
    salary: '',
    description: '',
    requirements: '',
    procedure: '',
    tags: '',
    whatsapp: '',
    email: '',
    phone: '',
    link: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setSubmitting(true);
    const newJob = {
      ...formData,
      postedAt: new Date().toISOString(),
      isAdminPosted: false,
      creatorId: auth.currentUser.uid,
      creatorName: auth.currentUser.displayName || auth.currentUser.email,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
    };
    
    try {
      await storageService.saveJob(newJob as any);
      setSubmitted(true);
      setTimeout(() => onSuccess(), 1500);
    } catch (err) {
      console.error(err);
      alert('Failed to post gig. Check your network.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200">
        <div className="bg-emerald-100 p-4 rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Successfully Posted!</h2>
        <p className="text-slate-500">Your gig is now visible in the oGig nexus.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-12 rounded-[40px] border border-slate-100 shadow-2xl shadow-indigo-50/20">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Deploy Opportunity</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Share your mission with the Nigerian community.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormInput label="Job Title" required placeholder="e.g. Sales Ninja" value={formData.title} onChange={v => setFormData({...formData, title: v})} />
          <FormInput label="Company / Entity" required placeholder="Client Name" value={formData.company} onChange={v => setFormData({...formData, company: v})} />
          <FormInput label="Location (State, Area)" required icon={<MapPin className="w-4 h-4" />} placeholder="Lagos, Ikeja" value={formData.location} onChange={v => setFormData({...formData, location: v})} />
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Engagement Type</label>
            <select 
              className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none font-bold transition-all appearance-none" 
              value={formData.type} 
              onChange={e => setFormData({...formData, type: e.target.value as JobType})}
            >
              {Object.values(JobType).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-8">
          <FormTextArea label="Detailed Intelligence (Description)" required placeholder="Mission summary..." value={formData.description} onChange={v => setFormData({...formData, description: v})} />
          <FormTextArea label="Asset Requirements (Skills)" placeholder="List skills needed..." value={formData.requirements} onChange={v => setFormData({...formData, requirements: v})} />
          <FormTextArea label="Extraction Protocol (How to Apply)" placeholder="Step by step instructions..." value={formData.procedure} onChange={v => setFormData({...formData, procedure: v})} />
        </div>

        <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 space-y-8">
          <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm flex items-center gap-3">
            <Globe className="w-5 h-5 text-indigo-500" />
            Direct Communication Protocols
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input className="px-6 py-4 rounded-2xl border-2 border-transparent bg-white outline-none focus:border-indigo-600 font-bold" placeholder="WhatsApp (e.g. 081...)" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
            <input className="px-6 py-4 rounded-2xl border-2 border-transparent bg-white outline-none focus:border-indigo-600 font-bold" placeholder="Application URL (http://...)" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
            <input className="px-6 py-4 rounded-2xl border-2 border-transparent bg-white outline-none focus:border-indigo-600 font-bold" placeholder="Contact Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            <input className="px-6 py-4 rounded-2xl border-2 border-transparent bg-white outline-none focus:border-indigo-600 font-bold" placeholder="Email for Assets/CV" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={submitting}
          className="w-full bg-slate-900 text-white py-6 rounded-[32px] font-black text-xl flex items-center justify-center gap-4 hover:bg-indigo-600 transition-all active:scale-95 shadow-2xl shadow-indigo-100 disabled:opacity-50"
        >
          {submitting ? 'Deploying...' : <><Send className="w-6 h-6" /> PUBLISH TO NEXUS</>}
        </button>
      </form>
    </div>
  );
};

const FormInput = ({ label, required, placeholder, value, onChange, icon }: any) => (
  <div>
    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300">{icon}</div>}
      <input 
        required={required} 
        className={`w-full ${icon ? 'pl-14' : 'px-6'} py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none font-bold transition-all`} 
        placeholder={placeholder} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
      />
    </div>
  </div>
);

const FormTextArea = ({ label, required, placeholder, value, onChange }: any) => (
  <div>
    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">{label}</label>
    <textarea 
      required={required} 
      rows={3} 
      className="w-full px-8 py-6 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none resize-none font-bold transition-all" 
      placeholder={placeholder} 
      value={value} 
      onChange={e => onChange(e.target.value)} 
    />
  </div>
);

export default JobPostForm;
