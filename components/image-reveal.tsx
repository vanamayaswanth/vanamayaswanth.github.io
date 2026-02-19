"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

interface ImageRevealProps {
  src: string
  alt: string
  className?: string
  direction?: "left" | "right" | "up" | "down"
  delay?: number
}

export function ImageReveal({
  src,
  alt,
  className = "",
  direction = "up",
  delay = 0,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-15%" })

  const clipPaths = {
    left: {
      hidden: "inset(0 100% 0 0)",
      visible: "inset(0 0% 0 0)",
    },
    right: {
      hidden: "inset(0 0 0 100%)",
      visible: "inset(0 0 0 0%)",
    },
    up: {
      hidden: "inset(100% 0 0 0)",
      visible: "inset(0% 0 0 0)",
    },
    down: {
      hidden: "inset(0 0 100% 0)",
      visible: "inset(0 0 0% 0)",
    },
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Reveal overlay */}
      <motion.div
        className="absolute inset-0 bg-primary z-10"
        initial={{ scaleY: 1, originY: direction === "up" ? 0 : 1 }}
        animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
          delay: delay + 0.2,
        }}
      />

      {/* Image with clip-path */}
      <motion.div
        className="relative w-full h-full"
        initial={{ clipPath: clipPaths[direction].hidden, scale: 1.3 }}
        animate={
          isInView
            ? { clipPath: clipPaths[direction].visible, scale: 1 }
            : { clipPath: clipPaths[direction].hidden, scale: 1.3 }
        }
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          delay,
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
    </div>
  )
}

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.5,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 20}%`, `${speed * 20}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-[120%] object-cover absolute top-[-10%]"
        style={{ y }}
        loading="lazy"
      />
    </div>
  )
}
