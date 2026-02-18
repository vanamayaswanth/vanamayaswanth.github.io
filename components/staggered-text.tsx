"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface StaggeredTextProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
  delay?: number
  staggerDelay?: number
  splitBy?: "word" | "character"
}

export function StaggeredText({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.08,
  splitBy = "word",
}: StaggeredTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })

  const items = splitBy === "character" ? text.split("") : text.split(" ")

  return (
    <span className={className}>
      <span ref={ref} className="inline">
        {items.map((item, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "120%", opacity: 0, rotateX: 40 }}
              animate={
                isInView
                  ? { y: "0%", opacity: 1, rotateX: 0 }
                  : { y: "120%", opacity: 0, rotateX: 40 }
              }
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * staggerDelay,
              }}
            >
              {item}
              {splitBy === "word" && i < items.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  )
}

interface FadeUpProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function FadeUp({ children, className = "", delay = 0 }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

interface StaggeredContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  delay?: number
}

export function StaggeredContainer({
  children,
  className = "",
  staggerDelay = 0.15,
  delay = 0,
}: StaggeredContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredItem({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { y: 60, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
