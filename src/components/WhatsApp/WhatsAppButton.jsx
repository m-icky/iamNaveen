import { motion } from 'framer-motion'
import useSound from '../../hooks/useSound'

export default function WhatsAppButton() {
  const { playClick, playHover } = useSound()

  const phoneNumber = '917902765146'
  const message = 'Hello Naveen! I came across your portfolio and would love to discuss a project / opportunity with you.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={playClick}
      onMouseEnter={playHover}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp"
      data-cursor-text="CHAT"
      className="fixed bottom-6 left-6 z-50 group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full glass transition-all duration-300 hover:scale-105 active:scale-95 select-none"
      style={{
        background: 'rgba(10, 24, 16, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(16, 185, 129, 0.35)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(16, 185, 129, 0.2)',
      }}
    >
      {/* WhatsApp Official Vector Icon */}
      <div className="relative flex items-center justify-center">
        <svg
          className="w-5 h-5 text-[#25D366] transition-transform duration-300 group-hover:rotate-12"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.155-.544-1.612-.678-2.614-2.316-2.694-2.423-.08-.107-.643-.858-.643-1.637 0-.78.406-1.164.55-1.324.145-.159.317-.199.423-.199.106 0 .212.002.304.006.098.004.229-.037.358.273.133.32.455 1.109.495 1.19.04.081.066.175.013.281-.053.106-.08.172-.16.265-.08.093-.167.208-.239.279-.08.079-.163.165-.07.324.093.16.413.682.887 1.103.61.542 1.124.71 1.284.789.16.08.253.069.347-.04.093-.109.4-.467.507-.627.106-.16.213-.133.359-.08.146.053.931.439 1.091.519.16.08.266.12.306.186.04.067.04.387-.104.792zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.174L2 22l4.981-1.397A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.602 0-3.094-.48-4.34-1.303l-.311-.184-2.94.825.845-2.859-.202-.328A8.136 8.136 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z" />
        </svg>
        {/* Pulsing online indicator dot */}
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      </div>

      {/* Label Capsule */}
      <span className="font-mono text-[11px] tracking-wider uppercase font-semibold text-emerald-300 group-hover:text-emerald-200 transition-colors pr-1 hidden sm:inline-block">
        WhatsApp
      </span>
    </motion.a>
  )
}
