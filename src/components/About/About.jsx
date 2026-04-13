import { useRef, Suspense, lazy } from 'react'
import { motion, useInView } from 'framer-motion'
import Resume from '../../Naveen T M CV.pdf'

const AboutThreeScene = lazy(() => import('../ThreeScene/ThreeScene').then(m => ({ default: m.AboutThreeScene })))

const words = ['React', 'Three.js', 'Framer', 'Motion', 'UI', 'Systems', 'Design', 'Code']

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  }

  const lineVariants = {
    hidden: { y: '100%', opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] } },
  }

  return (
    <section id="about" className="section-pad relative" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-20"
        >
          <div style={{ width: 40, height: 1, background: 'var(--accent)' }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            01 — About
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Text */}
          <div ref={ref}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              <div className="overflow-hidden mb-4">
                <motion.h2
                  variants={lineVariants}
                  className="font-display leading-none"
                  style={{ fontSize: 'clamp(48px, 7vw, 100px)', color: 'var(--fg)' }}
                >
                  CRAFTING
                </motion.h2>
              </div>
              <div className="overflow-hidden mb-4">
                <motion.h2
                  variants={lineVariants}
                  className="font-display leading-none gradient-text"
                  style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}
                >
                  DIGITAL
                </motion.h2>
              </div>
              <div className="overflow-hidden mb-12">
                <motion.h2
                  variants={lineVariants}
                  className="font-display leading-none"
                  style={{ fontSize: 'clamp(48px, 7vw, 100px)', color: 'var(--fg)' }}
                >
                  EXPERIENCES
                </motion.h2>
              </div>

              <motion.p
                variants={lineVariants}
                className="text-lg leading-relaxed mb-6"
                style={{ color: 'var(--muted)', maxWidth: 480 }}
              >
                Frontend Engineer with 3+ years of experience building complex web applications.
                Specialized in collaborative document editors, real-time UI systems, and
                cinematic digital experiences.
              </motion.p>

              <motion.p
                variants={lineVariants}
                className="leading-relaxed mb-10"
                style={{ color: 'var(--muted)', maxWidth: 480 }}
              >
                Currently at RSGP Consulting, where I led the full frontend engineering of a
                Google Docs–style editor using React, ProseMirror and TipTap — with real-time
                collaboration, tracked changes, and structured XML export.
              </motion.p>

              <motion.div variants={lineVariants} className="flex items-center gap-4">
                <a
                  href={Resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-6 py-3 rounded-full font-mono text-sm tracking-wider uppercase"
                  style={{ color: 'var(--accent)', border: '1px solid var(--accent)' }}
                >
                  View CV
                </a>
                <div className="flex gap-3">
                  {['Ernakulam', 'Kerala'].map(tag => (
                    <span key={tag} className="glass px-3 py-1.5 rounded-full font-mono text-xs" style={{ color: 'var(--muted)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
            style={{ height: 480 }}
          >
            {/* Glow backdrop */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(232,255,0,0.08) 0%, transparent 70%)',
              }}
            />
            <div className="glass rounded-3xl w-full h-full overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div style={{ width: 40, height: 40, border: '2px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                </div>
              }>
                <AboutThreeScene />
              </Suspense>
            </div>

            {/* Floating stats */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 glass rounded-2xl p-4"
              style={{ border: '1px solid var(--border)' }}
            >
              <div className="font-display text-3xl" style={{ color: 'var(--accent)' }}>3+</div>
              <div className="font-mono text-xs" style={{ color: 'var(--muted)' }}>Years Exp.</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 glass rounded-2xl p-4"
              style={{ border: '1px solid var(--border)' }}
            >
              <div className="font-display text-3xl" style={{ color: 'var(--accent)' }}>25+</div>
              <div className="font-mono text-xs" style={{ color: 'var(--muted)' }}>Projects</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
