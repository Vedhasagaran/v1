'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import portfoliosData from '@/data/portfolios.json';

interface Portfolio {
  name: string;
  url: string;
  tagline?: string;
}

const ITEMS_PER_PAGE = 24;

const QUICK_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Full Stack', value: 'full stack' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'AI & ML', value: 'ai' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Designer', value: 'design' }
];

export default function PortfoliosList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activePreview, setActivePreview] = useState<Portfolio | null>(null);

  const portfolios = portfoliosData as Portfolio[];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFilter]);

  const filteredPortfolios = useMemo(() => {
    return portfolios.filter(p => {
      const name = p.name.toLowerCase();
      const tagline = (p.tagline || '').toLowerCase();
      const url = p.url.toLowerCase();
      const query = searchQuery.toLowerCase();

      const matchesSearch = name.includes(query) || tagline.includes(query) || url.includes(query);

      if (!matchesSearch) return false;
      if (selectedFilter === 'all') return true;

      if (selectedFilter === 'full stack') {
        return tagline.includes('full stack') || tagline.includes('fullstack') || tagline.includes('mern');
      }
      if (selectedFilter === 'frontend') {
        return tagline.includes('frontend') || tagline.includes('front-end') || tagline.includes('react') || tagline.includes('web developer');
      }
      if (selectedFilter === 'backend') {
        return tagline.includes('backend') || tagline.includes('back-end') || tagline.includes('node') || tagline.includes('systems') || tagline.includes('architect');
      }
      if (selectedFilter === 'ai') {
        return tagline.includes('ai') || tagline.includes('ml') || tagline.includes('machine learning') || tagline.includes('data');
      }
      if (selectedFilter === 'mobile') {
        return tagline.includes('mobile') || tagline.includes('ios') || tagline.includes('android') || tagline.includes('flutter') || tagline.includes('react native');
      }
      if (selectedFilter === 'design') {
        return tagline.includes('design') || tagline.includes('ux') || tagline.includes('ui');
      }

      return true;
    });
  }, [portfolios, searchQuery, selectedFilter]);

  const totalPages = Math.ceil(filteredPortfolios.length / ITEMS_PER_PAGE);

  const paginatedPortfolios = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPortfolios.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPortfolios, currentPage]);

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('...');
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = (marginClass: string) => {
    if (totalPages <= 1) return null;
    return (
      <div className={`flex items-center justify-center gap-1.5 flex-wrap ${marginClass}`}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-border bg-[var(--card)] text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Previous page"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-1.5 text-muted-foreground text-sm">
                ...
              </span>
            );
          }

          return (
            <button
              key={`page-${page}`}
              onClick={() => handlePageChange(page as number)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                currentPage === page
                  ? 'bg-(--accent-color) text-white border-(--accent-color)'
                  : 'border-border bg-[var(--card)] text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-border bg-[var(--card)] text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Next page"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  const cleanDisplayUrl = (url: string) => {
    return url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
  };

  const getScreenshotUrl = (url: string) => {
    let target = url;
    if (!/^https?:\/\//i.test(url)) {
      target = `https://${url}`;
    }
    return `https://image.thum.io/get/width/600/crop/800/maxAge/24/${target}`;
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[var(--card)] border border-border p-6 rounded-2xl shadow-sm">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search portfolios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-[var(--background)] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-(--accent-color) transition-colors text-sm"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-center">
          {QUICK_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                selectedFilter === filter.value
                  ? 'bg-(--accent-color) text-white border-(--accent-color)'
                  : 'bg-[var(--background)] text-muted-foreground border-border hover:text-foreground hover:border-foreground'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>
          Showing {filteredPortfolios.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}–
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredPortfolios.length)} of {filteredPortfolios.length} portfolios
        </span>
        {selectedFilter !== 'all' && (
          <span className="capitalize font-semibold text-(--accent-color)">
            Filter: {selectedFilter}
          </span>
        )}
      </div>

      {renderPagination("mt-2 mb-4")}

      {filteredPortfolios.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 bg-[var(--card)] border border-border rounded-2xl shadow-sm text-center">
          <svg
            className="h-12 w-12 text-muted-foreground mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-bold text-foreground mb-1">No portfolios found</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Try adjusting your search query or switching filters to find more entries.
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {paginatedPortfolios.map((portfolio, idx) => (
              <PortfolioCard
                key={`${portfolio.url}-${idx}`}
                portfolio={portfolio}
                onPreview={() => setActivePreview(portfolio)}
                cleanDisplayUrl={cleanDisplayUrl}
                getScreenshotUrl={getScreenshotUrl}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {renderPagination("mt-8")}

      <AnimatePresence>
        {activePreview && (
          <PreviewModal
            portfolio={activePreview}
            onClose={() => setActivePreview(null)}
            cleanDisplayUrl={cleanDisplayUrl}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface CardProps {
  portfolio: Portfolio;
  onPreview: () => void;
  cleanDisplayUrl: (url: string) => string;
  getScreenshotUrl: (url: string) => string;
}

function PortfolioCard({ portfolio, onPreview, cleanDisplayUrl, getScreenshotUrl }: CardProps) {
  const [imageState, setImageState] = useState<'loading' | 'success' | 'error'>('loading');

  const displayUrl = cleanDisplayUrl(portfolio.url);
  const screenshotUrl = getScreenshotUrl(portfolio.url);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col h-full bg-[var(--card)] border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-(--accent-color)/50 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-video w-full overflow-hidden border-b border-border flex items-center justify-center bg-neutral-900/5 dark:bg-white/5 transition-colors duration-300">
        {imageState !== 'error' && (
          <img
            src={screenshotUrl}
            alt={`${portfolio.name} site preview`}
            className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ${
              imageState === 'success' ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageState('success')}
            onError={() => setImageState('error')}
            loading="lazy"
          />
        )}

        {imageState === 'loading' && (
          <div className="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-800/50 animate-pulse flex items-center justify-center">
            <svg className="animate-spin h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        )}

        {imageState === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 text-center">
            <div className="h-10 w-10 rounded-full bg-(--accent-color)/10 text-(--accent-color) flex items-center justify-center font-bold text-sm tracking-wider mb-2">
              {getInitials(portfolio.name)}
            </div>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              Preview Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-(--accent-color) transition-colors line-clamp-1">
            {portfolio.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
            {portfolio.tagline || 'Developer Portfolio'}
          </p>
          <span className="text-[10px] text-muted-foreground font-medium tracking-wide truncate">
            {displayUrl}
          </span>
        </div>

        <div className="flex gap-2 mt-auto pt-2 border-t border-border/50">
          <button
            onClick={onPreview}
            className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-foreground border border-border bg-[var(--card)] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-center gap-1"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Live Preview
          </button>
          <a
            href={portfolio.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-(--accent-color) hover:opacity-90 transition-opacity flex items-center justify-center"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

interface ModalProps {
  portfolio: Portfolio;
  onClose: () => void;
  cleanDisplayUrl: (url: string) => string;
}

function PreviewModal({ portfolio, onClose, cleanDisplayUrl }: ModalProps) {
  const displayUrl = cleanDisplayUrl(portfolio.url);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.35 }}
        className="relative flex flex-col w-full h-[85vh] max-w-6xl bg-[var(--card)] border border-border rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-6 py-3 sm:py-4 border-b border-border bg-[var(--card)]">
          <div className="flex flex-col gap-1 w-full sm:w-auto pr-8 sm:pr-0">
            <h3 className="text-base font-bold text-foreground flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span>{portfolio.name}</span>
              <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-muted-foreground border border-border truncate max-w-[150px] sm:max-w-[200px]">
                {displayUrl}
              </span>
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {portfolio.tagline || 'Developer Portfolio'}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <a
              href={portfolio.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-(--accent-color) hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open Site
            </a>
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 rounded-lg border border-border bg-[var(--card)] text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close preview"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 bg-white relative">
          <iframe
            src={portfolio.url}
            className="w-full h-full border-0"
            title={`${portfolio.name} live preview`}
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>

        <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-t border-border bg-[var(--background)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] text-muted-foreground">
          <span>
            Previews are subject to security configurations (some pages may block rendering).
          </span>
          <span>
            Source: emmabostian/developer-portfolios
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
