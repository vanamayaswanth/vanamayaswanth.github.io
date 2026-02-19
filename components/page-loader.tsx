"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Text scramble effect characters
const chars = "!<>-_\\/[]{}—=+*^?#________"

function useTextScramble(text: string, isActive: boolean) {
  const [output, setOutput] = useState("")
  const frameRef = useRef(0)
  const frameRequestRef = useRef<number>()

  useEffect(() => {
    if (!isActive) {
      setOutput("")
      return
    }

    let frame = 0
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = []

    for (let i = 0; i < text.length; i++) {
      const start = Math.floor(Math.random() * 20)
      const end = start + Math.floor(Math.random() * 20) + 10
      queue.push({ from: "", to: text[i], start, end })
    }

    const update = () => {
      let complete = 0
      let outputText = ""

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i]
        let char = queue[i].char

        if (frame >= end) {
          complete++
          outputText += to
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)]
            queue[i].char = char
          }
          outputText += char
        } else {
          outputText += from
        }
      }

      setOutput(outputText)
      if (complete < queue.length) {
        frame++
        frameRequestRef.current = requestAnimationFrame(update)
      }
    }

    frameRequestRef.current = requestAnimationFrame(update)

    return () => {
      if (frameRequestRef.current) {
        cancelAnimationFrame(frameRequestRef.current)
      }
    }
  }, [text, isActive])

  return output
}

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showName, setShowName] = useState(false)
  const scrambledName = useTextScramble("VANAMA YASWANTH", showName)

  useEffect(() => {
    // Start name scramble after initial delay
    const nameTimer = setTimeout(() => setShowName(true), 300)

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const increment = Math.random() * 12 + (prev > 80 ? 5 : 8)
        return Math.min(prev + increment, 100)
      })
    }, 80)

    return () => {
      clearInterval(interval)
      clearTimeout(nameTimer)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setIsLoading(false), 600)
      return () => clearTimeout(timer)
    }
  }, [progress])

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Main loader background */}
          <motion.div
            className="fixed inset-0 z-[9999] bg-black"
            exit={{
              clipPath: [
                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
              ],
            }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
          />

          {/* Content layer */}
          <motion.div
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Decorative lines */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-px bg-white/5"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: 0,
                    right: 0,
                  }}
                  initial={{ scaleX: 0, originX: i % 2 === 0 ? 0 : 1 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}
            </div>

            {/* Year badge */}
            <motion.div
              className="absolute top-8 left-[8vw]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30">
                ©2024
              </span>
            </motion.div>

            {/* Location badge */}
            <motion.div
              className="absolute top-8 right-[8vw]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30">
                Hyderabad, IN
              </span>
            </motion.div>

            {/* Main title with scramble effect */}
            <motion.div
              className="relative z-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="overflow-hidden">
                <motion.h1
                  className="font-sans text-[clamp(2rem,8vw,8rem)] font-black tracking-tighter text-white leading-none"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                >
                  {scrambledName || "\u00A0"}
                </motion.h1>
              </div>

              {/* Role subtitle */}
              <motion.p
                className="font-mono text-[clamp(0.65rem,1.2vw,0.9rem)] uppercase tracking-[0.4em] text-primary mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                GenAI/LLM Engineer
              </motion.p>
            </motion.div>

            {/* Animated circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute border border-white/5 rounded-full"
                  style={{
                    width: `${30 + i * 20}vw`,
                    height: `${30 + i * 20}vw`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: 0.2 + i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}
            </div>

            {/* Progress section */}
            <motion.div
              className="absolute bottom-12 left-[8vw] right-[8vw] z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-end justify-between mb-6">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
                    Portfolio Loading
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
                    Please wait...
                  </span>
                </div>
                <motion.span
                  className="font-mono text-4xl md:text-6xl font-black text-primary tabular-nums"
                  key={Math.round(progress)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {String(Math.round(progress)).padStart(3, "0")}
                </motion.span>
              </div>

              {/* Progress bar */}
              <div className="relative h-[2px] bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-primary"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
                {/* Glowing effect */}
                <motion.div
                  className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                  animate={{
                    x: ["-80px", "100vw"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
