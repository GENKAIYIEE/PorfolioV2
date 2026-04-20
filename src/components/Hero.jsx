import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTypewriter } from '../hooks/useCustomHooks'
import { personalInfo, roles } from '../data/portfolioData'
import { HiArrowRight, HiMail, HiChevronDown } from 'react-icons/hi'
import Magnetic from './Magnetic'
import joaquin from '../assets/joaquin.JPG'

// Physics particles logic
const NUM_PARTICLES = 40
const generateParticles = () => Array.from({ length: NUM_PARTICLES }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  color: i % 3 === 0 ? 'rgba(37,99,235,0.8)' : i % 3 === 1 ? 'rgba(96,165,250,0.6)' : 'rgba(139,92,246,0.5)',
  baseVx: (Math.random() - 0.5) * 0.05,
  baseVy: (Math.random() - 0.5) * 0.05,
}))

function InteractiveParticles() {
  const canvasRef = useRef(null)
  const particlesRef = useRef(generateParticles())
  const mouse = useRef({ x: -1000, y: -1000 })
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    // Resize handler
    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    // Track mouse safely
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
    const handleMouseLeave = () => { mouse.current = { x: -1000, y: -1000 } }
    
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    const particles = particlesRef.current

    // Physics Loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouse.current

      particles.forEach(p => {
        // Core float movement
        p.x += p.baseVx
        p.y += p.baseVy

        // Wrap around edges
        if (p.x < 0) p.x = 100
        if (p.x > 100) p.x = 0
        if (p.y < 0) p.y = 100
        if (p.y > 100) p.y = 0

        // Real pixel coords for math
        const px = (p.x / 100) * canvas.width
        const py = (p.y / 100) * canvas.height

        // Magnetic Repulsion from cursor
        const dx = mx - px
        const dy = my - py
        const distance = Math.sqrt(dx * dx + dy * dy)
        const hitRadius = 150

        let drawX = px
        let drawY = py

        if (distance < hitRadius) {
          const force = (hitRadius - distance) / hitRadius
          const pushX = (dx / distance) * force * 100
          const pushY = (dy / distance) * force * 100
          drawX -= pushX
          drawY -= pushY
        }

        ctx.beginPath()
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', setSize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none" 
      style={{ mixBlendMode: 'screen' }} 
    />
  )
}

const staggeredText = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

export default function Hero() {
  const typedText = useTypewriter(roles, 100, 60, 2000)
  
  // Parallax elements
  const { scrollY } = useScroll()
  const yBg = useTransform(scrollY, [0, 1000], [0, 400])
  const opacityStroke = useTransform(scrollY, [0, 600], [0.05, 0.3])
  const strokeOffset = useTransform(scrollY, [0, 600], [0, -100])

  const scrollToWork = () => {
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-[110vh] flex items-center overflow-hidden bg-bg-primary text-text-primary">
      
      {/* Physics Particles */}
      <InteractiveParticles />

      {/* Orbs with Parallax Scroll */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full animate-orb-1 opacity-60"
             style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full animate-orb-2 opacity-50"
             style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full pt-20">
        
        {/* Left Content */}
        <motion.div className="order-2 lg:order-1" initial="hidden" animate="visible" transition={{ staggerChildren: 0.15 }}>
          
          <motion.div variants={staggeredText} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass mb-6 border border-blue-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-beacon" style={{ boxShadow: '0 0 6px rgba(52,211,153,0.8)' }} />
            <span className="text-xs font-semibold text-text-secondary tracking-wide">Available for new projects</span>
          </motion.div>

          <motion.div variants={staggeredText} className="mb-2">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-text-primary" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              Hi, I'm <span className="text-outline text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">John</span>
            </h2>
          </motion.div>

          <motion.h1 variants={staggeredText} className="text-5xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tighter" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            Vincent <span className="text-blue-primary">Joaquin</span>
          </motion.h1>

          <motion.div variants={staggeredText} className="text-xl md:text-2xl text-text-primary/80 mb-8 h-8 flex items-center">
            <span className="text-text-secondary/60 mr-3">A dedicated</span>
            <span className="text-text-primary font-semibold">{typedText}</span>
            <span className="w-[2px] h-6 ml-2 animate-pulse" style={{ background: 'var(--accent-primary)', boxShadow: '0 0 8px rgba(37,99,235,0.8)' }} />
          </motion.div>

          <motion.p variants={staggeredText} className="text-base md:text-lg text-text-secondary max-w-lg mb-10 leading-relaxed">
            I am a fresh graduate with a Bachelor of Science in Information Technology from the Polytechnic College of La Union (PCLU), ready to turn innovative ideas into reality.
          </motion.p>

          <motion.div variants={staggeredText} className="flex flex-wrap items-center gap-5">
            <Magnetic boost={1.5}>
              <button onClick={scrollToWork} className="btn-primary px-8 py-4 rounded-2xl group flex items-center gap-2">
                <span>View My Work</span>
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </Magnetic>
            
            <Magnetic boost={1.2}>
              <a href="#contact" className="btn-outline px-8 py-4 rounded-2xl flex items-center gap-2 bg-glass-bg border border-glass-border hover:border-blue-primary/40 transition-colors">
                <HiMail className="w-5 h-5 text-blue-primary" />
                <span>Let's Talk</span>
              </a>
            </Magnetic>
          </motion.div>
        
        </motion.div>

        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85, x: 50 }} 
          animate={{ opacity: 1, scale: 1, x: 0 }} 
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }} 
          className="relative order-1 lg:order-2 mb-4 lg:mb-0"
        >
          <div className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[450px] mx-auto lg:ml-auto lg:mr-0 group">
            {/* Outline Glow behind image */}
            <div className="absolute inset-0 bg-blue-600/20 blur-[80px] group-hover:blur-[100px] group-hover:bg-blue-500/30 transition-all duration-700 pointer-events-none rounded-full" />

            <div className="absolute -inset-3 rounded-[2rem] pointer-events-none" style={{ zIndex: 0 }}>
              <div className="absolute inset-0 rounded-[2rem] animate-border-spin" style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(37,99,235,0.6) 60deg, transparent 150deg, transparent 360deg)', filter: 'blur(2px)' }} />
              <div className="absolute inset-[2px] rounded-[1.8rem] bg-bg-primary" />
            </div>

            <div className="relative z-10 rounded-3xl p-2 bg-glass-bg border border-glass-border backdrop-blur-sm shadow-2xl">
              <div className="overflow-hidden rounded-2xl relative bg-bg-secondary">
                <img src={joaquin} alt={personalInfo.name} className="w-full h-auto object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 aspect-[4/5] group-hover:scale-105" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)' }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 flex flex-col items-center gap-1 pointer-events-none" style={{ animation: 'bounce-down 2s ease-in-out infinite' }}>
        <span className="text-[10px] tracking-[0.2em] uppercase text-text-secondary/40 font-medium font-mono">Scroll</span>
        <HiChevronDown className="w-4 h-4 text-text-secondary/30" />
      </motion.div>
    </section>
  )
}
