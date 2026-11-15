"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MotionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function MotionReveal({
  children,
  delay = 0,
  className = "",
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
