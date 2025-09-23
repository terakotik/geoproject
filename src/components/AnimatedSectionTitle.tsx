
'use client';

import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef, useEffect } from 'react';
import React from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export const AnimatedSectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const text = typeof children === 'string' ? children : '';

  useEffect(() => {
    const element = ref.current;
    if (!isInView || !element) return;

    const originalText = text;
    let start: number | null = null;
    const duration = 1500; // ms

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      const newText = originalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (progress * originalText.length > index) {
            return originalText[index];
          }

          let r, g, b;
          const rand = Math.random();

          if (rand < 0.5) { // 50% chance for orange/yellow
            r = Math.floor(Math.random() * 55) + 200; // 200-255 (orange-yellow)
            g = Math.floor(Math.random() * 150) + 50; // 50-200
            b = 0;
          } else if (rand < 0.9) { // 40% chance for black/dark grey
            const darkValue = Math.floor(Math.random() * 50); // 0-49
            r = darkValue;
            g = darkValue;
            b = darkValue;
          } else { // 10% chance for other colors (mostly darkish)
            r = Math.floor(Math.random() * 100);
            g = Math.floor(Math.random() * 100);
            b = Math.floor(Math.random() * 100);
          }
          
          const randomColor = `rgb(${r}, ${g}, ${b})`;
          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];

          return `<span style="color: ${randomColor}; text-shadow: 0 0 5px ${randomColor};">${randomChar}</span>`;
        })
        .join('');
      
      if (element) {
        element.innerHTML = newText;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (element) {
          element.textContent = originalText;
        }
      }
    };

    requestAnimationFrame(step);

  }, [isInView, text]);


  return (
     <h2
      ref={ref}
      className={cn("text-4xl md:text-5xl font-heading font-bold text-foreground text-left", className)}
      aria-label={text}
    >
      {text}
    </h2>
  );
};

    