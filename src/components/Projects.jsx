import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, projectCategories } from '../data/portfolioData'
import { HiExternalLink } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const featured = projects.find((p) => p.featured)

  return (
    <section id="projects" className="relative py-28 md:py-36 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-white text-sm font-medium uppercase tracking-widest mb-3 block">
            Selected Work
          </span>
          <h2 className="section-title text-white">Featured Projects</h2>
        </motion.div>

        {/* Featured Project */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden group">
              <div className="grid md:grid-cols-5 gap-0">
                {/* Content side - takes up more space for typography focus */}
                <div className="md:col-span-3 p-10 md:p-14 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
                  <span className="text-xs font-medium text-white uppercase tracking-widest mb-4 block">
                    Featured Output
                  </span>
                  <h3
                    className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight group-hover:text-blue-400 transition-colors"
                    style={{ fontFamily: 'Clash Display, sans-serif' }}
                  >
                    {featured.title}
                  </h3>
                  <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
                    {featured.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {featured.tech.map((t) => (
                      <span key={t} className="tech-pill text-xs px-4 py-1.5">{t}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-6">
                    {featured.github && (
                      <motion.a
                        href={featured.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-sm font-medium"
                        whileHover={{ x: 5 }}
                        aria-label={`View ${featured.title} on GitHub`}
                      >
                        <FaGithub className="w-5 h-5" />
                        <span>Source</span>
                      </motion.a>
                    )}
                    {featured.demo && (
                      <motion.a
                        href={featured.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors uppercase tracking-widest text-sm font-medium"
                        whileHover={{ x: 5 }}
                        aria-label={`View ${featured.title} live demo`}
                      >
                        <span>Visit Live</span>
                        <HiExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Abstract Visual Side Instead of Placeholder */}
                <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden bg-[#0a0f1d] flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIvPjwvc3ZnPg==')] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
                  <div className="text-center relative z-10 px-8">
                    <div className="text-4xl text-indigo-500/30 mb-4 font-serif italic">01</div>
                    <div className="text-white/20 uppercase tracking-[0.3em] text-xs font-mono">Project Overview</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 mb-16"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="relative pb-2 text-sm font-medium transition-all group"
              style={{
                color: activeFilter === cat ? '#ffffff' : 'rgba(255,255,255,0.4)',
              }}
              aria-label={`Filter projects by ${cat}`}
            >
              <span className="relative z-10 uppercase tracking-widest">{cat}</span>
              <div 
                className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 bg-white
                  ${activeFilter === cat ? 'w-full' : 'w-0 group-hover:w-1/2'}`}
              />
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered
              .filter((p) => !p.featured || activeFilter !== 'All')
              .map((project) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <div className="bg-white/[0.015] border border-white/[0.03] rounded-3xl p-8 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500 group h-full flex flex-col relative overflow-hidden">
                    {/* Top Section */}
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="px-3 py-1 rounded-md text-[10px] font-semibold uppercase tracking-widest bg-blue-500/10 text-white">
                        {project.category}
                      </div>
                      
                      {/* Interactive Links in Corner */}
                      <div className="flex gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <FaGithub className="w-5 h-5" />
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <HiExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 relative z-10">
                      <h3
                        className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors tracking-tight"
                        style={{ fontFamily: 'Clash Display, sans-serif' }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed mb-8 flex-1">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Footer */}
                    <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                      {project.tech.map((t) => (
                        <span key={t} className="text-white/30 text-[11px] uppercase tracking-wider font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
