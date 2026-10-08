import React from 'react';

interface AsciiLogoProps {
  className?: string;
}

export const AsciiLogo: React.FC<AsciiLogoProps> = ({ className = '' }) => {
  return (
    <Link href="/" className={`inline-block font-mono text-black select-none hover:opacity-85 transition-opacity ${className}`}>
      <pre className="text-[10px] sm:text-xs font-mono font-bold leading-none tracking-tight whitespace-pre text-neutral-900">
{` ░▒▓█  ░▒▓██  ▒▓█░ ░▒▓███░
░▒░ █ ░▒░ █   ▒▓█░  ░▒▓█░ 
░▒▓██ ░▒▓██   ▒▓█░  ░▒▓█░ 
░▒░ █   ░▒█   ▒▓█░  ░▒▓█░ 
 ░▒▓█ ░▒▓█░   ▒▓█░  ░▒▓█░ `}
      </pre>
    </Link>
  );
};

import Link from 'next/link';
