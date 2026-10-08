'use client';

import React, { useState } from 'react';
import { Agent } from '@/lib/types';
import { AgentCard } from './AgentCard';

interface AgentsListProps {
  agents: Agent[];
  onRevoke: (id: string) => void;
}

export const AgentsList: React.FC<AgentsListProps> = ({ agents, onRevoke }) => {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'REVOKED'>('ALL');

  const filteredAgents = agents.filter((agent) => {
    if (filter === 'ACTIVE') return agent.status === 'ACTIVE';
    if (filter === 'REVOKED') return agent.status === 'REVOKED';
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-sans border-b border-neutral-200/80 pb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-neutral-900 tracking-tight">Enforced agents</h2>
          <span className="text-xs text-neutral-400">({agents.length} total)</span>
        </div>

        <div className="flex items-center gap-1.5 bg-neutral-100/80 p-1 rounded-full text-xs">
          {(['ALL', 'ACTIVE', 'REVOKED'] as const).map((mode) => {
            const label = mode === 'ALL' ? 'All' : mode === 'ACTIVE' ? 'Active' : 'Revoked';
            return (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all ${
                  filter === mode
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Agents */}
      {filteredAgents.length === 0 ? (
        <div className="p-8 text-center border border-neutral-200 rounded-xl bg-white text-neutral-400 font-sans text-xs">
          No agents found for filter: {filter.toLowerCase()}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} onRevoke={onRevoke} />
          ))}
        </div>
      )}
    </div>
  );
};
