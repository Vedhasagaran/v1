'use client';

import { CursorProvider, useCursor } from '../context/CursorContext';
import { ThemeProvider } from '../context/ThemeContext';
import FluidCursor from './FluidCursor';
import CursorToggle from './CursorToggle';
import ThemeToggle from './ThemeToggle';
import ParticlesBackground from './ParticlesBackground';
import { AnimatePresence, motion } from 'framer-motion';

function CursorContent() {
  const { isEnabled } = useCursor();

  return (
    <>
      <AnimatePresence mode="wait">
        {isEnabled ? (
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
      <CursorToggle />
      <ThemeToggle />
    </>
  );
}

export default function CursorWrapper() {
  return (
    <ThemeProvider>
      <CursorProvider>
        <CursorContent />
      </CursorProvider>
    </ThemeProvider>
  );
}
