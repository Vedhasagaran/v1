'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/settings/ThemeToggle';
import { ASSETS } from '@/data/assets';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  {
    label: 'Resources',
    children: [
      { label: 'Developer Portfolios', href: '/portfolios' }
    ]
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const { isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHome, setIsHome] = useState(true);
  const [hasAnnouncement, setHasAnnouncement] = useState(false);
  const [isMac, setIsMac] = useState(true);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsMac(navigator.userAgent.toUpperCase().indexOf('MAC') >= 0);
    }
  }, []);

  useEffect(() => {
    const checkAnnouncement = () => {
      const isDismissed = localStorage.getItem('announcement-dismissed') === 'true';
      setHasAnnouncement(!isDismissed);
    };
    checkAnnouncement();

    const handleAnnouncementChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setHasAnnouncement(customEvent.detail.visible);
    };

    window.addEventListener('announcement-state-change', handleAnnouncementChange);

    return () => {
      window.removeEventListener('announcement-state-change', handleAnnouncementChange);
    };
  }, []);

  useEffect(() => {
    const pathname = window.location.pathname;
    setIsHome(pathname === '/' || pathname === '');

    if (pathname.startsWith('/experience')) {
      setActiveSection('experience');
    } else if (pathname.startsWith('/projects')) {
      setActiveSection('projects');
    } else if (pathname.startsWith('/portfolios')) {
      setActiveSection('portfolios');
    } else if (pathname.startsWith('/blog')) {
      setActiveSection('blog');
    } else if (pathname.startsWith('/contact')) {
      setActiveSection('contact');
    } else {
      const updateActiveSection = () => {
        const threshold = Math.max(140, window.innerHeight * 0.4);
        let current = 'home';
        const aboutSection = document.getElementById('about');
        if (aboutSection && aboutSection.getBoundingClientRect().top <= threshold) {
          current = 'about';
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
    }
  }, []);

  const isLinkActive = (item: NavItem) => {
    if (item.children) {
      return item.children.some(child => activeSection === child.href.replace(/^\//, ''));
    }
    if (item.href?.startsWith('/#')) {
      return activeSection === item.href.split('#')[1];
    }
    return activeSection === item.href?.replace(/^\//, '');
  };

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-40 w-[min(94%,960px)] transition-all duration-300 ${
        hasAnnouncement
          ? 'top-[52px] md:top-[56px]'
          : 'top-3 md:top-4'
      }`}
    >
      <div className="rounded-2xl md:rounded-full border border-border bg-card/80 backdrop-blur-md px-4 py-1.5 md:px-5 md:py-2 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <a
            href={isHome ? "#home" : "/"}
            className="group flex items-center gap-2 text-xs md:text-sm font-extrabold tracking-tight"
            onClick={closeMobileMenu}
          >
            <div className="logo-shine-container h-5 w-5 md:h-6 md:w-6 rounded-lg">
              <img
                src={isDark ? ASSETS.logos.dark : ASSETS.logos.light}
                alt="Logo"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="logo-shine-effect" />
            </div>
            <span className={`transition-colors duration-300 ${
              activeSection === 'home'
                ? 'text-(--accent-color)'
                : 'text-foreground hover:text-(--accent-color)'
            }`}>
              Vedhasagaran
            </span>
          </a>

          <div className="flex items-center gap-3">
            <nav aria-label="Primary" className="hidden md:flex items-center gap-1.5" onMouseLeave={() => setHoveredIndex(null)}>
              {navItems.map((item, idx) => {
                if (item.children) {
                  return (
                    <div
                      key={item.label}
                      className="relative py-1.5"
                      onMouseEnter={() => {
                        setActiveDropdown(item.label.toLowerCase());
                        setHoveredIndex(idx);
                      }}
                      onMouseLeave={() => {
                        setActiveDropdown(null);
                        setHoveredIndex(null);
                      }}
                    >
                      <button
                        type="button"
                        className={`relative px-3 py-1.5 text-xs uppercase tracking-[0.16em] font-semibold transition-colors duration-300 flex items-center gap-1 cursor-pointer select-none focus:outline-none ${
                          isLinkActive(item)
                            ? 'text-(--accent-color)'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {hoveredIndex === idx && (
                          <motion.span
                            layoutId="nav-hover-pill"
                            className="absolute inset-0 bg-neutral-900/5 dark:bg-white/5 border border-(--accent-color)/30 rounded-full -z-10"
                            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                          />
                        )}
                        <span>{item.label}</span>
                        <svg
                          className={`h-3 w-3 transition-transform duration-200 ${
                            activeDropdown === item.label.toLowerCase() ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.label.toLowerCase() && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 rounded-xl border border-border bg-[var(--card)] p-1.5 shadow-lg z-50"
                          >
                            {item.children.map((child) => (
                              <a
                                key={child.href}
                                href={child.href}
                                className={`block rounded-lg px-3 py-2 text-xs font-semibold tracking-wide transition-colors ${
                                  activeSection === child.href.replace(/^\//, '')
                                    ? 'text-(--accent-color) bg-neutral-900/5 dark:bg-white/5'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-neutral-900/5 dark:hover:bg-white/5'
                                }`}
                              >
                                {child.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    className={`relative px-3 py-1.5 text-xs uppercase tracking-[0.16em] font-semibold transition-colors duration-300 ${
                      isLinkActive(item)
                        ? 'text-(--accent-color)'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {hoveredIndex === idx && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 bg-neutral-900/5 dark:bg-white/5 border border-(--accent-color)/30 rounded-full -z-10"
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      />
                    )}
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <button
              type="button"
              aria-label={`Search articles (${isMac ? '⌘K' : 'Ctrl+K'})`}
              onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
              className="hidden md:flex items-center gap-2 h-8 pl-2.5 pr-3 rounded-full bg-neutral-900/5 dark:bg-white/5 hover:bg-neutral-900/10 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-300 shrink-0 select-none"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <kbd className="text-[10px] font-mono opacity-80 tracking-tight">{isMac ? '⌘K' : 'Ctrl+K'}</kbd>
            </button>

            <ThemeToggle />

            <button
              type="button"
              aria-label="Search articles"
              onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
              className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-full border border-border text-muted-foreground"
            >
              <svg className="h-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation menu"
              className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-full border border-border text-foreground"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <svg
                className="h-3.5 h-3.5"
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
              {navItems.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.label} className="flex flex-col gap-1 py-1">
                      <span className="block px-3 pt-1 text-[10px] uppercase tracking-[0.16em] font-bold text-muted-foreground">
                        {item.label}
                      </span>
                      {item.children.map((child) => (
                        <a
                          key={`mobile-${child.href}`}
                          href={child.href}
                          onClick={closeMobileMenu}
                          className={`block rounded-lg pl-6 pr-3 py-2 text-xs uppercase tracking-[0.14em] font-semibold transition-colors duration-300 ${
                            activeSection === child.href.replace(/^\//, '')
                              ? 'text-(--accent-color) bg-black/5 dark:bg-white/10'
                              : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                          }`}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  );
                }

                return (
                  <a
                    key={`mobile-${item.href}`}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`block rounded-lg px-3 py-2 text-xs uppercase tracking-[0.14em] font-semibold transition-colors duration-300 ${
                      isLinkActive(item)
                        ? 'text-(--accent-color) bg-black/5 dark:bg-white/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
