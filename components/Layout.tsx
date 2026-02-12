
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { signOut, User } from 'firebase/auth';
import { 
  PlusCircle, Menu, X, Lock, Zap, LogOut, LayoutDashboard,
  Sun, Moon, Smartphone, Star, UserCircle, Settings
} from 'lucide-react';
import { View } from '../App';
import { UserProfile, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  navigate: (view: View) => void;
  user: User | null;
  profile: UserProfile | null;
  onAuthClick: () => void;
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, navigate, user, profile, onAuthClick, toggleTheme, theme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('home');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500">
      <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-3xl border-b border-slate-100 dark:border-slate-800 sticky top-0 z-[100] h-24 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('home')}>
            <div className="bg-slate-900 dark:bg-indigo-600 p-3 rounded-2xl shadow-xl transition-transform group-hover:scale-110">
              <Zap className="w-7 h-7 text-white fill-white" />
            </div>
            <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">oGig<span className="text-indigo-600">.</span></span>
          </div>

          <nav className="hidden xl:flex items-center space-x-1">
            <NavBtn active={currentView === 'home'} onClick={() => navigate('home')} label="Nexus" />
            <NavBtn active={currentView === 'gigs'} onClick={() => navigate('gigs')} label="Gig Board" />
            <NavBtn active={currentView === 'about'} onClick={() => navigate('about')} label="Platform" />
            
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-4"></div>

            <button onClick={toggleTheme} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-all">
              {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button>

            {deferredPrompt && (
              <button onClick={handleInstall} className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl transition-all ml-2" title="Install App">
                <Smartphone className="w-6 h-6" />
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-4 ml-4">
                <button onClick={() => navigate('dashboard')} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-all group" title="Dashboard">
                  <LayoutDashboard className="w-6 h-6 group-hover:rotate-6 transition-transform" />
                </button>
                {profile?.role === UserRole.EMPLOYER && (
                  <button onClick={() => navigate('post')} className="px-8 py-4 bg-indigo-600 text-white rounded-[20px] font-black text-xs shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-105 transition-all">HIRE TALENT</button>
                )}
                {profile?.role === UserRole.ADMIN && (
                   <button onClick={() => navigate('admin')} className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-2xl border border-rose-100 dark:border-rose-900/50" title="Admin Control">
                      <Settings className="w-6 h-6" />
                   </button>
                )}
                <button onClick={handleSignOut} className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-2xl transition-all">
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <button onClick={onAuthClick} className="ml-4 px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-[20px] font-black text-lg transition-all active:scale-95 shadow-2xl">Connect</button>
            )}
          </nav>

          <div className="xl:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 text-slate-900 dark:text-white">{theme === 'light' ? <Moon /> : <Sun />}</button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-900 dark:text-white">{isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}</button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-[120] bg-white dark:bg-slate-950 p-8 space-y-8 animate-in slide-in-from-right duration-300">
           <div className="flex justify-between items-center mb-12">
             <div className="flex items-center gap-3"><Zap className="text-indigo-600" /> <span className="text-2xl font-black dark:text-white">oGig</span></div>
             <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl dark:text-white"><X size={32} /></button>
           </div>
           <MobileNavBtn active={currentView === 'home'} onClick={() => { navigate('home'); setIsMobileMenuOpen(false); }} label="Nexus Core" />
           <MobileNavBtn active={currentView === 'gigs'} onClick={() => { navigate('gigs'); setIsMobileMenuOpen(false); }} label="Gig Board" />
           <MobileNavBtn active={currentView === 'about'} onClick={() => { navigate('about'); setIsMobileMenuOpen(false); }} label="Platform Mission" />
           {user && <MobileNavBtn active={currentView === 'dashboard'} onClick={() => { navigate('dashboard'); setIsMobileMenuOpen(false); }} label="Command Dashboard" />}
           
           <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
              {!user ? (
                <button onClick={() => { onAuthClick(); setIsMobileMenuOpen(false); }} className="w-full py-6 bg-slate-900 dark:bg-indigo-600 text-white rounded-[24px] font-black text-2xl">Connect Now</button>
              ) : (
                <button onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }} className="w-full py-6 bg-rose-50 text-rose-500 rounded-[24px] font-black text-2xl">Disconnect Session</button>
              )}
           </div>
        </div>
      )}

      <main className={`flex-grow ${currentView === 'home' || currentView === 'founder' ? '' : 'max-w-7xl mx-auto px-4 py-20 w-full'}`}>
        {children}
      </main>

      <footer className="bg-slate-950 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3"><Zap className="text-indigo-500 fill-indigo-500" /><span className="text-3xl font-black text-white tracking-tighter">oGig</span></div>
            <p className="text-slate-500 font-medium leading-relaxed">The professional digital nexus for Nigeria's brightest talents and hirers. Engineered for excellence.</p>
          </div>
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Nexus Board</h4>
            <ul className="space-y-4">
              <li><button onClick={() => navigate('gigs')} className="text-slate-500 hover:text-indigo-500 font-bold transition-colors">Browse Gigs</button></li>
              <li><button onClick={() => navigate('post')} className="text-slate-500 hover:text-indigo-500 font-bold transition-colors">Hire Talent</button></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Protocol</h4>
            <ul className="space-y-4">
              <li><button onClick={() => navigate('about')} className="text-slate-500 hover:text-indigo-500 font-bold transition-colors">The Platform</button></li>
              <li><button onClick={() => navigate('founder')} className="text-slate-500 hover:text-indigo-500 font-bold transition-colors">Founder Integrity</button></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Command HQ</h4>
            <p className="text-slate-500 font-medium leading-relaxed">AAUA, Akungba Akoko<br />Ondo State, Nigeria</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 pt-20 mt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-40 text-xs text-white uppercase tracking-[0.4em] font-black">
          <p>© {new Date().getFullYear()} oGig Platform. By Ayuba Boluwatife (OBA)</p>
          <button onClick={() => navigate('founder')} className="hover:text-indigo-500 transition-colors">Founder Portfolio</button>
        </div>
      </footer>
    </div>
  );
};

const NavBtn = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
  <button onClick={onClick} className={`px-6 py-3 rounded-2xl font-black text-sm transition-all ${active ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' : 'text-slate-500 hover:text-indigo-600 dark:text-slate-400'}`}>{label}</button>
);

const MobileNavBtn = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
  <button onClick={onClick} className={`block w-full text-left p-6 font-black text-3xl transition-all ${active ? 'text-indigo-600' : 'text-slate-900 dark:text-white'}`}>{label}</button>
);

export default Layout;
