import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSound from '../../hooks/useSound'

export default function ScrollToTop({ lenisRef }) {
  const [visible, setVisible] = useState(false)
  const { playClick, playHover } = useSound()

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollToTop = () => {
    playClick()
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { duration: 1.4 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          onClick={handleScrollToTop}
          onMouseEnter={playHover}
          title="Scroll to Top"
          aria-label="Scroll to Top"
          data-cursor-text="TOP"
          className="fixed bottom-6 right-6 z-50 glass rounded-2xl w-12 h-12 flex flex-col items-center justify-center border border-white/15 hover:border-accent/80 text-white hover:text-accent shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group"
          style={{
            background: 'rgba(15, 15, 15, 0.8)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(232, 255, 0, 0.15)',
          }}
        >
          <motion.svg
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </motion.svg>
          <span className="font-mono text-[8px] tracking-widest text-accent font-bold uppercase -mt-0.5">
            TOP
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
