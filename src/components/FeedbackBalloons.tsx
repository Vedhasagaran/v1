'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Balloon {
  id: number;
  color: string;
  rating: number;
  label: string;
}

export default function FeedbackBalloons() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [poppedId, setPoppedId] = useState<number | null>(null);

  useEffect(() => {
    // Check if user has already submitted feedback
    const feedbackSubmitted = localStorage.getItem('nightModeFeedback');
    if (feedbackSubmitted) {
      setHasSubmitted(true);
      return;
    }

    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const balloons: Balloon[] = [
    { id: 1, color: '#ef4444', rating: 1, label: 'Hate it' },
    { id: 2, color: '#f97316', rating: 2, label: 'Dislike' },
    { id: 3, color: '#eab308', rating: 3, label: 'Neutral' },
    { id: 4, color: '#22c55e', rating: 4, label: 'Like it' },
    { id: 5, color: '#10b981', rating: 5, label: 'Love it' },
  ];

  const handleBalloonPop = async (id: number, rating: number, label: string) => {
    // Trigger burst animation
    setPoppedId(id);

    // Store feedback
    localStorage.setItem('nightModeFeedback', JSON.stringify({ rating, label, timestamp: Date.now() }));

    // Send to Microsoft Clarity
    if (globalThis.window !== undefined && (globalThis.window as any).clarity) {
      (globalThis.window as any).clarity('event', 'night_mode_feedback', {
        rating: rating,
        label: label,
        timestamp: Date.now()
      });
    }

    console.log('Feedback submitted:', { rating, label });

    // Close popup after burst animation
    setTimeout(() => {
      setHasSubmitted(true);
      setIsOpen(false);
    }, 800);
  };

  if (hasSubmitted || !isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={() => setIsOpen(false)}
          />

          {/* Feedback Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-[70] w-80 bg-card/95 backdrop-blur-md border-2 border-border rounded-2xl shadow-2xl p-6"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg font-bold mb-1 text-center" style={{ color: 'var(--accent-color)' }}>
              Quick Feedback
            </h3>
            <p className="text-center text-sm text-muted-foreground mb-6">
              Did you like the night mode?
            </p>

            {/* Balloons in a row */}
            <div className="flex items-end justify-center gap-3 mb-4">
              {balloons.map((balloon, index) => (
                <div key={balloon.id} className="relative flex flex-col items-center">
                  {/* Label */}
                  <motion.div
                    className="text-xs font-medium text-muted-foreground mb-2 text-center"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {balloon.label}
                  </motion.div>

                  {/* Balloon Button */}
                  <motion.button
                    onClick={() => handleBalloonPop(balloon.id, balloon.rating, balloon.label)}
                    className="relative cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: [0, -8, 0],
                    }}
                    transition={{
                      opacity: { delay: index * 0.1 },
                      y: {
                        delay: index * 0.1 + 0.3,
                        duration: 2 + index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    whileHover={{ scale: 1.15, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence>
                      {poppedId === balloon.id ? (
                        /* Burst particles */
                        <motion.div className="relative w-12 h-16">
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                              style={{ backgroundColor: balloon.color }}
                              initial={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                              animate={{
                                scale: 0,
                                opacity: 0,
                                x: Math.cos((i * Math.PI * 2) / 8) * 40,
                                y: Math.sin((i * Math.PI * 2) / 8) * 40,
                              }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                          ))}
                        </motion.div>
                      ) : (
                        /* Balloon */
                        <motion.svg
                          width="48"
                          height="64"
                          viewBox="0 0 48 64"
                          fill="none"
                          className="drop-shadow-lg"
                        >
                          {/* Balloon body */}
                          <ellipse cx="24" cy="26" rx="18" ry="22" fill={balloon.color} opacity="0.95" />
                          {/* Knot */}
                          <path
                            d="M 24 48 Q 22 52, 24 56"
                            stroke={balloon.color}
                            strokeWidth="1.5"
                            fill="none"
                          />
                          {/* Highlight */}
                          <ellipse cx="18" cy="20" rx="6" ry="9" fill="white" opacity="0.5" />
                          {/* Subtle shadow */}
                          <ellipse cx="24" cy="26" rx="16" ry="20" fill="black" opacity="0.1" />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              ))}
            </div>

            <motion.p
              className="text-center text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Pop a balloon to share your thoughts!
            </motion.p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
