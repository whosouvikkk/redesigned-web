import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LayoutDashboard, LogIn } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('token');

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* --- LOGO (Shared on Mobile & Desktop) --- */}
        <Link to="/" className="flex items-center gap-3 relative z-50">
          <img 
            src="/witch.png" 
            alt="MoonWitch" 
            className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" 
          />
          <span className="font-bold text-xl text-white tracking-wide">
            Moon<span className="text-pink-500">Witch</span>
          </span>
        </Link>

        {/* --- DESKTOP LAYOUT (Hidden on Mobile) --- */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/#pricing" className="text-sm font-medium text-gray-300 hover:text-pink-400 transition-colors">
            Pricing
          </a>
          <Link to="/protected-data" className="text-sm font-medium text-gray-300 hover:text-pink-400 transition-colors">
            Data Removal
          </Link>
          
          {token ? (
            <Link to="/dashboard" className="px-5 py-2.5 bg-white text-black hover:bg-gray-200 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-105">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
          ) : (
            <Link to="/login" className="px-5 py-2.5 bg-white text-black hover:bg-gray-200 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-105">
              <LogIn className="w-4 h-4" /> User Login
            </Link>
          )}
        </div>

        {/* --- MOBILE HAMBURGER BUTTON (Hidden on Desktop) --- */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white relative z-50 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {/* This only renders if the hamburger menu is clicked on a phone */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black/95 backdrop-blur-3xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-2">
          
          <a 
            href="/#pricing" 
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-gray-300 hover:text-pink-400 p-2 border-l-2 border-transparent hover:border-pink-500 transition-all"
          >
            Pricing
          </a>
          
          <Link 
            to="/protected-data" 
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-gray-300 hover:text-pink-400 p-2 border-l-2 border-transparent hover:border-pink-500 transition-all"
          >
            Data Removal
          </Link>
          
          <div className="h-px w-full bg-white/10 my-2"></div>
          
          {token ? (
            <Link 
              to="/dashboard" 
              onClick={() => setIsOpen(false)}
              className="w-full py-4 bg-white text-black rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <LayoutDashboard className="w-5 h-5" /> Access Dashboard
            </Link>
          ) : (
            <Link 
              to="/login" 
              onClick={() => setIsOpen(false)}
              className="w-full py-4 bg-white text-black rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <LogIn className="w-5 h-5" /> Agent Login
            </Link>
          )}

        </div>
      )}
    </nav>
  );
}
