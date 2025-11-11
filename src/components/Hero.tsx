"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { names, languageIndicators, role, company, profileImage, socialLinks } from "../utils/heroData";
import BlogList from "./BlogList";
import ProjectsList from "./ProjectsList";
import SkillsGravity from "./SkillsGravity";
import Skills from "./Skills";
import { usePreferences } from "../contexts/PreferencesContext";
import type { Project } from "../utils/projectsData";
import type { Skill } from "../utils/skillsData";

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
}

interface HeroProps {
  blogPosts?: MediumPost[];
  projects?: Project[];
  skills?: Skill[];
}

export default function Hero({ blogPosts = [], projects = [], skills = [] }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedLanguageIndex, setDisplayedLanguageIndex] = useState(0);
  const profileImageRef = useRef<HTMLDivElement>(null);
  const { animationsEnabled } = usePreferences();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % names.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update language badge with 0.3s delay when currentIndex changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedLanguageIndex(currentIndex);
    }, 300);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const currentName = names[currentIndex];

  return (
    <div className="w-full">
      {/* Gravitational Skills Effect - Only when animations enabled */}
      {animationsEnabled && skills.length > 0 && <SkillsGravity skills={skills} targetRef={profileImageRef} />}

      {/* Hero Section - Centered */}
      <div className="flex items-center justify-center min-h-[60vh] w-full px-4 pt-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 w-full max-w-4xl">
        {/* Text Content - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6 w-full md:w-130"
        >
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight text-center md:text-left">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="inline-flex flex-wrap gap-x-3 items-baseline"
            >
              {/* Hi I'm */}
              <span className="text-base sm:text-lg md:text-xl font-normal text-muted-foreground">
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
              </span>

              {/* Name */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="inline-flex flex-wrap gap-x-4"
                  onAnimationComplete={() => {
                    // Trigger language badge update after name animation completes
                  }}
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
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </h1>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3 text-center md:text-left">
            <p className="text-base md:text-lg text-muted-foreground font-medium">
              {role} <span className="text-foreground">@{company}</span>
            </p>

            <div className="flex items-center gap-3 md:gap-4 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${languageIndicators[displayedLanguageIndex].dotColor} animate-pulse`}
                ></div>
                <span className="text-xs md:text-sm text-muted-foreground font-medium">
                  {languageIndicators[displayedLanguageIndex].name}
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm border border-border hover:scale-110 hover:shadow-lg transition-all duration-300"
                title={social.name}
              >
                {social.icon === "linkedin" && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )}
                {social.icon === "github" && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                )}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Profile Image - Right Side */}
        <motion.div
          ref={profileImageRef}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg flex-shrink-0"
        >
          <img
            src={profileImage}
            alt="Profile"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </motion.div>
        </div>
      </div>

      {/* Content Below Hero - Skills, Blog and Projects */}
      <div className="flex flex-col items-center justify-center gap-16 w-full px-4 pb-20">
        {/* Skills Section - Only when animations disabled */}
        {!animationsEnabled && skills.length > 0 && (
          <div className="w-full max-w-4xl">
            <Skills skills={skills} />
          </div>
        )}

        {/* Blog Posts Section */}
        <div className="w-full max-w-4xl">
          {blogPosts.length > 0 && <BlogList posts={blogPosts} />}
        </div>

        {/* Projects Section */}
        <div className="w-full max-w-4xl">
          {projects.length > 0 && <ProjectsList projects={projects} />}
        </div>
      </div>
    </div>
  );
}
