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
      'Spearheaded the complete frontend engineering of an enterprise Google Docs–style collaborative word processor',
      'Engineered real-time collaborative editing pipelines using ProseMirror & TipTap v2 with step mapping',
      'Implemented tracked changes, revision history, and structured roundtrip XML export systems',
      'Architected article management and high-performance rich text formatting components',
      'Stack: React.js, TipTap, ProseMirror, Laravel, MySQL, Tailwind CSS',
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
      'Developed responsive Medical Retail & Inventory Management platform with threshold alerts',
      'Built automated customer verification system for construction equipment hire eligibility',
      'Integrated RESTful APIs and real-time stock replenishment monitoring systems',
      'Stack: HTML5/CSS3, JavaScript, PHP, Python/Django, MySQL',
    ],
  },
]

function TimelineItem({ exp, index, isLast }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="relative flex gap-5 md:gap-8 pb-10">
      {/* Timeline Node & Connecting Vector */}
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
            boxShadow: `0 0 16px ${exp.color}90`,
            marginTop: 6,
          }}
        >
          {exp.current && (
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="absolute -inset-1 rounded-full border-2"
              style={{ borderColor: exp.color }}
            />
          )}
        </motion.div>

        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="w-px flex-1 mt-3"
            style={{
              background: `linear-gradient(to bottom, ${exp.color}60, transparent)`,
            }}
          />
        )}
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="flex-1"
      >
        <div
          className="glass rounded-3xl p-6 sm:p-8 transition-all duration-300 group hover:border-accent/40"
          style={{
            border: `1px solid ${exp.color}25`,
            boxShadow: `0 10px 30px rgba(0,0,0,0.3)`,
          }}
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
            <div>
              <h3
                className="font-display font-bold text-2xl sm:text-3xl tracking-tight mb-1 text-white"
              >
                {exp.role}
              </h3>
              <p className="font-body text-base font-medium text-white/90">{exp.company}</p>
              <p className="font-mono text-xs text-white/40 mt-1">{exp.location}</p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
              <span
                className="font-mono text-xs px-3.5 py-1.5 rounded-full font-semibold"
                style={{
                  background: `${exp.color}15`,
                  color: exp.color,
                  border: `1px solid ${exp.color}35`,
                }}
              >
                {exp.period}
              </span>
              {exp.current && (
                <span className="font-mono text-[11px] text-accent flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Active Tenure
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2 mt-4 pt-4 border-t border-white/10">
            {exp.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                  style={{ background: exp.color }}
                />
                <p className="font-body text-xs sm:text-sm leading-relaxed text-white/70">
                  {h}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative w-full py-16 md:py-24" style={{ background: 'var(--bg)' }}>
      {/* Ambient background lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orb bg-orb--5" />
        <div className="bg-orb bg-orb--6" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-10 h-px bg-accent" />
          <span className="font-mono text-xs tracking-widest uppercase text-accent font-semibold">
            05 — Professional Track
          </span>
        </motion.div>

        <div className="mb-12">
          <h2 className="font-display text-4xl sm:text-7xl font-black tracking-tight leading-none text-white mb-3">
            WHERE I'VE <span className="gradient-text">ENGINEERED</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-white/60 max-w-lg">
            A chronological timeline of roles, architectures engineered, and teams scaled.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="mb-12">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.company} exp={exp} index={i} isLast={i === experiences.length - 1} />
          ))}
        </div>

        {/* Academic Foundation & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 sm:p-8 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎓</span>
            <h4 className="font-display text-xl font-bold text-accent tracking-wide uppercase">
              ACADEMIC FOUNDATION & SPECIALIZATIONS
            </h4>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="font-body font-semibold text-base text-white">
                B.Tech in Electronics & Communication Engineering
              </p>
              <p className="font-mono text-xs text-white/60 mt-0.5">
                Mar Athanasius College of Engineering, Kothamangalam, Kerala
              </p>
              <p className="font-mono text-xs text-accent mt-1">2018 — 2022</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {['IPSR — Advanced Web Dev (PHP/Full-Stack)', 'Cyber Prism — Python/Django Architecture'].map((cert) => (
                <span
                  key={cert}
                  className="font-mono text-xs px-3.5 py-2 rounded-full glass text-accent border border-accent/30 flex items-center gap-1.5"
                >
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
