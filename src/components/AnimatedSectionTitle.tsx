'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import React, { useState, useEffect } from 'react';


const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "🗺️📍🏗️📐📏🧭🏞️⛰️🏡🏢📸📹🌸🌻🌷🌿🌲🌳🌾🏠!@#$%^&*():{};|,.<>/?";

const ScrambleText = ({ children, className }: {children: string, className?: string}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
  const [text, setText] = useState(children);

  useEffect(() => {
    if (!isInView) return;

    let interval: any;
    const scramble = () => {
      let pos = 0;
      interval = setInterval(() => {
        const scrambled = children
          .split("")
          .map((char, index) => {
            if (pos / CYCLES_PER_LETTER > index) {
              return char;
            }

            const randomCharIndex = Math.floor(Math.random() * CHARS.length);
            const randomChar = CHARS[randomCharIndex];

            return randomChar;
          })
          .join("");

        setText(scrambled);
        pos++;

        if (pos >= children.length * CYCLES_PER_LETTER) {
          clearInterval(interval);
          setText(children);
        }
      }, SHUFFLE_TIME);
    };

    scramble();

    return () => {
      clearInterval(interval);
    };
  }, [isInView, children]);


  return (
    <motion.span
      ref={ref}
      className={cn("text-5xl md:text-[100px] font-heading font-bold text-foreground", className)}
      aria-label={children}
      aria-live="polite"
    >
      {text}
    </motion.span>
  );
};


export const AnimatedSectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const text = typeof children === 'string' ? children : '';
    return <ScrambleText className={className}>{text}</ScrambleText>
};
