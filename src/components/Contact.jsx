import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiMail, HiCheck, HiPaperAirplane } from 'react-icons/hi'
import emailjs from '@emailjs/browser'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Contact() {
  const formRef = useRef()
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

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
    {
      icon: FaGithub,
      href: personalInfo.socialLinks.github,
      label: 'GitHub',
      color: '#ffffff',
    },
    {
      icon: FaLinkedin,
      href: personalInfo.socialLinks.linkedin,
      label: 'LinkedIn',
      color: '#0A66C2',
    },
    {
      icon: HiMail,
      href: personalInfo.socialLinks.email,
      label: 'Email',
      color: '#22D3EE',
    },
  ]

  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden border-t border-glass-border">

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-text-secondary text-sm font-medium uppercase tracking-widest mb-3 block">
            Let's Connect
          </span>
          <h2 className="section-title">Get In Touch</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side - Quote and social */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="bg-bg-secondary border border-glass-border rounded-3xl p-8 md:p-10 mb-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-primary/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
              <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                Ready to build something <span className="text-blue-primary">exceptional?</span>
              </h3>
              <p className="text-text-secondary/80 text-lg">
                Let's turn your ideas into a digital reality.
              </p>
            </div>

            <p className="text-text-secondary text-base leading-relaxed mb-8">
              I'm always interested in hearing about new opportunities,
              collaborations, or just having a chat about technology and design.
              Feel free to reach out — I'll get back to you as soon as possible.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 rounded-2xl glass flex items-center justify-center transition-all hover:border-blue-primary/40"
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 text-text-secondary group-hover:text-blue-primary transition-colors" />
                  {/* Tooltip */}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-blue-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm font-medium text-text-secondary uppercase tracking-wider block">Your Name</label>
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-bg-secondary border border-glass-border rounded-xl p-4 text-text-primary focus:outline-none focus:border-blue-primary transition-colors"
                  aria-label="Your name"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-sm font-medium text-text-secondary uppercase tracking-wider block">Your Email</label>
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-bg-secondary border border-glass-border rounded-xl p-4 text-text-primary focus:outline-none focus:border-blue-primary transition-colors"
                  aria-label="Your email"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm font-medium text-text-secondary uppercase tracking-wider block">Your Message</label>
                <textarea
                  name="message"
                  id="contact-message"
                  rows="5"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-bg-secondary border border-glass-border rounded-xl p-4 text-text-primary focus:outline-none focus:border-blue-primary transition-colors resize-none"
                  aria-label="Your message"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className={`w-full py-4 rounded-2xl font-semibold text-base transition-all flex items-center justify-center gap-2 ${
                  sent
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                    : 'btn-primary'
                }`}
                whileHover={!sent ? { scale: 1.02 } : {}}
                whileTap={!sent ? { scale: 0.98 } : {}}
                disabled={sending || sent}
                aria-label="Send message"
              >
                {sent ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      <HiCheck className="w-5 h-5" />
                    </motion.div>
                    <span>Message Sent!</span>
                  </>
                ) : sending ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <HiPaperAirplane className="w-4 h-4 rotate-90" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
