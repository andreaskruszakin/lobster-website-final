'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlobButton from './BlobButton';

const WORK_ITEMS = [
  { id: 1, title: 'Fashion E-Commerce', client: 'Susi Mob', category: 'Web App', image: '/images/4cd0e87280f410819433872a8b3967fb268b1694.png', accent: '#F26044' },
  { id: 2, title: 'Craftwork Design', client: 'Craftwork', category: 'Branding', image: '/images/f2ef28fc0f4b5766c42c1fe15af0d3df07c563ea.png', accent: '#CDD6F4' },
  { id: 3, title: 'D Series Portfolio', client: 'Arpit Brandings', category: 'Web Design', image: '/images/cb81fb2be560e5f31e2169eedc19546972b0afe6.png', accent: '#1E1E2E' },
  { id: 4, title: 'Tablet Experience', client: 'Craftwork', category: 'Product Design', image: '/images/1fb5836b62a9ad79be882abfec8d58b8fee2fdec.png', accent: '#CDD6F4' },
];
const CARD_CONFIGS = [
  { height: 'h-[420px] md:h-[500px]', offset: 'md:mt-12', rotation: 'md:[rotate:-1.5deg] hover:[rotate:0deg]' },
  { height: 'h-[400px] md:h-[480px]', offset: 'md:mt-0', rotation: 'md:[rotate:1deg] hover:[rotate:0deg]' },
  { height: 'h-[400px] md:h-[490px]', offset: 'md:mt-0', rotation: 'md:[rotate:-0.5deg] hover:[rotate:0deg]' },
  { height: 'h-[420px] md:h-[510px]', offset: 'md:mt-10', rotation: 'md:[rotate:1.5deg] hover:[rotate:0deg]' },
];

function WorkCard({ item, config }: { item: typeof WORK_ITEMS[0]; config: typeof CARD_CONFIGS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const handleEnter = () => { if (imgWrapperRef.current) gsap.to(imgWrapperRef.current, { scale: 1.06, duration: 0.6, ease: 'power2.out' }); };
  const handleLeave = () => { if (imgWrapperRef.current) gsap.to(imgWrapperRef.current, { scale: 1, duration: 0.5, ease: 'power2.out' }); };

  return (
    <div className={`work-card ${config.offset}`}>
      <div ref={cardRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave}
        className={`group relative ${config.height} cursor-pointer transition-all duration-500 ${config.rotation}`}
        style={{ border: '1px solid rgba(26,26,26,0.06)', borderRadius: 28 }}
      >
        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 28, WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
          <div ref={imgWrapperRef} className="absolute inset-[-8%] w-[116%] h-[116%] work-parallax-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-[#1A1A1A]/5 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
        </div>
        <div className="work-arrow-btn absolute top-5 right-5 z-30">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/90 backdrop-blur-sm border border-white/20 scale-90 group-hover:scale-100 transition-all duration-400">
            <svg className="w-3.5 h-3.5 text-[#1A1A1A] group-hover:rotate-45 transition-transform duration-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-['BN_Rollcall','Anton',sans-serif] text-2xl md:text-[28px] text-white leading-[0.95] mb-3">{item.title}</h3>
          <div className="flex items-center gap-2">
            <span className="inline-block px-3 py-1 rounded-lg text-white text-[11px] font-['Inter'] font-semibold" style={{ backgroundColor: item.accent, letterSpacing: '-0.02em' }}>{item.client}</span>
            <span className="font-['Inter'] text-[9px] uppercase tracking-[0.08em] text-white/40">{item.category}</span>
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
    gsap.fromTo('.work-card', { y: 80, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } });
    gsap.utils.toArray<HTMLElement>('.work-card').forEach((card) => {
      const img = card.querySelector('.work-parallax-img') as HTMLElement;
      if (img) gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.5 } });
    });
    gsap.fromTo('.work-arrow-btn', { y: 0 }, { y: -3, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.3 });
  }, { scope: containerRef });

  return (
    <section id="work" ref={containerRef} className="py-28 md:py-36 px-6 md:px-12 bg-[#FDF8F3]">
      <div className="max-w-[1400px] mx-auto">
        <div className="work-heading parallax-section-heading mb-10 md:mb-14">
          <span className="font-['Inter'] text-[10px] uppercase tracking-[0.1em] text-[#F26044] block mb-4">Selected Work</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-['BN_Rollcall','Anton',sans-serif] text-5xl md:text-7xl lg:text-[5.5rem] text-[#1A1A1A] leading-[0.88]">
              Projects<span className="inline-block w-[0.13em] h-[0.13em] bg-[#F26044] rounded-[0.03em] ml-[0.06em] align-baseline" />
            </h2>
            <p className="font-['Inter'] text-base text-[#1A1A1A]/50 max-w-sm leading-relaxed md:pb-2" style={{ letterSpacing: '-0.02em' }}>A few things we&apos;ve built that we&apos;re particularly proud of.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {WORK_ITEMS.map((item, i) => <WorkCard key={item.id} item={item} config={CARD_CONFIGS[i]} />)}
        </div>
        <div className="mt-16 md:mt-20 flex justify-center">
          <BlobButton>View Full Archive</BlobButton>
        </div>
      </div>
    </section>
  );
}
