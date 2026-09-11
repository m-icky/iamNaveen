import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Resume from '../../Naveen T M CV.pdf'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  }

  const lineVariants = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
  }

  return (
    <section id="about" className="relative w-full py-16 md:py-24" style={{ background: 'var(--bg)' }}>
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orb bg-orb--1" />
        <div className="bg-orb bg-orb--2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-10 h-px bg-accent" />
          <span className="font-mono text-xs tracking-widest uppercase text-accent font-semibold">
            01 — Biography & Discipline
          </span>
        </motion.div>

        <div ref={ref}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {/* Grand Editorial Title in Large Text */}
            <div className="mb-10 sm:mb-14">
              <motion.h2
                variants={lineVariants}
                className="font-display font-black tracking-tight leading-[0.92] text-white select-none"
                style={{ fontSize: 'clamp(28px, 6vw, 96px)' }}
              >
                ENGINEERING <br />
                <span className="gradient-text font-black">HIGH-PERFORMANCE</span> <br />
                <span>INTERFACES.</span>
              </motion.h2>
            </div>

            {/* Editorial Content Below the Title */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              {/* Left Column: Narrative Manifesto & Actions */}
              <div className="lg:col-span-7">
                <motion.p
                  variants={lineVariants}
                  className="font-body text-base sm:text-lg leading-relaxed text-white/85 mb-5"
                >
                  I am a Creative Frontend Engineer with 3+ years of battle-tested experience building complex, mission-critical web applications. My sweet spot lies at the junction of <span className="text-accent font-medium">collaborative document systems</span>, <span className="text-white font-medium">real-time UI state</span>, and <span className="text-white font-medium">cinematic WebGL motion design</span>.
                </motion.p>

                <motion.p
                  variants={lineVariants}
                  className="font-body text-sm sm:text-base leading-relaxed text-white/65 mb-8"
                >
                  Currently at <strong className="text-white font-semibold">RSGP Consulting</strong>, where I spearheaded the frontend architecture of a full Google Docs–style collaborative editor utilizing React, ProseMirror, and TipTap — delivering zero-latency multi-user sync, tracked revisions, and high-fidelity XML conversion.
                </motion.p>

                {/* Actions & Meta Badges */}
                <motion.div variants={lineVariants} className="flex items-center gap-4 flex-wrap">
                  <a
                    href={Resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3.5 rounded-full font-mono text-xs tracking-wider uppercase font-semibold text-black transition-transform hover:scale-105 shadow-[0_0_25px_rgba(232,255,0,0.35)]"
                    style={{ background: 'var(--accent)' }}
                  >
                    Download Curriculum Vitae ↓
                  </a>
                  <div className="flex gap-2">
                    {['Ernakulam', 'Kerala, IN'].map((tag) => (
                      <span
                        key={tag}
                        className="glass px-4 py-2.5 rounded-full font-mono text-xs text-white/60 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Key Competencies & Engineering Pillars */}
              <div className="lg:col-span-5">
                <motion.div variants={lineVariants} className="space-y-3.5">
                  <div className="p-4 rounded-2xl glass border border-white/10 hover:border-accent/40 transition-colors">
                    <div className="font-mono text-[10px] text-accent uppercase tracking-wider mb-1 font-semibold">
                      Architecture // 01
                    </div>
                    <div className="font-display text-base sm:text-lg text-white font-bold">
                      Collaborative Editors
                    </div>
                    <div className="font-mono text-xs text-white/50 mt-1">
                      ProseMirror · TipTap v2 · Tracked Changes · XML Schema
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl glass border border-white/10 hover:border-accent/40 transition-colors">
                    <div className="font-mono text-[10px] text-accent uppercase tracking-wider mb-1 font-semibold">
                      Experience // 02
                    </div>
                    <div className="font-display text-base sm:text-lg text-white font-bold">
                      Interactive 3D Web
                    </div>
                    <div className="font-mono text-xs text-white/50 mt-1">
                      Three.js · R3F · GLSL Custom Shaders · Physics Motion
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl glass border border-white/10 hover:border-accent/40 transition-colors">
                    <div className="font-mono text-[10px] text-accent uppercase tracking-wider mb-1 font-semibold">
                      Telemetry // 03
                    </div>
                    <div className="font-display text-base sm:text-lg text-white font-bold">
                      Real-Time State & Sync
                    </div>
                    <div className="font-mono text-xs text-white/50 mt-1">
                      WebRTC DataChannels · Conflict-Free State · Sub-ms Rendering
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
