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

            <div className="space-y-10 text-gray-400 font-light leading-relaxed">
              
              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">1. Acceptance</h2>
                <p>By accessing or using MoonWitch, you agree to these Terms of Service. If you do not agree, you must not use the platform.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">2. Description of Service</h2>
                <p>MoonWitch provides an intelligence platform designed to organize information from publicly available sources and third-party services. Availability of specific lookup modules may change without notice.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">3. Lawful Use</h2>
                <p>You agree to use MoonWitch only for lawful purposes. You must not use the platform to:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                  <li>Harass or stalk individuals</li>
                  <li>Commit fraud</li>
                  <li>Engage in identity theft</li>
                  <li>Perform unauthorized access</li>
                  <li>Violate privacy laws</li>
                  <li>Circumvent applicable laws or regulations</li>
                  <li>Conduct illegal surveillance</li>
                  <li>Engage in any criminal activity</li>
                </ul>
                <p className="mt-4">You are solely responsible for how you use any information obtained through the platform.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">4. User Responsibility</h2>
                <p>Users are responsible for:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                  <li>Ensuring their use complies with all applicable laws.</li>
                  <li>Independently verifying any information before relying on it.</li>
                  <li>Maintaining the security of their accounts.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">5. Information Accuracy</h2>
                <p>Information provided through MoonWitch may originate from public records, third-party services, or publicly accessible sources. We make no warranty that any information is:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                  <li>Accurate</li>
                  <li>Complete</li>
                  <li>Current</li>
                  <li>Error-free</li>
                </ul>
                <p className="mt-4">Users must independently verify all information before taking action.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">6. No Legal Advice</h2>
                <p>MoonWitch does not provide:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                  <li>Legal advice</li>
                  <li>Financial advice</li>
                  <li>Government records certification</li>
                  <li>Identity verification guarantees</li>
                </ul>
                <p className="mt-4">The platform is provided for informational and research purposes.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">7. Payments</h2>
                <p>All purchases are generally non-refundable except where required by applicable consumer protection laws. Credits and subscriptions may only be used within the MoonWitch platform.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">8. Service Availability</h2>
                <p>We may:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                  <li>Modify features</li>
                  <li>Remove modules</li>
                  <li>Suspend accounts</li>
                  <li>Perform maintenance</li>
                </ul>
                <p className="mt-4">without prior notice.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">9. Intellectual Property</h2>
                <p>All website content, branding, software, source code, graphics, and designs remain the property of MoonWitch unless otherwise stated.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">10. Limitation of Liability</h2>
                <p>To the maximum extent permitted by law, MoonWitch shall not be liable for:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                  <li>Data inaccuracies</li>
                  <li>Third-party content</li>
                  <li>Business losses</li>
                  <li>Lost profits</li>
                  <li>Indirect damages</li>
                  <li>Consequential damages</li>
                  <li>Decisions made based on lookup results</li>
                </ul>
                <p className="mt-4">Use of the platform is entirely at your own risk.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">11. Indemnification</h2>
                <p>You agree to indemnify and hold MoonWitch harmless from claims, liabilities, damages, and expenses arising from your use of the platform or your violation of these Terms.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">12. Account Suspension</h2>
                <p>We reserve the right to suspend or terminate any account that:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                  <li>Violates these Terms</li>
                  <li>Abuses the platform</li>
                  <li>Attempts to bypass limitations</li>
                  <li>Engages in unlawful activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">13. Changes</h2>
                <p>These Terms may be updated periodically. Continued use of MoonWitch constitutes acceptance of the revised Terms.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">14. Contact</h2>
                <p>Questions regarding these Terms or the Privacy Policy may be directed via Telegram:<br/>
                <a href="https://t.me/moonwitchadminbot" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 underline underline-offset-4 mt-2 inline-block">@moonwitchadminbot</a></p>
              </section>

              <div className="h-px bg-white/10 w-full my-8"></div>

              <section className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl shadow-inner">
                <h2 className="text-xl font-bold text-white mb-3 tracking-wide flex items-center gap-2">Disclaimer</h2>
                <p className="text-sm text-gray-400">MoonWitch is an OSINT (Open-Source Intelligence) platform. The service is intended to assist users in organizing and analyzing information from publicly available or authorized third-party sources. Users are solely responsible for ensuring that their use of the platform complies with all applicable laws, regulations, and third-party terms. MoonWitch does not endorse or facilitate unlawful surveillance, harassment, identity theft, or unauthorized access to information.</p>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
