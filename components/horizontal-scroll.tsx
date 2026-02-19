"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    index: "01",
    title: "Agentic IDP",
    subtitle: "Exl Services / Production AI",
    stat: "+35%",
    statLabel: "Extraction Accuracy",
    description:
      "Architected 5+ production-grade Agentic AI modules. End-to-end ownership across Healthcare, Insurance, and Supply Chain.",
    tags: ["LangGraph", "AWS Bedrock", "SageMaker", "Pydantic"],
    color: "#F4793A",
  },
  {
    index: "02",
    title: "Multi-Agent System",
    subtitle: "Intent Classification",
    stat: "+40%",
    statLabel: "System Accuracy",
    description:
      "Engineered a Multi-Agent system with self-correcting recursive loops. Models critique and refine prompts autonomously.",
    tags: ["LangGraph", "Function Calling", "Ragas", "Langfuse"],
    color: "#502BD8",
  },
  {
    index: "03",
    title: "PII Redaction",
    subtitle: "Healthcare & Insurance",
    stat: "100%",
    statLabel: "Schema Validity",
    description:
      "Enterprise PII Redaction & Security pipeline. Config-driven prompt architecture with Jinja2 and Pydantic.",
    tags: ["NLP", "Healthcare", "Jinja2", "Pydantic"],
    color: "#49B3FC",
  },
  {
    index: "04",
    title: "RAG Platform",
    subtitle: "AWS Bedrock & SageMaker",
    stat: "92%",
    statLabel: "Retrieval Accuracy",
    description:
      "Optimized RAG Architectures with Semantic Caching and Vector Databases. Minimized inference latency.",
    tags: ["AWS Bedrock", "Vector DB", "Redis", "FAISS"],
    color: "#10B981",
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: false, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect - card moves up slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  // Scale effect - slightly larger when centered
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${isEven ? "md:mr-auto" : "md:ml-auto"}`}
      style={{ y, scale }}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -60 : 60 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="group relative bg-black/80 overflow-hidden w-full md:w-[75vw] lg:w-[60vw] xl:w-[55vw] rounded-lg transition-all duration-500"
        style={{
          border: isHovered ? `2px solid ${project.color}50` : "2px solid rgba(255,255,255,0.15)",
          boxShadow: isHovered
            ? `0 0 60px ${project.color}20, 0 25px 50px -12px rgba(0,0,0,0.8)`
            : "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-hover
        data-hover-text="VIEW"
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse at ${isEven ? "30%" : "70%"} 30%, ${project.color}30, transparent 60%)`,
            opacity: isHovered ? 0.6 : 0.2,
          }}
        />

        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: isHovered ? "25px 25px" : "0px 0px",
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Large background index */}
        <div
          className="absolute -right-4 md:right-8 top-1/2 -translate-y-1/2 font-mono text-[150px] md:text-[250px] lg:text-[300px] font-black leading-none select-none pointer-events-none transition-all duration-700"
          style={{
            color: project.color,
            opacity: isHovered ? 0.15 : 0.05,
            transform: `translateY(-50%) ${isHovered ? "scale(1.1)" : "scale(1)"}`,
          }}
        >
          {project.index}
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[400px] md:min-h-[450px] flex flex-col justify-between">
          {/* Top row - stat */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <motion.span
                className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30 block mb-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.subtitle}
              </motion.span>
            </div>
            <div className="text-right">
              <motion.span
                className="font-sans text-4xl md:text-5xl lg:text-6xl font-black leading-none block"
                style={{ color: project.color }}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  y: isHovered ? -5 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {project.stat}
              </motion.span>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 mt-2 block">
                {project.statLabel}
              </span>
            </div>
          </div>

          {/* Title and description */}
          <div className="flex-1 flex flex-col justify-center max-w-2xl">
            <motion.h3
              className="font-sans text-3xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight mb-6"
              style={{ color: isHovered ? project.color : "#ffffff" }}
              transition={{ duration: 0.5 }}
            >
              {project.title}
            </motion.h3>
            <motion.p
              className="font-mono text-sm md:text-base leading-relaxed text-white/50 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {project.description}
            </motion.p>
          </div>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            {project.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 border transition-all duration-300"
                style={{
                  color: isHovered ? project.color : "rgba(255,255,255,0.3)",
                  borderColor: isHovered ? `${project.color}50` : "rgba(255,255,255,0.1)",
                  backgroundColor: isHovered ? `${project.color}10` : "transparent",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.5 + tagIndex * 0.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px]"
          style={{ backgroundColor: project.color }}
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Side accent */}
        <motion.div
          className={`absolute top-0 ${isEven ? "left-0" : "right-0"} w-[3px] h-full`}
          style={{ backgroundColor: project.color }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

export function HorizontalScrollProjects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section ref={containerRef} className="relative bg-black py-32 md:py-48" id="work">
      {/* Section Header */}
      <div ref={headerRef} className="px-[8vw] mb-20 md:mb-32">
        <motion.span
          className="font-mono text-[11px] uppercase tracking-[0.5em] font-medium text-primary block mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          02 / Selected Work
        </motion.span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.h2
            className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Case Studies
          </motion.h2>
          <motion.p
            className="font-mono text-sm text-white/40 max-w-md"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Production-grade AI systems built with precision and scale in mind.
          </motion.p>
        </div>
      </div>

      {/* Projects - Staggered Layout with Parallax */}
      <div className="px-[8vw] space-y-16 md:space-y-24 lg:space-y-32">
        {projects.map((project, index) => (
          <ProjectCard key={project.index} project={project} index={index} />
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        className="px-[8vw] mt-32 md:mt-48 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8">
          Want to collaborate?
        </span>
        <a
          href="#contact"
          data-hover
          data-hover-text="CHAT"
          className="group flex items-center gap-6"
        >
          <span className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white group-hover:text-primary transition-colors duration-500">
            Let's Talk
          </span>
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-500"
            whileHover={{ scale: 1.1, rotate: 45 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-black transition-colors" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}
