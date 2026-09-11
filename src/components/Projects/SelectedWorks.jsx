import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useSound from '../../hooks/useSound'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'RVRite Editor',
    subtitle: 'Collaborative Word Document Architecture',
    description: 'Full-featured enterprise document editor featuring zero-latency real-time collaboration, tracked changes, granular version history, and structured XML conversion pipelines. Led complete frontend engineering.',
    tech: ['React.js', 'TipTap v2', 'ProseMirror', 'Laravel', 'MySQL'],
    color: '#E8FF00',
    bg: 'linear-gradient(145deg, #181900, #0a0b00)',
    emoji: '📄',
    type: 'Professional',
  },
  {
    title: 'Glora Beauty Lounge',
    subtitle: 'Luxury Salon Digital Showcase',
    description: 'Designed and engineered an immersive, bespoke salon web experience featuring interactive service catalogues, dynamic tiered pricing, embedded geolocation maps, and integrated booking flows.',
    tech: ['React', 'Vite', 'Redux Toolkit', 'TailwindCSS', 'React Router'],
    color: '#FF3CAC',
    bg: 'linear-gradient(145deg, #1c0014, #0b0008)',
    emoji: '💄',
    type: 'Independent',
  },
  {
    title: "Sarkeet Stranger's Camp",
    subtitle: 'Community Travel Experience Platform',
    description: "Cinematic, visually engaging experiential landing page for Stranger's Camp by sarkeet.official — delivering immersive visual storytelling that unites adventurous travelers on curated expeditions.",
    tech: ['React', 'Vite', 'CSS3', 'TailwindCSS', 'Three.js'],
    color: '#00E5FF',
    bg: 'linear-gradient(145deg, #001c18, #000b09)',
    emoji: '🏕️',
    type: 'Professional',
  },
  {
    title: 'Indo-Shah Interiors',
    subtitle: 'Architectural Luxury Aluminium Platform',
    description: 'A refined, editorial digital experience crafted to embody high-end architectural positioning. Engineered with React for optimal speed, styled with Tailwind CSS, and orchestrated with fluid motion design.',
    tech: ['React', 'Vite', 'TailwindCSS', 'Three.js', 'Framer Motion'],
    color: '#59FF00',
    bg: 'linear-gradient(145deg, #0a1f00, #030d00)',
    emoji: '🏠',
    type: 'Professional',
  },
  {
    title: 'Absolute Ayurveda',
    subtitle: 'Holistic Wellness Digital Flagship',
    description: 'Developed a serene, luxury wellness web presence utilizing Next.js, Tailwind CSS, and Framer Motion, with dedicated focus on Core Web Vitals, organic search discoverability, and fluid user journeys.',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'SEO'],
    color: '#ED3AEA',
    bg: 'linear-gradient(145deg, #200021, #0c000d)',
    emoji: '🧘',
    type: 'Professional',
  },
  {
    title: 'Orderly',
    subtitle: 'QR-Based Hospitality Ordering Ecosystem',
    description: 'Modern, responsive web application streamlining contactless dining for cafes and restaurants. Guests scan a table QR code to explore interactive menus, customize orders, and checkout seamlessly.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    color: '#ED9F3A',
    bg: 'linear-gradient(145deg, #211200, #0e0700)',
    emoji: '🍔',
    type: 'Independent',
  },
  {
    title: 'Strong Password Evaluator',
    subtitle: 'Cryptographic Security Analysis Tool',
    description: 'Real-time password security evaluation platform calculating entropy density, pattern repetition, and character complexity rules with immediate visual feedback indicators and zero network leaks.',
    tech: ['React', 'JavaScript ES6+', 'Tailwind CSS', 'Vite'],
    color: '#A855F7',
    bg: 'linear-gradient(145deg, #130024, #080010)',
    emoji: '🔐',
    type: 'Independent',
  },
  {
    title: 'Tic-Tac-Toe Neo',
    subtitle: 'Interactive Game & State Machine',
    description: 'Lightweight, responsive game engine featuring two-player local competition, win/draw state machine detection, animated sound cues, and a sleek modern cyberpunk interface.',
    tech: ['React', 'CSS3', 'React Bits', 'Web Audio'],
    color: '#F97316',
    bg: 'linear-gradient(145deg, #220c00, #0c0400)',
    emoji: '🎮',
    type: 'Independent',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const { playHover } = useSound()

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14
    cardRef.current.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    setHovered(false)
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => {
        setHovered(true)
        playHover()
      }}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      data-cursor-text="VIEW"
      className="relative rounded-3xl overflow-hidden flex-shrink-0 flex flex-col justify-between select-none transition-all duration-300 group"
      style={{
        width: 'clamp(280px, 85vw, 420px)',
        height: 'clamp(440px, 58vh, 520px)',
        background: project.bg,
        border: `1px solid ${hovered ? project.color + '60' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered
          ? `0 25px 60px ${project.color}25, 0 0 35px ${project.color}15`
          : '0 10px 30px rgba(0,0,0,0.4)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Top Accent Rim */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      <div className="p-7 sm:p-8 flex flex-col h-full justify-between relative z-10">
        {/* Card Header */}
        <div>
          <div className="flex items-start justify-between mb-5">
            <div
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-3xl glass transition-transform duration-300 group-hover:scale-110"
              style={{ border: `1px solid ${project.color}30` }}
            >
              {project.emoji}
            </div>

            <div className="flex flex-col items-end gap-1">
              <span
                className="font-mono text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-semibold"
                style={{
                  background: `${project.color}15`,
                  color: project.color,
                  border: `1px solid ${project.color}35`,
                }}
              >
                {project.type}
              </span>
              <span className="font-mono text-xs text-white/40 font-bold">
                0{index + 1} //
              </span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mb-1 text-white group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p
            className="font-mono text-xs tracking-wider uppercase mb-3 line-clamp-1"
            style={{ color: project.color }}
          >
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="font-body text-xs sm:text-sm leading-relaxed text-white/65 line-clamp-4">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills & Action Arrow */}
        <div className="pt-4 border-t border-white/10 flex items-end justify-between gap-4">
          <div className="flex flex-wrap gap-1.5 max-w-[80%]">
            {project.tech.map((t, idx) => (
              <span
                key={`${t}-${idx}`}
                className="font-mono text-[10px] px-2.5 py-1 rounded-full text-white/60 bg-white/5 border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Hover Arrow Capsule */}
          <div
            className="w-10 h-10 rounded-full glass flex items-center justify-center shrink-0 text-white group-hover:text-black transition-all duration-300"
            style={{
              background: hovered ? project.color : 'rgba(255,255,255,0.05)',
              borderColor: hovered ? project.color : 'rgba(255,255,255,0.1)',
            }}
          >
            <span className="font-mono text-base font-bold transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SelectedWorks() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let refreshTimer
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth)

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          fastScrollEnd: true,
          start: 'top top',
          end: () => '+=' + (track.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(Math.round(self.progress * 100))
          },
        },
      })

      // Refresh scroll positions after layout settles
      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 300)
    }, sectionRef)

    return () => {
      clearTimeout(refreshTimer)
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full min-h-screen h-screen flex flex-col justify-between overflow-hidden py-10"
      style={{ background: 'var(--bg)' }}
    >
      {/* Ambient background lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orb bg-orb--9" />
        <div className="bg-orb bg-orb--10" />
      </div>

      {/* Top Header Bar inside the pinned view */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-px bg-accent" />
            <span className="font-mono text-xs tracking-widest uppercase text-accent font-semibold">
              03 — Selected Portfolio Case Studies
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight leading-none text-white">
            FEATURED <span className="gradient-text">CREATIONS</span>
          </h2>
        </div>

        {/* Live Scrub Telemetry */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col sm:items-end">
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
              SCROLL DRIVEN JOURNEY
            </span>
            <div className="flex items-center gap-2 font-mono text-xs text-accent font-bold">
              <span>{progress}% COMPLETED</span>
              <span className="text-white/40">/ 08 WORKS</span>
            </div>
          </div>
          <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal Cards Moving Track */}
      <div className="relative z-10 w-full my-auto overflow-visible">
        <div
          ref={trackRef}
          className="flex items-center gap-8 px-6 sm:px-12 w-max"
          style={{ willChange: 'transform' }}
        >
          {/* Introductory Narrative Card */}
          <div
            className="rounded-3xl p-8 sm:p-10 glass border border-white/10 flex flex-col justify-between shrink-0"
            style={{
              width: 'clamp(280px, 80vw, 380px)',
              height: 'clamp(440px, 58vh, 520px)',
              background: 'linear-gradient(145deg, rgba(25,25,25,0.7), rgba(10,10,10,0.9))',
            }}
          >
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-widest">
                // CURATED INDEX
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 leading-tight">
                EXPLORE <br />
                PRODUCTION <br />
                SYSTEMS.
              </h3>
              <p className="font-body text-xs sm:text-sm text-white/65 leading-relaxed">
                Scroll downwards to navigate through collaborative document processors, 3D WebGL platforms, and full-stack solutions.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-accent">
              <span>SCROLL DOWN ↓</span>
              <span className="animate-pulse">SLIDE RIGHT →</span>
            </div>
          </div>

          {/* 8 Project Cards */}
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}

          {/* Conclusion Marker Card */}
          <div
            className="rounded-3xl p-8 sm:p-10 glass border border-accent/40 flex flex-col justify-between shrink-0 text-center items-center"
            style={{
              width: 'clamp(280px, 24vw, 340px)',
              height: 'clamp(460px, 58vh, 520px)',
              background: 'linear-gradient(145deg, rgba(232,255,0,0.06), rgba(10,10,10,0.95))',
            }}
          >
            <div className="my-auto flex flex-col items-center">
              <div className="w-16 h-16 rounded-full glass border border-accent flex items-center justify-center text-3xl mb-4 shadow-[0_0_30px_rgba(232,255,0,0.3)]">
                ✓
              </div>
              <h4 className="font-display text-2xl font-bold text-white mb-2">
                ALL 8 WORKS VIEWED
              </h4>
              <p className="font-body text-xs text-white/60 max-w-[200px]">
                Continue scrolling down to explore the Retro Arcade lab.
              </p>
            </div>
            <div className="font-mono text-xs text-accent animate-bounce">
              SCROLL DOWN TO ADVANCE ↓
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Track Navigation Bar */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between font-mono text-[11px] text-white/40 border-t border-white/10 pt-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span>PINNED SCROLL SHOWCASE</span>
        </div>
        <div className="flex items-center gap-3">
          <span>↓ SCROLL DOWN TO ADVANCE THROUGH WORKS</span>
        </div>
      </div>
    </section>
  )
}
