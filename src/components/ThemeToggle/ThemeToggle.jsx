import { motion } from 'framer-motion'
import useSound from '../../hooks/useSound'

export default function ThemeToggle({ theme, setTheme }) {
  const { playClick, playHover } = useSound()
  return (
    <button
      onClick={() => {
        playClick()
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}
      onMouseEnter={playHover}
      className="fixed bottom-8 right-8 z-50 glass rounded-full w-12 h-12 flex items-center justify-center magnetic-btn"
      title="Toggle theme"
      style={{ border: '1px solid var(--border)' }}
    >
      <motion.span
        key={theme}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ fontSize: 18 }}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </motion.span>
    </button>
  )
}
