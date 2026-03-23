'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    num: '01',
    title: 'Front-end',
    capabilities: ['React & Next.js', 'Design Systems', 'Interactive WebGL', 'Motion & Animation'],
    icon: '/Terminal.svg',
  },
  {
    num: '02',
    title: 'Data Engineering',
    capabilities: ['ETL & Pipelines', 'Data Warehousing', 'Real-time Analytics', 'ML Integration'],
    icon: '/Data.svg',
  },
  {
    num: '03',
    title: 'Infrastructure',
    capabilities: ['AWS / GCP / Azure', 'DevOps Automation', 'Security & Compliance', 'CI/CD Pipelines'],
    icon: '/Server.svg',
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      '.services-heading',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } }
    );
    gsap.fromTo(
      '.service-card',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.services-cards', start: 'top 80%' } }
    );
  }, { scope: containerRef });

  return (
    <section id="services" ref={containerRef} className="py-[120px] px-6 md:px-12 bg-[#FDF8F3]">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-16">

        {/* Heading */}
        <div className="services-heading parallax-section-heading">
          <img src="/Clam.svg" alt="" style={{ width: 80, height: 80, objectFit: 'contain' }} className="mb-0" />
          <h2
            style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400, letterSpacing: '-1px' }}
            className="text-5xl md:text-7xl text-[#1E1A2E] leading-[1]"
          >
            What we do
            <span
              className="inline-block bg-[#FF4F40] rounded-[4px] ml-[0.06em]"
              style={{ width: 12, height: 12, verticalAlign: '-0.05em' }}
            />
          </h2>
        </div>

        {/* Cards grid */}
        <div className="services-cards flex flex-col md:flex-row gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.num}
              className="service-card flex flex-col justify-between rounded-[28px] overflow-hidden"
              style={{ background: '#FDF8F3', flex: 1, minHeight: 467, padding: '24px 32px 32px' }}
            >
              {/* Top: number + title + capabilities + read more */}
              <div className="flex flex-col gap-4">
                <span
                  style={{ fontFamily: "'BBH Hegarty', sans-serif", fontSize: 20, letterSpacing: '-0.2px', lineHeight: '24px', color: '#1E1A2E' }}
                >
                  {service.num}
                </span>
                <h3
                  style={{ fontFamily: "'BBH Hegarty', sans-serif", fontSize: 36, letterSpacing: '-1px', lineHeight: '40px', color: '#1E1A2E', fontWeight: 400 }}
                >
                  {service.title}
                </h3>
                <div className="flex flex-col gap-1">
                  {service.capabilities.map((cap) => (
                    <p key={cap} className="text-[16px] leading-[24px] text-[#1E1A2E]/60">{cap}</p>
                  ))}
                </div>
                <button className="group flex items-center gap-2 mt-2 w-fit">
                  <span style={{ fontFamily: 'var(--font-rubik), sans-serif', fontSize: 16, fontWeight: 500, color: '#FF4F40', lineHeight: '18px' }}>Read more</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FF4F40] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </button>
              </div>

              {/* Bottom: icon */}
              <div className="mt-8">
                <img src={service.icon} alt="" style={{ width: 80, height: 80, objectFit: 'contain' }} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
