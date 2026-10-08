import { Agent, AccountBalance, Transaction } from './types';
import { INITIAL_AGENTS, INITIAL_BALANCE, INITIAL_FEED } from './mock';

let currentAgents: Agent[] = [...INITIAL_AGENTS];
let currentBalance: AccountBalance = { ...INITIAL_BALANCE };
let currentFeed: Transaction[] = [...INITIAL_FEED];

export async function getAgents(): Promise<Agent[]> {
  await new Promise((res) => setTimeout(res, 30));
  return [...currentAgents];
}

export async function getBalance(): Promise<AccountBalance> {
  const activeCount = currentAgents.filter((a) => a.status === 'ACTIVE').length;
  const spentToday = currentAgents.reduce((sum, a) => sum + (a.status === 'ACTIVE' ? a.spentToday : 0), 0);
  const capTotal = currentAgents.reduce((sum, a) => sum + (a.status === 'ACTIVE' ? a.policy.dailyCap : 0), 0);

  currentBalance = {
    ...currentBalance,
    activeAgentsCount: activeCount,
    totalSpentToday: Number(spentToday.toFixed(2)),
    dailyCapTotal: Number(capTotal.toFixed(2)),
  };

  return { ...currentBalance };
}

export async function getFeed(): Promise<Transaction[]> {
  return [...currentFeed];
}

export async function revokeAgent(id: string): Promise<Agent | null> {
  const agent = currentAgents.find((a) => a.id === id);
  if (!agent) return null;

  agent.status = 'REVOKED';
  return { ...agent };
}

export async function addAgent(params: {
  name: string;
  dailyCap: number;
  perTxCap: number;
  allowlistedPayees: string[];
  expiryDays: number;
}): Promise<Agent> {
  const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
  const newId = `agnt-${Date.now().toString().slice(-4)}`;
  const key = `G${randomHex}...${Math.floor(1000 + Math.random() * 9000)}`;

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + (params.expiryDays || 30));

  const newAgent: Agent = {
    id: newId,
    name: params.name || 'New Agent',
    key,
    status: 'ACTIVE',
    spentToday: 0.0,
    createdAt: new Date().toISOString(),
    policy: {
      dailyCap: params.dailyCap || 50,
      perTxCap: params.perTxCap || 10,
      allowlistedPayees:
        params.allowlistedPayees.length > 0
          ? params.allowlistedPayees
          : ['Weather API (GBX9...7A21)'],
      expiryDays: params.expiryDays || 30,
      expiryTimestamp: expiryDate.toISOString(),
    },
  };

  currentAgents = [newAgent, ...currentAgents];
  return newAgent;
}

export function generateNextMockTransaction(activeAgentsList: Agent[]): Transaction | null {
  const activeAgents = activeAgentsList.filter((a) => a.status === 'ACTIVE');
  if (activeAgents.length === 0) return null;

  const selectedAgent = activeAgents[Math.floor(Math.random() * activeAgents.length)];
  const isDeniedCase = Math.random() > 0.5;

  let payee: string;
  let amount: number;
  let status: 'PAID' | 'DENIED' = 'PAID';
  let reason: string | undefined = undefined;

  if (isDeniedCase) {
    status = 'DENIED';
    const denyType = Math.random();
    if (denyType < 0.5) {
      payee = 'Unapproved Payee (GDFX...0099)';
      amount = Number((2 + Math.random() * 10).toFixed(2));
      reason = 'payee not on the list';
    } else {
      payee = selectedAgent.policy.allowlistedPayees[0] || 'Weather API (GBX9...7A21)';
      amount = Number((selectedAgent.policy.perTxCap + 10 + Math.random() * 20).toFixed(2));
      reason = `over per-payment limit ($${amount.toFixed(2)} > $${selectedAgent.policy.perTxCap.toFixed(2)})`;
    }
  } else {
    payee =
      selectedAgent.policy.allowlistedPayees[
        Math.floor(Math.random() * selectedAgent.policy.allowlistedPayees.length)
      ] || 'Weather API (GBX9...7A21)';
    const maxPossible = Math.min(
      selectedAgent.policy.perTxCap,
      selectedAgent.policy.dailyCap - selectedAgent.spentToday
    );
    if (maxPossible <= 1) {
      status = 'DENIED';
      amount = 5.0;
      reason = 'daily limit exceeded';
    } else {
      amount = Number((1 + Math.random() * (maxPossible - 1)).toFixed(2));
      selectedAgent.spentToday = Number((selectedAgent.spentToday + amount).toFixed(2));
    }
  }

  const tx: Transaction = {
    id: `tx-${Date.now().toString().slice(-5)}`,
    agentId: selectedAgent.id,
    agentName: selectedAgent.name,
    amount,
    payee,
    status,
    reason,
    timestamp: new Date().toISOString(),
  };

  currentFeed = [tx, ...currentFeed.slice(0, 19)];
  return tx;
}
