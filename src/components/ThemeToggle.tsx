'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed top-6 right-6 z-50"
    >
      <button
        onClick={toggleTheme}
        className="relative flex items-center justify-center w-12 h-12 bg-card/80 backdrop-blur-sm rounded-full border border-border shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.6)] hover:border-[var(--accent-color)] hover:scale-105 transition-all duration-300"
        style={{ color: 'var(--accent-color)' }}
      >
        {/* Sun Icon */}
        <svg
          id="sun-svg"
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-7 w-7"
          fill="none"
          focusable="false"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M22 12L23 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 2V1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 23V22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 20L19 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 4L19 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 20L5 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 4L5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 12L2 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Moon Icon */}
        <svg
          id="moon-svg"
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-7 w-7"
          fill="none"
          focusable="false"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" stroke="none" />
          <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
          <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
          <path d="M19 11h2m-1 -1v2" />
        </svg>
      </button>
    </motion.div>
  );
}
