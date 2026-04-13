import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUpModule from 'react-countup'
const CountUp = CountUpModule.default || CountUpModule
import { personalInfo, stats, skillCategories } from '../data/portfolioData'
import { HiX, HiCheckCircle, HiAcademicCap, HiLightBulb, HiDownload } from 'react-icons/hi'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Pause auto-scroll while the milestones modal is open
  useEffect(() => {
    if (isModalOpen) {
      window.dispatchEvent(new Event('pauseAutoScroll'))
    } else {
      window.dispatchEvent(new Event('resumeAutoScroll'))
    }
  }, [isModalOpen])

  return (
    <section id="about" className="relative py-16 md:py-20 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Label */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="text-white text-sm font-medium uppercase tracking-widest mb-3 block">
            Get To Know Me
          </span>
          <h2 className="section-title text-white">About Me</h2>
        </motion.div>

        {/* Content Layout */}
        <div className="max-w-4xl">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="mb-12"
          >
            <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed mb-6">
              I bridge the gap between innovative ideas and seamless reality. With hands-on experience in both software architecture and hardware engineering, my focus is always on delivering complete solutions that provide tangible value.
            </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn-primary px-8 py-3 rounded-full font-semibold relative overflow-hidden group border border-white/30 hover:border-white text-white"
                >
                  <span className="relative z-10">View My Milestones</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                <a
                  href={personalInfo.resumeUrl}
                  download="John_Vincent_Joaquin_Resume.png"
                  className="btn-outline px-8 py-3 rounded-full font-semibold flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white transition-colors"
                >
                  <HiDownload className="w-5 h-5" />
                  <span>Download Resume</span>
                </a>
              </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="flex flex-wrap gap-6 mb-16"
          >
            {stats.map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 flex-1 min-w-[160px]">
                <div className="text-4xl font-bold gradient-text mb-1" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  {inView ? (
                    <CountUp end={stat.value} duration={2.5} suffix="+" />
                  ) : (
                    '0+'
                  )}
                </div>
                <div className="text-sm text-white/40 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
        >
          <h3 className="text-xl font-semibold text-white mb-8" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            My Tech Stack
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, ci) => (
              <motion.div
                key={category.title}
                className="glass-card rounded-2xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + ci * 0.1 }}
              >
                <h4 className="text-sm font-medium text-white uppercase tracking-wider mb-4">
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <span key={skill.name} className="skill-badge flex items-center gap-2">
                        {Icon && <Icon className="text-lg" />}
                        <span>{skill.name}</span>
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Milestones Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-navy-950 border border-indigo-500/20 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden"
            >
              {/* Modal Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 z-10 bg-white/5 hover:bg-white/10 rounded-full"
              >
                <HiX className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  My Tech Journey & Milestones
                </h3>

                <p className="text-white/70 text-base md:text-lg mb-8 leading-relaxed">
                  My journey has been defined by hands-on creation and problem-solving. Beyond writing clean code, I thrive on engineering complete, end-to-end systems that make an immediate positive impact on their users.
                </p>

                <div className="space-y-6 mb-8">
                  {/* Milestone 1 */}
                  <div className="flex gap-4 items-start group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                        <HiAcademicCap className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">DOST Ilocos Region OJT</h4>
                      <p className="text-white/60 leading-relaxed">Collaborated with a team to develop and successfully deploy 2 fully functional, active systems.</p>
                    </div>
                  </div>

                  {/* Milestone 2 */}
                  <div className="flex gap-4 items-start group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                        <HiCheckCircle className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">Leaving a Legacy</h4>
                      <p className="text-white/60 leading-relaxed">Built and deployed a live system for PCLU that is currently serving daily users on campus.</p>
                    </div>
                  </div>

                  {/* Milestone 3 */}
                  <div className="flex gap-4 items-start group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                        <HiLightBulb className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">Hardware Leadership</h4>
                      <p className="text-white/60 leading-relaxed">Led the creation of the 'Eye Cane Walk,' an Arduino-powered smart cane designed to assist individuals with visual impairments.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-white italic font-medium leading-relaxed">
                    "Whether I am developing web applications or wiring smart hardware, I am passionate about bridging the gap between innovative ideas and seamless reality."
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
