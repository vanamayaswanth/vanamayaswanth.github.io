"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { StaggeredText, FadeUp } from "@/components/staggered-text"

const links = [
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Twitter / X", href: "#" },
]

export function ContactFooter() {
  const linksRef = useRef<HTMLDivElement>(null)
  const linksInView = useInView(linksRef, { once: true, margin: "-10%" })

  return (
    <section id="contact" className="px-6 md:px-12 lg:px-20 py-24 md:py-40">
      {/* Section header */}
      <div className="mb-16 md:mb-24">
        <FadeUp>
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary block mb-4">
            04 / Connect
          </span>
        </FadeUp>
        <StaggeredText
          text={"Let's architect something extraordinary."}
          as="h2"
          className="font-sans text-3xl md:text-5xl lg:text-7xl font-[900] text-foreground tracking-tight leading-tight max-w-4xl text-balance"
          delay={0.1}
          staggerDelay={0.05}
        />
      </div>

      {/* Contact links */}
      <div ref={linksRef} className="flex flex-col gap-0">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            data-hover
            className="group flex items-center justify-between py-6 md:py-8 border-t border-border transition-all duration-300 hover:pl-4"
            initial={{ x: -40, opacity: 0 }}
            animate={linksInView ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.1,
            }}
          >
            <span className="font-sans text-lg md:text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
              {link.label}
            </span>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1" />
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <FadeUp className="mt-24 md:mt-40" delay={0.3}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Vanama Yaswanth / 2026
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Architecting Agentic Intelligence
          </span>
        </div>
      </FadeUp>
    </section>
  )
}
