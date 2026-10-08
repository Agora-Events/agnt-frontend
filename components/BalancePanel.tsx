import React from 'react';
import { Card } from './Card';
import { AccountBalance } from '@/lib/types';

interface BalancePanelProps {
  balance: AccountBalance;
}

export const BalancePanel: React.FC<BalancePanelProps> = ({ balance }) => {
  const capRatio = balance.dailyCapTotal > 0 ? (balance.totalSpentToday / balance.dailyCapTotal) * 100 : 0;

  return (
    <Card title="Account balance" badge="Stellar Vault">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-sm">
        {/* Total USDC */}
        <div>
          <div className="text-xs font-medium text-neutral-500 mb-1">Total account balance</div>
          <div className="text-3xl font-bold text-neutral-900 tracking-tight">
            ${balance.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-sm font-normal text-neutral-500">USDC</span>
          </div>
          <div className="text-xs font-mono text-neutral-400 mt-1">
            Vault {balance.vaultAddress}
          </div>
        </div>

        {/* Active Agents */}
        <div>
          <div className="text-xs font-medium text-neutral-500 mb-1">Active agents</div>
          <div className="text-3xl font-bold text-neutral-900 tracking-tight">
            {balance.activeAgentsCount} <span className="text-sm font-normal text-neutral-500">agents enforced</span>
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-1">
            Protected on-chain
          </div>
        </div>

        {/* Daily Aggregate Spend */}
        <div>
          <div className="flex justify-between items-center text-xs font-medium text-neutral-500 mb-1">
            <span>Daily aggregate spend</span>
            <span className="font-semibold text-neutral-900">
              ${balance.totalSpentToday.toFixed(2)} / ${balance.dailyCapTotal.toFixed(2)} USDC
            </span>
          </div>

          <div className="w-full bg-neutral-100 rounded-full h-2 my-2 overflow-hidden">
            <div
              className="bg-neutral-900 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(capRatio, 100)}%` }}
            />
          </div>

          <div className="text-xs text-neutral-500">
            {capRatio >= 100 ? 'Daily limit reached' : `${capRatio.toFixed(0)}% of daily limit used`}
          </div>
        </div>
      </div>
    </Card>
  );
};
