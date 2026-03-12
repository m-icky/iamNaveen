import { useEffect, useRef, useCallback } from 'react'

const GRID = 16          // cell size in px
const TICK_MS = 110      // snake speed (ms per move)
const PARTICLE_COUNT = 5
const PARTICLE_RADIUS = 3
const GLOW_RADIUS = 12
const INITIAL_LENGTH = 5

// Blended gradient colors for the snake body
const SNAKE_COLORS = [
  '#E8FF00', '#D4FF2A', '#BFFF55', '#AAFF80',
  '#80FFAA', '#55FFD4', '#2AFFEA', '#00E5FF',
  '#2AC9FF', '#55ADFF', '#8091FF', '#AA75FF',
  '#D45AFF', '#FF3CAC',
]

function lerpColor(a, b, t) {
  const ah = parseInt(a.slice(1), 16)
  const bh = parseInt(b.slice(1), 16)
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff
  const rr = Math.round(ar + (br - ar) * t)
  const rg = Math.round(ag + (bg - ag) * t)
  const rb = Math.round(ab + (bb - ab) * t)
  return `rgb(${rr},${rg},${rb})`
}

function getSnakeColor(index, total) {
  const t = total <= 1 ? 0 : index / (total - 1)
  const scaled = t * (SNAKE_COLORS.length - 1)
  const lo = Math.floor(scaled)
  const hi = Math.min(lo + 1, SNAKE_COLORS.length - 1)
  return lerpColor(SNAKE_COLORS[lo], SNAKE_COLORS[hi], scaled - lo)
}

