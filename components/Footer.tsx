import React from 'react';
import { AsciiLogo } from './AsciiLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200/80 bg-[#fafaf8] font-sans text-xs text-neutral-500 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <AsciiLogo />
        <div className="text-neutral-500 font-normal">
          © 2026 Agnt
        </div>
      </div>
    </footer>
  );
};
