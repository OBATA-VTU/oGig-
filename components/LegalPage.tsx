
import React from 'react';
import { ShieldCheck, FileText, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'safety';
}

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      icon: <Lock className="w-12 h-12 text-indigo-600" />,
      sections: [
        { title: 'Information Collection', text: 'We collect information you provide directly to us when you create an account, post a gig, or communicate with us. This includes your name, email address, phone number, and any other information you choose to provide.' },
        { title: 'Usage of Data', text: 'We use your information to facilitate the gig economy, improve our services, and protect against fraudulent activity. We do not sell your personal data to third parties.' },
        { title: 'Data Security', text: 'We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable.' }
      ]
    },
    terms: {
      title: 'Terms of Service',
      icon: <FileText className="w-12 h-12 text-indigo-600" />,
      sections: [
        { title: 'Acceptance of Terms', text: 'By accessing or using oGig, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our platform.' },
        { title: 'User Conduct', text: 'You are solely responsible for your conduct and any data, text, or information you submit. You must not use the platform for any illegal or unauthorized purpose.' },
        { title: 'Disclaimer', text: 'oGig is a marketplace for connections. We do not guarantee the quality, safety, or legality of the gigs posted. Users are encouraged to exercise caution.' }
      ]
    },
    safety: {
      title: 'Safety Tips',
      icon: <ShieldCheck className="w-12 h-12 text-indigo-600" />,
      sections: [
        { title: 'Meet in Public', text: 'If a gig requires an in-person meeting, always choose a high-traffic public place like a mall or busy cafe. Tell someone where you are going.' },
        { title: 'No Upfront Payments', text: 'Never pay any "processing fees" or "registration fees" to a client before starting a gig. Legitimate employers pay you, not the other way around.' },
        { title: 'Trust Your Instincts', text: 'If a gig seems too good to be true (e.g., extremely high pay for minimal effort), it probably is a scam. Report suspicious postings immediately.' }
      ]
    }
  }[type];

  return (
    <div className="max-w-4xl mx-auto py-20 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center mb-16 space-y-6">
        <div className="bg-indigo-50 w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-100">
          {content.icon}
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">{content.title}</h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto uppercase tracking-widest text-sm">Last Updated: October 2023</p>
      </div>

      <div className="space-y-12">
        {content.sections.map((section, idx) => (
          <div key={idx} className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50">
            <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-indigo-600" />
              {section.title}
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium text-lg">{section.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 bg-slate-950 rounded-[40px] text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/10 skew-x-12"></div>
        <h3 className="text-2xl font-black mb-4 relative z-10">Still have questions?</h3>
        <p className="text-slate-400 font-medium mb-8 relative z-10">We're here to help you stay safe and productive.</p>
        <a href="mailto:obaofaaua@gmail.com" className="inline-block px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black relative z-10 hover:bg-indigo-700 transition-all">Contact oGig Legal</a>
      </div>
    </div>
  );
};

export default LegalPage;
