import { useState, useEffect, useCallback, useRef } from 'react'

// ─── useScrollProgress ───
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let requestRunning = false
    const handleScroll = () => {
      if (requestRunning) return
      requestRunning = true
      
      requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrolled = (window.scrollY / totalHeight) * 100
        setProgress(scrolled)
        requestRunning = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return progress
}

// ─── useActiveSection ───
export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}

// ─── useTypewriter ───
export function useTypewriter(words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout

    const handleType = () => {
      const currentWord = words[wordIndex]
      
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1))
        
        if (text === currentWord) {
          timeout = setTimeout(() => setIsDeleting(true), pauseTime)
        } else {
          timeout = setTimeout(handleType, typingSpeed)
        }
      } else {
        setText(currentWord.substring(0, text.length - 1))
        
        if (text === '') {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
          timeout = setTimeout(handleType, typingSpeed)
        } else {
          timeout = setTimeout(handleType, deletingSpeed)
        }
      }
    }

    timeout = setTimeout(handleType, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime])

  return text
}

// ─── useMousePosition ───
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.dataset.cursor === 'pointer'
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return { position, isHovering }
}
