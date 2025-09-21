'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedSectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedSectionTitle({ children, className }: AnimatedSectionTitleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className={cn("overflow-hidden py-4", className)}>
      <motion.h2
        initial={{ x: '100%' }}
        animate={{ x: isInView ? 0 : '100%' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-[100px] font-heading font-bold text-foreground mb-6"
      >
        {children}
      </motion.h2>
    </div>
  );
}
