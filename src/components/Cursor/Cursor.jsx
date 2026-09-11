import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const dot = useRef({ x: -100, y: -100 })
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
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`
      }
    }

    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)

    const attachHoverEvents = () => {
      const targets = document.querySelectorAll('a, button, .magnetic-btn, [data-cursor="hover"], [data-cursor-text]')
      targets.forEach((el) => {
        el.addEventListener('mouseenter', (e) => {
          setHovered(true)
          const customText = el.getAttribute('data-cursor-text')
          if (customText) setCursorText(customText)
        })
        el.addEventListener('mouseleave', () => {
          setHovered(false)
          setCursorText('')
        })
      })
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    attachHoverEvents()

    // Re-check periodically for dynamic elements
    const interval = setInterval(attachHoverEvents, 2000)

    const lerp = (a, b, n) => a + (b - a) * n

    const animate = () => {
      dot.current.x = lerp(dot.current.x, pos.current.x, 0.15)
      dot.current.y = lerp(dot.current.y, pos.current.y, 0.15)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      clearInterval(interval)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  if (isMobile) return null

  const size = cursorText ? 72 : hovered ? 54 : clicked ? 28 : 42

  return (
    <>
      {/* Outer Halo */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        <div
          className="flex items-center justify-center font-mono font-bold text-[9px] uppercase tracking-wider text-black select-none"
          style={{
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
            borderRadius: '50%',
            border: cursorText ? 'none' : '1.5px solid rgba(232, 255, 0, 0.8)',
            backgroundColor: cursorText
              ? 'var(--accent)'
              : hovered
              ? 'rgba(232, 255, 0, 0.15)'
              : 'transparent',
            boxShadow: hovered
              ? '0 0 25px rgba(232, 255, 0, 0.35)'
              : 'none',
            transition: 'width 0.28s cubic-bezier(0.23, 1, 0.32, 1), height 0.28s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.25s ease, margin 0.28s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          {cursorText && (
            <span className="animate-in fade-in zoom-in-75 duration-200">
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* Center Laser Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          boxShadow: '0 0 10px rgba(232, 255, 0, 0.8)',
          opacity: cursorText ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      />
    </>
  )
}
