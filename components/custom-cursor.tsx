"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)
  const positionRef = useRef({ x: -100, y: -100 })
  const targetRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Check for touch device
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    setIsTouchDevice(isTouch)
    if (isTouch) return

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const attachHoverListeners = () => {
      const elements = document.querySelectorAll(
        "a, button, [role='button'], [data-hover]"
      )
      elements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true))
        el.addEventListener("mouseleave", () => setIsHovering(false))
      })
    }

    const animate = () => {
      positionRef.current.x +=
        (targetRef.current.x - positionRef.current.x) * 0.12
      positionRef.current.y +=
        (targetRef.current.y - positionRef.current.y) * 0.12

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x - 28}px, ${positionRef.current.y - 28}px, 0)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetRef.current.x - 4}px, ${targetRef.current.y - 4}px, 0)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    attachHoverListeners()
    rafRef.current = requestAnimationFrame(animate)

    const observer = new MutationObserver(attachHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      observer.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [isVisible])

  if (isTouchDevice) return null

  return (
    <>
      {/* Outer hollow ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: isHovering ? "2px solid #F4793A" : "1.5px solid rgba(255,255,255,0.6)",
            backgroundColor: "transparent",
            transform: isHovering ? "scale(1.6)" : "scale(1)",
            transition:
              "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease",
            mixBlendMode: "difference",
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
          willChange: "transform",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: isHovering ? "#F4793A" : "#FFFFFF",
            transition: "background-color 0.3s ease, transform 0.3s ease",
            transform: isHovering ? "scale(0)" : "scale(1)",
          }}
        />
      </div>
    </>
  )
}
