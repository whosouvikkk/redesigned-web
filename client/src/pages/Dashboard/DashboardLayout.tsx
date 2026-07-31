import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Sidebar from '../../components/layout/Sidebar';

export default function DashboardLayout() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/me')
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-dark flex text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pink-glow opacity-30 pointer-events-none" />
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto p-10 relative z-10">
        <Outlet context={{ user, setUser }} />
      </main>
    </div>
  );
}
