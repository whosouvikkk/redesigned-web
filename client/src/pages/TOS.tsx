import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function TOS() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200 selection:bg-pink-500/30 selection:text-white relative flex flex-col font-sans">
      
      {/* --- BACKGROUND LIGHTING --- */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-pink-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none fixed" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-rose-600 rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none fixed" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none fixed" />

      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6 max-w-5xl mx-auto w-full relative z-10">
        <div className="bg-black/40 backdrop-blur-2xl border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.5)] p-8 md:p-12 rounded-[2rem] relative overflow-hidden">
          
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none" />

          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Terms of Service</h1>
            <p className="text-pink-400 font-medium mb-12">Last Updated: August 2026</p>

            <div className="space-y-8 text-gray-400 font-light leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 tracking-wide">1. Acceptance of Terms</h2>
                <p>By accessing and using the MoonWitch OSINT Engine platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using the platform.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 tracking-wide">2. Permitted Use & Compliance</h2>
                <p>MoonWitch OSINT is designed exclusively for authorized intelligence gathering, security research, and personal audit purposes. Users must comply with all local, state, and international laws regarding data privacy and information gathering.</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                  <li>You must not use the platform for targeted harassment, stalking, or malicious activities.</li>
                  <li>You are solely responsible for the queries executed under your Agent ID.</li>
                  <li>Any violation of these terms will result in immediate termination of your access without refund.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 tracking-wide">3. Credits and Subscriptions</h2>
                <p>Purchases of credits or subscription tiers are final. Credits do not expire unless otherwise explicitly stated in the plan's details. Subscriptions grant access for the stipulated time frame and are evaluated based on server time.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 tracking-wide">4. Limitation of Liability</h2>
                <p>The intelligence payloads returned by MoonWitch OSINT are aggregated from publicly available databases and external nodes. We do not guarantee the 100% accuracy, completeness, or timeliness of the data. Use the provided information at your own risk.</p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
