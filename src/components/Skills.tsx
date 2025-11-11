'use client';

import { motion } from 'framer-motion';
import type { Skill } from '../utils/skillsData';

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="w-full"
    >
      <h2
        className="text-2xl md:text-3xl font-bold mb-8 text-center"
        style={{ color: 'var(--accent-color)' }}
      >
        Skills
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="group cursor-pointer"
            title={skill.name}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              className="w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center gap-2 bg-card/50 border border-border hover:border-[var(--accent-color)] hover:bg-card transition-all duration-300 p-2 rounded-lg"
            >
              <motion.img
                src={skill.icon}
                alt={skill.name}
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ duration: 0.2 }}
              />
              <span className="text-xs text-muted-foreground text-center leading-tight hidden md:block">
                {skill.name}
              </span>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
