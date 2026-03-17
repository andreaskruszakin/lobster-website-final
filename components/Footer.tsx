'use client';
import React, { useRef, useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Twitter, Instagram, Github } from 'lucide-react';
import svgPaths from '@/imports/svg-2yo5qb1oi5';
import LobsterSittingSticker from '@/imports/LobsterSittingSticker';
import LobsterStandingSticker from '@/imports/LobsterStandingSticker';
import LobsterWavingSticker from '@/imports/LobsterWavingSticker';
import LobsterCodingSticker from '@/imports/LobsterCodingSticker';
import LobsterCallingSticker from '@/imports/LobsterCallingSticker';

const NAV_LINKS = [
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'work' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
];
const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
];
const STICKERS = [
  { id: 'sitting', Component: LobsterSittingSticker, w: 450, h: 400 },
  { id: 'standing', Component: LobsterStandingSticker, w: 450, h: 430 },
  { id: 'waving', Component: LobsterWavingSticker, w: 460, h: 450 },
  { id: 'coding', Component: LobsterCodingSticker, w: 480, h: 420 },
  { id: 'calling', Component: LobsterCallingSticker, w: 500, h: 430 },
];
const SPAWN_POSITIONS = [
  { x: 8, y: 12 }, { x: 85, y: 12 }, { x: 8, y: 50 }, { x: 85, y: 50 },
  { x: 8, y: 80 }, { x: 85, y: 75 }, { x: 45, y: 10 }, { x: 65, y: 78 },
  { x: 25, y: 75 }, { x: 60, y: 15 },
];

function NavLogo({ scale }: { scale: number }) {
  return (
    <div style={{ width: 1230, height: 240, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <svg viewBox="0 0 1182.92 167.814" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 1182.92, height: 167.814 }}>
        <path d={svgPaths.pc9f1500} fill="#1A1A1A" fillRule="evenodd" clipRule="evenodd" />
        <path d={svgPaths.p180b7340} fill="#1A1A1A" />
        <path d={svgPaths.p1d91f111} fill="#1A1A1A" />
        <path d={svgPaths.p26957c80} fill="#1A1A1A" />
        <path d={svgPaths.p22223600} fill="#1A1A1A" />
        <path d={svgPaths.p32616c40} fill="#1A1A1A" />
        <path d={svgPaths.p1b198880} fill="#1A1A1A" />
        <path d={svgPaths.p14cae540} fill="#1A1A1A" />
      </svg>
    </div>
  );
}

interface PopupSticker { key: number; stickerIdx: number; posIdx: number }

