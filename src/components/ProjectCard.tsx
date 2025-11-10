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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="group block p-6 rounded-lg border border-border bg-card/50 hover:bg-card hover:shadow-lg hover:border-[var(--accent-color)] transition-all duration-300"
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-[var(--accent-color)] transition-colors duration-200">
            {project.title}
          </h3>
          {project.stats && (
            <span className="text-xs px-2 py-1 rounded bg-card border border-border whitespace-nowrap">
              {project.stats.label}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-card/80 text-muted-foreground border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* External link icon */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-[var(--accent-color)] transition-colors duration-200">
          <span>View project</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
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
        </div>
      </div>
    </motion.a>
  );
}
