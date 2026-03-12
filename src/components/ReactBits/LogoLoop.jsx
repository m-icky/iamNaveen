/**
 * LogoLoop — inspired by react-bits LogoLoop / InfiniteMarquee
 * Infinite horizontal scroll of tech stack logos (SVG icons)
 */
import { useRef } from 'react'
import { motion } from 'framer-motion'

// Tech stack logos as inline SVG components with brand colors
const LOGOS = [
  {
    name: 'React',
    color: '#61DAFB',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="2.139" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    color: '#F7DF1E',
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="2" fill="#F7DF1E"/>
        <text x="4" y="19" fontFamily="monospace" fontWeight="bold" fontSize="11" fill="#000">JS</text>
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="2" fill="#3178C6"/>
        <text x="3" y="19" fontFamily="monospace" fontWeight="bold" fontSize="11" fill="#fff">TS</text>
      </svg>
    ),
  },
  {
    name: 'Tailwind',
    color: '#38BDF8',
    svg: (
      <svg viewBox="0 0 24 24" fill="#38BDF8" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.716 1.219C13.266 10.393 14.114 11.25 16.5 11.25c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.716-1.219C15.234 6.857 14.386 6 12 6zM7.5 11.25C5.1 11.25 3.6 12.45 3 14.85c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.716 1.219C8.766 15.643 9.614 16.5 12 16.5c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.716-1.219C10.734 12.107 9.886 11.25 7.5 11.25z"/>
      </svg>
    ),
  },
  {
    name: 'Three.js',
    color: '#E8FF00',
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,2 22,20 2,20" fill="none" stroke="#E8FF00" strokeWidth="1.5"/>
        <polygon points="12,8 18,18 6,18" fill="#E8FF00" opacity="0.3"/>
      </svg>
    ),
  },
  {
    name: 'Vite',
    color: '#A855F7',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 3L12.5 20L9 13L3 10.5L21 3Z" fill="#A855F7" opacity="0.8"/>
        <path d="M9 13L12.5 20L11 14L9 13Z" fill="#F7DF1E"/>
      </svg>
    ),
  },
  {
    name: 'GSAP',
    color: '#00D26A',
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#00D26A" opacity="0.15"/>
        <text x="2" y="16" fontFamily="monospace" fontWeight="900" fontSize="9" fill="#00D26A">GSAP</text>
      </svg>
    ),
  },
  {
    name: 'Docker',
    color: '#2496ED',
    svg: (
      <svg viewBox="0 0 24 24" fill="#2496ED" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="8" width="3" height="3" rx="0.5"/>
        <rect x="6" y="8" width="3" height="3" rx="0.5"/>
        <rect x="10" y="8" width="3" height="3" rx="0.5"/>
        <rect x="6" y="4" width="3" height="3" rx="0.5"/>
        <rect x="10" y="4" width="3" height="3" rx="0.5"/>
        <rect x="10" y="12" width="3" height="3" rx="0.5"/>
        <path d="M14 13.5c.5-1.5 2-2 3.5-1.5s2 2 1.5 3.5" stroke="#2496ED" strokeWidth="1" fill="none"/>
      </svg>
    ),
  },
  {
    name: 'Figma',
    color: '#A259FF',
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="2" width="8" height="8" rx="4" fill="#FF7262"/>
        <rect x="8" y="10" width="8" height="8" rx="4" fill="#A259FF"/>
        <circle cx="16" cy="14" r="4" fill="#1ABCFE"/>
        <rect x="8" y="10" width="4" height="8" rx="2" fill="#0ACF83"/>
        <rect x="8" y="2" width="4" height="8" rx="2 2 0 0" fill="#F24E1E"/>
      </svg>
    ),
  },
  {
    name: 'Git',
    color: '#F05032',
    svg: (
      <svg viewBox="0 0 24 24" fill="#F05032" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.85 11.15L12.85 2.15a.5.5 0 00-.7 0L10.26 4.04l2.38 2.38a1.5 1.5 0 011.9 1.9l2.29 2.29a1.5 1.5 0 11-.9.87L13.8 9.35v5.38a1.5 1.5 0 11-1.3 0V9.2a1.5 1.5 0 01-.82-1.96L9.35 4.89 2.15 12.09a.5.5 0 000 .7l9 9a.5.5 0 00.7 0l10-10a.5.5 0 000-.64z"/>
      </svg>
    ),
  },
  {
    name: 'Redux',
    color: '#764ABC',
    svg: (
      <svg viewBox="0 0 24 24" fill="#764ABC" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.043-.914-.795-1.63-1.708-1.63h-.061a1.71 1.71 0 00-1.648 1.77c.043.479.238.89.533 1.193-1.13 2.226-2.85 3.852-5.435 5.216-1.74.914-3.563 1.238-5.37.944-1.562-.25-2.788-1.088-3.56-2.387-.12-.195-.228-.4-.316-.612A5.41 5.41 0 012 18.9c-.066-2.314 1.34-4.457 3.34-5.04l.044-.013V11.46a6.8 6.8 0 00-4.7 3.78A6.717 6.717 0 00.277 19.6c.74 2.6 3.007 4.3 5.705 4.4 2.75.1 5.2-1.2 6.938-3.5.95-1.25 1.6-2.74 1.714-4zM22.14 14.5c-1.35-1.57-3.323-2.44-5.593-2.44h-.289a1.73 1.73 0 00-1.56-1.01h-.056c-.944 0-1.717.777-1.717 1.726s.773 1.726 1.717 1.726h.056c.725 0 1.346-.456 1.597-1.102h.337c1.345 0 2.606.392 3.736 1.167 1.13.775 1.928 1.82 2.3 3.057.32 1.04.27 2.06-.103 2.96-.582 1.38-1.68 2.13-3.08 2.13-1.34 0-2.56-.53-3.44-1.48-.6-.64-1.03-1.44-1.28-2.28-.21-.66-.82-1.08-1.5-1.01-.77.07-1.37.71-1.37 1.47 0 .1.01.2.03.3 1.18 4.37 5.06 7.4 9.33 7.13 4.3-.27 7.75-3.58 8.04-7.81.2-2.93-1.2-5.65-3.3-7.54"/>
      </svg>
    ),
  },
  {
    name: 'MySQL',
    color: '#F29111',
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="6" rx="8" ry="3" fill="none" stroke="#F29111" strokeWidth="1.5"/>
        <path d="M4 6v4c0 1.657 3.582 3 8 3s8-1.343 8-3V6" fill="none" stroke="#F29111" strokeWidth="1.5"/>
        <path d="M4 10v4c0 1.657 3.582 3 8 3s8-1.343 8-3v-4" fill="none" stroke="#F29111" strokeWidth="1.5"/>
        <path d="M4 14v4c0 1.657 3.582 3 8 3s8-1.343 8-3v-4" fill="none" stroke="#F29111" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: 'PHP',
    color: '#8892BF',
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="12" rx="10" ry="6" fill="none" stroke="#8892BF" strokeWidth="1.5"/>
        <text x="5.5" y="16" fontFamily="monospace" fontWeight="700" fontSize="8" fill="#8892BF">PHP</text>
      </svg>
    ),
  },
  {
    name: 'Framer',
    color: '#FF3CAC',
    svg: (
      <svg viewBox="0 0 24 24" fill="#FF3CAC" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16v8H12L4 4zM4 12h8l8 8H4V12z"/>
      </svg>
    ),
  },
  {
    name: 'ProseMirror',
    color: '#FF6B35',
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="#FF6B35" strokeWidth="1.5"/>
        <rect x="6" y="7" width="12" height="1.5" rx="0.75" fill="#FF6B35"/>
        <rect x="6" y="11" width="9" height="1.5" rx="0.75" fill="#FF6B35"/>
        <rect x="6" y="15" width="11" height="1.5" rx="0.75" fill="#FF6B35"/>
      </svg>
    ),
  },
]

