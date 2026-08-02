import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-xl tracking-wider">
  <span>MOONWITCH<span className="text-pink-500">.IN</span></span>
</Link>
        <div className="flex items-center gap-4">
          <Link to="/protected-data" className="text-sm text-gray-400 hover:text-pink-400 transition-colors">Protect Data</Link>
          <Link to="/login" className="text-sm font-medium hover:text-pink-400 transition-colors">Sign In</Link>
          <Link to="/login" className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-sm font-medium rounded-lg transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            Initialize
          </Link>
        </div>
      </div>
    </nav>
  );
}
