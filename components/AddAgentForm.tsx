'use client';

import React, { useState } from 'react';
import { Card } from './Card';

interface AddAgentFormProps {
  onAddAgent: (data: {
    name: string;
    dailyCap: number;
    perTxCap: number;
    allowlistedPayees: string[];
    expiryDays: number;
  }) => void;
}

export const AddAgentForm: React.FC<AddAgentFormProps> = ({ onAddAgent }) => {
  const [name, setName] = useState('');
  const [dailyCap, setDailyCap] = useState('100');
  const [perTxCap, setPerTxCap] = useState('15');
  const [payees, setPayees] = useState('Weather API (GBX9...7A21), Price Feed (GDF3...9K43)');
  const [expiryDays, setExpiryDays] = useState('30');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allowlistedPayees = payees
      .split(',')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    onAddAgent({
      name: name || 'Agent Delta',
      dailyCap: parseFloat(dailyCap) || 50,
      perTxCap: parseFloat(perTxCap) || 10,
      allowlistedPayees,
      expiryDays: parseInt(expiryDays, 10) || 30,
    });

    setName('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Card title="Provision new agent key">
      <form onSubmit={handleSubmit} className="font-sans text-xs space-y-4">
        {/* Agent Name */}
        <div>
          <label className="block text-neutral-600 mb-1 font-medium text-xs">
            Agent name or identifier
          </label>
          <input
            type="text"
            placeholder="e.g. Agent Delta"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-neutral-200 text-neutral-900 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-neutral-900"
            required
          />
        </div>

        {/* Caps Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-600 mb-1 font-medium text-xs">
              Daily limit (USDC)
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={dailyCap}
              onChange={(e) => setDailyCap(e.target.value)}
              className="w-full bg-white border border-neutral-200 text-neutral-900 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-neutral-900"
              required
            />
          </div>
          <div>
            <label className="block text-neutral-600 mb-1 font-medium text-xs">
              Per payment limit (USDC)
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={perTxCap}
              onChange={(e) => setPerTxCap(e.target.value)}
              className="w-full bg-white border border-neutral-200 text-neutral-900 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-neutral-900"
              required
            />
          </div>
        </div>

        {/* Payees */}
        <div>
          <label className="block text-neutral-600 mb-1 font-medium text-xs">
            Approved payees (comma-separated with Stellar addresses)
          </label>
          <input
            type="text"
            placeholder="Weather API (GBX9...7A21), Price Feed (GDF3...9K43)"
            value={payees}
            onChange={(e) => setPayees(e.target.value)}
            className="w-full bg-white border border-neutral-200 text-neutral-900 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-neutral-900"
            required
          />
        </div>

        {/* Expiry Days */}
        <div>
          <label className="block text-neutral-600 mb-1 font-medium text-xs">
            Policy duration (days)
          </label>
          <input
            type="number"
            min="1"
            max="365"
            value={expiryDays}
            onChange={(e) => setExpiryDays(e.target.value)}
            className="w-full bg-white border border-neutral-200 text-neutral-900 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-neutral-900"
            required
          />
        </div>

        {/* Submit */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-[11px] text-neutral-400">
            Issues a restricted key bound to your Stellar vault
          </span>
          <button
            type="submit"
            className="px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 font-medium text-xs rounded-full transition-all cursor-pointer"
          >
            {submitted ? 'Agent key provisioned ✓' : 'Provision agent key'}
          </button>
        </div>
      </form>
    </Card>
  );
};
