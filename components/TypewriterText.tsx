'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 0.03,
  className = '',
  onComplete,
  showCursor = true,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (textRef.current) textRef.current.textContent = text;
      if (onComplete) onComplete();
      return;
    }

    if (!textRef.current) return;

    const chars = text.split('');
    textRef.current.textContent = '';
    let currentText = '';

    const timeline = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    chars.forEach((char) => {
      timeline.to(
        {},
        {
          duration: speed,
          onComplete: () => {
            currentText += char;
            if (textRef.current) {
              textRef.current.textContent = currentText;
            }
          },
        }
      );
    });

    return () => {
      timeline.kill();
    };
  }, [text, speed, onComplete]);

  return (
    <span ref={containerRef} className={`font-mono inline-flex items-center ${className}`}>
      <span ref={textRef}></span>
      {showCursor && (
        <span className="animate-pulse ml-0.5 inline-block w-2 h-4 bg-[var(--fg)]"></span>
      )}
    </span>
  );
};
