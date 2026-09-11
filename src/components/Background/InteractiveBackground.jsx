import { useEffect, useRef, useState } from 'react'

export default function InteractiveBackground() {
  const canvasRef = useRef(null)
  const spotlightRef = useRef(null)
  const mousePos = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 })
  const [mounted, setMounted] = useState(false)

  // Track mouse coordinates globally with smooth lerp
  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e) => {
      mousePos.current.targetX = e.clientX
      mousePos.current.targetY = e.clientY
    }

    const handleMouseLeave = () => {
      mousePos.current.targetX = -1000
      mousePos.current.targetY = -1000
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Interactive Particle Canvas Network
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Particle Palette
    const colors = [
      { r: 232, g: 255, b: 0 },   // Accent Lime
      { r: 0,   g: 229, b: 255 }, // Cyan
      { r: 255, g: 60,  b: 172 }, // Magenta
      { r: 168, g: 85,  b: 247 }, // Purple
      { r: 255, g: 255, b: 255 }, // Stardust White
    ]

    // Create particles based on screen area
    const particleCount = Math.min(Math.max(Math.floor((width * height) / 18000), 45), 90)
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)]
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseRadius: Math.random() * 1.6 + 0.8,
        radius: Math.random() * 1.6 + 0.8,
        color,
        alpha: Math.random() * 0.4 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    const mouseRadius = 140
    let lastTime = performance.now()

    const render = (now) => {
      animId = requestAnimationFrame(render)

      // Throttle delta for smooth physics
      const dt = Math.min((now - lastTime) / 16.667, 2)
      lastTime = now

      // Smooth lerp mouse coordinates
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.12
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.12

      // Update spotlight position via direct style for 60fps
      if (spotlightRef.current && mousePos.current.x > 0) {
        spotlightRef.current.style.transform = `translate3d(${mousePos.current.x - 300}px, ${mousePos.current.y - 300}px, 0)`
        spotlightRef.current.style.opacity = '1'
      } else if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0'
      }

      ctx.clearRect(0, 0, width, height)

      const mx = mousePos.current.x
      const my = mousePos.current.y

      // 1. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Drift
        p.x += p.vx * dt
        p.y += p.vy * dt

        // Wrap around viewport edges
        if (p.x < -10) p.x = width + 10
        else if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        else if (p.y > height + 10) p.y = -10

        // Gentle breathing pulse
        p.pulsePhase += p.pulseSpeed * dt
        const currentAlpha = p.alpha + Math.sin(p.pulsePhase) * 0.12

        // Mouse interaction: Gentle repulsion & spring return
        let currentRadius = p.baseRadius
        if (mx > 0 && my > 0) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseRadius) {
            const force = (1 - dist / mouseRadius) * 2.4
            const angle = Math.atan2(dy, dx)
            p.x += Math.cos(angle) * force * dt
            p.y += Math.sin(angle) * force * dt
            currentRadius = p.baseRadius * (1 + (1 - dist / mouseRadius) * 0.8)

            // Connect nearby particle to mouse with subtle thread
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mx, my)
            ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${(1 - dist / mouseRadius) * 0.18})`
            ctx.lineWidth = 0.75
            ctx.stroke()
          }
        }

        // Draw particle halo
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.max(currentAlpha, 0.1)})`
        ctx.shadowColor = `rgb(${p.color.r}, ${p.color.g}, ${p.color.b})`
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0 // reset

        // 2. Connect nearby particles to form constellation
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 85) {
            const lineAlpha = (1 - dist / 85) * 0.08
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 0 }}
    >
      {/* ─── Layer 1: Ambient Living Aurora Mesh Gradients ─── */}
      <div className="absolute inset-0 bg-[#080808]">
        {/* Top-Left Electric Lime Aurora */}
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(232,255,0,0.4) 0%, rgba(232,255,0,0) 70%)',
            animationDuration: '8s',
          }}
        />

        {/* Right Cyber Cyan Glow */}
        <div
          className="absolute top-1/4 -right-48 w-[700px] h-[700px] rounded-full blur-[160px] opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(0,229,255,0.4) 0%, rgba(0,229,255,0) 70%)',
            animation: 'auraFloat 14s ease-in-out infinite alternate',
          }}
        />

        {/* Center-Left Deep Violet/Magenta Nebula */}
        <div
          className="absolute top-2/3 -left-48 w-[650px] h-[650px] rounded-full blur-[150px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,60,172,0.35) 0%, rgba(139,92,246,0.2) 50%, transparent 70%)',
            animation: 'auraFloatReverse 16s ease-in-out infinite alternate',
          }}
        />

        {/* Bottom-Right Golden Lime Glow */}
        <div
          className="absolute -bottom-48 right-1/4 w-[750px] h-[750px] rounded-full blur-[160px] opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(232,255,0,0.3) 0%, rgba(0,229,255,0.15) 50%, transparent 70%)',
            animation: 'auraFloat 12s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* ─── Layer 2: Interactive Cursor Spotlight Torch ─── */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none transition-opacity duration-300 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(232,255,0,0.06) 0%, rgba(0,229,255,0.03) 35%, transparent 70%)',
          filter: 'blur(30px)',
          opacity: 0,
        }}
      />

      {/* ─── Layer 3: Subtle Noise Texture for Analog Depth ─── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ─── Layer 4: Interactive Canvas Particle Network ─── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  )
}
