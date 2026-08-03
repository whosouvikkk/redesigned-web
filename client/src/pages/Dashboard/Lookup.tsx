import React, { useState } from 'react';
import api from '../../services/api';
import { Search, Loader2, AlertCircle } from 'lucide-react';

export default function Lookup() {
  const [type, setType] = useState('number');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await api.post('/osint/search', { type, query });
      setResult(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'No data resolved or target protected.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Active Intelligence</h1>
        <p className="text-gray-400 text-sm md:text-base mt-1 font-light">Initialize a new search vector against external public nodes.</p>
      </div>

      <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-lg mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            className="w-full md:w-48 bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-pink-500 shadow-inner appearance-none"
          >
            <option value="number">Number Lookup</option>
            <option value="aadhar">Aadhaar Info</option>
            <option value="vehicle">Vehicle (RC)</option>
            <option value="vehicle2number">Vehicle -> Number</option>
            <option value="bomber">Stress Bomber</option>
          </select>
          
          <div className="relative flex-1">
            <input 
              type="text" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Enter target parameter..." 
              required
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-sm text-white outline-none focus:border-pink-500 shadow-inner placeholder:text-gray-600"
            />
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full md:w-auto px-8 py-3.5 bg-white text-black hover:bg-gray-200 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Execute'}
          </button>
        </form>

        {error && (
          <div className="mt-6 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-sm flex items-center gap-3 shadow-inner">
            <AlertCircle className="w-5 h-5 shrink-0" /> <p>{error}</p>
          </div>
        )}
      </div>

      {result && (
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-500 to-rose-500" />
          <h3 className="text-lg font-bold text-white mb-4">Payload Resolved</h3>
          
          {/* Responsive Result Box */}
          <div className="bg-black/60 border border-white/5 rounded-xl p-4 overflow-x-auto shadow-inner scrollbar-thin scrollbar-thumb-pink-500/30 scrollbar-track-transparent">
            <pre className="text-[10px] sm:text-xs md:text-sm font-mono text-pink-300 leading-relaxed whitespace-pre-wrap break-all md:break-normal">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
