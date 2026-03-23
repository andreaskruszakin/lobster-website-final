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
    gsap.fromTo('.footer-contact', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } });
    gsap.fromTo('.footer-wordmark', { y: '30%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.footer-wordmark', start: 'top 95%', end: 'top 60%', scrub: 0.4 } });
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className="bg-[#FDF8F3] px-6 md:px-12 pb-0 pt-0">
      <div className="max-w-[1400px] mx-auto">
        {/* Contact info row */}
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

        {/* Large wordmark */}
        <div className="footer-wordmark overflow-hidden">
          <p
            className="leading-[0.85] select-none text-center md:text-left"
            style={{
              fontFamily: "'BN Sonic', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(5rem, 18vw, 18rem)',
              color: '#FF4F40',
              letterSpacing: '-0.02em',
            }}
          >
            Lobster
          </p>
        </div>
      </div>
    </footer>
  );
}
