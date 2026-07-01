'use client';

import { motion } from 'framer-motion';

const paragraphs = [
  "I'm someone who enjoys understanding things, not just how they work, but why they exist in the first place.",
  "I spend a lot of my time building: sometimes it's code, sometimes it's ideas, and sometimes it's just a better version of myself. Technology is a big part of my life, but it's not the only thing that defines me. What really drives me is curiosity: about systems, people, emotions, and the small patterns that shape our everyday lives.",
  "I like observing. The way people think, the way they react, the way small experiences stay with us longer than we expect. That curiosity naturally flows into the things I create: whether it's a product, a piece of content, or even a simple interaction.",
  "Outside of work, I'm constantly exploring something new. Lately, it's been things like chess, guitar, fitness, and even trying to get comfortable with expressing myself more, through content, movement, or just being more present.",
  "I don't believe in staying one version of myself. I'm always evolving: learning, unlearning, and rebuilding.",
  "At the core of it, I'm someone who wants to grow, create meaningful things, and live a life that feels intentional."
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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
        <div className="md:col-span-5 md:sticky md:top-28 flex flex-col gap-6">
          <div className="relative group overflow-hidden rounded-2xl border border-border shadow-lg">
            <img
              src="/VedhaProfile.jpeg"
              alt="Vedhasagaran Mahalingam"
              className="w-full object-cover aspect-[4/5] transform group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Vedhasagaran Mahalingam
              </h3>
              <p className="text-sm text-muted-foreground font-light mt-0.5">
                Software Development Engineer @ PRO
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block">
                Chennai, IN
              </span>
              <span className="text-[10px] font-mono text-muted-foreground block mt-0.5">
                13°N, 80°E
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col gap-6">
          <h2 className="text-3xl font-extrabold tracking-tighter text-foreground mb-2 md:hidden">
            About
          </h2>
          <div className="flex flex-col gap-6">
            <p className="text-xl sm:text-2xl font-medium leading-relaxed text-foreground">
              I spend my time building: sometimes it's <span style={{ color: 'var(--accent-color)' }} className="font-semibold">code</span>, sometimes it's ideas, and sometimes it's just a better version of myself.
            </p>
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
