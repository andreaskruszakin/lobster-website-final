'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero({ isReady = true }: { isReady?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lobsterRef = useRef<HTMLDivElement>(null);
  const clamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const lobster = lobsterRef.current;
    const clam = clamRef.current;
    if (!container || !lobster || !clam) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      gsap.to(lobster, { x, y, duration: 1, ease: 'power2.out' });
      gsap.to(clam, { x: x * -0.6, y: y * -0.6, duration: 1.2, ease: 'power2.out' });
    };
    container.addEventListener('mousemove', onMove);
    return () => container.removeEventListener('mousemove', onMove);
  }, []);

  useGSAP(() => {
    if (!isReady) return;
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo('.hero-line-1', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1, ease: 'power4.out' });
    tl.fromTo('.hero-line-2', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1, ease: 'power4.out' }, '-=0.7');
    tl.fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
    tl.fromTo('.hero-cta', { opacity: 0, y: 16, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4');
    tl.fromTo('.hero-lobster', { scale: 0.6, opacity: 0, rotate: 25 }, { scale: 1, opacity: 1, rotate: 15, duration: 1.2, ease: 'back.out(1.4)' }, '-=0.9');
    tl.fromTo('.hero-clam', { scale: 0.6, opacity: 0, rotate: -25 }, { scale: 1, opacity: 1, rotate: -15, duration: 1.2, ease: 'back.out(1.4)' }, '-=1.0');
    gsap.to('.hero-lobster', { y: -14, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 });
    gsap.to('.hero-clam', { y: 10, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.6 });
  }, { scope: containerRef, dependencies: [isReady] });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ backgroundColor: '#FF4F40' }}
    >
      {/* Lobster illustration — top right */}
      <div
        ref={lobsterRef}
        className="absolute z-10 pointer-events-none"
        style={{ right: '4%', top: '18%', width: 'clamp(130px, 16vw, 220px)' }}
      >
        <img
          src="/Lobster_Hero_New.png"
          alt=""
          className="hero-lobster w-full h-auto"
          style={{ rotate: '15deg' }}
        />
      </div>

      {/* Clam illustration — left side */}
      <div
        ref={clamRef}
        className="absolute z-10 pointer-events-none"
        style={{ left: '6%', bottom: '22%', width: 'clamp(100px, 12vw, 180px)' }}
      >
        <img
          src="/Clam_Final.png"
          alt=""
          className="hero-clam w-full h-auto"
          style={{ rotate: '-15deg' }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center relative z-20 px-6 md:px-14 pt-28 pb-16">
        <div className="overflow-hidden mb-0">
          <div
            className="hero-line-1"
            style={{
              fontFamily: "'BN Sonic', sans-serif",
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              fontWeight: 400,
              color: '#FDF8F3',
              letterSpacing: '-0.015em',
              lineHeight: 0.9,
            }}
          >
            We build websites
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            className="hero-line-2"
            style={{
              fontFamily: "'BN Sonic', sans-serif",
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              fontWeight: 400,
              color: '#FDF8F3',
              letterSpacing: '-0.015em',
              lineHeight: 0.9,
            }}
          >
            that Snap
          </div>
        </div>

        <p
          className="hero-sub mt-8 max-w-[420px] text-center text-base md:text-lg leading-[1.55]"
          style={{ color: 'rgba(253,248,243,0.8)', letterSpacing: '-0.01em' }}
        >
          Fresh off the ocean floor, web products so good they should come with butter.
        </p>

        <div className="hero-cta mt-8 flex items-center gap-2">
          <button
            onClick={() => scrollTo('contact')}
            className="flex items-center gap-2 bg-[#FDF8F3] text-[#FF4F40] px-5 py-3 rounded-xl text-[14px] font-semibold hover:bg-white active:scale-95 transition-all duration-200"
          >
            Book a call
          </button>
          <button
            onClick={() => scrollTo('services')}
            className="flex items-center justify-center bg-[rgba(253,248,243,0.15)] text-[#FDF8F3] w-11 h-11 rounded-xl hover:bg-[rgba(253,248,243,0.25)] active:scale-95 transition-all duration-200"
            aria-label="View services"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#FDF8F3] rounded-t-[2rem]" />
    </section>
  );
}
