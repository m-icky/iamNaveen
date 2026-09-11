import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSound from '../../hooks/useSound'

const CATEGORIES = [
  { id: 'all', label: 'ALL' },
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
    highlight: 'Architected Google Docs–style collaborative editor with schema transforms & tracked changes',
    x: 48, // percentage in orbital area
    y: 20,
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
    highlight: 'Modular state systems, custom hooks, concurrent mode & sub-millisecond render pipelines',
    x: 18,
    y: 35,
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
    highlight: 'Interactive 3D scenes, physics simulations, custom GLSL shaders & canvas optimizations',
    x: 80,
    y: 34,
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
    highlight: 'Strict type safety, generic utility architectures & AST-level schema validations',
    x: 30,
    y: 72,
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
    highlight: 'Headless extension ecosystem, custom node views, collaboration sync & structured XML roundtripping',
    x: 68,
    y: 72,
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
    highlight: 'Peer-to-peer data channels, live presence indicators & sub-50ms collaborative sync',
    x: 10,
    y: 56,
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
    highlight: 'Gesture physics, cinematic page orchestrations, layout transitions & SVG morphs',
    x: 88,
    y: 58,
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
    highlight: 'Bespoke design systems, dark/light token matrices, fluid typography & micro-interactions',
    x: 23,
    y: 16,
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
    highlight: 'High-frequency ScrollTrigger pinning, SVG path deformation & scrub choreography',
    x: 77,
    y: 16,
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
    highlight: 'Containerization, reproducible micro-environments, CI/CD runners & multi-stage builds',
    x: 50,
    y: 83,
    ring: 2,
  },
]

