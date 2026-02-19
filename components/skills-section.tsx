"use client"

import { useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"

const skillCategories = [
  {
    title: "AI & NLP",
    color: "#F4793A",
    index: "01",
    skills: [
      "LangGraph",
      "LangChain",
      "Multi-Agent Orchestration",
      "Agentic RAG",
      "Function Calling",
      "Pydantic",
      "Prompt Engineering",
    ],
  },
  {
    title: "Cloud & DevOps",
    color: "#49B3FC",
    index: "02",
    skills: [
      "AWS Bedrock",
      "SageMaker",
      "FastAPI",
      "Docker",
      "CodePipeline",
      "Lambda",
      "CloudFormation",
    ],
  },
  {
    title: "Data & ML",
    color: "#10B981",
    index: "03",
    skills: [
      "Vector Databases",
      "Pinecone",
      "FAISS",
      "Redis",
      "PyTorch",
      "Transformers",
      "PII Redaction",
    ],
  },
  {
    title: "Observability",
    color: "#A855F7",
    index: "04",
    skills: [
      "Langfuse",
      "Ragas",
      "Model Evaluation",
      "Token Optimization",
      "Semantic Caching",
    ],
  },
]

// 3D tilt card for skills
function SkillCard({
  category,
  index,
  isInView
}: {
  category: typeof skillCategories[0]
  index: number
  isInView: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5
    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      className="group relative cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      data-hover
    >
      <div
        className="relative p-8 border border-white/5 bg-black/50 backdrop-blur-sm overflow-hidden transition-all duration-500"
        style={{
          borderColor: isHovered ? `${category.color}30` : "rgba(255,255,255,0.05)",
        }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${category.color}10, transparent 70%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Index number watermark */}
        <motion.span
          className="absolute -right-2 -top-4 font-sans text-[8rem] font-black leading-none pointer-events-none select-none"
          style={{ color: category.color, opacity: 0.03 }}
          animate={{ opacity: isHovered ? 0.08 : 0.03 }}
          transition={{ duration: 0.5 }}
        >
          {category.index}
        </motion.span>

        {/* Category Header */}
        <div className="relative flex items-center gap-4 mb-8">
          <motion.div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
            animate={{ scale: isHovered ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <div>
            <motion.span
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30 block mb-1"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {category.index}
            </motion.span>
            <motion.h3
              className="font-sans text-xl font-bold tracking-tight"
              style={{ color: isHovered ? category.color : "#fff" }}
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {category.title}
            </motion.h3>
          </div>
        </div>

        {/* Skills List */}
        <ul className="relative space-y-3">
          {category.skills.map((skill, skillIndex) => (
            <motion.li
              key={skill}
              className="font-mono text-[13px] text-white/50 flex items-center gap-3 group/skill"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: index * 0.15 + skillIndex * 0.05 + 0.3,
              }}
            >
              <motion.span
                className="w-4 h-px"
                style={{ backgroundColor: category.color }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, delay: skillIndex * 0.03 }}
              />
              <motion.span
                className="transition-colors duration-300"
                style={{ color: isHovered ? "#fff" : "rgba(255,255,255,0.5)" }}
              >
                {skill}
              </motion.span>
            </motion.li>
          ))}
        </ul>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ backgroundColor: category.color }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Corner accents */}
        <motion.div
          className="absolute top-0 left-0 w-8 h-8 border-t border-l"
          style={{ borderColor: category.color }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 0.5 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-8 h-8 border-b border-r"
          style={{ borderColor: category.color }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 0.5 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })

  return (
    <section
      ref={containerRef}
      className="relative px-[8vw] py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="skills-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#skills-grid)" />
        </svg>
      </div>

      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div>
          <motion.span
            className="font-mono text-[11px] uppercase tracking-[0.5em] text-primary block mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            03 / Tech Stack
          </motion.span>
          <motion.h2
            className="font-sans text-[clamp(2rem,5vw,4rem)] font-black text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Core Expertise
          </motion.h2>
        </div>
        <motion.p
          className="font-mono text-[13px] leading-relaxed text-white/40 max-w-md"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Specialized in building production-grade AI systems across Healthcare,
          Insurance, and Supply Chain domains.
        </motion.p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, index) => (
          <SkillCard
            key={category.title}
            category={category}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>

      {/* Decorative bottom line */}
      <motion.div
        className="mt-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </section>
  )
}
