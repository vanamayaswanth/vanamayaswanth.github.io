"use client"

import { motion } from "framer-motion"

interface MarqueeProps {
  items: string[]
  speed?: number
  separator?: string
  className?: string
  direction?: "left" | "right"
}

export function Marquee({
  items,
  speed = 25,
  separator = "•",
  className = "",
  direction = "left"
}: MarqueeProps) {
  const content = items.join(` ${separator} `) + ` ${separator} `
  const duplicatedContent = content.repeat(4)

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        <span className="inline-block font-mono text-[12px] md:text-[14px] uppercase tracking-[0.3em] font-medium">
          {duplicatedContent}
        </span>
      </motion.div>
    </div>
  )
}

export function MarqueeBanner() {
  const skills = [
    "Agentic AI",
    "LLMOps",
    "LangGraph",
    "AWS Bedrock",
    "Multi-Agent Systems",
    "RAG",
    "IDP",
    "PII Redaction"
  ]

  return (
    <div className="relative py-5 border-y border-white/10 bg-black overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <Marquee
        items={skills}
        speed={60}
        separator="•"
        className="text-white/50"
      />
    </div>
  )
}
