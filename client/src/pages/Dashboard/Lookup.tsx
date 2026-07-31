import React, { useState } from 'react';
import { Search, Loader2, Copy, Lock } from 'lucide-react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export const Lookup: React.FC = () => {
  const [type, setType] = useState('number');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isBlocked = user.credits <= 0 && user.subscription === 'none';

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const { data } = await api.post('/osint/search', { type, query });
      setResult(data.data);
      // Update local storage credit cache
      user.credits = data.remainingCredits;
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Lookup execution failed.');
    } finally {
      setLoading(false);
    }
  };

  if (isBlocked) {
    return (
      <div className="max-w-xl mx-auto my-12 text-center bg-glass-gradient border border-border p-8 rounded-xl">
        <Lock className="w-12 h-12 text-accent mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Subscription Required</h2>
        <p className="text-gray-400 text-sm mb-6">
          You have depleted all available lookup credits. Upgrade your account or purchase additional credit packs to continue.
        </p>
        <Link to="/dashboard/billing" className="inline-block bg-accent hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all">
          View Plans & Top Up
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold">OSINT Search Terminal</h1>
        <p className="text-xs text-gray-500">Query public intelligence indexes across supported modules.</p>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)}
          className="bg-surface border border-border text-white rounded-lg px-4 py-3 outline-none focus:border-accent text-sm w-full sm:w-48"
        >
          <option value="number">Number</option>
          <option value="vehicle">Vehicle</option>
          <option value="upi">UPI</option>
          <option value="aadhar">Aadhaar</option>
          <option value="domain">Domain</option>
        </select>

        <div className="relative flex-1">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search query string..."
            required
            className="w-full bg-surface border border-border text-white rounded-lg px-4 py-3 pl-10 outline-none focus:border-accent text-sm"
          />
          <Search className="absolute left-3.5 top-3.5 text-gray-500 w-4 h-4" />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-accent hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
        </button>
      </form>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg text-xs">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-surface border border-border rounded-xl p-6 relative">
          <button 
            onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 bg-black/40 rounded"
            title="Copy Raw Response"
          >
            <Copy className="w-4 h-4" />
          </button>
          
          <div className="text-xs font-mono uppercase text-gray-500 mb-4 pb-2 border-b border-border">
            Cleaned Intelligence Payload
          </div>

          <pre className="font-mono text-xs text-green-400 overflow-x-auto p-2">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
