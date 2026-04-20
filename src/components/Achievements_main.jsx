import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { achievements } from '../data/portfolioData'
import { HiStar, HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { HiTrophy } from 'react-icons/hi2'

const popUp = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 130, damping: 16, mass: 1 },
  },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export default function Achievements() {
  const [selectedIdx, setSelectedIdx] = useState(null)
  const prevFocusRef = useRef(null)
  const closeBtnRef = useRef(null)
  const selected = selectedIdx !== null ? achievements[selectedIdx] : null

  const closeModal = useCallback(() => {
    if (window.history.state?.certificateModal) window.history.back()
    else setSelectedIdx(null)
  }, [])

  const goPrev = useCallback(() => {
    setSelectedIdx((i) => (i > 0 ? i - 1 : achievements.length - 1))
  }, [])

  const goNext = useCallback(() => {
    setSelectedIdx((i) => (i < achievements.length - 1 ? i + 1 : 0))
  }, [])

  useEffect(() => {
    window.dispatchEvent(new Event(selectedIdx !== null ? 'pauseAutoScroll' : 'resumeAutoScroll'))
  }, [selectedIdx])

  useEffect(() => {
    if (selectedIdx === null) return
    prevFocusRef.current = document.activeElement
    try { window.history.pushState({ certificateModal: true }, '', window.location.href) } catch (e) {}
    setTimeout(() => closeBtnRef.current?.focus(), 0)
    const handlePop = (e) => { if (!e.state?.certificateModal) setSelectedIdx(null) }
    window.addEventListener('popstate', handlePop)
    return () => { window.removeEventListener('popstate', handlePop); try { prevFocusRef.current?.focus?.() } catch (e) {} }
  }, [selectedIdx])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    if (selectedIdx !== null) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIdx, closeModal, goPrev, goNext])

  return (
    <>
      <section id="achievements" className="relative py-28 md:py-36 overflow-hidden border-t border-glass-border">
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(ellipse, var(--accent-primary) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <span className="section-badge mb-4">Recognition &amp; Growth</span>
            <h2 className="section-title mt-3">Achievements &amp; Certifications</h2>
            <p className="text-text-secondary mt-5 max-w-xl text-sm leading-relaxed">
              A curated record of academic honors, competitive recognitions, and professional milestones.
            </p>

            {/* Trophy counter */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-yellow-500/20"
              style={{ background: 'rgba(234,179,8,0.05)' }}
            >
              <HiTrophy className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest">
                {achievements.length} Achievements Unlocked
              </span>
            </motion.div>
          </motion.div>

          {/* Achievement Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {achievements.map((item, i) => (
              <FeaturedCard key={item.title} item={item} index={i} onOpen={() => setSelectedIdx(i)} />
            ))}
          </motion.div>

          {/* Bottom hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-primary/50" />
            <span className="text-text-secondary/40 text-xs tracking-wide">
              Click any card to view · Use ← → to navigate
            </span>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
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
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            <motion.div
              className="relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden"
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cert-title"
              style={{
                background: 'linear-gradient(135deg, rgba(10,20,50,0.97) 0%, rgba(5,10,30,0.99) 100%)',
                border: '1px solid rgba(37,99,235,0.3)',
                boxShadow: '0 0 80px rgba(37,99,235,0.15), 0 40px 80px rgba(0,0,0,0.5)',
              }}
            >
              {/* Spinning border accent */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none animate-border-spin"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0deg, rgba(37,99,235,0.25) 40deg, transparent 80deg, transparent 360deg)',
                  zIndex: 0,
                }}
              />

              {/* Close */}
              <button
                ref={closeBtnRef}
                className="absolute top-4 right-4 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors border border-white/10"
                onClick={closeModal}
                aria-label="Close preview"
              >
                <HiX className="w-5 h-5 text-white" />
              </button>

              {/* Prev / Next navigation */}
              <button
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-blue-primary/30 border border-white/10 transition-colors"
                aria-label="Previous achievement"
              >
                <HiChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext() }}
                className="absolute right-14 top-1/2 -translate-y-1/2 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-blue-primary/30 border border-white/10 transition-colors"
                aria-label="Next achievement"
              >
                <HiChevronRight className="w-5 h-5 text-white" />
              </button>

              {/* Image — pop animation keyed on selectedIdx */}
              <div className="relative w-full bg-[#060d1f] overflow-hidden flex items-center justify-center" style={{ minHeight: '180px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIdx}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    {selected.image ? (
                      <img
                        src={selected.image}
                        alt={selected.title}
                        className="w-full h-auto object-contain"
                        style={{ maxHeight: '60vh' }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 gap-3 text-white/20">
                        <HiTrophy className="w-14 h-14" />
                        <span className="text-sm tracking-widest uppercase">Coming Soon</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#060d1f] to-transparent pointer-events-none" />
              </div>

              {/* Info */}
              <div className="p-7 relative z-10">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{selected.icon}</span>
                  <div>
                    <h3 id="cert-title" className="text-xl font-bold text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                      {selected.title}
                    </h3>
                    <p className="text-blue-400 text-sm font-medium">{selected.org}</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mt-3">{selected.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-white/30 text-xs font-mono">{selected.year}</span>
                  <div className="flex items-center gap-3">
                    {/* Index indicator */}
                    <span className="text-white/20 text-xs font-mono">
                      {selectedIdx + 1} / {achievements.length}
                    </span>
                    {selected.featured && (
                      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-yellow-400">
                        <HiStar className="w-3.5 h-3.5" /> Elite
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Featured Card ── */
function FeaturedCard({ item, index, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={popUp}
      className="group cursor-pointer"
      onClick={onOpen}
      whileHover={{ scale: 1.025, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative rounded-2xl overflow-hidden h-full flex flex-col shimmer-card"
        style={{
          background: 'linear-gradient(135deg, rgba(15,26,64,0.9) 0%, rgba(7,14,38,0.95) 100%)',
          border: '1px solid rgba(37,99,235,0.2)',
          boxShadow: hovered
            ? '0 0 40px rgba(37,99,235,0.2), 0 20px 50px rgba(0,0,0,0.3)'
            : '0 0 0 0 rgba(37,99,235,0)',
          transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
          borderColor: hovered ? 'rgba(37,99,235,0.5)' : 'rgba(37,99,235,0.2)',
        }}
      >
        {/* Image Strip */}
        <div className="relative w-full aspect-video overflow-hidden bg-[#040c24]">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              style={{ filter: hovered ? 'grayscale(0%)' : 'grayscale(10%)' }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <HiTrophy className="w-10 h-10 text-white/10" />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#070e26] to-transparent" />
          {item.featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/25 text-[9px] font-bold text-yellow-300 uppercase tracking-widest backdrop-blur-md">
              <HiStar className="w-3 h-3" /> Featured
            </div>
          )}
          {/* View CTA — slides up from below */}
          <div
            className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-4 transition-all duration-300"
            style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(12px)' }}
          >
            <span className="text-white text-xs font-semibold bg-blue-600/80 backdrop-blur-sm px-4 py-2 rounded-full">
              {item.label || 'View Details'} →
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{item.icon}</span>
            <h3
              className="text-base font-bold text-white group-hover:text-blue-300 transition-colors"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              {item.title}
            </h3>
          </div>
          <p className="text-blue-400/70 text-xs font-medium">{item.org}</p>
          <p className="text-white/45 text-xs leading-relaxed mt-1 line-clamp-3">{item.description}</p>
          <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-white/30 text-[10px] font-mono">{item.year}</span>
            <span
              className="text-[10px] transition-colors duration-300"
              style={{ color: hovered ? 'rgba(96,165,250,0.8)' : 'rgba(96,165,250,0)' }}
            >
              Click to view →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
