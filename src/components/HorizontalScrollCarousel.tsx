
'use client';

import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

const HorizontalScrollCarousel = ({ children }: { children: ReactNode }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-95%']);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;
