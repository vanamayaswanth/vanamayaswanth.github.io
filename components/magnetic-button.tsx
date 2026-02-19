"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  as?: "button" | "a" | "div"
  href?: string
  onClick?: () => void
  dataHover?: boolean
  dataHoverText?: string
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as: Component = "button",
  href,
  onClick,
  dataHover = true,
  dataHoverText,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()

    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)

    setPosition({ x: middleX * strength, y: middleY * strength })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const MotionComponent = motion[Component] as any

  const props = {
    ref,
    className,
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    animate: position,
    transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
    onClick,
    ...(href && { href }),
    ...(dataHover && { "data-hover": true }),
    ...(dataHoverText && { "data-hover-text": dataHoverText }),
  }

  return <MotionComponent {...props}>{children}</MotionComponent>
}

interface MagneticTextProps {
  children: React.ReactNode
  className?: string
}

export function MagneticText({ children, className = "" }: MagneticTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()

    const x = (clientX - (left + width / 2)) * 0.15
    const y = (clientY - (top + height / 2)) * 0.15

    setPosition({ x, y })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={position}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.span>
  )
}
