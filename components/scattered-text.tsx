"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion"

interface ScatteredTextProps {
  text: string
  className?: string
  scatterRadius?: number
  animationDelay?: number
  hoverScatterRadius?: number
}

interface LetterPosition {
  char: string
  finalX: number
  finalY: number
  initialX: number
  initialY: number
  initialRotation: number
  index: number
}

export function ScatteredText({
  text,
  className = "",
  scatterRadius = 400,
  animationDelay = 0.5,
  hoverScatterRadius = 150,
}: ScatteredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAnimated, setIsAnimated] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Generate letter positions
  const letters = useMemo(() => {
    const result: LetterPosition[] = []
    let currentX = 0
    const charWidth = 0.7 // Approximate em width per character

    text.split("").forEach((char, index) => {
      if (char === " ") {
        currentX += 0.4 // Space width
        return
      }

      // Random scatter positions
      const angle = Math.random() * Math.PI * 2
      const distance = scatterRadius * (0.5 + Math.random() * 0.5)

      result.push({
        char,
        finalX: currentX,
        finalY: 0,
        initialX: Math.cos(angle) * distance,
        initialY: Math.sin(angle) * distance,
        initialRotation: (Math.random() - 0.5) * 360,
        index,
      })

      currentX += charWidth
    })

    return result
  }, [text, scatterRadius])

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Trigger animation after delay
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), animationDelay * 1000)
    return () => clearTimeout(timer)
  }, [animationDelay])

  // Track mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    mouseX.set(-1000)
    mouseY.set(-1000)
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      {/* Invisible text for layout */}
      <span className="invisible">{text}</span>

      {/* Animated letters */}
      <div className="absolute inset-0 flex items-center">
        {letters.map((letter, i) => (
          <ScatteredLetter
            key={`${letter.char}-${i}`}
            letter={letter}
            isAnimated={isAnimated}
            mouseX={mouseX}
            mouseY={mouseY}
            containerWidth={dimensions.width}
            containerHeight={dimensions.height}
            hoverScatterRadius={hoverScatterRadius}
            totalLetters={letters.length}
          />
        ))}
      </div>
    </div>
  )
}

function ScatteredLetter({
  letter,
  isAnimated,
  mouseX,
  mouseY,
  containerWidth,
  containerHeight,
  hoverScatterRadius,
  totalLetters,
}: {
  letter: LetterPosition
  isAnimated: boolean
  mouseX: ReturnType<typeof useMotionValue>
  mouseY: ReturnType<typeof useMotionValue>
  containerWidth: number
  containerHeight: number
  hoverScatterRadius: number
  totalLetters: number
}) {
  const letterRef = useRef<HTMLSpanElement>(null)

  // Calculate final position in pixels
  const fontSize = containerWidth / (totalLetters * 0.55)
  const finalXPx = letter.finalX * fontSize * 0.85

  // Spring configs for smooth animation
  const springConfig = { stiffness: 100, damping: 20, mass: 1 }
  const hoverSpringConfig = { stiffness: 300, damping: 25, mass: 0.5 }

  // Animation springs
  const x = useSpring(letter.initialX, springConfig)
  const y = useSpring(letter.initialY, springConfig)
  const rotation = useSpring(letter.initialRotation, springConfig)
  const scale = useSpring(0.5, springConfig)
  const opacity = useSpring(0, springConfig)

  // Hover offset springs
  const hoverX = useSpring(0, hoverSpringConfig)
  const hoverY = useSpring(0, hoverSpringConfig)

  // Animate to final position
  useEffect(() => {
    if (isAnimated) {
      const delay = letter.index * 30

      setTimeout(() => {
        x.set(finalXPx)
        y.set(0)
        rotation.set(0)
        scale.set(1)
        opacity.set(1)
      }, delay)
    }
  }, [isAnimated, finalXPx, letter.index, x, y, rotation, scale, opacity])

  // React to mouse position
  useEffect(() => {
    const unsubX = mouseX.on("change", (mx) => {
      const my = mouseY.get()
      if (!letterRef.current || mx < 0) {
        hoverX.set(0)
        hoverY.set(0)
        return
      }

      const rect = letterRef.current.getBoundingClientRect()
      const parentRect = letterRef.current.parentElement?.getBoundingClientRect()
      if (!parentRect) return

      const letterCenterX = rect.left - parentRect.left + rect.width / 2
      const letterCenterY = rect.top - parentRect.top + rect.height / 2

      const dx = letterCenterX - mx
      const dy = letterCenterY - my
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < hoverScatterRadius) {
        const force = (1 - distance / hoverScatterRadius) * 50
        const angle = Math.atan2(dy, dx)
        hoverX.set(Math.cos(angle) * force)
        hoverY.set(Math.sin(angle) * force)
      } else {
        hoverX.set(0)
        hoverY.set(0)
      }
    })

    return () => unsubX()
  }, [mouseX, mouseY, hoverX, hoverY, hoverScatterRadius])

  // Combine transforms
  const combinedX = useTransform([x, hoverX], ([xVal, hxVal]) => (xVal as number) + (hxVal as number))
  const combinedY = useTransform([y, hoverY], ([yVal, hyVal]) => (yVal as number) + (hyVal as number))

  return (
    <motion.span
      ref={letterRef}
      className="absolute inline-block font-black will-change-transform cursor-default select-none"
      style={{
        x: combinedX,
        y: combinedY,
        rotate: rotation,
        scale,
        opacity,
        left: 0,
        transformOrigin: "center center",
      }}
    >
      {letter.char}
    </motion.span>
  )
}

