import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiMail, HiHeart, HiArrowUp } from 'react-icons/hi'
import Magnetic from './Magnetic'

const SOCIAL_COLORS = {
  GitHub: '#e2e8f0',
  LinkedIn: '#0A66C2',
  Email: '#22D3EE',
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socials = [
    { icon: FaGithub, href: personalInfo.socialLinks.github, label: 'GitHub' },
    { icon: FaLinkedin, href: personalInfo.socialLinks.linkedin, label: 'LinkedIn' },
    { icon: HiMail, href: personalInfo.socialLinks.email, label: 'Email' },
  ]

  return (
    <footer className="relative border-t border-glass-border overflow-hidden">
      
      {/* Background Depth Outline Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 select-none opacity-[0.03]">
        <span className="text-[25vw] md:text-[20vw] font-bold whitespace-nowrap" style={{ WebkitTextStroke: '2px var(--accent-primary)', color: 'transparent', fontFamily: 'Clash Display, sans-serif' }}>
          J.V.J.
        </span>
      </div>

      {/* Gradient top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.5), rgba(96,165,250,0.3), transparent)' }}
      />

      {/* Subtle background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Left — Branding + copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-xs font-bold text-white shadow-lg"
              style={{ boxShadow: '0 4px 16px rgba(37,99,235,0.3)' }}
            >
              {personalInfo.initials}
            </div>
            <p className="text-sm text-text-secondary/60">
              © {new Date().getFullYear()} <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{personalInfo.name}</span>. Crafted with{' '}
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} style={{ display: 'inline-block' }}>
                <HiHeart className="inline w-3.5 h-3.5 text-red-400 mx-0.5" />
              </motion.span>{' '}
              and lots of coffee.
            </p>
          </motion.div>

          {/* Center — Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex gap-4"
          >
            {socials.map((social) => (
              <Magnetic key={social.label} boost={1.2}>
                <motion.a
                  href={social.href}
                  target={social.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-text-secondary border border-glass-border transition-all duration-300"
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = SOCIAL_COLORS[social.label]
                    e.currentTarget.style.boxShadow = `0 4px 20px ${SOCIAL_COLORS[social.label]}33`
                    e.currentTarget.querySelector('svg').style.color = SOCIAL_COLORS[social.label]
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = ''
                    e.currentTarget.style.boxShadow = ''
                    e.currentTarget.querySelector('svg').style.color = ''
                  }}
                >
                  <social.icon className="w-4 h-4 transition-colors duration-300 pointer-events-none" />
                </motion.a>
              </Magnetic>
            ))}
          </motion.div>

          {/* Right — Back to Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Magnetic boost={0.8}>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors group p-2"
                aria-label="Back to top"
              >
                <span className="text-xs tracking-wider uppercase font-medium pointer-events-none">Back to Top</span>
                <div className="w-7 h-7 rounded-lg border border-glass-border group-hover:border-blue-primary/40 flex items-center justify-center transition-all group-hover:bg-blue-primary/5 pointer-events-none">
                  <HiArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
                </div>
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
