import { useRef } from 'react'
import { motion } from 'framer-motion'
import SnakeGame from '../SnakeGame/SnakeGame'
import useSound from '../../hooks/useSound'

export default function HaveFun() {
  const snakeRef = useRef(null)
  const { playClick, playHover } = useSound()

  const handleDirection = (dir) => {
    playClick()
    if (snakeRef.current) {
      snakeRef.current.changeDirection(dir)
    }
  }

  return (
    <section id="arcade" className="relative w-full py-16 md:py-24 border-t border-white/10" style={{ background: 'var(--bg)' }}>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-10 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-10 h-px bg-accent" />
              <span className="font-mono text-xs tracking-widest uppercase text-accent font-semibold">
                Sector 04 — Interactive Break
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display text-4xl sm:text-7xl font-black tracking-tight leading-none text-white"
            >
              RETRO <span className="gradient-text">ARCADE</span>
            </motion.h2>
            <p className="font-mono text-xs text-white/50 mt-2 uppercase tracking-wider">
              Autonomous Quantum Snake Simulation · Real-time Canvas Rendering
            </p>
          </div>

          {/* Cyberpunk HUD Control Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center glass p-4 rounded-2xl border border-white/10 shadow-lg"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase font-bold mb-3">
              DIRECTIONAL PROTOCOL
            </span>
            <div className="flex flex-col items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleDirection('up')}
                onMouseEnter={playHover}
                className="w-9 h-9 rounded-lg glass border border-white/20 hover:border-accent flex items-center justify-center font-mono font-bold text-xs text-white hover:text-accent active:scale-95 transition-all cursor-pointer select-none shadow-sm"
                aria-label="Move Up"
              >
                W
              </button>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => handleDirection('left')}
                  onMouseEnter={playHover}
                  className="w-9 h-9 rounded-lg glass border border-white/20 hover:border-accent flex items-center justify-center font-mono font-bold text-xs text-white hover:text-accent active:scale-95 transition-all cursor-pointer select-none shadow-sm"
                  aria-label="Move Left"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => handleDirection('down')}
                  onMouseEnter={playHover}
                  className="w-9 h-9 rounded-lg glass border border-white/20 hover:border-accent flex items-center justify-center font-mono font-bold text-xs text-white hover:text-accent active:scale-95 transition-all cursor-pointer select-none shadow-sm"
                  aria-label="Move Down"
                >
                  S
                </button>
                <button
                  type="button"
                  onClick={() => handleDirection('right')}
                  onMouseEnter={playHover}
                  className="w-9 h-9 rounded-lg glass border border-white/20 hover:border-accent flex items-center justify-center font-mono font-bold text-xs text-white hover:text-accent active:scale-95 transition-all cursor-pointer select-none shadow-sm"
                  aria-label="Move Right"
                >
                  D
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Embedded Snake Game Arena */}
        <div
          data-cursor-text="PLAY"
          className="relative w-full rounded-3xl overflow-hidden glass border border-accent/25 shadow-[0_0_50px_rgba(232,255,0,0.08)] p-2"
          style={{ height: 'clamp(340px, 48vh, 480px)' }}
        >
          {/* Top Arcade Header Bar */}
          <div className="absolute top-4 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="font-mono text-[10px] text-accent tracking-widest uppercase bg-black/70 px-2.5 py-1 rounded-full border border-accent/30">
                LIVE ARENA // READY
              </span>
            </div>
            <span className="font-mono text-[10px] text-white/40 uppercase hidden sm:inline-block">
              CLICK OR PRESS W/A/S/D TO STEER
            </span>
          </div>

          <SnakeGame ref={snakeRef} />
        </div>
      </div>
    </section>
  )
}
