'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedSectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";

const shuffle = (arr: any[]) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

const ScrambleText = ({ children, className }: {children: string, className?: string}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  const text = typeof children === 'string' ? children : '';

  const scrambled = shuffle(text.split(''));

  return (
    <motion.span
      ref={ref}
      className={cn("text-5xl md:text-[100px] font-heading font-bold text-foreground", className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={text}
    >
      {text.split('').map((char, index) => {
        return (
          <motion.span
            key={index}
            className="inline-block"
            style={{ whiteSpace: 'pre-wrap' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{
              delay: index * SHUFFLE_TIME,
              duration: (text.length - index) * SHUFFLE_TIME,
            }}
          >
            <AnimateChar char={char} />
          </motion.span>
        );
      })}
    </motion.span>
  );
};

const AnimateChar = ({ char }: {char: string}) => {
    const randomChars = shuffle(CHARS.split('')).slice(0, CYCLES_PER_LETTER);
    const chars = [...randomChars, char];

    return (
        <motion.span>
            {chars.map((c, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: i === chars.length - 1 ? 1 : 0,
                    }}
                    transition={{
                        delay: i * SHUFFLE_TIME,
                        duration: SHUFFLE_TIME,
                    }}
                    className="absolute"
                >
                    {c}
                </motion.span>
            ))}
            <span className="opacity-0">{char}</span>
        </motion.span>
    )
}

export const AnimatedSectionTitle = ({ children, className }: AnimatedSectionTitleProps) => {
    const text = typeof children === 'string' ? children : '';
    return <ScrambleText className={className}>{text}</ScrambleText>
};
