'use client';

import { motion } from 'framer-motion';
import type { Project } from '../utils/projectsData';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
      className="group block p-8 -mx-8 bg-transparent rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-500"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <h3 className="text-3xl font-extrabold tracking-tight text-foreground group-hover:text-[var(--accent-color)] transition-colors duration-300">
            {project.title}
          </h3>
          {project.stats && (
            <span className="self-start text-xs font-semibold px-4 py-1.5 rounded-full bg-transparent border border-border text-muted-foreground uppercase tracking-widest">
              {project.stats.label}
            </span>
          )}
        </div>

        <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-3xl">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-muted-foreground uppercase tracking-widest font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* External link icon */}
        <div className="flex items-center gap-3 mt-4 text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-[var(--accent-color)] transition-colors duration-300">
          <span>View Project</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}
