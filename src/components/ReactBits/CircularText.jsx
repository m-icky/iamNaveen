/**
 * CircularText — inspired by react-bits CircularText
 * Renders text along a circular SVG path, continuously rotating
 */
import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function CircularText({
  text = 'Creative Frontend Engineer • ',
  radius = 80,
  fontSize = 12,
  duration = 12,
  color = 'var(--accent)',
  className = '',
  children,
}) {
  const chars = text.split('')
  const total = chars.length
  const angleStep = 360 / total

  const size = (radius + fontSize * 2) * 2

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Center content */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {children}
        </div>
      )}

      {/* Rotating ring of characters */}
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        animate={{ rotate: 360 }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {chars.map((char, i) => {
          const angle = (i * angleStep - 90) * (Math.PI / 180)
          const x = size / 2 + radius * Math.cos(angle)
          const y = size / 2 + radius * Math.sin(angle)
          const rotation = i * angleStep

          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={color}
              fontSize={fontSize}
              fontFamily="'DM Mono', monospace"
              fontWeight="500"
              letterSpacing="0.05em"
              transform={`rotate(${rotation}, ${x}, ${y})`}
            >
              {char}
            </text>
          )
        })}
      </motion.svg>
    </div>
  )
}
