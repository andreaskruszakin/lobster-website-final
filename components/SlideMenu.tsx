'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PRIMARY_LINKS = [
  { label: 'Front-end', id: 'services' },
  { label: 'Data Engineering', id: 'services' },
  { label: 'Infrastructure', id: 'services' },
];

const SECONDARY_LINKS = [
  { label: 'Principles', id: 'principles' },
  { label: 'Projects', id: 'work' },
  { label: 'Process', id: 'process' },
  { label: 'Testimonials', id: 'testimonials' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideMenu({ isOpen, onClose }: Props) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#1E1A2E]/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32, mass: 0.8 }}
            className="fixed top-0 left-0 h-full z-50 bg-[#FDF8F3] rounded-r-[28px] overflow-hidden"
            style={{ width: 'min(807px, 85vw)', padding: 32 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-[16px] mb-16 active:scale-95 transition-transform"
              style={{ width: 46, height: 46, background: 'rgba(255,79,64,0.7)' }}
              aria-label="Close menu"
            >
              <X className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </button>

            {/* Primary links */}
            <nav className="flex flex-col gap-6 mb-[120px]">
              {PRIMARY_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.id)}
                  className="text-left group"
                >
                  <span
                    className="block leading-[1] transition-opacity duration-150 group-hover:opacity-70"
                    style={{
                      fontFamily: "'BBH Hegarty', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(40px, 5.5vw, 72px)',
                      letterSpacing: '-1px',
                      color: '#FF4F40',
                    }}
                  >
                    {link.label}
                  </span>
                </button>
              ))}
            </nav>

            {/* Secondary links */}
            <div className="flex flex-col gap-6">
              {SECONDARY_LINKS.map((link) => (
                <div key={link.label} className="flex flex-col gap-2">
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-left group"
                  >
                    <span
                      className="block transition-opacity duration-150 group-hover:opacity-70"
                      style={{
                        fontFamily: "'BBH Hegarty', sans-serif",
                        fontWeight: 400,
                        fontSize: 25,
                        lineHeight: '28px',
                        letterSpacing: '-0.2px',
                        color: '#FF4F40',
                      }}
                    >
                      {link.label}
                    </span>
                  </button>
                  {/* Divider line */}
                  <div className="h-px w-full bg-[rgba(255,79,64,0.2)]" />
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
