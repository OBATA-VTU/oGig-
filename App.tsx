
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import JobFeed from './components/JobFeed';
import AdminPanel from './components/AdminPanel';
import JobPostForm from './components/JobPostForm';
import Dashboard from './components/Dashboard';
import AboutPage from './components/AboutPage';
import FounderPage from './components/FounderPage';
import AuthModal from './components/AuthModal';
import { auth, db } from './firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Zap, ShieldAlert, Key, Lock, Loader2 } from 'lucide-react';
import { UserRole, UserProfile } from './types';

export type View = 'home' | 'gigs' | 'post' | 'admin' | 'about' | 'founder' | 'dashboard' | 'auth';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'light');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const snap = await getDoc(doc(db, 'users', u.uid));
        if (snap.exists()) {
          setProfile(snap.data() as UserProfile);
        }
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    theme === 'dark' ? html.classList.add('dark') : html.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const valid: View[] = ['home', 'gigs', 'post', 'admin', 'about', 'founder', 'dashboard', 'auth'];
      if (hash === 'adminoba') setCurrentView('admin');
      else if (valid.includes(hash as View)) setCurrentView(hash as View);
      else setCurrentView('home');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (view: View) => {
    if (view === 'admin') window.location.hash = 'adminoba';
    else if (view === 'home') window.location.hash = '';
    else window.location.hash = view;
  };

  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
      <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] animate-pulse">Initializing Nexus</p>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <LandingPage onExplore={() => navigate('gigs')} onPost={() => navigate('post')} />;
      case 'gigs': 
        if (!user) return <AuthWall onAuthClick={() => setIsAuthModalOpen(true)} />;
        return <JobFeed />;
      case 'dashboard': 
        if (!user) return <AuthWall onAuthClick={() => setIsAuthModalOpen(true)} />;
        return <Dashboard profile={profile} />;
      case 'post': 
        if (!user) return <AuthWall onAuthClick={() => setIsAuthModalOpen(true)} />;
        return <JobPostForm onSuccess={() => navigate('gigs')} />;
      case 'about': return <AboutPage />;
      case 'founder': return <FounderPage />;
      case 'auth': 
        setIsAuthModalOpen(true);
        navigate('home');
        return <LandingPage onExplore={() => navigate('gigs')} onPost={() => navigate('post')} />;
      case 'admin':
        if (profile?.role !== UserRole.ADMIN) return <AdminLock navigate={navigate} />;
        return <AdminPanel />;
      default: return <LandingPage onExplore={() => navigate('gigs')} onPost={() => navigate('post')} />;
    }
  };

  return (
    <Layout currentView={currentView} navigate={navigate} user={user} profile={profile} onAuthClick={() => setIsAuthModalOpen(true)} toggleTheme={toggleTheme} theme={theme}>
      {renderContent()}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </Layout>
  );
};

const AuthWall = ({ onAuthClick }: { onAuthClick: () => void }) => (
  <div className="max-w-md mx-auto py-40 text-center animate-fade-up">
    <div className="bg-indigo-50 dark:bg-indigo-900/20 w-24 h-24 rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-inner border border-indigo-100 dark:border-indigo-800">
      <Lock className="w-10 h-10 text-indigo-600" />
    </div>
    <h2 className="text-4xl font-black mb-4 dark:text-white tracking-tighter">Nexus Restricted</h2>
    <p className="text-xl text-slate-500 mb-10">Access to the Gig board is limited to registered professionals. Connect to unlock opportunities.</p>
    <button onClick={onAuthClick} className="w-full py-6 bg-slate-900 dark:bg-indigo-600 text-white rounded-[24px] font-black text-xl shadow-3xl hover:scale-105 transition-all active:scale-95">Connect to Nexus</button>
  </div>
);

const AdminLock = ({ navigate }: { navigate: (v: View) => void }) => (
  <div className="max-w-md mx-auto py-40 text-center animate-fade-up">
    <div className="bg-rose-50 dark:bg-rose-900/20 w-24 h-24 rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-inner border border-rose-100 dark:border-rose-800">
      <Key className="w-10 h-10 text-rose-500" />
    </div>
    <h2 className="text-4xl font-black mb-4 dark:text-white tracking-tighter">Forbidden Sector</h2>
    <p className="text-xl text-slate-500 mb-10">Your account does not have administrative clearance for this terminal. Please return to the public nexus.</p>
    <button onClick={() => navigate('home')} className="w-full py-6 bg-slate-900 dark:bg-indigo-600 text-white rounded-[24px] font-black text-xl hover:scale-105 transition-all">Return Home</button>
  </div>
);

export default App;
