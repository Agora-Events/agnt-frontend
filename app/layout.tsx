import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Agnt — Policy-Enforced Smart Accounts for AI Agents on Stellar',
  description:
    'Give your AI agent a budget, not your keys. Policy-enforced smart accounts on Stellar.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#fafaf8] text-[#171717] font-sans antialiased">
        <Header />
        <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
