'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STEPS = [
  { num: '01', title: 'Discovery', description: 'You tell us what you need. We ask the right questions and sketch a plan. No fluff, just clarity.' },
  { num: '02', title: 'Build', description: 'We design in the browser. Fast iterations, real feedback, no 47-page Figma files.' },
  { num: '03', title: 'Ship & Launch', description: 'Clean code, proper infra, tested thoroughly. It works on day one — not after three patch cycles.' },
  { num: '04', title: 'Monitor & Scale', description: 'Launch is the start. We stick around to make things faster, better, smarter.' },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.process-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } });
    gsap.fromTo('.process-step', { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.process-list', start: 'top 80%' } });
  }, { scope: containerRef });

  return (
    <section id="process" ref={containerRef} className="py-28 md:py-36 px-6 md:px-12 bg-[#1E1A2E] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="process-heading mb-16 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.1em] text-[#FF4F40] block mb-4">How It Works</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-black text-5xl md:text-7xl text-[#FDF8F3] leading-[0.9]">
              The Process<span className="inline-block w-[0.13em] h-[0.13em] bg-[#FF4F40] rounded-[0.03em] ml-[0.06em] align-baseline" />
            </h2>
            <p className="text-base text-[#FDF8F3]/40 max-w-sm leading-relaxed md:pb-2" style={{ letterSpacing: '-0.02em' }}>
              Four steps, zero surprises. This is exactly how we work on every project.
            </p>
          </div>
        </div>
        <div className="process-list divide-y divide-[#FDF8F3]/10">
          {STEPS.map((step, i) => (
            <div key={i} className="process-step grid grid-cols-12 gap-6 py-10 items-baseline">
              <div className="col-span-2 md:col-span-1">
                <span className="font-black text-[#FF4F40] text-3xl md:text-4xl leading-none">{step.num}</span>
              </div>
              <div className="col-span-10 md:col-span-4">
                <h3 className="font-black text-[#FDF8F3] text-2xl md:text-3xl leading-tight">{step.title}</h3>
              </div>
              <div className="col-span-12 md:col-span-6 md:col-start-7 pl-0 md:pl-4">
                <p className="text-[#FDF8F3]/45 text-base leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
