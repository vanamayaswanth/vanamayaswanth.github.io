"use client"

import { BookOpen, ExternalLink } from "lucide-react"

export function AuthoritySection() {
  return (
    <section id="authority" className="px-6 md:px-12 py-24 md:py-40">
      {/* Section header */}
      <div className="mb-16 md:mb-24">
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary block mb-4">
          03 / Authority
        </span>
        <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
          Publications
        </h2>
      </div>

      {/* Publication card */}
      <div className="group relative bg-card p-8 md:p-12 lg:p-16 transition-all duration-500 hover:bg-secondary" data-hover>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left: Icon + Meta */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-primary/10 mb-8">
              <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2">
              Published Author
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground block">
              Educational Literature
            </span>
          </div>

          {/* Right: Content */}
          <div className="md:col-span-8 lg:col-span-9">
            <h3 className="font-sans text-2xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight text-balance">
              Data Science for Kids
            </h3>
            <p className="mt-6 md:mt-8 font-mono text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl">
              Authored a comprehensive guide breaking down complex data science
              concepts into intuitive, engaging lessons for young minds. Bridging
              the gap between cutting-edge AI/ML and the next generation of
              technologists.
            </p>

            <div className="mt-8 md:mt-12 flex items-center gap-4">
              <a
                href="#"
                data-hover
                className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase text-foreground transition-colors duration-300 hover:text-primary"
              >
                Read More
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Additional credentials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-px bg-border">
        {[
          { number: "3+", label: "Years of Experience" },
          { number: "CTO", label: "Leadership Role" },
          { number: "GenAI", label: "Core Expertise" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-background p-8 md:p-12 text-center transition-all duration-500 hover:bg-card"
          >
            <span className="font-sans text-3xl md:text-5xl font-extrabold text-primary block mb-3">
              {item.number}
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
