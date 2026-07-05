'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import type { Project } from '@/data/projectsData';

interface ProjectsListProps {
  projects: Project[];
}

function getProjectMetaText(stats: Project['stats']) {
  if (!stats) {
    return '';
  }

  if (stats.label.toLowerCase() === 'status') {
    return stats.value;
  }

  return `${stats.label} ${stats.value}`;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } },
};

function ProjectCard({ project }: Readonly<{ project: Project }>) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      className="group flex flex-col h-full bg-[var(--card)] border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-(--accent-color)/50 hover:-translate-y-1 transition-all duration-300"
    >
      <div className={`relative aspect-video w-full overflow-hidden border-b border-border flex items-center justify-center transition-colors duration-300 ${
        project.objectFit === 'contain' ? 'bg-white' : 'bg-neutral-900/5 dark:bg-white/5'
      }`}>
        <img
          src={project.image ?? "/projects/default-cover.png"}
          alt={project.title}
          className={`transform group-hover:scale-105 transition-transform duration-500 ${
            project.objectFit === 'contain' 
              ? 'max-h-[60%] max-w-[80%] object-contain' 
              : 'w-full h-full object-cover'
          }`}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1 p-5 md:p-6 justify-between gap-5">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-start justify-between gap-2.5">
            <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-(--accent-color) transition-colors duration-300">
              {project.title}
            </h3>
            {project.stats && (
              <span className="shrink-0 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-border text-muted-foreground uppercase tracking-wider bg-neutral-900/5 dark:bg-white/5">
                {getProjectMetaText(project.stats)}
              </span>
            )}
          </div>

          <div className="text-sm text-muted-foreground leading-relaxed font-light">
            <span className={isExpanded ? "" : "line-clamp-2"}>
              {project.description}
            </span>
            <button
              onClick={toggleExpand}
              className="inline-flex items-center ml-1 text-xs font-semibold text-(--accent-color) hover:underline focus:outline-none focus:ring-0 cursor-pointer"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Show less description" : "Show more description"}
            >
              {isExpanded ? " Less" : " ..."}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-auto">
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-1.5 overflow-hidden"
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-neutral-900/5 dark:bg-white/5 border border-border/30"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <span className="inline-flex items-center gap-1.5 text-(--accent-color) transition-colors duration-300">
            <span className="text-[11px] md:text-xs font-semibold uppercase tracking-widest">View</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function ProjectsList({ projects }: Readonly<ProjectsListProps>) {
  return (
    <div className="w-full">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="section-title text-4xl md:text-5xl font-extrabold tracking-tighter mb-12 text-foreground"
      >
        Projects
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </div>
  );
}