function StickerPopup({ StickerComponent, naturalW, naturalH, scale, x, y }: { StickerComponent: React.ComponentType; naturalW: number; naturalH: number; scale: number; x: number; y: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const randomRotation = (Math.random() - 0.5) * 30;
    gsap.fromTo(el, { scale: 0.4, opacity: 0, rotation: randomRotation - 10 }, { scale: 1, opacity: 1, rotation: randomRotation, duration: 0.6, ease: 'back.out(2.5)' });
    gsap.to(el, { scale: 0, opacity: 0, rotation: randomRotation + 15, duration: 0.5, ease: 'back.in(2)', delay: 3.5 });
  }, []);
  const displayW = naturalW * scale;
  const displayH = naturalH * scale;
  return (
    <div ref={ref} className="absolute" style={{ left: `clamp(0px, calc(${x}% - ${displayW / 2}px), calc(100% - ${displayW}px))`, top: `clamp(0px, calc(${y}% - ${displayH / 2}px), calc(100% - ${displayH}px))`, width: displayW, height: displayH, opacity: 0, willChange: 'transform, opacity' }}>
      <div className="relative origin-top-left" style={{ width: naturalW, height: naturalH, transform: `scale(${scale})` }}>
        <StickerComponent />
      </div>
    </div>
  );
}

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const [logoScale, setLogoScale] = useState(0.3);
  const [isHovering, setIsHovering] = useState(false);
  const [popups, setPopups] = useState<PopupSticker[]>([]);
  const popupKeyRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastStickerRef = useRef(-1);
  const lastPosRef = useRef(-1);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const spawnSticker = useCallback(() => {
    let sIdx = Math.floor(Math.random() * STICKERS.length);
    if (sIdx === lastStickerRef.current) sIdx = (sIdx + 1) % STICKERS.length;
    lastStickerRef.current = sIdx;
    let pIdx = Math.floor(Math.random() * SPAWN_POSITIONS.length);
    if (pIdx === lastPosRef.current) pIdx = (pIdx + 1) % SPAWN_POSITIONS.length;
    lastPosRef.current = pIdx;
    const key = ++popupKeyRef.current;
    setPopups(prev => [...prev, { key, stickerIdx: sIdx, posIdx: pIdx }]);
    setTimeout(() => setPopups(prev => prev.filter(p => p.key !== key)), 4500);
  }, []);

  useEffect(() => {
    if (isHovering) {
      spawnSticker();
      timerRef.current = setInterval(spawnSticker, 3000);
    } else {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isHovering, spawnSticker]);

  useEffect(() => {
    const el = logoContainerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setLogoScale(entry.contentRect.width / 1230);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.footer-cta-headline', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } });
    gsap.fromTo('.footer-cta-btns', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } });
    gsap.fromTo('.footer-giant-text', { xPercent: -15, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: '.footer-bottom', start: 'top 90%' } });
    gsap.fromTo('.footer-bottom-reveal', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.footer-bottom', start: 'top 85%' } });
    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className="relative bg-[#FDF8F3] z-10" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        {popups.map((popup) => {
          const sticker = STICKERS[popup.stickerIdx];
          const pos = SPAWN_POSITIONS[popup.posIdx];
          const displaySize = 110;
          const scale = displaySize / Math.max(sticker.w, sticker.h);
          return <StickerPopup key={popup.key} StickerComponent={sticker.Component} naturalW={sticker.w} naturalH={sticker.h} scale={scale} x={pos.x} y={pos.y} />;
        })}
      </div>

      {/* CTA Section */}
      <div className="relative pt-28 md:pt-36 pb-20 md:pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto text-center relative">
          <h2 className="footer-cta-headline font-['BN_Rollcall','Anton',sans-serif] text-[clamp(3rem,10vw,8rem)] leading-[0.88] tracking-tight text-[#1A1A1A]">
            Let&apos;s Build<br />Something<span className="inline-block w-[0.13em] h-[0.13em] bg-[#F26044] rounded-[0.03em] ml-[0.06em] align-baseline" />
          </h2>
          <div className="footer-cta-btns mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:hello@lobster.agency" className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-2xl border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/25 transition-all duration-300">
              <span className="font-['Inter'] text-[14px] font-medium text-[#1A1A1A]" style={{ letterSpacing: '-0.02em' }}>Email us</span>
              <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center">
                <Mail className="w-4 h-4 text-[#FDF8F3]" />
              </div>
            </a>
            <button onClick={() => scrollTo('contact')} className="bg-[#F26044] text-white px-7 py-3.5 rounded-xl font-['Inter'] text-[14px] font-semibold hover:bg-[#ff7d63] active:scale-95 transition-all duration-300">
              Start a project →
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px] block">
          <polygon points="0,80 1440,0 1440,80" fill="#E8E3DB" />
        </svg>
      </div>

      {/* Bottom */}
      <div className="footer-bottom relative bg-[#E8E3DB] text-[#1A1A1A]">
        <div className="pt-10 md:pt-14 pb-8 px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-end mb-12 md:mb-16">
              <div className="md:col-span-5 overflow-hidden">
                <div ref={logoContainerRef} className="footer-giant-text select-none pointer-events-none overflow-hidden" style={{ width: 'clamp(220px, 32vw, 400px)', aspectRatio: '1230 / 240' }}>
                  <NavLogo scale={logoScale} />
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col items-start md:items-center gap-8">
                <div className="footer-bottom-reveal flex flex-wrap gap-2">
                  {NAV_LINKS.map((link) => (
                    <button key={link.id} onClick={() => scrollTo(link.id)} className="px-5 py-2.5 rounded-2xl border border-[#1A1A1A]/10 font-['Inter'] text-[13px] font-medium text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/25 hover:bg-white/50 transition-all duration-300">
                      {link.label}
                    </button>
                  ))}
                </div>
                <div className="footer-bottom-reveal flex items-center gap-4">
                  <span className="font-['Inter'] text-[10px] uppercase tracking-[0.08em] text-[#1A1A1A]/30 mr-1">Follow us</span>
                  {SOCIALS.map((social) => (
                    <a key={social.label} href={social.href} aria-label={social.label} className="w-9 h-9 rounded-xl border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A]/50 hover:text-[#F26044] hover:border-[#F26044]/30 hover:bg-white/60 transition-all duration-300">
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="md:col-span-3 flex flex-col gap-6 md:items-end">
                <div className="footer-bottom-reveal">
                  <p className="font-['Inter'] text-[9px] uppercase tracking-[0.08em] text-[#1A1A1A]/30 mb-1.5">Contact</p>
                  <a href="mailto:hello@lobster.agency" className="font-['Inter'] text-[14px] text-[#1A1A1A]/70 hover:text-[#F26044] transition-colors block" style={{ letterSpacing: '-0.02em' }}>hello@lobster.agency</a>
                  <p className="font-['Inter'] text-[14px] text-[#1A1A1A]/70 mt-0.5" style={{ letterSpacing: '-0.02em' }}>+44 20 7946 0958</p>
                </div>
                <div className="footer-bottom-reveal">
                  <p className="font-['Inter'] text-[9px] uppercase tracking-[0.08em] text-[#1A1A1A]/30 mb-1.5">Address</p>
                  <p className="font-['Inter'] text-[14px] text-[#1A1A1A]/70" style={{ letterSpacing: '-0.02em' }}>Shoreditch, London<br />EC2A 4NE, UK</p>
                </div>
              </div>
            </div>
            <div className="footer-bottom-reveal pt-6 border-t border-[#1A1A1A]/[0.06] flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-['Inter'] text-[#1A1A1A]/30">
              <p>&copy; {new Date().getFullYear()} Lobster Agency. All rights reserved.</p>
              <a href="#" className="hover:text-[#1A1A1A]/60 transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
