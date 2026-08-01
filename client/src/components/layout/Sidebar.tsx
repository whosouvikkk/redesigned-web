import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, LogOut, Shield, ShieldCheck } from 'lucide-react';

export default function Sidebar({ user }: { user?: any }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="w-64 border-r border-border bg-dark/60 backdrop-blur-xl flex flex-col justify-between p-6">
      <div>
        <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-8">
          <Shield className="text-pink-500 w-5 h-5" />
          <span>MOONWITCH<span className="text-pink-500">.OSINT</span></span>
        </Link>

        {user && (
          <div className="bg-glass-gradient border border-border p-4 rounded-xl mb-6">
            <div className="text-xs text-gray-400">Agent Identifier</div>
            <div className="text-sm font-bold text-pink-400 truncate mb-2">{user.username}</div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Credits:</span>
              <span className="font-mono font-bold text-white">{user.credits}</span>
            </div>
            <div className="flex justify-between items-center text-xs mt-1">
              <span className="text-gray-400">Plan:</span>
              <span className="uppercase font-semibold text-pink-500">{user.subscription}</span>
            </div>
          </div>
        )}

        <nav className="space-y-1">
          <NavItem to="/dashboard" icon={<LayoutDashboard className="w-4 h-4" />} label="Overview" active={location.pathname === '/dashboard'} />
          <NavItem to="/dashboard/lookup" icon={<Search className="w-4 h-4" />} label="OSINT Lookup" active={location.pathname === '/dashboard/lookup'} />
          <NavItem to="/protected-data" icon={<ShieldCheck className="w-4 h-4" />} label="Data Removal" active={location.pathname === '/protected-data'} />
        </nav>
      </div>

      <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-pink-400 hover:bg-pink-500/10 transition-colors">
        <LogOut className="w-4 h-4" />
        <span>Disconnect</span>
      </button>
    </aside>
  );
}

function NavItem({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'bg-pink-600/10 text-pink-400 border border-pink-500/20' : 'text-gray-400 hover:bg-surface hover:text-white'}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}
