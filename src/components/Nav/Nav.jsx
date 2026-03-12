import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSound from '../../hooks/useSound'

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Nav({ toggleTerminal }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { playClick, playHover } = useSound()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    playClick()
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="font-display text-2xl tracking-wider text-accent">Naveen</div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              onMouseEnter={playHover}
              className="font-mono text-xs tracking-widest uppercase magnetic-btn opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: 'var(--fg)' }}
            >
              {link}
            </button>
          ))}
          <a
            href="mailto:naveentmadhu@gmail.com"
            onClick={playClick}
            onMouseEnter={playHover}
            className="glass magnetic-btn px-4 py-2 rounded-full font-mono text-xs tracking-widest uppercase"
            style={{ color: 'var(--accent)', border: '1px solid var(--accent)' }}
          >
            Hire Me
          </a>
          <button 
            onClick={() => {
              playClick()
              toggleTerminal()
            }}
            onMouseEnter={playHover}
            className="font-mono text-[10px] opacity-30 mt-1 uppercase tracking-tighter hover:opacity-100 transition-opacity cursor-pointer"
          >
            Terminal: Ctrl + G
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => {
            playClick()
            setOpen(!open)
          }}
        >
          <span className="block w-6 h-px" style={{ background: 'var(--fg)', transition: 'all 0.3s', transform: open ? 'translateY(6px) rotate(45deg)' : '' }} />
          <span className="block w-6 h-px" style={{ background: 'var(--fg)', opacity: open ? 0 : 1, transition: 'all 0.3s' }} />
          <span className="block w-6 h-px" style={{ background: 'var(--fg)', transition: 'all 0.3s', transform: open ? 'translateY(-6px) rotate(-45deg)' : '' }} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: 'var(--bg)' }}
          >
            {links.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(link)}
                className="font-display text-6xl text-accent"
              >
                {link}
              </motion.button>
            ))}
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.5 }}
              onClick={() => {
                playClick()
                toggleTerminal()
                setOpen(false)
              }}
              className="mt-8 font-mono text-xs uppercase tracking-[0.3em] cursor-pointer"
            >
              Ctrl + G — Terminal
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
