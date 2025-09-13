"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import styles from "./style.module.scss";

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
  number,
  text,
  color,
  progress,
  range,
  targetScale,
}: CardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className={styles.cardContainer}>
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-10% + ${index * 25}px)`,
        }}
        className={styles.card}
      >
        <p>{text}</p>
      </motion.div>
    </div>
  );
}
