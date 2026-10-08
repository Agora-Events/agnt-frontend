import { Agent, AccountBalance, Transaction } from './types';

export const INITIAL_BALANCE: AccountBalance = {
  totalBalance: 25480.0,
  activeAgentsCount: 2,
  totalSpentToday: 130.5,
  dailyCapTotal: 250.0,
  vaultAddress: 'GDAG...8892',
};

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agnt-01',
    name: 'Agent Alpha',
    key: 'GBX9...7A21',
    status: 'ACTIVE',
    spentToday: 42.5,
    createdAt: '2026-10-01T08:00:00Z',
    policy: {
      dailyCap: 100,
      perTxCap: 15,
      allowlistedPayees: ['Weather API (GBX9...7A21)', 'Vector Search (GAA1...11B9)'],
      expiryDays: 30,
      expiryTimestamp: '2026-12-31T08:00:00Z',
    },
  },
  {
    id: 'agnt-02',
    name: 'Agent Beta',
    key: 'GDF3...9K43',
    status: 'ACTIVE',
    spentToday: 88.0,
    createdAt: '2026-10-03T10:15:00Z',
    policy: {
      dailyCap: 100,
      perTxCap: 25,
      allowlistedPayees: ['Price Feed (GDF3...9K43)', 'Code Evaluator (GDF9...4401)'],
      expiryDays: 14,
      expiryTimestamp: '2026-12-31T10:15:00Z',
    },
  },
  {
    id: 'agnt-03',
    name: 'Agent Gamma',
    key: 'GAA1...11B9',
    status: 'REVOKED',
    spentToday: 0.0,
    createdAt: '2026-09-20T14:30:00Z',
    policy: {
      dailyCap: 50,
      perTxCap: 5,
      allowlistedPayees: ['Web Scraper (GAA9...3300)'],
      expiryDays: 7,
      expiryTimestamp: '2026-11-30T14:30:00Z',
    },
  },
];

export const INITIAL_FEED: Transaction[] = [
  {
    id: 'tx-1001',
    agentId: 'agnt-01',
    agentName: 'Agent Alpha',
    amount: 12.5,
    payee: 'Weather API (GBX9...7A21)',
    status: 'PAID',
    timestamp: new Date(Date.now() - 1000 * 120).toISOString(),
  },
  {
    id: 'tx-1002',
    agentId: 'agnt-02',
    agentName: 'Agent Beta',
    amount: 18.0,
    payee: 'Price Feed (GDF3...9K43)',
    status: 'PAID',
    timestamp: new Date(Date.now() - 1000 * 90).toISOString(),
  },
  {
    id: 'tx-1003',
    agentId: 'agnt-01',
    agentName: 'Agent Alpha',
    amount: 45.0,
    payee: 'Weather API (GBX9...7A21)',
    status: 'DENIED',
    reason: 'over per-payment limit ($45.00 > $15.00 limit)',
    timestamp: new Date(Date.now() - 1000 * 45).toISOString(),
  },
  {
    id: 'tx-1004',
    agentId: 'agnt-02',
    agentName: 'Agent Beta',
    amount: 8.5,
    payee: 'Unapproved Payee (GDFX...0099)',
    status: 'DENIED',
    reason: 'payee not on the list',
    timestamp: new Date(Date.now() - 1000 * 15).toISOString(),
  },
];
