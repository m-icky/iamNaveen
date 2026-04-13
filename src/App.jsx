import { useState, useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor from './components/Cursor/Cursor'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import SelectedWorks from './components/Projects/SelectedWorks'
import HaveFun from './components/Projects/HaveFun'
import GithubChart from './components/GithubChart/GithubChart'
import Experience from './components/Experience/Experience'
import Contact from './components/Contact/Contact'
import Nav from './components/Nav/Nav'
import TerminalModal from './components/Terminal/TerminalModal'
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
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Horizontal section refs
  const hSection1Ref = useRef(null) // About → Skills
  const hTrack1Ref = useRef(null)
  const hSection2Ref = useRef(null) // GitHub → Experience
  const hTrack2Ref = useRef(null)

  // Store ScrollTrigger instances for navigation
  const st1Ref = useRef(null) // ScrollTrigger for horizontal section 1
  const st2Ref = useRef(null) // ScrollTrigger for horizontal section 2

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

  // Lenis smooth scroll
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

  // GSAP Horizontal scroll triggers
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Horizontal Section 1: About → Tech Stack (scroll RIGHT) ───
      if (hTrack1Ref.current && hSection1Ref.current) {
        const tween = gsap.to(hTrack1Ref.current, {
          x: () => -(hTrack1Ref.current.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: hSection1Ref.current,
            pin: true,
            scrub: 1,
            end: () => '+=' + (hTrack1Ref.current.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
          },
        })
        st1Ref.current = tween.scrollTrigger
      }

      // ─── Horizontal Section 2: GitHub Activity → Experience (scroll LEFT) ───
      if (hTrack2Ref.current && hSection2Ref.current) {
        const distance = hTrack2Ref.current.scrollWidth - window.innerWidth
        const tween = gsap.fromTo(
          hTrack2Ref.current,
          { x: -distance },
          {
            x: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: hSection2Ref.current,
              pin: true,
              scrub: 1,
              end: () => '+=' + distance,
              invalidateOnRefresh: true,
            },
          }
        )
        st2Ref.current = tween.scrollTrigger
      }
    })

    return () => ctx.revert()
  }, [])

  /**
   * Navigation function that handles both normal sections and
   * sections inside GSAP-pinned horizontal scroll containers.
   *
   * Layout:
   *   Hero
   *   [Horizontal Section 1: About (start) → Skills (end)]
   *   SelectedWorks
   *   HaveFun
   *   [Horizontal Section 2: GitHub (start) → Experience (end)]
   *   Contact
   */
  const scrollToSection = useCallback((sectionId) => {
    const lenis = lenisRef.current
    if (!lenis) return

    switch (sectionId) {
      case 'home': {
        lenis.scrollTo(0, { duration: 1.4 })
        break
      }
      case 'about': {
        // About is the first panel in horizontal section 1
        // Scroll to the START of the horizontal pin
        const st = st1Ref.current
        if (st) {
          lenis.scrollTo(st.start, { duration: 1.4 })
        } else {
          const el = document.getElementById('about')
          if (el) lenis.scrollTo(el, { duration: 1.4 })
        }
        break
      }
      case 'skills': {
        // Skills is the second panel in horizontal section 1
        // Scroll to the END of the horizontal pin (fully scrolled right)
        const st = st1Ref.current
        if (st) {
          lenis.scrollTo(st.end, { duration: 1.4 })
        } else {
          const el = document.getElementById('skills')
          if (el) lenis.scrollTo(el, { duration: 1.4 })
        }
        break
      }
      case 'experience': {
        // Experience is the first panel (left) in horizontal section 2
        // Section 2 starts showing GitHub (right), scrolling reveals Experience (left)
        // So Experience is fully visible at the END of the pin
        const st = st2Ref.current
        if (st) {
          lenis.scrollTo(st.end, { duration: 1.4 })
        } else {
          const el = document.getElementById('experience')
          if (el) lenis.scrollTo(el, { duration: 1.4 })
        }
        break
      }
      default: {
        // Normal sections: projects, contact
        const el = document.getElementById(sectionId)
        if (el) lenis.scrollTo(el, { duration: 1.4 })
        break
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Cursor />
      <Nav
        theme={theme}
        toggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        scrollToSection={scrollToSection}
      />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <main>
        {/* ─── 1. Hero ─── */}
        <Hero />

        {/* ─── 2-3. Horizontal: About → Tech Stack (scroll RIGHT) ─── */}
        <div ref={hSection1Ref} className="horizontal-section">
          <div ref={hTrack1Ref} className="horizontal-track">
            <div className="horizontal-panel">
              <About />
            </div>
            <div className="horizontal-panel">
              <Skills />
            </div>
          </div>
          {/* Direction hint */}
          <div className="direction-hint visible">
            <span className="direction-hint__label">Scroll to explore →</span>
            <span className="direction-hint__arrow">→</span>
          </div>
        </div>

        {/* ─── 4. Selected Works ─── */}
        <SelectedWorks />

        {/* ─── 5. Have Fun (Snake Game) ─── */}
        <HaveFun />

        {/* ─── 6-7. Horizontal: GitHub → Experience (scroll LEFT) ─── */}
        <div ref={hSection2Ref} className="horizontal-section">
          <div ref={hTrack2Ref} className="horizontal-track">
            <div className="horizontal-panel horizontal-panel--scrollable">
              <Experience />
            </div>
            <div className="horizontal-panel">
              <GithubChart />
            </div>
          </div>
          {/* Direction hint */}
          <div className="direction-hint direction-hint--left visible">
            <span className="direction-hint__arrow">←</span>
            <span className="direction-hint__label">← Scroll to explore</span>
          </div>
        </div>

        {/* ─── 8. Contact + Footer ─── */}
        <Contact onSendSuccess={() => setShowConfetti(true)} />
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
