"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const navLinks = [
  { label: "Home", href: "#", index: "01" },
  { label: "Work", href: "#work", index: "02" },
  { label: "Authority", href: "#authority", index: "03" },
  { label: "Contact", href: "#contact", index: "04" },
]

interface FullscreenNavProps {
  isOpen: boolean
  onClose: () => void
}

function MagneticNavLink({ children, href, onClick, index, delay }: {
  children: React.ReactNode
  href: string
  onClick: () => void
  index: string
  delay: number
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * 0.15
    const y = (clientY - (top + height / 2)) * 0.3
    setPosition({ x, y })
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      className="group relative flex items-baseline gap-6 md:gap-10 py-3 overflow-hidden"
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      data-hover
      data-hover-text="GO"
    >
      <motion.span
        className="font-mono text-[clamp(0.8rem,1.5vw,1.2rem)] text-primary/50 font-medium"
        animate={position}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        {index}
      </motion.span>
      <motion.span
        className="font-sans text-[clamp(3rem,10vw,10rem)] font-black text-white leading-[0.9] tracking-[-0.02em] uppercase group-hover:text-primary transition-colors duration-300"
        animate={position}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        {children}
      </motion.span>

      {/* Hover line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-primary origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%" }}
      />
    </motion.a>
  )
}

export function FullscreenNav({ isOpen, onClose }: FullscreenNavProps) {
  // Disable body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with staggered reveal */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Content */}
          <motion.div
            className="fixed inset-0 z-[101] px-[8vw] py-12 md:py-20 flex flex-col justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <motion.span
                className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Navigation
              </motion.span>

              <motion.button
                onClick={onClose}
                className="group flex items-center gap-4 cursor-none"
                data-hover
                data-hover-text="CLOSE"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30 group-hover:text-white transition-colors">
                  Close
                </span>
                <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-primary group-hover:rotate-90 transition-all duration-500">
                  <X className="w-4 h-4 text-white/50 group-hover:text-primary transition-colors" />
                </div>
              </motion.button>
            </div>

            {/* Links */}
            <nav className="flex flex-col -my-2">
              {navLinks.map((link, i) => (
                <MagneticNavLink
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  index={link.index}
                  delay={0.3 + i * 0.08}
                >
                  {link.label}
                </MagneticNavLink>
              ))}
            </nav>

            {/* Footer */}
            <motion.div
              className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-white/5 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-white/20">
                  Get in touch
                </span>
                <a
                  href="mailto:vanamayaswanth1212@gmail.com"
                  className="font-sans text-lg md:text-xl font-bold text-white/60 hover:text-primary transition-colors"
                  data-hover
                >
                  vanamayaswanth1212@gmail.com
                </a>
                <a
                  href="/Vanama_Yaswanth_GenAI_LLM.pdf"
                  download
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] font-semibold text-primary border border-primary/50 px-4 py-2 w-fit mt-2 transition-all duration-500 hover:bg-primary hover:text-black"
                  data-hover
                >
                  <span>Download Resume</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4m-8 8h8" />
                  </svg>
                </a>
              </div>

              <div className="flex gap-10">
                {[
                  { label: "LinkedIn", href: "https://linkedin.com/in/vanamayaswanth" },
                  { label: "GitHub", href: "https://github.com/vanamayaswanth" },
                  { label: "X", href: "https://x.com/vanamayaswanth" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/30 hover:text-primary transition-colors"
                    data-hover
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
