import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SectionDots({ sectionMap, currentIndex, goToSection }) {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <div className="section-dots">
      {sectionMap.map((section, i) => (
        <button
          key={section.id}
          className="section-dots__item"
          onClick={() => goToSection(i)}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
          aria-label={`Go to ${section.label}`}
        >
          {/* Label tooltip */}
          {hoveredIdx === i && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              className="section-dots__label font-mono"
            >
              {section.label}
            </motion.span>
          )}

          {/* Dot */}
          <motion.div
            className="section-dots__dot"
            animate={{
              scale: i === currentIndex ? 1 : 0.6,
              background: i === currentIndex ? 'var(--accent)' : 'rgba(255,255,255,0.25)',
              boxShadow: i === currentIndex ? '0 0 10px var(--accent)' : 'none',
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
      ))}
    </div>
  )
}
