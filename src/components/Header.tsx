'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const sectionIds = ['home', ...navItems.map((item) => item.href.slice(1))];

    const updateActiveSection = () => {
      const threshold = Math.max(140, window.innerHeight * 0.4);
      let current = 'home';

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) {
          continue;
        }

        if (section.getBoundingClientRect().top <= threshold) {
          current = id;
        }
      }

      // Ensure the final section can still become active near page end.
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 40;
      if (nearBottom && document.getElementById('contact')) {
        current = 'contact';
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 z-40 w-[min(94%,960px)]"
    >
      <div className="rounded-2xl md:rounded-full border border-border bg-card/80 backdrop-blur-md px-4 py-2.5 md:px-6 md:py-3 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#home"
            className={`text-sm md:text-base font-extrabold tracking-tight transition-colors duration-300 ${
              activeSection === 'home'
                ? 'text-(--accent-color)'
                : 'text-foreground hover:text-(--accent-color)'
            }`}
            onClick={closeMobileMenu}
          >
            Vedhasagaran
          </a>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-xs uppercase tracking-[0.16em] font-semibold transition-colors duration-300 ${
                  activeSection === item.href.slice(1)
                    ? 'text-(--accent-color)'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-full border border-border text-foreground"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              id="mobile-nav"
              aria-label="Primary mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-3 rounded-xl border border-border bg-card px-2 py-2"
            >
              {navItems.map((item) => (
                <a
                  key={`mobile-${item.href}`}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`block rounded-lg px-3 py-2 text-xs uppercase tracking-[0.14em] font-semibold transition-colors duration-300 ${
                    activeSection === item.href.slice(1)
                      ? 'text-(--accent-color) bg-black/5 dark:bg-white/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
