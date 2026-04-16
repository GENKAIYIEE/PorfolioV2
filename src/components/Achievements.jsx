import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { achievements } from '../data/portfolioData'
import { HiStar, HiX, HiExternalLink } from 'react-icons/hi'
import { HiTrophy } from 'react-icons/hi2'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  visible: {
    transition: { staggerChildren: 0.09 },
  },
}

const featured = achievements.filter((a) => a.featured)
const others = achievements.filter((a) => !a.featured)

export default function Achievements() {
  const [selected, setSelected] = useState(null)
  const prevFocusRef = useRef(null)
  const closeBtnRef = useRef(null)

  const closeModal = useCallback(() => {
    if (window.history.state?.certificateModal) {
      window.history.back()
    } else {
      setSelected(null)
    }
  }, [])

  // Pause auto-scroll when a certificate is being viewed
  useEffect(() => {
    if (selected) {
      window.dispatchEvent(new Event('pauseAutoScroll'))
    } else {
      window.dispatchEvent(new Event('resumeAutoScroll'))
    }
  }, [selected])

  // Push history state when the certificate modal opens so the mobile back button closes it
  useEffect(() => {
    if (!selected) return

    prevFocusRef.current = document.activeElement

    try {
      window.history.pushState({ certificateModal: true }, '', window.location.href)
    } catch (e) {}

    // focus close button
    setTimeout(() => closeBtnRef.current?.focus(), 0)

    const handlePopState = (event) => {
      if (!event.state?.certificateModal) {
        setSelected(null)
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      try {
        prevFocusRef.current?.focus?.()
      } catch (e) {}
    }
  }, [selected])

  // Close certificate modal with Escape key for accessibility
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    if (selected) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, closeModal])

  return (
    <>
      <section id="achievements" className="relative py-28 md:py-36 overflow-hidden border-t border-glass-border">
        {/* Ambient background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none dark:opacity-10 opacity-30"
          style={{
            background: 'radial-gradient(ellipse, var(--accent-primary) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-blue-primary text-sm font-semibold uppercase tracking-widest mb-3 block">
              Recognition &amp; Growth
            </span>
            <h2 className="section-title">Achievements &amp; Certifications</h2>
            <p className="text-text-secondary mt-3 max-w-xl text-sm leading-relaxed">
              A curated record of academic honors, competitive recognitions, and professional milestones earned throughout my journey in Information Technology.
            </p>
          </motion.div>

          {/* ── ALL ACHIEVEMENTS ── */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {achievements.map((item, i) => (
              <FeaturedCard key={item.title} item={item} index={i} onOpen={() => setSelected(item)} />
            ))}
          </motion.div>


        </div>
      </section>

      {/* ── CERTIFICATE LIGHTBOX ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            role="presentation"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            <motion.div
              className="bg-bg-secondary border border-glass-border shadow-2xl relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden"
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="certificate-title"
              style={{
                boxShadow: '0 0 60px rgba(37,99,235,0.1), 0 40px 80px rgba(0,0,0,0.2)',
              }}
            >
              {/* Close */}
              <button
                ref={closeBtnRef}
                className="absolute top-4 right-4 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-glass-bg hover:bg-glass-border transition-colors border border-glass-border ring-1 ring-white/10"
                onClick={closeModal}
                aria-label={`Close ${selected.title} preview`}
              >
                <HiX className="w-5 h-5 text-text-primary" />
              </button>

              {/* Certificate Image */}
              <div className="relative w-full bg-bg-primary overflow-hidden flex items-center justify-center"
                style={{ minHeight: '180px' }}
              >
                {selected.image ? (
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: '65vh' }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-text-secondary/20">
                    <HiTrophy className="w-14 h-14" />
                    <span className="text-sm tracking-widest uppercase">Content Coming Soon</span>
                  </div>
                )}
                {/* Gradient overlay bottom */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />
              </div>

              {/* Info */}
              <div className="p-7">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{selected.icon}</span>
                  <div>
                    <h3 id="certificate-title" className="text-xl font-bold text-text-primary" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                      {selected.title}
                    </h3>
                    <p className="text-blue-primary text-sm font-semibold">{selected.org}</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mt-3">{selected.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-text-secondary/40 text-xs font-mono">{selected.year}</span>
                  {selected.featured && (
                    <span className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-yellow-500">
                      <HiStar className="w-3.5 h-3.5" /> Elite Recognition
                    </span>
                  )}
                </div>

                {/* Footer button removed: modal closes via top X or system back */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Featured Card ─────────────────────────────── */
function FeaturedCard({ item, index, onOpen }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group cursor-pointer"
      onClick={onOpen}
    >
      <div
        className="relative rounded-2xl overflow-hidden h-full flex flex-col glass-card"
        style={{
          boxShadow: '0 0 0 0 rgba(37,99,235,0)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--edu-college-border)'
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(37,99,235,0.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--glass-border)'
          e.currentTarget.style.boxShadow = '0 0 0 0 rgba(37,99,235,0)'
        }}
      >
        {/* Certificate Image Strip */}
        <div className="relative w-full aspect-video overflow-hidden bg-[#040c24]">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <HiTrophy className="w-10 h-10 text-white/10" />
            </div>
          )}
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg-secondary/40 to-transparent" />
          {/* Badge */}
          {item.featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/25 text-[9px] font-bold text-yellow-600 dark:text-yellow-300 uppercase tracking-widest backdrop-blur-md">
              <HiStar className="w-3 h-3" /> Featured
            </div>
          )}
          {/* View CTA */}
          <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-white text-xs font-semibold bg-blue-600/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-1.5">
              <HiExternalLink className="w-3.5 h-3.5" /> {item.label || 'View Details'}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{item.icon}</span>
            <h3
              className="text-base font-bold text-text-primary group-hover:text-blue-primary transition-colors"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              {item.title}
            </h3>
          </div>
          <p className="text-blue-primary/70 text-xs font-semibold">{item.org}</p>
          <p className="text-text-secondary text-xs leading-relaxed mt-1 line-clamp-3">{item.description}</p>
          <div className="mt-auto pt-3 border-t border-glass-border flex items-center justify-between">
            <span className="text-text-secondary/40 text-[10px] font-mono">{item.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Secondary Card ─────────────────────────────── */
function SecondaryCard({ item, index, onOpen }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group cursor-pointer"
      onClick={onOpen}
    >
      <div
        className="relative rounded-xl p-5 h-full flex gap-4 glass-card"
        style={{
          transition: 'border-color 0.3s, background 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--edu-college-border)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--glass-border)'
        }}
      >
        {/* Thumbnail */}
        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#040c24] border border-white/5">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-2xl">
              {item.icon}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <h3
            className="text-sm font-bold text-text-primary group-hover:text-blue-primary transition-colors leading-snug truncate"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >
            {item.title}
          </h3>
          <p className="text-text-secondary/60 text-xs">{item.org}</p>
          <p className="text-text-secondary text-xs leading-relaxed mt-1 line-clamp-2">{item.description}</p>
          <div className="mt-auto pt-2 flex items-center justify-between">
            <span className="text-text-secondary/40 text-[9px] font-mono">{item.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
