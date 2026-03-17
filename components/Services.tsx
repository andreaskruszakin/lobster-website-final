'use client';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    id: 'experience', title: 'Digital Experience',
    description: 'Interfaces that feel invisible. We craft performant front-ends that users actually enjoy using.',
    capabilities: ['React & Next.js', 'Design Systems', 'Interactive WebGL', 'Motion & Animation'],
    bg: '#FFF5EF', accent: '#FF4F40', textColor: '#1E1A2E',
    illustrationSrc: '/Lighthouse_Final.svg',
  },
  {
    id: 'data', title: 'Data Engineering',
    description: 'We structure chaos into clarity. Pipelines, warehousing, and analytics that empower decision making.',
    capabilities: ['ETL & Pipelines', 'Data Warehousing', 'Real-time Analytics', 'ML Integration'],
    bg: '#EEEAF8', accent: '#B9B0E8', textColor: '#1E1A2E',
    illustrationSrc: '/Folder_Final.svg',
  },
  {
    id: 'infra', title: 'Infrastructure',
    description: 'Rock-solid foundations. Scalable cloud architectures that grow with your business needs.',
    capabilities: ['AWS / GCP / Azure', 'DevOps Automation', 'Security & Compliance', 'CI/CD Pipelines'],
    bg: '#1E1A2E', accent: '#FF4F40', textColor: '#FDF8F3',
    illustrationSrc: '/Server_Final.svg',
  },
];

function ServiceCard({ service }: { service: typeof SERVICES[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="service-card group relative rounded-[28px] overflow-hidden cursor-pointer transition-all duration-500"
      style={{ backgroundColor: service.bg, border: hovered ? `1px solid ${service.accent}40` : '1px solid transparent' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex items-center justify-center pt-10 pb-2 md:pt-12 overflow-hidden" style={{ minHeight: 160 }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full blur-[50px] opacity-25 group-hover:opacity-45 transition-opacity duration-500" style={{ backgroundColor: service.accent }} />
        <div className="service-sticker relative transition-transform duration-500 group-hover:scale-105 flex items-center justify-center" style={{ height: 120 }}>
          <img src={service.illustrationSrc} alt={service.title} className="h-full w-auto max-w-[110px] object-contain" />
        </div>
      </div>
      <div className="relative z-10 px-7 pb-8 md:px-9 md:pb-10 pt-4 md:pt-6">
        <h3 className="font-black text-[28px] md:text-[34px] leading-[1] mb-3" style={{ color: service.textColor }}>{service.title}</h3>
        <p className="text-[14px] leading-[1.7] mb-6 opacity-60" style={{ color: service.textColor }}>{service.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {service.capabilities.map((cap) => (
            <span key={cap} className="text-[11px] uppercase tracking-[0.06em] px-3 py-1.5 rounded-lg transition-colors duration-300"
              style={{ backgroundColor: service.id === 'infra' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)', color: service.textColor, opacity: 0.7 }}>
              {cap}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-400">
            <span className="text-[12px] uppercase tracking-wide font-semibold" style={{ color: service.accent }}>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5" style={{ color: service.accent }} />
          </div>
          <div className="w-2 h-2 rounded-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: service.accent }} />
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.services-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } });
    gsap.fromTo('.service-card', { y: 80, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.18, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } });
    gsap.fromTo('.service-sticker', { y: 30, opacity: 0, rotate: -5 }, { y: 0, opacity: 1, rotate: 0, duration: 1.1, stagger: 0.2, ease: 'power3.out', delay: 0.2, scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } });
  }, { scope: containerRef });

  return (
    <section id="services" ref={containerRef} className="py-28 md:py-36 px-6 md:px-12 bg-[#FDF8F3]">
      <div className="max-w-[1400px] mx-auto">
        <div className="services-heading parallax-section-heading mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.1em] text-[#FF4F40] block mb-3">What We Do</span>
            <h2 className="font-black text-5xl md:text-7xl text-[#1E1A2E] leading-[0.9]">
              Services<span className="inline-block w-[0.13em] h-[0.13em] bg-[#FF4F40] rounded-[0.03em] ml-[0.06em] align-baseline" />
            </h2>
          </div>
          <p className="text-base text-[#1E1A2E]/50 max-w-sm leading-relaxed">Three pillars. One obsession: building digital products that actually matter.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((service, i) => <ServiceCard key={service.id} service={service} />)}
        </div>
      </div>
    </section>
  );
}
