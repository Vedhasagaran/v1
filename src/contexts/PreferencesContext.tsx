'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface PreferencesContextType {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
  cursorEnabled: boolean;
  toggleCursor: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
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

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem('animationsEnabled', String(newValue));
      return newValue;
    });
  };

  const toggleCursor = () => {
    setCursorEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem('cursorEnabled', String(newValue));
      return newValue;
    });
  };

  return (
    <PreferencesContext.Provider value={{ animationsEnabled, toggleAnimations, cursorEnabled, toggleCursor }}>
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
