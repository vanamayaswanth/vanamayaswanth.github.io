"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, Mail, MapPin } from "lucide-react"

const links = [
  { label: "Email", href: "mailto:vanamayaswanth1212@gmail.com", value: "vanamayaswanth1212@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/vanamayaswanth", value: "linkedin.com/in/vanamayaswanth" },
  { label: "GitHub", href: "https://github.com/vanamayaswanth", value: "github.com/vanamayaswanth" },
]

export function ContactFooter() {
  const sectionRef = useRef<HTMLElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" })
  const linksInView = useInView(linksRef, { once: true, margin: "-10%" })

  return (
    <section ref={sectionRef} id="contact" className="px-[8vw] py-32 md:py-40 bg-black">
      {/* Section header */}
      <div className="mb-20 md:mb-28">
        <motion.span
          className="font-mono text-[11px] uppercase tracking-[0.5em] font-medium text-primary block mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          04 / Connect
        </motion.span>

        <motion.h2
          className="font-sans text-[clamp(2.5rem,8vw,7rem)] font-black text-white leading-[0.95] tracking-tight max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <span className="text-white/30">Let's </span>
          <span className="text-white">architect</span>
          <br />
          <span className="text-primary">something</span>
          <span className="text-white/30"> extraordinary.</span>
        </motion.h2>

        <motion.div
          className="mt-10 flex items-center gap-3 text-white/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MapPin className="w-4 h-4" />
          <span className="font-mono text-[12px] uppercase tracking-[0.3em]">
            Bengaluru, India
          </span>
        </motion.div>
      </div>

      {/* Contact links */}
      <div ref={linksRef} className="flex flex-col">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            data-hover
            data-hover-text="GO"
            className="group flex items-center justify-between py-6 md:py-8 border-t border-white/[0.06] transition-all duration-500 hover:bg-white/[0.02] hover:px-6 -mx-0 hover:-mx-6"
            initial={{ x: -40, opacity: 0 }}
            animate={linksInView ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.1,
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/25 w-20">
                {link.label}
              </span>
              <span className="font-sans text-lg md:text-2xl font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-300">
                {link.value}
              </span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-white/20 transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1" />
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className="mt-32 md:mt-40"
        initial={{ opacity: 0 }}
        animate={linksInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/[0.04] pt-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] font-medium text-white/50">
            Vanama Yaswanth © {new Date().getFullYear()}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] font-medium text-white/50">
            GenAI/LLM Engineer — Bengaluru
          </span>
        </div>
      </motion.div>
    </section>
  )
}
