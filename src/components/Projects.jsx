import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { projects } from '../data/portfolioData'
import { HiOutlineExternalLink, HiCode, HiStar } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

// ------------------------------------
// Standard Project Card
// ------------------------------------
function ProjectCard({ project }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  // 3D Tilt Values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smoothing springs
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  // Map to rotations (Card Tilt)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg'])

  // Map to inner parallax shifts
  const innerX = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15])
  const innerY = useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15])
  
  // Spotlight / Glare positioning
  const mouseXRaw = useMotionValue(0)
  const mouseYRaw = useMotionValue(0)
  const spotlightX = useSpring(mouseXRaw, { stiffness: 400, damping: 25 })
  const spotlightY = useSpring(mouseYRaw, { stiffness: 400, damping: 25 })

  const backgroundRadial = useMotionTemplate`radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, rgba(37, 99, 235, 0.1), transparent 40%)`
  
  // Specular glare line
  const glareBackground = useMotionTemplate`linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.05) 50%, transparent 80%)`
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['-100%', '100%'])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
    mouseXRaw.set(mouseX)
    mouseYRaw.set(mouseY)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      variants={fadeInUp}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative h-full`}
      style={{ perspective: 1200 }} 
    >
      <motion.div
        className="relative h-full w-full rounded-3xl overflow-hidden glass hover-glass border border-glass-border flex flex-col shimmer-card shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          borderColor: hovered ? 'rgba(37,99,235,0.3)' : 'rgba(37,99,235,0.1)',
        }}
      >
        <motion.div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay" style={{ opacity: hovered ? 1 : 0, background: glareBackground, x: glareX }} />
        <motion.div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen" style={{ background: backgroundRadial, zIndex: 0 }} />

        <div className="relative h-56 md:h-64 overflow-hidden bg-[#0a0f1d] border-b border-glass-border" style={{ transformStyle: "preserve-3d" }}>
          
          <motion.div className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)]" style={{ x: innerX, y: innerY }}>
            <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay z-10" />
            <img
              src={project.image}
              alt={project.title}
              className={`w-full h-full object-cover transition-all duration-700 ${hovered ? 'scale-100 grayscale-0' : 'scale-[1.01] grayscale-[20%]'}`}
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent z-10" />
          
          {project.featured && (
            <motion.div style={{ translateZ: 30 }} className="absolute top-4 left-4 flex items-center justify-center pointer-events-none z-20">
              <div className="px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                <HiStar className="w-3 h-3 text-yellow-400" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-yellow-300">Featured</span>
              </div>
            </motion.div>
          )}

          <motion.div style={{ translateZ: 40 }} className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.tech.slice(0, 3).map((tech, i) => (
              <span key={i} className="text-[10px] font-mono px-2 py-1 rounded bg-black/50 border border-white/10 backdrop-blur-md text-white/90 shadow-lg">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div className="flex flex-col flex-1 p-6 z-10 relative bg-gradient-to-b from-transparent to-[var(--bg-secondary)]" style={{ translateZ: 20 }}>
          <div className="flex items-start justify-between gap-4 mb-4">
             <h3 className="text-xl font-bold text-text-primary capitalize group-hover:text-blue-primary transition-colors leading-tight" style={{ fontFamily: 'Clash Display, sans-serif' }}>{project.title}</h3>
            
            <div className="flex gap-2 shrink-0">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-glass-bg border border-glass-border hover:bg-blue-primary/20 hover:border-blue-primary/40 text-text-secondary hover:text-blue-primary transition-all shadow-md group/btn">
                  <FaGithub className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-glass-bg border border-glass-border hover:bg-blue-primary/20 hover:border-blue-primary/40 text-text-secondary hover:text-blue-primary transition-all shadow-md group/btn">
                  <HiOutlineExternalLink className="w-4 h-4 group-hover/btn:scale-110 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>

          <p className="text-sm text-text-secondary/80 leading-relaxed mb-6 group-hover:text-text-secondary transition-colors font-medium">
            {project.description}
          </p>

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-3 px-1">
              <HiCode className="w-4 h-4 text-blue-500/60" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-text-secondary/50">Technologies Used</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/5 text-blue-300/80 border border-blue-500/10 group-hover:bg-blue-500/10 group-hover:text-blue-200 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ------------------------------------
// Upcoming/Loading Project Card
// ------------------------------------
function UpcomingProjectCard({ className = "" }) {
  return (
    <motion.div variants={fadeInUp} className={`group relative h-full ${className}`}>
      <div className="relative h-full w-full rounded-3xl overflow-hidden bg-[#060D20] border border-glass-border flex flex-col md:flex-row shadow-[0_0_40px_rgba(37,99,235,0.05)]">
        
        {/* Top Image Section — Radar / Scanner loading */}
        <div className="relative h-56 md:h-auto md:w-1/2 overflow-hidden bg-[#030612] border-b md:border-b-0 md:border-r border-glass-border flex items-center justify-center pointer-events-none min-h-[250px] md:min-h-[350px]">
          
          {/* Grid Background */}
          <div className="absolute inset-0 z-0 opacity-20" 
               style={{ backgroundImage: 'linear-gradient(rgba(37, 99, 235, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.4) 1px, transparent 1px)', backgroundSize: '30px 30px', backgroundPosition: 'center center' }} />
          
          {/* Radar Sweep */}
          <motion.div 
            className="absolute rounded-full w-[150%] h-[150%] sm:w-[500px] sm:h-[500px] z-10 opacity-30"
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-1/2 h-1/2 bg-gradient-to-tl from-blue-500/40 to-transparent blur-2xl origin-bottom-right absolute bottom-1/2 right-1/2" />
            <div className="absolute bottom-1/2 left-0 w-1/2 h-[2px] bg-gradient-to-r from-transparent to-blue-400" />
          </motion.div>

          {/* Central Orbiting Dot */}
          <div className="absolute z-20 w-8 h-8 rounded-full border border-blue-500/30 flex items-center justify-center bg-blue-900/20 backdrop-blur-sm">
            <motion.div className="w-2.5 h-2.5 bg-blue-400 rounded-full shadow-[0_0_15px_#60a5fa]" 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} 
                        transition={{ duration: 2, repeat: Infinity }} />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#060D20] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#060D20] z-10" />
          
          {/* Badge */}
          <div className="absolute top-6 left-6 z-20">
            <div className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
               <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
               <span className="text-xs uppercase font-mono font-bold tracking-widest text-blue-300">In Development</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-8 md:p-12 relative justify-center">
          <div className="mb-6">
             <h3 className="text-2xl md:text-3xl flex items-center gap-2 font-bold text-text-primary capitalize leading-tight" style={{ fontFamily: 'Clash Display, sans-serif' }}>
               Looking for the next <span className="text-blue-400">Challenge</span>
               <span className="flex gap-[2px] ml-1">
                 {[0, 1, 2].map((i) => (
                    <motion.span key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} className="w-1.5 h-1.5 rounded-full bg-blue-500/80" />
                 ))}
               </span>
             </h3>
          </div>

          <p className="text-base md:text-lg text-text-secondary/70 leading-relaxed font-medium mb-8">
            The developer is currently crafting the next big system. This section acts as a live placeholder and will automatically update as soon as the next project is committed and deployed.
          </p>

          <div className="mt-auto border-t border-glass-border pt-6">
             <div className="flex items-center gap-2 mb-3 px-1">
               <HiCode className="w-5 h-5 text-blue-500/40" />
               <span className="text-xs uppercase font-bold tracking-widest text-text-secondary/40">Terminal Status</span>
             </div>
             <div className="w-full md:max-w-md h-12 rounded-xl bg-[#02050e] border border-glass-border relative overflow-hidden flex items-center px-4 shadow-inner">
                {/* Shimmer */}
                <motion.div 
                  className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-sm"
                  animate={{ left: ['-20%', '120%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                />
                <span className="font-mono text-sm text-blue-400/80 flex items-center gap-2 font-medium">
                  <span className="text-emerald-500/80">~</span>
                  awaiting_commit...
                </span>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ------------------------------------
// Main Section
// ------------------------------------
export default function Projects() {
  return (
    <section id="projects" className="relative py-16 md:py-24 overflow-hidden border-t border-glass-border">
      
      {/* Background orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
           style={{ background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.15]"
           style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)', filter: 'blur(100px)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="mb-16">
          <h2 className="section-title">Featured Projects</h2>
          <p className="text-text-secondary mt-5 max-w-xl leading-relaxed">
            A showcase of my technical expertise and problem-solving through concrete Web and IT solutions. Hover cards to explore layers.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
             project.isUpcoming ? (
               <UpcomingProjectCard key={project.id || index} className="col-span-1 md:col-span-2 lg:col-span-3" />
             ) : (
               <ProjectCard key={project.id || index} project={project} index={index} />
             )
          ))}
        </motion.div>

      </div>
    </section>
  )
}
