import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, History, CreditCard, Shield, ShieldAlert } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <aside className="w-64 border-r border-border min-h-[calc(100vh-65px)] p-6 bg-black/20 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="bg-surface border border-border p-4 rounded-xl">
          <div className="text-xs text-gray-400 mb-1">Account Standing</div>
          <div className="font-semibold text-sm truncate">{user.email}</div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-gray-400">Credits:</span>
            <span className="font-mono text-accent font-bold">{user.credits || 0}</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className="text-gray-400">Plan:</span>
            <span className="uppercase text-green-400 font-semibold">{user.subscription || 'None'}</span>
          </div>
        </div>

        <nav className="space-y-2">
          <NavLink 
            to="/dashboard" 
            end 
            className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-accent/10 text-accent border border-accent/20' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Search className="w-4 h-4" />
            <span>Lookup Console</span>
          </NavLink>
          
          <NavLink 
            to="/dashboard/history" 
            className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-accent/10 text-accent border border-accent/20' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <History className="w-4 h-4" />
            <span>Audit History</span>
          </NavLink>

          <NavLink 
            to="/dashboard/billing" 
            className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-accent/10 text-accent border border-accent/20' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Subscriptions</span>
          </NavLink>

          {user.role === 'admin' && (
            <NavLink 
              to="/admin" 
              className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'text-red-400/70 hover:bg-red-500/5'}`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Admin Panel</span>
            </NavLink>
          )}
        </nav>
      </div>

      <div className="text-xs text-gray-500 text-center border-t border-border pt-4">
        Special Thanks: Souvik & Spandan & Yash
      </div>
    </aside>
  );
};
