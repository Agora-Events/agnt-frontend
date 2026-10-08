'use client';

import React from 'react';
import Link from 'next/link';
import { AsciiLogo } from './AsciiLogo';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-neutral-200/80 bg-[#fafaf8] font-sans text-sm text-neutral-900 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <AsciiLogo />

        {/* Right: One Dashboard Link */}
        <nav className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-medium rounded-full transition-all"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
};
