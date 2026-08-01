import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Zap, ArrowRight, Check, Activity, 
  Globe, User, Car, CreditCard, ShieldCheck, 
  LayoutDashboard 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#030102] text-gray-200 selection:bg-pink-500/30 selection:text-white relative overflow-hidden font-sans">
      
      {/* --- BACKGROUND SHINE & ORB LIGHTING --- */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ec489908_1px,transparent_1px),linear-gradient(to_bottom,#ec489908_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Right Pink Glow */}
      <motion.div 
        animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] right-[-5%] w-[600px] h-[600px] bg-pink-600 rounded-full mix-blend-screen filter blur-[140px] opacity-70 pointer-events-none"
      />

      {/* Bottom Left Rose Glow */}
      <motion.div 
        animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[60%] left-[-15%] w-[700px] h-[700px] bg-rose-600 rounded-full mix-blend-screen filter blur-[150px] opacity-60 pointer-events-none"
      />
      
      {/* Center Fuchsia Core */}
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] left-[20%] w-[500px] h-[500px] bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[160px] opacity-30 pointer-events-none" 
      />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay z-0" />

      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-24 px-6 max-w-7xl mx-auto text-center flex flex-col items-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className="w-full"
        >
          
          <div className="mx-auto w-fit px-5 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-xl text-gray-300 text-xs font-semibold tracking-wide mb-8 flex items-center gap-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
            </span>
            MoonWitch OSINT Engine v4.2
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 max-w-5xl mx-auto leading-[1.05] text-white drop-shadow-2xl">
            Intelligence <br />
            <TypewriterEffect words={['Beyond Search.', 'In Real-Time.', 'Without Limits.', 'At Scale.']} />
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            An enterprise-grade intelligence platform. Recover information from public databases instantly, verify identities, and evaluate risk footprints securely.
          </p>
          
          {/* CTA Group with Dashboard in Middle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
            <Link to="/login" className="px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-full font-bold inline-flex items-center gap-2 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:scale-105">
              Start Analysis <ArrowRight className="w-5 h-5" />
            </Link>

            <Link to="/dashboard" className="px-8 py-4 bg-pink-600/20 border border-pink-500/40 hover:bg-pink-600/30 text-pink-300 rounded-full font-bold inline-flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(236,72,153,0.2)] hover:scale-105 backdrop-blur-md">
              <LayoutDashboard className="w-5 h-5 text-pink-400" /> Dashboard
            </Link>

            <a href="#pricing" className="px-8 py-4 bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/[0.08] rounded-full font-semibold transition-all text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              View Pricing
            </a>
          </div>

        </motion.div>
      </section>

      {/* 2. REAL LOOKUP EXAMPLES (WITH SCROLL ANIMATION) */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:flex justify-between items-end"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">Live Intelligence Vectors</h2>
            <p className="text-gray-400 font-light text-lg">Sample sanitized payloads generated by our backend cleaner. Instant resolution across multiple data nodes.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SampleCard index={0} icon={<User />} title="Number Lookup" subtitle="Telecom carrier & circle tracing" data={[{ label: 'Carrier', value: 'Jio Telecom' }, { label: 'Circle', value: 'Maharashtra' }, { label: 'Risk', value: 'Clean' }]} />
          <SampleCard index={1} icon={<Car />} title="Vehicle Lookup" subtitle="RC records & vehicle specs" data={[{ label: 'Reg No', value: 'MH-12-AB-****' }, { label: 'Model', value: 'Honda City 2023' }, { label: 'Status', value: 'Active' }]} />
          <SampleCard index={2} icon={<CreditCard />} title="UPI Intelligence" subtitle="Virtual Payment Address validation" data={[{ label: 'VPA', value: 'user@upi' }, { label: 'Bank', value: 'HDFC Bank Ltd' }, { label: 'Status', value: 'Valid' }]} />
          <SampleCard index={3} icon={<ShieldCheck />} title="Aadhaar Verification" subtitle="Demographic validation flags" data={[{ label: 'Status', value: 'Verified Record' }, { label: 'ID', value: '[Redacted]' }, { label: 'State', value: 'West Bengal' }]} />
          <SampleCard index={4} icon={<Globe />} title="Domain Lookup" subtitle="DNS & registrar intelligence" data={[{ label: 'Registrar', value: 'Namecheap Inc' }, { label: 'Creation', value: '2021-04-12' }, { label: 'Risk', value: 'Low' }]} />
          <SampleCard index={5} icon={<Shield />} title="Scam Detection" subtitle="Threat feed cross-referencing" data={[{ label: 'Database', value: 'National Scam Index' }, { label: 'Reports', value: '0 Complaints' }, { label: 'Verified', value: 'MoonWitch' }]} />
        </div>
      </section>

      {/* 3. CAPABILITIES / BENEFITS SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">Enterprise Capabilities</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">Designed for threat analysts, independent researchers, and security teams.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BenefitBox index={0} title="Scam Identification" desc="Identify suspicious numbers and VPAs before transferring funds." />
          <BenefitBox index={1} title="Vehicle Verification" desc="Verify ownership and registration specs for peer-to-peer purchases." />
          <BenefitBox index={2} title="Identity Validation" desc="Confirm identity parameters against databases to prevent fraud." />
          <BenefitBox index={3} title="Cyber Awareness" desc="Research publicly exposed risk footprints to audit personal exposure." />
        </div>
      </section>

      {/* 4. RESTORED 4-TIER PRICING SECTION */}
      <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tighter">Transparent Pricing</h2>
          <p className="text-gray-400 text-lg font-light">Scale your operations with flexible access tiers.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          <PricingCard 
            index={0}
            title="Pay As You Go" 
            price="₹50" 
            period="25 Credits" 
            desc="Minimum buy 20 credits." 
            features={['Full API access', 'Lifetime credit validity', 'JSON Export capabilities']} 
          />
          <PricingCard 
            index={1}
            title="Weekly Pro" 
            price="₹499" 
            period="7 Days" 
            desc="Unlimited short investigations." 
            popular 
            features={['Unlimited lookups', 'Bypass credit logic', 'Priority premium badge']} 
          />
          <PricingCard 
            index={2}
            title="Monthly Elite" 
            price="₹1,499" 
            period="30 Days" 
            desc="Enterprise access for analysts." 
            features={['Unlimited query volume', 'Advanced server queues', 'Live threat data feeds']} 
          />
          <PricingCard 
            index={3}
            title="Lifetime Pass" 
            price="₹9,999" 
            period="Forever" 
            desc="Permanent platform access." 
            features={['Permanent access', 'Zero recurring sub', 'VIP priority nodes']} 
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- REUSABLE COMPONENTS WITH ANIMATIONS ---

function TypewriterEffect({ words }: { words: string[] }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const typeSpeed = isDeleting ? 30 : 90;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === word) {
        setTimeout(() => setIsDeleting(true), 3000); 
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setCurrentText(word.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className="inline-block relative">
      <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
        {currentText}
      </span>
      <span className="text-pink-500 animate-[pulse_1s_ease-in-out_infinite] ml-2 font-light">|</span>
    </span>
  );
}

function SampleCard({ icon, title, subtitle, data, index }: { icon: React.ReactNode; title: string; subtitle: string; data: { label: string; value: string }[]; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/[0.02] backdrop-blur-[40px] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.5)] p-6 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-500 group relative"
    >
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="p-3 bg-white/[0.05] rounded-2xl text-gray-300 group-hover:text-pink-400 group-hover:bg-pink-500/10 transition-colors shadow-inner">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-bold text-white tracking-wide">{title}</h3>
          <p className="text-xs text-gray-400 font-light">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-1 font-mono text-xs relative z-10">
        {data.map((item, i) => (
          <div key={i} className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0">
            <span className="text-gray-500">{item.label}</span>
            <span className="text-gray-200 font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function BenefitBox({ title, desc, index }: { title: string; desc: string; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/[0.02] backdrop-blur-[40px] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-6 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-300 group"
    >
      <div className="mb-4 p-2.5 bg-white/5 w-fit rounded-xl text-gray-400 group-hover:text-pink-400 transition-colors">
        <Check className="w-5 h-5" />
      </div>
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed font-light">{desc}</p>
    </motion.div>
  );
}

function PricingCard({ title, price, period, desc, features, popular, index }: { title: string; price: string; period: string; desc: string; features: string[]; popular?: boolean; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`bg-white/[0.02] backdrop-blur-[40px] transition-all duration-500 min-h-[480px] flex flex-col justify-between p-8 rounded-[2rem] relative group ${popular ? 'border border-pink-500/50 shadow-[0_0_50px_rgba(236,72,153,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] z-10 scale-105' : 'border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.4)] hover:bg-white/[0.04]'}`}
    >
      {popular && (
        <span className="absolute top-4 right-6 bg-pink-500/20 text-pink-400 text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold border border-pink-500/30">
          Popular
        </span>
      )}

      <div className="flex-1">
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

      <Link to="/login" className={`mt-8 w-full py-3.5 rounded-full font-semibold text-xs text-center transition-all duration-300 ${popular ? 'bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/10 text-white hover:bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'}`}>
        Choose Plan
      </Link>
    </motion.div>
  );
}
