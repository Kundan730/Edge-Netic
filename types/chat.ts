export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  tokens?: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  persona: PersonaType;
}

export interface Stats {
  totalMessages: number;
  totalConversations: number;
  avgResponseTime: number;
  modelLoadTime: number;
  totalTokens: number;
  lastUpdated: number;
}

export type PersonaType = 'standard' | 'professional' | 'friendly' | 'creative' | 'technical';

export interface Persona {
  name: string;
  prompt: string;
  icon: string;
  description: string;
}
