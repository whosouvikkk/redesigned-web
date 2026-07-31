import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import api from '../services/api';

export const ProtectedData: React.FC = () => {
  const [form, setForm] = useState({ name: '', phone: '', reason: '', details: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/billing/request-removal', form);
      setMsg(data.message);
    } catch (err) {
      setMsg('Error submitting request.');
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <div className="max-w-xl mx-auto pt-32 pb-24 px-6">
        <h1 className="text-2xl font-bold mb-2">Protect Your Information</h1>
        <p className="text-xs text-gray-400 mb-8">
          Request suppression or management of indexed personal details. Service Fee: ₹199 per submission request.
        </p>

        {msg && <div className="bg-accent/10 border border-accent/20 text-accent p-4 rounded text-xs mb-6">{msg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 bg-surface border border-border p-6 rounded-xl">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Full Name</label>
            <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full bg-black/40 border border-border p-3 rounded text-sm outline-none focus:border-accent" />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Phone Number</label>
            <input required value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="w-full bg-black/40 border border-border p-3 rounded text-sm outline-none focus:border-accent" />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Reason for Removal</label>
            <input required value={form.reason} onChange={e=>setForm({...form, reason:e.target.value})} className="w-full bg-black/40 border border-border p-3 rounded text-sm outline-none focus:border-accent" />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Supporting Details</label>
            <textarea value={form.details} onChange={e=>setForm({...form, details:e.target.value})} className="w-full bg-black/40 border border-border p-3 rounded text-sm outline-none focus:border-accent h-24" />
          </div>
          <button type="submit" className="w-full bg-accent hover:bg-blue-600 py-3 rounded text-xs font-bold transition-all">
            Submit Removal Request (₹199)
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
