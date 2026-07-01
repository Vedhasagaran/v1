'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface CursorContextType {
  isEnabled: boolean;
  toggleCursor: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Auto-disable after 5 seconds
    const timer = setTimeout(() => {
      setIsEnabled(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const toggleCursor = () => {
    setIsEnabled((prev) => !prev);
  };

  return (
    <CursorContext.Provider value={{ isEnabled, toggleCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}
