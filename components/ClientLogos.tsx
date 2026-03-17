'use client';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLoop } from './HandDrawnArrow';

const LOGOS_LEFT = [
  { name: 'ANWB', color: '#2F7A65', textColor: 'white' },
  { name: 'KFC', color: '#7A1F31', textColor: 'white' },
  { name: 'Getir', color: '#6B8BFF', textColor: 'white' },
  { name: 'Oxxio', color: '#F26044', textColor: 'white' },
];
const LOGOS_RIGHT = [
  { name: 'Swapfiets', color: '#E6FF85', textColor: 'black' },
  { name: 'Netflix', color: '#E8C1F5', textColor: 'black' },
  { name: 'HEMA', color: '#C22B3D', textColor: 'white' },
  { name: 'Ace & Tate', color: '#A3C4F3', textColor: 'black' },
];

export default function ClientLogos() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const paths = document.querySelectorAll('.drawing-arrow path');
    paths.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength?.() ?? 200;
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top center' } });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-[#FDF8F3] py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-32">
          <div className="relative flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 text-[#8BA6FF] opacity-20 lg:opacity-100">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current">
                <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.2C93.5,8.8,82.2,21.9,71.2,33.1C60.2,44.3,49.5,53.6,37.6,61.6C25.7,69.6,12.6,76.3,-1.2,78.4C-15,80.5,-28.3,78,-39.9,70.6C-51.5,63.2,-61.4,50.9,-69.2,37.6C-77,24.3,-82.7,10,-81.4,-3.8C-80.1,-17.6,-71.8,-30.9,-61.4,-41.8C-51,-52.7,-38.5,-61.2,-25.6,-69.3C-12.7,-77.4,0.6,-85.1,14.2,-84.9C27.8,-84.7,40.5,-76.6,44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
            </div>
            <div className="relative z-10">
              <h2 className="font-['BN_Rollcall','Anton',sans-serif] text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-2">
                proud to have<br />worked <span className="font-['Inter'] italic font-light relative inline-block border-b-2 border-black pb-1 uppercase tracking-[0.08em]">with:</span>
              </h2>
              <div className="absolute top-[90%] left-[60%] w-48 h-32 hidden lg:block pointer-events-none transform -rotate-12">
                <ArrowLoop className="w-full h-full text-black drawing-arrow" strokeWidth={5} />
              </div>
            </div>
          </div>
          <div className="flex-1 w-full max-w-2xl relative h-[600px]">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FDF8F3] to-transparent z-10 pointer-events-none" />
            <div className="flex gap-4 md:gap-6 h-full overflow-hidden">
              <div className="flex-1 relative">
                <motion.div className="flex flex-col gap-4 md:gap-6" animate={{ y: '-50%' }} initial={{ y: '0%' }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}>
                  {[...LOGOS_LEFT, ...LOGOS_LEFT, ...LOGOS_LEFT].map((logo, index) => (
                    <div key={`left-${index}`} className="aspect-square rounded-[2.5rem] flex items-center justify-center p-8 border border-white/10" style={{ backgroundColor: logo.color, color: logo.textColor }}>
                      <span className="font-['BN_Rollcall','Anton',sans-serif] text-2xl md:text-3xl text-center uppercase tracking-wider">{logo.name}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
              <div className="flex-1 relative">
                <motion.div className="flex flex-col gap-4 md:gap-6" animate={{ y: '0%' }} initial={{ y: '-50%' }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
                  {[...LOGOS_RIGHT, ...LOGOS_RIGHT, ...LOGOS_RIGHT].map((logo, index) => (
                    <div key={`right-${index}`} className="aspect-square rounded-[2.5rem] flex items-center justify-center p-8 border border-white/10" style={{ backgroundColor: logo.color, color: logo.textColor }}>
                      <span className="font-['BN_Rollcall','Anton',sans-serif] text-2xl md:text-3xl text-center uppercase tracking-wider">{logo.name}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FDF8F3] to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
