'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const RAMP = ' .:-=+*#%@░▒▓█';

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

interface Particle {
  id: number;
  x: number;
  laneY: number;
  speed: number;
  status: 'allowed' | 'denied_limit' | 'denied_payee';
  shattered: boolean;
  shatterFrame: number;
  sparks?: Array<{ dx: number; dy: number; char: string }>;
}

export const HeroArt: React.FC = () => {
  const [caption, setCaption] = useState('Payment approved');
  const [gridOutput, setGridOutput] = useState<string>('');
  const [shatterSparksHtml, setShatterSparksHtml] = useState<Array<{ char: string; isAccent: boolean }>>([]);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const COLS = isMobile ? 48 : 90;
    const ROWS = isMobile ? 20 : 26;
    const CENTER_X = COLS / 2;
    const CENTER_Y = ROWS / 2;
    const RING_RADIUS = isMobile ? 5.5 : 7.5;
    const ASPECT = 1.9; // Character cell aspect ratio (height ~ 1.9x width)

    if (prefersReducedMotion) {
      // Render static snapshot
      const staticGrid: string[] = [];
      for (let r = 0; r < ROWS; r++) {
        let rowStr = '';
        for (let c = 0; c < COLS; c++) {
          const dx = c - CENTER_X;
          const dy = (r - CENTER_Y) * ASPECT;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Static open ring
          const isOpening = Math.abs(dy) < 2.0;
          let val = 0;
          if (Math.abs(dist - RING_RADIUS) < 1.4 && !isOpening) {
            val = 0.8;
          }
          const rampIdx = Math.min(Math.floor(val * (RAMP.length - 1)), RAMP.length - 1);
          rowStr += RAMP[rampIdx];
        }
        staticGrid.push(rowStr);
      }
      setGridOutput(staticGrid.join('\n'));
      setCaption('Payment approved');
      return;
    }

    // Animation state variables
    let frameCount = 0;
    let lastTime = performance.now();
    let particles: Particle[] = [];
    let nextParticleId = 1;
    let currentCaption = 'Payment approved';

    const lanes = isMobile ? [ROWS / 2 - 2, ROWS / 2, ROWS / 2 + 2] : [CENTER_Y - 3, CENTER_Y, CENTER_Y + 3];

    const updateFrame = () => {
      const now = performance.now();
      if (now - lastTime < 33) return; // Cap at 30 FPS
      lastTime = now;
      frameCount++;

      const cycle = frameCount % 480;
      const isRevoked = cycle >= 260 && cycle <= 420;

      // Update caption
      let targetCaption = 'Payment approved';
      if (isRevoked) {
        targetCaption = 'Key revoked';
      } else if (cycle % 120 > 60 && cycle % 120 < 90) {
        targetCaption = 'Blocked: over the per-payment limit';
      } else if (cycle % 120 >= 90) {
        targetCaption = 'Blocked: payee not on the list';
      }

      if (targetCaption !== currentCaption) {
        currentCaption = targetCaption;
        setCaption(targetCaption);
      }

      // Spawn payment particles
      if (frameCount % 24 === 0) {
        const laneY = lanes[Math.floor(Math.random() * lanes.length)];
        let status: 'allowed' | 'denied_limit' | 'denied_payee' = 'allowed';
        if (!isRevoked) {
          const rand = Math.random();
          if (rand > 0.65) status = 'denied_limit';
          else if (rand > 0.45) status = 'denied_payee';
        }

        particles.push({
          id: nextParticleId++,
          x: 2,
          laneY,
          speed: 0.75 + Math.random() * 0.2,
          status,
          shattered: false,
          shatterFrame: 0,
        });
      }

      // Advance particles & check collisions
      particles.forEach((p) => {
        if (p.shattered) {
          p.shatterFrame++;
          return;
        }

        p.x += p.speed;

        // Collision detection against ring
        const ringHitX = CENTER_X - RING_RADIUS + 0.5;
        if (p.x >= ringHitX && p.x <= CENTER_X + RING_RADIUS) {
          const isBlocked = isRevoked || p.status !== 'allowed';
          if (isBlocked) {
            p.shattered = true;
            p.shatterFrame = 1;
            // Generate sparks
            p.sparks = [
              { dx: 0, dy: 0, char: 'x' },
              { dx: -1, dy: -1, char: '.' },
              { dx: 1, dy: 1, char: '.' },
              { dx: -1, dy: 1, char: 'x' },
              { dx: 1, dy: -1, char: '.' },
            ];
          }
        }
      });

      // Filter out dead particles
      particles = particles.filter((p) => p.x < COLS - 1 && p.shatterFrame < 15);

      // Construct character grid
      const gridChars: string[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(' '));
      const accentMap: boolean[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

      // 1. Draw Ring (with Bayer dither)
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const dx = c - CENTER_X;
          const dy = (r - CENTER_Y) * ASPECT;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const isOpening = !isRevoked && Math.abs(dy) < 2.2 && c <= CENTER_X + 2;

          if (isRevoked && dist <= RING_RADIUS + 1.2) {
            // Revoked: solid disk
            const dither = (BAYER_4X4[r % 4][c % 4] / 16 - 0.5) * 0.15;
            const normDist = Math.min(dist / RING_RADIUS + dither, 1.0);
            const rampIdx = Math.floor((1 - normDist) * (RAMP.length - 1));
            gridChars[r][c] = RAMP[Math.max(0, Math.min(rampIdx, RAMP.length - 1))];
          } else if (Math.abs(dist - RING_RADIUS) < 1.6 && !isOpening) {
            // Ring boundary with glow
            const dither = (BAYER_4X4[r % 4][c % 4] / 16 - 0.5) * 0.12;
            const edgeDist = Math.abs(dist - RING_RADIUS);
            const brightness = Math.max(0, 1 - edgeDist / 1.6 + dither);
            const rampIdx = Math.floor(brightness * (RAMP.length - 1));
            gridChars[r][c] = RAMP[Math.max(0, Math.min(rampIdx, RAMP.length - 1))];
          }
        }
      }

      // 2. Draw Particles & Trails
      particles.forEach((p) => {
        const pX = Math.floor(p.x);
        const pY = Math.floor(p.laneY);

        if (p.shattered && p.sparks) {
          // Draw shattered sparks in accent color
          p.sparks.forEach((sp) => {
            const sx = Math.floor(p.x + sp.dx * (p.shatterFrame * 0.4));
            const sy = Math.floor(p.laneY + sp.dy * (p.shatterFrame * 0.3));
            if (sx >= 0 && sx < COLS && sy >= 0 && sy < ROWS) {
              gridChars[sy][sx] = sp.char;
              accentMap[sy][sx] = true;
            }
          });
        } else if (pX >= 0 && pX < COLS && pY >= 0 && pY < ROWS) {
          // Active traveling particle: head @ with trailing . :
          gridChars[pY][pX] = '@';
          if (pX - 1 >= 0) gridChars[pY][pX - 1] = ':';
          if (pX - 2 >= 0) gridChars[pY][pX - 2] = '.';
        }
      });

      // Render grid to string / styled lines
      const lines: string[] = [];
      for (let r = 0; r < ROWS; r++) {
        let lineStr = '';
        for (let c = 0; c < COLS; c++) {
          if (accentMap[r][c]) {
            // We store accent characters formatted
            lineStr += gridChars[r][c];
          } else {
            lineStr += gridChars[r][c];
          }
        }
        lines.push(lineStr);
      }

      setGridOutput(lines.join('\n'));
    };

    // Attach GSAP Ticker
    gsap.ticker.add(updateFrame);

    return () => {
      gsap.ticker.remove(updateFrame);
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center justify-center my-6 select-none">
      {/* ASCII Canvas Grid */}
      <div className="w-full max-w-4xl bg-white border border-neutral-200/80 rounded-xl p-4 sm:p-6 overflow-hidden flex justify-center shadow-xs">
        <pre className="font-mono text-[10px] sm:text-xs md:text-[13px] leading-[1.1] text-neutral-900 tracking-normal whitespace-pre overflow-x-auto">
          {gridOutput}
        </pre>
      </div>

      {/* Dynamic Quiet Caption Line */}
      <div className="mt-3 font-sans text-xs sm:text-sm text-neutral-500 transition-opacity duration-300 flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff5a1f]" />
        <span>{caption}</span>
      </div>
    </div>
  );
};
