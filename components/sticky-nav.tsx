"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { FullscreenNav } from "./fullscreen-nav"

function MagneticLink({ children, href, className, dataHoverText }: {
  children: React.ReactNode
  href: string
  className?: string
  dataHoverText?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * 0.3
    const y = (clientY - (top + height / 2)) * 0.3
    setPosition({ x, y })
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      data-hover
      data-hover-text={dataHoverText}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.a>
  )
}

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: hidden ? -100 : 0,
          opacity: hidden ? 0 : 1
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[8vw] transition-all duration-500 ${
          scrolled
            ? "py-4 bg-black/90 backdrop-blur-2xl border-b border-white/[0.03]"
            : "py-8 bg-transparent"
        }`}
      >
        <MagneticLink
          href="#"
          className="font-sans text-2xl font-black tracking-[-0.05em] text-white transition-colors duration-300 hover:text-primary"
          dataHoverText="HOME"
        >
          VY
        </MagneticLink>

        <div className="flex items-center gap-6 md:gap-10">
          {/* Menu button */}
          <button
            onClick={() => setIsNavOpen(true)}
            className="group flex items-center gap-4 cursor-none py-2"
            data-hover
            data-hover-text="MENU"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] font-semibold text-white/70 group-hover:text-white transition-colors duration-300">
              Menu
            </span>
            <div className="flex flex-col gap-1.5">
              <div className="w-6 h-[2px] bg-white/70 group-hover:bg-primary transition-colors" />
              <div className="w-4 h-[2px] bg-white/70 group-hover:bg-primary transition-colors" />
            </div>
          </button>

          {/* CTA Button */}
          <MagneticLink
            href="#contact"
            dataHoverText="CHAT"
            className="hidden md:flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] font-semibold text-white/80 border border-white/30 px-6 py-3 transition-all duration-500 hover:border-primary hover:text-primary hover:bg-primary/10"
          >
            <span>Let's Talk</span>
            <span>→</span>
          </MagneticLink>
        </div>
      </motion.nav>

      <FullscreenNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  )
}
