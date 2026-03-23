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

export default function BlogList({ posts }: Readonly<BlogListProps>) {
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(dateString));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <h2 className="section-title text-4xl md:text-5xl font-extrabold tracking-tighter mb-12 text-foreground">
        Writing
      </h2>

      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.link}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 p-4 -mx-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
            >
              <time className="text-sm font-mono text-muted-foreground uppercase tracking-wider flex-shrink-0 sm:w-36">
                {formatDate(post.pubDate)}
              </time>
              <span className="text-lg md:text-xl font-medium text-foreground group-hover:text-[var(--accent-color)] transition-colors duration-300">
                {post.title}
              </span>
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 text-left"
      >
        <a
          href="https://medium.com/@vedhasagaran7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 group"
        >
          <span>View all posts</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
}
