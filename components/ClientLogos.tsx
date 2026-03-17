'use client';
import React from 'react';

// Add more logo entries here as { src, name } when you have the files.
// Entries without src fall back to a text pill.
const LOGOS: { name: string; src?: string }[] = [
  { name: 'Hotpoint', src: '/Hotpoint.png' },
  { name: 'Indesit', src: '/indesit.png' },
  { name: 'Whirlpool', src: '/whirlpool.png' },
  { name: 'Hotpoint', src: '/Hotpoint.png' },
  { name: 'Indesit', src: '/indesit.png' },
  { name: 'Whirlpool', src: '/whirlpool.png' },
];

function LogoItem({ logo }: { logo: typeof LOGOS[0] }) {
  return (
    <div className="shrink-0 flex items-center justify-center px-8 py-4 rounded-2xl border border-[#1E1A2E]/[0.07] bg-white/80" style={{ minWidth: 140, height: 64 }}>
      {logo.src ? (
        <img
          src={logo.src}
          alt={logo.name}
          className="max-h-full w-auto object-contain"
          style={{ maxHeight: 30, filter: 'grayscale(1)', opacity: 0.55 }}
        />
      ) : (
        <span className="font-semibold text-[13px] text-[#1E1A2E]/45 whitespace-nowrap tracking-[-0.01em]">{logo.name}</span>
      )}
    </div>
  );
}

export default function ClientLogos() {
  // Triple the list so the seamless loop works even with a short list
  const items = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section className="py-10 bg-[#FDF8F3] overflow-hidden">
      <p className="text-center text-[10px] uppercase tracking-[0.14em] text-[#1E1A2E]/30 mb-6">Trusted by</p>
      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 gap-4 animate-marquee">
          {items.map((logo, i) => <LogoItem key={i} logo={logo} />)}
        </div>
        <div className="flex shrink-0 gap-4 animate-marquee" aria-hidden>
          {items.map((logo, i) => <LogoItem key={i} logo={logo} />)}
        </div>
      </div>
    </section>
  );
}
