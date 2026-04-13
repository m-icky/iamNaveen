import { useEffect, useRef, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lanyard from '../ReactBits/Lanyard'
import CircularText from '../ReactBits/CircularText'
import TextType from '../ReactBits/TextType'

const HeroThreeScene = lazy(() => import('../ThreeScene/ThreeScene').then(m => ({ default: m.default })))

gsap.registerPlugin(ScrollTrigger)

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const item = {
  hidden: { y: 80, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.23, 1, 0.32, 1] } },
}

function MagneticBtn({ children, href, onClick, className = '' }) {
  const btnRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(btnRef.current, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' })
  }

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      ref={btnRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-btn ${className}`}
    >
      {children}
    </Tag>
  )
}

export { MagneticBtn }

export default function Hero() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom+=2000 top',
      scrub: 1,
      onUpdate: (self) => {
        if (video.duration && isFinite(video.duration)) {
          video.currentTime = video.duration * self.progress
        }
      },
    })
    return () => st.kill()
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg)' }}
      id="home"
    >
      {/* Scroll-controlled video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        muted playsInline preload="auto"
        style={{ willChange: 'auto' }}
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, var(--bg) 100%)' }}
      />

      {/* Three.js */}
      <div className="absolute inset-0 pointer-events-none">
        <Suspense fallback={null}>
          <HeroThreeScene />
        </Suspense>
      </div>

      {/* Main layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 pt-24 pb-32">

        {/* Left: Text content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Badge */}
            <motion.div variants={item} className="mb-8 inline-flex items-center gap-2">
              <span
                className="glass rounded-full px-4 py-2 font-mono text-xs tracking-widest uppercase"
                style={{ color: 'var(--accent)', border: '1px solid var(--accent)' }}
              >
                Available for work
              </span>
            </motion.div>

            {/* Headlines */}
            <motion.h1
              variants={item}
              className="font-display leading-none mb-4 select-none gradient-text"
              style={{ fontSize: 'clamp(64px, 11vw, 150px)', letterSpacing: '-0.02em' }}
            >
              Naveen T M
            </motion.h1>

            {/* CircularText badge row */}
            <motion.div
              variants={item}
              className="flex items-center gap-5 mb-6 justify-center lg:justify-start"
            >
              <CircularText
                text="Creative Frontend Engineer • "
                radius={50}
                fontSize={9}
                duration={14}
                color="var(--accent)"
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16,
                }}>
                  ⚛
                </div>
              </CircularText>

              <div>
                <p
                  className="font-mono text-sm tracking-widest uppercase"
                  style={{ color: 'var(--accent)', letterSpacing: '0.18em' }}
                >
                  Frontend Engineer
                </p>
                <p className="font-mono text-xs mt-1" style={{ color: 'var(--muted)' }}>
                  React · HTML 5 · CSS 3 · Tailwind CSS · Three.js · GSAP · Framer
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={item}
              className="max-w-md mb-10"
            >
              <TextType
                text="Building interactive web experiences using React, Tailwind CSS and modern animation systems."
                as="p"
                className="leading-relaxed"
                style={{ color: 'var(--muted)', fontSize: '1rem' }}
                typingSpeed={30}
                initialDelay={600}
                showCursor={true}
                loop={false}
              />
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <MagneticBtn
                onClick={scrollToAbout}
                className="px-8 py-4 rounded-full font-mono text-sm tracking-wider uppercase"
                style={{ background: 'var(--accent)', color: '#0A0A0A', fontWeight: 600 }}
              >
                View Work
              </MagneticBtn>
              <MagneticBtn
                href="mailto:naveentmadhu@gmail.com"
                className="px-8 py-4 rounded-full font-mono text-sm tracking-wider uppercase glass"
                style={{ color: 'var(--fg)', border: '1px solid var(--border)' }}
              >
                Get In Touch
              </MagneticBtn>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Lanyard ID card — hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, x: 60, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1.0, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="absolute top-5 right-0 lg:right-24 hidden md:flex flex-col items-center z-40"
        >
          {/* Wall clip/mount */}
          <div style={{
            width: 60, height: 14, borderRadius: 4,
            background: 'linear-gradient(135deg, #888, #555)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
            marginBottom: -1,
            zIndex: 2,
            position: 'relative',
          }} />
          <Lanyard />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--muted)' }}
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
