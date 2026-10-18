"use client";
import { motion, useScroll, useSpring } from "motion/react";

// A thin accent bar at the top of the page that shows how far down the page the reader is.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-accent"
    />
  );
};

export default ScrollProgress;
