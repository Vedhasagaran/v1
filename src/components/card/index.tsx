"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface CardProps {
  index: number;
  number: number;
  text: string;
  color: string;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}

export default function Card({
  index,
  text,
  color,
  progress,
  range,
  targetScale,
}: Readonly<CardProps>) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen flex justify-center items-center sticky top-0 px-5">
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-10% + ${index * 25}px)`,
        }}
        className="w-full max-w-[900px] h-[400px] rounded-[25px] relative top-[-10%] flex justify-center items-center text-[clamp(48px,8vw,100px)] text-white md:h-[300px] md:rounded-[20px] md:text-[clamp(36px,6vw,72px)] max-sm:h-[250px] max-sm:rounded-[15px] max-sm:text-[clamp(24px,5vw,48px)] max-sm:mx-2.5"
      >
        <p>{text}</p>
      </motion.div>
    </div>
  );
}
