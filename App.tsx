
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import JobFeed from './components/JobFeed';
import AdminPanel from './components/AdminPanel';
import JobPostForm from './components/JobPostForm';
import Dashboard from './components/Dashboard';
import AboutPage from './components/AboutPage';
import AuthModal from './components/AuthModal';
import { auth, db } from './firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Zap, ShieldAlert, Key, Lock } from 'lucide-react';
import { UserRole, UserProfile } from './types';

export type View = 'home' | 'gigs' | 'post' | 'admin' | 'about' | 'founder' | 'dashboard';

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
        if (snap.exists()) setProfile(snap.data() as UserProfile);
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
      const valid: View[] = ['home', 'gigs', 'post', 'admin', 'about', 'founder', 'dashboard'];
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

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950"><Zap className="w-12 h-12 text-indigo-600 animate-spin" /></div>;

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <LandingPage onExplore={() => navigate('gigs')} onPost={() => navigate('post')} />;
      case 'gigs': 
        if (!user) return <AuthWall navigate={navigate} onAuthClick={() => setIsAuthModalOpen(true)} />;
        return <JobFeed />;
      case 'dashboard': return user ? <Dashboard /> : <AuthWall navigate={navigate} onAuthClick={() => setIsAuthModalOpen(true)} />;
      case 'post': return user ? <JobPostForm onSuccess={() => navigate('gigs')} /> : <AuthWall navigate={navigate} onAuthClick={() => setIsAuthModalOpen(true)} />;
      case 'about': return <AboutPage type="platform" />;
      case 'founder': return <AboutPage type="founder" />;
      case 'admin':
        if (profile?.role !== UserRole.ADMIN) return <AdminLock navigate={navigate} />;
        return <AdminPanel />;
      default: return <LandingPage onExplore={() => navigate('gigs')} onPost={() => navigate('post')} />;
    }
  };

  return (
    <Layout currentView={currentView} navigate={navigate} user={user} onAuthClick={() => setIsAuthModalOpen(true)} toggleTheme={toggleTheme} theme={theme}>
      {renderContent()}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </Layout>
  );
};

const AuthWall = ({ onAuthClick }: any) => (
  <div className="max-w-md mx-auto py-40 text-center animate-fade-up">
    <Lock className="w-20 h-20 text-indigo-600 mx-auto mb-8" />
    <h2 className="text-4xl font-black mb-4 dark:text-white tracking-tighter">Nexus Restricted</h2>
    <p className="text-xl text-slate-500 mb-10">You must be part of the professional ecosystem to access this sector.</p>
    <button onClick={onAuthClick} className="w-full py-6 bg-slate-900 dark:bg-indigo-600 text-white rounded-[24px] font-black text-xl shadow-3xl">Connect to Nexus</button>
  </div>
);

const AdminLock = ({ navigate }: any) => (
  <div className="max-w-md mx-auto py-40 text-center animate-fade-up">
    <Key className="w-20 h-20 text-rose-500 mx-auto mb-8" />
    <h2 className="text-4xl font-black mb-4 dark:text-white tracking-tighter">Forbidden Access</h2>
    <p className="text-xl text-slate-500 mb-10">Your account does not have administrative clearance for this terminal.</p>
    <button onClick={() => navigate('home')} className="w-full py-6 bg-slate-900 dark:bg-indigo-600 text-white rounded-[24px] font-black">Return to Home</button>
  </div>
);

export default App;
