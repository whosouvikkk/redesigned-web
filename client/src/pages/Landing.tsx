import React from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Database, Zap, ArrowRight, Check, Activity, Lock, Fingerprint, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-dark text-white selection:bg-pink-500 selection:text-white relative overflow-hidden font-sans">
      
      {/* Massive Ambient Spotlights (Top Left, Top Right, Center) */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-pink-600/30 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-pink-600/30 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-pink-500/20 blur-[150px] rounded-full pointer-events-none" />

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-10 px-6 max-w-7xl mx-auto text-center flex flex-col items-center z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full">
          
          <div className="mx-auto w-fit px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-medium tracking-wide mb-8 shadow-[0_0_15px_rgba(236,72,153,0.15)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            ENTERPRISE OSINT v4.2
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Transform Data Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Intelligence With OSINT.</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Unlock your investigative potential with smart tools that streamline verification, boost threat detection, and fuel rapid analysis.
          </p>
          
          <Link to="/login" className="px-8 py-4 bg-pink-600 hover:bg-pink-500 rounded-full font-medium inline-flex items-center gap-2 transition-all shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] hover:scale-105">
            Initialize Portal <ArrowRight className="w-4 h-4" />
          </Link>

        </motion.div>
      </section>

      {/* Dashboard Preview Mockup (Built with Tailwind) */}
      <section className="relative px-6 max-w-6xl mx-auto z-10 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-[#0a0508]/80 backdrop-blur-xl p-2 shadow-[0_0_50px_rgba(236,72,153,0.2)]"
        >
          <div className="rounded-xl border border-white/5 bg-black/60 overflow-hidden flex flex-col h-[400px] md:h-[600px]">
            {/* Mock Header */}
            <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2 bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="ml-4 px-3 py-1 bg-white/5 rounded text-xs text-gray-500 font-mono flex items-center gap-2">
                <Lock className="w-3 h-3" /> secure.moonwitch.osint
              </div>
            </div>
            
            {/* Mock Body */}
            <div className="flex-1 flex p-4 gap-4">
              {/* Sidebar */}
              <div className="w-48 hidden md:flex flex-col gap-2">
                <div className="h-8 bg-white/5 rounded-lg w-full mb-4" />
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="h-8 bg-white/[0.02] rounded-lg w-full" />
                ))}
              </div>
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex gap-4 h-24">
                  <div className="flex-1 bg-white/[0.02] rounded-xl border border-white/5 p-4 flex flex-col justify-center relative overflow-hidden">
                    <div className="text-xs text-gray-500 mb-1">Active Queries</div>
                    <div className="text-2xl font-bold text-white font-mono">4,256</div>
                    <Activity className="absolute right-4 bottom-4 w-12 h-12 text-pink-500/20" />
                  </div>
                  <div className="flex-1 bg-white/[0.02] rounded-xl border border-white/5 p-4 flex flex-col justify-center relative overflow-hidden">
                    <div className="text-xs text-gray-500 mb-1">Success Rate</div>
                    <div className="text-2xl font-bold text-pink-400 font-mono">99.8%</div>
                    <Shield className="absolute right-4 bottom-4 w-12 h-12 text-pink-500/20" />
                  </div>
                </div>
                {/* Graph Mockup */}
                <div className="flex-1 bg-white/[0.02] rounded-xl border border-white/5 p-6 relative overflow-hidden">
                  <div className="text-sm text-gray-400 mb-6">Intelligence Flow</div>
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-pink-500/10 to-transparent" />
                  <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0,30 Q10,10 20,25 T40,15 T60,28 T80,10 T100,20 L100,40 L0,40 Z" fill="rgba(236,72,153,0.1)" />
                    <path d="M0,30 Q10,10 20,25 T40,15 T60,28 T80,10 T100,20" fill="none" stroke="#ec4899" strokeWidth="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trusted By Ticker */}
      <section className="border-y border-white/5 bg-white/[0.01] py-8 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-50 grayscale">
          <p className="text-sm font-medium tracking-widest uppercase text-gray-400">Trusted by Investigators</p>
          <div className="flex gap-12 font-bold text-xl items-center tracking-tighter">
            <span className="flex items-center gap-2"><Globe className="w-6 h-6"/> CYBERSEC</span>
            <span className="flex items-center gap-2"><Fingerprint className="w-6 h-6"/> FORENSICS</span>
            <span className="flex items-center gap-2"><Shield className="w-6 h-6"/> DEFENSE</span>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-32 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <div className="mx-auto w-fit px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-medium tracking-wide mb-4">
            Intelligence Vectors
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features to Simplify <br/> your Investigations</h2>
          <p className="text-gray-400">Discover how our data-driven hooks can transform your productivity.</p>
        </div>
        
        {/* Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          
          {/* Large Card (Spans 2 columns) */}
          <div className="md:col-span-2 bg-[#0d070a] rounded-2xl border border-white/5 p-8 relative overflow-hidden group">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pink-500/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
            <Search className="w-8 h-8 text-pink-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2 relative z-10">Telecom Intelligence</h3>
            <p className="text-gray-400 relative z-10 max-w-sm">Uncover network routing, active circle status, and carrier configurations in milliseconds.</p>
          </div>

          {/* Small Card */}
          <div className="bg-[#0d070a] rounded-2xl border border-white/5 p-8 relative overflow-hidden group">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pink-500/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
            <Database className="w-8 h-8 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 relative z-10">Vehicle Recon</h3>
            <p className="text-gray-400 text-sm relative z-10">Automated ownership and registration verification.</p>
          </div>

          {/* Small Card */}
          <div className="bg-[#0d070a] rounded-2xl border border-white/5 p-8 relative overflow-hidden group">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pink-500/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
            <Shield className="w-8 h-8 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 relative z-10">Aadhaar Verification</h3>
            <p className="text-gray-400 text-sm relative z-10">Instant demographic validation flags.</p>
          </div>

          {/* Large Card (Spans 2 columns) */}
          <div className="md:col-span-2 bg-[#0d070a] rounded-2xl border border-white/5 p-8 relative overflow-hidden group">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pink-500/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
            <Zap className="w-8 h-8 text-pink-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2 relative z-10">Financial Linkage (UPI)</h3>
            <p className="text-gray-400 relative z-10 max-w-sm">Resolve Virtual Payment Addresses and extract associated banking metadata seamlessly.</p>
          </div>

        </div>
      </section>

      {/* Step-by-Step / Workflow Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <div className="mx-auto w-fit px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-medium tracking-wide mb-4">
            Work Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Getting Started with OSINT</h2>
          <p className="text-gray-400">See how easy it is to streamline your investigations.</p>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0d070a] rounded-2xl border border-white/5 p-8 relative overflow-hidden mx-auto max-w-2xl text-center">
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-pink-500/20 to-transparent" />
            <div className="w-12 h-12 bg-pink-500/10 border border-pink-500/30 rounded-xl flex items-center justify-center mx-auto mb-6">
              <span className="text-pink-400 font-bold">01</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Input Intelligence Target</h3>
            <p className="text-gray-400 text-sm">Enter the subject's identifier into our secure console. Our system automatically routes the query to the correct data nodes.</p>
          </div>
          
          <div className="bg-[#0d070a] rounded-2xl border border-white/5 p-8 relative overflow-hidden mx-auto max-w-2xl text-center">
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-pink-500/20 to-transparent" />
            <div className="w-12 h-12 bg-pink-500/10 border border-pink-500/30 rounded-xl flex items-center justify-center mx-auto mb-6">
              <span className="text-pink-400 font-bold">02</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Data Aggregation</h3>
            <p className="text-gray-400 text-sm">Our infrastructure securely compiles and cleans the raw JSON payloads, stripping unnecessary metadata.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Intelligence Packages</h2>
          <p className="text-gray-400">Scale your analytical capabilities with flexible options.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <PricingCard 
            title="Pay As You Go" 
            price="₹50" 
            period="25 Credits" 
            desc="Ideal for occasional lookups." 
            features={['Full API access', 'Lifetime credit validity', 'Standard support queue', 'Export to JSON', 'Public record scanning']} 
          />
          <PricingCard 
            title="Weekly Pro" 
            price="₹499" 
            period="7 Days" 
            desc="Unlimited short-term investigations." 
            popular 
            features={['Unlimited lookups', 'Bypasses credit logic', 'Priority processing', 'Premium UI badge', '24/7 dedicated support']} 
          />
          <PricingCard 
            title="Monthly Elite" 
            price="₹1,499" 
            period="30 Days" 
            desc="Enterprise access for analysts." 
            features={['Unlimited volume', 'Advanced server routing', 'Threat intelligence feeds', 'Custom data webhooks', 'Dedicated account manager']} 
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PricingCard({ title, price, period, desc, features, popular }: { title: string; price: string; period: string; desc: string; features: string[]; popular?: boolean }) {
  return (
    <div className={`bg-[#0d070a] border transition-all duration-500 hover:-translate-y-2 min-h-[500px] flex flex-col justify-between ${popular ? 'border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.15)] scale-105 z-10' : 'border-white/5'} p-8 rounded-3xl relative overflow-hidden group`}>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      {popular && <span className="absolute top-0 inset-x-0 text-center bg-pink-600 text-white text-[10px] py-1 uppercase tracking-widest font-bold">Most Popular</span>}
      <div className={`flex-1 ${popular ? 'pt-4' : ''}`}>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-6">{desc}</p>
        <div className="text-4xl font-extrabold mb-1">{price} <span className="text-sm font-normal text-gray-500">/ {period}</span></div>
        <div className="space-y-4 mt-8 pt-6 border-t border-white/5 relative z-10">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
              <Check className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
      <Link to="/login" className={`mt-8 w-full py-3 rounded-full font-medium text-sm text-center transition-all duration-300 relative z-10 ${popular ? 'bg-pink-600 hover:bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]' : 'bg-white/5 border border-white/10 hover:border-pink-500/50 hover:bg-white/10'}`}>
        Choose Plan
      </Link>
    </div>
  );
}
