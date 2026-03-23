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
    icon: '/Search_Final.svg',
  },
  {
    num: '02', title: 'Data Engineering',
    capabilities: ['ETL & Pipelines', 'Data Warehousing', 'Real-time Analytics', 'ML Integration'],
    icon: '/Folder_Final.svg',
  },
  {
    num: '03', title: 'Infrastructure',
    capabilities: ['AWS / GCP / Azure', 'DevOps Automation', 'Security & Compliance', 'CI/CD Pipelines'],
    icon: '/Server_Final.svg',
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.services-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } });
    gsap.fromTo('.service-card', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } });
  }, { scope: containerRef });

  return (
    <section id="services" ref={containerRef} className="py-28 md:py-36 px-6 md:px-12 bg-[#FDF8F3]">
      <div className="max-w-[1400px] mx-auto">
        <div className="services-heading parallax-section-heading mb-16 md:mb-20">
          <div className="mb-4">
            <img src="/Lighthouse_Final.svg" alt="" style={{ width: 60, height: 'auto' }} />
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-black text-5xl md:text-7xl text-[#1E1A2E] leading-[0.9]">
              What we do<span className="inline-block w-[0.13em] h-[0.13em] bg-[#FF4F40] rounded-[0.03em] ml-[0.06em] align-baseline" />
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.num}
              className="service-card group relative bg-white rounded-[28px] overflow-hidden border border-[#1E1A2E]/[0.06] hover:border-[#FF4F40]/20 hover:shadow-md transition-all duration-400 cursor-pointer flex flex-col"
              style={{ minHeight: 467 }}
            >
              <div className="flex flex-col gap-4 p-8 pt-6 flex-1">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-black text-[20px] text-[#1E1A2E] leading-none" style={{ fontFamily: "'BN Sonic', sans-serif", fontWeight: 400 }}>
                      {service.num}
                    </span>
                    <h3 className="font-black text-[36px] text-[#1E1A2E] leading-[1.1]" style={{ letterSpacing: '-1px' }}>
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1 opacity-60">
                    {service.capabilities.map((cap) => (
                      <p key={cap} className="text-[16px] text-[#1E1A2E] leading-[1.5]">{cap}</p>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-semibold text-[#FF4F40] leading-none">Read more</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FF4F40] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </div>
                </div>
              </div>
              <div className="px-8 pb-6">
                <img src={service.icon} alt="" className="w-[80px] h-[80px] object-contain group-hover:scale-105 transition-transform duration-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
