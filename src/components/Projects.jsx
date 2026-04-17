import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/portfolioData'
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
  const featured = projects.find((p) => p.featured)

  return (
    <section id="projects" className="relative py-28 md:py-36 overflow-hidden border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-text-secondary text-sm font-medium uppercase tracking-widest mb-3 block">
            Selected Work
          </span>
          <h2 className="section-title">Featured Projects</h2>
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
            <div className="bg-bg-secondary border border-glass-border rounded-3xl overflow-hidden group">
              <div className="grid md:grid-cols-5 gap-0">
                {/* Content side - takes up more space for typography focus */}
                <div className="md:col-span-3 p-10 md:p-14 flex flex-col justify-center border-b md:border-b-0 md:border-r border-glass-border">
                  <span className="text-xs font-medium text-text-secondary uppercase tracking-widest mb-4 block">
                    {featured.isUpcoming ? 'Coming Soon' : 'Featured Output'}
                  </span>
                  <h3
                    className="text-3xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight group-hover:text-blue-primary transition-colors"
                    style={{ fontFamily: 'Clash Display, sans-serif' }}
                  >
                    {featured.title}
                  </h3>
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
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
                        className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors uppercase tracking-widest text-sm font-medium"
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
                        className="flex items-center gap-2 text-text-primary hover:text-blue-primary transition-colors uppercase tracking-widest text-sm font-medium"
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
                <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden bg-bg-primary flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIvPjwvc3ZnPg==')] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] dark:opacity-20 opacity-40" />
                  <div className="text-center relative z-10 px-8">
                    {featured.isUpcoming ? (
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-16 h-16 rounded-full border-4 border-blue-primary/20 border-t-blue-primary animate-spin mb-6" />
                        <div className="text-blue-primary tracking-[0.4em] uppercase text-sm font-semibold">In Progress</div>
                      </motion.div>
                    ) : (
                      <>
                        <div className="text-4xl text-blue-primary opacity-20 dark:opacity-30 mb-4 font-serif italic">01</div>
                        <div className="text-text-secondary/40 uppercase tracking-[0.3em] text-xs font-mono">Project Overview</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {projects
              .filter((p) => !p.featured)
              .map((project) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <div className="glass-card rounded-3xl p-8 hover:bg-glass-bg hover:border-blue-primary transition-all duration-500 group h-full flex flex-col relative overflow-hidden">
                    {/* Top Section */}
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-blue-primary/10 text-blue-primary dark:text-white">
                        {project.category}
                      </div>
                      
                      {/* Interactive Links in Corner */}
                      <div className="flex gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-primary transition-colors text-text-primary">
                            <FaGithub className="w-5 h-5" />
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="hover:text-blue-primary transition-colors text-text-primary">
                            <HiExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 relative z-10">
                      <h3
                        className="text-2xl font-bold text-text-primary mb-4 group-hover:text-blue-primary transition-colors tracking-tight"
                        style={{ fontFamily: 'Clash Display, sans-serif' }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed mb-8 flex-1">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Footer */}
                    <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                      {project.tech.map((t) => (
                        <span key={t} className="text-text-secondary/60 text-[11px] uppercase tracking-wider font-mono">
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
