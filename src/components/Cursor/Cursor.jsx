import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const dot = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) {
      setIsMobile(true)
      return
    }

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)

    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    const targets = document.querySelectorAll('a, button, .magnetic-btn, [data-cursor="hover"]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const lerp = (a, b, n) => a + (b - a) * n

    const animate = () => {
      dot.current.x = lerp(dot.current.x, pos.current.x, 0.12)
      dot.current.y = lerp(dot.current.y, pos.current.y, 0.12)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${dot.current.x - 20}px, ${dot.current.y - 20}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  if (isMobile) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{ willChange: 'transform' }}
      >
        <div
          style={{
            width: hovered ? 56 : clicked ? 24 : 40,
            height: hovered ? 56 : clicked ? 24 : 40,
            borderRadius: '50%',
            border: '1.5px solid var(--accent)',
            transition: 'width 0.3s cubic-bezier(0.23,1,0.32,1), height 0.3s cubic-bezier(0.23,1,0.32,1), background 0.3s',
            background: hovered ? 'rgba(232,255,0,0.15)' : 'transparent',
          }}
        />
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--accent)',
          willChange: 'transform',
        }}
      />
    </>
  )
}
