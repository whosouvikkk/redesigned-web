import React from 'react';

export const Billing: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-xl font-bold">Billing & Credits</h1>
        <p className="text-xs text-gray-500">Manage plan subscriptions and add-on lookup capacity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border p-6 rounded-xl">
          <h3 className="font-semibold text-sm mb-2">25 Credits Pack</h3>
          <div className="text-xl font-bold mb-4">₹50</div>
          <button className="w-full bg-accent text-white py-2 rounded text-xs font-semibold">Purchase Pack</button>
        </div>
        <div className="bg-surface border border-border p-6 rounded-xl">
          <h3 className="font-semibold text-sm mb-2">Weekly Pro Pass</h3>
          <div className="text-xl font-bold mb-4">₹499</div>
          <button className="w-full bg-accent text-white py-2 rounded text-xs font-semibold">Subscribe Weekly</button>
        </div>
        <div className="bg-surface border border-border p-6 rounded-xl">
          <h3 className="font-semibold text-sm mb-2">Monthly Elite Pass</h3>
          <div className="text-xl font-bold mb-4">₹1,499</div>
          <button className="w-full bg-accent text-white py-2 rounded text-xs font-semibold">Subscribe Monthly</button>
        </div>
      </div>
    </div>
  );
};
