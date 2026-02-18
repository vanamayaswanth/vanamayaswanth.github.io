"use client"

import { ArrowUpRight } from "lucide-react"

const links = [
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Twitter / X", href: "#" },
]

export function ContactFooter() {
  return (
    <section id="contact" className="px-6 md:px-12 py-24 md:py-40">
      {/* Section header */}
      <div className="mb-16 md:mb-24">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary block mb-4">
          04 / Connect
        </span>
        <h2 className="font-sans text-3xl md:text-5xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-tight max-w-4xl text-balance">
          {"Let's architect something extraordinary."}
        </h2>
      </div>

      {/* Contact links */}
      <div className="flex flex-col gap-0">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            data-hover
            className="group flex items-center justify-between py-6 md:py-8 border-t border-border transition-all duration-300 hover:pl-4"
          >
            <span className="font-sans text-lg md:text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
              {link.label}
            </span>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-24 md:mt-40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          Vanama Yaswanth / 2026
        </span>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          Architecting Agentic Intelligence
        </span>
      </div>
    </section>
  )
}
