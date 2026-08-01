import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Clock, CreditCard, ShieldAlert } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  // Links based on your file structure (Dashboard, Lookup, History, Billing)
  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: Home },
    { name: 'Lookup', path: '/dashboard/lookup', icon: Search },
    { name: 'History', path: '/dashboard/history', icon: Clock },
    { name: 'Billing', path: '/dashboard/billing', icon: CreditCard },
  ];

  return (
    <aside className="w-64 bg-[#12101a] border-r border-gray-800/60 h-screen hidden lg:flex flex-col">
      
      {/* Sidebar Header / Brand */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800/60">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/witch.png" 
            alt="MoonWitch Logo" 
            className="h-8 w-8 object-contain" 
          />
          <span className="font-bold text-xl tracking-wider text-white">
            MOONWITCH
          </span>
        </Link>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-pink-600/10 text-pink-500 border border-pink-500/20' 
                  : 'text-gray-400 hover:bg-[#1a1825] hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Admin Panel Section */}
      <div className="p-4 border-t border-gray-800/60">
        <Link
          to="/admin"
          className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-pink-900/20 hover:text-pink-500 rounded-lg transition-all"
        >
          <ShieldAlert className="h-5 w-5" />
          <span className="font-medium">Admin Panel</span>
        </Link>
      </div>
    </aside>
  );
}
