'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { Skill } from '../utils/skillsData';

interface SkillsGravityProps {
  skills: Skill[];
  targetRef: React.RefObject<HTMLDivElement | null>;
}

interface SkillPosition {
  skill: Skill;
  startX: number;
  startY: number;
}

export default function SkillsGravity({ skills, targetRef }: SkillsGravityProps) {
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Calculate target position (profile image center)
    const updatePosition = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        setTargetPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetRef]);

  // Generate random positions for each skill
  const getRandomPosition = () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {skills.map((skill, index) => {
        const startPos = getRandomPosition();

        return (
          <motion.img
            key={`${skill.name}-${key}-${index}`}
            src={skill.icon}
            alt={skill.name}
            className="absolute w-12 h-12 md:w-14 md:h-14 object-contain"
            initial={{
              x: startPos.x,
              y: startPos.y,
              opacity: 0,
              scale: 0.8,
              rotate: 0,
            }}
            animate={{
              x: targetPosition.x - 28,
              y: targetPosition.y - 28,
              opacity: [0, 0.8, 0.6, 0],
              scale: [0.8, 1, 0.7, 0.4],
              rotate: 720,
            }}
            transition={{
              duration: 5,
              delay: index * 0.4,
              ease: [0.6, 0.05, 0.01, 0.9],
              repeat: Infinity,
              repeatDelay: (skills.length - index) * 0.4,
            }}
          />
        );
      })}
    </div>
  );
}
