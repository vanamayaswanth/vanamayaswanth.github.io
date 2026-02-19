"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [hoverText, setHoverText] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const position = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const followerPos = useRef({ x: -100, y: -100 })

  const handleHoverEnter = useCallback((e: any) => {
    setIsHovering(true)
    const el = e.currentTarget
    const text = el.getAttribute('data-hover-text')
    setHoverText(text || (el.tagName === 'A' ? 'VIEW' : null))
  }, [])

  const handleHoverLeave = useCallback(() => {
    setIsHovering(false)
    setHoverText(null)
  }, [])

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
    const onDown = () => setIsClicking(true)
    const onUp = () => setIsClicking(false)

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
      // Main cursor - fast follow
      const cursorEase = 0.2
      position.current.x += (target.current.x - position.current.x) * cursorEase
      position.current.y += (target.current.y - position.current.y) * cursorEase

      // Follower - slower, more elastic
      const followerEase = 0.08
      followerPos.current.x += (target.current.x - followerPos.current.x) * followerEase
      followerPos.current.y += (target.current.y - followerPos.current.y) * followerEase

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`
      }

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%)`
      }

      raf = requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseenter", onEnter)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mousedown", onDown)
    document.addEventListener("mouseup", onUp)
    bindHoverables()
    animate()

    const observer = new MutationObserver(bindHoverables)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("mouseup", onUp)
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [isVisible, handleHoverEnter, handleHoverLeave, isClicking])

  if (isTouchDevice) return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[10001] hidden md:block will-change-transform"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        aria-hidden="true"
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: isHovering ? "#F4793A" : "#fff",
            transition: "background-color 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)",
            transform: isHovering ? "scale(0)" : "scale(1)",
          }}
        />
      </div>

      {/* Follower ring with blend mode */}
      <div
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] hidden md:flex items-center justify-center will-change-transform"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
          mixBlendMode: "difference",
        }}
        aria-hidden="true"
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            width: isHovering ? 120 : 48,
            height: isHovering ? 120 : 48,
            borderRadius: isHovering ? "50%" : "50%",
            border: "1px solid white",
            backgroundColor: isHovering ? "white" : "transparent",
            transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Hover text */}
          <span
            ref={textRef}
            className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black"
            style={{
              opacity: isHovering && hoverText ? 1 : 0,
              transform: isHovering && hoverText ? "scale(1)" : "scale(0.8)",
              transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {hoverText}
          </span>
        </div>
      </div>

      {/* Trailing particles on hover */}
      {isHovering && (
        <div
          className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
          aria-hidden="true"
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{
                left: followerPos.current.x,
                top: followerPos.current.y,
                transform: `translate(-50%, -50%)`,
                opacity: 0.5 - i * 0.15,
                transition: `all ${0.3 + i * 0.1}s ease-out`,
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}