export default function AboutSkillsAnimation() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedSkillId, setSelectedSkillId] = useState('prosemirror')
  const [isHoveringCard, setIsHoveringCard] = useState(false)
  const containerRef = useRef(null)
  const { playHover, playClick } = useSound()

  // 3D card tilt coordinates
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
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringCard(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full rounded-3xl overflow-hidden flex flex-col justify-between select-none"
      style={{
        background: 'linear-gradient(135deg, rgba(14, 14, 17, 0.82) 0%, rgba(8, 8, 10, 0.94) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: isHoveringCard
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${currentSkill.color}15, transparent 65%)`
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
          backgroundSize: '28px 28px',
        }}
      />

      {/* ─── TOP BAR: Terminal Header & Category Filter ─── */}
      <div className="relative z-20 px-5 pt-4 pb-2 flex flex-wrap items-center justify-between gap-3 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          {/* macOS traffic light dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-80" />
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase text-white/50">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E8FF00] animate-pulse" />
            <span>ARCH // TECH_ORBIT</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/5">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  playClick()
                  // auto-select first in category if current isn't in it
                  const match = SKILLS.find(s => cat.id === 'all' || s.category === cat.id)
                  if (match) setSelectedSkillId(match.id)
                }}
                className={`px-2.5 py-1 rounded-full font-mono text-[9px] tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? 'bg-[#E8FF00] text-black font-bold shadow-[0_0_12px_rgba(232,255,0,0.4)]'
                    : 'text-white/40 hover:text-white/80 hover:bg-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── CENTER STAGE: Holographic Reactor & Dynamic Orbital Field ─── */}
      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden min-h-[260px]">
        {/* Animated Concentric Orbital Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Outermost Orbit Ring with slow rotation */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
            className="absolute rounded-full border border-dashed border-white/10"
            style={{ width: '84%', height: '84%' }}
          />

          {/* Middle Orbit Ring with reverse rotation */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
            className="absolute rounded-full border border-white/[0.08]"
            style={{
              width: '62%',
              height: '62%',
              borderColor: `${currentSkill.color}25`,
              transition: 'border-color 0.8s ease',
            }}
          />

          {/* Inner Fast Orbit Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="absolute rounded-full border border-dashed border-white/15"
            style={{ width: '42%', height: '42%' }}
          />

          {/* Radar Sweep Arc */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[80%] h-[80%] pointer-events-none"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 300deg, ${currentSkill.color}20 360deg)`,
              borderRadius: '50%',
              transition: 'background 0.8s ease',
            }}
          />

          {/* Central Reactor Core */}
          <div className="relative z-10 flex items-center justify-center">
            {/* Core Pulse Ring */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-20 h-20 rounded-full blur-xl"
              style={{ background: currentSkill.color }}
            />

            {/* Hex Core Disc */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="relative w-16 h-16 rounded-2xl flex flex-col items-center justify-center border transition-all duration-500 shadow-2xl"
              style={{
                background: 'rgba(10, 10, 12, 0.88)',
                borderColor: currentSkill.color,
                boxShadow: `0 0 24px ${currentSkill.color}40, inset 0 0 12px ${currentSkill.color}30`,
              }}
            >
              <span className="font-display text-lg tracking-wider text-white">NTM</span>
              <span className="font-mono text-[8px] uppercase tracking-widest text-[#E8FF00]">DEV</span>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Energy Line connecting Center to Active Skill */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <linearGradient id="beamGradient" x1="50%" y1="50%" x2={`${currentSkill.x}%`} y2={`${currentSkill.y}%`}>
              <stop offset="0%" stopColor="#E8FF00" stopOpacity="0.8" />
              <stop offset="100%" stopColor={currentSkill.color} stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <motion.line
            x1="50%"
            y1="50%"
            x2={`${currentSkill.x}%`}
            y2={`${currentSkill.y}%`}
            stroke="url(#beamGradient)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </svg>

        {/* ─── SKILL NODES (Crisply positioned, responsive, zero-collision) ─── */}
        <div className="absolute inset-0 z-20">
          {SKILLS.map((skill, index) => {
            const isSelected = skill.id === selectedSkillId
            const isDimmed = activeCategory !== 'all' && skill.category !== activeCategory

            // Floating bob offset
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
                  className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'shadow-lg z-30'
                      : isDimmed
                      ? 'opacity-30 blur-[0.5px] scale-90'
                      : 'opacity-85 hover:opacity-100'
                  }`}
                  style={{
                    background: isSelected
                      ? `linear-gradient(135deg, rgba(20,20,24,0.95) 0%, rgba(10,10,12,0.98) 100%)`
                      : 'rgba(14, 14, 18, 0.72)',
                    border: isSelected
                      ? `1.5px solid ${skill.color}`
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: isSelected
                      ? `0 0 20px ${skill.color}50, inset 0 0 10px ${skill.color}25`
                      : '0 4px 12px rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Icon with glowing backdrop on select */}
                  <div
                    className="flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300"
                    style={{
                      background: isSelected ? `${skill.color}25` : 'rgba(255,255,255,0.06)',
                      color: skill.color,
                    }}
                  >
                    {skill.icon}
                  </div>

                  {/* Label */}
                  <span
                    className={`font-mono text-xs tracking-wider transition-colors duration-200 whitespace-nowrap ${
                      isSelected ? 'text-white font-bold' : 'text-white/80'
                    }`}
                  >
                    {skill.name}
                  </span>

                  {/* Active Radar Ping on Selected Node */}
                  {isSelected && (
                    <span
                      className="absolute -inset-1 rounded-full border border-dashed animate-spin pointer-events-none"
                      style={{
                        borderColor: `${skill.color}80`,
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

      {/* ─── BOTTOM TELEMETRY DRAWER: Live Inspector & Impact Card ─── */}
      <div className="relative z-20 mx-4 mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSkill.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-2xl p-3.5 border transition-all duration-300"
            style={{
              background: 'rgba(10, 10, 13, 0.85)',
              borderColor: `${currentSkill.color}35`,
              boxShadow: `0 8px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`,
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header: Name, Badge, Mastery Level */}
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shadow-[0_0_8px]"
                  style={{ background: currentSkill.color, boxShadow: `0 0 8px ${currentSkill.color}` }}
                />
                <span className="font-display tracking-wide text-base text-white">
                  {currentSkill.name}
                </span>
                <span
                  className="font-mono text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold border"
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
                <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentSkill.level}%` }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="h-full rounded-full"
                    style={{ background: currentSkill.color }}
                  />
                </div>
                <span className="font-mono text-[10px] font-bold" style={{ color: currentSkill.color }}>
                  {currentSkill.level}%
                </span>
              </div>
            </div>

            {/* Impact Highlight Text */}
            <p className="font-body text-xs leading-relaxed text-white/70 line-clamp-2">
              {currentSkill.highlight}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
