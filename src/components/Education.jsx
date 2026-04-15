import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  HiAcademicCap,
  HiLocationMarker,
  HiCalendar,
  HiExternalLink,
  HiStar,
  HiCheckCircle,
} from 'react-icons/hi'
import { educationData } from '../data/portfolioData'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const LEVEL_COLORS = {
  College: {
    border: 'var(--edu-college-border)',
    glow: 'var(--edu-college-glow)',
    dot: 'var(--edu-college-dot)',
    badge: 'bg-blue-500/20 text-blue-primary border-blue-primary/40',
  },
  'Senior High School': {
    border: 'var(--edu-shs-border)',
    glow: 'var(--edu-shs-glow)',
    dot: 'var(--edu-shs-dot)',
    badge: 'bg-purple-500/20 text-purple-600 dark:text-purple-300 border-purple-500/40',
  },
  'Junior High School': {
    border: 'var(--edu-jhs-border)',
    glow: 'var(--edu-jhs-glow)',
    dot: 'var(--edu-jhs-dot)',
    badge: 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border-cyan-500/40',
  },
  'Elementary (Grade 5\u20136)': {
    border: 'var(--edu-elem56-border)',
    glow: 'var(--edu-elem56-glow)',
    dot: 'var(--edu-elem56-dot)',
    badge: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/40',
  },
  'Elementary (Kinder \u2013 Grade 4)': {
    border: 'var(--edu-elemK4-border)',
    glow: 'var(--edu-elemK4-glow)',
    dot: 'var(--edu-elemK4-dot)',
    badge: 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40',
  },
}

function EducationCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const colors = LEVEL_COLORS[item.level] || LEVEL_COLORS['College']
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-0">
      {/* LEFT CELL – desktop only, shows card on even indices */}
      <div className="hidden md:flex justify-end pr-8">
        {isEven && (
          <motion.div
            className="w-full max-w-sm"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card item={item} colors={colors} />
          </motion.div>
        )}
      </div>

      {/* CENTER – dot + vertical connector */}
      <div className="relative flex flex-col items-center">
        {/* glowing dot */}
        <motion.div
          className="relative z-10 mt-6 w-5 h-5 rounded-full flex items-center justify-center"
          style={{
            background: colors.dot,
            boxShadow: `0 0 0 4px var(--bg-primary), 0 0 16px ${colors.dot}AA`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.35, delay: index * 0.08 + 0.15, type: 'spring', stiffness: 350 }}
        >
          <div className="w-2 h-2 rounded-full bg-white/90" />
        </motion.div>
      </div>

      {/* RIGHT CELL – desktop shows card on odd indices; mobile ALWAYS shows */}
      <div className="pl-8 md:pl-8">
        {/* Mobile: always render */}
        <div className="md:hidden">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card item={item} colors={colors} />
          </motion.div>
        </div>
        {/* Desktop: only odd indices */}
        {!isEven && (
          <motion.div
            className="hidden md:block max-w-sm"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card item={item} colors={colors} />
          </motion.div>
        )}
      </div>
    </div>
  )
}

