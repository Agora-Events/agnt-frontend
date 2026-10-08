# Agnt

**Agnt** is a policy-enforced smart account protocol for autonomous AI agents on Stellar.

A human account owner funds a vault with USDC and issues restricted cryptographic keys to AI agents with strict spending rules (daily limits, per-payment caps, approved payees, and expiry dates), retaining instant key revocation capabilities.

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- `pnpm` package manager

### Installation & Development
```bash
# Install dependencies
pnpm install

# Start local development server
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the Agnt interface.

### Production Build
```bash
# Compile production build
pnpm build

# Start production server
pnpm start
```

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Next.js 16 (App Router) & React 19
- **Styling**: Tailwind CSS & Custom Design System (Geist Sans & Geist Mono)
- **Animation**: GSAP-driven procedural ASCII contract canvas (`HeroArt.tsx`)
- **Data Layer**: Typed mock handler interface (`/lib/api.ts`) designed for seamless Soroban RPC integration

---

## 📋 Features

- **USDC Vault Balance Management**: Real-time aggregate spend and cap monitoring.
- **Restricted Key Issuance**: Configure daily limits, per-payment limits, approved payee Stellar addresses, and policy expiry durations per agent.
- **Instant Key Revocation**: On-demand human revocation that immediately invalidates agent keys.
- **Real-Time Policy Evaluation**: Live spend feed displaying approved transactions and blocked calls with explicit policy breach reasons.
