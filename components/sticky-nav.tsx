"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Authority", href: "#authority" },
  { label: "Contact", href: "#contact" },
]

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)

      const sections = ["work", "authority", "contact"]
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[8vw] transition-all duration-500 ${
        scrolled ? "py-4 bg-background/80 backdrop-blur-md" : "py-8 bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
    >
      <a
        href="#"
        className="font-sans text-sm font-bold tracking-[0.3em] uppercase text-foreground transition-colors duration-300 hover:text-primary"
        data-hover
      >
        VY
      </a>

      <div className="hidden md:flex items-center gap-12">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            data-hover
            className={`relative font-mono text-[12px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
              activeSection === link.href.replace("#", "")
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {link.label}
            {activeSection === link.href.replace("#", "") && (
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-px bg-primary"
                layoutId="nav-underline"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        data-hover
        className="font-mono text-[12px] uppercase tracking-[0.2em] font-medium text-muted-foreground transition-colors duration-300 hover:text-primary"
      >
        Get in touch
      </a>
    </motion.nav>
  )
}
