import React from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { motion } from 'framer-motion'

export default function GithubChart() {
  return (
    <section id="github" className="relative w-full py-16 md:py-24 border-t border-white/10" style={{ background: 'var(--bg)' }}>
      {/* Ambient background lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orb bg-orb--3" />
        <div className="bg-orb bg-orb--4" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-10 h-px bg-accent" />
          <span className="font-mono text-xs tracking-widest uppercase text-accent font-semibold">
            06 — Open Source & Code Telemetry
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-6xl font-black tracking-tight leading-none text-white">
              LIVE CODE <span className="gradient-text">RADAR</span>
            </h2>
            <p className="font-mono text-xs text-white/50 mt-2 uppercase tracking-wider">
              Continuous deployment telemetry and daily GitHub commit frequency
            </p>
          </div>

          {/* Quick Telemetry Indicators */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="px-3.5 py-1.5 rounded-full glass border border-accent/40 font-mono text-[11px] text-accent flex items-center gap-2 shadow-[0_0_15px_rgba(232,255,0,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span>300+ Commits</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full glass border border-white/10 font-mono text-[11px] text-white/70 flex items-center gap-2">
              <span>⚡ 12+ Repos</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full glass border border-white/10 font-mono text-[11px] text-white/70 flex items-center gap-2">
              <span>✓ 100% CI Sync</span>
            </div>
          </div>
        </div>

        {/* macOS Terminal Window Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl w-full relative overflow-hidden"
        >
          {/* Terminal Window Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-xs text-white/50 pl-2">
                bash — github-metrics.sh — 80x24
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <a
                href="https://github.com/m-icky"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs px-3 py-1 rounded-full glass border border-white/10 text-accent hover:underline flex items-center gap-1.5"
              >
                <span>github.com/m-icky</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* GitHub Calendar Container */}
          <div className="w-full overflow-x-auto flex justify-center py-4 text-white custom-scrollbar">
            <div className="min-w-max p-4 sm:p-6 rounded-2xl bg-black/60 border border-white/5 shadow-inner">
              <GitHubCalendar
                username="m-icky"
                colorScheme="dark"
                blockSize={14}
                blockMargin={4}
                fontSize={13}
                theme={{
                  dark: ['rgba(255,255,255,0.05)', '#0e4429', '#006d32', '#26a641', '#39d353'],
                }}
              />
            </div>
          </div>

          {/* Bottom Telemetry Footer */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span>● LIVE GITHUB API SYNC</span>
            <span>DATA SOURCE: @m-icky</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
