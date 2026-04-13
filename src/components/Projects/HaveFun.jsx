import { useRef } from 'react'
import { motion } from 'framer-motion'
import SnakeGame from '../SnakeGame/SnakeGame'

export default function HaveFun() {
  const snakeRef = useRef(null)

  const handleDirection = (dir) => {
    if (snakeRef.current) {
      snakeRef.current.changeDirection(dir)
    }
  }

  return (
    <section className="relative" style={{ background: 'var(--bg)' }}>
      <div className="relative pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
        {/* Game Header */}
        <div className="flex justify-between items-start mb-6 px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-col w-full mb-10 gap-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display leading-none"
              style={{ fontSize: 'clamp(52px, 8vw, 88px)', color: 'var(--fg)' }}
            >
              Have Some
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display leading-none"
              style={{ fontSize: 'clamp(52px, 8vw, 88px)', color: 'var(--fg)' }}
            >
              <span className="gradient-text">Fun Time</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-2"
            style={{ color: 'var(--muted)' }}
          >
            <p className="font-mono text-xs tracking-widest uppercase mb-2">Controls</p>
            <div className="flex gap-2 mb-1">
              <div className="w-8 h-8 invisible" />
              <button
                type="button"
                onClick={() => handleDirection('up')}
                className="w-8 h-8 rounded border border-white/20 flex items-center justify-center font-mono text-sm hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer select-none"
                aria-label="Move up"
              >W</button>
              <div className="w-8 h-8 invisible" />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleDirection('left')}
                className="w-8 h-8 rounded border border-white/20 flex items-center justify-center font-mono text-sm hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer select-none"
                aria-label="Move left"
              >A</button>
              <button
                type="button"
                onClick={() => handleDirection('down')}
                className="w-8 h-8 rounded border border-white/20 flex items-center justify-center font-mono text-sm hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer select-none"
                aria-label="Move down"
              >S</button>
              <button
                type="button"
                onClick={() => handleDirection('right')}
                className="w-8 h-8 rounded border border-white/20 flex items-center justify-center font-mono text-sm hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer select-none"
                aria-label="Move right"
              >D</button>
            </div>
          </motion.div>
        </div>

        {/* Embedded Snake Game section */}
        <div className="max-w-7xl mx-auto px-8" style={{ height: '50vh' }}>
          <SnakeGame ref={snakeRef} />
        </div>
      </div>
    </section>
  )
}
