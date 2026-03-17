'use client';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CHARS = ['L', 'O', 'B', 'S', 'T', 'E', 'R'];

export default function Hero({ isReady = true }: { isReady?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/London' }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Mouse parallax on illustration
  useEffect(() => {
    const container = containerRef.current;
    const sticker = stickerRef.current;
    if (!container || !sticker) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 28;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      gsap.to(sticker, { x, y, duration: 0.9, ease: 'power2.out' });
    };
    container.addEventListener('mousemove', onMove);
    return () => container.removeEventListener('mousemove', onMove);
  }, []);

  useGSAP(() => {
    if (!isReady) return;
    const tl = gsap.timeline({ delay: 0.15 });

    tl.fromTo(
      '.hero-char',
      { y: '80%', opacity: 0, filter: 'blur(24px)', rotate: 6 },
      { y: '0%', opacity: 1, filter: 'blur(0px)', rotate: 0, duration: 1.1, stagger: 0.065, ease: 'power4.out' }
    );
    tl.fromTo(
      '.hero-tagline',
      { opacity: 0, y: 28, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
      '-=0.55'
    );
    tl.fromTo(
      '.hero-meta',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' },
      '-=0.55'
    );
    tl.fromTo(
      '.hero-illustration',
      { scale: 0.7, opacity: 0, rotate: -12 },
      { scale: 1, opacity: 1, rotate: 0, duration: 1.1, ease: 'back.out(1.6)' },
      '-=0.9'
    );

    gsap.to('.hero-illustration', { y: -16, rotation: 4, duration: 4.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 });
    gsap.to('.blob-1', { x: 50, y: -35, scale: 1.12, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.blob-2', { x: -40, y: 50, scale: 0.88, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
    gsap.to('.blob-3', { x: 30, y: 25, scale: 1.06, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
  }, { scope: containerRef, dependencies: [isReady] });

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex flex-col overflow-hidden" style={{ backgroundColor: '#FF4F40' }}>
      {/* Grain */}
      <div
        className="absolute inset-0 z-30 pointer-events-none opacity-[0.045] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob-1 absolute top-[8%] left-[8%] w-[42vw] h-[42vw] rounded-full blur-[110px]" style={{ backgroundColor: '#FE9B66', opacity: 0.4 }} />
        <div className="blob-2 absolute bottom-[8%] right-[4%] w-[36vw] h-[36vw] rounded-full blur-[90px]" style={{ backgroundColor: '#B9B0E8', opacity: 0.28 }} />
        <div className="blob-3 absolute top-[45%] left-[45%] w-[26vw] h-[26vw] rounded-full blur-[80px]" style={{ backgroundColor: '#FF4F40', opacity: 0.2 }} />
      </div>

      {/* Illustration — right side, mouse-parallax */}
      <div
        ref={stickerRef}
        className="absolute z-20 pointer-events-none"
        style={{ right: '3%', top: '50%', transform: 'translateY(-50%)', width: 'clamp(170px, 24vw, 340px)' }}
      >
        <img src="/Lobster_Final.svg" alt="" className="hero-illustration w-full h-auto" />
      </div>

      {/* Top metadata */}
      <div className="relative z-20 pt-24 px-6 md:px-14 flex justify-between items-start">
        <div className="hero-meta">
          <p className="text-[10px] uppercase tracking-[0.08em] text-[#FDF8F3]/55">Est. 2024</p>
          <p className="text-[10px] uppercase tracking-[0.08em] text-[#FDF8F3]/55 mt-1">London, UK</p>
        </div>
        <div className="hero-meta text-right">
          <p className="text-[10px] uppercase tracking-[0.08em] text-[#FDF8F3]/55">Web Development</p>
          <p className="text-[10px] uppercase tracking-[0.08em] text-[#FDF8F3]/55 mt-1">Creative Agency</p>
        </div>
      </div>

      {/* LOBSTER text + tagline */}
      <div className="flex-1 flex flex-col justify-center relative z-10 px-6 md:px-14 pb-10">
        <div className="overflow-hidden" style={{ perspective: '900px' }}>
          <div className="flex items-end leading-[0.82] select-none" style={{ marginLeft: '-0.03em' }}>
            {CHARS.map((char, i) => (
              <span
                key={i}
                className="hero-char inline-block will-change-transform"
                style={{
                  fontFamily: "'BN Sonic', sans-serif",
                  fontSize: 'clamp(4.5rem, 18.5vw, 17rem)',
                  fontWeight: 400,
                  color: '#FDF8F3',
                  letterSpacing: '-0.01em',
                  lineHeight: 0.88,
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-tagline mt-5 md:mt-7 max-w-xl">
          <p className="text-base md:text-xl font-medium leading-snug" style={{ color: 'rgba(253,248,243,0.82)', letterSpacing: '-0.02em' }}>
            The creative studio that builds digital experiences
            <span className="font-light italic ml-1" style={{ color: 'rgba(253,248,243,0.45)', fontSize: '0.87em' }}>
              {' '}worth talking about.
            </span>
          </p>
        </div>
      </div>

      {/* Bottom clock */}
      <div className="relative z-20 pb-16 px-6 md:px-14 flex justify-end items-end">
        <div className="hero-meta text-right">
          <p className="text-[10px] uppercase tracking-[0.08em]" style={{ color: 'rgba(253,248,243,0.45)' }}>London</p>
          <p className="text-[14px] tabular-nums tracking-[0.04em] mt-0.5 uppercase" style={{ color: 'rgba(253,248,243,0.75)' }}>{time}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#FDF8F3] rounded-t-[2rem]" />
    </section>
  );
}
