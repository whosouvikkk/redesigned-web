import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Trash, Plus, Shield } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>({});
  const [users, setUsers] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const statsRes = await api.get('/admin/stats');
      setStats(statsRes.data);
      const usersRes = await api.get('/admin/users');
      setUsers(usersRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleUpdateUser = async (id: string, update: any) => {
    await api.put(`/admin/user/${id}`, update);
    loadData();
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm('Delete this user?')) {
      await api.delete(`/admin/user/${id}`);
      loadData();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      <div className="flex items-center space-x-3 border-b border-border pb-4">
        <Shield className="text-red-400 w-6 h-6" />
        <h1 className="text-xl font-bold">Admin Management Control Console</h1>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center">
        <StatCard title="Total Users" value={stats.totalUsers || 0} />
        <StatCard title="Active Subs" value={stats.activeSubs || 0} />
        <StatCard title="Distributed Credits" value={stats.totalCredits || 0} />
        <StatCard title="Total Audits" value={stats.totalLookups || 0} />
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/60 border-b border-border text-gray-400">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Credits</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 font-mono">
            {users.map((u: any) => (
              <tr key={u._id}>
                <td className="p-4">{u.email}</td>
                <td className="p-4 uppercase text-gray-400">{u.role}</td>
                <td className="p-4 text-accent font-bold">{u.credits}</td>
                <td className="p-4 uppercase text-green-400">{u.subscription}</td>
                <td className="p-4 flex space-x-2">
                  <button onClick={() => handleUpdateUser(u._id, { credits: u.credits + 50 })} className="p-1 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500/20" title="Add 50 Credits">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleUpdateUser(u._id, { subscription: 'monthly' })} className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-[10px]" title="Grant Monthly">
                    Grant Sub
                  </button>
                  <button onClick={() => handleDeleteUser(u._id)} className="p-1 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20" title="Delete User">
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }: any) => (
  <div className="bg-surface border border-border p-4 rounded-xl">
    <div className="text-xs text-gray-400 mb-1">{title}</div>
    <div className="text-xl font-bold">{value}</div>
  </div>
);
