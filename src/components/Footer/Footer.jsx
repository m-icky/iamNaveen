import { motion } from 'framer-motion'
import LetterGlitch from '../ReactBits/LetterGlitch'
import LogoLoop from '../ReactBits/LogoLoop'

const socials = [
  { label: 'GitHub',   icon: '⌥', href: 'https://github.com/naveen-tm' },
  { label: 'LinkedIn', icon: 'in', href: 'https://linkedin.com/in/naveen-tm-0149a1229/' },
  { label: 'Email',    icon: '@',  href: 'mailto:naveentmadhu@gmail.com' },
]

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
    >
      {/* ─── Main footer body ─── */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">

          {/* Logo + glitch name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-1"
          >
            <div className="font-display text-5xl" style={{ color: 'var(--accent)' }}>Naveen</div>
            <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
              Creative Frontend Engineer
            </p>
            <p className="font-mono text-xs mt-1" style={{ color: 'var(--muted)' }}>
              naveentmadhu@gmail.com
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map(link => (
              <button
                key={link}
                onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className="font-mono text-xs tracking-widest uppercase transition-colors"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                {link}
              </button>
            ))}
          </motion.div>

          {/* Social icons */}
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
                className="group flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="glass w-12 h-12 rounded-2xl flex items-center justify-center font-mono text-sm font-bold"
                  style={{ color: 'var(--accent)', border: '1px solid var(--border)' }}
                >
                  {s.icon}
                </motion.div>
                <span className="font-mono text-xs mt-2" style={{ color: 'var(--muted)' }}>{s.label}</span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Copyright row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between mt-10 pt-8 gap-3"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()} Naveen T M. All rights reserved.
          </p>
          <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
            Built with{' '}
            <span style={{ color: 'var(--accent)' }}>React</span> ·{' '}
            <span style={{ color: '#61DAFB' }}>Three.js</span> ·{' '}
            <span style={{ color: '#FF3CAC' }}>Framer Motion</span>
          </p>
        </motion.div>
      </div>

      {/* ─── Letter Glitch hero text at bottom ─── */}
      <div
        className="overflow-hidden pb-6 px-4 text-center select-none pointer-events-none"
        style={{ marginTop: -8 }}
      >
        <LetterGlitch
          text="NAVEEN T M"
          speed={15}
          maxIterations={14}
          glitchColor="#E8FF00"
          activeColor="transparent"
          trigger="auto"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(60px, 13vw, 190px)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            WebkitTextStroke: '1px rgba(232,255,0,0.12)',
          }}
        />
      </div>
    </footer>
  )
}
