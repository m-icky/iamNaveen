import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor from './components/Cursor/Cursor'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Nav from './components/Nav/Nav'
import GithubChart from './components/GithubChart/GithubChart'
import LogoLoop from './components/ReactBits/LogoLoop'
import TerminalModal from './components/Terminal/TerminalModal'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const lenisRef = useRef(null)

  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'g') {
        e.preventDefault()
        setIsTerminalOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setIsTerminalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Cursor />
      <Nav theme={theme} toggleTerminal={() => setIsTerminalOpen((prev) => !prev)} />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        {/* ─── Logo Loop Marquee ─── */}
        <div className="py-10 border-b" style={{ borderColor: 'var(--border)' }}>
          <LogoLoop speed={28} direction="left" size={40} gap={8} />
          <div className="mt-4">
            <LogoLoop speed={22} direction="right" size={40} gap={8} />
          </div>
        </div>
        <Projects />
        <GithubChart />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <TerminalModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </div>
  )
}
