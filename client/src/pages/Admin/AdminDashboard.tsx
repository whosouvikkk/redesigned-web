import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Users, Shield, Database, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    api.get('/admin/stats').then(res => setStats(res.data)).catch(() => {});
    api.get('/admin/users').then(res => setUsers(res.data)).catch(() => {});
  }, []);

  const modifyUser = async (id: string, credits: number, subscription: string) => {
    await api.post(`/admin/users/${id}/modify`, { credits, subscription });
    window.location.reload();
  };

  const deleteUser = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await api.delete(`/admin/users/${id}`);
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-dark p-10 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pink-glow opacity-40 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-3xl font-bold mb-2">Admin Control Center</h1>
        <p className="text-gray-400 mb-8">Manage system users, subscriptions, and platform telemetry.</p>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-glass-gradient border border-border p-6 rounded-2xl flex items-center gap-4 shadow-3d">
              <Users className="w-8 h-8 text-pink-400" />
              <div>
                <div className="text-gray-400 text-sm">Total Users</div>
                <div className="text-2xl font-bold font-mono">{stats.totalUsers}</div>
              </div>
            </div>
            <div className="bg-glass-gradient border border-border p-6 rounded-2xl flex items-center gap-4 shadow-3d">
              <Shield className="w-8 h-8 text-pink-400" />
              <div>
                <div className="text-gray-400 text-sm">Active Subscriptions</div>
                <div className="text-2xl font-bold font-mono">{stats.activeSubs}</div>
              </div>
            </div>
            <div className="bg-glass-gradient border border-border p-6 rounded-2xl flex items-center gap-4 shadow-3d">
              <Database className="w-8 h-8 text-pink-400" />
              <div>
                <div className="text-gray-400 text-sm">Total Lookups</div>
                <div className="text-2xl font-bold font-mono">{stats.totalLookups}</div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-glass-gradient border border-border rounded-2xl overflow-hidden shadow-3d">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-gray-400 bg-surface">
                <th className="p-4">Username</th>
                <th className="p-4">Credits</th>
                <th className="p-4">Subscription</th>
                <th className="p-4">Role</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {users.map(u => (
                <tr key={u._id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-pink-300">{u.username}</td>
                  <td className="p-4 font-mono">{u.credits}</td>
                  <td className="p-4 uppercase text-xs font-semibold text-pink-400">{u.subscription}</td>
                  <td className="p-4">{u.role}</td>
                  <td className="p-4 flex items-center gap-2">
                    <button onClick={() => modifyUser(u._id, u.credits + 10, u.subscription)} className="px-3 py-1 bg-surface border border-border rounded text-xs hover:bg-white/10">Add 10 Credits</button>
                    <button onClick={() => modifyUser(u._id, u.credits, 'monthly')} className="px-3 py-1 bg-surface border border-border rounded text-xs hover:bg-white/10">Grant Monthly</button>
                    <button onClick={() => deleteUser(u._id)} className="p-1 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
