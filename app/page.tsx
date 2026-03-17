'use client';
import React, { useState, useCallback, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Principles from '@/components/Principles';
import Services from '@/components/Services';
import ClientLogos from '@/components/ClientLogos';
import Work from '@/components/Work';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) { gsap.defaults({ duration: 0, ease: 'none' }); return; }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const rafCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    const resizeTimers = [
      setTimeout(() => { lenis.resize(); ScrollTrigger.refresh(); }, 300),
      setTimeout(() => { lenis.resize(); ScrollTrigger.refresh(); }, 1000),
      setTimeout(() => { lenis.resize(); ScrollTrigger.refresh(); }, 2500),
    ];

    let roTimeout: ReturnType<typeof setTimeout> | null = null;
    const ro = new ResizeObserver(() => {
      if (roTimeout) clearTimeout(roTimeout);
      roTimeout = setTimeout(() => { lenis.resize(); ScrollTrigger.refresh(); }, 200);
    });
    ro.observe(document.body);

    gsap.utils.toArray<HTMLElement>('.parallax-section-heading').forEach((el) => {
      gsap.fromTo(el, { yPercent: 5 }, { yPercent: -5, ease: 'none', scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
    });

    return () => {
      resizeTimers.forEach(clearTimeout);
      if (roTimeout) clearTimeout(roTimeout);
      ro.disconnect();
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
      gsap.defaults({});
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-[#FDF8F3] text-[#1E1A2E] selection:bg-[#FF4F40] selection:text-white">
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      {!isLoading && <Navbar />}
      <main>
        <Hero isReady={!isLoading} />
        <Principles />
        <Services />
        <ClientLogos />
        <Work />
        <Process />
        <Testimonials />
        <ClientLogos />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
