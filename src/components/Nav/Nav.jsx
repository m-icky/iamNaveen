import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSound from '../../hooks/useSound'

const links = [
  { name: 'Home',       id: 'home',       num: '01' },
  { name: 'About',      id: 'about',      num: '02' },
  { name: 'Skills',     id: 'skills',     num: '03' },
  { name: 'Works',      id: 'projects',   num: '04' },
  { name: 'Experience', id: 'experience', num: '05' },
  { name: 'Contact',    id: 'contact',    num: '06' },
]

export default function Nav({ toggleTerminal, scrollToSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { playClick, playHover } = useSound()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
      const scrollPos = window.scrollY + window.innerHeight * 0.35

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          const elemTop = rect.top + window.scrollY
          if (scrollPos >= elemTop) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (id) => {
    playClick()
    setActiveSection(id)
    if (scrollToSection) {
      scrollToSection(id)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 transition-all duration-500 ${
          scrolled
            ? 'py-3 sm:py-3.5 bg-[#0a0a0a]/75 backdrop-blur-2xl border-b border-white/10 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)]'
            : 'py-4 sm:py-5 bg-[#0a0a0a]/40 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
        }`}
        style={{
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(16px)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Monogram */}
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-auto cursor-pointer group flex items-center gap-3"
            onClick={() => handleNav('home')}
            onMouseEnter={playHover}
          >
            <div className="w-9 h-9 rounded-xl glass flex items-center justify-center border border-white/15 group-hover:border-accent/60 transition-all duration-300 shadow-sm group-hover:shadow-[0_0_20px_rgba(232,255,0,0.3)] backdrop-blur-md">
              <span className="font-display font-bold text-accent text-sm tracking-tighter">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm tracking-wider font-bold text-white group-hover:text-accent transition-colors">
                NAVEEN T M
              </span>
              <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
                Creative Dev ©26
              </span>
            </div>
          </motion.div>

          {/* Desktop Floating Pill Navigation */}
          <motion.nav
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full pointer-events-auto transition-all duration-500 ${
              scrolled
                ? 'bg-white/[0.05] backdrop-blur-2xl border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_24px_rgba(0,0,0,0.4)]'
                : 'bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-sm'
            }`}
          >
            {links.map((link) => {
              const isActive = activeSection === link.id
              return (
                <button
                  key={link.name}
                  onClick={() => handleNav(link.id)}
                  onMouseEnter={playHover}
                  className={`relative px-4 py-2 rounded-full font-mono text-[11px] tracking-widest uppercase transition-all duration-300 select-none ${
                    isActive ? 'text-black font-semibold' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full bg-accent -z-10 shadow-[0_0_20px_rgba(232,255,0,0.4)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </button>
              )
            })}
          </motion.nav>

          {/* Right Action Cluster */}
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-3 pointer-events-auto"
          >
            {/* Terminal Shortcut Button */}
            <button
              onClick={() => {
                playClick()
                toggleTerminal()
              }}
              onMouseEnter={playHover}
              title="Toggle interactive terminal (Ctrl + G)"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full glass border border-white/15 hover:border-accent/50 text-white/60 hover:text-white transition-all font-mono text-[10px] uppercase tracking-wider group backdrop-blur-md shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>TERMINAL</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70 text-[9px] font-mono group-hover:text-accent">
                Ctrl+G
              </kbd>
            </button>

            {/* Hire Me CTA */}
            <a
              href="mailto:naveentmadhu@gmail.com"
              onClick={playClick}
              onMouseEnter={playHover}
              className="relative px-5 py-2.5 rounded-full font-mono text-[11px] tracking-widest uppercase font-semibold overflow-hidden group transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--accent), #d0e800)',
                color: '#0A0A0A',
                boxShadow: '0 0 25px rgba(232,255,0,0.25)',
              }}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Let's Talk
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className="lg:hidden w-11 h-11 rounded-full glass border border-white/15 flex flex-col items-center justify-center gap-1.5 group hover:border-accent/50 transition-colors backdrop-blur-md shadow-sm"
              onClick={() => {
                playClick()
                setOpen(!open)
              }}
              aria-label="Toggle navigation menu"
            >
              <span
                className="w-5 h-0.5 bg-white transition-transform duration-300 origin-center"
                style={{
                  transform: open ? 'translateY(4px) rotate(45deg)' : 'none',
                  backgroundColor: open ? 'var(--accent)' : 'currentColor',
                }}
              />
              <span
                className="w-5 h-0.5 bg-white transition-transform duration-300 origin-center"
                style={{
                  transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none',
                  backgroundColor: open ? 'var(--accent)' : 'currentColor',
                }}
              />
            </button>
          </motion.div>
        </div>
      </header>

      {/* Fullscreen Mobile Editorial Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 bg-neutral-950 flex flex-col justify-between p-8 sm:p-12 overflow-y-auto"
          >
            {/* Top Bar inside mobile menu */}
            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-xs tracking-widest text-accent uppercase">
                // NAVIGATION INDEX
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-white/50">AVAILABLE 2026</span>
              </div>
            </div>

            {/* Nav Links */}
            <div className="my-auto flex flex-col gap-4 py-8">
              {links.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6 }}
                  onClick={() => handleNav(link.id)}
                  className="flex items-baseline gap-4 group text-left w-full py-1 border-b border-white/5"
                >
                  <span className="font-mono text-xs text-accent/60 group-hover:text-accent transition-colors">
                    {link.num}
                  </span>
                  <span className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white group-hover:text-accent group-hover:translate-x-3 transition-all duration-300">
                    {link.name}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Bottom Info & Terminal in mobile menu */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    playClick()
                    toggleTerminal()
                    setOpen(false)
                  }}
                  className="px-4 py-2 rounded-full glass border border-accent/30 font-mono text-xs text-accent uppercase tracking-wider"
                >
                  Open Terminal (Ctrl + G)
                </button>
              </div>

              <div className="flex items-center gap-6 font-mono text-xs text-white/40">
                <a
                  href="https://github.com/m-icky"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/naveen-tm-0149a1229/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:naveentmadhu@gmail.com"
                  className="text-accent hover:underline"
                >
                  naveentmadhu@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
