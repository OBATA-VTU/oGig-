
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
import { auth } from './firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ShieldAlert, Key } from 'lucide-react';

export type View = 'home' | 'gigs' | 'post' | 'admin' | 'privacy' | 'terms' | 'safety' | 'about' | 'dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
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

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setIsAdminAuthorized(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setAdminPassword('');
    }
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
      case 'gigs': return <JobFeed />;
      case 'dashboard':
        if (!user) { navigate('home'); return null; }
        return <Dashboard />;
      case 'post': 
        if (!user) {
          return (
            <div className="max-w-md mx-auto py-32 text-center px-4">
              <ShieldAlert className="w-16 h-16 text-indigo-600 mx-auto mb-8" />
              <h2 className="text-4xl font-black mb-4 dark:text-white tracking-tight">Login Required</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg">Please sign in to post opportunities.</p>
              <button onClick={() => setIsAuthModalOpen(true)} className="w-full py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black">Sign In to Continue</button>
            </div>
          );
        }
        return <JobPostForm onSuccess={() => navigate('gigs')} />;
      case 'about': return <AboutPage />;
      case 'privacy': case 'terms': case 'safety': return <LegalPage type={currentView} />;
      case 'admin':
        if (!isAdminAuthorized) {
          return (
            <div className="max-w-md mx-auto py-32 px-4">
              <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl text-center">
                <Key className="w-12 h-12 text-indigo-600 mx-auto mb-10" />
                <h2 className="text-4xl font-black mb-10 dark:text-white">Admin Access</h2>
                <form onSubmit={handleAdminAuth} className="space-y-6">
                  <input 
                    type="password"
                    placeholder="Security Code"
                    className="w-full px-8 py-5 rounded-2xl border-2 dark:bg-slate-800 dark:border-slate-700 outline-none text-center text-2xl font-black dark:text-white"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                  <button type="submit" className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-5 rounded-2xl font-black">Authenticate</button>
                  <button type="button" onClick={() => navigate('home')} className="text-slate-400 font-bold hover:text-indigo-600 mt-8 block mx-auto">Cancel</button>
                </form>
              </div>
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
