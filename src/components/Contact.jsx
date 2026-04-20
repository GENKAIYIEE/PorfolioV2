import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiMail, HiCheck, HiPaperAirplane } from 'react-icons/hi'
import emailjs from '@emailjs/browser'
import Magnetic from './Magnetic'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function FancyInput({ label, id, type = 'text', name, value, onChange, required, isTextarea = false }) {
  const [focused, setFocused] = useState(false)
  
  const baseClass =
    'w-full bg-bg-secondary border border-glass-border rounded-xl p-4 text-text-primary focus:outline-none transition-all duration-300 resize-none'
  const focusedClass = focused
    ? 'border-blue-primary shadow-[0_0_0_3px_rgba(37,99,235,0.1)]'
    : ''

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium uppercase tracking-wider block transition-colors duration-300"
        style={{ color: focused ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
      >
        {label}
      </label>
      <div className="input-fancy">
        {isTextarea ? (
          <textarea
            name={name}
            id={id}
            rows="5"
            value={value}
            onChange={onChange}
            required={required}
            className={`${baseClass} ${focusedClass}`}
            aria-label={label}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        ) : (
          <input
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            className={`${baseClass} ${focusedClass}`}
            aria-label={label}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        )}
      </div>
    </div>
  )
}

export default function Contact() {
  const formRef = useRef()
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  // Background Parallax
  const { scrollYProgress } = useScroll()
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 400])

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setSending(false)
      setSent(true)
      setFormState({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    } catch (error) {
      console.error('Failed to send email:', error.text || error)
      setSending(false)
      alert('Failed to send message. Please check your credentials or try again later.')
    }
  }

  const socialLinks = [
    { icon: FaGithub, href: personalInfo.socialLinks.github, label: 'GitHub', color: '#e2e8f0' },
    { icon: FaLinkedin, href: personalInfo.socialLinks.linkedin, label: 'LinkedIn', color: '#0A66C2' },
    { icon: HiMail, href: personalInfo.socialLinks.email, label: 'Email', color: '#22D3EE' },
  ]

  return (
    <section id="contact" className="relative py-16 md:py-24 overflow-hidden border-t border-glass-border">
      {/* Animated mesh background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(37,99,235,0.08) 0%, transparent 70%)' }}
      />
      <motion.div
        style={{ y: yParallax }}
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-20"
      >
        <div className="w-full h-full rounded-full animate-orb-float-2" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
          <h2 className="section-title mt-3">Get In Touch</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — Quote & Social */}
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col justify-center">
            
            <div className="bg-bg-secondary border border-glass-border rounded-3xl p-8 md:p-10 mb-8 relative overflow-hidden group hover:border-blue-primary/40 transition-colors duration-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.1)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-primary/10 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-[2.5]" />
              <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                Ready to build something{' '}
                <span className="gradient-text-blue" style={{ WebkitTextFillColor: 'transparent' }}>exceptional?</span>
              </h3>
              <p className="text-text-secondary/80 text-lg relative z-10 transition-colors group-hover:text-white">
                Let's turn your ideas into a digital reality.
              </p>
            </div>

            <p className="text-text-secondary text-base leading-relaxed mb-8">
              I'm always interested in hearing about new opportunities, collaborations, or just having
              a chat about technology and design. Feel free to reach out — I'll get back to you as
              soon as possible.
            </p>

            {/* Social Links — Physics Magnetic */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Magnetic key={social.label} boost={1.3}>
                  <motion.a
                    href={social.href}
                    target={social.href.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="group relative w-14 h-14 rounded-2xl glass flex items-center justify-center transition-all"
                    aria-label={social.label}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = social.color
                      e.currentTarget.style.boxShadow = `0 8px 30px ${social.color}33`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = ''
                      e.currentTarget.style.boxShadow = ''
                    }}
                  >
                    <social.icon
                      className="w-6 h-6 text-text-secondary transition-colors duration-300 group-hover:scale-110"
                      style={{ '--hover-color': social.color }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = social.color }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '' }}
                    />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium pointer-events-none"
                      style={{ color: social.color }}>
                      {social.label}
                    </span>
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <FancyInput label="Your Name" id="contact-name" name="name" value={formState.name} onChange={handleChange} required />
              <FancyInput label="Your Email" id="contact-email" type="email" name="email" value={formState.email} onChange={handleChange} required />
              <FancyInput label="Your Message" id="contact-message" name="message" value={formState.message} onChange={handleChange} required isTextarea />

              {/* Submit Magnetic */}
              <Magnetic boost={0.8}>
                <motion.button
                  type="submit"
                  className={`w-full py-4 rounded-2xl font-semibold text-base transition-all flex items-center justify-center gap-2 block ${
                    sent ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' : 'btn-primary'
                  }`}
                  whileHover={!sent ? { scale: 1.01 } : {}}
                  disabled={sending || sent}
                  aria-label="Send message"
                >
                  {sent ? (
                    <>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                        <HiCheck className="w-5 h-5" />
                      </motion.div>
                      <span>Message Sent!</span>
                    </>
                  ) : sending ? (
                    <>
                      <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <HiPaperAirplane className="w-4 h-4 rotate-90" />
                    </>
                  )}
                </motion.button>
              </Magnetic>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
