export interface Policy {
  dailyCap: number; // Daily USDC cap
  perTxCap: number; // Max USDC per transaction
  allowlistedPayees: string[]; // Allowed payee domains or addresses
  expiryDays: number; // Expiry in days from creation
  expiryTimestamp: string; // ISO timestamp
}

export interface Agent {
  id: string;
  name: string;
  key: string; // Restricted key address
  status: 'ACTIVE' | 'REVOKED';
  spentToday: number; // Current day's spending in USDC
  createdAt: string; // ISO date
  policy: Policy;
}

export interface Transaction {
  id: string;
  agentId: string;
  agentName: string;
  amount: number;
  payee: string;
  status: 'PAID' | 'DENIED';
  reason?: string;
  timestamp: string;
}

export interface AccountBalance {
  totalBalance: number; // USDC balance of primary vault
  activeAgentsCount: number;
  totalSpentToday: number;
  dailyCapTotal: number;
  vaultAddress: string;
}
