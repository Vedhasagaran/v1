'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';

interface PreferencesContextType {
  cursorEnabled: boolean;
  toggleCursor: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [cursorEnabled, setCursorEnabled] = useState(true);

  useEffect(() => {
    const savedCursor = localStorage.getItem('cursorEnabled');

    if (savedCursor !== null) {
      setCursorEnabled(savedCursor === 'true');
    }
  }, []);

  const toggleCursor = useCallback(() => {
    setCursorEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem('cursorEnabled', String(newValue));
      return newValue;
    });
  }, []);

  const contextValue = useMemo(
    () => ({ cursorEnabled, toggleCursor }),
    [cursorEnabled, toggleCursor],
  );

  return (
    <PreferencesContext.Provider value={contextValue}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}
