"use client"

import { useEffect, useRef } from "react"

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
      className="relative flex flex-col justify-end min-h-screen px-6 md:px-12 pb-16 md:pb-24 pt-32 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(244,121,58,0.04) 0%, transparent 50%)",
      }}
    >
      {/* Decorative index */}
      <div className="absolute top-32 right-6 md:right-12">
        <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
          01
        </span>
      </div>

      {/* Main heading */}
      <div className="max-w-6xl">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-8 md:mb-12">
          GenAI/LLM Engineer & CTO
        </p>

        <h1 className="font-sans font-extrabold text-foreground leading-[0.9] tracking-tight">
          <span className="block text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-balance">
            VANAMA
          </span>
          <span className="block text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-balance">
            YASWANTH
          </span>
          <span className="block mt-4 md:mt-6 text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-muted-foreground text-balance">
            ARCHITECTING
            <span className="text-primary">{" AGENTIC "}</span>
            INTELLIGENCE
          </span>
        </h1>

        <p className="max-w-xl mt-12 md:mt-16 font-mono text-sm md:text-base leading-relaxed text-muted-foreground">
          Building self-correcting multi-agent systems powered by LangGraph
          and AWS Bedrock. Transforming enterprise workflows through recursive
          agentic loops and intelligent document processing.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          Scroll
        </span>
        <div className="w-px h-12 bg-muted-foreground/30 relative overflow-hidden">
          <div className="w-full h-4 bg-primary animate-pulse absolute top-0 animate-[scrollDown_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}
