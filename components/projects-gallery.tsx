"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { FadeUp } from "@/components/staggered-text"

const projects = [
  {
    index: "01",
    title: "Agentic IDP Frameworks",
    subtitle: "Intelligent Document Processing",
    stat: "+35%",
    statLabel: "Extraction Accuracy",
    description:
      "Designed and deployed agentic IDP frameworks leveraging multi-modal LLMs for automated document classification, extraction, and validation. Achieved a 35% improvement in extraction accuracy across complex enterprise document types.",
    tags: ["LangGraph", "AWS Bedrock", "Multi-Modal LLMs", "Document AI"],
  },
  {
    index: "02",
    title: "PII Security Pipelines",
    subtitle: "Healthcare Data Protection",
    stat: "100%",
    statLabel: "HIPAA Compliance",
    description:
      "Architected end-to-end PII redaction pipelines with technical ownership of security modules for Healthcare. Built automated detection and redaction systems ensuring HIPAA-grade compliance at enterprise scale.",
    tags: ["NLP", "Healthcare", "PII Detection", "Security"],
  },
  {
    index: "03",
    title: "Self-Correcting Multi-Agent Systems",
    subtitle: "Recursive Agentic Loops",
    stat: "3x",
    statLabel: "Throughput Gain",
    description:
      "Implemented recursive agentic loops using LangGraph that enable multi-agent systems to self-evaluate, identify failures, and autonomously correct their outputs without human intervention.",
    tags: ["LangGraph", "Multi-Agent", "Self-Correction", "Autonomous AI"],
  },
]

export function ProjectsGallery() {
  const containerRef = useRef<HTMLElement>(null)

  return (
    <section id="work" ref={containerRef} className="px-6 md:px-12 lg:px-20 py-24 md:py-40">
      {/* Section header */}
      <div className="flex items-end justify-between mb-16 md:mb-24">
        <FadeUp>
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary block mb-4">
            02 / Selected Work
          </span>
          <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-[900] text-foreground tracking-tight">
            The Gallery
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <span className="hidden md:block font-mono text-xs tracking-[0.2em] text-muted-foreground">
            {projects.length} Projects
          </span>
        </FadeUp>
      </div>

      {/* Asymmetric grid - pushed off-center */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-3">
        {/* Large card - spans 8 columns, pushed left */}
        <ProjectCard
          project={projects[0]}
          className="md:col-span-8 md:col-start-1"
          isLarge
          delay={0}
        />

        {/* Medium card - spans 4 columns, right side, offset down */}
        <div className="md:col-span-4 md:mt-24">
          <ProjectCard project={projects[1]} delay={0.15} />
        </div>

        {/* Third card - spans 5 columns, pushed right with offset */}
        <div className="md:col-span-6 md:col-start-4 md:-mt-12">
          <ProjectCard project={projects[2]} delay={0.3} />
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  className = "",
  isLarge = false,
  delay = 0,
}: {
  project: (typeof projects)[0]
  className?: string
  isLarge?: boolean
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })

  return (
    <motion.div
      ref={ref}
      className={`group relative bg-card p-8 md:p-10 lg:p-14 transition-colors duration-500 hover:bg-secondary ${className} ${
        isLarge ? "min-h-[480px] md:min-h-[600px]" : "min-h-[360px] md:min-h-[420px]"
      } flex flex-col justify-between`}
      data-hover
      initial={{ y: 80, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {/* Top row */}
      <div>
        <div className="flex items-start justify-between mb-8 md:mb-10">
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
            {project.index}
          </span>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-muted-foreground/20 transition-all duration-500 group-hover:border-primary group-hover:bg-primary">
            <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-all duration-500 group-hover:text-primary-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>

        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary block mb-3">
          {project.subtitle}
        </span>
        <h3
          className={`font-sans font-[900] text-foreground tracking-tight leading-[1.1] ${
            isLarge ? "text-2xl md:text-4xl lg:text-5xl" : "text-xl md:text-2xl lg:text-3xl"
          }`}
        >
          {project.title}
        </h3>

        <p className="mt-5 font-mono text-xs md:text-sm leading-relaxed text-muted-foreground max-w-lg">
          {project.description}
        </p>
      </div>

      {/* Bottom row */}
      <div className="mt-8 md:mt-10">
        {/* Stat */}
        <div className="flex items-baseline gap-3 mb-6">
          <span
            className={`font-sans font-[900] text-primary ${
              isLarge ? "text-5xl md:text-7xl lg:text-8xl" : "text-4xl md:text-5xl lg:text-6xl"
            }`}
          >
            {project.stat}
          </span>
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
            {project.statLabel}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground px-3 py-1.5 bg-background transition-colors duration-300 group-hover:text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
