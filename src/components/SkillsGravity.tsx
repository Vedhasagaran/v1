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

  // Generate position from screen edges for cleaner spawn
  const getEdgePosition = (index: number) => {
    const side = index % 4; // 0=top, 1=right, 2=bottom, 3=left
    const offset = (Math.random() * 0.8 + 0.1); // 10-90% along the edge

    switch(side) {
      case 0: return { x: window.innerWidth * offset, y: -50 }; // Top
      case 1: return { x: window.innerWidth + 50, y: window.innerHeight * offset }; // Right
      case 2: return { x: window.innerWidth * offset, y: window.innerHeight + 50 }; // Bottom
      case 3: return { x: -50, y: window.innerHeight * offset }; // Left
      default: return { x: 0, y: 0 };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {skills.map((skill, index) => {
        const startPos = getEdgePosition(index);

        return (
          <motion.img
            key={`${skill.name}-${key}-${index}`}
            src={skill.icon}
            alt={skill.name}
            className="absolute w-10 h-10 md:w-12 md:h-12 object-contain opacity-70"
            initial={{
              x: startPos.x,
              y: startPos.y,
              opacity: 0,
              scale: 0.5,
              rotate: 0,
            }}
            animate={{
              x: targetPosition.x - 24,
              y: targetPosition.y - 24,
              opacity: [0, 0.7, 0.5, 0],
              scale: [0.5, 1, 0.6, 0.3],
              rotate: 360,
            }}
            transition={{
              duration: 6,
              delay: index * 0.5,
              ease: [0.4, 0, 0.2, 1],
              repeat: Infinity,
              repeatDelay: (skills.length - index) * 0.5,
            }}
          />
        );
      })}
    </div>
  );
}
