"use client"

import { StaggeredText, FadeUp } from "@/components/staggered-text"

export function ProfessionalSummary() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-40">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <FadeUp delay={0}>
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary block mb-10 md:mb-14 text-center">
            The DNA
          </span>
        </FadeUp>

        <div className="max-w-5xl text-center">
          <StaggeredText
            text="Specializing in Agentic AI, IDP, and LLMOps with a track record of 5+ production-grade modules."
            as="p"
            className="font-sans text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight tracking-tight text-balance"
            delay={0.15}
            staggerDelay={0.04}
          />
        </div>

        <FadeUp className="mt-12 md:mt-16" delay={0.6}>
          <div className="flex items-center gap-8 md:gap-12">
            {[
              { value: "5+", label: "Prod Modules" },
              { value: "3+", label: "Years" },
              { value: "CTO", label: "Role" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <span className="font-sans text-xl md:text-2xl font-bold text-primary block">
                  {item.value}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
