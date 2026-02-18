"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const checkHoverState = () => {
      const elements = document.querySelectorAll("a, button, [role='button'], [data-hover]")
      elements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true))
        el.addEventListener("mouseleave", () => setIsHovering(false))
      })
    }

    const animate = () => {
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.15
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.15

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${positionRef.current.x - 24}px, ${positionRef.current.y - 24}px)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetRef.current.x - 4}px, ${targetRef.current.y - 4}px)`
      }

      requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    checkHoverState()
    animate()

    const observer = new MutationObserver(checkHoverState)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      observer.disconnect()
    }
  }, [isVisible])

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null
  }

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: isHovering ? "2px solid #F4793A" : "2px solid #FFFFFF",
            backgroundColor: isHovering ? "rgba(244, 121, 58, 0.1)" : "transparent",
            transform: isHovering ? "scale(1.5)" : "scale(1)",
            transition: "transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease",
            mixBlendMode: isHovering ? "difference" : "normal",
          }}
        />
      </div>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: isHovering ? "#F4793A" : "#FFFFFF",
            transition: "background-color 0.3s ease",
          }}
        />
      </div>
    </>
  )
}
