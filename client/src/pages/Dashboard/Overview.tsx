import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Zap, Database, Activity } from 'lucide-react';

export default function Overview() {
  const { user } = useOutletContext<any>();

  const isSubActive = user?.subscription !== 'none' && 
                      (user?.subscription === 'lifetime' || (user?.subscriptionExpiry && new Date(user.subscriptionExpiry) > new Date()));

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-400 text-sm md:text-base mt-1 font-light">
          Welcome back, Agent <span className="font-medium text-white">{user?.username}</span>.
        </p>
      </div>

      {/* --- PAYWALL ALERT CARD --- */}
      {(!isSubActive && user?.credits <= 0) && (
        <div className="bg-rose-500/10 border border-rose-500/20 p-6 md:p-8 rounded-[2rem] shadow-inner mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-rose-400 mb-3 flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 md:w-7 md:h-7" /> Subscription or Credits Required
            </h3>
            <p className="text-gray-300 font-light text-sm md:text-base mb-6 leading-relaxed max-w-3xl">
              You currently have 0 credits and no active subscription. Upgrade your plan or purchase additional credits from the Billing section to continue.
            </p>
            
            {/* View Plans Button */}
            <Link 
              to="/dashboard/billing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-rose-500 text-white hover:bg-rose-600 rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)]"
            >
              View Plans <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* --- STATS GRID --- */}
      {/* Responsive: 1 column on mobile, 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <StatCard 
          title="Available Credits" 
          value={user?.credits?.toString() || '0'} 
          icon={<Database className="w-5 h-5 text-pink-400" />} 
        />
        <StatCard 
          title="Active Subscription" 
          value={user?.subscription ? user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1) : 'None'} 
          icon={<Zap className="w-5 h-5 text-pink-400" />} 
        />
        <StatCard 
          title="System Status" 
          value="Online" 
          icon={<Activity className="w-5 h-5 text-green-400" />} 
        />
      </div>
      
      {/* --- QUICK ACTIONS / INFO --- */}
      <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none" />
        
        <div className="relative z-10">
          <h3 className="text-lg md:text-xl font-bold text-white mb-3 tracking-wide">Investigation Hub</h3>
          <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed mb-8 max-w-4xl">
            Navigate to the <Link to="/dashboard/lookup" className="text-pink-400 hover:text-pink-300 font-medium underline underline-offset-4 decoration-pink-500/30">Intelligence</Link> tab to begin your queries. 
            Ensure your actions comply with the MoonWitch Terms of Service.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Link 
              to="/dashboard/lookup" 
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl text-sm font-bold transition-all shadow-inner text-center"
            >
              Begin Search
            </Link>
            <Link 
              to="/dashboard/history" 
              className="px-6 py-3 bg-transparent hover:bg-white/5 border border-white/5 hover:border-white/10 text-gray-300 hover:text-white rounded-xl text-sm font-medium transition-all text-center"
            >
              Return to Home page
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}

// --- REUSABLE STAT CARD COMPONENT ---
function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden flex items-center gap-5 hover:bg-white/[0.04] transition-colors group">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      
      <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl relative z-10 shadow-inner group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      <div className="relative z-10 flex-1 min-w-0">
        <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest mb-1 truncate">{title}</p>
        <p className="text-2xl md:text-3xl font-bold text-white tracking-tight truncate">{value}</p>
      </div>
    </div>
  );
}
