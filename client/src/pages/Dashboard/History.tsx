import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    api.get('/osint/history').then(res => setHistory(res.data)).catch(() => {});
  }, []);

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Lookup History</h1>
      <p className="text-gray-400 mb-8">Recent intelligence queries executed from your account.</p>

      <div className="bg-glass-gradient border border-border rounded-2xl overflow-hidden shadow-3d">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-gray-400 bg-surface">
              <th className="p-4">Type</th>
              <th className="p-4">Query</th>
              <th className="p-4">Status</th>
              <th className="p-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm font-mono">
            {history.map((item) => (
              <tr key={item._id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 uppercase text-pink-400">{item.type}</td>
                <td className="p-4">{item.query}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded text-xs ${item.status === 'success' ? 'bg-pink-500/10 text-pink-400' : 'bg-red-500/10 text-red-400'}`}>{item.status}</span></td>
                <td className="p-4 text-gray-500">{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {history.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500 font-sans">No search history found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
