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
      <div className="flex items-center justify-center">
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
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-card/50 border border-border hover:border-[var(--accent-color)] hover:bg-card transition-all duration-300 p-2"
            >
              <motion.img
                src={skill.icon}
                alt={skill.name}
                className="w-full h-full object-contain"
                whileHover={{ scale: 1.3, y: -3 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
