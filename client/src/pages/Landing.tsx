import React from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Database, Zap, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-dark text-white selection:bg-pink-500 selection:text-white relative overflow-hidden">
      {/* Background Pink Glow */}
      <div className="absolute inset-0 bg-pink-glow opacity-50 pointer-events-none" />

      {/* Header */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between mx-auto right-0">
        <div className="flex items-center gap-2 font-bold text-xl tracking-wider max-w-7xl mx-auto w-full">
          <Shield className="text-pink-500 w-6 h-6" />
          <span className="flex-1">SYNAPSE<span className="text-pink-500">.OSINT</span></span>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium hover:text-pink-400 transition-colors">Sign In</Link>
            <Link to="/login" className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-sm font-medium rounded-lg transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)]">
              Initialize
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 max-w-7xl mx-auto text-center flex flex-col items-center z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="px-3 py-1 bg-surface border border-pink-500/30 rounded-full text-xs font-mono text-pink-400 mb-6 inline-block shadow-[0_0_15px_rgba(236,72,153,0.2)]">
            V4.2 Intelligence Engine Online
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl">
            Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600">Beyond Search</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Verify identities, detect fraud, and investigate records securely with our premium OSINT architecture.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/login" className="px-8 py-4 bg-pink-600 hover:bg-pink-500 rounded-xl font-medium flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:scale-105">
              Start Searching <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Pricing Section (Taller cards with 5 benefits) */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Intelligence Packages</h2>
          <p className="text-gray-400">Scale your analytical capabilities.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <PricingCard 
            title="Pay As You Go" 
            price="₹50" 
            period="25 Credits" 
            desc="Ideal for occasional lookups." 
            features={['Benefit ex1: Full API access', 'Benefit ex2: Lifetime credit validity', 'Benefit ex3: Standard support queue', 'Benefit ex4: Export to JSON', 'Benefit ex5: Public record scanning']} 
          />
          <PricingCard 
            title="Weekly Pro" 
            price="₹499" 
            period="7 Days" 
            desc="Unlimited short-term investigations." 
            popular 
            features={['Benefit ex1: Unlimited lookups', 'Benefit ex2: Bypasses credit logic', 'Benefit ex3: Priority processing', 'Benefit ex4: Premium UI badge', 'Benefit ex5: 24/7 dedicated support']} 
          />
          <PricingCard 
            title="Monthly Elite" 
            price="₹1,499" 
            period="30 Days" 
            desc="Enterprise access for analysts." 
            features={['Benefit ex1: Unlimited volume', 'Benefit ex2: Advanced server routing', 'Benefit ex3: Threat intelligence feeds', 'Benefit ex4: Custom data webhooks', 'Benefit ex5: Dedicated account manager']} 
          />
        </div>
      </section>
    </div>
  );
}

function PricingCard({ title, price, period, desc, features, popular }: { title: string, price: string, period: string, desc: string, features: string[], popular?: boolean }) {
  return (
    <div className={`bg-glass-gradient border transition-all duration-500 hover:-translate-y-3 hover:shadow-3d-hover min-h-[550px] flex flex-col justify-between ${popular ? 'border-pink-500 shadow-3d scale-105 z-10 bg-black/40' : 'border-border shadow-md'} p-8 rounded-2xl relative`}>
      {popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-600 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold shadow-[0_0_10px_rgba(236,72,153,0.5)]">Most Popular</span>}
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-6">{desc}</p>
        <div className="text-4xl font-extrabold mb-1">{price} <span className="text-sm font-normal text-gray-400">/ {period}</span></div>
        <div className="space-y-4 mt-8 border-t border-border pt-6">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
              <Check className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
      <Link to="/login" className={`mt-8 w-full py-3 rounded-xl font-medium text-center transition-all duration-300 ${popular ? 'bg-pink-600 hover:bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]' : 'bg-surface border border-border hover:border-pink-500/50 hover:text-pink-300'}`}>
        Choose Plan
      </Link>
    </div>
  );
}