function Card({ item, colors }) {
  const isCollege = item.featured

  return (
    <div
      className="relative rounded-2xl p-6 transition-all duration-300 group cursor-default"
      style={{
        background: `linear-gradient(145deg, var(--bg-secondary) 0%, ${colors.glow} 100%)`,
        border: `${isCollege ? '2px' : '1px'} solid ${colors.border}`,
        boxShadow: isCollege
          ? `0 0 50px ${colors.glow}, 0 20px 60px rgba(0,0,0,0.1)`
          : `0 0 24px ${colors.glow}, 0 4px 20px rgba(0,0,0,0.05)`,
      }}
    >
      {/* "Just Graduated" badge */}
      {isCollege && item.graduationDate && (
        <div className="absolute -top-3.5 left-5">
          <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-blue-500 text-white tracking-widest uppercase shadow-lg shadow-blue-500/40">
            🎉 Just Graduated!
          </span>
        </div>
      )}

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
            style={{ background: colors.glow, border: `1px solid ${colors.border}` }}
          >
            {item.emoji}
          </div>
          <div className="min-w-0">
            <span
              className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full border tracking-wide mb-1 ${colors.badge}`}
            >
              {item.level}
            </span>
            <h3
              className="text-base font-bold text-text-primary leading-snug group-hover:text-blue-primary transition-colors truncate"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              {item.school}
            </h3>
          </div>
        </div>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg hover:bg-glass-border transition-colors text-text-secondary hover:text-text-primary shrink-0"
            aria-label={`Visit ${item.school} website`}
          >
            <HiExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Degree */}
      <p className="flex items-center gap-2 text-sm text-text-primary/70 mb-3 font-medium">
        <HiAcademicCap className="w-3.5 h-3.5 text-blue-primary/50 shrink-0" />
        {item.degree}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
        <span className="flex items-center gap-1.5 text-[11px] text-text-secondary/60">
          <HiCalendar className="w-3 h-3" />
          {item.period}
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-text-secondary/60">
          <HiLocationMarker className="w-3 h-3" />
          {item.location}
        </span>
      </div>

      {/* Separator */}
      <div
        className="w-full h-px mb-4"
        style={{ background: `linear-gradient(90deg, ${colors.border}, transparent)` }}
      />

      {/* Highlights */}
      <ul className="space-y-2">
        {item.highlights.map((h, i) => {
          const isAward =
            h.toLowerCase().includes('dean') ||
            h.toLowerCase().includes('award') ||
            h.toLowerCase().includes('finalist') ||
            h.toLowerCase().includes('best') ||
            h.toLowerCase().includes('innovative')
          return (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
              {isAward ? (
                <HiStar className="w-3 h-3 text-yellow-500 mt-1 shrink-0" />
              ) : (
                <HiCheckCircle className="w-3 h-3 mt-1 shrink-0" style={{ color: colors.dot }} />
              )}
              <span className={isAward ? 'text-text-primary/95 font-semibold' : 'text-text-secondary'}>
                {h}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Education() {
  return (
    <section
      id="education"
      className="relative py-20 md:py-28 overflow-hidden border-t border-glass-border"
    >
      {/* Ambient blobs */}
      <div
        className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[140px]"
        style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
      />

      <div className="relative max-w-5xl mx-auto px-6">

        {/* ── Section Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-text-secondary/60 text-xs font-semibold uppercase tracking-[0.35em] mb-4 block">
            Academic Journey
          </span>
          <h2
            className="section-title inline-block"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >
            Education
          </h2>
          <p className="text-text-secondary text-base max-w-lg mx-auto mt-7 leading-relaxed">
            From my first classroom in Laoag City to my IT diploma at PCLU — every school
            shaped the developer I am today.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* The vertical line — absolutely positioned behind the cards */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, #2563eb 10%, #8b5cf6 50%, #f59e0b 90%, transparent 100%)',
            }}
          />
          {/* Mobile vertical line */}
          <div
            className="md:hidden absolute left-2.5 top-0 bottom-0 w-px pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, #2563eb 10%, #8b5cf6 50%, #f59e0b 90%, transparent 100%)',
            }}
          />

          <div className="space-y-10 md:space-y-14">
            {educationData.map((item, index) => (
              <EducationCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* ── Graduation CTA ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 relative overflow-hidden rounded-3xl p-8 md:p-12 text-center"
          style={{
            background:
              'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(139,92,246,0.05) 60%, var(--bg-secondary) 100%)',
            border: '1px solid var(--edu-college-border)',
            boxShadow: '0 0 80px rgba(37,99,235,0.05)',
          }}
        >
          {/* top shimmer */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, #2563eb 30%, #8b5cf6 70%, transparent 100%)',
            }}
          />

          <div className="text-5xl mb-4 select-none" aria-hidden>🎓</div>
          <h3
            className="text-2xl md:text-3xl font-bold text-text-primary mb-3"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >
            IT Graduate &mdash; Class of&nbsp;2026
          </h3>
          <p className="text-text-secondary text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
            Proudly completed my{' '}
            <span className="text-text-primary font-semibold">
              Bachelor of Science in Information Technology
            </span>{' '}
            from{' '}
            <span className="text-blue-primary font-semibold">Polytechnic College of La Union</span>,
            graduating on{' '}
            <span className="text-text-primary font-semibold">April&nbsp;10,&nbsp;2026</span>.
          </p>
          <a
            href="https://pclu.edu.ph/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
            aria-label="Visit PCLU website"
          >
            <span>Visit PCLU</span>
            <HiExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
