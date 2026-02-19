"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import {
  StaggeredContainer,
  StaggeredItem,
  FadeUp,
  StaggeredText,
} from "@/components/staggered-text"

import { LiquidImage } from "./liquid-image"

const projects = [
  {
    index: "01",
    title: "Agentic IDP Frameworks",
    subtitle: "Exl Services / IDP Module",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000",
    stat: "+35%",
    statLabel: "Accuracy Improvement",
    description:
      "Architected and deployed 5+ production-grade Agentic AI modules specializing in IDP (MRC, slips, insurance submissions). Taking end-to-end ownership of specialized data fields to improve extraction accuracy across complex enterprise document types.",
    tags: ["LangGraph", "AWS Bedrock", "SageMaker", "Pydantic"],
  },
  {
    index: "02",
    title: "PII Security Pipelines",
    subtitle: "Healthcare Data Protection",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000",
    stat: "100%",
    statLabel: "Masking Accuracy",
    description:
      "Developed an enterprise PII Redaction & Security pipeline for Healthcare and Insurance domains. Full technical ownership of masking modules to ensure data privacy before LLM processing, implementing POC to Production scaling.",
    tags: ["NLP", "Healthcare", "PII Redaction", "Security Pipelines"],
  },
  {
    index: "03",
    title: "Self-Correcting Multi-Agent Systems",
    subtitle: "Recursive Agentic Loops",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000",
    stat: "92%",
    statLabel: "Retrieval Faithfulness",
    description:
      "Engineered a Multi-Agent 'Customer Reason & Action' system utilizing function calling and recursive agentic loops. Models critique extraction results and refine prompts based on real-time confidence scores using Ragas for observability.",
    tags: ["LangGraph", "Function Calling", "Ragas", "Langfuse"],
  },
]

export function ProjectsGallery() {
  return (
    <section id="work" className="px-[8vw] py-32 bg-black">
      <FadeUp>
        <div className="flex flex-col md:flex-row items-end justify-between mb-32">
          <div className="max-w-3xl">
            <span className="font-mono text-[12px] uppercase tracking-[0.4em] font-medium text-primary block mb-10">
              02 / SELECTED CASE STUDIES
            </span>
            <h2 className="font-sans text-[clamp(2.5rem,8vw,8.55rem)] font-extrabold text-white leading-[1.0] tracking-tight">
              <StaggeredText text="THE GALLERY" delay={0.1} staggerDelay={0.08} />
            </h2>
          </div>
          <span className="hidden md:block font-mono text-[12px] uppercase tracking-[0.4em] font-medium text-white/20 pb-4 border-b border-white/5">
            {projects.length} PROJECTS IN PRODUCTION
          </span>
        </div>
      </FadeUp>

      <StaggeredContainer className="flex flex-col gap-40" staggerDelay={0.2}>
        {projects.map((project, idx) => {
          const isLarge = idx === 0
          const isRightAligned = idx % 2 !== 0

          return (
            <StaggeredItem
              key={project.index}
              className={`
                flex flex-col
                ${isLarge ? "w-full lg:w-[80%]" : "w-full lg:w-[65%]"}
                ${isRightAligned ? "self-end lg:mr-[5%]" : "self-start"}
              `}
            >
              <ProjectCard project={project} isLarge={isLarge} />
            </StaggeredItem>
          )
        })}
      </StaggeredContainer>

    </section>
  )
}

function ProjectCard({ project, isLarge = false }: { project: (typeof projects)[0]; isLarge?: boolean }) {
  return (
    <div
      className={`group relative flex flex-col transition-all duration-1000`}
      data-hover
      data-hover-text="VIEW"
    >
      <div
        className="relative aspect-[16/8] md:aspect-[21/9] overflow-hidden bg-[#050505] border border-white/5 transition-all duration-700 group-hover:border-primary/20"
        style={{ perspective: "2000px" }}
      >
        {/* WebGL interaction layer */}
        <div className="absolute inset-0 z-0">
          <LiquidImage imagePath={project.image} />
        </div>

        <div className="absolute top-10 left-10 flex flex-col gap-2 z-10 pointer-events-none">
          <span className="font-mono text-[12px] uppercase tracking-[0.4em] font-medium text-white/20">{project.index}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] font-medium text-white/30">{project.subtitle}</span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.01] to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none opacity-50 z-20" />
      </div>

      <div className="mt-14 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-20">
        <div className="flex-1 min-w-0">
          <h3 className={`font-sans font-extrabold text-white tracking-tight leading-[1.1] ${isLarge ? "text-4xl md:text-6xl lg:text-7xl" : "text-3xl md:text-5xl"}`}>
            {project.title}
          </h3>
          <p className="mt-10 font-mono text-[1rem] md:text-[1.125rem] leading-[1.6] text-white/40 max-w-xl">
            {project.description}
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-[11px] uppercase tracking-[0.4em] font-medium text-white/10 border border-white/5 px-4 py-2 transition-all group-hover:border-primary/20 group-hover:text-primary">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-start md:items-end md:text-right border-l md:border-l-0 md:border-r border-white/5 pl-6 md:pl-0 md:pr-10 h-full">
          <div className="flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] font-medium text-white/10 mb-4 items-center flex gap-3">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Metric
            </span>
            <span className={`font-sans font-extrabold text-primary leading-none ${isLarge ? "text-6xl md:text-7xl lg:text-[7.5rem]" : "text-5xl md:text-6xl"}`}>
              {project.stat}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] font-medium text-white/30 mt-4 leading-relaxed">{project.statLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
