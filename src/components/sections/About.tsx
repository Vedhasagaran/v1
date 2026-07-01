'use client';

import { motion } from 'framer-motion';

const paragraphs = [
  "I'm someone who enjoys understanding things — not just how they work, but why they exist in the first place.",
  "I spend a lot of my time building — sometimes it's code, sometimes it's ideas, and sometimes it's just a better version of myself. Technology is a big part of my life, but it's not the only thing that defines me. What really drives me is curiosity — about systems, people, emotions, and the small patterns that shape our everyday lives.",
  "I like observing. The way people think, the way they react, the way small experiences stay with us longer than we expect. That curiosity naturally flows into the things I create — whether it's a product, a piece of content, or even a simple interaction.",
  "Outside of work, I'm constantly exploring something new. Lately, it's been things like chess, guitar, fitness, and even trying to get comfortable with expressing myself more — through content, movement, or just being more present.",
  "I don't believe in staying one version of myself. I'm always evolving — learning, unlearning, and rebuilding.",
  "At the core of it, I'm someone who wants to grow, create meaningful things, and live a life that feels intentional.",
];

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <h2 className="section-title text-4xl md:text-5xl font-extrabold tracking-tighter mb-12 text-foreground">
        About
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Currently</p>
          <p className="text-base font-semibold text-foreground">Software Development Engineer</p>
          <p className="text-sm text-muted-foreground">@ PRO</p>

          <div className="mt-6 flex flex-col gap-2">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Interests</p>
            {["Chess", "Guitar", "Fitness", "Building things"].map((item) => (
              <span key={item} className="text-sm text-foreground font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed font-light"
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
