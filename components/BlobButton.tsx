'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';

interface BlobButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  blobColor?: string;
  textColor?: string;
  hoverTextColor?: string;
}

export default function BlobButton({
  children,
  onClick,
  className = '',
  blobColor = '#F26044',
  textColor = '#1A1A1A',
  hoverTextColor = '#FDF8F3',
}: BlobButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const arrowIconRef = useRef<SVGSVGElement>(null);

  const handleEnter = () => {
    if (!btnRef.current || !blobRef.current || !textRef.current || !arrowRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(blobRef.current, { scale: 12, duration: 0.5 }, 0);
    tl.to(textRef.current, { color: hoverTextColor, duration: 0.35 }, 0.05);
    tl.to(arrowRef.current, { backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.25)', duration: 0.3 }, 0);
    if (arrowIconRef.current) tl.to(arrowIconRef.current, { rotate: 45, color: hoverTextColor, duration: 0.3 }, 0);
    tl.to(btnRef.current, { borderColor: blobColor, duration: 0.3 }, 0);
  };

  const handleLeave = () => {
    if (!btnRef.current || !blobRef.current || !textRef.current || !arrowRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(blobRef.current, { scale: 1, duration: 0.45 }, 0);
    tl.to(textRef.current, { color: textColor, duration: 0.3 }, 0);
    tl.to(arrowRef.current, { backgroundColor: blobColor, borderColor: blobColor, duration: 0.3 }, 0);
    if (arrowIconRef.current) tl.to(arrowIconRef.current, { rotate: 0, color: '#FDF8F3', duration: 0.3 }, 0);
    tl.to(btnRef.current, { borderColor: 'currentColor', duration: 0.3 }, 0);
  };

  const isOnDark = textColor === '#FDF8F3' || textColor === 'white';
  const defaultBorderClass = isOnDark ? 'border-[#FDF8F3]/15' : 'border-[#1A1A1A]/10';

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative inline-flex items-center gap-3 pl-7 pr-1.5 py-1.5 rounded-2xl border overflow-hidden cursor-pointer active:scale-[0.97] transition-shadow duration-300 ${defaultBorderClass} ${className}`}
      style={{ backgroundColor: 'transparent', color: isOnDark ? 'rgba(253,248,243,0.15)' : 'rgba(26,26,26,0.1)' }}
    >
      <div
        ref={blobRef}
        className="absolute right-[6px] w-10 h-10 rounded-full pointer-events-none"
        style={{ backgroundColor: blobColor, transformOrigin: 'center center' }}
      />
      <span
        ref={textRef}
        className="relative z-10 font-['Inter'] text-[14px] font-semibold whitespace-nowrap"
        style={{ color: textColor, letterSpacing: '-0.02em' }}
      >
        {children}
      </span>
      <div
        ref={arrowRef}
        className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
        style={{ backgroundColor: blobColor, borderColor: blobColor }}
      >
        <svg
          ref={arrowIconRef}
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          style={{ color: '#FDF8F3' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
      </div>
    </button>
  );
}
