import React, { useState } from 'react';
import { Search, Loader2, Copy, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export default function Lookup() {
  const [type, setType] = useState('number');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const { data } = await api.post('/osint/search', { type, query });
      setResult(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Lookup failed. Please check your credits or subscription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">OSINT Intelligence Lookup</h1>
      <p className="text-gray-400 mb-8">Execute precise queries against live public intelligence databases.</p>

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
        <select value={type} onChange={e => setType(e.target.value)} className="bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-500 md:w-48 text-white">
          <option value="number" className="bg-dark">Number</option>
          <option value="vehicle" className="bg-dark">Vehicle</option>
          <option value="upi" className="bg-dark">UPI</option>
          <option value="aadhar" className="bg-dark">Aadhaar</option>
          <option value="domain" className="bg-dark">Domain</option>
        </select>

        <div className="relative flex-1">
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Enter query string..." required className="w-full bg-surface border border-border rounded-xl px-4 py-3 pl-11 text-sm outline-none focus:border-pink-500" />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
        </div>

        <button type="submit" disabled={loading} className="px-8 py-3 bg-pink-600 hover:bg-pink-500 rounded-xl font-medium text-sm transition-all flex items-center justify-center disabled:opacity-50 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Execute'}
        </button>
      </form>

      {error && (
        <div className="bg-pink-500/10 border border-pink-500/20 text-pink-400 p-4 rounded-xl mb-8 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="bg-glass-gradient border border-border rounded-2xl p-6 relative shadow-3d">
          <button onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))} className="absolute top-6 right-6 p-2 bg-surface border border-border rounded-xl hover:bg-white/5 transition-colors" title="Copy JSON">
            <Copy className="w-4 h-4 text-gray-400" />
          </button>
          <h3 className="text-xs uppercase tracking-wider text-pink-400 mb-4 font-mono">Cleaned Intelligence Payload</h3>
          <pre className="font-mono text-sm text-pink-300 overflow-x-auto bg-black/50 p-4 rounded-xl border border-border">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
