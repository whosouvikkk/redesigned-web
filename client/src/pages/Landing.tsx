import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Search, Shield, Database, Zap, ArrowRight, Check, Activity, 
  Lock, Fingerprint, Globe, User, Car, CreditCard, ShieldCheck, 
  HelpCircle, Terminal 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-pink-500 selection:text-white relative overflow-hidden font-sans">
      
      {/* 3D Floating Background Geometry */}
      <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[5%] w-64 h-64 bg-pink-600/10 blur-[80px] rounded-full pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[5%] w-96 h-96 bg-pink-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-pink-500/15 blur-[160px] rounded-full pointer-events-none" />

      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-12 px-6 max-w-7xl mx-auto text-center flex flex-col items-center z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full">
          
          <div className="mx-auto w-fit px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-mono tracking-wide mb-8 shadow-glass-edge flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
            ENTERPRISE OSINT v4.2 INTELLIGENCE ENGINE
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight drop-shadow-2xl">
            Intelligence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-pink-300 to-pink-600">Beyond Search</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Recover information from publicly available intelligence databases instantly. Verify identities, detect scams, and evaluate risk footprints securely.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="px-8 py-4 bg-gradient-to-b from-pink-500 to-pink-700 hover:from-pink-400 hover:to-pink-600 rounded-full font-medium inline-flex items-center gap-2 transition-all shadow-[0_10px_20px_rgba(236,72,153,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_15px_30px_rgba(236,72,153,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:-translate-y-1">
              Start Analysis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </motion.div>
      </section>

      {/* 2. ISOMETRIC 3D DASHBOARD PREVIEW */}
      <section className="relative px-6 max-w-6xl mx-auto z-10 mb-32" style={{ perspective: '2000px' }}>
        <motion.div 
          initial={{ opacity: 0, rotateX: 25, rotateY: -15, y: 100 }} 
          whileInView={{ opacity: 1, rotateX: 10, rotateY: -5, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, type: "spring", bounce: 0.2 }}
          className="rounded-2xl border border-white/10 bg-[#0a0508]/80 backdrop-blur-2xl p-2 shadow-3d hover:shadow-3d-hover transition-all duration-700 relative group"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Glass Glare Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
          
          <div className="rounded-xl border border-black bg-black/90 overflow-hidden flex flex-col h-[400px] md:h-[550px] shadow-glass-edge relative">
            {/* Header */}
            <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-gradient-to-b from-white/[0.05] to-transparent">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]" />
              </div>
              <div className="px-4 py-1.5 bg-black/80 border border-white/10 shadow-inner rounded-full text-xs text-gray-400 font-mono flex items-center gap-2">
                <Lock className="w-3 h-3 text-pink-400" /> secure.moonwitch.osint/terminal
              </div>
              <div className="text-xs font-mono text-pink-400 font-semibold shadow-pink-500 drop-shadow-md">STATUS: ACTIVE</div>
            </div>
            
            {/* Body Preview */}
            <div className="flex-1 flex p-4 gap-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/10 via-black to-black">
              {/* Sidebar Preview */}
              <div className="w-52 hidden md:flex flex-col justify-between border-r border-white/5 pr-4">
                <div className="space-y-3">
                  <div className="h-8 bg-pink-500/20 border border-pink-500/30 rounded-lg w-full flex items-center px-3 text-xs text-pink-300 font-mono shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <Terminal className="w-3.5 h-3.5 mr-2" /> Live Lookup
                  </div>
                  <div className="h-8 bg-white/[0.02] border border-white/5 shadow-inner rounded-lg w-full" />
                  <div className="h-8 bg-white/[0.02] border border-white/5 shadow-inner rounded-lg w-full" />
                </div>
                <div className="bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 p-4 rounded-xl text-xs font-mono shadow-glass-edge">
                  <div className="text-gray-400">Credits Left</div>
                  <div className="text-pink-400 font-bold text-xl drop-shadow-md">250 / 250</div>
                </div>
              </div>

              {/* Main Workspace Preview */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-28">
                  <div className="bg-white/[0.02] rounded-xl border border-white/5 shadow-glass-edge p-4 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/10 blur-[20px]" />
                    <div className="text-xs text-gray-400 mb-1 relative z-10">Active Queries</div>
                    <div className="text-2xl font-bold text-white font-mono relative z-10">14,258</div>
                    <Activity className="absolute right-3 bottom-3 w-8 h-8 text-pink-500/20" />
                  </div>
                  <div className="bg-white/[0.02] rounded-xl border border-white/5 shadow-glass-edge p-4 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/10 blur-[20px]" />
                    <div className="text-xs text-gray-400 mb-1 relative z-10">Success Rate</div>
                    <div className="text-2xl font-bold text-pink-400 font-mono relative z-10">99.9%</div>
                    <Shield className="absolute right-3 bottom-3 w-8 h-8 text-pink-500/20" />
                  </div>
                  <div className="hidden md:flex bg-white/[0.02] rounded-xl border border-white/5 shadow-glass-edge p-4 flex-col justify-center relative overflow-hidden">
                    <div className="text-xs text-gray-400 mb-1 relative z-10">Response Time</div>
                    <div className="text-2xl font-bold text-green-400 font-mono relative z-10">240ms</div>
                    <Zap className="absolute right-3 bottom-3 w-8 h-8 text-green-500/20" />
                  </div>
                </div>

                {/* Live Output Window */}
                <div className="flex-1 bg-[#050204] rounded-xl border border-black shadow-[inset_0_5px_20px_rgba(0,0,0,1)] p-5 font-mono text-xs text-pink-300 overflow-hidden relative">
                  <div className="flex justify-between items-center text-gray-500 border-b border-white/10 pb-2 mb-3">
                    <span>Target: +91 98765*****</span>
                    <span>TYPE: TELECOM_LOOKUP</span>
                  </div>
                  <pre className="text-green-400 leading-relaxed text-[13px] drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]">
{`{
  "carrier": "Reliance Jio Infocomm",
  "circle": "Mumbai, India",
  "status": "Active / Registered",
  "fraud_score": "0 (Low Risk)",
  "key_owner": "MoonWitch"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. REAL LOOKUP EXAMPLES */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <div className="mx-auto w-fit px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-mono mb-4 shadow-glass-edge">
            LIVE DEMONSTRATION
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Real Intelligence Examples</h2>
          <p className="text-gray-400">Sample sanitized payloads generated by our backend cleaner.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SampleCard icon={<User />} title="Number Lookup" subtitle="Telecom carrier & circle tracing" data={[{ label: 'Carrier', value: 'Jio Telecom' }, { label: 'Circle', value: 'Maharashtra' }, { label: 'Risk', value: 'Clean' }]} />
          <SampleCard icon={<Car />} title="Vehicle Lookup" subtitle="RC records & vehicle specs" data={[{ label: 'Reg No', value: 'MH-12-AB-****' }, { label: 'Model', value: 'Honda City 2023' }, { label: 'Status', value: 'Active' }]} />
          <SampleCard icon={<CreditCard />} title="UPI Intelligence" subtitle="Virtual Payment Address validation" data={[{ label: 'VPA', value: 'user@upi' }, { label: 'Bank', value: 'HDFC Bank Ltd' }, { label: 'Status', value: 'Valid' }]} />
          <SampleCard icon={<ShieldCheck />} title="Aadhaar Verification" subtitle="Demographic validation flags" data={[{ label: 'Status', value: 'Verified Record' }, { label: 'ID', value: '[Aadhaar Redacted]' }, { label: 'State', value: 'West Bengal' }]} />
          <SampleCard icon={<Globe />} title="Domain Lookup" subtitle="DNS & registrar intelligence" data={[{ label: 'Registrar', value: 'Namecheap Inc' }, { label: 'Creation', value: '2021-04-12' }, { label: 'Risk', value: 'Low' }]} />
          <SampleCard icon={<Shield />} title="Scam Detection" subtitle="Threat feed cross-referencing" data={[{ label: 'Database', value: 'National Scam Index' }, { label: 'Reports', value: '0 Complaints' }, { label: 'Verified', value: 'MoonWitch' }]} />
        </div>
      </section>

      {/* 4. USE CASES & BENEFITS */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BenefitBox title="Scam Identification" desc="Victims of scams can instantly identify suspicious numbers and VPAs before transferring funds." />
          <BenefitBox title="Vehicle Verification" desc="Verify ownership and registration specs before engaging in peer-to-peer vehicle purchases." />
          <BenefitBox title="Identity Validation" desc="Confirm identity parameters against public databases to prevent impersonation fraud." />
          <BenefitBox title="Cyber Awareness" desc="Research publicly exposed risk footprints to audit your own personal exposure." />
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <div className="mx-auto w-fit px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-mono mb-4 shadow-glass-edge">
            FLEXIBLE ACCESS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Transparent Pricing</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          <PricingCard title="Pay As You Go" price="₹50" period="25 Credits" desc="₹2 / credit. Never expires." features={['Benefit ex1: Full API access', 'Benefit ex2: Lifetime validity', 'Benefit ex3: JSON Export']} />
          <PricingCard title="Weekly Pro" price="₹499" period="7 Days" desc="Unlimited short investigations." popular features={['Benefit ex1: Unlimited lookups', 'Benefit ex2: Bypass credit logic', 'Benefit ex3: Premium badge']} />
          <PricingCard title="Monthly Elite" price="₹1,499" period="30 Days" desc="Enterprise access for analysts." features={['Benefit ex1: Unlimited volume', 'Benefit ex2: Advanced queues', 'Benefit ex3: Threat feeds']} />
          <PricingCard title="Lifetime Pass" price="₹9,999" period="Forever" desc="One-time payment access." features={['Benefit ex1: Permanent access', 'Benefit ex2: Zero recurring sub', 'Benefit ex3: VIP nodes']} />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SampleCard({ icon, title, subtitle, data }: { icon: React.ReactNode; title: string; subtitle: string; data: { label: string; value: string }[] }) {
  return (
    <div className="bg-[#0d070a] border border-white/5 p-6 rounded-2xl shadow-3d hover:shadow-3d-hover shadow-glass-edge transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-[40px] group-hover:bg-pink-500/10 transition-colors" />
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className="p-2.5 bg-gradient-to-br from-pink-500/20 to-transparent border border-pink-500/20 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] text-pink-400">{icon}</div>
        <div>
          <h3 className="text-base font-bold text-white">{title}</h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-2 font-mono text-xs relative z-10">
        {data.map((item, i) => (
          <div key={i} className="flex justify-between items-center bg-black/60 border border-white/5 shadow-inner px-3 py-2 rounded-lg">
            <span className="text-gray-500">{item.label}:</span>
            <span className="text-pink-300 font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BenefitBox({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-[#0d070a] border border-white/5 shadow-glass-edge shadow-3d p-6 rounded-2xl hover:border-pink-500/40 transition-colors">
      <div className="p-2 bg-gradient-to-br from-pink-500/20 to-transparent border border-pink-500/20 rounded-xl w-fit mb-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
        <Check className="w-5 h-5 text-pink-400" />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function PricingCard({ title, price, period, desc, features, popular }: { title: string; price: string; period: string; desc: string; features: string[]; popular?: boolean }) {
  return (
    <div className={`bg-[#0d070a] border transition-all duration-500 hover:-translate-y-2 min-h-[480px] flex flex-col justify-between ${popular ? 'border-pink-500 shadow-3d-hover scale-105 z-10 bg-gradient-to-b from-[#1a0b12] to-black shadow-glass-edge' : 'border-white/5 shadow-3d shadow-glass-edge'} p-8 rounded-3xl relative overflow-hidden group`}>
      {popular && <span className="absolute top-0 inset-x-0 text-center bg-gradient-to-r from-pink-600 to-rose-600 text-white text-[10px] py-1 uppercase tracking-widest font-bold shadow-[0_5px_10px_rgba(236,72,153,0.3)]">Most Popular</span>}
      <div className={`flex-1 ${popular ? 'pt-4' : ''}`}>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-xs text-gray-400 mb-6">{desc}</p>
        <div className="text-4xl font-extrabold mb-1 drop-shadow-md">{price} <span className="text-sm font-normal text-gray-500">/ {period}</span></div>
        <div className="space-y-3 mt-8 pt-6 border-t border-white/5 relative z-10">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
              <Check className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
      <Link to="/login" className={`mt-8 w-full py-3 rounded-full font-medium text-xs text-center transition-all duration-300 relative z-10 ${popular ? 'bg-gradient-to-b from-pink-500 to-pink-700 hover:from-pink-400 hover:to-pink-600 text-white shadow-[0_10px_20px_rgba(236,72,153,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)]' : 'bg-white/5 border border-white/10 hover:border-pink-500/50 hover:bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'}`}>
        Choose Plan
      </Link>
    </div>
  );
}
