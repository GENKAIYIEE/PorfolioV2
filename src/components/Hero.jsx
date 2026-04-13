import { motion } from 'framer-motion'
import { useTypewriter } from '../hooks/useCustomHooks'
import { personalInfo, roles } from '../data/portfolioData'
import { HiArrowRight, HiMail } from 'react-icons/hi'
import joaquin from '../assets/joaquin.JPG'

export default function Hero() {
  const typedText = useTypewriter(roles, 100, 60, 2000)

  const scrollToWork = () => {
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[110vh] flex items-center overflow-hidden bg-navy-950"
    >
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-blue-600/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-float pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full pt-20">
        {/* Left Content */}
        <motion.div
<<<<<<< HEAD
          className="order-2 lg:order-1"
=======
>>>>>>> 3b8ece4ebb7d302485de645f1f0c0e4fdbac29af
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6 text-xs font-medium text-blue-300 border-white/20"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Available for new projects
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-2"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >
            Hi, I'm <span className="text-outline">John</span>
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tighter"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >
            Vincent <span className="text-blue-primary">Joaquin</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-white/80 mb-8 h-8 flex items-center"
          >
            <span className="text-white/40 mr-3">A dedicated</span>
            <span className="text-white font-semibold">{typedText}</span>
            <span className="w-1.5 h-6 bg-blue-500 ml-2 animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-base md:text-lg text-white/50 max-w-lg mb-10 leading-relaxed"
          >
            I am a fresh graduate with a Bachelor of Science in Information Technology from the Polytechnic College of La Union (PCLU), ready to turn innovative ideas into reality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center gap-5"
          >
            <motion.button
              onClick={scrollToWork}
              className="btn-primary px-8 py-4 rounded-2xl group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View My Work</span>
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.a
              href="#contact"
              className="btn-outline px-8 py-4 rounded-2xl flex items-center gap-2 border-white/10 text-white hover:bg-white/5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <HiMail className="w-5 h-5" />
              <span>Let's Talk</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
<<<<<<< HEAD
          className="relative order-1 lg:order-2 mb-4 lg:mb-0"
        >
          <div className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[450px] mx-auto lg:ml-auto lg:mr-0">
=======
          className="relative hidden lg:block"
        >
          <div className="relative z-10 w-full max-w-[450px] ml-auto">
>>>>>>> 3b8ece4ebb7d302485de645f1f0c0e4fdbac29af
            {/* Museum Frame Effect */}
            <div className="relative rounded-3xl p-2 bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl shadow-black/50 group">
              <div className="overflow-hidden rounded-2xl relative bg-white">
                <img
                  src={joaquin}
                  alt={personalInfo.name}
                  className="w-full h-auto object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 aspect-[4/5] group-hover:scale-105"
                />

                {/* Subtle Inner Overlay */}
                <div className="absolute inset-0 border border-black/10 rounded-2xl pointer-events-none" />
              </div>
            </div>

            {/* Floating Accents */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-8 w-24 h-24 border-l-2 border-b-2 border-white/40 rounded-bl-3xl pointer-events-none"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -top-6 -right-8 w-24 h-24 border-r-2 border-t-2 border-blue-500/40 rounded-tr-3xl pointer-events-none"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
