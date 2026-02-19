"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { ExternalLink, GraduationCap, Award } from "lucide-react"

export function AuthoritySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const credRef = useRef<HTMLDivElement>(null)
  const credInView = useInView(credRef, { once: true, margin: "-10%" })
  const pubInView = useInView(sectionRef, { once: true, margin: "-15%" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <section ref={sectionRef} id="authority" className="relative px-[8vw] py-40 md:py-56 bg-black overflow-hidden">
      {/* Background decorative text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y: bgY }}
      >
        <span className="font-sans text-[25vw] font-black text-white/[0.015] leading-none tracking-tighter">
          AUTH
        </span>
      </motion.div>

      {/* Publication - Main Feature */}
      <div className="relative z-10 mb-32 md:mb-40">
        <motion.span
          className="font-mono text-[11px] uppercase tracking-[0.5em] font-medium text-primary block mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={pubInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          03 / Published Author
        </motion.span>

        <motion.h2
          className="font-sans text-[clamp(2rem,6vw,6rem)] font-black text-white leading-[0.95] tracking-tight max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={pubInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <span className="text-white/30">Author of </span>
          <span className="text-primary">'Data Science for Kids'</span>
        </motion.h2>

        <motion.p
          className="mt-10 font-mono text-[0.95rem] md:text-[1.05rem] leading-[1.7] text-white/35 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={pubInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Demonstrating mastery of foundational data principles and technical communication.
          Breaking down complex data science concepts into intuitive lessons—bridging the gap
          between cutting-edge AI/ML and the next generation of technologists.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={pubInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a
            href="#"
            data-hover
            data-hover-text="READ"
            className="inline-flex items-center gap-4 group border border-white/10 px-6 py-3 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] font-medium text-white/60 group-hover:text-primary transition-colors">
              View Publication
            </span>
            <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
          </a>
        </motion.div>
      </div>

      {/* Research Publication */}
      <motion.div
        className="relative z-10 mb-32 md:mb-40 pl-0 md:pl-[15%]"
        initial={{ opacity: 0, x: -40 }}
        animate={pubInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <div className="flex items-start gap-6">
          <div className="w-12 h-12 flex items-center justify-center border border-white/10 shrink-0">
            <Award className="w-5 h-5 text-primary/60" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/25 block mb-3">
              Research Publication / 2022
            </span>
            <h3 className="font-sans text-xl md:text-2xl font-bold text-white/80 mb-3">
              Lyrical Generator for Indian Languages
            </h3>
            <p className="font-mono text-[0.875rem] leading-[1.6] text-white/30 max-w-xl">
              Developed a Bi-Directional LSTM deep learning model. Preprocessed ~500 songs
              creating a corpus of 544,177 unique words. Published in Tuijin Jishu/Journal of Propulsion Technology.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div ref={credRef} className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.03]">
        {[
          { number: "3+", label: "Years Experience", suffix: "" },
          { number: "5+", label: "Production Modules", suffix: "" },
          { number: "35", label: "Accuracy Boost", suffix: "%" },
          { number: "40", label: "Efficiency Gain", suffix: "%" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="bg-black p-8 md:p-12 flex flex-col items-center justify-center text-center transition-colors duration-700 hover:bg-[#030303]"
            initial={{ y: 40, opacity: 0 }}
            animate={credInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.08,
            }}
          >
            <div className="flex items-baseline">
              <span className="font-sans text-[clamp(2.5rem,6vw,5rem)] font-black text-white leading-none">
                {item.number}
              </span>
              {item.suffix && (
                <span className="font-sans text-[clamp(1rem,2vw,1.5rem)] font-bold text-primary ml-1">
                  {item.suffix}
                </span>
              )}
            </div>
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-medium text-white/20 mt-3">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Education */}
      <motion.div
        className="relative z-10 mt-24 flex items-start gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={credInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="w-12 h-12 flex items-center justify-center border border-white/10 shrink-0">
          <GraduationCap className="w-5 h-5 text-primary/60" />
        </div>
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/25 block mb-2">
            Education / 2019 - 2023
          </span>
          <h3 className="font-sans text-lg md:text-xl font-bold text-white/70">
            B.Tech in Computer Science
          </h3>
          <p className="font-mono text-[0.875rem] text-white/30 mt-1">
            Jaypee University of Engineering and Technology
          </p>
        </div>
      </motion.div>
    </section>
  )
}
