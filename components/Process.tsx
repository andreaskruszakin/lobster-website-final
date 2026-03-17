'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STEPS = [
  { num: '01', title: 'Discovery', description: 'You tell us what you need. We ask the right questions and sketch a plan. No fluff, just clarity.' },
  { num: '02', title: 'Build', description: 'All rolled into one. Covers all standups, all design and development. We like to get something working into your hands.' },
  { num: '03', title: 'Monitor', description: "Project KPIs monitored and dashboarded to measure success. Comes as standard with all projects." },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.process-illus', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.8)', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } });
    gsap.fromTo('.process-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } });
    gsap.fromTo('.process-col', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: '.process-card', start: 'top 78%' } });
  }, { scope: containerRef });

  return (
    <section id="process" ref={containerRef} className="px-6 md:px-12 pb-20 md:pb-28 bg-[#FDF8F3]">
      <div className="max-w-[1400px] mx-auto">
        {/* Section heading */}
        <div className="process-illus mb-8 parallax-section-heading">
          <img src="/Server_Final.svg" alt="" style={{ width: 60, height: 'auto' }} className="mb-4" />
          <span className="text-[10px] uppercase tracking-[0.1em] text-[#FF4F40] block mb-4">How It Works</span>
          <h2 className="font-black text-5xl md:text-7xl text-[#1E1A2E] leading-[0.9]">
            The Process<span className="inline-block w-[0.13em] h-[0.13em] bg-[#FF4F40] rounded-[0.03em] ml-[0.06em] align-baseline" />
          </h2>
        </div>

        {/* Card */}
        <div className="process-card rounded-[36px] px-8 py-10 md:px-12 md:py-14" style={{ backgroundColor: '#F7F2EC' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1E1A2E]/10">
            {STEPS.map((step, i) => (
              <div key={i} className={`process-col flex flex-col gap-3 py-8 md:py-0 ${i === 0 ? '' : 'md:pl-10'} ${i < STEPS.length - 1 ? 'md:pr-10' : ''}`}>
                <span
                  className="font-black leading-none"
                  style={{ fontFamily: "'BN Sonic', sans-serif", fontWeight: 400, fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#FF4F40' }}
                >
                  {step.num}
                </span>
                <h3 className="font-black text-[#1E1A2E] text-xl md:text-2xl leading-tight">{step.title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(30,26,46,0.5)', letterSpacing: '-0.01em' }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
