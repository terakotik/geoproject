
'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import React from 'react';

type AnimatedTextProps = {
  phrases: string[];
  as?: React.ElementType;
  className?: string;
  repeatDelay?: number;
};

export function AnimatedText({
  phrases,
  as: Tag = 'h2',
  className,
  repeatDelay = 3000,
}: AnimatedTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const animate = async () => {
      await controls.start('visible');
      await new Promise(resolve => setTimeout(resolve, repeatDelay));
      await controls.start('hidden');
      setPhraseIndex(prev => (prev + 1) % phrases.length);
    };

    const interval = setInterval(animate, repeatDelay + 1000); // repeatDelay + animation time
    
    // Initial animation
    controls.start('visible');

    return () => clearInterval(interval);
  }, [isInView, phraseIndex, controls, phrases.length, repeatDelay]);


  const animation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 1) => ({
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, delayChildren: i * 0.08 },
    }),
  };

  const words = useMemo(() => phrases[phraseIndex].split(' '), [phraseIndex, phrases]);

  return (
    <Tag className={cn("overflow-hidden", className)} ref={ref}>
      <motion.span
        key={phraseIndex}
        initial="hidden"
        animate={controls}
        variants={animation}
        aria-hidden
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={animation}
            className="inline-block"
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
