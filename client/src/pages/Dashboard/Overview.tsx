import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Database } from 'lucide-react';

export default function Overview() {
  const { user } = useOutletContext<any>();

  const isSubActive = user?.subscription !== 'none' && 
    (user?.subscription === 'lifetime' || (user?.subscriptionExpiry && new Date(user.subscriptionExpiry) > new Date()));

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
      <p className="text-gray-400 mb-8">Welcome back, <span className="text-pink-400 font-semibold">{user?.username}</span>.</p>

      {(!isSubActive && user?.credits <= 0) && (
        <div className="bg-pink-500/10 border border-pink-500/30 p-6 rounded-2xl mb-8">
          <h3 className="text-lg font-bold text-pink-400 mb-2">Access Paywall Active</h3>
          <p className="text-sm text-gray-300 mb-4">You currently have 0 credits and no active subscription. Upgrade your plan to perform searches.</p>
          <Link to="/dashboard/billing" className="px-5 py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-sm font-medium inline-block">
            View Plans
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-glass-gradient border border-border p-6 rounded-2xl shadow-3d">
          <div className="flex items-center gap-3 text-gray-400 text-sm mb-2">
            <Zap className="w-4 h-4 text-pink-400" />
            <span>Available Credits</span>
          </div>
          <div className="text-3xl font-bold text-pink-400 font-mono">{user?.credits ?? 0}</div>
        </div>
        <div className="bg-glass-gradient border border-border p-6 rounded-2xl shadow-3d">
          <div className="flex items-center gap-3 text-gray-400 text-sm mb-2">
            <ShieldCheck className="w-4 h-4 text-pink-400" />
            <span>Subscription Status</span>
          </div>
          <div className="text-3xl font-bold uppercase text-white font-mono">{user?.subscription ?? 'None'}</div>
        </div>
        <div className="bg-glass-gradient border border-border p-6 rounded-2xl shadow-3d">
          <div className="flex items-center gap-3 text-gray-400 text-sm mb-2">
            <Database className="w-4 h-4 text-pink-400" />
            <span>Account Role</span>
          </div>
          <div className="text-3xl font-bold uppercase text-pink-500 font-mono">{user?.role ?? 'User'}</div>
        </div>
      </div>

      <div className="bg-glass-gradient border border-border p-8 rounded-2xl shadow-3d">
        <h3 className="text-xl font-bold mb-4">Execute OSINT Search</h3>
        <p className="text-gray-400 mb-6 text-sm">Query live databases across Phone Numbers, Vehicles, UPI IDs, and Aadhaar identifiers.</p>
        <Link to="/dashboard/lookup" className="px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-xl font-medium text-sm inline-flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)]">
          Launch Interface <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
