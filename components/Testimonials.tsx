'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TESTIMONIALS = [
  {
    quote: "Lobster delivered in 3 weeks what previous agencies had been promising for 3 months. The team was direct, fast, and actually gave a damn about the outcome.",
    name: "Sarah Brennan",
    role: "Founder, FinFlow",
    avatar: "/images/40YISsvwSJc4RxvqVYZATAMwlM.jpg.png",
  },
  {
    quote: "No fluff, no account managers, no nonsense. Just engineers who ship. The product went live on time, under budget, and it actually works.",
    name: "Marcus Liu",
    role: "CTO, LaunchPad",
    avatar: "/images/5gmEX58ZB6E6bhMpCUhzutgd48.jpg.png",
  },
  {
    quote: "Our data pipeline was a mess. Lobster rebuilt it from scratch in 6 weeks. We went from 12-hour batch jobs to real-time in one sprint.",
    name: "Ryan Okonkwo",
    role: "Head of Data, Altoe",
    avatar: "/images/Ryan.jpeg",
  },
  {
    quote: "I've worked with a lot of agencies. Lobster is different — they push back when your idea is wrong and tell you why. That's rare and incredibly valuable.",
    name: "Priya Mehta",
    role: "CEO, TalentBridge",
    avatar: "/images/W6EKuDKZ6ilw7quzpU9IfkL248E.jpg.png",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.testimonials-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } });
    gsap.fromTo('.testimonial-card', { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.testimonials-grid', start: 'top 80%' } });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-28 md:py-36 px-6 md:px-12 bg-[#FDF8F3]">
      <div className="max-w-[1400px] mx-auto">
        <div className="testimonials-heading parallax-section-heading mb-14 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.1em] text-[#F26044] block mb-4">Social Proof</span>
          <h2 className="font-black text-5xl md:text-7xl text-[#1A1A1A] leading-[0.9]">
            What clients say<span className="inline-block w-[0.13em] h-[0.13em] bg-[#F26044] rounded-[0.03em] ml-[0.06em] align-baseline" />
          </h2>
        </div>
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card bg-white rounded-[28px] p-8 md:p-10 border border-[#1A1A1A]/[0.06] flex flex-col justify-between min-h-[220px]">
              <p className="text-[16px] md:text-[18px] text-[#1A1A1A] leading-[1.6] mb-8" style={{ letterSpacing: '-0.02em' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F5F0EA] shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1A1A1A]" style={{ letterSpacing: '-0.02em' }}>{t.name}</p>
                  <p className="text-[12px] text-[#1A1A1A]/40">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
