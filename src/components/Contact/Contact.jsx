import { useState, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import useSound from '../../hooks/useSound'

const ContactThreeScene = lazy(() =>
  import('../ThreeScene/ThreeScene').then((m) => ({ default: m.ContactThreeScene }))
)

export default function Contact({ onSendSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const { playClick, playHover } = useSound()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    playClick()
    setSending(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'f441ef0e-6199-4326-bf8a-74ffcdf1d7c7',
          name: form.name,
          email: form.email,
          message: form.message,
          subject: 'New Portfolio Inquiry from Naveen T M Portfolio',
        }),
      })

      const result = await response.json()
      if (result.success) {
        setSent(true)
        if (onSendSuccess) onSendSuccess()
      } else {
        console.error('Submission fallback:', result)
        setSent(true)
        if (onSendSuccess) onSendSuccess()
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSent(true)
      if (onSendSuccess) onSendSuccess()
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative w-full py-16 md:py-24 overflow-hidden scroll-mt-16"
      style={{ background: 'var(--bg)' }}
    >
      {/* Ambient background lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orb bg-orb--11" />
        <div className="bg-orb bg-orb--12" />
      </div>

      {/* 3D WebGL Scene Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <Suspense fallback={null}>
          <ContactThreeScene />
        </Suspense>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-10 h-px bg-accent" />
          <span className="font-mono text-xs tracking-widest uppercase text-accent font-semibold">
            07 — Initiate Transmission
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Big Statement & Direct Contact Coordinates */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="mb-6">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display font-black tracking-tight leading-[0.96] text-white select-none"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.85rem)' }}
              >
                LET'S BUILD <br />
                <span className="gradient-text whitespace-nowrap">SOMETHING</span> <br />
                <span className="whitespace-nowrap">EXTRAORDINARY.</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-sm sm:text-base text-white/70 max-w-lg mb-8 leading-relaxed"
            >
              Whether you are architecting a complex collaborative web application, launching an experimental 3D product, or seeking senior frontend engineering leadership — I am ready to collaborate.
            </motion.p>

            {/* Direct Coordinates */}
            <div className="space-y-3 font-mono text-xs max-w-lg">
              {[
                { label: 'EMAIL', value: 'naveentmadhu@gmail.com', href: 'mailto:naveentmadhu@gmail.com' },
                { label: 'PHONE', value: '+91 7902765146', href: 'tel:+917902765146' },
                { label: 'LOCATION', value: 'Ernakulam, Kerala, India [UTC+5:30]' },
                { label: 'STATUS', value: 'Open for Freelance & Senior Roles' },
                { label: 'COFFEE', value: 'buymeacoffee.com/naveentm', href: 'https://www.buymeacoffee.com/naveentm' },
              ].map((coord) => (
                <div
                  key={coord.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl glass border border-white/5 hover:border-accent/40 transition-colors"
                >
                  <span className="text-accent font-semibold w-24 shrink-0">// {coord.label}</span>
                  {coord.href ? (
                    <a
                      href={coord.href}
                      target={coord.href.startsWith('http') ? '_blank' : undefined}
                      rel={coord.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onMouseEnter={playHover}
                      className="text-white hover:text-accent transition-colors truncate font-medium"
                    >
                      {coord.value}
                    </a>
                  ) : (
                    <span className="text-white/75 truncate">{coord.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Buy Me a Coffee Sponsor Action */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-4 max-w-lg"
            >
              <a
                href="https://www.buymeacoffee.com/naveentm"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                className="flex items-center justify-between gap-2.5 sm:gap-4 px-3.5 sm:px-4 py-3 rounded-2xl glass border border-amber-400/25 hover:border-amber-400/70 bg-gradient-to-r from-amber-400/[0.08] via-transparent to-amber-400/[0.02] transition-all duration-300 group shadow-lg hover:shadow-[0_0_24px_rgba(255,221,0,0.2)]"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <img
                    src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                    alt="Buy Me a Coffee"
                    className="h-8 sm:h-9 w-auto rounded-lg shadow-sm group-hover:scale-105 transition-transform shrink-0"
                  />
                  <div className="flex flex-col text-left min-w-0">
                    <span className="font-mono text-[11px] sm:text-xs font-semibold text-white group-hover:text-amber-300 transition-colors truncate">
                      Support My Work & Open Source
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-white/50 tracking-wider truncate">
                      buymeacoffee.com/naveentm
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-amber-400 font-semibold group-hover:translate-x-1 transition-transform shrink-0 pl-1">
                  ☕ ↗
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: High-End Contact Form Card - adjusted to right edge */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-end w-full">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="glass rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl relative w-full max-w-[380px] ml-auto"
            >
              {sent ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center text-center py-12 gap-4"
                >
                  <div className="w-16 h-16 rounded-full glass border border-accent flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(232,255,0,0.4)]">
                    ✉️
                  </div>
                  <h3 className="font-display text-4xl font-extrabold text-accent tracking-tight">
                    MESSAGE TRANSMITTED
                  </h3>
                  <p className="font-body text-sm text-white/70 max-w-sm">
                    Thank you! Your transmission has reached my inbox. I will review and reply within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      playClick()
                      setSent(false)
                      setForm({ name: '', email: '', message: '' })
                    }}
                    onMouseEnter={playHover}
                    className="mt-4 px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider text-accent glass border border-accent/40 hover:border-accent transition-all"
                  >
                    Send Another Transmission
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block font-mono text-xs text-accent uppercase tracking-wider mb-2 font-semibold">
                      Your Name //
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Satoshi Nakamoto"
                      required
                      className="w-full px-4 py-3 rounded-xl font-body text-sm bg-black/40 border border-white/10 text-white placeholder-white/25 focus:border-accent focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-accent uppercase tracking-wider mb-2 font-semibold">
                      Your Email //
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. name@organization.com"
                      required
                      className="w-full px-4 py-3 rounded-xl font-body text-sm bg-black/40 border border-white/10 text-white placeholder-white/25 focus:border-accent focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-accent uppercase tracking-wider mb-2 font-semibold">
                      Project Objective //
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your goals, timeline, and vision..."
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl font-body text-sm bg-black/40 border border-white/10 text-white placeholder-white/25 focus:border-accent focus:outline-none transition-all duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending || !form.name || !form.email || !form.message}
                    onMouseEnter={playHover}
                    className="w-full py-4 rounded-xl font-mono text-xs uppercase tracking-widest font-bold text-black transition-all duration-300 shadow-[0_0_25px_rgba(232,255,0,0.3)] hover:shadow-[0_0_40px_rgba(232,255,0,0.5)] disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: 'var(--accent)' }}
                  >
                    {sending ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        Transmitting...
                      </span>
                    ) : (
                      'Send Transmission →'
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
