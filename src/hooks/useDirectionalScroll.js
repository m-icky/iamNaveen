import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Section map — defines the 2D grid position of each fullpage section.
 * The viewport translates to (col * 100vw, row * 100vh) for each section.
 */
const SECTION_MAP = [
  { id: 'home',           label: 'Home',            col: 0, row: 0, hint: '↓' },
  { id: 'about',          label: 'About',           col: 0, row: 1, hint: '→' },
  { id: 'skills',         label: 'Tech Stack',      col: 1, row: 1, hint: '↓' },
  { id: 'projects',       label: 'Selected Works',  col: 1, row: 2, hint: '↓' },
  { id: 'havefun',        label: 'Have Fun',        col: 1, row: 3, hint: '↓' },
  { id: 'github',         label: 'GitHub Activity', col: 1, row: 4, hint: '←' },
  { id: 'experience',     label: 'Explore',         col: 0, row: 4, hint: '↓' },
  { id: 'contact',        label: "Let's Connect",   col: 0, row: 5, hint: null },
]

const ANIMATION_DURATION = 900 // ms — matches CSS transition duration
const WHEEL_THRESHOLD = 30     // minimum deltaY to trigger a transition
const TOUCH_THRESHOLD = 50     // minimum swipe distance in px

export default function useDirectionalScroll() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(null) // 'up'|'down'|'left'|'right'
  const isAnimating = useRef(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)

  const goToSection = useCallback((targetIndex) => {
    if (isAnimating.current) return
    if (targetIndex < 0 || targetIndex >= SECTION_MAP.length) return
    if (targetIndex === currentIndex) return // already there — skip (uses ref below)

    isAnimating.current = true

    // Determine direction
    const current = SECTION_MAP[currentIndex] // uses stale closure but that's fine for direction calc
    const target = SECTION_MAP[targetIndex]

    if (target.col > current.col) setDirection('right')
    else if (target.col < current.col) setDirection('left')
    else if (target.row > current.row) setDirection('down')
    else setDirection('up')

    setCurrentIndex(targetIndex)

    setTimeout(() => {
      isAnimating.current = false
    }, ANIMATION_DURATION)
  }, [currentIndex])

  // Navigate next/prev based on linear index
  const goNext = useCallback(() => {
    goToSection(currentIndex + 1)
  }, [currentIndex, goToSection])

  const goPrev = useCallback(() => {
    goToSection(currentIndex - 1)
  }, [currentIndex, goToSection])

  // Wheel handler
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault()
      if (isAnimating.current) return
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return

      if (e.deltaY > 0) goNext()
      else goPrev()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [goNext, goPrev])

  // Keyboard handler (arrow keys)
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (isAnimating.current) return

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        goPrev()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  // Touch handler (mobile swipe)
  useEffect(() => {
    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const onTouchEnd = (e) => {
      if (isAnimating.current) return
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      const deltaX = touchStartX.current - e.changedTouches[0].clientX

      // Prioritize larger delta
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > TOUCH_THRESHOLD) {
        if (deltaY > 0) goNext()
        else goPrev()
      }
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [goNext, goPrev])

  const currentSection = SECTION_MAP[currentIndex]

  return {
    currentIndex,
    currentSection,
    direction,
    goToSection,
    goNext,
    goPrev,
    sectionMap: SECTION_MAP,
    isFirst: currentIndex === 0,
    isLast: currentIndex === SECTION_MAP.length - 1,
  }
}

export { SECTION_MAP }
