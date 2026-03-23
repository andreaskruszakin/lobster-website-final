'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PRINCIPLES = [
  { num: '01', title: 'Bold by\nDefault',  desc: 'We make decisions. We take positions. No mealy-mouthed hedging — just clear, confident work.', color: '#FF4F40', textColor: '#FDF8F3', rotate: -1.5 },
  { num: '02', title: 'Experts\nOnly',     desc: 'Talk to the builders, not account managers. Senior engineers, zero layers of bureaucracy.',    color: '#1E1A2E', textColor: '#FDF8F3', rotate: 1.5 },
  { num: '03', title: 'Ship >\nSlides',    desc: 'We ship production code, not pitch decks. Results over presentations, always.',                color: 'rgba(254,155,102,0.8)', textColor: '#1E1A2E', rotate: -1.5 },
  { num: '04', title: 'Prove\nIt Works',   desc: 'We think before we build. Expert consultancy baked into every project we take on.',            color: '#B9B0E8', textColor: '#1E1A2E', rotate: 1.5 },
  { num: '05', title: 'No Nonsense',       desc: 'Clear communication, no jargon. We speak human — always. No exceptions.',                     color: '#1E1A2E', textColor: '#FDF8F3', rotate: -0.5 },
];

export default function Principles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.principles-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } });
    gsap.fromTo('.principle-card', { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.principles-grid', start: 'top 80%' } });
  }, { scope: containerRef });

  return (
    <section id="principles" ref={containerRef} className="py-28 md:py-36 px-6 md:px-12 bg-[#FDF8F3] rounded-t-[48px] -mt-10 relative z-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="principles-heading parallax-section-heading mb-14 md:mb-20">
          <img src="/Squid.svg" alt="" style={{ width: 80, height: 80, objectFit: 'contain' }} className="mb-0" />
          <h2 style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400, letterSpacing: '-1px' }} className="text-5xl md:text-7xl text-[#1E1A2E] leading-[1]">
            We don&apos;t mess around<span className="inline-block w-[0.13em] h-[0.13em] bg-[#FF4F40] rounded-[0.03em] ml-[0.06em] align-baseline" style={{ verticalAlign: '-0.05em' }} />
          </h2>
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
        className="principle-card group relative overflow-hidden rounded-[28px] cursor-default"
        style={{ backgroundColor: principle.color, rotate: `${principle.rotate}deg` }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:p-10 lg:p-12 gap-6 md:gap-16">
          <h3 style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400, color: principle.textColor, letterSpacing: '-1px' }} className="text-4xl md:text-[48px] leading-tight">
            {principle.title.replace('\n', ' ')}
          </h3>
          <p className="text-[14px] leading-relaxed max-w-sm shrink-0 md:text-right" style={{ color: `${principle.textColor}99`, letterSpacing: '-0.02em' }}>
            {principle.desc}
          </p>
        </div>
        <div className="absolute -top-6 right-8 leading-none select-none pointer-events-none" style={{ fontFamily: "'BBH Hegarty', sans-serif", fontSize: '16rem', color: principle.textColor, opacity: 0.05 }}>{principle.num}</div>
      </div>
    );
  }

  return (
    <div ref={cardRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave}
      className="principle-card group relative overflow-hidden rounded-[28px] h-full min-h-[340px] md:min-h-[380px] cursor-default"
      style={{ backgroundColor: principle.color, rotate: `${principle.rotate}deg` }}
    >
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
        <div>
          <div className="w-3 h-3 rounded-sm opacity-30" style={{ backgroundColor: principle.textColor }} />
        </div>
        <div>
          <h3 style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400, color: principle.textColor, letterSpacing: '-1px' }} className="text-[48px] leading-[1.05] mb-3 whitespace-pre-line">
            {principle.title}
          </h3>
          <div className="w-10 h-[2px] mb-4 opacity-25" style={{ backgroundColor: principle.textColor }} />
          <p className="text-[14px] leading-relaxed max-w-[280px]" style={{ color: `${principle.textColor}99`, letterSpacing: '-0.02em' }}>
            {principle.desc}
          </p>
        </div>
      </div>
      <div className="absolute -top-4 -right-4 leading-none select-none pointer-events-none" style={{ fontFamily: "'BBH Hegarty', sans-serif", fontSize: '16rem', color: principle.textColor, opacity: 0.05 }}>{principle.num}</div>
    </div>
  );
}
