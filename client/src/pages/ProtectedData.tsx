import React, { useState } from 'react';
import { Shield, CheckCircle, Send } from 'lucide-react';
import api from '../services/api';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function ProtectedData() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('privacy');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/osint/protect-request', { name, phone, reason, details });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white relative overflow-hidden flex flex-col justify-between">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-12 w-full flex-1">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-pink-500" />
          <h1 className="text-3xl font-bold">Protected Data Removal Service</h1>
        </div>

        {submitted ? (
          <div className="bg-glass-gradient border border-pink-500/30 p-8 rounded-2xl text-center shadow-3d">
            <CheckCircle className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Request Submitted</h2>
            <p className="text-gray-400 text-sm">Your suppression request (Fee: ₹199) has been logged. Our administration team will review and process your request within 48 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-glass-gradient border border-border p-8 rounded-2xl shadow-3d space-y-6">
            <p className="text-sm text-gray-400 leading-relaxed">
              Request removal or suppression of publicly exposed personal information across supported OSINT databases.
            </p>

            <div>
              <label className="text-xs text-gray-400 block mb-1">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-500" placeholder="John Doe" />
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">Phone Number</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-500" placeholder="+91 9876543210" />
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">Reason for Request</label>
              <select value={reason} onChange={e => setReason(e.target.value)} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-500">
                <option value="privacy">Privacy & Security Risk</option>
                <option value="harassment">Harassment Prevention</option>
                <option value="outdated">Outdated / Incorrect Records</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">Supporting Details</label>
              <textarea value={details} onChange={e => setDetails(e.target.value)} rows={4} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-500" placeholder="Provide details..." />
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-pink-600 hover:bg-pink-500 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              <Send className="w-4 h-4" /> Submit Request (₹199)
            </button>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}
