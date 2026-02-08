
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import JobFeed from './components/JobFeed';
import AdminPanel from './components/AdminPanel';
import JobPostForm from './components/JobPostForm';
import LegalPage from './components/LegalPage';
import AboutPage from './components/AboutPage';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';
import { auth, db } from './firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { ShieldAlert, Key, Zap, Lock } from 'lucide-react';
import { UserRole, UserProfile } from './types';

export type View = 'home' | 'gigs' | 'post' | 'admin' | 'privacy' | 'terms' | 'safety' | 'about' | 'dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setUserProfile(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'adminoba') setCurrentView('admin');
      else if (hash === 'gigs') setCurrentView('gigs');
      else if (hash === 'post') setCurrentView('post');
      else if (hash === 'privacy') setCurrentView('privacy');
      else if (hash === 'terms') setCurrentView('terms');
      else if (hash === 'safety') setCurrentView('safety');
      else if (hash === 'about') setCurrentView('about');
      else if (hash === 'dashboard') setCurrentView('dashboard');
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <LandingPage onExplore={() => navigate('gigs')} />;
      case 'gigs': 
        if (!user) {
          return (
            <div className="max-w-md mx-auto py-32 text-center px-4 animate-fade-up">
              <Lock className="w-16 h-16 text-indigo-600 mx-auto mb-8" />
              <h2 className="text-4xl font-black mb-4 dark:text-white tracking-tight">Access Restricted</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg">The oGig nexus requires an account to view and claim professional opportunities.</p>
              <button onClick={() => setIsAuthModalOpen(true)} className="w-full py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-all">Connect Now</button>
            </div>
          );
        }
        return <JobFeed />;
      case 'dashboard':
        if (!user) { navigate('home'); return null; }
        return <Dashboard />;
      case 'post': 
        if (!user) {
          return (
            <div className="max-w-md mx-auto py-32 text-center px-4">
              <ShieldAlert className="w-16 h-16 text-indigo-600 mx-auto mb-8" />
              <h2 className="text-4xl font-black mb-4 dark:text-white tracking-tight leading-none">Identity Check</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg">Please connect to the nexus to post professional opportunities.</p>
              <button onClick={() => setIsAuthModalOpen(true)} className="w-full py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-all">Connect Now</button>
            </div>
          );
        }
        return <JobPostForm onSuccess={() => navigate('gigs')} />;
      case 'about': return <AboutPage />;
      case 'privacy': case 'terms': case 'safety': return <LegalPage type={currentView} />;
      case 'admin':
        if (!user || userProfile?.role !== UserRole.ADMIN) {
          return (
            <div className="max-w-md mx-auto py-32 text-center px-4 animate-fade-up">
              <Key className="w-16 h-16 text-rose-500 mx-auto mb-8" />
              <h2 className="text-4xl font-black mb-4 dark:text-white tracking-tight leading-none">Restricted Area</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg">You do not have administrative clearance to access this terminal.</p>
              <button onClick={() => navigate('home')} className="w-full py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black">Return to Nexus</button>
            </div>
          );
        }
        return <AdminPanel />;
      default: return <LandingPage onExplore={() => navigate('gigs')} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      navigate={navigate} 
      user={user} 
      onAuthClick={() => setIsAuthModalOpen(true)}
      toggleTheme={toggleTheme}
      theme={theme}
    >
      {renderContent()}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </Layout>
  );
};

export default App;
