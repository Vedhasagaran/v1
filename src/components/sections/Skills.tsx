'use client';

import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import type { Skill } from '@/data/skillsData';

interface SkillsProps {
  skills: Skill[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function Skills({ skills }: SkillsProps) {
  const [animationsEnabled, setAnimationsEnabled] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('animationsEnabled');
      setAnimationsEnabled(saved === 'true');
    };
    handleUpdate();
    window.addEventListener('preferences-changed', handleUpdate);
    return () => window.removeEventListener('preferences-changed', handleUpdate);
  }, []);

  if (animationsEnabled) {
    return null;
  }

  return (
    <div className="w-full">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-16 text-center text-foreground"
      >
        Tooling
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-wrap gap-8 md:gap-12 justify-center max-w-4xl mx-auto"
      >
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="group cursor-pointer flex flex-col items-center gap-4"
            title={skill.name}
          >
            <motion.div
              variants={itemVariants}
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
      </motion.div>
    </div>
  );
}
