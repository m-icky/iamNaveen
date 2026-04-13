import React from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { motion } from 'framer-motion'

export default function GithubChart() {
  return (
    <section className="relative w-full" style={{ background: 'var(--bg)' }}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orb bg-orb--3" />
        <div className="bg-orb bg-orb--4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 flex flex-col items-center justify-center" style={{ minHeight: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center p-8 md:p-12 rounded-3xl overflow-hidden w-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.01), rgba(255,255,255,0.03))',
            border: '1px solid var(--border)',
          }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full mb-10 gap-4">
            <h3 className="font-display leading-none" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--fg)' }}>
              GitHub <span className="gradient-text">Activity</span>
            </h3>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--muted)', border: '1px solid rgba(255,255,255,0.08)' }}>
                @m-icky
              </span>
            </div>
          </div>
          
          <div className="w-full overflow-x-auto flex justify-center custom-scrollbar pb-4" style={{ color: 'var(--fg)' }}>
            <div className="min-w-max">
              <GitHubCalendar 
                username="m-icky" 
                colorScheme="dark"
                blockSize={15}
                blockMargin={5}
                fontSize={14}
                theme={{
                  dark: ['rgba(255,255,255,0.05)', '#0e4429', '#006d32', '#26a641', '#39d353']
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
