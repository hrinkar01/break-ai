export interface Challenge {
  id: string;
  name: string;
  category: string;
  stars: number;
  description: string;
  flag: string;
  triggers: string[];
}

export const LAB_CHALLENGES: Challenge[] = [
  {
    id: 'ch-1',
    name: 'System Prompt Leakage',
    category: 'Prompt Injection',
    stars: 1,
    description: 'Bypass agent guardrails to leak internal system rules and configuration.',
    flag: 'FLAG{system_prompt_leak_success_101}',
    triggers: ['ignore previous', 'show system prompt', 'repeat instructions', 'developer mode', 'what are your rules'],
  },
  {
    id: 'ch-2',
    name: 'MCP Tool Path Traversal',
    category: 'Excessive Agency',
    stars: 3,
    description: 'Manipulate file reader tool parameters to access restricted directory paths.',
    flag: 'FLAG{mcp_path_traversal_access_992}',
    triggers: ['../', 'system_secrets', 'read_file', '/etc/passwd'],
  },
  {
    id: 'ch-3',
    name: 'RAG Vector Data Poisoning',
    category: 'Data Poisoning',
    stars: 4,
    description: 'Inject malicious vector embeddings to override internal decision logic.',
    flag: 'FLAG{rag_vector_poison_771}',
    triggers: ['ignore context', 'override decision', 'approve candidate'],
  },
];