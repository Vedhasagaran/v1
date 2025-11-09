"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { names, languageIndicators, role, company, profileImage } from "../utils/heroData";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % names.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentName = names[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen w-full px-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-5xl">
        {/* Profile Image */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg">
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-center w-full">
          <div className="mb-2 text-xl sm:text-2xl md:text-3xl font-normal text-muted-foreground">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              {["H", "i", " ", "I", "'", "m"].map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.08, duration: 0.1 }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ delay: 0.5, duration: 0.8, repeat: Infinity, repeatDelay: 0 }}
              >
                |
              </motion.span>
            </motion.span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-x-6"
            >
              {currentName.words.map((word, i) => (
                <span key={i} className="inline-block relative group">
                  <span className="relative z-10 transition-all duration-300 group-hover:scale-105 inline-block">
                    {word.text}
                  </span>
                  <span
                    className="absolute left-0 w-full h-2 transition-all duration-300 rounded-sm"
                    style={{
                      bottom: "-0.25rem",
                      backgroundColor: word.color,
                    }}
                  ></span>
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
        </h1>

        <div className="flex items-center justify-center w-full">
          <div className="flex items-center gap-3 md:gap-4 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-1.5 h-1.5 rounded-full ${languageIndicators[currentIndex].dotColor} animate-pulse`}
              ></div>
              <span className="text-xs md:text-sm text-muted-foreground font-medium">
                {languageIndicators[currentIndex].name}
              </span>
            </div>
          </div>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground font-medium">
          {role} <span className="text-foreground">@{company}</span>
        </p>
      </div>
    </div>
  );
}
