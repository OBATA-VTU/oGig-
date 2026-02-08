
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { signOut, User } from 'firebase/auth';
import { 
  PlusCircle, Menu, X, Lock, MapPin, Phone, Mail, 
  Zap, Github, Facebook, LogOut, LayoutDashboard,
  Twitter, ArrowUpRight, Sun, Moon
} from 'lucide-react';
import { View } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  navigate: (view: View) => void;
  user: User | null;
  onAuthClick: () => void;
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, navigate, user, onAuthClick, toggleTheme, theme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('home');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Simple oGig Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => navigate('home')}
            >
              <div className="bg-slate-900 dark:bg-indigo-600 p-2 rounded-xl shadow-lg transition-transform group-hover:scale-105">
                <Zap className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                oGig<span className="text-indigo-600">.</span>
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-1">
              <button 
                onClick={() => navigate('home')} 
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${currentView === 'home' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-500 hover:text-indigo-600 dark:text-slate-400'}`}
              >
                Home
              </button>
              <button 
                onClick={() => navigate('gigs')} 
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${currentView === 'gigs' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-500 hover:text-indigo-600 dark:text-slate-400'}`}
              >
                Gigs
              </button>
              <button 
                onClick={() => navigate('about')} 
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${currentView === 'about' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-500 hover:text-indigo-600 dark:text-slate-400'}`}
              >
                About
              </button>
              
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-4"></div>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 rounded-xl transition-all"
                title="Toggle Dark Mode"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              {user ? (
                <div className="flex items-center gap-3 ml-2">
                  <button 
                    onClick={() => navigate('dashboard')} 
                    className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400"
                    title="Dashboard"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => navigate('post')} 
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-900 dark:bg-indigo-700 text-white font-black text-xs transition-all shadow-md active:scale-95"
                  >
                    <PlusCircle className="w-4 h-4" /> POST
                  </button>
                  <button onClick={handleSignOut} className="p-2 text-slate-400 hover:text-rose-600">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onAuthClick} 
                  className="px-6 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-sm transition-all"
                >
                  Log In
                </button>
              )}
            </nav>

            <div className="md:hidden flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2 text-slate-500 dark:text-slate-400">
                {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="p-2 text-slate-900 dark:text-white"
              >
                {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu with X Button */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-white dark:bg-slate-950 pt-20 px-8 space-y-6 animate-in slide-in-from-right-full duration-300">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-indigo-600" />
              <span className="text-xl font-black dark:text-white">oGig</span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full dark:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <button onClick={() => { navigate('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left p-4 font-black text-2xl dark:text-white border-b dark:border-slate-800">Home</button>
          <button onClick={() => { navigate('gigs'); setIsMobileMenuOpen(false); }} className="block w-full text-left p-4 font-black text-2xl dark:text-white border-b dark:border-slate-800">Browse Gigs</button>
          <button onClick={() => { navigate('about'); setIsMobileMenuOpen(false); }} className="block w-full text-left p-4 font-black text-2xl dark:text-white border-b dark:border-slate-800">About</button>
          
          {user && (
            <button onClick={() => { navigate('dashboard'); setIsMobileMenuOpen(false); }} className="block w-full text-left p-4 font-black text-2xl text-indigo-600">My Dashboard</button>
          )}

          <div className="pt-8">
            {!user ? (
              <button onClick={() => { onAuthClick(); setIsMobileMenuOpen(false); }} className="w-full py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-lg">Sign In</button>
            ) : (
              <button onClick={() => { navigate('post'); setIsMobileMenuOpen(false); }} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl">Post a Gig</button>
            )}
          </div>
        </div>
      )}

      <main className={`flex-grow ${currentView === 'home' ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full'}`}>
        {children}
      </main>

      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-500 fill-indigo-500" />
                <span className="text-2xl font-black text-white">oGig</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Connecting talent with verified professional opportunities across Nigeria.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Explore</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => navigate('gigs')} className="hover:text-indigo-400">Find Gigs</button></li>
                <li><button onClick={() => navigate('post')} className="hover:text-indigo-400">Hire Talent</button></li>
                <li><button onClick={() => navigate('about')} className="hover:text-indigo-400">Our Founder</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => navigate('privacy')} className="hover:text-indigo-400">Privacy Policy</button></li>
                <li><button onClick={() => navigate('terms')} className="hover:text-indigo-400">Terms of Service</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-indigo-600 transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-indigo-600 transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-indigo-600 transition-colors"><Github className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p className="opacity-40">© {new Date().getFullYear()} oGig Platform. Developed by OBA.</p>
            <button onClick={() => navigate('admin')} className="opacity-0 hover:opacity-100 transition-opacity"><Lock className="w-4 h-4" /></button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
