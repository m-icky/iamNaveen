import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const experiences = [
  {
    role: 'Software Engineer',
    company: 'RSGP Consulting Private Limited',
    location: 'Technopark Phase III, Kazhakkoottam, Kerala',
    period: 'May 2023 — Present',
    color: '#E8FF00',
    current: true,
    highlights: [
      'Led complete frontend engineering of a Google Docs-style document editor',
      'Built collaborative editing with real-time sync using ProseMirror & TipTap',
      'Implemented tracked changes, version history, and structured XML export',
      'Architected article management and rich text formatting systems',
      'Tech: React.js, TipTap, ProseMirror, Laravel, MySQL',
    ],
  },
  {
    role: 'Junior Software Engineer',
    company: 'Cyber Prism Software Solutions',
    location: 'Crown Plaza, Hostel Junction, Muvattupuzha, Kerala',
    period: 'Aug 2022 — May 2023',
    color: '#FF3CAC',
    current: false,
    highlights: [
      'Developed Medical Retail & Inventory Management system',
      'Built booking system with stock threshold alerts and admin controls',
      'Created Construction Equipment Management platform',
      'Customer verification system for equipment hire eligibility',
      'Tech: HTML5/CSS3, PHP, Python/Django, MySQL',
    ],
  },
]

function TimelineItem({ exp, index, isLast }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="relative flex gap-5 md:gap-10">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}
          className="relative z-10 flex-shrink-0"
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: exp.color,
            boxShadow: `0 0 16px ${exp.color}80`,
            marginTop: 6,
          }}
        >
          {exp.current && (
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                inset: -3,
                borderRadius: '50%',
                border: `2px solid ${exp.color}`,
              }}
            />
          )}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{
              width: 1,
              flex: 1,
              marginTop: 4,
              background: `linear-gradient(to bottom, ${exp.color}40, transparent)`,
            }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="pb-6 flex-1"
      >
        <div className="glass rounded-2xl p-5" style={{ border: `1px solid ${exp.color}20` }}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="font-display mb-0.5" style={{ fontSize: 'clamp(18px, 3vw, 28px)', color: exp.color, letterSpacing: '0.04em' }}>
                {exp.role}
              </h3>
              <p className="font-body text-sm" style={{ color: 'var(--fg)' }}>{exp.company}</p>
              <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{exp.location}</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <span
                className="font-mono text-xs px-3 py-1 rounded-full flex-shrink-0"
                style={{
                  background: `${exp.color}15`,
                  color: exp.color,
                  border: `1px solid ${exp.color}30`,
                }}
              >
                {exp.period}
              </span>
              {exp.current && (
                <span className="font-mono text-xs" style={{ color: exp.color }}>● Active</span>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            {exp.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 15 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="flex items-start gap-2"
              >
                <div className="flex-shrink-0 mt-1.5" style={{ width: 3, height: 3, borderRadius: '50%', background: exp.color }} />
                <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{h}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative w-full" style={{ background: 'var(--bg)' }}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orb bg-orb--5" />
        <div className="bg-orb bg-orb--6" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-16">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div style={{ width: 40, height: 1, background: 'var(--accent)' }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            04 — Experience
          </span>
        </motion.div>

        <div className="mb-6">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              className="font-display leading-none"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: 'var(--fg)' }}
            >
              WHERE I'VE
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="font-display leading-none gradient-text"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              WORKED
            </motion.h2>
          </div>
        </div>

        {/* Timeline */}
        <div>
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.company} exp={exp} index={i} isLast={i === experiences.length - 1} />
          ))}
        </div>

        {/* Education row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-2 glass rounded-2xl p-5"
          style={{ border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span style={{ fontSize: 24 }}>🎓</span>
            <h4 className="font-display text-lg" style={{ color: 'var(--accent)' }}>EDUCATION</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-body text-sm" style={{ color: 'var(--fg)' }}>Electronics & Communication Engineering (B.Tech)</p>
              <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>Mar Athanasius College of Engineering, Ernakulam</p>
              <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--accent)' }}>2018 — 2022</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['IPSR — Advanced Web Dev (PHP)', 'Cyber Prism — Python/Django'].map(cert => (
                <span key={cert} className="font-mono text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(232,255,0,0.08)', color: 'var(--accent)', border: '1px solid rgba(232,255,0,0.2)' }}>
                  📜 {cert}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
