"use client"

import { useEffect, useState } from "react"

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
      for (const section of sections.reverse()) {
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
        scrolled ? "py-4 bg-background/80 backdrop-blur-md" : "py-8 bg-transparent"
      }`}
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
            className={`relative font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
              activeSection === link.href.replace("#", "")
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {link.label}
            {activeSection === link.href.replace("#", "") && (
              <span className="absolute -bottom-1 left-0 w-full h-px bg-primary" />
            )}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        data-hover
        className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground transition-colors duration-300 hover:text-primary"
      >
        Get in touch
      </a>
    </nav>
  )
}
