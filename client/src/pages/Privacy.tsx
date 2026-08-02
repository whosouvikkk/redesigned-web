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
            <p className="text-pink-400 font-medium mb-8">Last Updated: August 2026</p>

            <p className="text-gray-400 font-light leading-relaxed mb-10">
              Welcome to MoonWitch ("we"). This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
            </p>

            <div className="space-y-10 text-gray-400 font-light leading-relaxed">
              
              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">1. Information We Collect</h2>
                <p>We may collect:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                  <li>Username</li>
                  <li>Email address (if provided)</li>
                  <li>IP address</li>
                  <li>Browser and device information</li>
                  <li>Lookup requests submitted through our platform</li>
                  <li>Payment information submitted by the user (such as transaction references)</li>
                  <li>Website analytics and usage information</li>
                </ul>
                <p className="mt-4">We do not intentionally collect sensitive personal information unless it is voluntarily provided by you or required to operate the service.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">2. How We Use Your Information</h2>
                <p>We use information to:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                  <li>Provide our services</li>
                  <li>Verify user accounts</li>
                  <li>Process subscriptions and credits</li>
                  <li>Improve platform performance</li>
                  <li>Detect abuse or fraudulent activity</li>
                  <li>Respond to support requests</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">3. Public Data Sources</h2>
                <p>MoonWitch provides tools that search, organize, or display information that may be available from publicly accessible sources or third-party providers. We do not claim ownership of publicly available information and do not guarantee its accuracy, completeness, or timeliness.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">4. Payments</h2>
                <p>Payments are processed manually. Transaction references may be stored solely for verification and fraud prevention.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">5. Data Security</h2>
                <p>We implement reasonable technical and organizational measures to protect user information. However, no online service can guarantee absolute security.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">6. Third-Party Services</h2>
                <p>We may use third-party providers including:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                  <li>Hosting providers</li>
                  <li>Analytics providers</li>
                  <li>Authentication services</li>
                  <li>Payment services</li>
                  <li>External OSINT APIs</li>
                </ul>
                <p className="mt-4">These services have their own privacy policies.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">7. User Rights</h2>
                <p>Depending on your jurisdiction, you may have rights to:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                  <li>Access your personal information</li>
                  <li>Request correction</li>
                  <li>Request deletion</li>
                  <li>Object to processing</li>
                  <li>Request data portability</li>
                </ul>
                <p className="mt-4">Please contact us for requests regarding your data.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">8. Cookies</h2>
                <p>We may use cookies and similar technologies to improve functionality and user experience.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">9. Children's Privacy</h2>
                <p>MoonWitch is not intended for users under the age required by applicable law.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3 tracking-wide">10. Changes</h2>
                <p>We may update this Privacy Policy at any time. Continued use of the platform constitutes acceptance of any changes.</p>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
