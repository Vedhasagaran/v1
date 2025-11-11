'use client';

import { useEffect } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { usePreferences } from '../contexts/PreferencesContext';
import FluidCursor from './FluidCursor';
import ThemeToggle from './ThemeToggle';
import Settings from './Settings';
import ParticlesBackground from './ParticlesBackground';
import { AnimatePresence, motion } from 'framer-motion';

function CursorContent() {
  const { cursorEnabled, toggleCursor } = usePreferences();

  // Auto-transition from fluid to particles after 5 seconds on first load
  useEffect(() => {
    const hasAutoTransitioned = localStorage.getItem('hasAutoTransitioned');

    if (!hasAutoTransitioned) {
      console.log('Starting 5 second timer for auto-transition...');
      const timer = setTimeout(() => {
        console.log('5 seconds passed, switching to particles');
        toggleCursor(); // Switch to particles
        localStorage.setItem('hasAutoTransitioned', 'true');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toggleCursor]);

  return (
    <>
      <AnimatePresence mode="wait">
        {cursorEnabled ? (
          <motion.div
            key="fluid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FluidCursor />
          </motion.div>
        ) : (
          <motion.div
            key="particles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ParticlesBackground />
          </motion.div>
        )}
      </AnimatePresence>
      <ThemeToggle />
      <Settings />
    </>
  );
}

export default function CursorWrapper() {
  return (
    <ThemeProvider>
      <CursorContent />
    </ThemeProvider>
  );
}
