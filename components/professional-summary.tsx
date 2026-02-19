"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

export function ProfessionalSummary() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-20%" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const stats = [
    { value: "3+", label: "Years Experience", suffix: "yrs" },
    { value: "5+", label: "Production Modules", suffix: "" },
    { value: "92", label: "Accuracy Rate", suffix: "%" },
  ]

  return (
    <section ref={containerRef} className="relative px-[8vw] py-40 md:py-56 overflow-hidden">
      {/* Background large text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y, opacity }}
      >
        <span className="font-sans text-[20vw] font-black text-white/[0.02] leading-none tracking-tighter">
          DNA
        </span>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.5em] font-medium text-primary">
            The DNA
          </span>
        </motion.div>

        {/* Main statement */}
        <motion.p
          className="font-sans text-[clamp(1.5rem,4vw,3.5rem)] font-bold text-white leading-[1.15] tracking-tight max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <span className="text-white/40">Specializing in </span>
          <span className="text-primary">Agentic AI</span>
          <span className="text-white/40">, </span>
          <span className="text-white">IDP</span>
          <span className="text-white/40">, and </span>
          <span className="text-white">LLMOps</span>
          <span className="text-white/40"> with a track record of </span>
          <span className="text-primary">5+ production-grade</span>
          <span className="text-white/40"> modules deployed at scale.</span>
        </motion.p>

        {/* Stats grid */}
        <motion.div
          className="mt-24 md:mt-32 grid grid-cols-3 gap-8 md:gap-0 md:divide-x divide-white/5"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col ${i === 0 ? '' : 'md:pl-12 lg:pl-20'}`}
            >
              <div className="flex items-baseline gap-1">
                <motion.span
                  className="font-sans text-[clamp(3rem,8vw,6rem)] font-black text-white leading-none tracking-tighter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                >
                  {stat.value}
                </motion.span>
                {stat.suffix && (
                  <span className="font-sans text-[clamp(1rem,2vw,2rem)] font-bold text-primary">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/25 mt-3">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
