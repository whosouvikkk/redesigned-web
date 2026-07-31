import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Shield, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', data.token);
      navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err: any) {
      console.error('Login Error:', err);
      setError(err.response?.data?.error || 'Network error: Backend unreachable. Check Vercel logs.');
      if (err.response?.data?.error?.includes('sign up')) {
        setTimeout(() => navigate('/register'), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-pink-glow opacity-60 pointer-events-none" />
      
      <div className="w-full max-w-md bg-[#0a0508]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative z-10 shadow-3d hover:shadow-3d-hover transition-all duration-500 shadow-glass-edge">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6 font-bold text-xl">
          <Shield className="text-pink-500 w-6 h-6" />
          <span>MOONWITCH<span className="text-pink-500">.OSINT</span></span>
        </Link>

        <h2 className="text-xl font-semibold text-center mb-2 text-white">Access Portal</h2>
        <p className="text-sm text-gray-400 text-center mb-8">Secure intelligence gateway.</p>

        {error && <div className="bg-pink-500/10 border border-pink-500/20 text-pink-400 p-3 rounded-xl mb-6 text-sm text-center shadow-inner">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Username</label>
            <div className="relative">
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} required disabled={loading} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pl-11 text-sm text-white outline-none focus:border-pink-500 transition-colors shadow-inner disabled:opacity-50" placeholder="Agent Name" />
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Password</label>
            <div className="relative">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required disabled={loading} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pl-11 text-sm text-white outline-none focus:border-pink-500 transition-colors shadow-inner disabled:opacity-50" placeholder="••••••••" />
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-b from-pink-500 to-pink-700 hover:from-pink-400 hover:to-pink-600 rounded-xl font-medium text-sm text-white transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(236,72,153,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] disabled:opacity-70">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Authenticate'} {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          No credentials found? <Link to="/register" className="text-pink-400 hover:text-pink-300 font-medium transition-colors">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
