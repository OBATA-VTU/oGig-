
import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase/config';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { X, Mail, Lock, LogIn, UserPlus, Github } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] w-full max-w-md p-10 shadow-3xl relative overflow-hidden animate-in zoom-in-95 duration-500">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-slate-50 rounded-xl transition-colors">
          <X className="w-6 h-6 text-slate-300" />
        </button>

        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Join the oGig Nexus by OBA
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-4 py-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-slate-700 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/0/google.svg" className="w-6 h-6" alt="Google" />
            Continue with Google
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase font-black tracking-widest text-slate-300"><span className="bg-white px-4">OR</span></div>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                type="password" 
                placeholder="Password" 
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-rose-600 text-xs font-bold text-center">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-lg hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm font-bold text-slate-400 pt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-indigo-600 hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
