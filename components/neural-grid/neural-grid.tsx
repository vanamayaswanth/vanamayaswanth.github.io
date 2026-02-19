"use client"

import { NeuralCard, ProjectNode } from "./neural-card"

// Real Data from Resume (Vanama Yaswanth)
const PROJECTS: ProjectNode[] = [
    {
        id: "001",
        title: "Self-Correcting IDP System",
        description: "Architected a recursive multi-agent loop for Intelligent Document Processing. Models autonomously critique extraction results and refine prompts based on confidence scores, boosting accuracy by 35%.",
        category: "GenAI",
        link: "#",
        metrics: {
            latency: "650ms",
            accuracy: "99.2%",
            stack: ["LangGraph", "Jinja2", "AWS Bedrock"]
        }
    },
    {
        id: "002",
        title: "Secure PII Redaction Pipeline",
        description: "Enterprise-grade redaction engine for Healthcare & Insurance. Built end-to-end masking modules ensuring 100% data privacy compliance before LLM processing (POC to Production).",
        category: "Infrastructure",
        link: "#",
        metrics: {
            latency: "<20ms",
            accuracy: "100% Compliant",
            stack: ["Presidio", "Docker", "FastAPI"]
        }
    },
    {
        id: "003",
        title: "Agentic Customer Intent System",
        description: "Engineered a 'Reason & Action' agent swarm using Function Calling to autonomously identify customer intent. Independently owned logic design, improving system action accuracy by 40%.",
        category: "System",
        link: "#",
        metrics: {
            latency: "1.2s",
            accuracy: "92% Success",
            stack: ["OpenAI", "Function Calling", "Vector DB"]
        }
    },
    {
        id: "004",
        title: "Optimized Enterprise RAG",
        description: "High-performance RAG architecture integrating Semantic Caching (Redis) and Vector Databases. Achieved 92% retrieval accuracy while minimizing inference latency on AWS SageMaker.",
        category: "GenAI",
        link: "#",
        metrics: {
            latency: "120ms",
            accuracy: "High Recall",
            stack: ["Redis", "Pinecone", "SageMaker"]
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
