import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSound from '../../hooks/useSound'

const CATEGORIES = [
  { id: 'all', label: 'ALL SKILLS' },
  { id: 'collab', label: 'COLLAB & EDITORS' },
  { id: 'core', label: 'FRONTEND CORE' },
  { id: 'creative', label: '3D & MOTION' },
  { id: 'arch', label: 'SYSTEMS' },
]

const SKILLS = [
  {
    id: 'prosemirror',
    name: 'ProseMirror',
    category: 'collab',
    badge: 'CORE SPECIALTY',
    level: 95,
    color: '#FF6B35',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    highlight: 'Architected Google Docs–style collaborative editor with schema transforms, transactions & tracked changes.',
    x: 50,
    y: 22,
    ring: 1,
  },
  {
    id: 'react',
    name: 'React 18',
    category: 'core',
    badge: 'FRAMEWORK',
    level: 96,
    color: '#61DAFB',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="9" ry="3.4" stroke="#61DAFB" strokeWidth="1.4" fill="none" />
        <ellipse cx="12" cy="12" rx="9" ry="3.4" stroke="#61DAFB" strokeWidth="1.4" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.4" stroke="#61DAFB" strokeWidth="1.4" fill="none" transform="rotate(120 12 12)" />
      </svg>
    ),
    highlight: 'Modular state systems, custom hooks, concurrent mode pipelines & sub-millisecond render optimizations.',
    x: 32,
    y: 38,
    ring: 1,
  },
  {
    id: 'threejs',
    name: 'Three.js / R3F',
    category: 'creative',
    badge: '3D WEBGL',
    level: 88,
    color: '#E8FF00',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 19.5h20L12 2zm0 4.2l6.5 11.3H5.5L12 6.2z" />
      </svg>
    ),
    highlight: 'Interactive 3D scenes, physics simulations, custom GLSL shaders & performant WebGL canvas integration.',
    x: 68,
    y: 38,
    ring: 1,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'core',
    badge: 'TYPE SAFETY',
    level: 92,
    color: '#38BDF8',
    icon: (
      <span className="font-mono font-bold text-[11px] leading-none" style={{ color: '#38BDF8' }}>TS</span>
    ),
    highlight: 'Strict type safety, generic utility architectures, mapped types & AST-level schema validations.',
    x: 34,
    y: 68,
    ring: 2,
  },
  {
    id: 'tiptap',
    name: 'TipTap v2',
    category: 'collab',
    badge: 'RICH TEXT',
    level: 92,
    color: '#A855F7',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    highlight: 'Headless extension ecosystem, custom node views, real-time collaboration tokens & XML conversions.',
    x: 66,
    y: 68,
    ring: 2,
  },
  {
    id: 'webrtc',
    name: 'WebRTC',
    category: 'collab',
    badge: 'REALTIME',
    level: 82,
    color: '#8CC84B',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
        <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
        <path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1" />
      </svg>
    ),
    highlight: 'Peer-to-peer data channels, presence awareness, ephemeral sync & sub-50ms multi-user collaboration.',
    x: 16,
    y: 52,
    ring: 2,
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    category: 'creative',
    badge: 'PHYSICS',
    level: 90,
    color: '#FF3CAC',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
    highlight: 'Spring-physics transitions, layout animations, scroll-driven choreography & tactile gesture systems.',
    x: 84,
    y: 52,
    ring: 2,
  },
  {
    id: 'tailwind',
    name: 'TailwindCSS',
    category: 'core',
    badge: 'STYLING',
    level: 95,
    color: '#00F0FF',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    ),
    highlight: 'Bespoke design tokens, responsive fluid layouts, dark/light theme systems & micro-interaction styling.',
    x: 24,
    y: 20,
    ring: 2,
  },
  {
    id: 'gsap',
    name: 'GSAP',
    category: 'creative',
    badge: 'TIMELINES',
    level: 85,
    color: '#00D26A',
    icon: (
      <span className="font-mono font-black text-[12px] leading-none" style={{ color: '#00D26A' }}>G</span>
    ),
    highlight: 'High-frequency ScrollTrigger pinning, SVG path deformation, scrub choreography & timeline control.',
    x: 76,
    y: 20,
    ring: 2,
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'arch',
    badge: 'DEVOPS',
    level: 76,
    color: '#2496ED',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.186.186.186" />
      </svg>
    ),
    highlight: 'Containerization, reproducible micro-environments, CI/CD runners & multi-stage build pipelines.',
    x: 50,
    y: 84,
    ring: 2,
  },
]

