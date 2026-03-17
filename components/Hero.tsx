'use client';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import LobsterWavingSticker from '@/imports/LobsterWavingSticker';
import LobsterCodingSticker from '@/imports/LobsterCodingSticker';

export default function Hero({ isReady = true }: { isReady?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/London' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!isReady) return;
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo('.hero-char', { y: '120%', rotateX: 40 }, { y: '0%', rotateX: 0, duration: 1.4, stagger: 0.06, ease: 'power4.out' });
    tl.fromTo('.hero-tagline', { opacity: 0, y: 40, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }, '-=0.6');
    tl.fromTo('.hero-meta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }, '-=0.6');
    tl.fromTo('.hero-sticker', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.4');
    gsap.to('.hero-sticker-waving', { y: -8, rotation: 3, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.hero-sticker-coding', { y: 8, rotation: -3, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });
    gsap.to('.blob-1', { x: 40, y: -30, scale: 1.1, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.blob-2', { x: -30, y: 40, scale: 0.9, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
    gsap.to('.blob-3', { x: 20, y: 20, scale: 1.05, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
  }, { scope: containerRef, dependencies: [isReady] });

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-[#F26044]">
      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-30 pointer-events-none opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob-1 absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-[#FF7D63]/30 blur-[100px]" />
        <div className="blob-2 absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-[#FFC4A3]/25 blur-[80px]" />
        <div className="blob-3 absolute top-[50%] left-[50%] w-[25vw] h-[25vw] rounded-full bg-[#D14830]/20 blur-[80px]" />
      </div>
      {/* Stickers */}
      <div className="hero-sticker hero-sticker-waving absolute z-20 top-[14%] left-[4%] pointer-events-none" style={{ width: 500 * 0.44, height: 385 * 0.44 }}>
        <div className="relative" style={{ width: 500, height: 385, transform: 'scale(0.44)', transformOrigin: 'top left' }}>
          <LobsterWavingSticker />
        </div>
      </div>
      <div className="hero-sticker hero-sticker-coding absolute z-20 bottom-[16%] right-[4%] pointer-events-none" style={{ width: 550 * 0.42, height: 385 * 0.42 }}>
        <div className="relative" style={{ width: 550, height: 385, transform: 'scale(0.42)', transformOrigin: 'top left' }}>
          <LobsterCodingSticker />
        </div>
      </div>
      {/* Top metadata */}
      <div className="relative z-20 pt-24 px-6 md:px-12 flex justify-between items-start">
        <div className="hero-meta">
          <p className="font-['Inter'] text-[10px] uppercase tracking-[0.08em] text-[#FDF8F3]/60">Est. 2024</p>
          <p className="font-['Inter'] text-[10px] uppercase tracking-[0.08em] text-[#FDF8F3]/60 mt-1">London, UK</p>
        </div>
        <div className="hero-meta text-right">
          <p className="font-['Inter'] text-[10px] uppercase tracking-[0.08em] text-[#FDF8F3]/60">Web Development</p>
          <p className="font-['Inter'] text-[10px] uppercase tracking-[0.08em] text-[#FDF8F3]/60 mt-1">Creative Agency</p>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-10 px-4">
        <div className="w-full flex justify-center overflow-hidden" style={{ perspective: '1000px' }}>
          <div className="flex items-baseline leading-[0.85] select-none">
            {['L','O','B','S','T','E','R'].map((char, i) => (
              <span key={i} className="hero-char inline-block font-['BN_Rollcall','Anton',sans-serif] text-[20vw] md:text-[18vw] lg:text-[16vw] tracking-[-0.02em] text-[#FDF8F3] will-change-transform uppercase">
                {char}
              </span>
            ))}
          </div>
        </div>
        <div className="hero-tagline mt-2 md:mt-4 text-center max-w-2xl mx-auto px-4">
          <h2 className="font-['Inter'] text-lg md:text-2xl font-medium text-[#FDF8F3]/90 leading-snug" style={{ letterSpacing: '-0.02em' }}>
            The creative studio that builds <br className="hidden md:inline" />
            digital experiences <span className="font-['Inter'] font-light italic text-[#FDF8F3]/50 text-[0.85em] uppercase tracking-[-0.04em]">worth talking about.</span>
          </h2>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="relative z-20 pb-16 px-6 md:px-12 flex justify-end items-end">
        <div className="hero-meta text-right">
          <p className="font-['Inter'] text-[10px] uppercase tracking-[0.08em] text-[#FDF8F3]/50">London</p>
          <p className="font-['Inter'] text-[14px] tabular-nums tracking-[0.04em] text-[#FDF8F3]/80 mt-0.5 uppercase">{time}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#FDF8F3] rounded-t-[2rem]" />
    </section>
  );
}
