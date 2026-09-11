import { useEffect, useRef, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lanyard from '../ReactBits/Lanyard'
import CircularText from '../ReactBits/CircularText'
import TextType from '../ReactBits/TextType'
import useSound from '../../hooks/useSound'

const HeroThreeScene = lazy(() => import('../ThreeScene/ThreeScene').then(m => ({ default: m.default })))

gsap.registerPlugin(ScrollTrigger)

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const item = {
  hidden: { y: 60, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] } },
}

function MagneticBtn({ children, href, onClick, className = '', ...props }) {
  const btnRef = useRef(null)
  const { playHover } = useSound()

  const handleMouseMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(btnRef.current, { x: x * 0.3, y: y * 0.3, duration: 0.35, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  }

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      ref={btnRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
      className={`magnetic-btn ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

export { MagneticBtn }

export default function Hero({ scrollToSection }) {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const { playClick } = useSound()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        if (video.duration) {
          video.currentTime = self.progress * video.duration
        }
      },
    })
    return () => st.kill()
  }, [])

  const scrollToAbout = () => {
    playClick()
    if (scrollToSection) {
      scrollToSection('about')
    } else {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20"
      style={{ background: 'var(--bg)' }}
    >
      {/* Scroll-controlled video backdrop */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
        muted
        playsInline
        preload="auto"
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric Vignette & Radial Light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 35%, rgba(232,255,0,0.06) 0%, transparent 70%), radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, var(--bg) 100%)',
        }}
      />

      {/* 3D WebGL Canvas Backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Suspense fallback={null}>
          <HeroThreeScene />
        </Suspense>
      </div>

      {/* Hero Layout Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Left Column: Editorial Typographic Narrative */}
        <div className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div variants={container} initial="hidden" animate="show" className="w-full">
            {/* Top Status & Year Index */}
            <motion.div variants={item} className="mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-accent/30 shadow-[0_0_20px_rgba(232,255,0,0.15)]">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[11px] tracking-widest uppercase font-semibold text-accent">
                  Available for Commissions 2026
                </span>
              </div>
              <span className="hidden sm:inline-block font-mono text-[11px] tracking-widest text-white/40 uppercase">
                // CREATIVE FRONTEND ENGINEER
              </span>
            </motion.div>

            {/* Massive Oversized Headline */}
            <motion.div variants={item} className="mb-6">
              <h1
                className="font-display font-extrabold tracking-tighter leading-[0.88] select-none text-white"
                style={{
                  fontSize: 'clamp(54px, 10vw, 136px)',
                  letterSpacing: '-0.03em',
                }}
              >
                NAVEEN <br className="hidden sm:inline" />
                <span className="gradient-text font-black">T M</span>
              </h1>
            </motion.div>

            {/* CircularText Badge & Specialization Metadata */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-center gap-6 mb-8 justify-center lg:justify-start"
            >
              <div className="shrink-0">
                <CircularText
                  text="CREATIVE FRONTEND • THREE.JS • "
                  radius={48}
                  fontSize={8.5}
                  duration={16}
                  color="var(--accent)"
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--accent), #b4c600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0A0A0A',
                      fontWeight: 800,
                      fontSize: 16,
                      boxShadow: '0 0 20px rgba(232,255,0,0.5)',
                    }}
                  >
                    ⚛
                  </div>
                </CircularText>
              </div>

              <div className="flex flex-col text-center sm:text-left">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                  Frontend Architecture & Motion Systems
                </p>
                <p className="font-mono text-xs mt-1 text-white/60 tracking-wider">
                  React 18 · ProseMirror · TipTap · Three.js · Tailwind · GSAP
                </p>
                <p className="font-mono text-[10px] mt-1 text-white/35">
                  Currently at RSGP Consulting • Based in Kerala, India
                </p>
              </div>
            </motion.div>

            {/* Subtext description with dynamic TextType */}
            <motion.div variants={item} className="max-w-xl mb-10 text-center lg:text-left">
              <TextType
                text="Architecting Google Docs–style collaborative editors, WebGL 3D physics interfaces, and award-winning digital experiences."
                as="p"
                className="font-body text-base sm:text-lg leading-relaxed text-white/70"
                typingSpeed={26}
                initialDelay={400}
                showCursor={true}
                loop={false}
              />
            </motion.div>

            {/* Magnetic CTA Capsules */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <MagneticBtn
                onClick={scrollToAbout}
                className="px-8 py-4 rounded-full font-mono text-xs tracking-widest uppercase font-bold text-black group overflow-hidden relative shadow-[0_0_30px_rgba(232,255,0,0.3)] hover:shadow-[0_0_45px_rgba(232,255,0,0.5)] transition-shadow duration-300"
                style={{ background: 'var(--accent)' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Journey
                  <span className="transition-transform duration-300 group-hover:translate-y-0.5 group-hover:translate-x-0.5">↓</span>
                </span>
              </MagneticBtn>

              <MagneticBtn
                href="mailto:naveentmadhu@gmail.com"
                className="px-8 py-4 rounded-full font-mono text-xs tracking-widest uppercase font-semibold text-white glass border border-white/15 hover:border-accent/60 transition-all duration-300 group"
              >
                <span className="flex items-center gap-2">
                  Get In Touch
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </MagneticBtn>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: Hanging Interactive Lanyard ID Card */}
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.9, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative hidden md:flex flex-col items-center justify-center shrink-0 z-20 pt-4"
        >
          {/* Wall Bracket Accent */}
          <div
            className="w-16 h-3.5 rounded-sm mb-[-2px] z-30 relative shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
            style={{
              background: 'linear-gradient(180deg, #999, #444)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          />
          {/* Interactive Lanyard Badge */}
          <div data-cursor-text="DRAG">
            <Lanyard />
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Scroll Ticker Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
