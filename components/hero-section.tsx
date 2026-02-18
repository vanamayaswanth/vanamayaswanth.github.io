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
      className="relative flex flex-col justify-between min-h-screen px-[8vw] py-24 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(244,121,58,0.03) 0%, transparent 60%)",
      }}
    >
      {/* Decorative index */}
      <motion.div
        className="absolute top-32 right-[8vw]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="font-mono text-[12px] uppercase tracking-[0.2em] font-medium text-muted-foreground">
          01
        </span>
      </motion.div>

      {/* Spacer for nav */}
      <div className="pt-32 md:pt-40" />

      {/* Main heading - fills 60vh */}
      <div className="flex flex-col justify-center" style={{ height: "60vh" }}>
        <motion.p
          className="font-mono text-[12px] uppercase tracking-[0.4em] font-medium text-primary mb-8 md:mb-12"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          GenAI / LLM Engineer & CTO
        </motion.p>

        <h1 className="font-sans font-[900] text-foreground leading-none tracking-tighter">
          <StaggeredText
            text="VANAMA"
            className="block text-[10vw]"
            delay={0.3}
            staggerDelay={0.07}
            splitBy="character"
          />
          <StaggeredText
            text="YASWANTH"
            className="block text-[10vw] -mt-[1vw]"
            delay={0.7}
            staggerDelay={0.05}
            splitBy="character"
          />
        </h1>

        <div className="mt-6 md:mt-10">
          <span className="block overflow-hidden">
            <StaggeredText
              text="ARCHITECTING"
              className="text-[clamp(1.1rem,3.5vw,4rem)] font-bold text-muted-foreground tracking-tighter"
              delay={1.2}
              staggerDelay={0.04}
              splitBy="character"
            />
          </span>
          <span className="block overflow-hidden">
            <span className="inline-block overflow-hidden">
              <motion.span
                className="inline-block text-[clamp(1.1rem,3.5vw,4rem)] font-bold text-primary tracking-tighter"
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 1.6,
                }}
              >
                AGENTIC
              </motion.span>
            </span>
            <StaggeredText
              text=" INTELLIGENCE"
              className="text-[clamp(1.1rem,3.5vw,4rem)] font-bold text-muted-foreground tracking-tighter"
              delay={1.7}
              staggerDelay={0.04}
              splitBy="character"
            />
          </span>
        </div>
      </div>

      {/* Sub-text */}
      <FadeUp className="max-w-lg mb-8" delay={2.0}>
        <p className="font-mono text-[1.125rem] leading-relaxed text-muted-foreground">
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
        transition={{ duration: 1, delay: 2.4 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          Scroll
        </span>
        <div className="w-px h-12 bg-muted-foreground/30 relative overflow-hidden">
          <div
            className="w-full h-4 bg-primary absolute top-0"
            style={{ animation: "scrollDown 2s ease-in-out infinite" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
