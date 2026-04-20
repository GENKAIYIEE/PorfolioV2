import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experiences } from '../data/portfolioData'
import { HiBriefcase, HiAcademicCap, HiExternalLink, HiStar } from 'react-icons/hi'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState('work')
  const tabs = [
    { id: 'work', label: 'Work Experience', icon: HiBriefcase },
    { id: 'education', label: 'Education', icon: HiAcademicCap },
  ]
  const filtered = experiences.filter((e) => e.type === activeTab)

  return (
    <section id="experience" className="relative py-16 md:py-20 overflow-hidden border-t border-glass-border">
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
          <h2 className="section-title mt-3">Experience &amp; Education</h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-2 mb-10 p-1.5 glass rounded-2xl w-fit mx-auto"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-6 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
              style={{ color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              aria-label={`Show ${tab.label}`}
            >
              <tab.icon
                className="w-4 h-4 transition-colors duration-300"
                style={{ color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
              />
              <span className="hidden sm:inline">{tab.label}</span>
              {activeTab === tab.id && (
                <>
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                  <motion.div
                    layoutId="tabUnderline"
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-8 rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                </>
              )}
            </button>
          ))}
        </motion.div>

        {/* Experience List */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={`${item.role}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative flex flex-col md:flex-row gap-6 md:gap-12 py-8 border-b border-glass-border last:border-0 -mx-6 px-6 rounded-3xl transition-colors duration-300"
                  style={{ background: 'transparent' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--glass-bg)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                >
                  {/* Blue gradient left border — grows on hover */}
                  <div
                    className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
                    style={{ background: 'linear-gradient(180deg, var(--accent-primary), var(--accent-secondary))' }}
                  />

                  {/* Period Column */}
                  <div className="md:w-1/4 shrink-0 pt-1">
                    <span className="period-pill">{item.period}</span>
                  </div>

                  {/* Content Column */}
                  <div className="md:w-3/4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <h3
                          className="text-xl md:text-2xl font-bold text-text-primary mb-2 group-hover:text-blue-primary transition-colors duration-300 draw-underline"
                          style={{ fontFamily: 'Clash Display, sans-serif' }}
                        >
                          {item.role}
                        </h3>
                        <p className="text-base text-blue-primary font-medium">{item.company}</p>
                      </div>
                      {item.link && (
                        <motion.a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-primary/10 text-blue-primary text-sm font-medium hover:bg-blue-primary/20 transition-colors self-start border border-blue-primary/20"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Visit Website <HiExternalLink className="w-4 h-4" />
                        </motion.a>
                      )}
                    </div>

                    {item.image && (
                      <div className="relative rounded-2xl overflow-hidden border border-glass-border mb-6 group-hover:border-blue-primary/30 transition-colors duration-300">
                        <img
                          src={item.image}
                          alt={`${item.company} project`}
                          className="w-full max-h-[350px] object-cover object-top transition-all duration-700"
                          style={{ filter: 'grayscale(15%)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.transform = 'scale(1.02)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(15%)'; e.currentTarget.style.transform = 'scale(1)' }}
                        />
                      </div>
                    )}

                    <ul className="space-y-4">
                      {item.bullets.map((bullet, bi) => {
                        const isAward = bullet.toLowerCase().includes('award') ||
                          bullet.toLowerCase().includes('lister') ||
                          bullet.toLowerCase().includes('finalist')
                        return (
                          <li key={bi} className={`text-base leading-relaxed flex items-start ${isAward ? 'text-blue-primary font-semibold' : 'text-text-secondary'}`}>
                            {isAward ? (
                              <HiStar className="w-4 h-4 text-yellow-500 mr-3 mt-1.5 shrink-0" />
                            ) : (
                              <span className="text-text-secondary/30 mr-4 mt-1">—</span>
                            )}
                            {bullet}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
