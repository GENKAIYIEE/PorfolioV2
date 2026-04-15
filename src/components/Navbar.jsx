import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollProgress, useActiveSection } from '../hooks/useCustomHooks'
import { navLinks, personalInfo } from '../data/portfolioData'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

export default function Navbar() {
  const progress = useScrollProgress()
  const activeSection = useActiveSection(navLinks.map((l) => l.id))
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      window.dispatchEvent(new Event('pauseAutoScroll'))
    } else {
      document.body.style.overflow = ''
      window.dispatchEvent(new Event('resumeAutoScroll'))
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-strong py-3' : 'py-5 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-1 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Go to top"
          >
            <span
              className="text-2xl font-bold tracking-tighter text-text-primary"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              John<span className="text-blue-primary">.</span>
            </span>
          </motion.button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.filter((l) => l.id !== 'hero').map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="relative px-4 py-2 text-sm font-medium transition-colors rounded-lg"
                style={{
                  color: activeSection === link.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
                aria-label={`Navigate to ${link.label}`}
              >
                <span className="relative z-10">{link.label}</span>
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'var(--selection-bg)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full"
                    style={{ background: 'linear-gradient(90deg, #2563eb, #ffffff)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl glass"
              onClick={() => setMobileMenuOpen(true)}
              whileTap={{ scale: 0.9 }}
              aria-label="Open menu"
            >
              <HiMenuAlt3 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[280px] z-[70] glass-strong flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-end p-5">
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl glass"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <HiX className="w-5 h-5" />
                </motion.button>
              </div>
              <nav className="flex flex-col gap-1 px-5">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left px-4 py-3 rounded-xl text-base font-medium transition-all"
                    style={{
                      color: activeSection === link.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                      background: activeSection === link.id ? 'var(--selection-bg)' : 'transparent',
                    }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    aria-label={`Navigate to ${link.label}`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>
              <div className="mt-auto p-5 border-t border-glass-border">
                <p className="text-xs text-text-secondary text-center">© {new Date().getFullYear()} {personalInfo.name}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
