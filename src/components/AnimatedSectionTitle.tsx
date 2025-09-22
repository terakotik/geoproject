'use client';

import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef, useEffect, useState } from 'react';
import React from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const ScrambleText = ({ children, className }: { children: string, className?: string }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayText, setDisplayText] = useState(children);

  useEffect(() => {
    if (!isInView) return;

    let start: number | null = null;
    const duration = 1500; // ms

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      const newText = children
        .split('')
        .map((char, index) => {
          if (progress * children.length > index) {
            return children[index];
          }

          // Generate a random color with a bias towards yellow and dark tones
          const r = Math.random() > 0.5 ? Math.floor(Math.random() * 50) : Math.floor(Math.random() * 55) + 200; // dark or yellow-ish red
          const g = Math.random() > 0.5 ? Math.floor(Math.random() * 50) : Math.floor(Math.random() * 55) + 200; // dark or yellow-ish green
          const b = Math.floor(Math.random() * 50); // mostly dark blue
          const randomColor = `rgb(${r}, ${g}, ${b})`;
          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];

          return `<span style="color: ${randomColor};">${randomChar}</span>`;
        })
        .join('');
      
      if (ref.current) {
        ref.current.innerHTML = newText;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (ref.current) {
          ref.current.textContent = children;
        }
      }
    };

    requestAnimationFrame(step);

  }, [isInView, children]);


  return (
     <h2
      ref={ref}
      className={cn("text-4xl md:text-5xl font-heading font-bold text-foreground text-left", className)}
      aria-label={children}
    >
      {children}
    </h2>
  );
};


export const AnimatedSectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const text = typeof children === 'string' ? children : '';
    return <ScrambleText className={className}>{text}</ScrambleText>;
};
