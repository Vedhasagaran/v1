'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-card/80 backdrop-blur-sm rounded-full border border-border shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="flex">
        <span className="text-2xl">
          {isDark ? '☀️' : '🌙'}
        </span>
      </div>
    </motion.button>
  );
}
