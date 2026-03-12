/**
 * Lanyard — inspired by react-bits Lanyard
 * An interactive ID badge hanging on a rope with mouse-based physics
 */
import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

const CARD_W = 200
const CARD_H = 280
const ROPE_H = 120

function RopeSVG({ swing }) {
  // Bezier rope that sways with card
  const cx = useTransform(swing, v => 50 + v * 30)

  return (
    <svg
      width="100%"
      height={ROPE_H + 10}
      viewBox={`0 0 100 ${ROPE_H + 10}`}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <motion.path
        d={`M 50 0 Q ${50} ${ROPE_H / 2} 50 ${ROPE_H}`}
        stroke="rgba(232,255,0,0.5)"
        strokeWidth="2"
        fill="none"
        style={{
          d: useTransform(
            swing,
            v => `M 50 0 Q ${50 + v * 25} ${ROPE_H * 0.6} 50 ${ROPE_H}`
          ),
        }}
      />
    </svg>
  )
}

export default function Lanyard({ className = '' }) {
  const containerRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const dragOrigin = useRef({ x: 0, y: 0 })
  const lastVel = useRef(0)

  // Spring physics
  const x = useSpring(0, { stiffness: 80, damping: 18, mass: 0.8 })
  const y = useSpring(0, { stiffness: 60, damping: 14, mass: 1 })
  const rotateZ = useTransform(x, [-120, 0, 120], [-25, 0, 25])
  const swingVal = useTransform(x, [-120, 0, 120], [-1, 0, 1])

  const onPointerDown = useCallback((e) => {
    setDragging(true)
    dragOrigin.current = { x: e.clientX - x.get(), y: e.clientY - y.get() }
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [x, y])

  const onPointerMove = useCallback((e) => {
    if (!dragging) return
    const newX = e.clientX - dragOrigin.current.x
    const newY = Math.max(0, e.clientY - dragOrigin.current.y)
    lastVel.current = newX - x.get()
    x.set(newX)
    y.set(newY)
  }, [dragging, x, y])

  const onPointerUp = useCallback(() => {
    setDragging(false)
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center select-none ${className}`}
      style={{ width: CARD_W, userSelect: 'none' }}
    >
      {/* Rope */}
      <div style={{ width: CARD_W, height: ROPE_H, position: 'relative', overflow: 'visible' }}>
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
          <RopeSVG swing={swingVal} />
        </div>
      </div>

      {/* Card */}
      <motion.div
        style={{ x, y, rotateZ, cursor: dragging ? 'grabbing' : 'grab' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        whileHover={{ scale: 1.03 }}
        transition={{ scale: { type: 'spring', stiffness: 300 } }}
      >
        <div
          style={{
            width: CARD_W,
            height: CARD_H,
            borderRadius: 20,
            background: 'linear-gradient(145deg, rgba(20,20,20,0.95), rgba(10,10,10,0.98))',
            border: '1px solid rgba(232,255,0,0.3)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,255,0,0.1)',
            overflow: 'hidden',
            position: 'relative',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Top glow bar */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: 3,
            background: 'linear-gradient(90deg, #E8FF00, #FF3CAC, #61DAFB)',
          }} />

          {/* Hole */}
          <div style={{
            width: 20, height: 20, borderRadius: '50%',
            background: 'rgba(0,0,0,0.8)',
            border: '2px solid rgba(232,255,0,0.4)',
            margin: '16px auto 0',
          }} />

          {/* Avatar / initials */}
          <div style={{
            width: 70, height: 70, borderRadius: '50%',
            background: 'linear-gradient(135deg, #E8FF00, #FF3CAC)',
            margin: '10px auto 8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 700, fontFamily: 'Bebas Neue, sans-serif',
            color: '#0A0A0A',
            boxShadow: '0 0 20px rgba(232,255,0,0.3)',
          }}>
            Naveen
          </div>

          {/* Name */}
          <div style={{ textAlign: 'center', padding: '0 16px' }}>
            <div style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 22, letterSpacing: '0.08em',
              color: '#F5F0E8', lineHeight: 1.1,
            }}>
              NAVEEN T M
            </div>
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 9, letterSpacing: '0.15em',
              color: '#E8FF00', marginTop: 4,
              textTransform: 'uppercase',
            }}>
              Frontend Engineer
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(232,255,0,0.15)', margin: '12px 16px' }} />

          {/* Info rows */}
          {[
            { label: 'Stack', value: 'React · Three.js' },
            { label: 'Exp',   value: '3+ Years' },
            { label: 'Base',  value: 'Kerala, IN' },
          ].map(row => (
            <div key={row.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '3px 16px',
            }}>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
                {row.label}
              </span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>
                {row.value}
              </span>
            </div>
          ))}

          {/* Barcode */}
          <div style={{ margin: '10px 16px 0', height: 28, background: 'repeating-linear-gradient(90deg, rgba(232,255,0,0.6) 0px, rgba(232,255,0,0.6) 2px, transparent 2px, transparent 5px)', borderRadius: 2 }} />
          <div style={{ textAlign: 'center', fontFamily: 'DM Mono, monospace', fontSize: 8, color: 'rgba(232,255,0,0.4)', marginTop: 4 }}>
            Naveen-2025-FEND
          </div>

          {/* Noise texture overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 20,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            opacity: 0.04,
          }} />
        </div>
      </motion.div>
    </div>
  )
}
