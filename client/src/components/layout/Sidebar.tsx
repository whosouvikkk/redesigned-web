import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, LogOut, Shield, ShieldCheck, CreditCard } from 'lucide-react';

export default function Sidebar({ user }: { user?: any }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="w-64 border-r border-white/10 bg-[#0a0508]/80 backdrop-blur-xl flex flex-col justify-between p-6">
      <div>
        <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-8 text-white">
          <Shield className="text-pink-500 w-5 h-5" />
          <span>MOONWITCH<span className="text-pink-500">.OSINT</span></span>
        </Link>

        {user && (
          <div className="bg-gradient-to-br from-pink-500/10 to-transparent border border-white/5 p-4 rounded-xl mb-6 shadow-glass-edge">
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
          <NavItem to="/dashboard/billing" icon={<CreditCard className="w-4 h-4" />} label="Billing & Plans" active={location.pathname.includes('/dashboard/billing') || location.pathname.includes('/checkout')} />
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
    <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'bg-pink-600/20 text-pink-400 border border-pink-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}