// Simpler version for the second line with different timing
export function ScatteredTextLine({
  text,
  className = "",
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAnimated, setIsAnimated] = useState(false)
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    mouseX.set(-1000)
    mouseY.set(-1000)
  }

  const characters = text.split("")

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {characters.map((char, i) => (
        <ScatteredChar
          key={i}
          char={char}
          index={i}
          isAnimated={isAnimated}
          mouseX={mouseX}
          mouseY={mouseY}
          total={characters.length}
        />
      ))}
    </div>
  )
}

function ScatteredChar({
  char,
  index,
  isAnimated,
  mouseX,
  mouseY,
  total,
}: {
  char: string
  index: number
  isAnimated: boolean
  mouseX: ReturnType<typeof useMotionValue>
  mouseY: ReturnType<typeof useMotionValue>
  total: number
}) {
  const charRef = useRef<HTMLSpanElement>(null)

  // Random initial values
  const initialX = useMemo(() => (Math.random() - 0.5) * 600, [])
  const initialY = useMemo(() => (Math.random() - 0.5) * 400, [])
  const initialRotation = useMemo(() => (Math.random() - 0.5) * 180, [])

  const springConfig = { stiffness: 120, damping: 20, mass: 0.8 }
  const hoverConfig = { stiffness: 400, damping: 30 }

  const x = useSpring(initialX, springConfig)
  const y = useSpring(initialY, springConfig)
  const rotation = useSpring(initialRotation, springConfig)
  const scale = useSpring(0.3, springConfig)
  const opacity = useSpring(0, springConfig)

  const hoverX = useSpring(0, hoverConfig)
  const hoverY = useSpring(0, hoverConfig)

  useEffect(() => {
    if (isAnimated) {
      const stagger = index * 25

      setTimeout(() => {
        x.set(0)
        y.set(0)
        rotation.set(0)
        scale.set(1)
        opacity.set(1)
      }, stagger)
    }
  }, [isAnimated, index, x, y, rotation, scale, opacity])

  // Mouse repulsion
  useEffect(() => {
    const unsubscribe = mouseX.on("change", (mx) => {
      const my = mouseY.get()
      if (!charRef.current || mx < -500) {
        hoverX.set(0)
        hoverY.set(0)
        return
      }

      const rect = charRef.current.getBoundingClientRect()
      const parentRect = charRef.current.parentElement?.getBoundingClientRect()
      if (!parentRect) return

      const centerX = rect.left - parentRect.left + rect.width / 2
      const centerY = rect.top - parentRect.top + rect.height / 2

      const dx = centerX - mx
      const dy = centerY - my
      const dist = Math.sqrt(dx * dx + dy * dy)

      const radius = 120
      if (dist < radius && dist > 0) {
        const force = ((radius - dist) / radius) * 40
        const angle = Math.atan2(dy, dx)
        hoverX.set(Math.cos(angle) * force)
        hoverY.set(Math.sin(angle) * force)
      } else {
        hoverX.set(0)
        hoverY.set(0)
      }
    })

    return () => unsubscribe()
  }, [mouseX, mouseY, hoverX, hoverY])

  const finalX = useTransform([x, hoverX], ([a, b]) => (a as number) + (b as number))
  const finalY = useTransform([y, hoverY], ([a, b]) => (a as number) + (b as number))

  if (char === " ") {
    return <span className="inline-block w-[0.3em]">&nbsp;</span>
  }

  return (
    <motion.span
      ref={charRef}
      className="inline-block will-change-transform cursor-default"
      style={{
        x: finalX,
        y: finalY,
        rotate: rotation,
        scale,
        opacity,
      }}
    >
      {char}
    </motion.span>
  )
}
