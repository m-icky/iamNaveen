import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LetterGlitch from '../ReactBits/LetterGlitch'
import useSound from '../../hooks/useSound'

const socials = [
  { label: 'GitHub',   icon: '⌥', href: 'https://github.com/m-icky' },
  { label: 'LinkedIn', icon: 'in', href: 'https://www.linkedin.com/in/naveen-tm-0149a1229/' },
  { label: 'Email',    icon: '@',  href: 'mailto:naveentmadhu@gmail.com' },
]

export default function Footer() {
  const [time, setTime] = useState('')
  const { playClick, playHover } = useSound()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Display IST time (Asia/Kolkata)
      const istString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setTime(istString)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const scrollToTop = () => {
    playClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="relative overflow-hidden pt-16 pb-6"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 pb-12">
          {/* Brand & Local Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl glass flex items-center justify-center font-display font-bold text-accent">
                N
              </div>
              <span className="font-display text-3xl font-extrabold text-white tracking-tight">
                NAVEEN T M
              </span>
            </div>
            <p className="font-mono text-xs text-white/50 tracking-wider uppercase">
              Creative Frontend Engineer · Digital Architect
            </p>
            {time && (
              <div className="flex items-center gap-2 mt-2 font-mono text-xs text-accent">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>ERNAKULAM, IN: {time} [IST]</span>
              </div>
            )}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-6"
          >
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
              <button
                key={link}
                onClick={() => {
                  playClick()
                  document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
                }}
                onMouseEnter={playHover}
                className="font-mono text-xs tracking-widest uppercase text-white/50 hover:text-accent transition-colors"
              >
                {link}
              </button>
            ))}
          </motion.div>

          {/* Socials & Back to top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                className="w-11 h-11 rounded-xl glass border border-white/10 hover:border-accent/60 flex items-center justify-center font-mono text-sm font-bold text-accent transition-all duration-300 hover:scale-110"
                title={s.label}
              >
                {s.icon}
              </a>
            ))}

            {/* Back to top magnetic pill */}
            <button
              onClick={scrollToTop}
              onMouseEnter={playHover}
              title="Return to top"
              className="px-4 py-2.5 rounded-xl glass border border-white/10 hover:border-accent/60 font-mono text-xs text-white/70 hover:text-accent transition-all duration-300"
            >
              ↑ TOP
            </button>
          </motion.div>
        </div>

        {/* Copyright & Stack Metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between py-6 border-t border-white/10 gap-3 text-center sm:text-left"
        >
          <p className="font-mono text-xs text-white/40">
            © {new Date().getFullYear()} Naveen T M. Crafted with precision.
          </p>
          <p className="font-mono text-xs text-white/40">
            Engineered with{' '}
            <span className="text-accent font-medium">React 18</span> ·{' '}
            <span className="text-cyan-400 font-medium">Three.js</span> ·{' '}
            <span className="text-accent-alt font-medium">Framer Motion</span> ·{' '}
            <span className="text-emerald-400 font-medium">GSAP</span>
          </p>
        </motion.div>

        {/* Letter Glitch Hero Monogram Signature */}
        <div
          className="overflow-hidden pt-4 pb-2 text-center select-none pointer-events-none"
          style={{ opacity: 0.8 }}
        >
          <LetterGlitch
            text="NAVEEN T M"
            speed={16}
            maxIterations={12}
            glitchColor="#E8FF00"
            activeColor="transparent"
            trigger="auto"
            style={{
              fontFamily: 'Syne, Bebas Neue, sans-serif',
              fontSize: 'clamp(50px, 12vw, 170px)',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              WebkitTextStroke: '1px rgba(232, 255, 0, 0.15)',
            }}
          />
        </div>
      </div>
    </footer>
  )
}
