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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  useEffect(() => {
    async function initOrama() {
      const oramaDb = await create({
        schema: {
          title: 'string',
          description: 'string',
          tags: 'string[]',
        }
      });

      const docs = posts.map(post => ({
        id: post.slug,
        title: post.title,
        description: post.description,
        tags: post.tags,
      }));

      await insertMultiple(oramaDb, docs);
      setDb(oramaDb);
    }

    initOrama();
  }, [posts]);

  useEffect(() => {
    async function performSearch() {
      let filtered = posts;

      if (searchQuery.trim() && db) {
        const results = await search(db, {
          term: searchQuery,
          properties: ['title', 'description', 'tags'],
          threshold: 0.2,
        });
        const matchedIds = results.hits.map(hit => hit.id);
        filtered = posts.filter(post => matchedIds.includes(post.slug));
      }

      if (selectedTag) {
        filtered = filtered.filter(post => post.tags.includes(selectedTag));
      }

      setFilteredPosts(filtered);
    }

    performSearch();
  }, [searchQuery, selectedTag, db, posts]);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(dateString));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 mb-12">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-(--accent-color) transition-colors duration-300 shadow-sm"
        />

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border transition-all duration-300 ${
                selectedTag === null
                  ? 'bg-(--accent-color) border-(--accent-color) text-white'
                  : 'bg-transparent border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-(--accent-color) border-(--accent-color) text-white'
                    : 'bg-transparent border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-y border-border">
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.a
                layout
                key={post.slug}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group block border-b border-border last:border-b-0 py-7 md:py-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <time className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        {formatDate(post.pubDate)}
                      </time>
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[9px] md:text-[10px] font-semibold px-2 py-0.5 rounded-full border border-border text-muted-foreground uppercase tracking-widest"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-(--accent-color) transition-colors duration-300 mb-3">
                      {post.title}
                    </h3>

                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl font-light">
                      {post.description}
                    </p>
                  </div>

                  <span className="mt-1.5 inline-flex items-center gap-1.5 text-(--accent-color) transition-all duration-300 group-hover:translate-x-1">
                    <span className="text-[11px] md:text-xs font-semibold uppercase tracking-widest">Read</span>
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </motion.a>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center text-muted-foreground"
            >
              No articles found matching your criteria.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
