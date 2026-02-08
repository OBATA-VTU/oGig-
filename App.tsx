
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import JobFeed from './components/JobFeed';
import AdminPanel from './components/AdminPanel';
import JobPostForm from './components/JobPostForm';
import LegalPage from './components/LegalPage';
import AboutPage from './components/AboutPage';
import AuthModal from './components/AuthModal';
import { auth } from './firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ShieldAlert, Key, HelpCircle } from 'lucide-react';

export type View = 'home' | 'gigs' | 'post' | 'admin' | 'privacy' | 'terms' | 'safety' | 'about';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'adminoba') {
        setCurrentView('admin');
      } else if (hash === 'gigs') {
        setCurrentView('gigs');
      } else if (hash === 'post') {
        setCurrentView('post');
      } else if (hash === 'privacy') {
        setCurrentView('privacy');
      } else if (hash === 'terms') {
        setCurrentView('terms');
      } else if (hash === 'safety') {
        setCurrentView('safety');
      } else if (hash === 'about') {
        setCurrentView('about');
      } else {
        // Explicitly set to home if no hash or unknown hash
        setCurrentView('home');
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check on load
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

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <LandingPage onExplore={() => navigate('gigs')} />;
      case 'gigs': return <JobFeed />;
      case 'post': 
        if (!user) {
          return (
            <div className="max-w-md mx-auto py-24 text-center">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Authentication Required</h2>
              <p className="text-slate-500 font-bold mb-8">You must be logged in to post gigs to the oGig nexus.</p>
              <button onClick={() => setIsAuthModalOpen(true)} className="px-10 py-5 bg-slate-900 text-white rounded-3xl font-black">Log In to Post</button>
            </div>
          );
        }
        return <JobPostForm onSuccess={() => navigate('gigs')} />;
      case 'about': return <AboutPage />;
      case 'privacy':
      case 'terms':
      case 'safety':
        return <LegalPage type={currentView} />;
      case 'admin':
        if (!isAdminAuthorized) {
          return (
            <div className="max-w-md mx-auto py-24 animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-2xl text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <div className="bg-indigo-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <Key className="w-10 h-10 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Access Restricted</h2>
                <p className="text-slate-500 mb-8 font-medium">Secure dissemination portal for oGig Administrators.</p>
                <form onSubmit={handleAdminAuth} className="space-y-4">
                  <input 
                    type="password"
                    placeholder="Security Credentials"
                    className={`w-full px-5 py-4 rounded-2xl border-2 outline-none transition-all text-center text-lg ${authError ? 'border-rose-300 bg-rose-50 ring-4 ring-rose-100' : 'border-slate-100 bg-slate-50 focus:border-indigo-500'}`}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                  {authError && <p className="text-rose-600 text-sm mt-3 font-bold flex items-center justify-center gap-1"><ShieldAlert className="w-4 h-4" /> DENIED</p>}
                  <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl">Authenticate</button>
                  <button type="button" onClick={() => navigate('home')} className="text-slate-400 text-sm font-semibold hover:text-slate-600 transition-colors mt-6 block mx-auto underline">Return Home</button>
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
    >
      {renderContent()}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </Layout>
  );
};

export default App;
