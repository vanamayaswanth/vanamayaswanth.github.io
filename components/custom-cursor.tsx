"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const position = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })

  const handleHoverEnter = useCallback(() => setIsHovering(true), [])
  const handleHoverLeave = useCallback(() => setIsHovering(false), [])

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true)
      return
    }

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }
    const onEnter = () => setIsVisible(true)
    const onLeave = () => setIsVisible(false)

    const bindHoverables = () => {
      document.querySelectorAll("a, button, [role='button'], [data-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverEnter)
        el.removeEventListener("mouseleave", handleHoverLeave)
        el.addEventListener("mouseenter", handleHoverEnter)
        el.addEventListener("mouseleave", handleHoverLeave)
      })
    }

    let raf: number
    const animate = () => {
      const ease = 0.12
      position.current.x += (target.current.x - position.current.x) * ease
      position.current.y += (target.current.y - position.current.y) * ease

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${position.current.x - 28}px, ${position.current.y - 28}px, 0)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x - 4}px, ${target.current.y - 4}px, 0)`
      }
      raf = requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseenter", onEnter)
    document.addEventListener("mouseleave", onLeave)
    bindHoverables()
    animate()

    const observer = new MutationObserver(bindHoverables)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mouseleave", onLeave)
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [isVisible, handleHoverEnter, handleHoverLeave])

  if (isTouchDevice) return null

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block will-change-transform"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
        aria-hidden="true"
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: isHovering ? "2px solid #F4793A" : "1.5px solid rgba(255,255,255,0.5)",
            backgroundColor: "transparent",
            transform: isHovering ? "scale(1.6)" : "scale(1)",
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease",
            mixBlendMode: "difference",
          }}
        />
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block will-change-transform"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
        aria-hidden="true"
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
