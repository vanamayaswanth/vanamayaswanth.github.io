"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { StaggeredText, FadeUp } from "@/components/staggered-text"

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      containerRef.current.style.setProperty("--mouse-x", `${x}%`)
      containerRef.current.style.setProperty("--mouse-y", `${y}%`)
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-center min-h-screen px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(244,121,58,0.04) 0%, transparent 50%)",
      }}
    >
      {/* Decorative index */}
      <motion.div
        className="absolute top-32 right-6 md:right-12 lg:right-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
          01
        </span>
      </motion.div>

      {/* Main heading - takes up ~60vh */}
      <div className="flex flex-col justify-center" style={{ minHeight: "60vh" }}>
        <motion.p
          className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-6 md:mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          GenAI/LLM Engineer & CTO
        </motion.p>

        <h1 className="font-sans font-[900] text-foreground leading-[0.85] tracking-tighter">
          <StaggeredText
            text="VANAMA"
            className="block text-[clamp(4rem,15vw,14rem)]"
            delay={0.3}
            staggerDelay={0.06}
          />
          <StaggeredText
            text="YASWANTH"
            className="block text-[clamp(4rem,15vw,14rem)] -mt-2 md:-mt-4"
            delay={0.6}
            staggerDelay={0.05}
          />
          <span className="block mt-4 md:mt-8">
            <StaggeredText
              text="ARCHITECTING"
              className="text-[clamp(1.25rem,4vw,4.5rem)] font-bold text-muted-foreground"
              delay={1.0}
              staggerDelay={0.04}
            />
            <span className="overflow-hidden inline-block">
              <motion.span
                className="inline-block text-[clamp(1.25rem,4vw,4.5rem)] font-bold text-primary"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
              >
                {"\u00A0AGENTIC\u00A0"}
              </motion.span>
            </span>
            <StaggeredText
              text="INTELLIGENCE"
              className="text-[clamp(1.25rem,4vw,4.5rem)] font-bold text-muted-foreground"
              delay={1.4}
              staggerDelay={0.04}
            />
          </span>
        </h1>
      </div>

      {/* Sub-text */}
      <FadeUp className="max-w-xl mt-8 md:mt-12" delay={1.8}>
        <p className="font-mono text-sm md:text-base leading-relaxed text-muted-foreground">
          Building self-correcting multi-agent systems powered by LangGraph
          and AWS Bedrock. Transforming enterprise workflows through recursive
          agentic loops and intelligent document processing.
        </p>
      </FadeUp>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          Scroll
        </span>
        <div className="w-px h-12 bg-muted-foreground/30 relative overflow-hidden">
          <div className="w-full h-4 bg-primary absolute top-0" style={{ animation: "scrollDown 2s ease-in-out infinite" }} />
        </div>
      </motion.div>
    </section>
  )
}
