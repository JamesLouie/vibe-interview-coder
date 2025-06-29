'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ProblemContext {
  title?: string;
  description?: string;
  difficulty?: string;
  code?: string;
  testResults?: Array<{
    passed: boolean;
    input: unknown;
    expected: unknown;
    actual: unknown;
    error?: string;
  }>;
}

interface ChatContextType {
  problemContext: ProblemContext | null;
  setProblemContext: (context: ProblemContext | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [problemContext, setProblemContext] = useState<ProblemContext | null>(null);

  return (
    <ChatContext.Provider value={{ problemContext, setProblemContext }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
} 