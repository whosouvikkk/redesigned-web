import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Search, CreditCard, LogOut, Shield } from 'lucide-react';
import api from '../../services/api';

export default function Sidebar({ closeSidebar }: { closeSidebar?: () => void }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string; credits: number; subscription: string } | null>(null);

  useEffect(() => {
    api.get('/auth/me').then(res => setUser(res.data)).catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const links = [
    { to: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Overview' },
    { to: '/dashboard/lookup', icon: <Search className="w-5 h-5" />, label: 'Intelligence' },
    { to: '/dashboard/billing', icon: <CreditCard className="w-5 h-5" />, label: 'Billing & Plans' },
  ];

  return (
    <div className="h-full bg-black/80 backdrop-blur-2xl border-r border-white/10 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      
      {/* Logo */}
      <div className="p-6 md:p-8 flex items-center gap-3">
        <div className="p-2 bg-pink-500/10 rounded-xl border border-pink-500/20">
          <Shield className="w-6 h-6 text-pink-500" />
        </div>
        <div className="font-bold text-xl tracking-wide text-white">
          Moon<span className="text-pink-500">Witch</span>
        </div>
      </div>

      {/* User Stats Card */}
      {user && (
        <div className="px-4 md:px-6 mb-8">
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl shadow-inner">
            <p className="text-xs text-gray-500 mb-1 tracking-wider uppercase">Active Agent</p>
            <p className="font-medium text-white truncate">{user.username}</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-gray-400">Credits:</span>
              <span className="text-pink-400 font-bold">{user.credits}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-gray-400">Plan:</span>
              <span className="text-white capitalize">{user.subscription}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/dashboard'}
            onClick={closeSidebar} // Closes drawer on mobile when navigating
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${
                isActive 
                  ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-[inset_0_0_12px_rgba(236,72,153,0.1)]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`
            }
          >
            {link.icon} {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 md:p-6 border-t border-white/5">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20 border border-transparent transition-all text-sm font-medium"
        >
          <LogOut className="w-5 h-5" /> Terminate Session
        </button>
      </div>
    </div>
  );
}
