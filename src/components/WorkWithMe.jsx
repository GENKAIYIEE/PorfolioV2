import { motion } from 'framer-motion'
import { HiLightningBolt, HiShieldCheck } from 'react-icons/hi'
import { HiSquaresPlus } from 'react-icons/hi2'
import { BsLayers } from 'react-icons/bs'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
}

const pillars = [
  {
    icon: HiLightningBolt,
    title: 'Peak Productivity',
    subtitle: 'Optimized Development Cycles',
    description:
      'Fast-paced development without sacrificing code quality. Every sprint is engineered for maximum output — clean architecture, rapid iteration, and zero technical debt accumulation.',
    highlights: ['Rapid Prototyping', 'Clean Architecture', 'Efficient Debugging'],
    accentColor: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.15)',
    accentBorder: 'rgba(245, 158, 11, 0.3)',
  },
  {
    icon: BsLayers,
    title: 'Strategic Plan Management',
    subtitle: 'Systematic Project Architecture',
    description:
      'Meticulous version control and systematic project tracking at every phase. From backlog grooming to deployment pipelines — nothing ships without a structured plan.',
    highlights: ['Meticulous Documentation & Versioning', 'Structured Workflows', 'Milestone Tracking'],
    accentColor: '#2563eb',
    accentGlow: 'rgba(37, 99, 235, 0.15)',
    accentBorder: 'rgba(37, 99, 235, 0.3)',
  },
  {
    icon: HiSquaresPlus,
    title: 'Full-Stack Agility',
    subtitle: 'End-to-End System Mastery',
    description:
      'Seamlessly bridging the gap between database logic and user interface. From SQL schemas to pixel-perfect frontends — the entire stack is my domain.',
    highlights: ['Database Architecture', 'API Design', 'UI/UX Implementation'],
    accentColor: '#10b981',
    accentGlow: 'rgba(16, 185, 129, 0.15)',
    accentBorder: 'rgba(16, 185, 129, 0.3)',
  },
]

export default function WorkWithMe() {
  return (
    <section
      id="work-with-me"
      className="relative py-28 md:py-36 overflow-hidden border-t border-glass-border"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(ellipse, var(--accent-primary) 0%, transparent 70%)',
          filter: 'blur(80px)',
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
            Collaboration
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            style={{
              fontFamily: 'Clash Display, sans-serif',
              color: 'var(--text-primary)',
            }}
          >
            Why Work With Me?
          </h2>
          <p className="text-text-secondary max-w-2xl text-sm md:text-base leading-relaxed">
            I bring a relentless commitment to quality, speed, and strategic execution.
            Here's what defines my professional approach.
          </p>
        </motion.div>

        {/* 3-Column Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {pillars.map((pillar, index) => (
            <motion.div key={pillar.title} variants={fadeInUp}>
              <motion.div
                className="relative rounded-2xl overflow-hidden h-full flex flex-col glass-card group cursor-default"
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                style={{
                  '--pillar-accent': pillar.accentColor,
                  '--pillar-glow': pillar.accentGlow,
                  '--pillar-border': pillar.accentBorder,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = pillar.accentBorder
                  e.currentTarget.style.boxShadow = `0 20px 50px ${pillar.accentGlow}, 0 0 0 1px ${pillar.accentBorder}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Top Accent Line */}
                <div
                  className="h-[2px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${pillar.accentColor}, transparent)`,
                  }}
                />

                <div className="p-7 md:p-8 flex flex-col flex-1">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: pillar.accentGlow,
                      border: `1px solid ${pillar.accentBorder}`,
                    }}
                  >
                    <pillar.icon
                      className="w-6 h-6 transition-colors duration-300"
                      style={{ color: pillar.accentColor }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold text-text-primary mb-1 tracking-tight transition-colors duration-300"
                    style={{ fontFamily: 'Clash Display, sans-serif' }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Subtitle */}
                  <span
                    className="text-xs font-semibold uppercase tracking-widest mb-4 block transition-colors duration-300"
                    style={{ color: pillar.accentColor }}
                  >
                    {pillar.subtitle}
                  </span>

                  {/* Description */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                    {pillar.description}
                  </p>

                  {/* Highlight Pills */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {pillar.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[11px] font-medium px-3 py-1.5 rounded-full border transition-all duration-300"
                        style={{
                          color: 'var(--text-secondary)',
                          borderColor: 'var(--glass-border)',
                          background: 'var(--card-bg)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = pillar.accentBorder
                          e.currentTarget.style.color = pillar.accentColor
                          e.currentTarget.style.background = pillar.accentGlow
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--glass-border)'
                          e.currentTarget.style.color = 'var(--text-secondary)'
                          e.currentTarget.style.background = 'var(--card-bg)'
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Index */}
                <div className="px-7 md:px-8 pb-6 flex items-center justify-between">
                  <span className="text-text-secondary/30 text-[10px] font-mono uppercase tracking-widest">
                    0{index + 1}
                  </span>
                  <HiShieldCheck
                    className="w-4 h-4 transition-colors duration-300"
                    style={{ color: 'var(--glass-border)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = pillar.accentColor
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--glass-border)'
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  )
}
