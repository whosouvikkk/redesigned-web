import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Shield, Lock, User, ArrowRight } from 'lucide-react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/register', { username, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-pink-glow opacity-60 pointer-events-none" />
      
      <div className="w-full max-w-md bg-glass-gradient border border-border p-8 rounded-2xl backdrop-blur-xl relative z-10 shadow-3d hover:shadow-3d-hover transition-all duration-500">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6 font-bold text-xl">
          <Shield className="text-pink-500 w-6 h-6" />
          <span>MOONWITCH<span className="text-pink-500">.OSINT</span></span>
        </Link>

        <h2 className="text-xl font-semibold text-center mb-2">Initialize Account</h2>
        <p className="text-sm text-gray-400 text-center mb-8">Create your intelligence credentials.</p>

        {error && <div className="bg-pink-500/10 border border-pink-500/20 text-pink-400 p-3 rounded-xl mb-6 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Username</label>
            <div className="relative">
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full bg-surface border border-border rounded-xl px-4 py-3 pl-11 text-sm outline-none focus:border-pink-500 transition-colors" placeholder="Choose Username" />
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Password</label>
            <div className="relative">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-surface border border-border rounded-xl px-4 py-3 pl-11 text-sm outline-none focus:border-pink-500 transition-colors" placeholder="••••••••" />
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-pink-600 hover:bg-pink-500 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
            Create Credentials <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already registered? <Link to="/login" className="text-pink-400 hover:text-pink-300 font-medium transition-colors">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
