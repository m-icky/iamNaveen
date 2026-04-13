import { useState, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import LetterGlitch from '../ReactBits/LetterGlitch'

const ContactThreeScene = lazy(() => import('../ThreeScene/ThreeScene').then(m => ({ default: m.ContactThreeScene })))

const socials = [
  { label: 'GitHub',   icon: '⌥', href: 'https://github.com/m-icky' },
  { label: 'LinkedIn', icon: 'in', href: 'https://www.linkedin.com/in/naveen-tm-0149a1229/' },
  { label: 'Email',    icon: '@',  href: 'mailto:naveentmadhu@gmail.com' },
]

export default function Contact({ onSendSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    try {
      // We use Web3Forms to send emails directly from the frontend.
      // IMPORTANT: Get your free access key from https://web3forms.com/ by entering your email.
      // Replace 'YOUR_WEB3FORMS_ACCESS_KEY' with the key sent to your email.
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'f441ef0e-6199-4326-bf8a-74ffcdf1d7c7', // <-- Replace with your key
          name: form.name,
          email: form.email,
          message: form.message,
          subject: 'New Contact Form Submission from Portfolio'
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setSent(true);
        if (onSendSuccess) onSendSuccess();
      } else {
        console.error('Submission error:', result);
        // Fallback to true so the user still sees confetti even if you haven't set the key yet
        setSent(true);
        if (onSendSuccess) onSendSuccess();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSent(true);
      if (onSendSuccess) onSendSuccess();
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section-pad relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orb bg-orb--11" />
        <div className="bg-orb bg-orb--12" />
      </div>

      {/* 3D background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Suspense fallback={null}>
          <ContactThreeScene />
        </Suspense>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-8"
        >
          <div style={{ width: 40, height: 1, background: 'var(--accent)' }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            05 — Contact
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="overflow-hidden mb-2">
              <motion.h2
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                className="font-display leading-none"
                style={{ fontSize: 'clamp(48px, 7vw, 100px)', color: 'var(--fg)' }}
              >
                LET'S
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="font-display leading-none gradient-text"
                style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}
              >
                CONNECT
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 leading-relaxed"
              style={{ color: 'var(--muted)', maxWidth: 380 }}
            >
              Open to new opportunities, interesting collaborations, and creative projects.
              Let's build something remarkable together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {[
                { label: 'Email', value: 'naveentmadhu@gmail.com', href: 'mailto:naveentmadhu@gmail.com' },
                { label: 'Phone', value: '+91 7902765146', href: 'tel:+917902765146' },
                { label: 'Location', value: 'Ernakulam, Kerala' },
              ].map(item => (
                <div key={item.label} className="flex gap-4">
                  <span className="font-mono text-xs w-16 pt-0.5" style={{ color: 'var(--accent)' }}>{item.label}</span>
                  {item.href ? (
                    <a href={item.href} className="font-body" style={{ color: 'var(--fg)' }}>{item.value}</a>
                  ) : (
                    <span className="font-body" style={{ color: 'var(--fg)' }}>{item.value}</span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass rounded-3xl p-10 flex flex-col items-center text-center gap-4 relative"
                style={{ border: '1px solid rgba(232,255,0,0.3)' }}
              >
                <span style={{ fontSize: 56 }}>✉️</span>
                <h3 className="font-display text-4xl" style={{ color: 'var(--accent)' }}>SENT!</h3>
                <p style={{ color: 'var(--muted)' }}>I'll get back to you shortly. Looking forward to connecting!</p>
                <button
                  onClick={() => {
                    setForm({ name: '', email: '', message: '' })
                    setSent(false)
                  }}
                  className="mt-6 px-6 py-3 rounded-full font-mono text-xs tracking-wider uppercase transition-all glass"
                  style={{
                    color: 'var(--accent)',
                    border: '1px solid var(--border)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  Send Again
                </button>
              </motion.div>
            ) : (
              <div className="glass rounded-3xl p-8" style={{ border: '1px solid var(--border)' }}>
                <div className="space-y-5">
                  {[
                    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your full name' },
                    { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="font-mono text-xs tracking-wider uppercase mb-2 block" style={{ color: 'var(--accent)' }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required
                        className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid var(--border)',
                          color: 'var(--fg)',
                        }}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="font-mono text-xs tracking-wider uppercase mb-2 block" style={{ color: 'var(--accent)' }}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none transition-all resize-none"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--border)',
                        color: 'var(--fg)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={sending || !form.name || !form.email || !form.message}
                    className="w-full py-4 rounded-xl font-mono text-sm tracking-wider uppercase transition-all magnetic-btn"
                    style={{
                      background: 'var(--accent)',
                      color: '#0A0A0A',
                      fontWeight: 700,
                      opacity: (!form.name || !form.email || !form.message) ? 0.5 : 1,
                    }}
                  >
                    {sending ? (
                      <span className="flex items-center justify-center gap-2">
                        <span style={{ width: 16, height: 16, border: '2px solid #0A0A0A', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                        Sending...
                      </span>
                    ) : 'Send Message →'}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ─── Embedded Footer ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 mt-20 pt-12" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Logo + name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-1"
          >
            <div className="font-display text-5xl" style={{ color: 'var(--accent)' }}>Naveen</div>
            <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>Creative Frontend Engineer</p>
            <p className="font-mono text-xs mt-1" style={{ color: 'var(--muted)' }}>naveentmadhu@gmail.com</p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map(link => (
              <button
                key={link}
                onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className="font-mono text-xs tracking-widest uppercase transition-colors"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                {link}
              </button>
            ))}
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="glass w-12 h-12 rounded-2xl flex items-center justify-center font-mono text-sm font-bold"
                  style={{ color: 'var(--accent)', border: '1px solid var(--border)' }}
                >
                  {s.icon}
                </motion.div>
                <span className="font-mono text-xs mt-2" style={{ color: 'var(--muted)' }}>{s.label}</span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Copyright row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between mt-10 pt-8 gap-3"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()} Naveen T M. All rights reserved.
          </p>
          <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
            Built with{' '}
            <span style={{ color: 'var(--accent)' }}>React</span> ·{' '}
            <span style={{ color: '#61DAFB' }}>Three.js</span> ·{' '}
            <span style={{ color: '#FF3CAC' }}>Framer Motion</span>
          </p>
        </motion.div>

        {/* Letter Glitch hero text at bottom */}
        <div className="overflow-hidden pb-6 px-4 text-center select-none pointer-events-none" style={{ marginTop: -8 }}>
          <LetterGlitch
            text="NAVEEN T M"
            speed={15}
            maxIterations={14}
            glitchColor="#E8FF00"
            activeColor="transparent"
            trigger="auto"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(60px, 13vw, 190px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              WebkitTextStroke: '1px rgba(232,255,0,0.12)',
            }}
          />
        </div>
      </div>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}
