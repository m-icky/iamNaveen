# Naveen T M — Portfolio

A cinematic, scroll-driven portfolio website built with React, Three.js, Framer Motion, and GSAP.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero/          # Scroll-controlled video hero + Three.js
│   ├── About/         # Split layout with 3D rotating mesh
│   ├── Skills/        # Animated skill cards with 3D tilt
│   ├── Projects/      # Horizontal scroll with parallax cards
│   ├── Experience/    # Animated timeline
│   ├── Contact/       # Form with particle background
│   ├── Cursor/        # Custom magnetic cursor
│   ├── ThemeToggle/   # Dark/Light mode toggle
│   ├── ThreeScene/    # All Three.js / R3F scenes
│   ├── Nav/           # Animated navigation
│   └── Footer/        # Social links + footer
├── hooks/
│   ├── useMousePosition.js
│   └── useScrollVideo.js
├── lib/
│   └── scrollAnimations.js
└── pages/
    └── Home.jsx
```

## 🎥 Adding the Hero Video

For the scroll-controlled video background, place your video files in `/public`:

```
public/
├── hero.webm    ← preferred (better compression)
└── hero.mp4    ← fallback
```

**Recommended video specs:**
- Duration: 10–30 seconds (will be scrubbed, not played normally)
- Resolution: 1920×1080 or 1280×720
- Content: Abstract motion, particles, light leaks, or anything cinematic
- Compress with: `ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 0 -crf 33 public/hero.webm`

## 🎨 Customization

### Colors (src/index.css)
```css
:root {
  --accent: #E8FF00;      /* Primary accent - yellow-green */
  --accent-alt: #FF3CAC;  /* Secondary accent - magenta */
  --bg: #0A0A0A;          /* Background */
  --fg: #F5F0E8;          /* Foreground text */
}
```

### Fonts
Loaded from Google Fonts:
- **Bebas Neue** — Display/headlines
- **DM Sans** — Body text
- **DM Mono** — Monospace/labels

## ✨ Features

- **Scroll-controlled video** — Video scrubs forward/backward with scroll
- **Three.js scenes** — Floating geometry, particle systems, distortion materials
- **Custom cursor** — Magnetic follower with blend mode effect
- **Framer Motion** — Text reveals, stagger animations, page transitions
- **GSAP ScrollTrigger** — Scroll-driven animations throughout
- **Lenis** — Ultra-smooth scrolling
- **Dark/Light theme** — CSS variable-based theming
- **3D tilt cards** — Mouse-tracked perspective transform on project cards
- **Glassmorphism** — Frosted glass UI elements
- **Noise texture** — Premium film grain overlay
- **Responsive** — Full mobile support

## 🛠 Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Build tool |
| @react-three/fiber | 8 | React renderer for Three.js |
| @react-three/drei | 9 | Three.js helpers |
| three | 0.167 | 3D graphics |
| framer-motion | 11 | Animations |
| gsap | 3 | ScrollTrigger animations |
| lenis | 1.1 | Smooth scrolling |
| tailwindcss | 3 | Styling |

## 📧 Contact Info (Update in components)

Update contact details in `src/components/Contact/Contact.jsx` and `src/components/Footer/Footer.jsx`.

## 🚀 Deployment

```bash
npm run build
# Upload /dist to Vercel, Netlify, or any static host
```
