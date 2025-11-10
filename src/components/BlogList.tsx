'use client';

import { motion } from 'framer-motion';

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
}

interface BlogListProps {
  posts: MediumPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(dateString));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-left" style={{ color: 'var(--accent-color)' }}>
        Recent Posts
      </h2>

      <div className="space-y-3">
        {posts.map((post, index) => (
          <motion.div
            key={post.link}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
          >
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline gap-6 text-left hover:translate-x-2 transition-transform duration-200"
            >
              <time className="text-base text-muted-foreground whitespace-nowrap flex-shrink-0 w-32">
                {formatDate(post.pubDate)}
              </time>
              <span className="text-base text-foreground underline decoration-1 underline-offset-4 group-hover:text-[var(--accent-color)] transition-colors duration-200">
                {post.title}
              </span>
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-6 text-left"
      >
        <a
          href="https://medium.com/@vedhasagaran7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-500 transition-colors duration-200"
        >
          View all posts on Medium
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
}
