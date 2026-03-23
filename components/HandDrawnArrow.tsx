'use client';
import React from 'react';

type ArrowProps = { className?: string; color?: string; strokeWidth?: number };

export const ArrowLoop = ({ className = "", color = "currentColor", strokeWidth = 2 }: ArrowProps) => (
  <svg viewBox="0 0 200 120" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10,60 C40,100 80,100 90,70 C100,40 70,30 50,50 C30,70 60,110 150,80" />
    <path d="M140,75 L150,80 L145,90" />
  </svg>
);
