'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('announcement-dismissed') === 'true';
    if (!isDismissed) {
      setIsVisible(true);
      window.dispatchEvent(new CustomEvent('announcement-state-change', { detail: { visible: true } }));
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('announcement-dismissed', 'true');
    setIsVisible(false);
    window.dispatchEvent(new CustomEvent('announcement-state-change', { detail: { visible: false } }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: '40px', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-50 overflow-hidden bg-[var(--card)] border-b border-border text-foreground select-none"
        >
          <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center justify-center gap-2 text-xs md:text-sm font-semibold tracking-wide">
              <svg
                className="w-4 h-4 text-(--accent-color) shrink-0 animate-pulse"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2l2.4 7.2 7.2 2.4-7.2 2.4-2.4 7.2-2.4-7.2-7.2-2.4 7.2-2.4z" />
              </svg>
              <span className="font-extrabold text-(--accent-color)">Carousel Studio</span>
              <span className="text-muted-foreground font-normal hidden sm:inline">— Design LinkedIn carousels</span>
              <a
                href="https://carousel-artist-kit.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 text-(--accent-color) hover:opacity-80 transition-opacity ml-1"
              >
                Try it free &rarr;
              </a>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-full hover:bg-neutral-900/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss announcement"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
