'use client';

import { motion } from 'framer-motion';

const contactLinks = [
  {
    label: "Email",
    value: "vedhasagaran7@gmail.com",
    href: "mailto:vedhasagaran7@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "/in/vedhasagaran-m",
    href: "https://www.linkedin.com/in/vedhasagaran-m/",
  },
  {
    label: "GitHub",
    value: "github.com/vedhasagaran",
    href: "https://github.com/vedhasagaran",
  },
];

export default function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <h2 className="section-title text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-foreground">
        Get in Touch
      </h2>
      <p className="text-base md:text-lg text-muted-foreground font-light mb-14">
        Open to interesting conversations, collaborations, or just a good chat. Reach out anytime.
      </p>

      <div className="flex flex-col gap-6">
        {contactLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-8 p-4 -mx-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground w-20 shrink-0">
              {link.label}
            </span>
            <span className="text-lg md:text-xl font-medium text-foreground group-hover:text-(--accent-color) transition-colors duration-300 flex items-center gap-3">
              {link.value}
              <svg
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}
