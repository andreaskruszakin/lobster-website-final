'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TESTIMONIALS = [
  {
    quote: "Lobster delivered in 3 weeks what previous agencies had been promising for 3 months. The team was direct, fast, and actually gave a damn about the outcome.",
    name: "Sarah Brennan",
    role: "Founder, Whirlpool",
    avatarColor: '#FF4F40',
  },
  {
    quote: "Lobster delivered in 3 weeks what previous agencies had been promising for 3 months. The team was direct, fast, and actually gave a damn about the outcome.",
    name: "George Broomby",
    role: "Founder, Indesit",
    avatarColor: '#B9B0E8',
  },
  {
    quote: "Our data pipeline was a mess. Lobster rebuilt it from scratch in 6 weeks. We went from 12-hour batch jobs to real-time in one sprint.",
    name: "Barbara Okonkwo",
    role: "Founder, Spot",
    avatarColor: '#FE9B66',
  },
  {
    quote: "I've worked with a lot of agencies. Lobster is different — they push back when your idea is wrong and tell you why. That's rare and incredibly valuable.",
    name: "Priya Mehta",
    role: "CEO, TalentBridge",
    avatarColor: '#1E1A2E',
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.testimonials-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } });
    gsap.fromTo('.testimonial-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.testimonials-grid', start: 'top 80%' } });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-28 md:py-36 px-6 md:px-12 bg-[#FDF8F3]">
      <div className="max-w-[1400px] mx-auto">
        <div className="testimonials-heading parallax-section-heading mb-14 md:mb-20">
          <div className="mb-4">
            <img src="/Lighthouse_Final.svg" alt="" style={{ width: 60, height: 'auto' }} />
          </div>
          <h2 className="font-black text-5xl md:text-7xl text-[#1E1A2E] leading-[0.9]">
            What our Lobsters say<span className="inline-block w-[0.13em] h-[0.13em] bg-[#FF4F40] rounded-[0.03em] ml-[0.06em] align-baseline" />
          </h2>
        </div>
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testimonial-card bg-white rounded-[28px] p-8 md:p-12 border border-[#1E1A2E]/[0.06] flex flex-col gap-5"
              style={{ minHeight: 228 }}
            >
              <p className="text-[16px] text-[#1E1A2E] leading-[1.55]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full shrink-0"
                  style={{ backgroundColor: t.avatarColor }}
                />
                <div>
                  <p className="text-[16px] font-semibold text-[#1E1A2E]">{t.name}</p>
                  <p className="text-[12px]" style={{ color: 'rgba(30,26,46,0.4)' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