export default function SnakeGame() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const animRef = useRef(null)
  const lastTickRef = useRef(0)

  const initState = useCallback((w, h) => {
    const cols = Math.floor(w / GRID)
    const rows = Math.floor(h / GRID)
    const cx = Math.floor(cols / 2)
    const cy = Math.floor(rows / 2)

    // Build initial snake body
    const body = []
    for (let i = 0; i < INITIAL_LENGTH; i++) {
      body.push({ x: cx - i, y: cy })
    }

    // Particles
    const particles = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        hue: Math.random() * 360,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    return { cols, rows, body, dir: { x: 1, y: 0 }, nextDir: { x: 1, y: 0 }, particles }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let resizeObserver = null

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
      if (!stateRef.current) {
        stateRef.current = initState(canvas.width, canvas.height)
      } else {
        stateRef.current.cols = Math.floor(canvas.width / GRID)
        stateRef.current.rows = Math.floor(canvas.height / GRID)
      }
    }
    
    if (canvas.parentElement) {
      resizeObserver = new ResizeObserver(() => {
        resize()
      })
      resizeObserver.observe(canvas.parentElement)
    }
    
    resize()
    window.addEventListener('resize', resize)

    // Key handling — only raw W/A/S/D, no modifiers
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const s = stateRef.current
      if (!s) return
      const key = e.key.toLowerCase()
      if (key === 'w' && s.dir.y !== 1) s.nextDir = { x: 0, y: -1 }
      else if (key === 's' && s.dir.y !== -1) s.nextDir = { x: 0, y: 1 }
      else if (key === 'a' && s.dir.x !== 1) s.nextDir = { x: -1, y: 0 }
      else if (key === 'd' && s.dir.x !== -1) s.nextDir = { x: 1, y: 0 }
    }
    window.addEventListener('keydown', onKey)

    // Game loop
    const loop = (timestamp) => {
      animRef.current = requestAnimationFrame(loop)
      const s = stateRef.current
      if (!s) return
      const w = canvas.width
      const h = canvas.height

      // --- Tick-based movement ---
      if (timestamp - lastTickRef.current >= TICK_MS) {
        lastTickRef.current = timestamp
        s.dir = { ...s.nextDir }

        const head = s.body[0]
        let nx = head.x + s.dir.x
        let ny = head.y + s.dir.y

        // Wrap around
        if (nx < 0) nx = s.cols - 1
        if (nx >= s.cols) nx = 0
        if (ny < 0) ny = s.rows - 1
        if (ny >= s.rows) ny = 0

        // Check self-collision
        let collidedWithSelf = false
        for (let i = 1; i < s.body.length; i++) {
          if (nx === s.body[i].x && ny === s.body[i].y) {
            collidedWithSelf = true
            break
          }
        }

        if (collidedWithSelf) {
          // Reset snake length
          s.body = s.body.slice(0, INITIAL_LENGTH)
        } else {
          s.body.unshift({ x: nx, y: ny })
        }

        // Check particle collision
        const headPx = nx * GRID + GRID / 2
        const headPy = ny * GRID + GRID / 2
        let ate = false

        for (let i = 0; i < s.particles.length; i++) {
          const p = s.particles[i]
          const dx = headPx - p.x
          const dy = headPy - p.y
          if (dx * dx + dy * dy < (GRID * 0.8) ** 2) {
            // Respawn particle
            s.particles[i] = {
              x: Math.random() * w,
              y: Math.random() * h,
              vx: 0,
              vy: 0,
              hue: Math.random() * 360,
              pulse: Math.random() * Math.PI * 2,
            }
            ate = true
            break
          }
        }

        if (!ate) {
          s.body.pop() // remove tail if didn't eat
        }
      }

      // --- Render ---
      // Fade trail
      ctx.fillStyle = 'rgba(10, 10, 10, 0.25)'
      ctx.fillRect(0, 0, w, h)

      // Update & draw particles
      for (const p of s.particles) {
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.02

        // Wrap particles
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        const r = PARTICLE_RADIUS + Math.sin(p.pulse) * 1
        const alpha = 0.5 + Math.sin(p.pulse) * 0.3

        // Glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, GLOW_RADIUS)
        grad.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${alpha * 0.4})`)
        grad.addColorStop(1, `hsla(${p.hue}, 80%, 70%, 0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, GLOW_RADIUS, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw snake
      const len = s.body.length
      for (let i = len - 1; i >= 0; i--) {
        const seg = s.body[i]
        const px = seg.x * GRID + GRID / 2
        const py = seg.y * GRID + GRID / 2
        const color = getSnakeColor(i, len)
        const radius = GRID / 2 - 1 + (i === 0 ? 2 : 0) // head slightly larger

        // Glow for head
        if (i === 0) {
          const headGlow = ctx.createRadialGradient(px, py, 0, px, py, GRID * 1.5)
          headGlow.addColorStop(0, `${color.replace('rgb', 'rgba').replace(')', ',0.5)')}`)
          headGlow.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = headGlow
          ctx.beginPath()
          ctx.arc(px, py, GRID * 1.5, 0, Math.PI * 2)
          ctx.fill()
        }

        // Segment
        const segAlpha = 0.9 - (i / len) * 0.5
        ctx.globalAlpha = segAlpha
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(px, py, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Draw eyes on head
      if (len > 0) {
        const head = s.body[0]
        const hx = head.x * GRID + GRID / 2
        const hy = head.y * GRID + GRID / 2
        const eyeOffset = 3
        const eyeR = 2

        let e1x, e1y, e2x, e2y
        if (s.dir.x === 1) { e1x = hx + 4; e1y = hy - eyeOffset; e2x = hx + 4; e2y = hy + eyeOffset }
        else if (s.dir.x === -1) { e1x = hx - 4; e1y = hy - eyeOffset; e2x = hx - 4; e2y = hy + eyeOffset }
        else if (s.dir.y === -1) { e1x = hx - eyeOffset; e1y = hy - 4; e2x = hx + eyeOffset; e2y = hy - 4 }
        else { e1x = hx - eyeOffset; e1y = hy + 4; e2x = hx + eyeOffset; e2y = hy + 4 }

        ctx.fillStyle = '#fff'
        ctx.beginPath(); ctx.arc(e1x, e1y, eyeR, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.arc(e2x, e2y, eyeR, 0, Math.PI * 2); ctx.fill()

        ctx.fillStyle = '#111'
        ctx.beginPath(); ctx.arc(e1x, e1y, 1, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.arc(e2x, e2y, 1, 0, Math.PI * 2); ctx.fill()
      }
    }

    animRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', onKey)
      if (resizeObserver) resizeObserver.disconnect()
    }
  }, [initState])

  return (
    <div className="relative w-full h-full overflow-hidden" 
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.01), rgba(255,255,255,0.03))',
        border: '1px solid var(--border)', borderRadius: '10px'
      }}>
      <canvas
        ref={canvasRef}
        className="snake-canvas"
        aria-hidden="true"
      />
    </div>
  )
}
