"use client"

import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"

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
    size: "large" as const,
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
    size: "medium" as const,
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
    size: "medium" as const,
  },
]

export function ProjectsGallery() {
  const containerRef = useRef<HTMLElement>(null)

  return (
    <section id="work" ref={containerRef} className="px-6 md:px-12 py-24 md:py-40">
      {/* Section header */}
      <div className="flex items-center justify-between mb-16 md:mb-24">
        <div>
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary block mb-4">
            02 / Selected Work
          </span>
          <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
            The Gallery
          </h2>
        </div>
        <span className="hidden md:block font-mono text-xs tracking-[0.2em] text-muted-foreground">
          {projects.length} Projects
        </span>
      </div>

      {/* Asymmetric grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
        {/* Large card - spans 7 columns */}
        <ProjectCard project={projects[0]} className="md:col-span-7" isLarge />

        {/* Stack of two smaller cards - spans 5 columns */}
        <div className="md:col-span-5 flex flex-col gap-8 md:gap-6">
          <ProjectCard project={projects[1]} />
          <ProjectCard project={projects[2]} />
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  className = "",
  isLarge = false,
}: {
  project: (typeof projects)[0]
  className?: string
  isLarge?: boolean
}) {
  return (
    <div
      className={`group relative bg-card p-8 md:p-10 lg:p-12 transition-all duration-500 hover:bg-secondary ${className} ${
        isLarge ? "min-h-[500px] md:min-h-[640px]" : "min-h-[280px] md:min-h-[307px]"
      } flex flex-col justify-between`}
      data-hover
    >
      {/* Top row */}
      <div>
        <div className="flex items-start justify-between mb-8">
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
            {project.index}
          </span>
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full border border-muted-foreground/20 transition-all duration-500 group-hover:border-primary group-hover:bg-primary"
          >
            <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-all duration-500 group-hover:text-primary-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>

        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary block mb-3">
          {project.subtitle}
        </span>
        <h3
          className={`font-sans font-extrabold text-foreground tracking-tight leading-tight ${
            isLarge ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"
          }`}
        >
          {project.title}
        </h3>

        <p className="mt-4 font-mono text-xs md:text-sm leading-relaxed text-muted-foreground max-w-lg">
          {project.description}
        </p>
      </div>

      {/* Bottom row */}
      <div className="mt-8">
        {/* Stat */}
        <div className="flex items-baseline gap-3 mb-6">
          <span className={`font-sans font-extrabold text-primary ${isLarge ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl"}`}>
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
    </div>
  )
}
