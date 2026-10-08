'use client';

import React, { useEffect, useRef } from 'react';
import { Transaction } from '@/lib/types';
import { Card } from './Card';
import gsap from 'gsap';

interface LiveFeedProps {
  transactions: Transaction[];
  isStreaming?: boolean;
}

export const LiveFeed: React.FC<LiveFeedProps> = ({ transactions, isStreaming = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(transactions.length);

  useEffect(() => {
    if (transactions.length > prevCountRef.current && containerRef.current) {
      const firstRow = containerRef.current.querySelector('.feed-row-first');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (firstRow && !prefersReducedMotion) {
        gsap.fromTo(
          firstRow,
          { opacity: 0, backgroundColor: '#f5f5f5', x: -6 },
          { opacity: 1, backgroundColor: 'transparent', x: 0, duration: 0.5, ease: 'power2.out' }
        );
      }
    }
    prevCountRef.current = transactions.length;
  }, [transactions]);

  return (
    <Card
      title="Live policy spend feed"
      badge={isStreaming ? 'Streaming' : 'Paused'}
      badgeVariant="neutral"
    >
      <div className="font-sans text-xs space-y-3">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-12 gap-2 text-neutral-400 border-b border-neutral-100 pb-2 font-medium text-[11px]">
          <div className="col-span-2">Time</div>
          <div className="col-span-3">Agent</div>
          <div className="col-span-3">Payee</div>
          <div className="col-span-2 text-right">Amount</div>
          <div className="col-span-2 text-right">Status</div>
        </div>

        {/* List of items */}
        <div ref={containerRef} className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {transactions.map((tx, idx) => {
            const isPaid = tx.status === 'PAID';
            const timeFormatted = new Date(tx.timestamp).toTimeString().split(' ')[0];

            return (
              <div
                key={tx.id}
                className={`p-3 border border-neutral-100 rounded-lg bg-white text-xs ${
                  idx === 0 ? 'feed-row-first border-neutral-300 font-medium' : ''
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 items-center">
                  <div className="sm:col-span-2 text-neutral-400 font-mono text-[11px]">
                    {timeFormatted}
                  </div>
                  <div className="sm:col-span-3 font-semibold text-neutral-900 truncate">
                    {tx.agentName}
                  </div>
                  <div className="sm:col-span-3 text-neutral-600 truncate font-sans text-xs">
                    {tx.payee}
                  </div>
                  <div className="sm:col-span-2 sm:text-right font-medium text-neutral-900">
                    ${tx.amount.toFixed(2)} <span className="text-[10px] text-neutral-400">USDC</span>
                  </div>
                  <div className="sm:col-span-2 sm:text-right">
                    {isPaid ? (
                      <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                        Paid
                      </span>
                    ) : (
                      <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-[#ff5a1f]/10 text-[#ff5a1f] font-medium border border-[#ff5a1f]/20">
                        Denied
                      </span>
                    )}
                  </div>
                </div>

                {!isPaid && tx.reason && (
                  <div className="mt-2 text-[11px] text-[#ff5a1f] pl-2 border-l-2 border-[#ff5a1f] font-normal">
                    Blocked: {tx.reason}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
