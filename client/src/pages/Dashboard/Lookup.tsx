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
      setError(err.response?.data?.error || 'No data found in database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl font-sans">
      <h1 className="text-3xl font-bold mb-2">OSINT Intelligence Lookup</h1>
      <p className="text-gray-400 mb-8">Execute precise queries against live public intelligence databases.</p>

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Themed Dropdown matching the website design */}
        <div className="relative md:w-56">
          <select 
            value={type} 
            onChange={e => setType(e.target.value)} 
            className="w-full bg-[#0d070a] border border-pink-500/30 text-pink-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-500 transition-colors shadow-glass-edge appearance-none cursor-pointer"
          >
            <option value="number" className="bg-[#0a0508] text-white">Number Lookup</option>
            <option value="aadhar" className="bg-[#0a0508] text-white">Aadhaar Lookup</option>
            <option value="vehicle" className="bg-[#0a0508] text-white">Vehicle Lookup</option>
            <option value="vehicle2number" className="bg-[#0a0508] text-white">Vehicle to Number</option>
            <option value="bomber" className="bg-[#0a0508] text-white">Bomber Module</option>
          </select>
        </div>

        <div className="relative flex-1">
          <input 
            type="text" 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            placeholder="Enter target query string..." 
            required 
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pl-11 text-sm text-white outline-none focus:border-pink-500 shadow-inner" 
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="px-8 py-3 bg-gradient-to-b from-pink-500 to-pink-700 hover:from-pink-400 hover:to-pink-600 rounded-xl font-medium text-sm text-white transition-all flex items-center justify-center disabled:opacity-50 shadow-[0_10px_20px_rgba(236,72,153,0.3)]"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Execute'}
        </button>
      </form>

      {error && (
        <div className="bg-pink-500/10 border border-pink-500/20 text-pink-400 p-4 rounded-xl mb-8 flex items-center gap-3 text-sm shadow-inner">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="bg-[#0d070a] border border-white/10 rounded-2xl p-6 relative shadow-3d shadow-glass-edge">
          <button 
            onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))} 
            className="absolute top-6 right-6 p-2 bg-surface border border-white/10 rounded-xl hover:bg-white/5 transition-colors" 
            title="Copy JSON"
          >
            <Copy className="w-4 h-4 text-gray-400" />
          </button>
          <h3 className="text-xs uppercase tracking-wider text-pink-400 mb-4 font-mono">Cleaned Intelligence Payload</h3>
          <pre className="font-mono text-sm text-pink-300 overflow-x-auto bg-black/80 p-4 rounded-xl border border-white/5 shadow-inner">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
