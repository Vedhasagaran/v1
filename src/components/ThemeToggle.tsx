'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed top-6 right-6 z-50"
    >
      <button
        onClick={toggleTheme}
        className="relative flex items-center justify-center w-12 h-12 bg-card/80 backdrop-blur-sm rounded-full border border-border shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.6)] hover:border-purple-500 hover:scale-105 transition-all duration-300"
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <span className="text-2xl">
          {isDark ? '☀️' : '🌙'}
        </span>
      </button>
    </motion.div>
  );
}
