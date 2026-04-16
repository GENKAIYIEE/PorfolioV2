import { useState, useCallback, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import AutoScroll from './components/AutoScroll'

// Lazy load below-the-fold sections for performance
const About = lazy(() => import('./components/About'))
const Experience = lazy(() => import('./components/Experience'))
const Education = lazy(() => import('./components/Education'))
const Achievements = lazy(() => import('./components/Achievements'))
const Projects = lazy(() => import('./components/Projects'))
const WorkWithMe = lazy(() => import('./components/WorkWithMe'))
const Contact = lazy(() => import('./components/Contact'))

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-2 border-glass-border border-t-blue-primary rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Navbar />
            <main>
              <Hero />
              <Suspense fallback={<SectionFallback />}>
                <About />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Experience />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Education />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Achievements />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Projects />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <WorkWithMe />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Contact />
              </Suspense>
            </main>
            <Footer />
            <AutoScroll />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
