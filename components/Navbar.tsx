'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import SlideMenu from './SlideMenu';

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastYRef.current;
    if (Math.abs(diff) > 5) setIsHidden(diff > 0 && latest > 100);
    lastYRef.current = latest;
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const btnBase = 'bg-[rgba(253,248,243,0.15)] text-[#FDF8F3] hover:bg-[rgba(253,248,243,0.25)]';

  return (
    <>
      <SlideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <motion.nav
          variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: -100, opacity: 0 } }}
          initial={{ y: -40, opacity: 0 }}
          animate={isHidden ? 'hidden' : 'visible'}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="pointer-events-auto w-full px-5 py-3 flex items-center justify-between bg-[#FF4F40]"
        >
          {/* Left nav pills */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => scrollTo('work')}
              className={`${btnBase} px-4 py-2.5 rounded-xl text-[16px] font-medium transition-all duration-200`}
              style={{ fontFamily: 'var(--font-rubik), sans-serif' }}
            >
              Projects
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className={`${btnBase} px-4 py-2.5 rounded-xl text-[16px] font-medium transition-all duration-200`}
              style={{ fontFamily: 'var(--font-rubik), sans-serif' }}
            >
              Contact
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className={`${btnBase} flex items-center gap-2 px-4 py-2.5 rounded-xl text-[16px] font-medium transition-all duration-200`}
              style={{ fontFamily: 'var(--font-rubik), sans-serif' }}
            >
              Services
              <span className="tracking-[0.12em] text-[9px] opacity-60">•••</span>
            </button>
          </div>

          {/* Center logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
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
          </div>

          {/* Right CTA */}
          <button
            onClick={() => scrollTo('contact')}
            className="bg-[#FDF8F3] text-[#FF4F40] hover:bg-white px-5 py-2.5 rounded-xl text-[16px] font-medium transition-all duration-200 active:scale-95"
            style={{ fontFamily: 'var(--font-rubik), sans-serif' }}
          >
            Book a call
          </button>
        </motion.nav>
      </div>
    </>
  );
}
