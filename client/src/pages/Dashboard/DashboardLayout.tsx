import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import { Menu, X, Loader2 } from 'lucide-react';
import api from '../../services/api';

export default function DashboardLayout() {
  const token = localStorage.getItem('token');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data at the layout level so all child pages (Overview, etc.) can access it
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    api.get('/auth/me')
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        // If token is invalid, clear it and kick back to login
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [token, navigate]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Show a premium loading spinner while fetching user data to prevent undefined crashes
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-gray-200 overflow-hidden font-sans relative">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed on mobile, static on desktop */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        
        {/* Mobile Header (Hamburger Menu) */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/50 backdrop-blur-md z-20">
          <div className="flex items-center gap-2 font-bold text-white tracking-wide">
            <span className="text-pink-500">M.</span>OSINT
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 relative">
          {/* WE PASS THE USER CONTEXT HERE SO OVERVIEW.TSX DOES NOT CRASH */}
          <Outlet context={{ user }} />
        </main>

      </div>
    </div>
  );
}
