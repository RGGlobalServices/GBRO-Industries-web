# GBRO Industries — Website Planning & Research

## Project Overview
**Client:** GBRO Industries  
**Industry:** AI, Web Development & Automation  
**Goal:** High-converting, premium tech company website that impresses visitors and converts leads  
**Date:** 2026-04-12

---

## 1. Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#05050f` | Main background |
| `--bg-secondary` | `#0d0d24` | Section backgrounds |
| `--bg-card` | `rgba(255,255,255,0.04)` | Glassmorphism cards |
| `--accent-cyan` | `#00d4ff` | Primary accent, CTAs |
| `--accent-purple` | `#7c3aed` | Secondary accent |
| `--accent-violet` | `#a855f7` | Gradient midpoint |
| `--text-primary` | `#ffffff` | Headings |
| `--text-secondary` | `#94a3b8` | Body text |
| `--glow-cyan` | `rgba(0,212,255,0.3)` | Box shadows/glows |
| `--glow-purple` | `rgba(124,58,237,0.3)` | Card glows |

### Typography
- **Display / Headings:** Sora (800, 700, 600)
- **Body / UI:** Poppins (400, 500, 600)
- **Scale:** 12px base, fluid sizing with clamp()

### Spacing
- 4px base unit
- Section padding: 100px vertical
- Card gap: 24–32px
- Container max-width: 1280px

---

## 2. Tech Stack

### Frontend
- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JS (ES2022)** — No framework overhead
- **Three.js (r160, CDN)** — 3D hero sphere with shader-like particle system
- **GSAP 3 + ScrollTrigger (CDN)** — Scroll-based animations, timelines
- **Intersection Observer API** — Fallback for scroll reveal

### External CDN Libraries
```
Three.js       https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js
GSAP           https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js
ScrollTrigger  https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js
Google Fonts   Sora + Poppins
Font Awesome   v6 icons
```

### No build tool needed — pure static site for maximum performance

---

## 3. File Structure

```
GBRO Industries/
├── PLANNING.md           ← This file
├── index.html            ← Full page HTML
├── css/
│   └── styles.css        ← All styles (4000+ lines)
└── js/
    ├── three-scene.js    ← Three.js 3D hero canvas
    └── main.js           ← GSAP, scroll, interactions
```

---

## 4. Page Sections (in order)

### 0. Sticky Navbar
- Logo + nav links + CTA button
- `backdrop-filter: blur(20px)` glass effect on scroll
- Hamburger menu for mobile
- Active link highlighting on scroll

### 1. Hero
- Full-viewport height
- Three.js canvas: animated AI sphere with orbiting particles + floating cubes
- Big headline with gradient text + typewriter effect
- Fade+slide entrance with GSAP timeline
- Two CTA buttons: "Get Started" (solid) + "Contact Us" (ghost)
- Scroll indicator with bounce animation

### 2. About
- Two-column: text left, animated stats right
- Glassmorphism card with glow border
- Counter animation on scroll (0 → final number)
- Stats: 150+ Projects, 50+ Clients, 5+ Years, 24/7 Support

### 3. Services
- 4-card grid
- Each card: icon, title, description, "Learn More" arrow link
- Cards: Web Development, AI Solutions, Automation, Custom Software
- Hover: glow lift, icon scale, gradient border reveal
- Stagger entrance animation

### 4. Why Choose Us
- Icon + text list with fade-in stagger
- 6 USPs with animated checkmarks
- Right column: glowing feature graphic

### 5. Portfolio
- Masonry / equal grid, 6 projects
- Hover: zoom overlay with project title + tech tags
- Filter tabs: All / Web / AI / Automation

### 6. Testimonials
- Sliding carousel (auto-play + manual dots)
- Client avatar, name, company, star rating, quote
- Glassmorphism card + quote icon glow

### 7. Call To Action
- Full-width gradient banner
- Animated floating particles background
- "Let's Build Your Digital Future" heading
- Animated gradient button

### 8. Contact
- Two-column: form left, info right
- Fields: Name, Email, Phone, Message + Submit
- WhatsApp button: +91 7058682657
- Map or abstract location card

### 9. Footer
- Logo + tagline
- Nav link columns
- Social icons
- Copyright

---

## 5. Animation Plan

| Element | Library | Trigger | Effect |
|---------|---------|---------|--------|
| Hero text | GSAP | Page load | Fade up, stagger 0.15s |
| Hero 3D sphere | Three.js | Continuous | Rotate + pulse |
| Navbar | CSS | Scroll 50px | Blur + opacity transition |
| Section headings | GSAP ScrollTrigger | Enter viewport | Slide up + fade |
| Service cards | GSAP ScrollTrigger | Enter viewport | Stagger fade+scale |
| Counter numbers | GSAP ScrollTrigger | Enter viewport | Count up animation |
| Portfolio cards | CSS + GSAP | Hover | Overlay zoom |
| Testimonials | Vanilla JS | Auto + click | Slide transition |
| CTA button | CSS | Hover | Gradient shift + glow pulse |
| Floating cubes | Three.js | Continuous | Orbit + rotation |

---

## 6. Performance Strategy

- Fonts preloaded via `<link rel="preload">`
- Three.js canvas uses `requestAnimationFrame` with delta time cap
- Images: placeholder gradients (no external image deps)
- CSS animations use `transform` + `opacity` only (compositor-layer)
- `will-change` applied sparingly
- Intersection Observer for lazy section init

---

## 7. Responsive Breakpoints

| Breakpoint | Width | Changes |
|-----------|-------|---------|
| Desktop | > 1024px | Full layout |
| Tablet | 768–1024px | 2-col grids, reduced hero |
| Mobile L | 480–768px | 1-col, stacked nav |
| Mobile S | < 480px | Compact spacing, smaller type |

---

## 8. SEO & Meta
- `og:title`, `og:description`, `og:image` tags
- Structured JSON-LD for LocalBusiness
- Semantic HTML5 landmarks
- Alt text on all meaningful images
