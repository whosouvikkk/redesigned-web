import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MessageSquare, AlertCircle, Send, CheckCircle2, FileText, Smartphone, Info } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import api from '../services/api';

export default function ProtectedData() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    telegram: '',
    dataToProtect: '',
    details: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Sends the fields to your backend (which forwards to Discord)
      await api.post('/osint/protect-request', formData);
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.response?.data?.error || 'Failed to submit request. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 selection:bg-pink-500/30 selection:text-white relative flex flex-col font-sans">
      
      {/* --- BACKGROUND LIGHTING --- */}
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-rose-600 rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none fixed" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-pink-600 rounded-full mix-blend-screen filter blur-[150px] opacity-15 pointer-events-none fixed" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none fixed" />

      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6 max-w-3xl mx-auto w-full relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/40 backdrop-blur-2xl border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.5)] p-8 md:p-12 rounded-[2rem] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none" />

          <div className="relative z-10">
            
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-white/[0.05] border border-white/10 rounded-2xl shadow-inner flex items-center justify-center">
                <img 
                  src="/witch.png" 
                  alt="MoonWitch" 
                  className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" 
                />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-3 tracking-tight">Manual Data Removal</h1>
            <p className="text-gray-400 font-light text-center mb-8 max-w-lg mx-auto">
              Submit a request to have your personal identifiers manually redacted from the MoonWitch intelligence nodes.
            </p>

            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/20 p-8 rounded-2xl text-center shadow-inner"
              >
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Request Logged Securely</h3>
                <div className="text-sm text-gray-300 font-light space-y-4 max-w-md mx-auto text-left bg-black/40 p-6 rounded-xl border border-white/5 mt-6">
                  <p className="font-semibold text-white">Next Steps:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Our admin team has received your request.</li>
                    <li>We will contact you via your provided Telegram ID or Email to process the <strong className="text-pink-400">199 INR</strong> removal fee.</li>
                    <li>Once payment is verified, your data will be <strong className="text-white">manually and permanently removed</strong> from our systems.</li>
                  </ul>
                </div>
                <button 
                  onClick={() => { setStatus('idle'); setFormData({ fullName: '', email: '', telegram: '', dataToProtect: '', details: '' }); }}
                  className="mt-8 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="bg-pink-500/10 border border-pink-500/20 p-4 rounded-xl flex gap-3 mb-6 shadow-inner">
                  <Info className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm text-pink-200/80 leading-relaxed">
                    <strong className="text-pink-400 block mb-1">Manual Process (199rs)</strong>
                    Data protection is not automatic. After submitting this form, an admin will contact you to collect the processing fee. Your data will only be removed manually after successful payment.
                  </p>
                </div>

                {status === 'error' && (
                  <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-sm flex items-center gap-3 shadow-inner mb-6">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>{errorMessage}</p>
                  </div>
                )}

                {/* 1. Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 font-medium ml-1">Full Name <span className="text-pink-500">*</span></label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName} 
                      onChange={handleChange} 
                      required 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-sm text-white outline-none focus:border-pink-500 transition-colors shadow-inner placeholder:text-gray-600 focus:bg-white/[0.02]" 
                      placeholder="Enter your full name" 
                    />
                    <User className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
                  </div>
                </div>

                {/* 2. Contact Email */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 font-medium ml-1">Email ID (For Contact) <span className="text-pink-500">*</span></label>
                  <div className="relative">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-sm text-white outline-none focus:border-pink-500 transition-colors shadow-inner placeholder:text-gray-600 focus:bg-white/[0.02]" 
                      placeholder="secure@proton.me" 
                    />
                    <Mail className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
                  </div>
                </div>

                {/* 3. Telegram ID */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 font-medium ml-1">Telegram ID (For Contact) <span className="text-pink-500">*</span></label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="telegram"
                      value={formData.telegram} 
                      onChange={handleChange} 
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-sm text-white outline-none focus:border-pink-500 transition-colors shadow-inner placeholder:text-gray-600 focus:bg-white/[0.02]" 
                      placeholder="@your_username" 
                    />
                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
                  </div>
                </div>

                {/* 4. Data to Protect */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 font-medium ml-1">What Data Do You Want To Protect? <span className="text-pink-500">*</span></label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="dataToProtect"
                      value={formData.dataToProtect} 
                      onChange={handleChange} 
                      required 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-sm text-white outline-none focus:border-pink-500 transition-colors shadow-inner placeholder:text-gray-600 focus:bg-white/[0.02]" 
                      placeholder="e.g., Phone Number, Vehicle RC, Aadhaar" 
                    />
                    <Smartphone className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
                  </div>
                </div>

                {/* 5. Additional Data */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 font-medium ml-1">Additional Data / Details</label>
                  <div className="relative">
                    <textarea 
                      name="details"
                      value={formData.details} 
                      onChange={handleChange} 
                      rows={4}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-sm text-white outline-none focus:border-pink-500 transition-colors shadow-inner placeholder:text-gray-600 focus:bg-white/[0.02] resize-none" 
                      placeholder="Provide any extra context, proof, or specific details to help us verify your request..." 
                    />
                    <FileText className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                  >
                    {status === 'loading' ? (
                      <span className="animate-pulse">Processing...</span>
                    ) : (
                      <><Send className="w-5 h-5" /> Submit Request (199rs)</>
                    )}
                  </button>
                </div>
                
              </form>
            )}

          </div>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}