export default function TechOrbit() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedSkillId, setSelectedSkillId] = useState('prosemirror')
  const [isHoveringCard, setIsHoveringCard] = useState(false)
  const containerRef = useRef(null)
  const { playClick, playHover } = useSound()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 })

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return SKILLS
    return SKILLS.filter(s => s.category === activeCategory)
  }, [activeCategory])

  const currentSkill = useMemo(() => {
    return SKILLS.find(s => s.id === selectedSkillId) || SKILLS[0]
  }, [selectedSkillId])

  // Automatic cycle when not hovering
  useEffect(() => {
    if (isHoveringCard) return

    const cyclePool = filteredSkills.length > 0 ? filteredSkills : SKILLS
    const interval = setInterval(() => {
      setSelectedSkillId(prevId => {
        const currentIndex = cyclePool.findIndex(s => s.id === prevId)
        const nextIndex = (currentIndex + 1) % cyclePool.length
        return cyclePool[nextIndex].id
      })
    }, 3800)

    return () => clearInterval(interval)
  }, [isHoveringCard, filteredSkills])

  // Mouse move handler for interactive 3D perspective tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const normalizedX = (x / rect.width - 0.5) * 2 // -1 to 1
    const normalizedY = (y / rect.height - 0.5) * 2

    setMousePos({ x, y, normalizedX, normalizedY })
  }

  const handleMouseLeave = () => {
    setIsHoveringCard(false)
    setMousePos({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 })
  }

  return (
    <section
      id="tech-orbit"
      className="relative w-full py-16 md:py-24 overflow-hidden scroll-mt-16"
      style={{ background: 'var(--bg)' }}
    >
      {/* Ambient background lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orb bg-orb--2" />
        <div className="bg-orb bg-orb--4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header with Standalone Stats Badges */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-10 h-px bg-accent" />
              <span className="font-mono text-xs tracking-widest uppercase text-accent font-semibold">
                02 — Interactive Tech Ecosystem
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-black tracking-tight text-3xl sm:text-5xl lg:text-6xl text-white"
            >
              ARCHITECTURAL <span className="gradient-text">TECH ORBIT</span>
            </motion.h2>
            <p className="font-body text-xs sm:text-sm text-white/60 mt-2 max-w-xl">
              Live dependency topology & competency orbits. Hover or click any orbital node to inspect engineering schemas and architectural impact.
            </p>
          </div>

          {/* Clean Top Stat Chips (Never Overlapping the Canvas) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 self-start md:self-end flex-wrap"
          >
            <div className="px-4 py-2.5 rounded-2xl glass border border-accent/40 shadow-[0_0_20px_rgba(232,255,0,0.15)] flex items-center gap-2.5">
              <span className="font-display font-black text-xl sm:text-2xl text-accent">3+</span>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">Years</span>
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-white">Experience</span>
              </div>
            </div>

            <div className="px-4 py-2.5 rounded-2xl glass border border-white/15 shadow-lg flex items-center gap-2.5">
              <span className="font-display font-black text-xl sm:text-2xl text-white">25+</span>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-medium">Production</span>
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-white">Shipped</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── FULL-WIDTH INTERACTIVE ORBIT CARD ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl p-2 sm:p-3"
          style={{ minHeight: 'clamp(540px, 65vh, 660px)' }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute -inset-4 rounded-3xl pointer-events-none opacity-50"
            style={{
              background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(232,255,0,0.1) 0%, transparent 70%)',
            }}
          />

          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHoveringCard(true)}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between select-none"
            style={{
              background: 'linear-gradient(135deg, rgba(14, 14, 18, 0.85) 0%, rgba(8, 8, 10, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              minHeight: 'clamp(520px, 62vh, 640px)',
            }}
          >
            {/* Interactive Cursor Spotlight Glow */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                background: isHoveringCard
                  ? `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${currentSkill.color}18, transparent 65%)`
                  : 'radial-gradient(circle at 50% 50%, rgba(232, 255, 0, 0.06), transparent 70%)',
              }}
            />

            {/* Cyber Grid Background lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: '32px 32px',
              }}
            />

            {/* ─── TOP BAR: Terminal Header & Category Filter (Ample Room) ─── */}
            <div className="relative z-20 px-5 sm:px-8 pt-5 pb-3 flex flex-wrap items-center justify-between gap-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                {/* macOS traffic light dots */}
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-white/60">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#E8FF00] animate-pulse shadow-[0_0_8px_#E8FF00]" />
                  <span className="font-semibold text-white">ARCH // TECH_ORBIT</span>
                  <span className="hidden sm:inline text-white/40">// TOPOLOGY_VIEW</span>
                </div>
              </div>

              {/* Category Pills (Clean swipe on mobile, spacious on desktop) */}
              <div className="flex items-center gap-1.5 bg-white/[0.04] p-1.5 rounded-full border border-white/10 max-w-full overflow-x-auto no-scrollbar">
                {CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id)
                        playClick()
                        const match = SKILLS.find(s => cat.id === 'all' || s.category === cat.id)
                        if (match) setSelectedSkillId(match.id)
                      }}
                      onMouseEnter={playHover}
                      className={`px-3 sm:px-3.5 py-1.5 rounded-full font-mono text-[10px] tracking-wider uppercase transition-all duration-300 ${
                        isActive
                          ? 'bg-[#E8FF00] text-black font-bold shadow-[0_0_15px_rgba(232,255,0,0.5)]'
                          : 'text-white/50 hover:text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ─── CENTER STAGE: Dynamic Orbital Canvas (Expansive Width) ─── */}
            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden min-h-[340px] sm:min-h-[400px]">
              {/* Animated Concentric Orbital Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Outermost Orbit Ring with slow rotation */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                  className="absolute rounded-full border border-dashed border-white/10"
                  style={{ width: '84%', height: '84%', maxWidth: 780, maxHeight: 780 }}
                />

                {/* Middle Orbit Ring with reverse rotation */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  className="absolute rounded-full border border-white/[0.08]"
                  style={{
                    width: '62%',
                    height: '62%',
                    maxWidth: 560,
                    maxHeight: 560,
                    borderColor: `${currentSkill.color}30`,
                    transition: 'border-color 0.8s ease',
                  }}
                />

                {/* Inner Fast Orbit Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  className="absolute rounded-full border border-dashed border-white/15"
                  style={{ width: '40%', height: '40%', maxWidth: 360, maxHeight: 360 }}
                />

                {/* Radar Sweep Arc */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-[80%] h-[80%] max-w-[700px] max-h-[700px] pointer-events-none"
                  style={{
                    background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 300deg, ${currentSkill.color}25 360deg)`,
                    borderRadius: '50%',
                    transition: 'background 0.8s ease',
                  }}
                />

                {/* Central Reactor Core */}
                <div className="relative z-10 flex items-center justify-center">
                  {/* Core Pulse Ring */}
                  <motion.div
                    animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0.75, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute w-24 h-24 rounded-full blur-2xl"
                    style={{ background: currentSkill.color }}
                  />

                  {/* Hex Core Disc */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center border transition-all duration-500 shadow-2xl cursor-pointer p-3"
                    style={{
                      background: 'rgba(10, 10, 14, 0.92)',
                      borderColor: currentSkill.color,
                      boxShadow: `0 0 30px ${currentSkill.color}45, inset 0 0 15px ${currentSkill.color}35`,
                    }}
                  >
                    <span className="font-display font-black text-xl sm:text-2xl tracking-wider text-white">NTM</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#E8FF00] font-semibold">DEV_CORE</span>
                  </motion.div>
                </div>
              </div>

              {/* Dynamic Energy Line connecting Center to Active Skill */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <defs>
                  <linearGradient id="orbitBeamGradient" x1="50%" y1="50%" x2={`${currentSkill.x}%`} y2={`${currentSkill.y}%`}>
                    <stop offset="0%" stopColor="#E8FF00" stopOpacity="0.8" />
                    <stop offset="100%" stopColor={currentSkill.color} stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <motion.line
                  x1="50%"
                  y1="50%"
                  x2={`${currentSkill.x}%`}
                  y2={`${currentSkill.y}%`}
                  stroke="url(#orbitBeamGradient)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </svg>

              {/* ─── SKILL NODES (Spacious, Fully Visible, Zero Clipping) ─── */}
              <div className="absolute inset-0 z-20">
                {SKILLS.map((skill, index) => {
                  const isSelected = skill.id === selectedSkillId
                  const isDimmed = activeCategory !== 'all' && skill.category !== activeCategory

                  const floatOffset = (index % 3 + 1) * 3
                  const floatDuration = 3 + (index % 4) * 0.5

                  return (
                    <motion.div
                      key={skill.id}
                      animate={{
                        y: [0, -floatOffset, 0],
                        x: [0, (index % 2 === 0 ? 2 : -2), 0],
                      }}
                      transition={{
                        duration: floatDuration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.2,
                      }}
                      style={{
                        position: 'absolute',
                        left: `${skill.x}%`,
                        top: `${skill.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <motion.button
                        onClick={() => {
                          setSelectedSkillId(skill.id)
                          playClick()
                        }}
                        onMouseEnter={() => {
                          setSelectedSkillId(skill.id)
                          playHover()
                        }}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                        className={`group relative flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1 sm:py-2 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'shadow-xl z-30'
                            : isDimmed
                            ? 'opacity-30 blur-[0.5px] scale-90'
                            : 'opacity-90 hover:opacity-100'
                        }`}
                        style={{
                          background: isSelected
                            ? `linear-gradient(135deg, rgba(20,20,26,0.98) 0%, rgba(10,10,14,0.98) 100%)`
                            : 'rgba(14, 14, 20, 0.78)',
                          border: isSelected
                            ? `1.5px solid ${skill.color}`
                            : '1px solid rgba(255, 255, 255, 0.12)',
                          boxShadow: isSelected
                            ? `0 0 25px ${skill.color}55, inset 0 0 12px ${skill.color}30`
                            : '0 4px 15px rgba(0,0,0,0.5)',
                          backdropFilter: 'blur(14px)',
                          WebkitBackdropFilter: 'blur(14px)',
                        }}
                      >
                        {/* Icon */}
                        <div
                          className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-300 shrink-0"
                          style={{
                            background: isSelected ? `${skill.color}30` : 'rgba(255,255,255,0.08)',
                            color: skill.color,
                          }}
                        >
                          {skill.icon}
                        </div>

                        {/* Label (Guaranteed fully visible) */}
                        <span
                          className={`font-mono text-[10px] sm:text-xs md:text-sm tracking-wider transition-colors duration-200 whitespace-nowrap ${
                            isSelected ? 'text-white font-bold' : 'text-white/85 group-hover:text-white'
                          }`}
                        >
                          {skill.name}
                        </span>

                        {/* Active Radar Ping on Selected Node */}
                        {isSelected && (
                          <span
                            className="absolute -inset-1 rounded-full border border-dashed animate-spin pointer-events-none"
                            style={{
                              borderColor: `${skill.color}90`,
                              animationDuration: '6s',
                            }}
                          />
                        )}
                      </motion.button>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* ─── BOTTOM TELEMETRY DRAWER: Live Inspector & Impact Card (Full Width) ─── */}
            <div className="relative z-20 mx-4 sm:mx-8 mb-4 sm:mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSkill.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  className="rounded-2xl p-4 sm:p-5 border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  style={{
                    background: 'rgba(10, 10, 14, 0.9)',
                    borderColor: `${currentSkill.color}40`,
                    boxShadow: `0 10px 35px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)`,
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Left Info: Name, Badge, Mastery Level */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
                    <div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                      style={{ background: currentSkill.color, boxShadow: `0 0 10px ${currentSkill.color}` }}
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold tracking-wide text-base sm:text-xl text-white">
                        {currentSkill.name}
                      </span>
                      <span
                        className="font-mono text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold border"
                        style={{
                          color: currentSkill.color,
                          borderColor: `${currentSkill.color}40`,
                          background: `${currentSkill.color}15`,
                        }}
                      >
                        {currentSkill.badge}
                      </span>
                    </div>

                    {/* Progress Bar & Percent */}
                    <div className="flex items-center gap-2">
                      <div className="w-20 sm:w-24 h-2 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${currentSkill.level}%` }}
                          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                          className="h-full rounded-full"
                          style={{ background: currentSkill.color }}
                        />
                      </div>
                      <span className="font-mono text-xs font-bold" style={{ color: currentSkill.color }}>
                        {currentSkill.level}%
                      </span>
                    </div>
                  </div>

                  {/* Right: Full Impact Highlight Text (Fully Visible, No Truncation) */}
                  <div className="w-full md:max-w-xl md:text-right">
                    <p className="font-body text-xs sm:text-sm leading-relaxed text-white/80">
                      {currentSkill.highlight}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
