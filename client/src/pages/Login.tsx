import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Shield } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-6">
      <div className="bg-glass-gradient border border-border p-8 rounded-xl w-full max-w-md">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Shield className="w-8 h-8 text-accent" />
          <span className="font-bold text-xl tracking-wider">MOONWITCH</span>
        </div>
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Email Address</label>
            <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-surface border border-border p-3 rounded-lg text-sm outline-none focus:border-accent" />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Password</label>
            <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-surface border border-border p-3 rounded-lg text-sm outline-none focus:border-accent" />
          </div>
          <button type="submit" className="w-full bg-accent hover:bg-blue-600 p-3 rounded-lg font-semibold text-sm transition-all">Sign In</button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-500">
          No account? <Link to="/register" className="text-accent hover:underline">Create one</Link>
        </div>
      </div>
    </div>
  );
};
