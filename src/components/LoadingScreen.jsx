import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  // Professional Loading Flow
  // Phase 1: 0s - 3.5s (Loading animation and progress)
  // Phase 2: 3.5s - 4.3s (Exit crossfade)
  useEffect(() => {
    // End phase 1, trigger the exit after 3.5s
    const timer1 = setTimeout(() => {
      setPhase(2)
      setIsLoading(false)
      onComplete() // Trigger Hero fade-in immediately for crossfade
    }, 3500)

    return () => clearTimeout(timer1)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center overflow-hidden bg-bg-primary"
          exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          key="loading-screen"
        >
          {/* Animated Ambient Background Orbs (kept for premium glassy look) */}
          <motion.div
            className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"
            animate={{
              x: [0, 30, 0],
              y: [0, 40, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] max-w-[700px] max-h-[700px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"
            animate={{
              x: [0, -40, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="absolute inset-0 bg-[#050A12]/60 backdrop-blur-[1px] pointer-events-none" />

          {/* Center Content: Icon & Welcome Text */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-6">

            {/* Elegant Minimalist Geometric Icon */}
            <motion.div
              className="relative w-24 h-24 mb-12 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#3b82f6" opacity="0.3" />
                  </linearGradient>
                </defs>

                {/* Outer Diamond */}
                <motion.path
                  d="M50 5 L95 50 L50 95 L5 50 Z"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />

                {/* Inner Diamond */}
                <motion.path
                  d="M50 25 L75 50 L50 75 L25 50 Z"
                  fill="none"
                  stroke="url(#gradient2)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
                />

                {/* Center Glow Dot */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="4"
                  fill="#60a5fa"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.5, ease: "easeInOut", delay: 0.6, repeat: Infinity }}
                  style={{ filter: "drop-shadow(0 0 8px rgba(96,165,250,0.8))" }}
                />
              </svg>
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <h1
                className="text-2xl md:text-4xl font-semibold tracking-wide"
                style={{
                  color: '#F0F6FF',
                  fontFamily: 'Clash Display, sans-serif',
                }}
              >
                Welcome to my Portfolio
              </h1>
              <p className="text-sm md:text-base tracking-[0.2em] font-medium text-blue-400/80 uppercase">
                Come and Explore
              </p>
            </motion.div>
          </div>

          {/* Bottom Sleek Progress Bar */}
          <div className="relative z-10 w-full max-w-sm px-8 mt-16 flex flex-col items-center">
            <div className="flex justify-between w-full text-[10px] uppercase tracking-[0.3em] text-blue-400/60 mb-3 font-semibold disabled">
              <span>Loading</span>
              <motion.span>
                100%
              </motion.span>
            </div>

            <div className="w-full h-[2px] bg-blue-900/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-400 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}