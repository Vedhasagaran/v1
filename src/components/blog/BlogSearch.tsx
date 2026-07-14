import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { create, insertMultiple, search } from '@orama/orama';

interface Post {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
}

interface BlogSearchProps {
  posts: Post[];
}

export default function BlogSearch({ posts }: Readonly<BlogSearchProps>) {
  const [db, setDb] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

  useEffect(() => {
    async function initOrama() {
      const oramaDb = await create({
        schema: {
          title: 'string',
          description: 'string',
        }
      });
      const docs = posts.map(post => ({
        id: post.slug,
        title: post.title,
        description: post.description,
      }));
      await insertMultiple(oramaDb, docs);
      setDb(oramaDb);
    }
    initOrama();
  }, [posts]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    async function performSearch() {
      let filtered = posts;
      if (debouncedQuery.trim() && db) {
        const results = await search(db, {
          term: debouncedQuery,
          properties: ['title', 'description'],
          threshold: 0.2,
        });
        const matchedIds = results.hits.map(hit => hit.id);
        filtered = posts.filter(post => matchedIds.includes(post.slug));
      }
      setFilteredPosts(filtered);
    }
    performSearch();
  }, [debouncedQuery, db, posts]);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
    }).format(new Date(dateString));
  };

  const postsByYear = filteredPosts.reduce<Record<number, Post[]>>((groups, post) => {
    const year = new Date(post.pubDate).getFullYear();
    (groups[year] ??= []).push(post);
    return groups;
  }, {});
  const years = Object.keys(postsByYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-6 mb-3">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground">
          Writing
        </h1>
        <div className="relative">
          <svg
            className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pl-5 pr-0 w-36 focus:w-52 bg-transparent border-0 border-b border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-(--accent-color) transition-all duration-300"
          />
        </div>
      </div>

      <p className="text-base text-muted-foreground font-light mb-10">
        Thoughts, guides, and insights on code, architecture, and technology.
      </p>

      <AnimatePresence mode="wait">
        {years.length > 0 ? (
          <motion.div
            key={debouncedQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {years.map(year => (
              <section key={year}>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-muted-foreground">
                    {year}
                  </span>
                  <div className="flex-1 h-px bg-(--accent-color) opacity-30" />
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {postsByYear[year].length} {postsByYear[year].length === 1 ? 'post' : 'posts'}
                  </span>
                </div>

                <div>
                  {postsByYear[year].map((post, i) => (
                    <motion.a
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex items-baseline justify-between gap-4 py-2"
                    >
                      <span className="min-w-0 flex items-baseline gap-2 overflow-hidden text-sm md:text-base font-medium text-foreground group-hover:text-(--accent-color) transition-colors duration-200">
                        <span className="text-(--accent-color) select-none shrink-0">#</span>
                        <span className="truncate">{post.title}</span>
                      </span>
                      <time
                        dateTime={post.pubDate}
                        className="shrink-0 text-[11px] font-mono text-muted-foreground tabular-nums"
                      >
                        {formatDate(post.pubDate)}
                      </time>
                    </motion.a>
                  ))}
                </div>
              </section>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-16 text-center text-sm text-muted-foreground"
          >
            No articles found.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
