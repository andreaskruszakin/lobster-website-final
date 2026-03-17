'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const NAV_LINKS = [
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'work' },
  { label: 'Process', id: 'process' },
];
const SERVICE_PILLS = ['Experience', 'Data', 'Infra'];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.footer-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } });
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className="bg-[#FDF8F3] px-4 md:px-8 pb-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="footer-card relative rounded-[36px] overflow-hidden" style={{ backgroundColor: '#FE9B66' }}>

          {/* Large faded lobster illustration — right side */}
          <div
            className="absolute bottom-0 right-0 pointer-events-none select-none"
            style={{ width: 'clamp(180px, 22vw, 300px)', opacity: 0.22 }}
          >
            <img src="/Lobster_Final.svg" alt="" className="w-full h-auto" />
          </div>

          {/* Card content */}
          <div className="relative z-10 px-8 md:px-14 pt-10 md:pt-14 pb-8 md:pb-10">

            {/* Logo */}
            <div className="mb-10">
              <img
                src="/Logo_Final.svg"
                alt="Lobster"
                style={{ height: 26, filter: 'brightness(0) invert(1)', opacity: 0.9 }}
              />
            </div>

            {/* Main row: tagline + pills | email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">
              <div>
                <p className="text-white/75 text-[15px] leading-relaxed mb-7" style={{ letterSpacing: '-0.02em' }}>
                  The agency that enjoys solving problems
                </p>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_PILLS.map((pill) => (
                    <button
                      key={pill}
                      onClick={() => scrollTo('services')}
                      className="px-4 py-1.5 rounded-xl border border-white/35 text-white/75 text-[13px] font-medium hover:bg-white/15 hover:border-white/50 transition-all duration-200"
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <a
                  href="mailto:hello@lobster.digital"
                  className="text-white/75 text-[15px] hover:text-white transition-colors duration-200"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  hello@lobster.agency
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

            {/* Bottom bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-6">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="text-white/65 text-[13px] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <p className="text-white/40 text-[12px]">
                &copy; {new Date().getFullYear()} Lobster Digital. All rights reserved.
              </p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
