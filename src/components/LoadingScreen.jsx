import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FULL_NAME = 'Welcome To My Portfolio'
const TAGLINE = 'Come & View'

// 1. Logic for Scrambled Matrix-Style text decoding
function ScrambleText({ text, startDelay = 0 }) {
  const [displayText, setDisplayText] = useState('')
  const [started, setStarted] = useState(false)
  const chars = '!@#$%^&*()<>{}[]/|+=?'

  useEffect(() => {
    let timeout
    let interval
    let iteration = 0
    const maxIterations = text.length

    timeout = setTimeout(() => {
      setStarted(true)
      interval = setInterval(() => {
        setDisplayText(
          text.split('').map((letter, index) => {
            if (index < Math.floor(iteration)) {
              return letter
            }
            if (letter === ' ') return ' '
            return chars[Math.floor(Math.random() * chars.length)]
          }).join('')
        )

        if (iteration >= maxIterations) {
          clearInterval(interval)
          setDisplayText(text)
        }
        iteration += 1 / 3 // Smooth resolve speed
      }, 40)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, startDelay])

  return (
    <span className="font-mono tracking-tight font-semibold">
      {started ? displayText : ''}
    </span>
  )
}

function useAnimatedCount(target, duration = 3000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return count
}

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [showLetters, setShowLetters] = useState(false)
  const [showTagline, setShowTagline] = useState(false)
  const count = useAnimatedCount(100, 4000)

  useEffect(() => {
    // Advanced staggered initialization
    const t1 = setTimeout(() => setShowLetters(true), 600)
    const t2 = setTimeout(() => setShowTagline(true), 1500)
    const t3 = setTimeout(() => {
      setPhase(2)
      setIsLoading(false)
      onComplete()
    }, 4500) // Give the decoding complete time to shine

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center overflow-hidden bg-bg-primary"
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          key="loading-screen"
        >
          {/* Soft Ambient Glowing Orbs */}
          <motion.div
            className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none mix-blend-screen"
            animate={{ x: [0, 50, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
             className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] max-w-[700px] max-h-[700px] bg-indigo-600/15 rounded-full blur-[150px] pointer-events-none mix-blend-screen"
             animate={{ x: [0, -60, 0], y: [0, -40, 0], scale: [1, 1.3, 1] }}
             transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <div className="absolute inset-0 bg-bg-primary/50 backdrop-blur-3xl pointer-events-none" />

          {/* Center Content */}
          <div className="relative z-30 flex flex-col items-center justify-center w-full max-w-3xl px-6">

            {/* Elegant Geometric Rings */}
            <motion.div
              className="relative w-28 h-28 mb-10 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >

              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible absolute inset-0">
                <defs>
                  <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="g2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                {/* Outer diamond — slow rotation */}
                <motion.path
                  d="M50 5 L95 50 L50 95 L5 50 Z"
                  fill="none"
                  stroke="url(#g1)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0, rotate: 0 }}
                  animate={{ pathLength: 1, opacity: 1, rotate: 360 }}
                  transition={{ pathLength: { duration: 2, ease: 'easeInOut' }, opacity: { duration: 0.5 }, rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}
                  style={{ transformOrigin: '50px 50px' }}
                />
                {/* Middle Hexagon */}
                <motion.path
                  d="M50 15 L80 32 L80 68 L50 85 L20 68 L20 32 Z"
                  fill="rgba(59,130,246,0.05)"
                  stroke="url(#g2)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0, rotate: 0 }}
                  animate={{ pathLength: 1, opacity: 1, rotate: -360 }}
                  transition={{ pathLength: { duration: 2, ease: 'easeInOut', delay: 0.2 }, opacity: { duration: 0.5, delay: 0.2 }, rotate: { duration: 12, repeat: Infinity, ease: 'linear' } }}
                  style={{ transformOrigin: '50px 50px' }}
                />
                {/* Inner diamond — fast rotation */}
                <motion.path
                  d="M50 35 L65 50 L50 65 L35 50 Z"
                  fill="rgba(96,165,250,0.1)"
                  stroke="rgba(96,165,250,0.8)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0, rotate: 0 }}
                  animate={{ pathLength: 1, opacity: 1, rotate: 360 }}
                  transition={{ pathLength: { duration: 2, ease: 'easeInOut', delay: 0.4 }, opacity: { duration: 0.5, delay: 0.4 }, rotate: { duration: 6, repeat: Infinity, ease: 'linear' } }}
                  style={{ transformOrigin: '50px 50px' }}
                />
                {/* Center glowing eye */}
                <motion.circle
                  cx="50" cy="50" r="4"
                  fill="#fff"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 2, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.6, repeat: Infinity }}
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,1))' }}
                />
              </svg>
            </motion.div>

            {/* Title — Matrix Decode Reveal */}
            <div className="flex justify-center mb-4 min-h-[3rem]">
               <motion.h1 
                  layout
                  className="text-2xl md:text-5xl tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-300"
                  style={{ textShadow: '0 0 40px rgba(59,130,246,0.5)' }}
               >
                  <ScrambleText text={FULL_NAME} startDelay={600} />
               </motion.h1>
            </div>

            {/* Tagline — Smooth Slide */}
            <div className="min-h-[1.5rem]">
              <AnimatePresence>
                {showTagline && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-px bg-blue-500/50" />
                    <p className="text-sm md:text-base tracking-[0.3em] font-medium uppercase text-blue-300/80">
                      {TAGLINE}
                    </p>
                    <div className="w-8 h-px bg-blue-500/50" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* High-Tech Progress Bar System */}
          <div className="relative z-30 w-full max-w-md px-8 mt-16 flex flex-col items-center gap-4">
            
            <div className="flex justify-between w-full text-[10px] md:text-xs uppercase tracking-[0.4em] font-black text-blue-400/60 font-mono">
              <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                System_Boot
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              >
                {String(count).padStart(3, '0')}%
              </motion.span>
            </div>

            {/* Segmented Loading Track */}
            <div className="relative w-full h-[3px] bg-[#0f172a] rounded-full overflow-hidden border border-white/5">
              
              {/* Moving data stream back-layer */}
              <motion.div 
                 className="absolute top-0 bottom-0 w-24 bg-blue-500/20 blur-md"
                 animate={{ left: ['-20%', '120%'] }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Main Fill */}
              <motion.div
                className="absolute top-0 left-0 bottom-0 rounded-full shadow-[0_0_15px_#3b82f6]"
                style={{ background: 'linear-gradient(90deg, #3b82f6, #818cf8, #c084fc)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4.5, ease: [0.65, 0, 0.35, 1] }} // Syncs closely with total lock time
              />
            </div>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  )
}