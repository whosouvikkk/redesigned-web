import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Users, Shield, Database, Trash2, Lock, ArrowRight, Activity, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();

  // Check if already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      loadDashboard();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/admin/login', { password });
      localStorage.setItem('adminToken', data.token);
      loadDashboard();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed');
    }
  };

  const loadDashboard = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users')
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setIsAuthenticated(true);
    } catch (err) {
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    }
  };

  const modifyUser = async (id: string, credits: number, subscription: string) => {
    try {
      await api.post(`/admin/users/${id}/modify`, { credits, subscription });
      loadDashboard(); // Refresh data silently
    } catch (err) {
      alert('Failed to update user');
    }
  };

  const resetCredits = async (id: string) => {
    try {
      await api.post(`/admin/users/${id}/reset-credits`);
      loadDashboard();
    } catch (err) {
      alert('Failed to reset credits');
    }
  };

  const deleteUser = async (id: string) => {
    if (confirm('CRITICAL: Are you sure you want to permanently delete this user?')) {
      await api.delete(`/admin/users/${id}`);
      loadDashboard();
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  // --- LOCK SCREEN UI ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-pink-glow opacity-50 pointer-events-none" />
        <div className="w-full max-w-md bg-[#0a0508]/90 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative z-10 shadow-3d shadow-glass-edge">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
              <Shield className="w-8 h-8 text-pink-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2 text-white">Master Override</h2>
          <p className="text-sm text-gray-400 text-center mb-8">Enter clearance code to access administration.</p>

          {error && <div className="bg-pink-500/10 border border-pink-500/20 text-pink-400 p-3 rounded-xl mb-6 text-sm text-center shadow-inner">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 pl-11 text-sm text-white outline-none focus:border-pink-500 transition-colors shadow-inner text-center tracking-widest" placeholder="••••••••" />
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
            </div>
            <button type="submit" className="w-full py-3 bg-gradient-to-b from-pink-500 to-pink-700 hover:from-pink-400 hover:to-pink-600 rounded-xl font-bold text-sm text-white transition-all shadow-[0_10px_20px_rgba(236,72,153,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)]">
              AUTHORIZE
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD UI ---
  return (
    <div className="min-h-screen bg-dark p-6 md:p-10 text-white relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-pink-glow opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Shield className="text-pink-500 w-8 h-8" />
              Master Command Center
            </h1>
            <p className="text-gray-400 mt-2">Manage system users, override subscriptions, and monitor telemetry.</p>
          </div>
          <button onClick={logout} className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-sm font-medium transition-colors">
            Lock Console
          </button>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <StatCard icon={<Users />} title="Total Agents" value={stats.totalUsers} />
            <StatCard icon={<Zap />} title="Active Subs" value={stats.activeSubs} />
            <StatCard icon={<Database />} title="Total Lookups" value={stats.totalLookups} />
            <StatCard icon={<Activity />} title="System Status" value="ONLINE" color="text-green-400" />
          </div>
        )}

        <div className="bg-[#0a0508]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-3d shadow-glass-edge">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500 bg-black/40">
                  <th className="p-5 font-medium">Agent Details</th>
                  <th className="p-5 font-medium text-center">Balance</th>
                  <th className="p-5 font-medium">Subscription</th>
                  <th className="p-5 font-medium">Credit Override</th>
                  <th className="p-5 font-medium">Plan Override</th>
                  <th className="p-5 font-medium text-right">Danger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {users.map(u => {
                  const isSubActive = u.subscription !== 'none' && (u.subscription === 'lifetime' || (u.subscriptionExpiry && new Date(u.subscriptionExpiry) > new Date()));
                  
                  return (
                    <tr key={u._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-5">
                        <div className="font-mono text-pink-300 font-bold">{u.username}</div>
                        <div className="text-xs text-gray-500 mt-1">ID: {u._id.slice(-6)}</div>
                      </td>
                      
                      <td className="p-5 text-center">
                        <span className="bg-black/50 border border-white/10 px-3 py-1.5 rounded-lg font-mono font-bold shadow-inner">
                          {u.credits}
                        </span>
                      </td>
                      
                      <td className="p-5">
                        <div className={`text-xs font-bold uppercase tracking-wider ${isSubActive ? 'text-green-400' : 'text-gray-500'}`}>
                          {u.subscription}
                        </div>
                        {u.subscriptionExpiry && (
                          <div className="text-[10px] text-gray-500 mt-1">
                            Exp: {new Date(u.subscriptionExpiry).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      
                      <td className="p-5">
                        <div className="flex gap-2">
                          <button onClick={() => modifyUser(u._id, 10, u.subscription)} className="px-2 py-1 bg-white/5 hover:bg-pink-500/20 hover:text-pink-300 border border-white/10 rounded-md text-xs transition-colors">+10</button>
                          <button onClick={() => modifyUser(u._id, 100, u.subscription)} className="px-2 py-1 bg-white/5 hover:bg-pink-500/20 hover:text-pink-300 border border-white/10 rounded-md text-xs transition-colors">+100</button>
                          <button onClick={() => resetCredits(u._id)} className="px-2 py-1 bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 rounded-md text-xs transition-colors">Zero</button>
                        </div>
                      </td>
                      
                      <td className="p-5">
                        <div className="flex gap-2">
                          <button onClick={() => modifyUser(u._id, 0, 'weekly')} className="px-2 py-1 bg-pink-600/20 hover:bg-pink-600 text-pink-300 hover:text-white border border-pink-500/30 rounded-md text-xs transition-all">Week</button>
                          <button onClick={() => modifyUser(u._id, 0, 'monthly')} className="px-2 py-1 bg-pink-600/20 hover:bg-pink-600 text-pink-300 hover:text-white border border-pink-500/30 rounded-md text-xs transition-all">Month</button>
                          <button onClick={() => modifyUser(u._id, 0, 'none')} className="px-2 py-1 bg-white/5 hover:bg-gray-700 border border-white/10 rounded-md text-xs transition-colors">Revoke</button>
                        </div>
                      </td>

                      <td className="p-5 text-right">
                        <button onClick={() => deleteUser(u._id)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors border border-red-500/20">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color = "text-pink-400" }: { icon: React.ReactNode, title: string, value: string | number, color?: string }) {
  return (
    <div className="bg-[#0a0508]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-3d shadow-glass-edge flex items-center gap-4">
      <div className={`p-3 bg-white/5 border border-white/10 rounded-2xl ${color} shadow-inner`}>
        {icon}
      </div>
      <div>
        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{title}</div>
        <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
      </div>
    </div>
  );
}
