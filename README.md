# Agnt

Agnt is a policy-enforced smart account for autonomous AI agents on Stellar.

A human owner funds an account with USDC and issues restricted cryptographic keys to AI agents with granular spending rules (daily limit, per-payment limit, approved payees, and expiry dates), retaining instant key revocation.

## Quick Start

### Prerequisites
- Node.js 18+
- `pnpm` package manager

### Development Server
```bash
pnpm install
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### Production Build
```bash
pnpm build
pnpm start
```
