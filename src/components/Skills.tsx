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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-16 text-center text-foreground">
        Tooling
      </h2>
      <div className="flex flex-wrap gap-8 md:gap-12 justify-center max-w-4xl mx-auto">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="group cursor-pointer flex flex-col items-center gap-4"
            title={skill.name}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-16 md:w-20 md:h-20 flex bg-transparent items-center justify-center md:grayscale md:opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-10 h-10 md:w-14 md:h-14 object-contain filter drop-shadow-sm group-hover:drop-shadow-xl transition-all duration-500 transform group-hover:-translate-y-2"
              />
            </motion.div>
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
