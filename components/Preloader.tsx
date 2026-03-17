'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps { onComplete: () => void }

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const counter = { val: 0 };
    gsap.to(counter, {
      val: 100, duration: 2.6, ease: 'power2.inOut',
      onUpdate: () => setCount(Math.floor(counter.val)),
    });
    gsap.fromTo('.preloader-bar-fill', { scaleX: 0 }, { scaleX: 1, duration: 2.6, ease: 'power2.inOut', transformOrigin: 'left center' });

    const tl = gsap.timeline();
    gsap.set('.lobster-illustration', { opacity: 0, scale: 0.6 });
    tl.to('.lobster-illustration', { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)', delay: 0.15 });
    tl.to('.lobster-animation-container', { rotate: -6, duration: 0.12, ease: 'power2.out' }, '+=0.08');
    tl.to('.lobster-animation-container', { rotate: 8, duration: 0.14, ease: 'power2.inOut' });
    tl.to('.lobster-animation-container', { rotate: -4, duration: 0.12, ease: 'power2.inOut' });
    tl.to('.lobster-animation-container', { rotate: 0, duration: 0.18, ease: 'elastic.out(1, 0.4)' });
    tl.fromTo('.preloader-char', { y: '110%', opacity: 0, rotate: 8 }, { y: '0%', opacity: 1, rotate: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out' }, '-=0.1');
    tl.fromTo('.preloader-tagline', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');

    const exitTl = gsap.timeline({ delay: 3.0 });
    exitTl.to('.preloader-content', { y: -50, opacity: 0, duration: 0.5, ease: 'power3.in' });
    exitTl.to('.preloader-curtain-top', { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, '-=0.1');
    exitTl.to('.preloader-curtain-bottom', { yPercent: 100, duration: 0.85, ease: 'power4.inOut' }, '<');
    exitTl.call(() => { document.body.style.overflow = ''; onComplete(); });

    return () => { document.body.style.overflow = ''; };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-auto">
      <div className="preloader-curtain-top absolute top-0 left-0 right-0 h-1/2 bg-[#1E1A2E]" />
      <div className="preloader-curtain-bottom absolute bottom-0 left-0 right-0 h-1/2 bg-[#1E1A2E]" />
      <div className="preloader-content absolute inset-0 flex flex-col items-center justify-center z-10 gap-4">
        <div className="lobster-animation-container w-[140px] md:w-[160px]">
          <img src="/Lobster_Final.svg" alt="Lobster" className="lobster-illustration w-full h-auto" />
        </div>
        <div className="overflow-hidden flex items-baseline">
          {['L','O','B','S','T','E','R'].map((char, i) => (
            <span key={i} className="preloader-char inline-block text-5xl md:text-7xl text-[#FDF8F3]"
              style={{ fontFamily: "'BN Sonic', sans-serif", fontWeight: 400, letterSpacing: '0.02em' }}>
              {char}
            </span>
          ))}
        </div>
        <p className="preloader-tagline text-[10px] uppercase tracking-[0.1em] text-[#FDF8F3]/30 -mt-2">Creative Web Studio</p>
        <div className="w-48 md:w-64 mt-4">
          <div className="h-[1px] bg-[#FDF8F3]/10 rounded-full overflow-hidden">
            <div className="preloader-bar-fill h-full bg-[#FF4F40] rounded-full" />
          </div>
          <div className="flex justify-between mt-3">
            <span className="text-[10px] text-[#FDF8F3]/20 uppercase tracking-[0.06em]">Loading</span>
            <span className="text-[10px] text-[#FDF8F3]/40 tabular-nums uppercase tracking-[0.06em]">{count}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
