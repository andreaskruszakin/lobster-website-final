# Lobster Website — Developer Handover

**Project**: Lobster Digital — Agency marketing site
**Stack**: Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript
**Status**: MVP complete, ready for deployment

---

## Quick Start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint      # lint check
```

---

## Project Structure

```
app/
  globals.css       # Global styles, @font-face (BN Sonic), marquee keyframes
  layout.tsx        # Root layout — Rubik font, metadata
  page.tsx          # Main page — Lenis smooth scroll, GSAP ScrollTrigger, section order

components/
  Preloader.tsx     # Full-screen curtain preloader with LOBSTER animation
  Navbar.tsx        # Fixed pill nav — hides on scroll down, Services dropdown, Framer Motion
  Hero.tsx          # Red hero section — BN Sonic LOBSTER text, mouse parallax illustration
  Principles.tsx    # 5 principle cards — mosaic grid layout, hover rotate effect
  Services.tsx      # 3 service cards — Digital Experience, Data Engineering, Infrastructure
  ClientLogos.tsx   # Infinite marquee — Hotpoint, Indesit, Whirlpool, Appliance Hero
  Work.tsx          # 4 project cards — image parallax on scroll, BlobButton CTA
  Process.tsx       # 3-step process — beige card, BN Sonic numbers
  Testimonials.tsx  # 4 testimonial cards — avatar images, grid layout
  Contact.tsx       # Contact form + Cal.com booking iframe
  Footer.tsx        # Peach card footer — logo, pills, email, lobster illustration
  BlobButton.tsx    # Reusable GSAP blob-fill hover button

public/
  fonts/
    BNSonic.otf           # Brand font — used for LOBSTER in Hero, Preloader, Process numbers
  images/
    *.png / *.jpeg        # Work section project thumbnails + Testimonials avatars
  Lobster_Final.svg       # Lobster mascot illustration
  Logo_Final.svg          # Wordmark logo (orange — use brightness(0) invert(1) on dark bg)
  Lighthouse_Final.svg    # Services section icon
  Folder_Final.svg        # Work section icon
  Server_Final.svg        # Process section icon
  Squid_Final.svg         # Testimonials section icon
  Hotpoint.png            # Client logo
  indesit.png             # Client logo
  whirlpool.png           # Client logo
  Appliance hero.png      # Client logo
```

---

## Key Architecture Decisions

### Animation Stack
- **GSAP + ScrollTrigger** — all scroll-triggered reveals and parallax effects
- **`@gsap/react` `useGSAP`** hook used in every animated component (auto-cleanup)
- **Framer Motion** — Navbar only (spring hide/show, dropdown AnimatePresence)
- **Lenis** — smooth scroll, integrated with GSAP ticker in `page.tsx`

### Fonts
- **Rubik** (Google Fonts, weights 400 + 900) — body and headings via `--font-rubik` CSS var
- **BN Sonic** (`/public/fonts/BNSonic.otf`) — brand display font, declared as `@font-face` in `globals.css`, used via inline `style={{ fontFamily: "'BN Sonic', sans-serif" }}`

### Colour Tokens (not Tailwind vars — used as string literals)
| Name       | Hex       | Usage                              |
|------------|-----------|-------------------------------------|
| Lobster    | `#FF4F40` | Primary accent, CTAs, labels        |
| Deep Ink   | `#1E1A2E` | Body text, dark backgrounds         |
| Cream      | `#FDF8F3` | Page background                     |
| Peach      | `#FE9B66` | Footer card background              |
| Lavender   | `#B9B0E8` | Data service card accent            |

### Page Load Flow
1. `Preloader` mounts and blocks scroll (`body overflow: hidden`)
2. After 3 seconds, curtain animates out → `onComplete` fires
3. `isLoading` → `false` in `page.tsx`: Navbar mounts, Hero animates in
4. Lenis initialises, GSAP ScrollTrigger refreshes

### Marquee Pattern
`ClientLogos` uses an embedded `<style>` tag with `@keyframes logo-scroll` (right-to-left). Items are quadrupled so `translateX(-50%)` lands on a visually identical frame, creating a seamless loop.

---

## Content — What Needs Replacing

All copy and images are placeholder / illustrative. Before going live:

### Work Section (`components/Work.tsx`)
- Replace `WORK_ITEMS` with real project names, clients, categories
- Replace `/public/images/*.png` files with actual project screenshots (keep same filenames or update `WORK_ITEMS`)

### Testimonials (`components/Testimonials.tsx`)
- Replace `TESTIMONIALS` array with real quotes, names, roles
- Replace avatar images in `/public/images/`

### Contact Form (`components/Contact.tsx`)
- The "Start a project" form currently only calls `setSubmitted(true)` on submit — **wire up a real backend** (Resend, Formspree, or a Next.js API route)
- The "Book a call" iframe points to `https://cal.com/lobster/discovery` — confirm this Cal.com account exists and is live

### Footer (`components/Footer.tsx`)
- Email: `hello@lobster.digital` — confirm inbox is live
- Copyright text: update if brand name differs

### Metadata (`app/layout.tsx`)
- Add `og:image`, `og:url`, Twitter card meta
- Add favicon (replace `app/favicon.ico`)

### Client Logos (`components/ClientLogos.tsx`)
- Add/remove logos from the `LOGOS` array
- Each entry: `{ name: string, src: string, height?: number }` — `height` defaults to 40px if not set

---

## Deployment

This is a standard Next.js app — deploy to Vercel with zero config:

```bash
# Push to GitHub first
git add -A && git commit -m "ready for deployment"
git push origin main

# Then connect repo to Vercel or:
npx vercel --prod
```

No environment variables are required for the current build. If you add a contact form API route, you'll need e.g. `RESEND_API_KEY`.

---

## Known Issues / TODOs

- [ ] Contact form submission is a no-op — needs backend wiring
- [ ] Work section uses placeholder project images and fake client names
- [ ] Testimonials use AI-generated quotes and stock avatars
- [ ] No OG image / social share metadata
- [ ] Mobile nav has no hamburger menu — only the "Book a call" CTA is visible on mobile
- [ ] `ClientLogos` marquee animation is embedded via `<style>` tag (workaround for Tailwind v4 class resolution) — can be refactored if Tailwind config supports custom animation utilities
