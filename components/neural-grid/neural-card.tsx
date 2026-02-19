"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Terminal } from "lucide-react"
import { GlitchText } from "./glitch-text"
import Link from "next/link"

export interface ProjectNode {
    id: string
    title: string
    description: string
    category: "GenAI" | "System" | "Infrastructure" | "Full Stack"
    link: string
    metrics: {
        latency: string
        accuracy?: string
        stack: string[]
    }
}

export function NeuralCard({ project, index }: { project: ProjectNode; index: number }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link href={project.link} target="_blank" className="block h-full">
            <motion.div
                className="relative h-full overflow-hidden bg-black/40 border border-white/10 p-6 backdrop-blur-sm group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                {/* Animated Border Gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F4793A]/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                </div>

                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[url('/textures/grid.png')] opacity-[0.03] pointer-events-none" />
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ y: "-100%" }}
                            animate={{ y: "100%" }}
                            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F4793A]/5 to-transparent pointer-events-none z-0"
                        />
                    )}
                </AnimatePresence>

                {/* Header: ID and Category */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="flex flex-col">
                        <span className="font-mono text-xs text-[#F4793A] mb-1">
                            NODE_{project.id.padStart(3, "0")}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest border border-zinc-800 px-2 py-0.5 rounded-full w-fit">
                            {project.category}
                        </span>
                    </div>
                    <motion.div
                        animate={{ rotate: isHovered ? 45 : 0 }}
                        className="text-zinc-600 group-hover:text-[#F4793A] transition-colors"
                    >
                        <ArrowUpRight size={20} />
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="space-y-4 relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tighter">
                        <GlitchText text={project.title} trigger={isHovered} />
                    </h3>

                    {/* Static Description (fades out on hover) */}
                    <motion.p
                        className="text-zinc-400 text-sm leading-relaxed line-clamp-3"
                        animate={{ opacity: isHovered ? 0.2 : 1 }}
                    >
                        {project.description}
                    </motion.p>
                </div>

                {/* HUD Overlay (Appears on Hover) */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-6 left-6 right-6 z-20"
                        >
                            <div className="bg-black/80 border border-[#F4793A]/30 p-3 rounded-sm backdrop-blur-md">
                                <div className="flex items-center gap-2 mb-2 border-b border-[#F4793A]/20 pb-2">
                                    <Terminal size={12} className="text-[#F4793A]" />
                                    <span className="text-[10px] font-mono text-[#F4793A] uppercase">System Metrics</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                                    <div className="flex flex-col">
                                        <span className="text-zinc-500 text-[10px]">LATENCY</span>
                                        <span className="text-white">{project.metrics.latency}</span>
                                    </div>
                                    {project.metrics.accuracy && (
                                        <div className="flex flex-col">
                                            <span className="text-zinc-500 text-[10px]">ACCURACY</span>
                                            <span className="text-white">{project.metrics.accuracy}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-3 flex flex-wrap gap-1">
                                    {project.metrics.stack.map((tech) => (
                                        <span key={tech} className="text-[10px] bg-[#F4793A]/10 text-[#F4793A] px-1.5 py-0.5">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </Link>
    )
}
