import { motion, useScroll, useTransform } from 'framer-motion'
import { HiLightningBolt, HiCode, HiSparkles, HiChatAlt2 } from 'react-icons/hi'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

export default function WorkWithMe() {
  const { scrollYProgress } = useScroll()
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], [0, -300])
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, 200])

  const propositions = [
    {
      title: "Performance-Driven",
      desc: "I build fast, optimized applications. From minimizing bundle sizes to optimizing database queries, I ensure the end-user experiences zero friction.",
      icon: HiLightningBolt,
      bgClass: "bg-yellow-500/10",
      borderClass: "border-yellow-500/20",
      textClass: "text-yellow-400",
      hoverTextClass: "group-hover:text-yellow-400",
      hex: "#facc15"
    },
    {
      title: "Clean & Scalable Code",
      desc: "Maintainability is key. I write self-documenting, modular code following design patterns that allow your project to grow without accumulating technical debt.",
      icon: HiCode,
      bgClass: "bg-blue-500/10",
      borderClass: "border-blue-500/20",
      textClass: "text-blue-400",
      hoverTextClass: "group-hover:text-blue-400",
      hex: "#60a5fa"
    },
    {
      title: "Pixel-Perfect UI/UX",
      desc: "A powerful backend means nothing without a beautiful frontend. I sweat the details—animations, responsive breakpoints, and accessibility—to create premium aesthetics.",
      icon: HiSparkles,
      bgClass: "bg-emerald-500/10",
      borderClass: "border-emerald-500/20",
      textClass: "text-emerald-400",
      hoverTextClass: "group-hover:text-emerald-400",
      hex: "#34d399"
    },
    {
      title: "Clear Communication",
      desc: "I believe in radical transparency. You'll never be in the dark about project status, blockers, or architectural decisions. I communicate clearly and often.",
      icon: HiChatAlt2,
      bgClass: "bg-pink-500/10",
      borderClass: "border-pink-500/20",
      textClass: "text-pink-400",
      hoverTextClass: "group-hover:text-pink-400",
      hex: "#f472b6"
    }
  ]

  return (
    <section id="work-with-me" className="relative py-16 md:py-24 overflow-hidden bg-[#030816] border-t border-glass-border">
      
      {/* Background Parallax Orbs */}
      <motion.div style={{ y: yParallaxFast }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-[10%] w-[400px] h-[400px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>
      <motion.div style={{ y: yParallaxSlow }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-20 right-[10%] w-[500px] h-[500px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', filter: 'blur(90px)' }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="section-title" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            Why <span className="text-blue-primary">Collaborate</span> With Me?
          </h2>
          <p className="text-text-secondary mt-6 text-lg leading-relaxed max-w-2xl mx-auto">
            I don't just write code; I engineer solutions. I blend raw technical ability with a passion for user-centric design to build systems that are robust, scalable, and visually compelling.
          </p>
        </motion.div>

        {/* Value Proposition Cards Layout - Clean modern 2x2 grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {propositions.map((prop, index) => {
            const Icon = prop.icon
            return (
              <motion.div 
                key={index} 
                variants={cardVariant}
                className="bg-bg-secondary border border-glass-border rounded-3xl p-8 hover-glass transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex flex-col gap-5 h-full">
                  <div className={`w-14 h-14 rounded-2xl ${prop.bgClass} ${prop.borderClass} border flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className={`${prop.textClass} drop-shadow-[0_0_8px_${prop.hex}44]`} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold text-text-primary mb-3 font-clash tracking-wide ${prop.hoverTextClass} transition-colors`}>
                      {prop.title}
                    </h3>
                    <p className="text-text-secondary/80 leading-relaxed font-medium">
                      {prop.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
