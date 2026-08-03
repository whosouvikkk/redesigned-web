import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User as UserIcon, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import api from '../services/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in when clicking a plan from the landing page
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      evaluateAndRedirect();
    }
  }, []);

  // Core Logic: Evaluates user credits/plans and routes accordingly
  const evaluateAndRedirect = async (userData?: any) => {
    try {
      // Use provided user data, or fetch it if missing (e.g. on page load)
      let user = userData;
      if (!user) {
        const res = await api.get('/auth/me');
        user = res.data;
      }

      // Check if subscription is active
      const isSubActive = user.subscription !== 'none' && 
        (user.subscription === 'lifetime' || (user.subscriptionExpiry && new Date(user.subscriptionExpiry) > new Date()));

      // Smart Redirect
      if (!isSubActive && user.credits <= 0) {
        navigate('/dashboard/billing'); // Out of credits & no plan -> Go to Billing
      } else {
        navigate('/dashboard'); // Has credits or plan -> Go to Dashboard
      }
    } catch (err) {
      // Fallback: If fetching user fails, just route to dashboard
      // The DashboardLayout will handle kicking invalid tokens out.
      navigate('/dashboard');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Authenticate
      const { data } = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', data.token);
      
      // 2. Run smart redirect logic
      await evaluateAndRedirect(data.user);
      
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed. Please check your credentials.');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* --- BACKGROUND LIGHTING --- */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[150px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-rose-600 rounded-full mix-blend-screen filter blur-[150px] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      {/* --- LOGIN CARD --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-black/40 backdrop-blur-2xl border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.8)] p-8 md:p-10 rounded-[2rem] relative overflow-hidden">
          
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none" />

          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <Link to="/" className="p-4 bg-white/[0.05] border border-white/10 rounded-2xl shadow-inner hover:bg-pink-500/10 hover:border-pink-500/30 transition-all group flex items-center justify-center">
                {/* Swapped Shield for your custom witch.png */}
                <img 
                  src="/witch.png" 
                  alt="MoonWitch" 
                  className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] group-hover:scale-110 transition-transform" 
                />
              </Link>
            </div>
            
            <h2 className="text-3xl font-bold text-center mb-2 text-white tracking-tight">Agent Authorization</h2>
            <p className="text-sm text-gray-400 text-center mb-8 font-light">Access your intelligence dashboard.</p>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3.5 rounded-xl mb-6 text-sm text-center shadow-inner flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium ml-1">Agent ID / Username</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    required 
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-sm text-white outline-none focus:border-pink-500 transition-colors shadow-inner placeholder:text-gray-600 focus:bg-white/[0.02]" 
                    placeholder="Enter your username" 
                  />
                  <UserIcon className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium ml-1">Security Key / Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-sm text-white outline-none focus:border-pink-500 transition-colors shadow-inner placeholder:text-gray-600 focus:bg-white/[0.02] tracking-widest" 
                    placeholder="••••••••" 
                  />
                  <Lock className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 mt-4 bg-white text-black hover:bg-gray-200 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ArrowRight className="w-5 h-5" /> Initialize Session</>}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-8 font-light">
              Don't have an agent profile?{' '}
              <Link to="/register" className="text-pink-400 hover:text-pink-300 font-medium underline underline-offset-4 decoration-pink-500/30">
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
