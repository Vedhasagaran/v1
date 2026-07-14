import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Post {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
}

interface SearchDialogProps {
  posts: Post[];
}

export default function SearchDialog({ posts }: Readonly<SearchDialogProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<Post[]>(posts.slice(0, 6));
  const [db, setDb] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [inputFocused, setInputFocused] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsMac(navigator.userAgent.toUpperCase().indexOf('MAC') >= 0);
    }
  }, []);

  const exploreTags = Array.from(new Set(posts.flatMap(p => p.tags))).slice(0, 7);

  useEffect(() => {
    if (!isOpen || db) return;

    async function initOrama() {
      const { create, insertMultiple } = await import('@orama/orama');
      const oramaDb = await create({
        schema: { 
          title: 'string', 
          description: 'string',
          tags: 'string[]'
        }
      });
      await insertMultiple(oramaDb, posts.map(p => ({
        id: p.slug,
        title: p.title,
        description: p.description,
        tags: p.tags,
      })));
      setDb(oramaDb);
    }
    initOrama();
  }, [isOpen, db, posts]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    async function runSearch() {
      if (!debouncedQuery.trim() || !db) {
        setResults(posts.slice(0, 6));
        return;
      }
      const { search } = await import('@orama/orama');
      const res = await search(db, {
        term: debouncedQuery,
        properties: ['title', 'description', 'tags'],
        threshold: 0.2,
      });
      const matchedIds = res.hits.map((h: any) => h.id);
      setResults(posts.filter(p => matchedIds.includes(p.slug)));
    }
    runSearch();
    setActiveIndex(-1);
  }, [debouncedQuery, db, posts]);

  useEffect(() => {
    const onOpen = () => setIsOpen(true);
    window.addEventListener('open-search', onOpen);
    return () => window.removeEventListener('open-search', onOpen);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setInputFocused(false);
      setActiveIndex(-1);
    }
  }, [isOpen]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
      window.location.href = `/blog/${results[activeIndex].slug}`;
    }
  };

  const formatDate = (d: string) =>
    new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(d));

  const pad = (n: number) => String(n + 1).padStart(2, '0');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-start sm:items-center sm:pt-[14vh] sm:px-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40" />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full sm:max-w-xl bg-[var(--card)] border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:min-h-[420px]"
            onClick={e => e.stopPropagation()}
          >
            {/* Dialog Header / Search Input wrapper */}
            <div className="p-4">
              <div
                className={`flex items-center gap-3 px-3.5 h-11 rounded-xl border bg-transparent transition-all duration-300 ${
                  inputFocused 
                    ? 'border-(--accent-color) ring-2 ring-(--accent-color)/15' 
                    : 'border-border hover:border-foreground/20'
                }`}
              >
                <svg
                  className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                    inputFocused ? 'text-(--accent-color)' : 'text-muted-foreground'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search articles..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-border text-[9px] font-mono text-muted-foreground hover:text-foreground transition-colors bg-card"
                >
                  ESC
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="sm:hidden p-1 text-muted-foreground hover:text-foreground"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {exploreTags.length > 0 && (
              <div className="px-4 pt-4 pb-3">
                <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
                  {query ? 'Results for' : 'Explore'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exploreTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        setQuery(prev => prev.toLowerCase() === tag.toLowerCase() ? '' : tag);
                        inputRef.current?.focus();
                      }}
                      className={`px-3 py-1 rounded-full border text-xs transition-all duration-200 ${
                        query.toLowerCase() === tag.toLowerCase()
                          ? 'border-(--accent-color) text-(--accent-color)'
                          : 'border-border text-muted-foreground hover:border-(--accent-color) hover:text-(--accent-color)'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col flex-1 border-t border-border min-h-0">
              <p className="px-4 pt-3 pb-1 text-[10px] font-mono font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
                {query ? 'Articles' : 'Recent'}
              </p>

              <div className="flex-1 overflow-y-auto">
                {results.length > 0 ? (
                  results.map((post, i) => (
                    <a
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex items-baseline gap-3 px-4 py-2.5 transition-colors duration-100 ${
                        i === activeIndex ? 'bg-black/5 dark:bg-white/5' : ''
                      }`}
                    >
                      <span className="text-[10px] font-mono text-muted-foreground shrink-0 w-5 tabular-nums">
                        {pad(i)}
                      </span>
                      <span className="text-(--accent-color) shrink-0 select-none text-xs">#</span>
                      <span className="flex-1 truncate text-sm font-medium text-foreground">
                        {post.title}
                      </span>
                      <time className="shrink-0 text-[11px] font-mono text-muted-foreground tabular-nums hidden sm:block">
                        {formatDate(post.pubDate)}
                      </time>
                    </a>
                  ))
                ) : (
                  <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No articles found.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-[var(--background)]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                  <kbd className="px-1.5 py-0.5 rounded border border-border">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                  <kbd className="px-1.5 py-0.5 rounded border border-border">↵</kbd>
                  open
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
                <span className="hidden sm:inline">
                  <kbd className="px-1.5 py-0.5 rounded border border-border">{isMac ? '⌘K' : 'Ctrl+K'}</kbd> to toggle
                </span>
                <span className="text-[9px] opacity-75">
                  Powered by <span className="font-semibold">Orama</span>
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
