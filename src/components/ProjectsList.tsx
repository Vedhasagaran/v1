'use client';

import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import type { Project } from '../utils/projectsData';

interface ProjectsListProps {
  projects: Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="w-full"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-left" style={{ color: 'var(--accent-color)' }}>
        Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
