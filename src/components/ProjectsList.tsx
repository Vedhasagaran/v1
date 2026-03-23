'use client';

import { motion } from 'framer-motion';
import type { Project } from '../utils/projectsData';

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

export default function ProjectsList({ projects }: Readonly<ProjectsListProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <h2 className="section-title text-4xl md:text-5xl font-extrabold tracking-tighter mb-12 text-foreground">
        Projects
      </h2>

      <div className="border-y border-border">
        {projects.map((project, index) => (
          <motion.a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group block border-b border-border last:border-b-0 py-7 md:py-8"
          >
            <div className="flex items-start justify-between gap-5">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-(--accent-color) transition-colors duration-300">
                    {project.title}
                  </h3>
                  {project.stats && (
                    <span className="text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full border border-border text-muted-foreground uppercase tracking-widest">
                      {getProjectMetaText(project.stats)}
                    </span>
                  )}
                </div>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] md:text-xs text-muted-foreground uppercase tracking-widest font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <span className="mt-1 inline-flex items-center gap-1.5 text-(--accent-color) transition-all duration-300 group-hover:translate-x-1">
                <span className="text-[11px] md:text-xs font-semibold uppercase tracking-widest">View</span>
                <span aria-hidden="true">↗</span>
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
