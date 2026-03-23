'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const WORK_ITEMS = [
  { id: 1, title: 'Data Dashboard',   client: 'Indesit',        category: 'Web App',           color: '#FF4F40', textColor: '#FDF8F3', rotate: -1.5 },
  { id: 2, title: 'AWS Migration',    client: 'Appliance Hero', category: 'Infrastructure',    color: '#B9B0E8', textColor: '#FDF8F3', rotate: 1.5 },
  { id: 3, title: 'Data Warehousing', client: 'Hotpoint',       category: 'Data Engineering',  color: '#FE9B66', textColor: '#FDF8F3', rotate: 1.5 },
  { id: 4, title: 'Interactive WebGL',client: 'Whirlpool',      category: 'Digital Experience',color: '#1E1A2E', textColor: '#FDF8F3', rotate: -1.5 },
];

function WorkCard({ item }: { item: typeof WORK_ITEMS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleEnter = () => { if (cardRef.current) gsap.to(cardRef.current, { rotate: 0, scale: 1.02, duration: 0.4, ease: 'power2.out' }); };
  const handleLeave = () => { if (cardRef.current) gsap.to(cardRef.current, { rotate: item.rotate, scale: 1, duration: 0.5, ease: 'power2.out' }); };

  return (
    <div className="work-card flex items-center justify-center" style={{ minHeight: 505 }}>
      <div
        ref={cardRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative overflow-hidden rounded-[28px] cursor-pointer w-full"
        style={{ backgroundColor: item.color, rotate: `${item.rotate}deg`, height: 489 }}
      >
        <div className="absolute top-5 left-5 z-20">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[rgba(253,248,243,0.9)] backdrop-blur-sm">
            <svg className="w-3 h-3 text-[#1E1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h3 style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400, color: item.textColor, letterSpacing: '-0.2px', fontSize: 25, lineHeight: 1.1 }} className="mb-3">
            {item.title}
          </h3>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-lg text-[14px] font-medium" style={{ backgroundColor: 'rgba(253,248,243,0.25)', color: item.textColor }}>{item.client}</span>
            <span className="text-[12px]" style={{ color: `${item.textColor}99` }}>{item.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.work-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } });
    gsap.fromTo('.work-card', { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } });
  }, { scope: containerRef });

  return (
    <section id="work" ref={containerRef} className="py-28 md:py-36 px-6 md:px-12 bg-[#FDF8F3]">
      <div className="max-w-[1400px] mx-auto">
        <div className="work-heading parallax-section-heading mb-10 md:mb-14">
          <img src="/icon-folder.png" alt="" style={{ width: 80, height: 80, objectFit: 'contain' }} className="mb-0" />
          <h2 style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400, letterSpacing: '-1px' }} className="text-5xl md:text-7xl text-[#1E1A2E] leading-[1]">
            Selected works<span className="inline-block w-[0.13em] h-[0.13em] bg-[#FF4F40] rounded-[0.03em] ml-[0.06em]" style={{ verticalAlign: '-0.05em' }} />
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {WORK_ITEMS.map((item) => <WorkCard key={item.id} item={item} />)}
        </div>
        <div className="mt-14 flex justify-center">
          <button className="bg-[#FF4F40] text-[#FDF8F3] px-8 py-3.5 rounded-[17px] text-[16px] font-semibold hover:bg-[#ff6b5a] active:scale-95 transition-all duration-200">
            View Projects
          </button>
        </div>
      </div>
    </section>
  );
}
