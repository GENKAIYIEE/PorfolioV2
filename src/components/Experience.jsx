import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experiences } from '../data/portfolioData'
import { HiBriefcase, HiAcademicCap, HiExternalLink, HiStar } from 'react-icons/hi'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
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
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="text-text-secondary text-sm font-medium uppercase tracking-widest mb-3 block">
            My Journey
          </span>
          <h2 className="section-title">Experience & Education</h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-2 mb-8 p-1.5 glass rounded-2xl w-fit mx-auto"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-6 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
              style={{
                color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
              aria-label={`Show ${tab.label}`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute inset-0 rounded-xl bg-blue-primary/10 border border-glass-border"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Experience List */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={`${item.role}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative flex flex-col md:flex-row gap-6 md:gap-12 py-8 border-b border-glass-border last:border-0 hover:bg-glass-bg -mx-6 px-6 transition-colors rounded-3xl"
                >
                  {/* Period Column */}
                  <div className="md:w-1/4 shrink-0 pt-1">
                    <span className="text-sm font-medium text-text-secondary/60 font-mono tracking-wider">
                      {item.period}
                    </span>
                  </div>

                  {/* Content Column */}
                  <div className="md:w-3/4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <h3
                          className="text-xl md:text-2xl font-bold text-text-primary mb-2 group-hover:text-blue-primary transition-colors"
                          style={{ fontFamily: 'Clash Display, sans-serif' }}
                        >
                          {item.role}
                        </h3>
                        <p className="text-base text-blue-primary font-medium">
                          {item.company}
                        </p>
                      </div>
                      {item.link && (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-primary/10 text-blue-primary text-sm font-medium hover:bg-blue-primary/20 transition-colors self-start border border-blue-primary/20"
                        >
                          Visit Website <HiExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    {item.image && (
                      <div className="relative rounded-2xl overflow-hidden border border-glass-border mb-6 group-hover:border-blue-primary/30 transition-colors">
                        <img 
                          src={item.image} 
                          alt={`${item.company} project`}
                          className="w-full max-h-[350px] object-cover object-top hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}

                    <ul className="space-y-4">
                      {item.bullets.map((bullet, bi) => {
                        const isAward = bullet.toLowerCase().includes('award') || 
                                        bullet.toLowerCase().includes('lister') || 
                                        bullet.toLowerCase().includes('finalist');
                        return (
                          <li key={bi} className={`text-base leading-relaxed flex items-start ${
                            isAward ? 'text-blue-primary font-semibold' : 'text-text-secondary'
                          }`}>
                            {isAward ? (
                              <HiStar className="w-4 h-4 text-yellow-500 mr-3 mt-1.5 shrink-0" />
                            ) : (
                              <span className="text-text-secondary/30 mr-4 mt-1">—</span>
                            )}
                            {bullet}
                          </li>
                        );
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
