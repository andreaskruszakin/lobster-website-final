'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STEPS = [
  { num: '01', title: 'Discovery', description: 'You tell us what you need. We ask the right questions and sketch a plan. No fluff, just clarity.' },
  { num: '02', title: 'Build', description: 'All rolled into one. Covers all standups, all design and development. We like to get something working into your hands.' },
  { num: '03', title: 'Monitor', description: 'Project KPIs monitored and dashboarded to measure success. Comes as standard with all projects.' },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.process-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } });
    gsap.fromTo('.process-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } });
    gsap.fromTo('.process-col', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.process-card', start: 'top 78%' } });
  }, { scope: containerRef });

  return (
    <section id="process" ref={containerRef} className="pb-28 md:pb-36 px-6 md:px-12 bg-[#FDF8F3]">
      <div className="max-w-[1400px] mx-auto">
        <div className="process-heading parallax-section-heading mb-10">
          <img src="/Lobster.svg" alt="" style={{ width: 80, height: 80, objectFit: 'contain' }} className="mb-0" />
          <h2 style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400, letterSpacing: '-1px' }} className="text-5xl md:text-7xl text-[#1E1A2E] leading-[1]">
            How we work<span className="inline-block w-[0.13em] h-[0.13em] bg-[#FF4F40] rounded-[0.03em] ml-[0.06em]" style={{ verticalAlign: '-0.05em' }} />
          </h2>
        </div>
        <div className="process-card rounded-[28px] px-8 py-12 md:px-12 md:py-14" style={{ backgroundColor: 'rgba(254,155,102,0.1)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1E1A2E]/10">
            {STEPS.map((step, i) => (
              <div key={i} className={`process-col flex flex-col gap-3 py-8 md:py-0 ${i === 0 ? '' : 'md:pl-10'} ${i < STEPS.length - 1 ? 'md:pr-10' : ''}`}>
                <span style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#FF4F40', lineHeight: 1 }}>
                  {step.num}
                </span>
                <h3 style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400, fontSize: 25, letterSpacing: '-0.2px' }} className="text-[#1E1A2E] leading-tight">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(30,26,46,0.55)', letterSpacing: '-0.01em' }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
