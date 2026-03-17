'use client';
import React, { useRef, useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Twitter, Instagram, Github } from 'lucide-react';

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
  { id: 'lobster', src: '/Lobster_Final.svg', w: 293, h: 316 },
  { id: 'squid', src: '/Squid_Final.svg', w: 402, h: 294 },
  { id: 'lighthouse', src: '/Lighthouse_Final.svg', w: 203, h: 331 },
  { id: 'folder', src: '/Folder_Final.svg', w: 292, h: 242 },
  { id: 'server', src: '/Server_Final.svg', w: 199, h: 260 },
];
const SPAWN_POSITIONS = [
  { x: 8, y: 12 }, { x: 85, y: 12 }, { x: 8, y: 50 }, { x: 85, y: 50 },
  { x: 8, y: 80 }, { x: 85, y: 75 }, { x: 45, y: 10 }, { x: 65, y: 78 },
  { x: 25, y: 75 }, { x: 60, y: 15 },
];

interface PopupSticker { key: number; stickerIdx: number; posIdx: number }

function StickerPopup({ src, naturalW, naturalH, scale, x, y }: { src: string; naturalW: number; naturalH: number; scale: number; x: number; y: number }) {
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
      <img src={src} alt="" style={{ width: displayW, height: displayH, objectFit: 'contain' }} />
    </div>
  );
}

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
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
          return <StickerPopup key={popup.key} src={sticker.src} naturalW={sticker.w} naturalH={sticker.h} scale={scale} x={pos.x} y={pos.y} />;
        })}
      </div>

      {/* CTA Section */}
      <div className="relative pt-28 md:pt-36 pb-20 md:pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto text-center relative">
          <h2 className="footer-cta-headline font-black text-[clamp(3rem,10vw,8rem)] leading-[0.88] tracking-tight text-[#1E1A2E]">
            Let&apos;s Build<br />Something<span className="inline-block w-[0.13em] h-[0.13em] bg-[#FF4F40] rounded-[0.03em] ml-[0.06em] align-baseline" />
          </h2>
          <div className="footer-cta-btns mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:hello@lobster.agency" className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-2xl border border-[#1E1A2E]/10 hover:border-[#1E1A2E]/25 transition-all duration-300">
              <span className="text-[14px] font-medium text-[#1E1A2E]" style={{ letterSpacing: '-0.02em' }}>Email us</span>
              <div className="w-10 h-10 rounded-xl bg-[#1E1A2E] flex items-center justify-center">
                <Mail className="w-4 h-4 text-[#FDF8F3]" />
              </div>
            </a>
            <button onClick={() => scrollTo('contact')} className="bg-[#FF4F40] text-white px-7 py-3.5 rounded-xl text-[14px] font-semibold hover:bg-[#ff7d63] active:scale-95 transition-all duration-300">
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
      <div className="footer-bottom relative bg-[#E8E3DB] text-[#1E1A2E]">
        <div className="pt-10 md:pt-14 pb-8 px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-end mb-12 md:mb-16">
              <div className="md:col-span-5 overflow-hidden">
                <div ref={logoContainerRef} className="footer-giant-text select-none pointer-events-none" style={{ width: 'clamp(220px, 32vw, 400px)' }}>
                  <img src="/Logo_Final.svg" alt="Lobster" className="w-full h-auto" />
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col items-start md:items-center gap-8">
                <div className="footer-bottom-reveal flex flex-wrap gap-2">
                  {NAV_LINKS.map((link) => (
                    <button key={link.id} onClick={() => scrollTo(link.id)} className="px-5 py-2.5 rounded-2xl border border-[#1E1A2E]/10 text-[13px] font-medium text-[#1E1A2E]/70 hover:text-[#1E1A2E] hover:border-[#1E1A2E]/25 hover:bg-white/50 transition-all duration-300">
                      {link.label}
                    </button>
                  ))}
                </div>
                <div className="footer-bottom-reveal flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-[0.08em] text-[#1E1A2E]/30 mr-1">Follow us</span>
                  {SOCIALS.map((social) => (
                    <a key={social.label} href={social.href} aria-label={social.label} className="w-9 h-9 rounded-xl border border-[#1E1A2E]/10 flex items-center justify-center text-[#1E1A2E]/50 hover:text-[#FF4F40] hover:border-[#FF4F40]/30 hover:bg-white/60 transition-all duration-300">
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="md:col-span-3 flex flex-col gap-6 md:items-end">
                <div className="footer-bottom-reveal">
                  <p className="text-[9px] uppercase tracking-[0.08em] text-[#1E1A2E]/30 mb-1.5">Contact</p>
                  <a href="mailto:hello@lobster.agency" className="text-[14px] text-[#1E1A2E]/70 hover:text-[#FF4F40] transition-colors block" style={{ letterSpacing: '-0.02em' }}>hello@lobster.agency</a>
                  <p className="text-[14px] text-[#1E1A2E]/70 mt-0.5" style={{ letterSpacing: '-0.02em' }}>+44 20 7946 0958</p>
                </div>
                <div className="footer-bottom-reveal">
                  <p className="text-[9px] uppercase tracking-[0.08em] text-[#1E1A2E]/30 mb-1.5">Address</p>
                  <p className="text-[14px] text-[#1E1A2E]/70" style={{ letterSpacing: '-0.02em' }}>Shoreditch, London<br />EC2A 4NE, UK</p>
                </div>
              </div>
            </div>
            <div className="footer-bottom-reveal pt-6 border-t border-[#1E1A2E]/[0.06] flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#1E1A2E]/30">
              <p>&copy; {new Date().getFullYear()} Lobster Agency. All rights reserved.</p>
              <a href="#" className="hover:text-[#1E1A2E]/60 transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
