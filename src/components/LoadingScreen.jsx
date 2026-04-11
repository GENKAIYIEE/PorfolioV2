import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(onComplete, 800)
    }, 2200)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#0F172A]"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
            <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-white/5 blur-[100px]" />
          </div>

          <div className="relative flex flex-col items-center gap-8">
            {/* Initials */}
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              {/* Spinning ring */}
              <motion.div
                className="absolute inset-[-12px] rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: '#2563eb',
                  borderRightColor: '#ffffff',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center glow-blue">
                <span className="font-clash text-3xl font-bold text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  Hi!
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                John Vincent Joaquin
              </h1>
              <p className="text-sm text-white/60">Loading...</p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-48 h-1 rounded-full bg-navy-800 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #2563eb, #ffffff)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
