
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnimatedTextProps = {
  text: string;
  endSymbol?: string;
  className?: string;
  as?: React.ElementType;
};

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export function AnimatedText({ text, endSymbol, className, as: Tag = 'div' }: AnimatedTextProps) {
  const [currentHtml, setCurrentHtml] = useState<string>('');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (isInView && ref.current) {
      let start: number | null = null;
      const duration = 1500; // Animation duration in ms

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);

        const newHtml = text.split('').map((char, index) => {
          if (progress * text.length > index) {
            return char;
          } else {
            const randomColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
            return `<span style="color: ${randomColor}">${chars[Math.floor(Math.random() * chars.length)]}</span>`;
          }
        }).join('');

        setCurrentHtml(newHtml);

        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(animate);
        } else {
           if (endSymbol) {
             setCurrentHtml(text + ' ' + endSymbol);
           } else {
             setCurrentHtml(text);
           }
        }
      };

      animationFrameId.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isInView, text, endSymbol]);

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      dangerouslySetInnerHTML={{ __html: currentHtml || '' }}
    />
  );
}
