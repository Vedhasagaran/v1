'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';

interface PreferencesContextType {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
  cursorEnabled: boolean;
  toggleCursor: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const [cursorEnabled, setCursorEnabled] = useState(true);

  useEffect(() => {
    // Load preferences from localStorage
    const savedAnimations = localStorage.getItem('animationsEnabled');
    const savedCursor = localStorage.getItem('cursorEnabled');

    if (savedAnimations !== null) {
      setAnimationsEnabled(savedAnimations === 'true');
    }
    if (savedCursor !== null) {
      setCursorEnabled(savedCursor === 'true');
    }
  }, []);

  const toggleAnimations = useCallback(() => {
    setAnimationsEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem('animationsEnabled', String(newValue));
      return newValue;
    });
  }, []);

  const toggleCursor = useCallback(() => {
    setCursorEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem('cursorEnabled', String(newValue));
      return newValue;
    });
  }, []);

  const contextValue = useMemo(
    () => ({ animationsEnabled, toggleAnimations, cursorEnabled, toggleCursor }),
    [animationsEnabled, toggleAnimations, cursorEnabled, toggleCursor],
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
