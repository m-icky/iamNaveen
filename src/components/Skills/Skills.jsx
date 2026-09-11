import { useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LogoLoop from '../ReactBits/LogoLoop'
import useSound from '../../hooks/useSound'

const skillsData = [
  { name: 'React JS', category: 'core', icon: '⚛️', level: 96, color: '#61DAFB', desc: 'Advanced component architecture, custom hooks, concurrent pipelines & performance profiling' },
  { name: 'ProseMirror', category: 'collab', icon: '📝', level: 95, color: '#FF6B35', desc: 'Rich-text schema transforms, transaction mapping, collaborative steps & structured XML roundtripping' },
  { name: 'TipTap v2', category: 'collab', icon: '⚡', level: 92, color: '#A855F7', desc: 'Headless extension ecosystem, custom node views, real-time sync & collaboration tokens' },
  { name: 'Three.js / R3F', category: 'creative', icon: '🧊', level: 82, color: '#E8FF00', desc: 'WebGL 3D scenes, custom shaders, Rapier physics, particle simulations & canvas optimization' },
  { name: 'JavaScript ES6+', category: 'core', icon: '⚡', level: 94, color: '#F7DF1E', desc: 'Modern async patterns, Web APIs, functional architectures & sub-millisecond execution' },
  { name: 'TailwindCSS', category: 'core', icon: '🎨', level: 96, color: '#38BDF8', desc: 'Utility-first tokens, dynamic responsive layouts, dark/light theme systems' },
  { name: 'Framer Motion', category: 'creative', icon: '🎬', level: 90, color: '#FF3CAC', desc: 'Spring-physics transitions, layout animations, scroll-driven choreography & gestures' },
  { name: 'GSAP', category: 'creative', icon: '🌀', level: 85, color: '#00D26A', desc: 'ScrollTrigger pinning, scrub timelines, smooth pinning & complex morphing' },
  { name: 'Figma', category: 'creative', icon: '✏️', level: 84, color: '#A259FF', desc: 'UI/UX systems, interactive prototyping, micro-interaction mockups & token handoff' },
  { name: 'Docker', category: 'systems', icon: '🐳', level: 75, color: '#2496ED', desc: 'Containerization, reproducible build environments & cloud deployments' },
  { name: 'Python / Django', category: 'systems', icon: '🐍', level: 72, color: '#3776AB', desc: 'RESTful API engineering, relational ORM data modeling & business logic' },
  { name: 'MySQL / Database', category: 'systems', icon: '🗄️', level: 78, color: '#F29111', desc: 'Relational schema design, query indexing, ACID transactions & data integrity' },
]

const categories = [
  { id: 'all', label: 'ALL SKILLS' },
  { id: 'core', label: 'FRONTEND CORE' },
  { id: 'collab', label: 'EDITORS & COLLAB' },
  { id: 'creative', label: '3D & MOTION' },
  { id: 'systems', label: 'SYSTEMS & CLOUD' },
]

function SkillCard({ skill, index }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const { playHover } = useSound()

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16
    ref.current.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)'
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => {
        setHovered(true)
        playHover()
      }}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      data-cursor-text="SKILL"
      className="glass rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between transition-all duration-300 group"
      style={{
        border: hovered ? `1px solid ${skill.color}50` : '1px solid var(--border)',
        boxShadow: hovered ? `0 15px 40px ${skill.color}20, 0 0 30px ${skill.color}15` : 'none',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow Sheen */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse 90% 90% at 50% 0%, ${skill.color}15 0%, transparent 75%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl glass border border-white/10 group-hover:border-white/25 transition-colors">
            {skill.icon}
          </div>
          <span
            className="font-mono text-xs px-2.5 py-1 rounded-full font-bold"
            style={{
              background: `${skill.color}15`,
              color: skill.color,
              border: `1px solid ${skill.color}35`,
            }}
          >
            {skill.level}%
          </span>
        </div>

        <h3 className="font-display text-xl font-bold tracking-tight text-white mb-1.5 group-hover:text-accent transition-colors">
          {skill.name}
        </h3>

        <p className="font-body text-xs leading-relaxed text-white/60 mb-5">
          {skill.desc}
        </p>
      </div>

      {/* Progress Track */}
      <div className="relative z-10 w-full">
        <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1 + index * 0.04, ease: [0.23, 1, 0.32, 1] }}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
              boxShadow: `0 0 10px ${skill.color}`,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all')
  const { playClick, playHover } = useSound()

  const filteredSkills = useMemo(() => {
    if (activeTab === 'all') return skillsData
    return skillsData.filter((s) => s.category === activeTab)
  }, [activeTab])

  return (
    <section id="skills" className="relative w-full py-16 md:py-24" style={{ background: 'var(--bg)' }}>
      {/* Ambient background lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orb bg-orb--7" />
        <div className="bg-orb bg-orb--8" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-10 h-px bg-accent" />
          <span className="font-mono text-xs tracking-widest uppercase text-accent font-semibold">
            02 — Technological Arsenal
          </span>
        </motion.div>

        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2
              className="font-display text-4xl sm:text-7xl font-black tracking-tight leading-none text-white mb-2"
            >
              TECHNICAL <span className="gradient-text">MASTERY</span>
            </h2>
            <p className="font-body text-sm sm:text-base text-white/60 max-w-lg">
              Curated stack engineered for sub-millisecond responsiveness, real-time collaboration, and immersive graphics.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const active = activeTab === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playClick()
                  setActiveTab(cat.id)
                }}
                onMouseEnter={playHover}
                className={`px-4 py-2 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                  active
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'glass border border-white/10 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Logo Loop Marquee — Infinite Tech Ribbon */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="text-center mb-6">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
              // CONTINUOUS RUNTIME ENVIRONMENT
            </span>
          </div>
          <LogoLoop speed={26} direction="left" size={42} gap={10} />
          <div className="mt-4">
            <LogoLoop speed={20} direction="right" size={42} gap={10} />
          </div>
        </div>
      </div>
    </section>
  )
}
