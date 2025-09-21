'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ScrollProgressLine() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-1/2 w-0.5 bg-primary/30 origin-top hidden md:block"
      style={{ scaleY, zIndex: 100 }}
    />
  );
}
