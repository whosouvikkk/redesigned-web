import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Shield, Database, Zap, ArrowRight, Check, Activity, 
  Lock, Fingerprint, Globe, User, Car, CreditCard, ShieldCheck, 
  HelpCircle, Copy, Terminal 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-dark text-white selection:bg-pink-500 selection:text-white relative overflow-hidden font-sans">
      
      {/* Pink Ambient Glow Highlights */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-pink-600/25 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-pink-600/25 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-pink-500/15 blur-[160px] rounded-full pointer-events-none" />

      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-12 px-6 max-w-7xl mx-auto text-center flex flex-col items-center z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full">
          
          <div className="mx-auto w-fit px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-mono tracking-wide mb-8 shadow-[0_0_15px_rgba(236,72,153,0.15)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            ENTERPRISE OSINT v4.2 INTELLIGENCE ENGINE
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Intelligence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600">Beyond Search</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Recover information from publicly available intelligence databases instantly. Verify identities, detect scams, and evaluate risk footprints securely.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="px-8 py-4 bg-pink-600 hover:bg-pink-500 rounded-full font-medium inline-flex items-center gap-2 transition-all shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] hover:scale-105">
              Start Analysis <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#pricing" className="px-8 py-4 bg-surface border border-border hover:border-pink-500/50 rounded-full font-medium transition-all hover:bg-white/5">
              View Pricing
            </a>
          </div>

        </motion.div>
      </section>

      {/* 2. ANIMATED DASHBOARD PREVIEW MOCKUP */}
      <section className="relative px-6 max-w-6xl mx-auto z-10 mb-28">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-2xl border border-pink-500/20 bg-[#0a0508]/90 backdrop-blur-xl p-2 shadow-[0_0_60px_rgba(236,72,153,0.25)] hover:shadow-3d-hover transition-all duration-500"
        >
          <div className="rounded-xl border border-white/5 bg-black/70 overflow-hidden flex flex-col h-[400px] md:h-[550px]">
            {/* Header */}
            <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="px-4 py-1 bg-black/60 border border-white/10 rounded-full text-xs text-gray-400 font-mono flex items-center gap-2">
                <Lock className="w-3 h-3 text-pink-400" /> secure.moonwitch.osint/terminal
              </div>
              <div className="text-xs font-mono text-pink-400">STATUS: ACTIVE</div>
            </div>
            
            {/* Body Preview */}
            <div className="flex-1 flex p-4 gap-4">
              {/* Sidebar Preview */}
              <div className="w-52 hidden md:flex flex-col justify-between border-r border-white/5 pr-4">
                <div className="space-y-3">
                  <div className="h-8 bg-pink-500/20 border border-pink-500/30 rounded-lg w-full flex items-center px-3 text-xs text-pink-300 font-mono">
                    <Terminal className="w-3.5 h-3.5 mr-2" /> Live Lookup
                  </div>
                  <div className="h-8 bg-white/[0.02] rounded-lg w-full" />
                  <div className="h-8 bg-white/[0.02] rounded-lg w-full" />
                  <div className="h-8 bg-white/[0.02] rounded-lg w-full" />
                </div>
                <div className="bg-pink-500/10 border border-pink-500/20 p-3 rounded-xl text-xs font-mono">
                  <div className="text-gray-400">Credits Left</div>
                  <div className="text-pink-400 font-bold text-lg">250 / 250</div>
                </div>
              </div>

              {/* Main Workspace Preview */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-24">
                  <div className="bg-white/[0.02] rounded-xl border border-white/5 p-4 flex flex-col justify-center relative overflow-hidden">
                    <div className="text-xs text-gray-400 mb-1">Active Queries</div>
                    <div className="text-2xl font-bold text-white font-mono">14,258</div>
                    <Activity className="absolute right-3 bottom-3 w-8 h-8 text-pink-500/20" />
                  </div>
                  <div className="bg-white/[0.02] rounded-xl border border-white/5 p-4 flex flex-col justify-center relative overflow-hidden">
                    <div className="text-xs text-gray-400 mb-1">Success Rate</div>
                    <div className="text-2xl font-bold text-pink-400 font-mono">99.9%</div>
                    <Shield className="absolute right-3 bottom-3 w-8 h-8 text-pink-500/20" />
                  </div>
                  <div className="hidden md:flex bg-white/[0.02] rounded-xl border border-white/5 p-4 flex-col justify-center relative overflow-hidden">
                    <div className="text-xs text-gray-400 mb-1">Response Time</div>
                    <div className="text-2xl font-bold text-green-400 font-mono">240ms</div>
                    <Zap className="absolute right-3 bottom-3 w-8 h-8 text-green-500/20" />
                  </div>
                </div>

                {/* Live Output Window */}
                <div className="flex-1 bg-black/80 rounded-xl border border-white/10 p-4 font-mono text-xs text-pink-300 overflow-hidden relative">
                  <div className="flex justify-between items-center text-gray-500 border-b border-white/10 pb-2 mb-3">
                    <span>Target: +91 98765*****</span>
                    <span>TYPE: TELECOM_LOOKUP</span>
                  </div>
                  <pre className="text-green-400">
{`{
  "carrier": "Reliance Jio Infocomm",
  "circle": "Mumbai, India",
  "status": "Active / Registered",
  "fraud_score": "0 (Low Risk)",
  "key_owner": "MoonWitch"
}`}
                  </pre>
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. REAL LOOKUP EXAMPLES WITH SAMPLE CARDS */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <div className="mx-auto w-fit px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-mono mb-4">
            LIVE DEMONSTRATION
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Real Intelligence Examples</h2>
          <p className="text-gray-400">Sample sanitized payloads generated by our backend cleaner.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <SampleCard 
            icon={<User className="text-pink-400" />}
            title="Number Lookup"
            subtitle="Telecom carrier & circle tracing"
            data={[
              { label: 'Carrier', value: 'Jio Telecom' },
              { label: 'Circle', value: 'Maharashtra' },
              { label: 'Risk Score', value: 'Clean' },
              { label: 'Owner Flag', value: 'MoonWitch' }
            ]}
          />

          <SampleCard 
            icon={<Car className="text-pink-400" />}
            title="Vehicle Lookup"
            subtitle="RC records & vehicle specs"
            data={[
              { label: 'Reg No', value: 'MH-12-AB-****' },
              { label: 'Model', value: 'Honda City 2023' },
              { label: 'Fuel Type', value: 'Petrol / BS6' },
              { label: 'Registration', value: 'Active' }
            ]}
          />

          <SampleCard 
            icon={<CreditCard className="text-pink-400" />}
            title="UPI Intelligence"
            subtitle="Virtual Payment Address validation"
            data={[
              { label: 'VPA', value: 'user@upi' },
              { label: 'Bank', value: 'HDFC Bank Ltd' },
              { label: 'VPA Status', value: 'Valid / Active' },
              { label: 'Owner Flag', value: 'MoonWitch' }
            ]}
          />

          <SampleCard 
            icon={<ShieldCheck className="text-pink-400" />}
            title="Aadhaar Verification"
            subtitle="Demographic validation flags"
            data={[
              { label: 'Status', value: 'Verified Record' },
              { label: 'Identifier', value: '[Aadhaar Redacted]' },
              { label: 'Age Group', value: '20 - 30 Years' },
              { label: 'State', value: 'West Bengal' }
            ]}
          />

          <SampleCard 
            icon={<Globe className="text-pink-400" />}
            title="Domain Lookup"
            subtitle="DNS & registrar intelligence"
            data={[
              { label: 'Registrar', value: 'Namecheap Inc' },
              { label: 'Creation', value: '2021-04-12' },
              { label: 'SSL Status', value: 'Active Valid' },
              { label: 'Risk Rating', value: 'Low' }
            ]}
          />

          <SampleCard 
            icon={<Shield className="text-pink-400" />}
            title="Scam Detection"
            subtitle="Threat feed cross-referencing"
            data={[
              { label: 'Database', value: 'National Scam Index' },
              { label: 'Reports', value: '0 Complaints' },
              { label: 'Threat Level', value: 'Safe' },
              { label: 'Verified', value: 'MoonWitch Engine' }
            ]}
          />

        </div>
      </section>

      {/* 4. USE CASES & BENEFITS */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <div className="mx-auto w-fit px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-medium tracking-wide mb-4">
            Platform Capabilities
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Security Teams Trust Us</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Designed for victims of fraud, independent researchers, and threat analysts.</p>
        </div>

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
          <div className="mx-auto w-fit px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-mono mb-4">
            FLEXIBLE ACCESS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-gray-400">Pay as you go with credits or unlock unlimited subscription tiers.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          <PricingCard 
            title="Pay As You Go" 
            price="₹50" 
            period="25 Credits" 
            desc="₹2 / credit. Never expires." 
            features={[
              'Benefit ex1: Full API access',
              'Benefit ex2: Lifetime credit validity',
              'Benefit ex3: Standard support queue',
              'Benefit ex4: Export to JSON format',
              'Benefit ex5: Public record scanning'
            ]} 
          />

          <PricingCard 
            title="Weekly Pro" 
            price="₹499" 
            period="7 Days" 
            desc="Unlimited lookups for short investigations." 
            popular 
            features={[
              'Benefit ex1: Unlimited lookups',
              'Benefit ex2: Bypasses credit logic',
              'Benefit ex3: Priority processing',
              'Benefit ex4: Premium UI profile badge',
              'Benefit ex5: 24/7 dedicated support'
            ]} 
          />

          <PricingCard 
            title="Monthly Elite" 
            price="₹1,499" 
            period="30 Days" 
            desc="Enterprise access for professional analysts." 
            features={[
              'Benefit ex1: Unlimited query volume',
              'Benefit ex2: Advanced server queues',
              'Benefit ex3: Threat intelligence feeds',
              'Benefit ex4: Custom data webhooks',
              'Benefit ex5: Dedicated account manager'
            ]} 
          />

          <PricingCard 
            title="Lifetime Pass" 
            price="₹9,999" 
            period="Forever" 
            desc="One-time payment for permanent access." 
            features={[
              'Benefit ex1: Permanent unlimited access',
              'Benefit ex2: Zero recurring subscription',
              'Benefit ex3: VIP priority server nodes',
              'Benefit ex4: Early access to new modules',
              'Benefit ex5: Direct admin support contact'
            ]} 
          />

        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-24 px-6 max-w-4xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Everything you need to know about our OSINT lookup service.</p>
        </div>

        <div className="space-y-4">
          <FaqItem question="How do credits work?" answer="Each successful lookup consumes exactly 1 credit. If you purchase an active subscription (Weekly, Monthly, or Lifetime), credit deductions are paused and you get unlimited searches." />
          <FaqItem question="Where does the lookup data come from?" answer="Our system aggregates data strictly from publicly available intelligence endpoints, government records, and open registries." />
          <FaqItem question="Can I request my data to be removed?" answer="Yes. We offer a dedicated Protected Data Removal Service (₹199) where users can request suppression of their information from public databases." />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SampleCard({ icon, title, subtitle, data }: { icon: React.ReactNode; title: string; subtitle: string; data: { label: string; value: string }[] }) {
  return (
    <div className="bg-[#0d070a] border border-border p-6 rounded-2xl shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 bg-pink-500/10 border border-pink-500/20 rounded-xl">{icon}</div>
        <div>
          <h3 className="text-base font-bold text-white">{title}</h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-2 font-mono text-xs">
        {data.map((item, i) => (
          <div key={i} className="flex justify-between items-center bg-black/50 border border-white/5 px-3 py-2 rounded-lg">
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
    <div className="bg-[#0d070a] border border-border p-6 rounded-2xl hover:border-pink-500/40 transition-colors shadow-3d">
      <div className="p-2 bg-pink-500/10 border border-pink-500/20 rounded-xl w-fit mb-4">
        <Check className="w-5 h-5 text-pink-400" />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function PricingCard({ title, price, period, desc, features, popular }: { title: string; price: string; period: string; desc: string; features: string[]; popular?: boolean }) {
  return (
    <div className={`bg-[#0d070a] border transition-all duration-500 hover:-translate-y-2 min-h-[520px] flex flex-col justify-between ${popular ? 'border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.2)] scale-105 z-10 bg-black/60' : 'border-border shadow-md'} p-8 rounded-3xl relative overflow-hidden group`}>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      {popular && <span className="absolute top-0 inset-x-0 text-center bg-pink-600 text-white text-[10px] py-1 uppercase tracking-widest font-bold shadow-[0_0_10px_rgba(236,72,153,0.5)]">Most Popular</span>}
      <div className={`flex-1 ${popular ? 'pt-4' : ''}`}>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-xs text-gray-400 mb-6">{desc}</p>
        <div className="text-4xl font-extrabold mb-1">{price} <span className="text-sm font-normal text-gray-500">/ {period}</span></div>
        <div className="space-y-3 mt-8 pt-6 border-t border-white/5 relative z-10">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
              <Check className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
      <Link to="/login" className={`mt-8 w-full py-3 rounded-full font-medium text-xs text-center transition-all duration-300 relative z-10 ${popular ? 'bg-pink-600 hover:bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]' : 'bg-surface border border-border hover:border-pink-500/50 hover:bg-white/5'}`}>
        Choose Plan
      </Link>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-[#0d070a] border border-border p-6 rounded-2xl shadow-3d">
      <h3 className="text-base font-bold mb-2 flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-pink-400 shrink-0" />
        {question}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed pl-6">{answer}</p>
    </div>
  );
}