function LogoItem({ logo, size = 48 }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        flexShrink: 0,
        padding: '12px 20px',
        borderRadius: 14,
        background: `${logo.color}08`,
        border: `1px solid ${logo.color}20`,
        minWidth: 80,
        transition: 'all 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `${logo.color}15`
        e.currentTarget.style.borderColor = `${logo.color}50`
        e.currentTarget.style.boxShadow = `0 0 20px ${logo.color}20`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = `${logo.color}08`
        e.currentTarget.style.borderColor = `${logo.color}20`
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ width: size, height: size }}>
        {logo.svg}
      </div>
      <span style={{
        fontFamily: 'DM Mono, monospace',
        fontSize: 10,
        color: logo.color,
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
      }}>
        {logo.name}
      </span>
    </div>
  )
}

export default function LogoLoop({
  logos = LOGOS,
  speed = 30,
  direction = 'left',
  size = 44,
  gap = 12,
  className = '',
}) {
  // Double the logos for seamless loop
  const doubled = [...logos, ...logos]
  const totalWidth = logos.length * (size + gap * 4 + 40)

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width: '100%' }}
    >
      {/* Fade edges */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 0, width: 80, zIndex: 2,
        background: 'linear-gradient(to right, var(--bg), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, bottom: 0, right: 0, width: 80, zIndex: 2,
        background: 'linear-gradient(to left, var(--bg), transparent)',
        pointerEvents: 'none',
      }} />

      <motion.div
        style={{ display: 'flex', gap, width: 'max-content' }}
        animate={{
          x: direction === 'left' ? [-totalWidth, 0] : [0, -totalWidth],
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {doubled.map((logo, i) => (
          <LogoItem key={`${logo.name}-${i}`} logo={logo} size={size} />
        ))}
      </motion.div>
    </div>
  )
}

export { LOGOS }
