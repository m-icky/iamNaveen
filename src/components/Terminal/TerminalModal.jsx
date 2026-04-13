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
    const cmd = input.trim().toLowerCase()

    // 👉 TAB AUTOCOMPLETE
    if (e.key === 'Tab') {
      e.preventDefault() // stop browser focus change

      if (suggestions.length === 1) {
        setInput(suggestions[0])
      }

      return
    }

    // 👉 ENTER EXECUTION
    if (e.key === 'Enter') {
      setHistory((prev) => [...prev, { type: 'input', text: `> ${input}` }])
      playClick()

      setTimeout(() => {
        let response = []

        const commandsMap = {
          stack: 'STACK: React, HTML, CSS, JS, Next.js, GSAP, Three.js, Tailwind',
          specialty: 'SPECIALTY: Interactive UI, Animations, Performance Optimization',
          experience: 'EXPERIENCE: Building scalable frontend architectures & design systems',
          projects: 'PROJECTS: Immersive web apps, 3D experiences, brand-driven UI',
          tools: 'TOOLS: Figma, Git, Framer Motion, WebGL, TypeScript, Node.js, Python, Django, MySQL',
          approach: 'APPROACH: Pixel-perfect, motion-first, user-centric design',
          focus: 'CURRENT FOCUS: Advanced animations, 3D web, and UI micro-interactions',
          location: 'LOCATION: Ernakulam, Kerala, India',
          passion: 'PASSION: Building cinematic web experiences.',
          status: 'STATUS: Available for freelance & collaborations',
          contact: 'CONTACT: naveentmadhu@gmail.com'
        }

        if (cmd.includes('clear')) {
          setHistory([])
          return
        }

        const matchedKey = Object.keys(commandsMap).find(key =>
          cmd.includes(key)
        )

        if (matchedKey) {
          response = [
            { type: 'output', text: `> ${matchedKey.toUpperCase()}` },
            { type: 'output', text: commandsMap[matchedKey] }
          ]
        } else {
          response = [
            { type: 'output', text: '👋 Hey, I’m Naveen — Creative Frontend Engineer' },
            { type: 'output', text: 'Type a keyword to explore:' },
            { type: 'output', text: '→ stack | specialty | experience | projects' },
            { type: 'output', text: '→ tools | approach | focus | location' },
            { type: 'output', text: '→ passion | status | contact' },
          ]
        }

        setHistory((prev) => [...prev, ...response])
      }, 100)

      setInput('')
    }
  }

    const commands = [
    'stack',
    'specialty',
    'experience',
    'projects',
    'tools',
    'approach',
    'focus',
    'location',
    'passion',
    'status',
    'contact'
  ]

  const suggestions = commands.filter(cmd =>
    cmd.startsWith(input.toLowerCase())
  )

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
              {input && suggestions.length > 0 && (
                <div className="text-white/40 text-xs mt-2">
                  Suggestions: {suggestions.join(', ')}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
