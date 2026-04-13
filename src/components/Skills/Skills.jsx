import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import LogoLoop from '../ReactBits/LogoLoop'

const skills = [
  { name: 'React JS', icon: '⚛️', level: 95, color: '#61DAFB', desc: 'Advanced component architecture, hooks, performance optimization' },
  { name: 'Three.js', icon: '🧊', level: 70, color: '#E8FF00', desc: '3D scenes, shaders, particle systems, WebGL' },
  { name: 'Framer Motion', icon: '🎬', level: 85, color: '#FF3CAC', desc: 'Complex animations, scroll effects, layout transitions' },
  { name: 'JavaScript', icon: '⚡', level: 92, color: '#F7DF1E', desc: 'ES6+, async patterns, performance optimization' },
  { name: 'TailwindCSS', icon: '🎨', level: 95, color: '#38BDF8', desc: 'Utility-first, custom design systems, responsive layouts' },
  { name: 'Docker', icon: '🐳', level: 65, color: '#2496ED', desc: 'Containerization, deployment, environment consistency' },
  { name: 'Figma', icon: '✏️', level: 80, color: '#A259FF', desc: 'UI/UX design, prototyping, design systems' },
  { name: 'ProseMirror', icon: '📝', level: 85, color: '#FF6B35', desc: 'Rich text editing, collaborative editors, XML conversion' },
  { name: 'GSAP', icon: '🌀', level: 75, color: '#00D26A', desc: 'ScrollTrigger, timeline animations, morphing' },
  { name: 'MySQL', icon: '🗄️', level: 70, color: '#F29111', desc: 'Schema design, queries, relational data' },
  { name: 'Python / Django', icon: '🐍', level: 65, color: '#3776AB', desc: 'Backend APIs, inventory & booking systems' },
  { name: 'Git & GitHub', icon: '🔀', level: 88, color: '#F05032', desc: 'Version control, CI/CD, code collaboration' },
]

function SkillCard({ skill, index }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20
    ref.current.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) scale(1.04)`
  }
  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); handleMouseLeave() }}
      onMouseMove={handleMouseMove}
      className="glass rounded-2xl p-6 relative overflow-hidden"
      style={{
        border: hovered ? `1px solid ${skill.color}40` : '1px solid var(--border)',
        transition: 'border 0.3s, transform 0.2s',
        transformStyle: 'preserve-3d',
        cursor: 'none',
        boxShadow: hovered ? `0 0 30px ${skill.color}20, 0 0 60px ${skill.color}10` : 'none',
      }}
    >
      {/* Glow bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: hovered ? `radial-gradient(ellipse 80% 80% at 50% 0%, ${skill.color}10 0%, transparent 70%)` : 'none',
          transition: 'background 0.4s',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span style={{ fontSize: 28 }}>{skill.icon}</span>
          <span className="font-mono text-xs" style={{ color: skill.color }}>{skill.level}%</span>
        </div>
        <h3 className="font-display text-xl mb-1" style={{ color: 'var(--fg)', letterSpacing: '0.05em' }}>{skill.name}</h3>
        <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{skill.desc}</p>

        {/* Progress bar */}
        <div className="mt-4 h-px w-full" style={{ background: 'var(--border)' }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.06 + 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{ height: '100%', background: skill.color }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative" style={{ background: 'var(--bg)' }}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orb bg-orb--7" />
        <div className="bg-orb bg-orb--8" />
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
            02 — Skills
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              className="font-display leading-none"
              style={{ fontSize: 'clamp(48px, 8vw, 120px)', color: 'var(--fg)' }}
            >
              TECH <span className="gradient-text">STACK</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="max-w-sm"
            style={{ color: 'var(--muted)', lineHeight: 1.7 }}
          >
            Tools and technologies I use to craft exceptional digital experiences.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Logo Loop Marquee — embedded at bottom */}
        <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <LogoLoop speed={28} direction="left" size={40} gap={8} />
          <div className="mt-4">
            <LogoLoop speed={22} direction="right" size={40} gap={8} />
          </div>
        </div>
      </div>
    </section>
  )
}
