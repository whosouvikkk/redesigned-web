import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Privacy() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200 selection:bg-pink-500/30 selection:text-white relative flex flex-col font-sans">
      
      {/* --- BACKGROUND LIGHTING --- */}
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[160px] opacity-10 pointer-events-none fixed" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none fixed" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none fixed" />

      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6 max-w-5xl mx-auto w-full relative z-10">
        <div className="bg-black/40 backdrop-blur-2xl border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.5)] p-8 md:p-12 rounded-[2rem] relative overflow-hidden">
          
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none" />

          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-pink-400 font-medium mb-12">Last Updated: August 2026</p>

            <div className="space-y-8 text-gray-400 font-light leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 tracking-wide">1. Data Collection</h2>
                <p>We respect your privacy as an investigator. MoonWitch OSINT Engine minimizes the data we collect about you. We only store:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                  <li>Your securely hashed Agent authorization credentials (Username/Password).</li>
                  <li>A ledger of your search history (to deduct credits and maintain rate limits).</li>
                  <li>Billing transaction IDs for manual verification purposes.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 tracking-wide">2. Log Retention</h2>
                <p>Search queries are logged strictly for accounting purposes against your credit balance. We do not sell your search history to third-party data brokers. All payloads are sanitized by our backend before being rendered on your dashboard.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 tracking-wide">3. Data Removal Requests</h2>
                <p>If you find your personal information exposed within our search parameters, you have the right to request a redaction. You may submit a removal request via the "Data Removal" tool in the dashboard. Our administrators review these requests within 48-72 hours.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 tracking-wide">4. Security Measures</h2>
                <p>Your connection to the MoonWitch network is secured via end-to-end encryption. All internal database structures utilize modern hashing algorithms for credential protection. However, no internet transmission is 100% secure, and we advise practicing standard OPSEC while utilizing the platform.</p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
