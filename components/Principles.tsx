'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PRINCIPLES = [
  { num: '01', title: 'Bold by\nDefault', desc: 'We make decisions. We take positions. No mealy-mouthed hedging — just clear, confident work.', color: '#F26044', textColor: '#FDF8F3', rotate: -1.5 },
  { num: '02', title: 'Experts\nOnly', desc: 'Talk to the builders, not account managers. Senior engineers, zero layers of bureaucracy.', color: '#1A1A1A', textColor: '#FDF8F3', rotate: 1 },
  { num: '03', title: 'Ship >\nSlides', desc: 'We ship production code, not pitch decks. Results over presentations, always.', color: '#FFC4A3', textColor: '#1A1A1A', rotate: -0.5 },
  { num: '04', title: 'Prove\nit Works', desc: 'We think before we build. Expert consultancy baked into every project we take on.', color: '#C4C3E0', textColor: '#1A1A1A', rotate: 1.5 },
  { num: '05', title: 'No Nonsense', desc: 'Clear communication, no jargon. We speak human — always. No exceptions.', color: '#1A1A1A', textColor: '#FDF8F3', rotate: -0.8 },
];

export default function Principles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.principles-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } });
    gsap.fromTo('.principle-card', { y: 60, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.principles-grid', start: 'top 80%' } });
    gsap.utils.toArray<HTMLElement>('.principle-num').forEach((el) => {
      gsap.fromTo(el, { yPercent: 10 }, { yPercent: -10, ease: 'none', scrollTrigger: { trigger: el.closest('.principle-card'), start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    });
  }, { scope: containerRef });

  return (
    <section id="principles" ref={containerRef} className="py-28 md:py-36 px-6 md:px-12 bg-[#FDF8F3]">
      <div className="max-w-[1400px] mx-auto">
        <div className="principles-heading parallax-section-heading mb-14 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.1em] text-[#F26044] block mb-4">How We Work</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-black text-5xl md:text-7xl text-[#1A1A1A] leading-[0.9]">
              We don&apos;t mess<br />around<span className="inline-block w-[0.13em] h-[0.13em] bg-[#F26044] rounded-[0.03em] ml-[0.06em] align-baseline" />
            </h2>
            <p className="text-base text-[#1A1A1A]/50 max-w-sm leading-relaxed md:pb-2" style={{ letterSpacing: '-0.02em' }}>
              Five non-negotiables that define how we operate and what you can expect from us.
            </p>
          </div>
        </div>
        <div className="principles-grid grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          <div className="md:col-span-7"><PrincipleCard principle={PRINCIPLES[0]} size="large" /></div>
          <div className="md:col-span-5"><PrincipleCard principle={PRINCIPLES[1]} size="large" /></div>
          <div className="md:col-span-5"><PrincipleCard principle={PRINCIPLES[2]} size="large" /></div>
          <div className="md:col-span-7"><PrincipleCard principle={PRINCIPLES[3]} size="large" /></div>
          <div className="md:col-span-12"><PrincipleCard principle={PRINCIPLES[4]} size="band" /></div>
        </div>
      </div>
    </section>
  );
}

function PrincipleCard({ principle, size }: { principle: typeof PRINCIPLES[0]; size: 'large' | 'band' }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleEnter = () => { if (cardRef.current) gsap.to(cardRef.current, { rotate: 0, scale: 1.02, duration: 0.4, ease: 'power2.out' }); };
  const handleLeave = () => { if (cardRef.current) gsap.to(cardRef.current, { rotate: principle.rotate, scale: 1, duration: 0.5, ease: 'power2.out' }); };

  if (size === 'band') {
    return (
      <div ref={cardRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave}
        className="principle-card group relative overflow-hidden rounded-[28px] cursor-default border border-transparent"
        style={{ backgroundColor: principle.color, color: principle.textColor, rotate: `${principle.rotate}deg` }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-10 lg:p-12 gap-6 md:gap-12">
          <div className="flex items-center gap-6 md:gap-10">
            <span className="principle-num text-[11px] uppercase tracking-[0.1em] opacity-40 shrink-0">{principle.num}</span>
            <h3 className="font-black text-4xl md:text-5xl lg:text-6xl leading-[0.9] tracking-tight">{principle.title.replace('\n', ' ')}</h3>
          </div>
          <p className="text-[15px] md:text-base leading-relaxed opacity-60 max-w-md md:text-right shrink-0" style={{ letterSpacing: '-0.02em' }}>{principle.desc}</p>
        </div>
        <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full opacity-[0.08] pointer-events-none" style={{ backgroundColor: principle.textColor }} />
      </div>
    );
  }

  return (
    <div ref={cardRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave}
      className="principle-card group relative overflow-hidden rounded-[28px] h-full min-h-[320px] md:min-h-[380px] cursor-default border border-transparent"
      style={{ backgroundColor: principle.color, color: principle.textColor, rotate: `${principle.rotate}deg` }}
    >
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
        <div className="flex items-start justify-between">
          <span className="principle-num text-[11px] uppercase tracking-[0.1em] opacity-40">{principle.num}</span>
          <div className="w-3 h-3 rounded-sm opacity-30 group-hover:opacity-60 group-hover:scale-125 transition-all duration-300" style={{ backgroundColor: principle.textColor }} />
        </div>
        <div>
          <h3 className="font-black text-4xl md:text-5xl lg:text-[3.5rem] leading-[0.88] tracking-tight mb-4 whitespace-pre-line">{principle.title}</h3>
          <div className="w-10 h-[2px] mb-4 opacity-25 group-hover:w-16 transition-all duration-500" style={{ backgroundColor: principle.textColor }} />
          <p className="text-[14px] leading-relaxed opacity-50 max-w-[280px] group-hover:opacity-70 transition-opacity duration-400" style={{ letterSpacing: '-0.02em' }}>{principle.desc}</p>
        </div>
      </div>
      <div className="absolute -top-4 -right-4 font-black text-[12rem] md:text-[16rem] leading-none opacity-[0.04] pointer-events-none select-none" style={{ color: principle.textColor }}>{principle.num}</div>
    </div>
  );
}
