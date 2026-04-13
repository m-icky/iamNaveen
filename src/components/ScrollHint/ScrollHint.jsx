import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ARROWS = {
  '↓': { rotation: 0,   label: 'Scroll ↓' },
  '→': { rotation: -90, label: 'Scroll → (via scroll)' },
  '←': { rotation: 90,  label: 'Scroll ← (via scroll)' },
  '↑': { rotation: 180, label: 'Scroll ↑' },
}

export default function ScrollHint({ hint, isLast }) {
  const [visible, setVisible] = useState(true)

  // Re-show on hint change, then auto-hide after 3s
  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 4000)
    return () => clearTimeout(timer)
  }, [hint])

  if (!hint || isLast) return null

  const arrow = ARROWS[hint] || ARROWS['↓']

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="scroll-hint"
        >
          <span className="scroll-hint__label font-mono">{arrow.label}</span>
          <motion.div
            className="scroll-hint__arrow"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            style={{ transform: `rotate(${arrow.rotation}deg)` }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
