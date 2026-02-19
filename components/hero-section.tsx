"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { ScatteredTextLine } from "./scattered-text"

// Split text for character animation (for subtitle)
function AnimatedText({
  text,
  className,
  delay = 0,
  stagger = 0.03
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}

// Magnetic button component
function MagneticButton({
  children,
  href,
  className
}: {
  children: React.ReactNode
  href: string
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 15 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      download
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-hover
      data-hover-text="DOWNLOAD"
    >
      {children}
    </motion.a>
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] px-[8vw] pt-32 pb-24 flex flex-col justify-between bg-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full blur-[150px]"
          style={{
            background: "radial-gradient(circle, rgba(244,121,58,0.08) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Decorative index - Top Right */}
      <motion.div
        className="absolute top-32 right-[8vw] z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.5em] font-medium text-white/30">
          01
        </span>
      </motion.div>

      {/* Floating particles - only render on client */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              initial={{
                left: `${10 + (i * 6)}%`,
                top: `${20 + (i * 5) % 60}%`,
                opacity: 0,
              }}
              animate={{
                y: [0, -80, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 4 + (i % 3),
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <motion.div
        className="flex-1 flex flex-col justify-center relative z-10"
        style={{ y, opacity, scale }}
      >
        {/* Primary Name with SCATTERED EFFECT */}
        <h1 className="font-sans font-black text-white leading-[0.85] tracking-[-0.03em] uppercase">
          {/* First name - scattered */}
          <div className="overflow-visible mb-2">
            <ScatteredTextLine
              text="VANAMA"
              className="text-[clamp(3.5rem,12vw,12rem)]"
              delay={0.3}
            />
          </div>

          {/* Last name - scattered with delay */}
          <div className="overflow-visible">
            <ScatteredTextLine
              text="YASWANTH"
              className="text-[clamp(3.5rem,12vw,12rem)]"
              delay={0.6}
            />
          </div>
        </h1>

        {/* Interactive hint */}
        <motion.div
          className="mt-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/20">
            ↑ Hover over the letters
          </span>
        </motion.div>

        {/* Subtitle/Role with stagger */}
        <motion.div
          className="mt-8 md:mt-12 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="font-mono text-[clamp(0.75rem,1.5vw,1rem)] uppercase tracking-[0.3em] text-white/40">
            <AnimatedText text="GenAI/LLM Engineer" delay={1.4} stagger={0.02} />
            <span className="text-white/20 mx-3">—</span>
            <span className="text-primary font-semibold">
              <AnimatedText text="Architecting Agentic Intelligence" delay={1.8} stagger={0.02} />
            </span>
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom Row - Description & Scroll Indicator */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        {/* Description & CTA */}
        <div className="flex flex-col gap-6 max-w-md">
          <p className="font-mono text-[0.85rem] md:text-[0.95rem] leading-[1.8] text-white/40">
            Building self-correcting multi-agent systems powered by LangGraph
            and AWS Bedrock. 3+ years transforming enterprise workflows.
          </p>
          <MagneticButton
            href="/Vanama_Yaswanth_GenAI_LLM.pdf"
            className="group inline-flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] font-semibold text-primary border border-primary/40 px-6 py-4 w-fit bg-transparent hover:bg-primary hover:text-black transition-all duration-500"
          >
            <span>Download Resume</span>
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ y: [0, 2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4m-8 8h8" />
            </motion.svg>
          </MagneticButton>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex items-center gap-4 shrink-0"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/30">
            Scroll
          </span>
          <div className="w-12 h-px bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 w-4 bg-primary"
              animate={{ x: ["-100%", "400%"] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.3 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-0 left-[8vw] right-[8vw] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </section>
  )
}
