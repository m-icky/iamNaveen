import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSound from '../../hooks/useSound'

export default function TerminalModal({ isOpen, onClose }) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'info', text: 'Naveen-OS v1.0.0' },
    { type: 'info', text: 'Type anything to learn about me...' },
  ])
  const inputRef = useRef(null)
  const scrollRef = useRef(null)
  const { playClick, playPop, playType } = useSound()

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      playPop()
    }
  }, [isOpen, playPop])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase()
      setHistory((prev) => [...prev, { type: 'input', text: `> ${input}` }])
      
      playClick()

      // Response logic
      setTimeout(() => {
        let response = []
        if (cmd.includes('clear')) {
          setHistory([])
        } else {
          response = [
            { type: 'output', text: '--- PROFILE: NAVEEN T M ---' },
            { type: 'output', text: 'ROLE: Creative Frontend Engineer' },
            { type: 'output', text: 'STACK: React, GSAP, Three.js, Tailwind' },
            { type: 'output', text: 'LOCATION: India' },
            { type: 'output', text: 'PASSION: Building cinematic web experiences.' },
            { type: 'output', text: '---------------------------' },
          ]
          setHistory((prev) => [...prev, ...response])
        }
      }, 100)

      setInput('')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-3xl aspect-[16/10] bg-[#0c0c0c] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: '"DM Mono", monospace' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Terminal — @Naveen</div>
              <button 
                onClick={onClose}
                className="text-white/30 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto text-xs md:text-sm custom-scrollbar"
            >
              {history.map((line, i) => (
                <div 
                  key={i} 
                  className={`mb-1 ${
                    line.type === 'input' ? 'text-accent' : 
                    line.type === 'info' ? 'text-white/40' : 
                    'text-white/90'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              <div className="flex items-center gap-2 mt-4">
                <span className="text-accent tracking-tighter">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value)
                    playType()
                  }}
                  onKeyDown={handleCommand}
                  className="bg-transparent border-none outline-none flex-1 text-white caret-accent"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
