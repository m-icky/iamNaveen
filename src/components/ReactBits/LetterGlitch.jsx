/**
 * LetterGlitch — inspired by react-bits LetterGlitch
 * Continuously scrambles letters with a glitchy animation
 */
import { useEffect, useRef, useState } from 'react'

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*!?<>{}[]|/\\'

function useLetterGlitch(text, {
  speed = 50,
  maxIterations = 8,
  glitchColor = '#E8FF00',
  activeColor = '#F5F0E8',
  revealMode = 'sequential',
  trigger = 'auto',
} = {}) {
  const [displayText, setDisplayText] = useState(text)
  const [glitching, setGlitching] = useState(false)
  const iterRef = useRef(0)
  const rafRef = useRef(null)
  const intervalRef = useRef(null)

  const startGlitch = () => {
    iterRef.current = 0
    setGlitching(true)

    intervalRef.current = setInterval(() => {
      iterRef.current += 1

      const next = text.split('').map((char, i) => {
        if (char === ' ') return { char: ' ', glitch: false }

        if (revealMode === 'sequential') {
          const revealAt = Math.floor((i / text.length) * maxIterations)
          if (iterRef.current > revealAt + 3) return { char, glitch: false }
        } else {
          if (iterRef.current > maxIterations * 0.7 && Math.random() > 0.3) {
            return { char, glitch: false }
          }
        }

        if (iterRef.current > maxIterations) return { char, glitch: false }
        return {
          char: GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
          glitch: true,
        }
      })

      setDisplayText(next)

      if (iterRef.current >= maxIterations + 2) {
        clearInterval(intervalRef.current)
        setDisplayText(text.split('').map(c => ({ char: c, glitch: false })))
        setGlitching(false)
      }
    }, speed)
  }

  useEffect(() => {
    setDisplayText(text.split('').map(c => ({ char: c, glitch: false })))
  }, [text])

  useEffect(() => {
    if (trigger === 'auto') {
      const go = () => {
        startGlitch()
        const timeout = setTimeout(go, 3000 + Math.random() * 2000)
        return timeout
      }
      const t = setTimeout(go, 500)
      return () => {
        clearTimeout(t)
        clearInterval(intervalRef.current)
      }
    }
  }, [trigger, text])

  return { displayText, glitching, startGlitch }
}

export default function LetterGlitch({
  text = 'NAVEEN T M',
  className = '',
  speed = 40,
  maxIterations = 12,
  glitchColor = '#E8FF00',
  activeColor = 'var(--fg)',
  trigger = 'auto',
  style = {},
}) {
  const { displayText, glitching, startGlitch } = useLetterGlitch(text, {
    speed,
    maxIterations,
    glitchColor,
    trigger,
  })

  return (
    <span
      className={className}
      style={{ display: 'inline-block', cursor: trigger === 'hover' ? 'none' : 'inherit', ...style }}
      onMouseEnter={trigger === 'hover' ? startGlitch : undefined}
    >
      {Array.isArray(displayText)
        ? displayText.map((item, i) => (
            <span
              key={i}
              style={{
                color: item.glitch ? glitchColor : activeColor,
                textShadow: item.glitch ? `0 0 10px ${glitchColor}, 0 0 20px ${glitchColor}80` : 'none',
                transition: item.glitch ? 'none' : 'color 0.1s',
                display: 'inline-block',
                transform: item.glitch && Math.random() > 0.7 ? `translateX(${(Math.random() - 0.5) * 3}px)` : 'none',
              }}
            >
              {item.char}
            </span>
          ))
        : displayText}
    </span>
  )
}
