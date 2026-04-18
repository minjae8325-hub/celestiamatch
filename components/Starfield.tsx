'use client';

import { useMemo } from 'react';

/**
 * Pure-CSS starfield background. Deterministic seed so SSR and client match.
 */
export function Starfield() {
  const stars = useMemo(() => {
    const out: { top: string; left: string; size: number; delay: string; opacity: number }[] = [];
    // Deterministic pseudo-random so hydration matches
    let seed = 42;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 80; i++) {
      out.push({
        top: `${rand() * 100}%`,
        left: `${rand() * 100}%`,
        size: 1 + Math.floor(rand() * 2.2),
        delay: `${(rand() * 4).toFixed(2)}s`,
        opacity: 0.35 + rand() * 0.55,
      });
    }
    return out;
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-mist-100 animate-twinkle"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: s.delay,
            boxShadow: '0 0 4px rgba(244,239,255,0.6)',
          }}
        />
      ))}
      {/* Shooting star accent */}
      <div
        className="absolute h-px w-24 bg-gradient-to-r from-transparent via-gold-400/80 to-transparent rotate-[-18deg]"
        style={{ top: '18%', left: '72%' }}
      />
    </div>
  );
}
