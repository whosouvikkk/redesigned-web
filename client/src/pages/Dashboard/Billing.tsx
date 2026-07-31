import React from 'react';
import api from '../../services/api';

export default function Billing() {
  const handlePurchase = async (planType: string) => {
    try {
      await api.post('/billing/purchase', { planType });
      alert('Plan / Credits updated successfully!');
      window.location.reload();
    } catch (err) {
      alert('Purchase failed');
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Billing & Subscriptions</h1>
      <p className="text-gray-400 mb-8">Top up credits or upgrade to unlimited subscription plans.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-glass-gradient border border-border p-6 rounded-2xl flex flex-col justify-between shadow-3d hover:shadow-3d-hover transition-all">
          <div>
            <h3 className="text-xl font-bold mb-2">25 Credits Pack</h3>
            <p className="text-sm text-gray-400 mb-4">Pay As You Go - ₹2 per credit.</p>
            <div className="text-3xl font-extrabold mb-6">₹50</div>
          </div>
          <button onClick={() => handlePurchase('credits_25')} className="w-full py-3 bg-pink-600 hover:bg-pink-500 rounded-xl font-medium text-sm transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            Purchase 25 Credits
          </button>
        </div>

        <div className="bg-glass-gradient border border-border p-6 rounded-2xl flex flex-col justify-between shadow-3d hover:shadow-3d-hover transition-all">
          <div>
            <h3 className="text-xl font-bold mb-2">Weekly Pro Plan</h3>
            <p className="text-sm text-gray-400 mb-4">Unlimited lookups for 7 days.</p>
            <div className="text-3xl font-extrabold mb-6">₹499</div>
          </div>
          <button onClick={() => handlePurchase('weekly')} className="w-full py-3 bg-pink-600 hover:bg-pink-500 rounded-xl font-medium text-sm transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            Activate Weekly Plan
          </button>
        </div>
      </div>
    </div>
  );
}
