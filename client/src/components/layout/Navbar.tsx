import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, LayoutDashboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-border px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-3">
        <Shield className="w-6 h-6 text-accent" />
        <span className="font-bold tracking-wider text-lg">MOONWITCH OSINT</span>
      </Link>
      <div className="flex items-center space-x-6 text-sm">
        <Link to="/protect" className="text-gray-400 hover:text-white transition-colors">Protect Data</Link>
        {token ? (
          <>
            <Link to="/dashboard" className="flex items-center space-x-2 text-accent font-medium">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-accent hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition-all">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};
