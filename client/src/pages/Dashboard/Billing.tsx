import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Billing() {
  return (
    <div className="max-w-7xl font-sans relative">
      
      {/* Background Ambience just for the billing tab */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none z-0" />
      
      <div className="relative z-10 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white tracking-tight">Billing & Subscriptions</h1>
        <p className="text-gray-400 font-light text-lg">Purchase credits or upgrade to unlimited subscription tiers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch relative z-10">
        <PricingCard 
          index={0}
          title="Pay As You Go" 
          price="₹50" 
          period="20 Credits" 
          desc="Minimum buy 20 credits." 
          features={['1 Credit = 1 Lookup', 'Lifetime credit validity (if unused)', 'Purchase additional credits anytime']} 
          link="https://payuinew.vercel.app/credits" // <-- REPLACE WITH YOUR LINK LATER
        />
        <PricingCard 
          index={1}
          title="Weekly Pro" 
          price="₹99" 
          period="7 Days" 
          desc="Unlimited short investigations." 
          popular 
          features={['Unlimited lookups', 'Bypass credit logic', 'Priority lookup queue']}
          link="https://payuinew.vercel.app/weekly" // <-- REPLACE WITH YOUR LINK LATER
        />
        <PricingCard 
          index={2}
          title="Monthly Elite" 
          price="₹249" 
          period="30 Days" 
          desc="Enterprise access for analysts." 
          features={['Unlimited lookups','Faster processing speeds', 'Priority customer support', 'Upto 5x Free Data Protection']} 
          link="https://payuinew.vercel.app/monthly" // <-- REPLACE WITH YOUR LINK LATER
        />
        <PricingCard 
          index={3}
          title="Lifetime Pass" 
          price="₹1,999" 
          period="Forever" 
          desc="Permanent platform access." 
          features={['Own Custom Api access', 'Zero recurring sub', 'VIP priority nodes',  'Unlimited Free Data Protection', 'Custom Database']}
          link="https://payuinew.vercel.app/lifetime" // <-- REPLACE WITH YOUR LINK LATER
        />
      </div>
    </div>
  );
}

// --- REUSABLE GLASSMORPHISM PRICING CARD ---

function PricingCard({ 
  title, 
  price, 
  period, 
  desc, 
  features, 
  popular, 
  index, 
  link 
}: { 
  title: string; 
  price: string; 
  period: string; 
  desc: string; 
  features: string[]; 
  popular?: boolean; 
  index: number;
  link: string;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-black/40 backdrop-blur-2xl transition-all duration-500 min-h-[480px] flex flex-col justify-between p-8 rounded-[2rem] relative group overflow-hidden ${popular ? 'border border-pink-500/50 shadow-[0_0_50px_rgba(236,72,153,0.15),inset_0_1px_1px_rgba(255,255,255,0.3)] z-10 lg:scale-105' : 'border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.8)] hover:bg-white/[0.04]'}`}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none" />

      {popular && (
        <span className="absolute top-4 right-6 bg-pink-500/20 text-pink-400 text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold border border-pink-500/30 z-10">
          Popular
        </span>
      )}

      <div className="flex-1 relative z-10">
        <h3 className="text-xl font-medium text-white tracking-tight mb-2">{title}</h3>
        <p className="text-xs text-gray-400 font-light leading-relaxed mb-6 pr-4">{desc}</p>
        
        <div className="text-4xl font-bold text-white mb-6 tracking-tighter">
          {price}<span className="text-sm font-normal text-gray-500 tracking-normal ml-1">/ {period}</span>
        </div>
        
        <div className="space-y-3 pt-4 border-t border-white/5">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-3 text-xs text-gray-300 font-light">
              <div className="p-1 rounded-full bg-white/10 shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`mt-8 w-full block py-3.5 rounded-full font-semibold text-xs text-center transition-all duration-300 relative z-10 ${popular ? 'bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/10 text-white hover:bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'}`}
      >
        Choose Plan
      </a>
    </motion.div>
  );
}
