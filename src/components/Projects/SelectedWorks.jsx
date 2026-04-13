import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const projects = [
  {
    title: 'RVRite Editor',
    subtitle: 'Collaborative Document Editor',
    description: 'A full-featured word document editor with real-time collaboration, tracked edits, version history, rich text formatting, and structured XML conversion. Led complete frontend engineering.',
    tech: ['React.js', 'TipTap', 'ProseMirror', 'Laravel', 'MySQL'],
    color: '#E8FF00',
    bg: 'linear-gradient(135deg, #1a1a00, #2a2a00)',
    emoji: '📄',
    type: 'Professional',
  },
  {
    title: 'Glora Beauty Lounge',
    subtitle: 'Salon Website',
    description: 'Designed and developed a static salon website with service catalogue, pricing, embedded maps, click-to-call and booking functionality with an intuitive interface.',
    tech: ['React', 'Vite', 'Redux Toolkit', 'TailwindCSS', 'React Router'],
    color: '#FF3CAC',
    bg: 'linear-gradient(135deg, #1a0011, #2a0018)',
    emoji: '💄',
    type: 'Independent',
  },
  {
    title: 'Sarkeetofficial Stranger\'s Camp',
    subtitle: 'E-commerce Website',
    description: 'A visually immersive landing page for Stranger\'s Camp by sarkeet.official — a community-driven travel experience that brings strangers together on unforgettable trips.',
    tech: ['React', 'Vite', 'CSS3', 'TailwindCSS', 'Three.js'],
    color: '#00e5ffff',
    bg: 'linear-gradient(135deg, #001a15, #002a22)',
    emoji: '🏕️',
    type: 'Professional',
  },
  {
    title: 'Indo-Shah Aluminium & Interiors',
    subtitle: 'Aluminium & Interiors Website',
    description: 'Delivering a premium digital experience that reflects the brand’s luxury positioning. Built using React (Vite) for high performance, styled with Tailwind CSS for a clean and scalable UI, and enhanced with Framer Motion to create smooth, engaging animations.',
    tech: ['React', 'Vite', 'CSS3', 'TailwindCSS', 'Three.js'],
    color: '#59ff00ff',
    bg: 'linear-gradient(135deg, #051a00ff, #002a0aff)',
    emoji: '🏠',
    type: 'Professional',
  },
  {
    title: 'Absolute Ayurveda',
    subtitle: 'Ayurveda Website',
    description: 'Developed a luxury wellness website, Absolute Ayurveda, using Next.js 14, Tailwind CSS, and Framer Motion, focusing on performance, SEO, and refined user experience.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    color: '#ed3aeaff',
    bg: 'linear-gradient(135deg, #20001fff, #2d002fff)',
    emoji: '🧘',
    type: 'Professional',
  },
   {
    title: 'Orderly',
    subtitle: 'QR-Based Food Order Web Application',
    description: 'A modern, responsive web application that streamlines the food ordering process for restaurants and cafes. Users can scan a QR code to view the menu, place orders, and make payments seamlessly.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    color: '#ed9f3aff',
    bg: 'linear-gradient(135deg, #201000ff, #2f1500ff)',
    emoji: '🍔',
    type: 'Independent',
  },
  {
    title: 'Strong Password Checker',
    subtitle: 'Security Tool',
    description: 'Real-time password strength evaluation based on length, character composition, and entropy rules. Visual feedback indicators and clean, lightweight frontend.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vite'],
    color: '#7C3AED',
    bg: 'linear-gradient(135deg, #0d0020, #14002f)',
    emoji: '🔐',
    type: 'Independent',
  },
  {
    title: 'Tic-Tac-Toe',
    subtitle: 'Interactive Game',
    description: 'Lightweight, responsive Tic-Tac-Toe game featuring two-player local gameplay, win/draw detection, and a clean UI with modern React components. Deployed on GitHub Pages.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vite', 'CSS3', 'React Bits'],
    color: '#F97316',
    bg: 'linear-gradient(135deg, #1a0a00, #2a1200)',
    emoji: '🎮',
    type: 'Independent',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16
    cardRef.current.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
    setHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="relative rounded-3xl overflow-hidden flex-shrink-0"
      style={{
        width: 380,
        minHeight: 480,
        background: project.bg,
        border: `1px solid ${hovered ? project.color + '40' : 'var(--border)'}`,
        boxShadow: hovered ? `0 20px 60px ${project.color}20` : 'none',
        transformStyle: 'preserve-3d',
        transition: 'border 0.3s, box-shadow 0.3s, transform 0.2s',
        cursor: 'none',
      }}
    >
      {/* Glow top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}80, transparent)` }}
      />

      <div className="p-8 flex flex-col h-full" style={{ minHeight: 480 }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <span style={{ fontSize: 48 }}>{project.emoji}</span>
          <div className="flex flex-col items-end gap-2">
            <span
              className="font-mono text-xs px-3 py-1 rounded-full"
              style={{
                background: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}30`,
              }}
            >
              {project.type}
            </span>
            <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
              0{index + 1}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display mb-1" style={{ fontSize: 32, color: project.color, letterSpacing: '0.04em' }}>
          {project.title}
        </h3>
        <p className="font-mono text-xs tracking-wider mb-4" style={{ color: 'var(--muted)', textTransform: 'uppercase' }}>
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-8 flex-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Hover arrow */}
        <motion.div
          animate={{ x: hovered ? 8 : 0, opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-8 right-8 font-display text-2xl"
          style={{ color: project.color }}
        >
          →
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function SelectedWorks() {
  return (
    <section id="projects" className="section-pad relative" style={{ background: 'var(--bg)' }}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orb bg-orb--9" />
        <div className="bg-orb bg-orb--10" />
      </div>

      <div className="relative z-10 mx-auto px-8" style={{maxWidth: '100vw' }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-8"
        >
          <div style={{ width: 40, height: 1, background: 'var(--accent)' }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            03 — Projects
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              className="font-display leading-none"
              style={{ fontSize: 'clamp(48px, 8vw, 120px)', color: 'var(--fg)' }}
            >
              SELECTED
            </motion.h2>
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="font-display leading-none gradient-text"
              style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}
            >
              WORKS
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-sm"
            style={{ color: 'var(--muted)', lineHeight: 1.7 }}
          >
            A curated selection of projects — from collaborative editors to interactive games.
          </motion.p>
        </div>

        {/* Horizontal scroll */}
        <div
          className="horizontal-scroll pb-6"
          style={{ paddingLeft: 0, paddingRight: 40 }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mt-4"
          style={{ color: 'var(--muted)' }}
        >
          <span className="font-mono text-xs">← Drag to explore</span>
          <motion.div
            animate={{ x: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="font-mono text-xs"
          >
            →
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
