'use client';

import React, { useState, useEffect } from 'react';
import { Agent, AccountBalance, Transaction } from '@/lib/types';
import {
  getAgents,
  getBalance,
  getFeed,
  revokeAgent,
  addAgent,
  generateNextMockTransaction,
} from '@/lib/api';
import { BalancePanel } from '@/components/BalancePanel';
import { AgentsList } from '@/components/AgentsList';
import { AddAgentForm } from '@/components/AddAgentForm';
import { LiveFeed } from '@/components/LiveFeed';

export default function DashboardPage() {
  const [balance, setBalance] = useState<AccountBalance | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [feed, setFeed] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    async function loadInitialData() {
      const [fetchedAgents, fetchedBalance, fetchedFeed] = await Promise.all([
        getAgents(),
        getBalance(),
        getFeed(),
      ]);
      setAgents(fetchedAgents);
      setBalance(fetchedBalance);
      setFeed(fetchedFeed);
      setIsLoading(false);
    }
    loadInitialData();
  }, []);

  // Update balance summary when agents list updates
  useEffect(() => {
    if (!isLoading) {
      getBalance().then(setBalance);
    }
  }, [agents, isLoading]);

  // Live transaction simulator every 4.5 seconds
  useEffect(() => {
    if (isLoading) return;

    const timer = setInterval(() => {
      setAgents((currentAgents) => {
        const newTx = generateNextMockTransaction(currentAgents);
        if (newTx) {
          setFeed((prevFeed) => [newTx, ...prevFeed.slice(0, 19)]);
        }
        return [...currentAgents];
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isLoading]);

  // Handlers
  const handleRevokeAgent = async (id: string) => {
    const updated = await revokeAgent(id);
    if (updated) {
      setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'REVOKED' } : a)));
    }
  };

  const handleAddAgent = async (formData: {
    name: string;
    dailyCap: number;
    perTxCap: number;
    allowlistedPayees: string[];
    expiryDays: number;
  }) => {
    const createdAgent = await addAgent(formData);
    setAgents((prev) => [createdAgent, ...prev]);
  };

  if (isLoading || !balance) {
    return (
      <div className="py-20 text-center font-sans text-sm text-neutral-600 space-y-2">
        <div className="font-semibold text-neutral-900">Loading vault terminal...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans max-w-6xl mx-auto py-4">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-neutral-200/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Vault Dashboard
          </h1>
          <p className="text-xs text-neutral-500">
            Real-time policy enforcement and spending controls on Stellar
          </p>
        </div>
        <div className="text-xs text-neutral-500 bg-white border border-neutral-200 rounded-full px-3 py-1 font-mono">
          Vault: {balance.vaultAddress}
        </div>
      </div>

      {/* 1. Account Balance Overview */}
      <BalancePanel balance={balance} />

      {/* 2. Main Dashboard Split: Agents List & Provisioning + Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Agents Management (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <AgentsList agents={agents} onRevoke={handleRevokeAgent} />
          <AddAgentForm onAddAgent={handleAddAgent} />
        </div>

        {/* Right Column: Real-time Live Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <LiveFeed transactions={feed} isStreaming={true} />
        </div>
      </div>
    </div>
  );
}
