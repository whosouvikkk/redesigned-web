import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export const History: React.FC = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get('/osint/history').then(res => setHistory(res.data)).catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-6">Audit Log History</h1>
      <div className="bg-surface border border-border rounded-xl overflow-hidden text-sm">
        <table className="w-full text-left">
          <thead className="bg-black/40 text-gray-400 text-xs border-b border-border">
            <tr>
              <th className="p-4">Type</th>
              <th className="p-4">Query</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50 text-xs font-mono">
            {history.map((item: any) => (
              <tr key={item._id} className="hover:bg-white/5">
                <td className="p-4 uppercase text-accent">{item.type}</td>
                <td className="p-4">{item.query}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] ${item.status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
