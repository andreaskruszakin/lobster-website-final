'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const SERVICE_ITEMS = [
  { label: 'Front-end', desc: 'React, Next.js, Motion' },
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
    setIsScrolled(latest > 80);
    lastYRef.current = latest;
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setServicesOpen(false);
  };

  const onRed = !isScrolled;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
      <motion.nav
        variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: -100, opacity: 0 } }}
        initial={{ y: -40, opacity: 0 }}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className={`pointer-events-auto w-full max-w-[1344px] px-5 py-3 rounded-[20px] flex items-center justify-between transition-all duration-500 ${
          onRed
            ? 'bg-[#FF4F40] border border-[rgba(253,248,243,0.1)]'
            : 'bg-[#FDF8F3]/95 backdrop-blur-2xl border border-[#1E1A2E]/[0.08] shadow-sm'
        }`}
      >
        {/* Left */}
        <div className="flex items-center gap-1">
          <button onClick={() => scrollTo('work')} className={`px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${onRed ? 'text-[#FDF8F3]/75 hover:text-[#FDF8F3] hover:bg-[rgba(253,248,243,0.12)]' : 'text-[#1E1A2E]/60 hover:text-[#1E1A2E] hover:bg-[#1E1A2E]/[0.06]'}`}>Projects</button>
          <button onClick={() => scrollTo('contact')} className={`px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${onRed ? 'text-[#FDF8F3]/75 hover:text-[#FDF8F3] hover:bg-[rgba(253,248,243,0.12)]' : 'text-[#1E1A2E]/60 hover:text-[#1E1A2E] hover:bg-[#1E1A2E]/[0.06]'}`}>Contact</button>
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <div className="flex items-center">
              <button onClick={() => scrollTo('services')} className={`px-4 py-2.5 rounded-l-xl text-[13px] font-medium transition-all duration-200 ${onRed ? 'text-[#FDF8F3]/75 hover:text-[#FDF8F3] hover:bg-[rgba(253,248,243,0.12)]' : 'text-[#1E1A2E]/60 hover:text-[#1E1A2E] hover:bg-[#1E1A2E]/[0.06]'}`}>Services</button>
              <button className={`w-10 h-[40px] rounded-r-xl flex items-center justify-center transition-all duration-200 ${onRed ? 'text-[#FDF8F3]/50 hover:text-[#FDF8F3] hover:bg-[rgba(253,248,243,0.12)]' : 'text-[#1E1A2E]/40 hover:text-[#1E1A2E] hover:bg-[#1E1A2E]/[0.06]'}`}><ChevronDown className="w-3.5 h-3.5" /></button>
            </div>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: 0.15, ease: 'easeOut' }} className="absolute top-full left-0 mt-2 w-56 bg-[#1E1A2E]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-xl">
                  {SERVICE_ITEMS.map((item) => (
                    <button key={item.label} onClick={() => scrollTo('services')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/[0.08] transition-all group">
                      <p className="text-[13px] font-medium text-[#FDF8F3]/80 group-hover:text-[#FDF8F3]">{item.label}</p>
                      <p className="text-[11px] text-[#FDF8F3]/30 mt-0.5">{item.desc}</p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Center */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <img src="/Logo_Final.svg" alt="Lobster" className={`h-7 w-auto transition-all duration-500 ${onRed ? 'brightness-0 invert' : ''}`} />
        </div>

        {/* Right */}
        <button onClick={() => scrollTo('contact')} className={`px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 active:scale-95 ${onRed ? 'bg-[#FDF8F3] text-[#FF4F40] hover:bg-white' : 'bg-[#FF4F40] text-white hover:bg-[#ff6b5a]'}`}>Book a call</button>
      </motion.nav>
    </div>
  );
}
