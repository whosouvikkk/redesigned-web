import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Send, Loader2, ArrowLeft } from 'lucide-react';
import api from '../../services/api';

const PLAN_DETAILS: Record<string, { title: string, price: string, instructions: string }> = {
  'pay-as-you-go': {
    title: 'Pay As You Go',
    price: '₹50 Minimum',
    instructions: 'Min buying amount - 20 credits. Price - 50rs. Scan the QR code below to pay.'
  },
  'weekly': {
    title: 'Weekly Pro Plan',
    price: '₹499',
    instructions: 'Pay this amount to this QR to activate your 7-Day Unlimited Access.'
  },
  'monthly': {
    title: 'Monthly Elite Plan',
    price: '₹1,499',
    instructions: 'Pay this amount to this QR to activate your 30-Day Unlimited Access.'
  },
  'lifetime': {
    title: 'Lifetime Pass',
    price: '₹9,999',
    instructions: 'Pay this amount to this QR for Permanent Unlimited Access.'
  }
};

export default function Checkout() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const plan = PLAN_DETAILS[planId || 'pay-as-you-go'];

  const [username, setUsername] = useState('');
  const [utr, setUtr] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'error' | 'success', msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (utr.length <= 4) {
      setStatus({ type: 'error', msg: 'UTR / Transaction ID must be more than 4 digits.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await api.post('/billing/submit-payment', { 
        planId, 
        username, 
        utr 
      });
      setStatus({ type: 'success', msg: 'Payment details submitted successfully! An admin will verify and credit your account shortly.' });
      setUtr('');
    } catch (err: any) {
      setStatus({ type: 'error', msg: err.response?.data?.error || 'Failed to submit payment. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl font-sans">
      <button onClick={() => navigate('/dashboard/billing')} className="flex items-center gap-2 text-sm text-pink-400 hover:text-pink-300 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Plans
      </button>

      <div className="bg-[#0d070a] border border-white/5 rounded-3xl p-8 shadow-3d shadow-glass-edge flex flex-col md:flex-row gap-10">
        
        {/* QR Section */}
        <div className="flex-1 flex flex-col items-center justify-center bg-black/50 border border-white/10 rounded-2xl p-6 shadow-inner">
          <h2 className="text-xl font-bold mb-1 text-center">{plan.title}</h2>
          <div className="text-2xl font-extrabold text-pink-400 mb-4">{plan.price}</div>
          <p className="text-xs text-gray-400 text-center mb-6">{plan.instructions}</p>
          
          <div className="bg-white p-2 rounded-xl border-4 border-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
            {/* The scanner.png from your root folder */}
            <img src="/scanner.png" alt="Payment QR Code" className="w-48 h-48 object-cover rounded-lg" />
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-pink-400" /> Payment Verification
          </h3>
          
          {status && (
            <div className={`p-3 rounded-xl mb-4 text-sm text-center shadow-inner ${status.type === 'error' ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-green-500/10 border border-green-500/20 text-green-400'}`}>
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Your Registered Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required 
                disabled={loading}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-pink-500 shadow-inner disabled:opacity-50" 
                placeholder="Agent Username" 
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">UTR / Transaction ID</label>
              <input 
                type="text" 
                value={utr} 
                onChange={e => setUtr(e.target.value)} 
                required 
                disabled={loading}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-pink-500 shadow-inner disabled:opacity-50" 
                placeholder="Enter 12-digit UTR" 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-gradient-to-b from-pink-500 to-pink-700 hover:from-pink-400 hover:to-pink-600 rounded-xl font-medium text-sm text-white transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(236,72,153,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] disabled:opacity-70 mt-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Submit Payment</>}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
