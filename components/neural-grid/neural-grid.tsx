"use client"

import { NeuralCard, ProjectNode } from "./neural-card"

// Sample Data - This would typically come from a CMS or props
const PROJECTS: ProjectNode[] = [
    {
        id: "001",
        title: "Intelligent Doc Processing",
        description: "Enterprise-grade IDP system processing 50k+ documents daily with multi-modal LLM pipelines and HITL verification workflows.",
        category: "GenAI",
        link: "#",
        metrics: {
            latency: "450ms",
            accuracy: "99.8%",
            stack: ["Python", "LangChain", "AWS Textract"]
        }
    },
    {
        id: "002",
        title: "Multi-Agent Orchestrator",
        description: "Autonomous agent swarm architecture for complex task decomposition and parallel execution using CrewAI patterns.",
        category: "System",
        link: "#",
        metrics: {
            latency: "1.2s",
            accuracy: "Self-Correcting",
            stack: ["Rust", "OpenAI", "Kafka"]
        }
    },
    {
        id: "003",
        title: "PII Redaction Engine",
        description: "Zero-trust PII detection and redaction layer processing real-time chat streams with <20ms overhead.",
        category: "Infrastructure",
        link: "#",
        metrics: {
            latency: "18ms",
            accuracy: "100% Compliance",
            stack: ["Go", "Presidio", "Redis"]
        }
    },
    {
        id: "004",
        title: "Knowledge Graph RAG",
        description: "Advanced RAG implementation utilizing GraphRAG for complex query reasoning over unstructured enterprise data.",
        category: "GenAI",
        link: "#",
        metrics: {
            latency: "800ms",
            accuracy: "High Recall",
            stack: ["Neo4j", "LlamaIndex", "CUDA"]
        }
    }
]

export function NeuralGrid() {
    return (
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        SYSTEM_LOGS
                    </h2>
                    <p className="font-mono text-[#F4793A] mt-2 text-sm">
            // AUTHORIZED ACCESS ONLY
                    </p>
                </div>
                <div className="hidden md:block font-mono text-xs text-zinc-500 text-right">
                    STATUS: ONLINE<br />
                    NODES: {PROJECTS.length} ACTIVE
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[400px]">
                {PROJECTS.map((project, idx) => (
                    <div
                        key={project.id}
                        className={`
              ${idx === 0 || idx === 3 ? 'md:col-span-2' : ''}
            `}
                    >
                        <NeuralCard project={project} index={idx} />
                    </div>
                ))}
            </div>
        </section>
    )
}
