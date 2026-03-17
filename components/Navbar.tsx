'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import svgPaths from '@/imports/svg-2yo5qb1oi5';

function NavLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1182.92 167.814" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={svgPaths.pc9f1500} fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
      <path d={svgPaths.p180b7340} fill="currentColor" />
      <path d={svgPaths.p1d91f111} fill="currentColor" />
      <path d={svgPaths.p26957c80} fill="currentColor" />
      <path d={svgPaths.p22223600} fill="currentColor" />
      <path d={svgPaths.p32616c40} fill="currentColor" />
      <path d={svgPaths.p1b198880} fill="currentColor" />
      <path d={svgPaths.p14cae540} fill="currentColor" />
    </svg>
  );
}

const SERVICE_ITEMS = [
  { label: 'Digital Experience', desc: 'React, Next.js, Motion' },
  { label: 'Data Engineering', desc: 'Pipelines & Analytics' },
  { label: 'Infrastructure', desc: 'Cloud & DevOps' },
];

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastYRef.current;
    if (Math.abs(diff) > 5) setIsHidden(diff > 0 && latest > 100);
    setIsScrolled(latest > 50);
    lastYRef.current = latest;
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setServicesOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
      <motion.nav
        variants={{ visible: { y: 0, scale: 1, opacity: 1 }, hidden: { y: -100, scale: 0.95, opacity: 0 } }}
        initial={{ y: -40, opacity: 0, scale: 0.96 }}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className={`pointer-events-auto px-2 py-2 rounded-2xl flex items-center gap-1 max-w-[90vw] transition-all duration-500 ${
          isScrolled ? 'bg-[#1A1A1A]/95 backdrop-blur-2xl border border-white/[0.08]' : 'bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/[0.04]'
        }`}
      >
        <div className="pl-4 pr-2 flex items-center">
          <NavLogo className="h-4 w-auto text-[#F26044]" />
        </div>
        <div className="hidden md:block w-px h-6 bg-white/10 mx-1" />
        <div className="hidden md:flex items-center gap-0.5 px-1">
          {/* Services with dropdown */}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button
              onClick={() => scrollTo('services')}
              className="relative px-4 py-2 rounded-xl font-['Inter'] text-[13px] font-medium text-[#FDF8F3]/70 hover:text-[#FDF8F3] hover:bg-white/[0.08] transition-all duration-300 flex items-center gap-1"
            >
              Services
              <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full left-0 mt-2 w-56 bg-[#1A1A1A]/98 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-xl"
                >
                  {SERVICE_ITEMS.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => scrollTo('services')}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/[0.08] transition-all group"
                    >
                      <p className="font-['Inter'] text-[13px] font-medium text-[#FDF8F3]/80 group-hover:text-[#FDF8F3]">{item.label}</p>
                      <p className="font-['Inter'] text-[11px] text-[#FDF8F3]/30 mt-0.5">{item.desc}</p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {[
            { label: 'Work', id: 'work' },
            { label: 'Process', id: 'process' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative px-4 py-2 rounded-xl font-['Inter'] text-[13px] font-medium text-[#FDF8F3]/70 hover:text-[#FDF8F3] hover:bg-white/[0.08] transition-all duration-300"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo('contact')}
          className="ml-1 bg-[#F26044] text-white px-5 py-2.5 rounded-xl font-['Inter'] text-[13px] font-semibold hover:bg-[#ff7d63] active:scale-95 transition-all duration-300 flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          Book a call
        </button>
      </motion.nav>
    </div>
  );
}
