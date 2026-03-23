'use client';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const BUDGETS = ['< £10k', '£10–25k', '£25–50k', '£50k+'];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'project' | 'call'>('project');
  const [budget, setBudget] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.contact-reveal', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } });
  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="py-32 md:py-40 px-6 md:px-12 bg-[#FDF8F3]">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center gap-14 md:gap-16">
        {/* Heading */}
        <div className="contact-reveal flex flex-col items-center text-center gap-4">
          <img src="/icon-lobster.png" alt="" style={{ width: 80, height: 80, objectFit: 'contain' }} />
          <div className="flex items-end gap-1">
            <h2 style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400, letterSpacing: '-1px' }} className="text-5xl md:text-7xl text-[#1E1A2E] leading-[1]">
              Let&apos;s make it Snappy
            </h2>
            <span className="inline-block w-[0.13em] h-[0.13em] bg-[#FF4F40] rounded-[0.03em] mb-2 ml-1" />
          </div>
        </div>

        {/* Form card */}
        <div className="contact-reveal w-full max-w-[758px]">
          <div className="bg-white rounded-[28px] p-8 md:p-10 border border-[#1E1A2E]/[0.06]">
            <div className="flex mb-8 bg-[rgba(253,248,243,0.5)] rounded-xl p-1.5 w-fit border border-[#1E1A2E]/[0.06]">
              {(['project', 'call'] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)} className={`px-5 py-2.5 rounded-[10px] text-[14px] font-semibold transition-all duration-200 ${mode === m ? 'bg-white shadow-sm text-[#1E1A2E] border border-[#1E1A2E]/[0.04]' : 'text-[#1E1A2E]/40 hover:text-[#1E1A2E]/60'}`}>
                  {m === 'project' ? 'Start a project' : 'Book a call'}
                </button>
              ))}
            </div>

            {mode === 'project' ? (
              submitted ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#FF4F40]/10 flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#FF4F40]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400 }} className="text-2xl text-[#1E1A2E]">Message sent!</h3>
                  <p className="text-[14px] text-[#1E1A2E]/50 text-center max-w-xs">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div>
                    <h3 style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400, fontSize: 25, letterSpacing: '-0.2px' }} className="text-[#1E1A2E] leading-tight mb-1">Start a project</h3>
                    <p className="text-[14px] text-[#1E1A2E]/40">Fill in the details and we'll be in touch.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[{ id: 'name', label: 'Name', type: 'text', placeholder: 'Jane Doe' }, { id: 'email', label: 'Email', type: 'email', placeholder: 'jane@company.com' }].map((f) => (
                      <div key={f.id} className="flex flex-col gap-2">
                        <label htmlFor={f.id} className="text-[12px] font-medium text-[#1E1A2E]/40 ml-1">{f.label}</label>
                        <input type={f.type} id={f.id} required placeholder={f.placeholder} className="w-full bg-[rgba(253,248,243,0.5)] border border-transparent rounded-xl px-4 py-3.5 text-[#1E1A2E] placeholder:text-[#1E1A2E]/25 focus:ring-2 focus:ring-[#FF4F40]/20 focus:border-[#FF4F40]/20 focus:bg-white transition-all text-[14px] outline-none" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-medium text-[#1E1A2E]/40 ml-1">Budget Range</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {BUDGETS.map((range) => (
                        <button key={range} type="button" onClick={() => setBudget(range)} className={`flex items-center justify-center px-3 py-2.5 rounded-xl border transition-all text-[14px] ${budget === range ? 'bg-[#FF4F40]/[0.06] border-[#FF4F40]/30 text-[#FF4F40] font-medium' : 'bg-[rgba(253,248,243,0.5)] border-transparent text-[#1E1A2E]/50 hover:border-[#FF4F40]/15'}`}>{range}</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[12px] font-medium text-[#1E1A2E]/40 ml-1">Message</label>
                    <textarea id="message" rows={4} required placeholder="Tell us about your project..." className="w-full bg-[rgba(253,248,243,0.5)] border border-transparent rounded-xl px-4 py-3.5 text-[#1E1A2E] placeholder:text-[#1E1A2E]/25 focus:ring-2 focus:ring-[#FF4F40]/20 focus:border-[#FF4F40]/20 focus:bg-white transition-all text-[14px] resize-none outline-none" />
                  </div>
                  <div className="pt-2">
                    <button type="submit" className="bg-[#FF4F40] text-[#FDF8F3] px-8 py-3.5 rounded-[17px] text-[16px] font-semibold hover:bg-[#ff6b5a] active:scale-95 transition-all duration-200">Send Request</button>
                  </div>
                </form>
              )
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <h3 style={{ fontFamily: "'BBH Hegarty', sans-serif", fontWeight: 400, fontSize: 25 }} className="text-[#1E1A2E] leading-tight mb-1">Book a call</h3>
                  <p className="text-[14px] text-[#1E1A2E]/40">Pick a time that works for you — 30 min discovery call.</p>
                </div>
                <div className="w-full rounded-2xl overflow-hidden border border-[#1E1A2E]/[0.06]" style={{ minHeight: 480 }}>
                  <iframe src="https://cal.com/lobster/discovery" className="w-full border-0" style={{ height: 480 }} title="Book a discovery call" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
