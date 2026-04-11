import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SCROLL_SPEED = 0.9

// ─── HOW TO PAUSE AUTO-SCROLL FROM ANY COMPONENT ────────────────────────────
// OPTION A – Open the built-in popup (pauses + shows a modal):
//
//   window.dispatchEvent(new CustomEvent('openPopup', {
//     detail: {
//       title: 'My Section Title',
//       content: 'Any text or HTML string to show in the popup body.',
//     }
//   }))
//
// OPTION B – Just pause / resume (for components with their own modal):
//
//   window.dispatchEvent(new Event('pauseAutoScroll'))   // pause
//   window.dispatchEvent(new Event('resumeAutoScroll'))  // resume
//
// Both options are handled automatically by this component.
// ────────────────────────────────────────────────────────────────────────────

export default function AutoScroll() {
  const [isActive, setIsActive] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [reachedBottom, setReachedBottom] = useState(false)
  const [popup, setPopup] = useState(null) // { title, content }

  const rafRef = useRef(null)
  const isActiveRef = useRef(false)
  const pausedForPopupRef = useRef(false)  // true = paused specifically for a popup
  const userScrollTimeout = useRef(null)

  useEffect(() => { isActiveRef.current = isActive }, [isActive])

  // ── Core scroll loop ──────────────────────────────────────────────────────
  const stopScroll = useCallback(() => {
    setIsActive(false)
    isActiveRef.current = false
    cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    clearTimeout(userScrollTimeout.current)
  }, [])

  const scroll = useCallback(() => {
    if (!isActiveRef.current) return
    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2
    if (atBottom) {
      setReachedBottom(true)
      stopScroll()
      return
    }
    window.scrollBy(0, SCROLL_SPEED)
    rafRef.current = requestAnimationFrame(scroll)
  }, [stopScroll])

  const pauseScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }, [])

  const resumeScroll = useCallback(() => {
    // Do NOT resume if a popup is currently open — popup takes full priority
    if (isActiveRef.current && !rafRef.current && !pausedForPopupRef.current) {
      rafRef.current = requestAnimationFrame(scroll)
    }
  }, [scroll])

  const startScroll = useCallback(() => {
    setReachedBottom(false)
    setIsActive(true)
    isActiveRef.current = true
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(scroll)
  }, [scroll])

  const toggleScroll = useCallback(() => {
    if (isActiveRef.current) stopScroll()
    else startScroll()
  }, [stopScroll, startScroll])

  // ── Popup open / close ───────────────────────────────────────────────────
  const openPopup = useCallback((detail) => {
    if (isActiveRef.current) {
      pausedForPopupRef.current = true
      pauseScroll()
    }
    setPopup(detail)
  }, [pauseScroll])

  const closePopup = useCallback(() => {
    setPopup(null)
    if (pausedForPopupRef.current) {
      pausedForPopupRef.current = false
      resumeScroll()
    }
  }, [resumeScroll])

  // ── Listen for the global openPopup event ────────────────────────────────
  useEffect(() => {
    const handler = (e) => openPopup(e.detail)
    window.addEventListener('openPopup', handler)
    return () => window.removeEventListener('openPopup', handler)
  }, [openPopup])

  // ── Listen for generic pause / resume events from ANY component ──────────
  useEffect(() => {
    const handlePause = () => {
      if (isActiveRef.current) {
        pausedForPopupRef.current = true
        pauseScroll()
      }
    }
    const handleResume = () => {
      if (pausedForPopupRef.current) {
        pausedForPopupRef.current = false
        resumeScroll()
      }
    }
    window.addEventListener('pauseAutoScroll', handlePause)
    window.addEventListener('resumeAutoScroll', handleResume)
    return () => {
      window.removeEventListener('pauseAutoScroll', handlePause)
      window.removeEventListener('resumeAutoScroll', handleResume)
    }
  }, [pauseScroll, resumeScroll])

  // ── Pause on manual scroll, resume after user stops ──────────────────────
  useEffect(() => {
    const handleManualScroll = () => {
      if (!isActiveRef.current) return
      pauseScroll()
      clearTimeout(userScrollTimeout.current)
      userScrollTimeout.current = setTimeout(() => {
        // Only resume if not paused by popup and user scrolled away from top
        if (isActiveRef.current && !pausedForPopupRef.current && window.scrollY > 0) {
          resumeScroll()
        }
      }, 1500)
    }

    const handleKeyDown = (e) => {
      const scrollKeys = ['ArrowUp', 'ArrowDown', ' ', 'PageUp', 'PageDown', 'Home', 'End']
      if (scrollKeys.includes(e.key)) handleManualScroll()
    }

    window.addEventListener('wheel', handleManualScroll, { passive: true })
    window.addEventListener('touchmove', handleManualScroll, { passive: true })
    window.addEventListener('keydown', handleKeyDown, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleManualScroll)
      window.removeEventListener('touchmove', handleManualScroll)
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(userScrollTimeout.current)
    }
  }, [pauseScroll, resumeScroll])

  // ── Pause when tab is hidden ─────────────────────────────────────────────
  useEffect(() => {
    const onChange = () => {
      if (document.visibilityState === 'hidden') pauseScroll()
      else if (!pausedForPopupRef.current) resumeScroll()
    }
    window.addEventListener('visibilitychange', onChange)
    return () => window.removeEventListener('visibilitychange', onChange)
  }, [pauseScroll, resumeScroll])

  // ── Cleanup on unmount ───────────────────────────────────────────────────
  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current)
    clearTimeout(userScrollTimeout.current)
  }, [])

  // ── Tooltip label text ───────────────────────────────────────────────────
  const tooltipText = reachedBottom
    ? '✓ End of page'
    : isActive
      ? 'Eye Mode — tap to stop'
      : 'Eye Mode — Auto Scroll'

  return (
    <>
      {/* ── Popup Modal ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {popup && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closePopup}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              background: 'rgba(0, 0, 0, 0.55)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(11, 17, 32, 0.96)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '1rem',
                padding: '2rem',
                maxWidth: '520px',
                width: '100%',
                maxHeight: '75vh',
                overflowY: 'auto',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(255,255,255,0.88)',
                position: 'relative',
              }}
            >
              {/* Title */}
              {popup.title && (
                <h2
                  style={{
                    margin: '0 0 1rem',
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: '#fff',
                    letterSpacing: '-0.01em',
                    paddingRight: '2rem',
                  }}
                >
                  {popup.title}
                </h2>
              )}

              {/* Content */}
              <div
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.72)',
                }}
                dangerouslySetInnerHTML={
                  typeof popup.content === 'string'
                    ? { __html: popup.content }
                    : undefined
                }
              >
                {typeof popup.content !== 'string' ? popup.content : undefined}
              </div>

              {/* Back / Close button */}
              <motion.button
                onClick={closePopup}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  marginTop: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'rgba(37, 99, 235, 0.15)',
                  border: '1px solid rgba(96, 165, 250, 0.35)',
                  borderRadius: '0.55rem',
                  color: '#60a5fa',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                }}
              >
                ← Back
                {pausedForPopupRef.current && (
                  <span style={{ color: 'rgba(96,165,250,0.6)', fontWeight: 400 }}>
                    (resumes scroll)
                  </span>
                )}
              </motion.button>

              {/* X close icon (top-right) */}
              <button
                onClick={closePopup}
                aria-label="Close popup"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: '1.1rem',
                  lineHeight: 1,
                  padding: '4px',
                }}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Eye Button ──────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.5rem',
        }}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{
                background: 'rgba(11, 17, 32, 0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '0.6rem',
                padding: '0.4rem 0.85rem',
                fontSize: '0.72rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                color: isActive ? '#60a5fa' : 'rgba(255,255,255,0.7)',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
              }}
            >
              {tooltipText}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button */}
        <motion.button
          id="auto-scroll-btn"
          aria-label={isActive ? 'Stop auto scroll' : 'Start eye mode auto scroll'}
          onClick={toggleScroll}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2, ease: 'easeOut' }}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: isActive
              ? '1.5px solid rgba(96, 165, 250, 0.7)'
              : '1.5px solid rgba(255,255,255,0.15)',
            background: isActive
              ? 'rgba(37, 99, 235, 0.18)'
              : 'rgba(11, 17, 32, 0.78)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isActive
              ? '0 0 22px rgba(37,99,235,0.45), 0 0 50px rgba(37,99,235,0.15)'
              : '0 4px 20px rgba(0,0,0,0.4)',
            transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
            position: 'relative',
          }}
        >
          {isActive ? <EyeOpenIcon /> : <EyeClosedIcon />}

          {isActive && (
            <motion.span
              style={{
                position: 'absolute',
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: '1.5px solid rgba(37,99,235,0.5)',
                pointerEvents: 'none',
              }}
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </motion.button>
      </div>
    </>
  )
}

// ── Icons ────────────────────────────────────────────────────────────────────
function EyeOpenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
      fill="none" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <motion.g
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" fill="rgba(37,99,235,0.4)" />
      </motion.g>
    </svg>
  )
}

function EyeClosedIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
      fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}
