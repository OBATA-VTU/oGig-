
import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase/config';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { X, Mail, Lock, Eye, EyeOff, Zap, AlertCircle, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mapAuthError = (code: string): string => {
  switch (code) {
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'Incorrect email or password.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password is too weak. Use at least 6 characters.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was cancelled.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      setError(mapAuthError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      setError(mapAuthError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('A password reset link has been sent to your email.');
    } catch (err: any) {
      setError(mapAuthError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-[40px] w-full max-w-md p-10 shadow-3xl relative overflow-hidden animate-in zoom-in-95 duration-500 border border-slate-100 dark:border-slate-800">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <X className="w-6 h-6 text-slate-300 dark:text-slate-500" />
        </button>

        <div className="mb-8 text-center flex flex-col items-center">
          {/* oGig Logo Header - Using inline SVG to ensure visibility */}
          <div className="bg-slate-900 dark:bg-indigo-600 p-3 rounded-2xl shadow-xl mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 10V3L4 14H11V21L20 10H13Z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">
            {isLogin ? 'Welcome Back' : 'Join oGig'}
          </h2>
          <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px]">
            Platform Created by OBA
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-4 py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-black text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all active:scale-95 shadow-sm disabled:opacity-50"
          >
            {/* High-visibility Google Logo */}
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M19.6429 10.2273C19.6429 9.53182 19.5804 8.86364 19.4643 8.21818H10V12.0182H15.4018C15.1696 13.2727 14.4643 14.3318 13.4018 15.0455V17.5045H16.6429C18.5357 15.7591 19.6429 13.2364 19.6429 10.2273Z" fill="#4285F4"/>
              <path d="M10 20C12.7 20 14.9643 19.1045 16.6429 17.5045L13.4018 15.0455C12.5 15.65 11.3482 16.0091 10 16.0091C7.39286 16.0091 5.1875 14.2545 4.40179 11.8909H1.0625V14.4773C2.72321 17.7773 6.09821 20 10 20Z" fill="#34A853"/>
              <path d="M4.40179 11.8909C4.20536 11.3 4.08929 10.6636 4.08929 10C4.08929 9.33636 4.20536 8.7 4.40179 8.10909V5.52273H1.0625C0.383929 6.87273 0 8.39091 0 10C0 11.6091 0.383929 13.1273 1.0625 14.4773L4.40179 11.8909Z" fill="#FBBC05"/>
              <path d="M10 3.99091C11.4732 3.99091 12.7946 4.49545 13.8393 5.48636L16.7143 2.61364C14.9554 0.990909 12.6964 0 10 0C6.09821 0 2.72321 2.22273 1.0625 5.52273L4.40179 8.10909C5.1875 5.74545 7.39286 3.99091 10 3.99091Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.3em] text-slate-300 dark:text-slate-600"><span className="bg-white dark:bg-slate-900 px-4">OR</span></div>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold transition-all dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" 
                required
                className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none font-bold transition-all dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={handleForgotPassword}
                className="text-xs font-black text-indigo-600 dark:text-indigo-400 hover:underline uppercase tracking-widest"
              >
                Forgot Password?
              </button>
            </div>

            {error && (
              <div className="bg-rose-50 dark:bg-rose-900/20 p-3 rounded-xl flex items-center gap-3 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-100 dark:border-rose-900/50 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {message && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-100 dark:border-emerald-900/50 animate-in fade-in slide-in-from-top-1">
                <CheckCircle className="w-4 h-4 shrink-0" />
                {message}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-[24px] font-black text-lg hover:opacity-90 transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm font-bold text-slate-400 dark:text-slate-500 pt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-indigo-600 dark:text-indigo-400 font-black hover:underline"
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
