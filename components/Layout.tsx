
import React from 'react';
import { auth } from '../firebase/config';
import { signOut, User } from 'firebase/auth';
import { Briefcase, PlusCircle, Menu, X, Lock, MapPin, Phone, Mail, Instagram, Twitter, Zap, Github, Facebook, User as UserIcon, LogOut } from 'lucide-react';
import { View } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  navigate: (view: View) => void;
  user: User | null;
  onAuthClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, navigate, user, onAuthClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFF] selection:bg-indigo-100 selection:text-indigo-900">
      <header className="bg-white/90 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('home')}>
              <div className="relative">
                <div className="bg-slate-900 p-2.5 rounded-2xl shadow-xl group-hover:bg-indigo-600 transition-colors duration-300">
                  <Zap className="w-6 h-6 text-white fill-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <span className="text-3xl font-black text-slate-900 tracking-tighter">oGig<span className="text-indigo-600">.</span></span>
            </div>

            <nav className="hidden md:flex items-center space-x-2">
              <button onClick={() => navigate('home')} className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${currentView === 'home' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'}`}>Home</button>
              <button onClick={() => navigate('gigs')} className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${currentView === 'gigs' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'}`}>Gigs</button>
              <button onClick={() => navigate('about')} className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${currentView === 'about' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'}`}>Founder</button>
              
              <div className="h-6 w-px bg-slate-200 mx-4"></div>

              {user ? (
                <div className="flex items-center gap-4">
                  <button onClick={() => navigate('post')} className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-slate-900 text-white hover:bg-indigo-600 font-black text-xs transition-all">
                    <PlusCircle className="w-4 h-4" /> POST GIG
                  </button>
                  <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                    <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} className="w-10 h-10 rounded-xl border border-slate-100" alt="Avatar" />
                    <button onClick={() => signOut(auth)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors" title="Log Out">
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={onAuthClick} className="px-7 py-2.5 rounded-2xl border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-black text-sm transition-all">
                  LOG IN
                </button>
              )}
            </nav>

            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
                {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-white pt-24 px-6 space-y-6 animate-in slide-in-from-right-full duration-300">
          <button onClick={() => { navigate('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left p-4 font-black text-2xl text-slate-900">Home</button>
          <button onClick={() => { navigate('gigs'); setIsMobileMenuOpen(false); }} className="block w-full text-left p-4 font-black text-2xl text-slate-900">Browse Gigs</button>
          <button onClick={() => { navigate('about'); setIsMobileMenuOpen(false); }} className="block w-full text-left p-4 font-black text-2xl text-slate-900">About Founder</button>
          {!user && <button onClick={() => { onAuthClick(); setIsMobileMenuOpen(false); }} className="block w-full text-center p-6 bg-slate-100 text-slate-900 rounded-[32px] font-black text-xl">Sign In</button>}
          {user && <button onClick={() => { navigate('post'); setIsMobileMenuOpen(false); }} className="block w-full text-center p-6 bg-slate-900 text-white rounded-[32px] font-black text-xl">Post a Gig</button>}
        </div>
      )}

      <main className={`flex-grow overflow-x-hidden ${currentView === 'home' ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full'}`}>
        {children}
      </main>

      <footer className="bg-slate-950 text-slate-400 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-5 space-y-10">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded-xl">
                  <Zap className="w-6 h-6 text-white fill-white" />
                </div>
                <span className="text-4xl font-black text-white tracking-tighter">oGig<span className="text-indigo-500">.</span></span>
              </div>
              <p className="text-slate-400 text-xl leading-relaxed max-w-md font-medium">
                Created by OBA. A Yoruba Nigerian citizen building digital tools for the community. Connecting talent with verified local opportunities.
              </p>
              <div className="flex gap-5">
                <a href="https://facebook.com/OBAOFAAUA" target="_blank" className="p-4 bg-white/5 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all"><Facebook className="w-6 h-6" /></a>
                <a href="https://twitter.com/OBA_AAUA" target="_blank" className="p-4 bg-white/5 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all"><Twitter className="w-6 h-6" /></a>
                <a href="https://github.com/Edunetx" target="_blank" className="p-4 bg-white/5 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all"><Github className="w-6 h-6" /></a>
              </div>
            </div>

            <div className="md:col-span-3 space-y-8">
              <h4 className="text-white font-black uppercase tracking-widest text-xs">Reach Out</h4>
              <ul className="space-y-6 font-bold text-lg">
                <li className="flex items-center gap-4 hover:text-white transition-colors"><Phone className="w-6 h-6 text-indigo-500" /> 08142452729</li>
                <li className="flex items-center gap-4 hover:text-white transition-colors"><Mail className="w-6 h-6 text-indigo-500" /> obaofaaua@gmail.com</li>
                <li className="flex items-start gap-4 hover:text-white transition-colors leading-snug">
                  <MapPin className="w-6 h-6 text-indigo-500 shrink-0" /> 
                  1 Akinbami Street, off Gudugba bus stop, Iju Ishaga, Lagos
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-8">
              <h4 className="text-white font-black uppercase tracking-widest text-xs">Platform</h4>
              <ul className="space-y-5 font-bold">
                <li><button onClick={() => navigate('privacy')} className="hover:text-indigo-400 transition-colors">Privacy</button></li>
                <li><button onClick={() => navigate('terms')} className="hover:text-indigo-400 transition-colors">Terms</button></li>
                <li><button onClick={() => navigate('safety')} className="hover:text-indigo-400 transition-colors">Safety</button></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-8">
              <h4 className="text-white font-black uppercase tracking-widest text-xs">Network</h4>
              <ul className="space-y-5 font-bold">
                <li><button onClick={() => navigate('about')} className="hover:text-indigo-400 transition-colors">Founder</button></li>
                <li><a href="https://oplug.vercel.app" target="_blank" className="hover:text-indigo-400 transition-colors">oPlug</a></li>
                <li><a href="https://obanum.vercel.app" target="_blank" className="hover:text-indigo-400 transition-colors">oBanum</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-base font-bold opacity-40">© {new Date().getFullYear()} oGig Network. Created with excellence by OBA.</p>
            <button onClick={() => navigate('admin')} className="p-3 opacity-5 hover:opacity-10 transition-all hover:bg-white/10 rounded-xl"><Lock className="w-5 h-5" /></button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
