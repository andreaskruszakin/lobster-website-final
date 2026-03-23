'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    num: '01', title: 'Front-end',
    capabilities: ['React & Next.js', 'Design Systems', 'Interactive WebGL', 'Motion & Animation'],
  },
  {
    num: '02', title: 'Data Engineering',
    capabilities: ['ETL & Pipelines', 'Data Warehousing', 'Real-time Analytics', 'ML Integration'],
  },
  {
    num: '03', title: 'Infrastructure',
    capabilities: ['AWS / GCP / Azure', 'DevOps Automation', 'Security & Compliance', 'CI/CD Pipelines'],
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.services-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } });
    gsap.fromTo('.service-row', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.services-list', start: 'top 80%' } });
  }, { scope: containerRef });

  return (
    <section id="services" ref={containerRef} className="py-28 md:py-36 px-6 md:px-12 bg-[#FDF8F3]">
      <div className="max-w-[1400px] mx-auto">
        <div className="services-heading parallax-section-heading mb-16 md:mb-20">
          <img src="/Clam.svg" alt="" style={{ width: 80, height: 80, objectFit: 'contain' }} className="mb-0" />
          <h2 style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400, letterSpacing: '-1px' }} className="text-5xl md:text-7xl text-[#1E1A2E] leading-[1]">
            What we do<span className="inline-block w-[0.13em] h-[0.13em] bg-[#FF4F40] rounded-[0.03em] ml-[0.06em]" style={{ verticalAlign: '-0.05em' }} />
          </h2>
        </div>

        <div className="services-list">
          {SERVICES.map((service, i) => (
            <div
              key={service.num}
              className="service-row group border-t border-[#1E1A2E]/10 last:border-b py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-12 cursor-pointer hover:opacity-80 transition-opacity duration-300"
            >
              {/* Number */}
              <span
                className="shrink-0 leading-none text-[#1E1A2E]/30"
                style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400, fontSize: 20, letterSpacing: '-0.2px' }}
              >
                {service.num}
              </span>

              {/* Title */}
              <h3
                className="shrink-0 md:w-64"
                style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400, fontSize: 36, letterSpacing: '-1px', lineHeight: 1.1, color: '#1E1A2E' }}
              >
                {service.title}
              </h3>

              {/* Capabilities */}
              <div className="flex flex-col gap-1 flex-1 opacity-60">
                {service.capabilities.map((cap) => (
                  <p key={cap} className="text-[16px] text-[#1E1A2E] leading-[1.5]">{cap}</p>
                ))}
              </div>

              {/* Read more */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[16px] font-semibold text-[#FF4F40]">Read more</span>
                <ArrowUpRight className="w-4 h-4 text-[#FF4F40] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
