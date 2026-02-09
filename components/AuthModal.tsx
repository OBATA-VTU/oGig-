
import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { X, Mail, Lock, User, Briefcase, Zap, Building2, MapPin, Phone, Info } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>(UserRole.EMPLOYEE);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  
  // Employer Fields
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', cred.user.uid), {
          uid: cred.user.uid,
          email,
          displayName,
          role,
          createdAt: new Date().toISOString(),
          skills: [],
          following: [],
          followers: [],
          ...(role === UserRole.EMPLOYER && {
            businessName,
            businessAddress,
            contactPhone,
            isLegallyRegistered: isRegistered
          })
        });
      }
      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-[50px] w-full max-w-2xl p-12 shadow-4xl relative overflow-y-auto max-h-[90vh] animate-zoom-in custom-scrollbar">
        <button onClick={onClose} className="absolute top-10 right-10 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl"><X className="w-8 h-8 text-slate-300" /></button>
        
        <div className="text-center mb-12">
          <div className="bg-indigo-600 w-20 h-20 rounded-[30px] flex items-center justify-center mx-auto mb-6 shadow-xl"><Zap className="w-10 h-10 text-white fill-white" /></div>
          <h2 className="text-4xl font-black dark:text-white tracking-tighter">{isLogin ? 'Nexus Portal' : 'Join oGig'}</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Developed by OBA (AAUA Finance)</p>
        </div>

        {!isLogin && (
          <div className="grid grid-cols-2 gap-4 mb-10">
            <RoleTab active={role === UserRole.EMPLOYEE} onClick={() => setRole(UserRole.EMPLOYEE)} icon={<User />} label="Talent" desc="I want to work" />
            <RoleTab active={role === UserRole.EMPLOYER} onClick={() => setRole(UserRole.EMPLOYER)} icon={<Briefcase />} label="Hirer" desc="I want to hire" />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {!isLogin && <Input placeholder="Full Name" value={displayName} onChange={setDisplayName} icon={<User />} />}
            <Input type="email" placeholder="Professional Email" value={email} onChange={setEmail} icon={<Mail />} />
            <Input type="password" placeholder="Security Password" value={password} onChange={setPassword} icon={<Lock />} />
          </div>

          {!isLogin && role === UserRole.EMPLOYER && (
            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800 animate-fade-up">
              <div className="flex items-center gap-2 text-indigo-600 mb-4"><Info className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">Business Authentication</span></div>
              <Input placeholder="Official Business Name" value={businessName} onChange={setBusinessName} icon={<Building2 />} />
              <Input placeholder="Business/Office Address" value={businessAddress} onChange={setBusinessAddress} icon={<MapPin />} />
              <Input type="tel" placeholder="Official Contact Phone" value={contactPhone} onChange={setContactPhone} icon={<Phone />} />
              <label className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl cursor-pointer">
                <input type="checkbox" checked={isRegistered} onChange={(e) => setIsRegistered(e.target.checked)} className="w-6 h-6 rounded-lg text-indigo-600" />
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Business is legally registered/known</span>
              </label>
            </div>
          )}

          <button disabled={loading} className="w-full py-6 bg-slate-900 dark:bg-indigo-600 text-white rounded-[24px] font-black text-2xl shadow-xl hover:scale-[1.02] transition-all">
            {loading ? 'Processing...' : isLogin ? 'Access Nexus' : 'Deploy Profile'}
          </button>
          
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="w-full text-center text-slate-400 font-bold hover:text-indigo-600 transition-colors uppercase tracking-widest text-[10px]">
            {isLogin ? 'Create professional account' : 'Already have a profile? Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

const RoleTab = ({ active, onClick, icon, label, desc }: any) => (
  <button type="button" onClick={onClick} className={`p-6 rounded-[32px] border-4 transition-all text-left space-y-2 ${active ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-50 dark:border-slate-800 bg-slate-50 opacity-50'}`}>
    <div className={active ? 'text-indigo-600' : 'text-slate-400'}>{icon}</div>
    <div>
      <p className="font-black text-lg dark:text-white leading-none">{label}</p>
      <p className="text-[10px] font-bold uppercase text-slate-400">{desc}</p>
    </div>
  </button>
);

const Input = ({ type = 'text', placeholder, value, onChange, icon }: any) => (
  <div className="relative">
    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300">{icon}</div>
    <input 
      type={type} 
      required 
      placeholder={placeholder} 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-16 pr-8 py-5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-4 ring-indigo-500/20 font-bold dark:text-white transition-all" 
    />
  </div>
);

export default AuthModal;
