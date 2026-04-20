import { motion } from 'framer-motion';
import { seminarsData } from '../data/portfolioData';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const rowVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Seminars() {
  return (
    <section
      id="seminars"
      className="relative py-28 md:py-36 overflow-hidden border-t border-glass-border"
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none opacity-[0.07]"
        style={{
          background: 'radial-gradient(ellipse, var(--accent-primary) 0%, transparent 70%)',
          filter: 'blur(60px)',
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
          <span className="text-text-secondary text-sm font-medium uppercase tracking-widest mb-3 block">
            Professional Development
          </span>
          <h2 className="section-title">Seminars Attended</h2>
          <p className="text-text-secondary mt-3 max-w-xl text-sm leading-relaxed">
            Continuous learning through industry conferences, technical summits, and professional workshops.
          </p>
        </motion.div>

        {/* Seminar Rows — Editorial List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col"
        >
          {/* Top border line */}
          <div className="border-t border-glass-border" />

          {seminarsData.map((seminar, index) => (
            <motion.div
              key={seminar.id}
              variants={rowVariant}
              className="group relative"
            >
              {/* Row */}
              <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-7 sm:py-8 px-2 sm:px-4 border-b border-glass-border transition-colors duration-500 hover:bg-white/[0.02]">

                {/* Left accent bar — slides in on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 rounded-full" />

                {/* Row number */}
                <span className="hidden sm:block text-text-secondary/20 text-sm font-mono font-bold tabular-nums w-8 text-right shrink-0 group-hover:text-blue-primary/40 transition-colors duration-300">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Emoji */}
                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-glass-bg border border-glass-border flex items-center justify-center text-2xl sm:text-3xl group-hover:border-blue-primary/20 group-hover:bg-blue-primary/5 transition-all duration-500">
                  {seminar.emoji}
                </div>

                {/* Content block */}
                <div className="flex-grow min-w-0">
                  <h3
                    className="text-base sm:text-lg font-bold text-text-primary group-hover:text-blue-primary transition-colors duration-300 tracking-tight leading-snug"
                    style={{ fontFamily: 'Clash Display, sans-serif' }}
                  >
                    {seminar.title}
                  </h3>

                  {seminar.org && (
                    <p className="text-text-secondary text-xs sm:text-sm mt-1 font-medium">
                      {seminar.org}
                    </p>
                  )}

                  {seminar.description && (
                    <p className="text-text-secondary/60 text-xs sm:text-sm leading-relaxed mt-1.5 max-w-2xl">
                      {seminar.description}
                    </p>
                  )}
                </div>

                {/* Year pill — far right */}
                <span className="shrink-0 self-start sm:self-center inline-flex px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-blue-primary/8 text-blue-primary border border-blue-primary/15 whitespace-nowrap group-hover:bg-blue-primary/15 group-hover:border-blue-primary/30 transition-all duration-300">
                  {seminar.year}
                </span>
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
          className="mt-10 flex items-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-blue-primary/60" />
          <span className="text-text-secondary/50 text-xs font-medium tracking-wide">
            {seminarsData.length} seminars and conferences attended
          </span>
        </motion.div>
      </div>
    </section>
  );
}