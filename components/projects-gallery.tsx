"use client"

import { ArrowUpRight } from "lucide-react"
import {
  StaggeredContainer,
  StaggeredItem,
  FadeUp,
  StaggeredText,
} from "@/components/staggered-text"

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
  return (
    <section id="work" className="px-6 md:px-12 lg:px-24 py-24 md:py-40">
      <FadeUp>
        <div className="flex items-end justify-between mb-20 md:mb-32">
          <div>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary block mb-4">
              02 / Selected Work
            </span>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-7xl font-extrabold text-foreground tracking-tight">
              <StaggeredText text="The Gallery" delay={0.1} staggerDelay={0.08} />
            </h2>
          </div>
          <span className="hidden md:block font-mono text-[10px] tracking-[0.2em] text-muted-foreground pb-2">
            {projects.length} Projects
          </span>
        </div>
      </FadeUp>

      <StaggeredContainer className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-3" staggerDelay={0.2}>
        <StaggeredItem className="md:col-start-1 md:col-span-8 md:row-span-2">
          <ProjectCard project={projects[0]} isLarge />
        </StaggeredItem>
        <StaggeredItem className="md:col-start-9 md:col-span-4">
          <ProjectCard project={projects[1]} />
        </StaggeredItem>
        <StaggeredItem className="md:col-start-9 md:col-span-4">
          <ProjectCard project={projects[2]} />
        </StaggeredItem>
      </StaggeredContainer>

      <StaggeredContainer className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-3 mt-4 md:mt-3">
        <StaggeredItem className="md:col-start-3 md:col-span-10">
          <div className="bg-card p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-500 hover:bg-secondary" data-hover>
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary block mb-2">Methodology</span>
              <p className="font-sans text-lg md:text-xl font-bold text-foreground tracking-tight">Recursive Agentic Loops with Self-Evaluation</p>
            </div>
            <div className="flex items-center gap-8">
              {["LangGraph", "AWS Bedrock", "LLMOps"].map((tag) => (
                <span key={tag} className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{tag}</span>
              ))}
            </div>
          </div>
        </StaggeredItem>
      </StaggeredContainer>
    </section>
  )
}

function ProjectCard({ project, isLarge = false }: { project: (typeof projects)[0]; isLarge?: boolean }) {
  return (
    <div
      className={`group relative bg-card p-8 md:p-10 lg:p-14 transition-all duration-500 hover:bg-secondary ${isLarge ? "min-h-[420px] md:min-h-[640px]" : "min-h-[260px] md:min-h-[310px]"} flex flex-col justify-between h-full`}
      data-hover
    >
      <div>
        <div className="flex items-start justify-between mb-8 md:mb-10">
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">{project.index}</span>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-muted-foreground/20 transition-all duration-500 group-hover:border-primary group-hover:bg-primary">
            <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-all duration-500 group-hover:text-primary-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary block mb-3">{project.subtitle}</span>
        <h3 className={`font-sans font-extrabold text-foreground tracking-tight leading-[1.05] ${isLarge ? "text-2xl md:text-4xl lg:text-5xl" : "text-xl md:text-2xl"}`}>
          {project.title}
        </h3>
        {isLarge && (
          <p className="mt-6 font-mono text-xs md:text-sm leading-relaxed text-muted-foreground max-w-lg">{project.description}</p>
        )}
      </div>
      <div className="mt-8">
        <div className="flex items-baseline gap-3 mb-6">
          <span className={`font-sans font-[900] text-primary ${isLarge ? "text-5xl md:text-7xl lg:text-8xl" : "text-4xl md:text-5xl"}`}>{project.stat}</span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{project.statLabel}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground px-3 py-1.5 bg-background transition-colors duration-300 group-hover:text-foreground">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
