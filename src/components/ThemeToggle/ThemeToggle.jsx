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
      className="fixed bottom-6 right-6 z-50 glass rounded-2xl w-12 h-12 flex items-center justify-center border border-white/15 hover:border-accent/60 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      aria-label="Toggle Theme"
      data-cursor-text="THEME"
    >
      <motion.span
        key={theme}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        className="text-lg select-none"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </motion.span>
    </button>
  )
}
