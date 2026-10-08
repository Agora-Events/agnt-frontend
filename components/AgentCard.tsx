'use client';

import React, { useState } from 'react';
import { Agent } from '@/lib/types';
import { Card } from './Card';

interface AgentCardProps {
  agent: Agent;
  onRevoke: (id: string) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onRevoke }) => {
  const [confirmRevoke, setConfirmRevoke] = useState(false);
  const isRevoked = agent.status === 'REVOKED';

  const spendRatio =
    agent.policy.dailyCap > 0 ? (agent.spentToday / agent.policy.dailyCap) * 100 : 0;

  const handleRevokeClick = () => {
    if (confirmRevoke) {
      onRevoke(agent.id);
      setConfirmRevoke(false);
    } else {
      setConfirmRevoke(true);
      setTimeout(() => setConfirmRevoke(false), 4000);
    }
  };

  return (
    <Card
      title={agent.name}
      badge={isRevoked ? 'Revoked' : 'Active'}
      badgeVariant={isRevoked ? 'accent' : 'success'}
      className="h-full flex flex-col justify-between"
    >
      <div className="space-y-4 font-sans text-xs">
        {/* Key Header */}
        <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
          <span className="text-neutral-500">Restricted key</span>
          <span className="font-mono font-medium text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded text-[11px]">
            {agent.key}
          </span>
        </div>

        {/* Spend Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-500">Daily spend</span>
            <span className={isRevoked ? 'text-neutral-400 font-medium' : 'text-neutral-900 font-semibold'}>
              ${agent.spentToday.toFixed(2)} / ${agent.policy.dailyCap.toFixed(2)} USDC
            </span>
          </div>
          <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full transition-all ${
                isRevoked ? 'bg-neutral-300' : 'bg-neutral-900'
              }`}
              style={{ width: `${Math.min(spendRatio, 100)}%` }}
            />
          </div>
        </div>

        {/* Policy Details */}
        <div className="grid grid-cols-2 gap-3 bg-neutral-50 border border-neutral-100 p-3 rounded-lg text-xs">
          <div>
            <span className="text-neutral-500 block text-[11px]">Per payment limit</span>
            <span className="font-semibold text-neutral-900">${agent.policy.perTxCap.toFixed(2)} USDC</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[11px]">Expires</span>
            <span className="font-medium text-neutral-900">
              {new Date(agent.policy.expiryTimestamp).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Approved Payees */}
        <div className="space-y-1.5">
          <span className="text-neutral-500 block text-[11px]">Approved payees</span>
          <div className="space-y-1">
            {agent.policy.allowlistedPayees.map((payee, idx) => (
              <div
                key={idx}
                className="px-2.5 py-1 bg-white border border-neutral-200/70 rounded-md text-[11px] text-neutral-800 font-sans"
              >
                {payee}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-5 pt-3 border-t border-neutral-100 flex justify-end">
        {isRevoked ? (
          <span className="text-xs text-neutral-400 italic">Key revoked</span>
        ) : (
          <button
            onClick={handleRevokeClick}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
              confirmRevoke
                ? 'bg-[#ff5a1f] text-white hover:bg-[#e04d18]'
                : 'border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900'
            }`}
          >
            {confirmRevoke ? 'Confirm revoke?' : 'Revoke key'}
          </button>
        )}
      </div>
    </Card>
  );
};
