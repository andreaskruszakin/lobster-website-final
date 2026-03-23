'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      '.footer-contact',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' },
      }
    );

    // Edge-to-edge pop-in: scale from 0.82 → 1 + opacity, back.out for the pop
    gsap.fromTo(
      '.footer-wordmark',
      { scale: 0.82, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 1.1, ease: 'back.out(1.6)',
        scrollTrigger: { trigger: '.footer-wordmark', start: 'top 90%' },
      }
    );
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className="bg-[#FDF8F3] pb-0 pt-0 overflow-hidden">
      {/* Contact info row — constrained width */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-8 md:gap-16 py-16 md:py-20">
          {[
            { icon: Mail, label: 'Email', value: 'hello@lobster.agency', href: 'mailto:hello@lobster.agency' },
            { icon: MapPin, label: 'Location', value: 'London, United Kingdom', href: null },
            { icon: Clock, label: 'Response', value: 'Within 24 hours', href: null },
          ].map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="footer-contact flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-[#1E1A2E]/[0.06]">
                <Icon className="w-4 h-4 text-[#1E1A2E]/60" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#1E1A2E]/40 mb-0.5">{label}</p>
                {href
                  ? <a href={href} className="text-[16px] text-[#1E1A2E] hover:text-[#FF4F40] transition-colors">{value}</a>
                  : <p className="text-[16px] text-[#1E1A2E]">{value}</p>
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edge-to-edge wordmark */}
      <div className="footer-wordmark w-full px-2 md:px-4 pb-2">
        <p
          className="leading-[0.85] select-none whitespace-nowrap text-center"
          style={{
            fontFamily: "'BN Sonic', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(4rem, 22.5vw, 22.5vw)',
            color: '#FF4F40',
            letterSpacing: '-0.02em',
          }}
        >
          Lobster
        </p>
      </div>
    </footer>
  );
}
