'use client';

import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef, useEffect, useState } from 'react';
import React from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
const EMOJI_CHARS = "🛤️🌲🌳🌿☘️🌹🌺🌻🏡🌼🌷🍀🍃🍂🍁🌇🌆";
const ALL_CHARS = CHARS + EMOJI_CHARS;

const ScrambleText = ({ children, className }: { children: string, className?: string }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [animatedText, setAnimatedText] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (isInView) {
      const letters = children.split('');
      const animatedLetters = letters.map((letter, index) => {
        const isWhitespace = /\s/.test(letter);
        if (isWhitespace) {
          return <span key={index}>&nbsp;</span>;
        }
        return (
          <motion.span
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: (i) => ({
                opacity: 1,
                y: 0,
                transition: { delay: i * 0.05 },
              }),
            }}
          >
            <LetterScramble letter={letter} />
          </motion.span>
        );
      });
      setAnimatedText(animatedLetters);
    }
  }, [isInView, children]);

  return (
    <motion.h2
      ref={ref}
      className={cn("text-4xl md:text-5xl font-heading font-bold text-foreground text-left", className)}
      aria-label={children}
    >
      {animatedText.length > 0 ? animatedText : children.split('').map((l, i) => <span key={i} className="opacity-0">{l}</span>) }
    </motion.h2>
  );
};

const LetterScramble = ({ letter }: { letter: string }) => {
  const [displayLetter, setDisplayLetter] = useState<React.ReactNode>(null);
  const scrambleCycles = 5;
  const scrambleInterval = 50;

  useEffect(() => {
    let cycle = 0;
    const intervalId = setInterval(() => {
      const randomCharIndex = Math.floor(Math.random() * ALL_CHARS.length);
      const randomChar = ALL_CHARS[randomCharIndex];
      const randomColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
      
      setDisplayLetter(<span style={{ color: randomColor, textShadow: `0 0 5px ${randomColor}` }}>{randomChar}</span>);

      cycle++;
      if (cycle >= scrambleCycles) {
        clearInterval(intervalId);
        setDisplayLetter(letter);
      }
    }, scrambleInterval);

    return () => clearInterval(intervalId);
  }, [letter]);

  return <>{displayLetter}</>;
};

export const AnimatedSectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const text = typeof children === 'string' ? children : '';
    return <ScrambleText className={className}>{text}</ScrambleText>;
};
