
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

type AnimatedTextProps = {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
};

export function AnimatedText({ children, as: Tag = 'h2', className }: AnimatedTextProps) {
  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.05 }}
        aria-hidden
      >
        {children?.toString().split(' ').map((word, i) => (
          <motion.span
            key={i}
            variants={defaultAnimations}
            className="inline-block"
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
