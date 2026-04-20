import { useRef, useState, useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Magnetic({ children, damping = 15, stiffness = 150, boost = 1 }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Physics springs for smooth return
  const x = useSpring(position.x, { damping, stiffness, mass: 0.5 })
  const y = useSpring(position.y, { damping, stiffness, mass: 0.5 })

  useEffect(() => {
    x.set(position.x)
    y.set(position.y)
  }, [position, x, y])

  const handleMouse = (e) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    
    // Calculate distance from center
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    
    // Boost determines how strongly it magnetizes
    setPosition({ x: middleX * 0.3 * boost, y: middleY * 0.3 * boost })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x, y }}
      className="inline-block" // Ensure it doesn't break layout
    >
      {children}
    </motion.div>
  )
}
