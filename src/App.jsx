import { useState, useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor from './components/Cursor/Cursor'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import WhatsAppButton from './components/WhatsApp/WhatsAppButton'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import TechOrbit from './components/TechOrbit/TechOrbit'
import Skills from './components/Skills/Skills'
import SelectedWorks from './components/Projects/SelectedWorks'
import HaveFun from './components/Projects/HaveFun'
import GithubChart from './components/GithubChart/GithubChart'
import Experience from './components/Experience/Experience'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Nav from './components/Nav/Nav'
import TerminalModal from './components/Terminal/TerminalModal'
import InteractiveBackground from './components/Background/InteractiveBackground'
import useSound from './hooks/useSound'
import Confetti from 'react-confetti'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const lenisRef = useRef(null)
  
  const { playRandomClick } = useSound()

  // Global click listener for random sounds
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Don't play if clicking on specific buttons that already have sounds,
      // or if we just want it everywhere, we can just play it.
      // The user requested "random sound effect on each mouse click on any where"
      playRandomClick()
    }
    window.addEventListener('click', handleGlobalClick)
    return () => window.removeEventListener('click', handleGlobalClick)
  }, [playRandomClick])

  // Window size for confetti
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  // Lenis smooth scroll engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    // Ensure ScrollTrigger measures accurate heights after initial render
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 400)

    return () => {
      clearTimeout(refreshTimer)
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
    }
  }, [])

  /**
   * Smooth navigation handler utilizing Lenis across all sections.
   */
  const scrollToSection = useCallback((sectionId) => {
    const lenis = lenisRef.current

    if (sectionId === 'home') {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    const target = document.getElementById(sectionId)
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.2, offset: 0 })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <InteractiveBackground />
      <Cursor />
      <Nav
        theme={theme}
        toggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        scrollToSection={scrollToSection}
      />
      <ScrollToTop lenisRef={lenisRef} />
      <WhatsAppButton />
      <main>
        {/* ─── 00. Hero ─── */}
        <Hero scrollToSection={scrollToSection} />

        {/* ─── 01. Biography & Manifesto ─── */}
        <About />

        {/* ─── 02. Interactive Tech Orbit Ecosystem ─── */}
        <TechOrbit />

        {/* ─── 03. Technological Arsenal (Clean Grid View) ─── */}
        <Skills />

        {/* ─── 03. Selected Portfolio Case Studies (Pinned Horizontal Showcase) ─── */}
        <SelectedWorks />

        {/* ─── 04. Retro Arcade Snake Game ─── */}
        <HaveFun />

        {/* ─── 05. Professional Track & Academic Foundation ─── */}
        <Experience />

        {/* ─── 06. Open Source & GitHub Telemetry ─── */}
        <GithubChart />

        {/* ─── 07. Contact & Transmission ─── */}
        <Contact onSendSuccess={() => setShowConfetti(true)} />

        {/* ─── 08. Standalone Agency Footer ─── */}
        <Footer />
      </main>
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }}
        />
      )}
    </div>
  )
}
