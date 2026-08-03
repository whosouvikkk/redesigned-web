import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RefreshCw, Trash2, Save, LogOut, ShieldAlert } from 'lucide-react';
import api from '../../services/api';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Fetch users function
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.post('/admin/users', { adminPassword: password });
      setUsers(res.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch users.');
      if (err.response?.status === 401) setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle Admin Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/admin/users', { adminPassword: password });
      setUsers(res.data);
      setIsAuthenticated(true);
      setError('');
    } catch (err: any) {
      setError('Invalid Admin Password');
    } finally {
      setLoading(false);
    }
  };

  // Update User Credits/Plan
  const handleUpdate = async (userId: string, updates: any) => {
    try {
      await api.put(`/admin/user/${userId}`, { adminPassword: password, ...updates });
      fetchUsers(); // Refresh data after update
    } catch (err) {
      alert('Failed to update user');
    }
  };

  // Delete User
  const handleDelete = async (userId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this user?')) return;
    try {
      await api.delete(`/admin/user/${userId}`, { data: { adminPassword: password } });
      fetchUsers(); // Refresh data after deletion
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- LOGIN SCREEN (If not authenticated) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[150px] opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        
        <div className="bg-black/40 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.8)] p-8 md:p-10 rounded-[2rem] relative z-10 w-full max-w-sm">
          <div className="flex justify-center mb-6">
            <img src="/witch.png" alt="MoonWitch Admin" className="w-12 h-12 object-contain drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-white tracking-tight">Admin Override</h2>
          {error && <p className="text-rose-400 text-sm text-center mb-4 bg-rose-500/10 p-2 rounded-lg">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-pink-500 text-center tracking-widest" 
              placeholder="Enter Admin Passphrase" 
            />
            <button type="submit" disabled={loading} className="w-full py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-bold text-sm transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              {loading ? 'Verifying...' : 'Authorize'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- MAIN ADMIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans relative flex flex-col">
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-rose-600 rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none fixed" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none fixed" />

      {/* Admin Navbar */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/witch.png" alt="MoonWitch Admin" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
            <span className="font-bold text-xl text-white tracking-wide">Command<span className="text-pink-500">Center</span></span>
          </div>
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors">
            <LogOut className="w-4 h-4" /> Exit Admin
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full relative z-10">
        
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">User Management</h1>
          <p className="text-gray-400 text-sm font-light">Monitor, update, and manage agent intelligence profiles.</p>
        </div>

        {/* Action Bar (Search & Refresh) */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users by username..." 
              className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-sm text-white outline-none focus:border-pink-500 transition-colors shadow-inner placeholder:text-gray-600"
            />
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
          </div>
          <button 
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/20 rounded-xl text-sm font-bold transition-all disabled:opacity-50 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        {/* Responsive Table Card */}
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 shadow-lg rounded-2xl overflow-hidden">
          <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-pink-500/30 scrollbar-track-transparent">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-4 text-xs font-semibold text-gray-400 tracking-wider uppercase">Username</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 tracking-wider uppercase">Credits</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 tracking-wider uppercase">Plan</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 tracking-wider uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
                    
                    <td className="p-4 font-medium text-sm text-white whitespace-nowrap">
                      {user.username}
                      {user.role === 'admin' && <span className="ml-2 text-[10px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full uppercase tracking-wide">Admin</span>}
                    </td>
                    
                    <td className="p-4 whitespace-nowrap">
                      <input 
                        type="number" 
                        defaultValue={user.credits}
                        onBlur={(e) => handleUpdate(user._id, { credits: Number(e.target.value) })}
                        className="w-24 bg-black/60 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-pink-500"
                      />
                    </td>
                    
                    <td className="p-4 whitespace-nowrap">
                      <select 
                        defaultValue={user.subscription}
                        onChange={(e) => handleUpdate(user._id, { subscription: e.target.value })}
                        className="bg-black/60 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-pink-500 appearance-none min-w-[120px]"
                      >
                        <option value="none">None</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="lifetime">Lifetime</option>
                      </select>
                    </td>

                    <td className="p-4 whitespace-nowrap text-right">
                      <button 
                        onClick={() => handleDelete(user._id)}
                        className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg transition-colors ml-auto flex items-center justify-center"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))}
                
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500 text-sm font-light">
                      {loading ? 'Fetching records...' : 'No users found matching your search.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
