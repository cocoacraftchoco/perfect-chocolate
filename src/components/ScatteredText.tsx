import React, { useMemo, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface TextLineConfig {
  text: string;
  colorClass?: string;
  fontSizeClass?: string;
  trackingClass?: string;
  extraClass?: string;
}

interface ScatteredTextProps {
  lines: TextLineConfig[];
  isActive: boolean;
  baseDelay?: number; // Base start delay in seconds (e.g. 0.5s)
  duration?: number; // Flight duration per character (e.g. 1.25s)
  containerClassName?: string;
}

interface CharData {
  char: string;
  charKey: string;
  x: number;
  y: number;
  rot: number;
  scale: number;
  opacity: number;
  delay: number;
}

export default function ScatteredText({
  lines,
  isActive,
  baseDelay = 0.5,
  duration = 1.25,
  containerClassName = '',
}: ScatteredTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Track screen size for controlled scatter boundaries
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setScreenSize('mobile');
      } else if (w < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate random scattered character positions when isActive or screenSize changes
  const charactersData = useMemo(() => {
    let totalCharCount = 0;
    lines.forEach((line) => {
      totalCharCount += line.text.replace(/\s+/g, '').length;
    });

    let currentGlobalIndex = 0;

    return lines.map((line, lineIdx) => {
      const words = line.text.split(' ');

      const wordData = words.map((word, wordIdx) => {
        const charList: CharData[] = word.split('').map((char, charIdx) => {
          currentGlobalIndex++;
          const progressRatio = totalCharCount > 1 ? currentGlobalIndex / totalCharCount : 0.5;

          // Controlled random scatter bounds based on screen size
          let maxScatterX = 350;
          let maxScatterY = 200;
          let maxRot = 35;

          if (screenSize === 'mobile') {
            maxScatterX = 80;
            maxScatterY = 50;
            maxRot = 18;
          } else if (screenSize === 'tablet') {
            maxScatterX = 180;
            maxScatterY = 110;
            maxRot = 25;
          }

          // Spread out starting positions randomly and artfully
          const angle = Math.random() * Math.PI * 2;
          const distanceX = (0.4 + Math.random() * 0.6) * maxScatterX;
          const distanceY = (0.4 + Math.random() * 0.6) * maxScatterY;

          const x = Math.cos(angle) * distanceX;
          const y = Math.sin(angle) * distanceY;
          const rot = (Math.random() - 0.5) * 2 * maxRot;
          const scale = 0.75 + Math.random() * 0.4; // 0.75x to 1.15x scale
          const opacity = 0.1 + Math.random() * 0.3; // low starting opacity

          // Staggered delay: baseDelay (0.5s) + progression (up to 1.5s) + jitter
          const jitter = (Math.random() - 0.5) * 0.35;
          const delay = Math.max(
            baseDelay,
            baseDelay + progressRatio * 1.4 + jitter
          );

          return {
            char,
            charKey: `line-${lineIdx}-word-${wordIdx}-char-${charIdx}-${char}`,
            x,
            y,
            rot,
            scale,
            opacity,
            delay,
          };
        });

        return { word, charList };
      });

      return { line, wordData };
    });
  }, [lines, isActive, screenSize, baseDelay]);

  return (
    <div className={`flex flex-col space-y-2 sm:space-y-4 ${containerClassName}`}>
      {charactersData.map(({ line, wordData }, lineIndex) => (
        <div
          key={`line-wrapper-${lineIndex}`}
          className={`flex flex-wrap justify-center lg:justify-start items-baseline ${line.fontSizeClass || ''} ${line.trackingClass || ''} ${line.extraClass || ''}`}
        >
          {wordData.map(({ word, charList }, wordIndex) => (
            <React.Fragment key={`word-frag-${lineIndex}-${wordIndex}`}>
              {/* Word container ensuring words do not split awkwardly */}
              <span className="inline-block whitespace-nowrap">
                {charList.map((cData) => (
                  <motion.span
                    key={cData.charKey}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0, x: 0, y: 0, rotate: 0, scale: 1 }
                        : {
                            x: cData.x,
                            y: cData.y,
                            rotate: cData.rot,
                            scale: cData.scale,
                            opacity: cData.opacity,
                          }
                    }
                    animate={
                      isActive
                        ? {
                            x: 0,
                            y: 0,
                            rotate: 0,
                            scale: 1,
                            opacity: 1,
                          }
                        : prefersReducedMotion
                        ? { opacity: 0 }
                        : {
                            x: cData.x,
                            y: cData.y,
                            rotate: cData.rot,
                            scale: cData.scale,
                            opacity: cData.opacity,
                          }
                    }
                    transition={{
                      duration: prefersReducedMotion ? 0.6 : duration,
                      delay: prefersReducedMotion ? baseDelay : cData.delay,
                      ease: [0.16, 1, 0.3, 1], // ExpoOut / luxury smooth settling curve
                    }}
                    className={`inline-block select-none transform-gpu ${line.colorClass || 'text-white'}`}
                    style={{
                      willChange: 'transform, opacity',
                    }}
                  >
                    {cData.char}
                  </motion.span>
                ))}
              </span>

              {/* Space between words */}
              {wordIndex < wordData.length - 1 && (
                <span
                  key={`space-${lineIndex}-${wordIndex}`}
                  className="inline-block w-[0.3em]"
                  aria-hidden="true"
                >
                  &nbsp;
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}
