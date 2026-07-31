import React from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Database, Zap, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark text-white selection:bg-accent selection:text-white">
      <Navbar />
      
      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono mb-8">
            <Lock className="w-3.5 h-3.5" />
            <span>ENTERPRISE GRADE OSINT PLATFORM</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Beyond Search</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Recover information from publicly available intelligence databases instantly. Verify identities, detect scams, and evaluate risk footprints.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 bg-accent hover:bg-blue-600 text-white rounded-lg font-medium transition-all shadow-lg flex items-center justify-center space-x-2">
              <span>Start Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#pricing" className="px-8 py-4 bg-surface border border-border hover:bg-white/5 rounded-lg font-medium transition-all">
              View Pricing
            </a>
          </div>
        </motion.div>
      </section>

      {/* Examples Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Intelligence Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SampleCard icon={<Search className="text-blue-400" />} title="Number Lookup" detail="Operator, Location, Fraud History" />
          <SampleCard icon={<Database className="text-purple-400" />} title="Vehicle Lookup" detail="Owner Info, Model, Registration" />
          <SampleCard icon={<Zap className="text-yellow-400" />} title="UPI Intelligence" detail="VPA Validation, Bank Linkage" />
          <SampleCard icon={<Shield className="text-green-400" />} title="Aadhaar Records" detail="Status, Demographic Metadata" />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto border-t border-border">
        <h2 className="text-3xl font-bold text-center mb-16">Subscription Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <PricingCard title="Pay As You Go" price="₹50" desc="25 Credits included" features={["₹2 / credit", "Full API Access", "No Expiry"]} />
          <PricingCard title="Weekly Pro" price="₹499" desc="7 Days Access" features={["Unlimited Lookups", "Priority Queue", "Audit Logs"]} badge="Popular" />
          <PricingCard title="Monthly Elite" price="₹1,499" desc="30 Days Access" features={["Unlimited Lookups", "Dedicated Support", "Export JSON"]} />
          <PricingCard title="Lifetime" price="₹9,999" desc="One-time payment" features={["Permanent Access", "All Future Updates", "VIP Server"]} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

const SampleCard = ({ icon, title, detail }: { icon: React.ReactNode, title: string, detail: string }) => (
  <div className="bg-glass-gradient border border-border p-6 rounded-xl">
    <div className="mb-4">{icon}</div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-xs text-gray-400">{detail}</p>
  </div>
);

const PricingCard = ({ title, price, desc, features, badge }: any) => (
  <div className="bg-glass-gradient border border-border p-6 rounded-xl relative flex flex-col justify-between">
    {badge && <span className="absolute top-4 right-4 bg-accent/20 border border-accent/40 text-accent text-[10px] px-2 py-0.5 rounded uppercase font-bold">{badge}</span>}
    <div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <div className="text-2xl font-bold mb-1">{price}</div>
      <div className="text-xs text-gray-500 mb-6">{desc}</div>
      <ul className="space-y-2 mb-8 text-xs text-gray-400">
        {features.map((f: string, i: number) => <li key={i}>• {f}</li>)}
      </ul>
    </div>
    <Link to="/login" className="w-full text-center bg-surface hover:bg-white/10 border border-border py-2.5 rounded-lg text-xs font-semibold transition-all">
      Select Plan
    </Link>
  </div>
);
