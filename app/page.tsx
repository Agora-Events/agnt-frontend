'use client';

import React from 'react';
import Link from 'next/link';
import { HeroArt } from '@/components/HeroArt';
import { DitherDivider } from '@/components/DitherDivider';
import { Card } from '@/components/Card';

export default function Home() {
  return (
    <div className="font-sans text-neutral-900 py-6 max-w-5xl mx-auto space-y-16">
      {/* Hero Section */}
      <section className="text-center flex flex-col items-center justify-center space-y-6 pt-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 max-w-3xl leading-tight">
          Give your AI agent a budget, not your keys.
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl text-center leading-relaxed">
          Agnt is a smart account on Stellar. Your agents pay for APIs in USDC, and the contract blocks anything outside the rules you set.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-neutral-900 text-white hover:bg-neutral-800 font-medium text-sm rounded-full transition-all"
          >
            Open dashboard
          </Link>
          <a
            href="#how-it-works"
            className="px-6 py-3 text-neutral-600 hover:text-neutral-900 font-medium text-sm transition-colors"
          >
            How it works →
          </a>
        </div>

        {/* Hero Art */}
        <HeroArt />
      </section>

      {/* Dithered Divider Strip */}
      <DitherDivider />

      {/* How It Works Section */}
      <section id="how-it-works" className="space-y-8 pt-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">How it works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-semibold text-sm text-neutral-900">
                1
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Fund it</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Deposit USDC into your Agnt account.
              </p>
            </div>
          </Card>

          <Card>
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-semibold text-sm text-neutral-900">
                2
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Set the rules</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Give each agent a key with a daily limit, a per-payment limit, approved payees and an expiry.
              </p>
            </div>
          </Card>

          <Card>
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-semibold text-sm text-neutral-900">
                3
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Stay in control</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                The contract checks every payment on-chain. Break a rule and it fails. Revoke the key and the agent is done.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Sample Rules Policy Card */}
      <section className="space-y-6 pt-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Sample policy rules</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="font-semibold text-neutral-900">Agent Alpha Policy</div>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-neutral-50">
                  <span className="text-neutral-500">Daily limit</span>
                  <span className="font-medium text-neutral-900">100 USDC</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-neutral-50">
                  <span className="text-neutral-500">Per payment limit</span>
                  <span className="font-medium text-neutral-900">15 USDC</span>
                </div>

                <div className="py-1 border-b border-neutral-50 space-y-1">
                  <span className="text-neutral-500 block">Approved payees</span>
                  <div className="space-y-1 pl-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-neutral-900">Weather API</span>
                      <span className="font-mono text-neutral-500">GBX9...7A21</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-neutral-900">Price Feed</span>
                      <span className="font-mono text-neutral-500">GDF3...9K43</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-neutral-500">Expires</span>
                  <span className="font-medium text-neutral-900">Dec 31, 2026</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
