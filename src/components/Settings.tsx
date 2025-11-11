'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreferences } from '../contexts/PreferencesContext';

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const { animationsEnabled, toggleAnimations, cursorEnabled, toggleCursor } = usePreferences();

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-card border-2 border-border hover:border-[var(--accent-color)] shadow-lg transition-all duration-300 flex items-center justify-center group"
        aria-label="Settings"
      >
        <svg
          className="w-6 h-6 text-foreground group-hover:rotate-90 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-24 right-6 z-50 w-80 bg-card border border-border rounded-lg shadow-2xl p-6"
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--accent-color)' }}>
                Settings
              </h3>

              <div className="space-y-4">
                {/* Animations Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Skill Animations</p>
                    <p className="text-xs text-muted-foreground">Enable motion effects</p>
                  </div>
                  <button
                    onClick={toggleAnimations}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      animationsEnabled ? 'bg-[var(--accent-color)]' : 'bg-border'
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                      animate={{ x: animationsEnabled ? 24 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </div>

                {/* Cursor Effect Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Fluid Cursor</p>
                    <p className="text-xs text-muted-foreground">Interactive cursor effect</p>
                  </div>
                  <button
                    onClick={toggleCursor}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      cursorEnabled ? 'bg-[var(--accent-color)]' : 'bg-border'
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                      animate={{ x: cursorEnabled ? 24 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
