'use client';
import React from 'react';

const ROW_1 = ['ANWB', 'KFC', 'Getir', 'Oxxio', 'Swapfiets', 'Netflix', 'HEMA', 'Ace & Tate'];
const ROW_2 = ['LaunchPad', 'FinFlow', 'TalentBridge', 'Altoe', 'ANWB', 'KFC', 'Getir', 'Swapfiets'];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  const cls = reverse ? 'animate-marquee-slow' : 'animate-marquee';
  const dir = reverse ? 'reverse' : 'normal';
  return (
    <div className="relative flex overflow-hidden">
      <div className={`flex shrink-0 gap-3 ${cls}`} style={{ animationDirection: dir }}>
        {doubled.map((name, i) => (
          <div key={i} className="shrink-0 px-5 py-2.5 rounded-full border border-[#1E1A2E]/[0.08] bg-white/70">
            <span className="font-semibold text-[13px] text-[#1E1A2E]/50 whitespace-nowrap tracking-[-0.01em]">{name}</span>
          </div>
        ))}
      </div>
      <div className={`flex shrink-0 gap-3 ${cls}`} style={{ animationDirection: dir }} aria-hidden>
        {doubled.map((name, i) => (
          <div key={i} className="shrink-0 px-5 py-2.5 rounded-full border border-[#1E1A2E]/[0.08] bg-white/70">
            <span className="font-semibold text-[13px] text-[#1E1A2E]/50 whitespace-nowrap tracking-[-0.01em]">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section className="py-12 bg-[#FDF8F3] overflow-hidden">
      <p className="text-center text-[10px] uppercase tracking-[0.14em] text-[#1E1A2E]/30 mb-6">Trusted by</p>
      <div className="space-y-3">
        <MarqueeRow items={ROW_1} />
        <MarqueeRow items={ROW_2} reverse />
      </div>
    </section>
  );
}
