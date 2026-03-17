## 17-03-2026

- Adjusted `PrincipleCard` `<h3>` line-height to `leading-[48px]` and removed the small principle number `<span>` (`.principle-num`) from cards; updated GSAP setup to stop animating removed elements (`components/Principles.tsx`). This fixes the too-tight computed line-height (42.24px) and removes the small number badges as requested.

