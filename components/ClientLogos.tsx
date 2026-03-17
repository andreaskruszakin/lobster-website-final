'use client';
import React from 'react';

const LOGOS: { name: string; src: string; height?: number }[] = [
  { name: 'Hotpoint', src: '/Hotpoint.png' },
  { name: 'Indesit', src: '/indesit.png', height: 72 },
  { name: 'Whirlpool', src: '/whirlpool.png' },
  { name: 'Appliance Hero', src: '/Appliance hero.png', height: 36 },
];

export default function ClientLogos() {
  const items = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section className="py-10 bg-[#FDF8F3]" style={{ overflow: 'hidden' }}>
      <style>{`
        @keyframes logo-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-track {
          display: inline-flex;
          align-items: center;
          gap: 5rem;
          white-space: nowrap;
          animation: logo-scroll 28s linear infinite;
          will-change: transform;
        }
      `}</style>
      <p className="text-center text-[10px] uppercase tracking-[0.14em] text-[#1E1A2E]/30 mb-6">Trusted by</p>
      <div className="logo-track">
        {items.map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.name}
            style={{ height: logo.height ?? 40, objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.45, flexShrink: 0 }}
          />
        ))}
      </div>
    </section>
  );
}
