import { motion } from 'framer-motion'
import { seminarsData } from '../data/portfolioData'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const rowVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Seminars() {
  return (
    <section
      id="seminars"
      className="relative py-16 md:py-24 overflow-hidden border-t border-glass-border"
    >
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[300px] rounded-full pointer-events-none opacity-[0.08]"
        style={{ background: 'radial-gradient(ellipse, var(--accent-primary) 0%, transparent 70%)', filter: 'blur(70px)' }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[500px] h-[400px] rounded-full pointer-events-none opacity-[0.05]"
        style={{ background: 'radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="section-title mt-3">Seminars Attended</h2>
          <p className="text-text-secondary mt-4 max-w-xl text-sm leading-relaxed">
            Continuous learning through industry conferences, technical summits, and professional workshops.
          </p>
        </motion.div>

        {/* Seminar Rows */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col"
        >
          <div className="border-t border-glass-border mb-2" />

          {seminarsData.map((seminar, index) => (
            <motion.div key={seminar.id} variants={rowVariant} className="group relative">
              <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-6 sm:py-8 px-2 sm:px-4 border-b border-glass-border transition-colors duration-500 hover:bg-blue-primary/[0.02] rounded-2xl sm:rounded-none">

                {/* Left accent bar */}
                <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-gradient-to-b from-blue-500 to-indigo-500 scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300 rounded-full" />

                {/* Row number with glow effect */}
                <span className="hidden sm:block text-text-secondary/30 text-sm font-mono font-bold tabular-nums w-8 text-right shrink-0 group-hover:glow-number group-hover:text-blue-primary row-num">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Emoji with spring on hover */}
                <div className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-glass-bg border border-glass-border flex items-center justify-center text-2xl sm:text-3xl group-hover:border-blue-primary/30 group-hover:bg-blue-primary/10 transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.25, rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                  >
                    {seminar.emoji}
                  </motion.div>
                </div>

                {/* Content block */}
                <div className="flex-grow min-w-0 flex flex-col justify-center">
                  <h3
                    className="text-base sm:text-[1.1rem] font-bold text-text-primary group-hover:text-blue-primary transition-colors duration-300 tracking-tight leading-snug line-clamp-2 sm:line-clamp-1"
                    style={{ fontFamily: 'Clash Display, sans-serif' }}
                  >
                    {seminar.title}
                  </h3>
                  {seminar.org && (
                    <p className="text-text-secondary/90 text-[11px] sm:text-[13px] mt-1.5 font-medium uppercase tracking-wider">
                      {seminar.org}
                    </p>
                  )}
                  {seminar.description && (
                    <p className="text-text-secondary/60 text-xs sm:text-sm leading-relaxed mt-2 max-w-3xl line-clamp-3 sm:line-clamp-2">
                      {seminar.description}
                    </p>
                  )}
                </div>

                {/* Year pill */}
                <div className="shrink-0 self-start sm:self-center mt-2 sm:mt-0 transition-transform duration-300 group-hover:translate-x-1">
                  <span className="inline-flex px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest bg-bg-secondary text-text-secondary border border-glass-border whitespace-nowrap group-hover:bg-blue-primary/15 group-hover:border-blue-primary/30 group-hover:text-blue-primary transition-all duration-300">
                    {seminar.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom summary count */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 flex items-center justify-center sm:justify-start"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border border-glass-border">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            <span className="text-text-primary text-xs font-semibold tracking-wide">
              {seminarsData.length} Seminars &amp; Conferences Attended
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}