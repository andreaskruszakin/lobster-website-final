'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import SlideMenu from './SlideMenu';

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastYRef.current;
    if (Math.abs(diff) > 5) setIsHidden(diff > 0 && latest > 100);
    setIsScrolled(latest > 80);
    lastYRef.current = latest;
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const onRed = !isScrolled;

  return (
    <>
      <SlideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300 ${
          onRed ? 'px-0 pt-0' : 'px-4 pt-4'
        }`}
      >
        <motion.nav
          variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: -100, opacity: 0 } }}
          initial={{ y: -40, opacity: 0 }}
          animate={isHidden ? 'hidden' : 'visible'}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className={`pointer-events-auto w-full px-5 py-3 flex items-center justify-between transition-all duration-500 ${
            onRed
              ? 'bg-[#FF4F40] rounded-none'
              : 'max-w-[1344px] bg-[#FDF8F3]/95 backdrop-blur-2xl border border-[#1E1A2E]/[0.08] shadow-sm rounded-[20px]'
          }`}
        >
          {/* Left nav pills */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => scrollTo('work')}
              className={`px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                onRed
                  ? 'bg-[rgba(253,248,243,0.15)] text-[#FDF8F3] hover:bg-[rgba(253,248,243,0.25)]'
                  : 'text-[#1E1A2E]/60 hover:text-[#1E1A2E] hover:bg-[#1E1A2E]/[0.06]'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className={`px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                onRed
                  ? 'bg-[rgba(253,248,243,0.15)] text-[#FDF8F3] hover:bg-[rgba(253,248,243,0.25)]'
                  : 'text-[#1E1A2E]/60 hover:text-[#1E1A2E] hover:bg-[#1E1A2E]/[0.06]'
              }`}
            >
              Contact
            </button>

            {/* Services + dots — single unified button */}
            <button
              onClick={() => setMenuOpen(true)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                onRed
                  ? 'bg-[rgba(253,248,243,0.15)] text-[#FDF8F3] hover:bg-[rgba(253,248,243,0.25)]'
                  : 'text-[#1E1A2E]/60 hover:text-[#1E1A2E] hover:bg-[#1E1A2E]/[0.06]'
              }`}
            >
              Services
              <span className="tracking-[0.12em] text-[9px] opacity-60">•••</span>
            </button>
          </div>

          {/* Center logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            {onRed ? (
              <>
                <img
                  src="/Lobster.svg"
                  alt=""
                  className="w-6 h-6"
                  style={{ transform: 'scaleY(-1) rotate(174deg)', filter: 'brightness(0) invert(1)', opacity: 0.85 }}
                />
                <span
                  style={{
                    fontFamily: "'BN Sonic', sans-serif",
                    fontSize: 28,
                    fontWeight: 400,
                    color: '#FDF8F3',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  Lobster
                </span>
              </>
            ) : (
              <img src="/Logo_Final.svg" alt="Lobster" className="h-7 w-auto" />
            )}
          </div>

          {/* Right CTA */}
          <button
            onClick={() => scrollTo('contact')}
            className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 active:scale-95 ${
              onRed
                ? 'bg-[#FDF8F3] text-[#FF4F40] hover:bg-white'
                : 'bg-[#FF4F40] text-white hover:bg-[#ff6b5a]'
            }`}
          >
            Book a call
          </button>
        </motion.nav>
      </div>
    </>
  );
}
