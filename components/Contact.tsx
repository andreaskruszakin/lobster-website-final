'use client';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'project' | 'call'>('project');
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.contact-reveal', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } });
    gsap.fromTo('.contact-sticker', { y: 30, opacity: 0, rotate: -8, scale: 0.9 }, { y: 0, opacity: 1, rotate: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3, scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } });
  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="py-32 md:py-40 px-6 md:px-12 bg-[#FDF8F3] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="parallax-section-heading mb-10 md:mb-14">
              <span className="contact-reveal text-[10px] uppercase tracking-[0.1em] text-[#FF4F40] block mb-4">Get In Touch</span>
              <h2 className="contact-reveal font-black text-6xl md:text-[5.5rem] lg:text-[6.5rem] text-[#1E1A2E] leading-[0.85]">
                Let&apos;s<br />Build<span className="inline-block w-[0.13em] h-[0.13em] bg-[#FF4F40] rounded-[0.03em] ml-[0.06em] align-baseline" />
              </h2>
            </div>
            <p className="contact-reveal text-base text-[#1E1A2E]/50 max-w-sm leading-relaxed mb-10" style={{ letterSpacing: '-0.02em' }}>
              Tell us about your project. We&apos;ll get back within 24 hours — no gatekeepers, no runaround.
            </p>
            <div className="contact-sticker hidden lg:block mb-10" style={{ width: 190 }}>
              <img src="/Lobster_Final.svg" alt="" className="w-full h-auto" />
            </div>
            <div className="contact-reveal flex flex-col gap-6 mt-auto">
              <div className="w-full h-px bg-[#1E1A2E]/[0.06]" />
              {[
                { icon: Mail, label: 'Email', value: 'hello@lobster.agency', href: 'mailto:hello@lobster.agency' },
                { icon: MapPin, label: 'Location', value: 'London, United Kingdom', href: null },
                { icon: Clock, label: 'Response', value: 'Within 24 hours', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F5F2] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#FF4F40]" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.08em] text-[#1E1A2E]/30 mb-1">{label}</p>
                    {href
                      ? <a href={href} className="text-[15px] text-[#1E1A2E] hover:text-[#FF4F40] transition-colors" style={{ letterSpacing: '-0.02em' }}>{value}</a>
                      : <p className="text-[15px] text-[#1E1A2E]" style={{ letterSpacing: '-0.02em' }}>{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — form card */}
          <div className="lg:col-span-7 flex items-start">
            <div className="contact-reveal w-full bg-white p-8 md:p-10 rounded-[28px] border border-[#1E1A2E]/[0.08]">
              {/* Toggle */}
              <div className="flex mb-8 bg-[#F7F5F2] rounded-xl p-1.5 w-fit">
                {(['project', 'call'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-5 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all duration-300 ${mode === m ? 'bg-white shadow-sm text-[#1E1A2E]' : 'text-[#1E1A2E]/40 hover:text-[#1E1A2E]/60'}`}
                  >
                    {m === 'project' ? 'Start a project' : 'Book a call'}
                  </button>
                ))}
              </div>

              {mode === 'project' ? (
                submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#FF4F40]/10 flex items-center justify-center mb-2">
                      <svg className="w-8 h-8 text-[#FF4F40]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-black text-2xl text-[#1E1A2E]">Message sent!</h3>
                    <p className="text-[14px] text-[#1E1A2E]/50 text-center max-w-xs" style={{ letterSpacing: '-0.02em' }}>We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                    <div className="mb-2">
                      <h3 className="font-black text-2xl text-[#1E1A2E] mb-1">Start a project</h3>
                      <p className="text-[13px] text-[#1E1A2E]/40" style={{ letterSpacing: '-0.02em' }}>Fill in the details and we&apos;ll be in touch.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {[{ id: 'name', label: 'Name', type: 'text', placeholder: 'Jane Doe' }, { id: 'email', label: 'Email', type: 'email', placeholder: 'jane@company.com' }].map(f => (
                        <div key={f.id} className="flex flex-col gap-2">
                          <label htmlFor={f.id} className="text-[10px] uppercase tracking-[0.08em] text-[#1E1A2E]/40 ml-1">{f.label}</label>
                          <input type={f.type} id={f.id} required className="w-full bg-[#F7F5F2] border border-transparent rounded-xl px-4 py-3.5 text-[#1E1A2E] placeholder:text-[#1E1A2E]/20 focus:ring-2 focus:ring-[#FF4F40]/30 focus:border-[#FF4F40]/20 focus:bg-white transition-all text-[14px] outline-none" placeholder={f.placeholder} />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-[0.08em] text-[#1E1A2E]/40 ml-1">Budget Range</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {['< £10k', '£10–25k', '£25–50k', '£50k+'].map((range) => (
                          <label key={range} className="relative flex items-center justify-center px-3 py-2.5 rounded-xl bg-[#F7F5F2] border border-transparent cursor-pointer hover:border-[#FF4F40]/20 hover:bg-[#FF4F40]/[0.04] transition-all">
                            <input type="radio" name="budget" value={range} className="sr-only peer" />
                            <span className="text-[13px] text-[#1E1A2E]/50 peer-checked:text-[#FF4F40] peer-checked:font-medium transition-colors" style={{ letterSpacing: '-0.02em' }}>{range}</span>
                            <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-[#FF4F40]/30 pointer-events-none transition-all" />
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-[10px] uppercase tracking-[0.08em] text-[#1E1A2E]/40 ml-1">Message</label>
                      <textarea id="message" rows={4} required className="w-full bg-[#F7F5F2] border border-transparent rounded-xl px-4 py-3.5 text-[#1E1A2E] placeholder:text-[#1E1A2E]/20 focus:ring-2 focus:ring-[#FF4F40]/30 focus:border-[#FF4F40]/20 focus:bg-white transition-all text-[14px] resize-none outline-none" placeholder="Tell us about your project..." />
                    </div>
                    <div className="pt-2">
                      <button type="submit" className="bg-[#FF4F40] text-white px-8 py-3.5 rounded-xl text-[14px] font-semibold hover:bg-[#ff7d63] active:scale-95 transition-all duration-300">
                        Send Request →
                      </button>
                    </div>
                  </form>
                )
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="mb-2">
                    <h3 className="font-black text-2xl text-[#1E1A2E] mb-1">Book a call</h3>
                    <p className="text-[13px] text-[#1E1A2E]/40" style={{ letterSpacing: '-0.02em' }}>Pick a time that works for you — 30 min discovery call.</p>
                  </div>
                  <div className="w-full rounded-2xl overflow-hidden border border-[#1E1A2E]/[0.06]" style={{ minHeight: 480 }}>
                    <iframe
                      src="https://cal.com/lobster/discovery"
                      className="w-full border-0"
                      style={{ height: 480 }}
                      title="Book a discovery call"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
