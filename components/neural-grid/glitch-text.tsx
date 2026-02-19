"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
    text: string
    className?: string
    trigger?: boolean
}

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>/?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export function GlitchText({ text, className, trigger = false }: GlitchTextProps) {
    const [displayText, setDisplayText] = useState(text)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const iterations = useRef(0)

    useEffect(() => {
        if (!trigger) {
            setDisplayText(text)
            iterations.current = 0
            return
        }

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations.current) {
                            return text[index]
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)]
                    })
                    .join(""),
            )

            if (iterations.current >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current)
            }

            iterations.current += 1 / 3 // Speed of decoding
        }, 30)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [trigger, text])

    return (
        <motion.span className={className} layout>
            {displayText}
        </motion.span>
    )
}
