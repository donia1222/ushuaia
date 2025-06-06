"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollingTextProps {
  text?: string
  direction?: "left-to-right" | "right-to-left"
  textColor?: string
  fontSize?: string
  fontWeight?: string
  className?: string
  speed?: number
}

export default function ScrollingText({
  text = "USHUAIA • PREMIUM EXPERIENCE • COCKTAILS • HOOKAH • LOUNGE",
  direction = "left-to-right",
  textColor = "text-purple-400",
  fontSize = "text-5xl md:text-7xl",
  fontWeight = "font-bold",
  className = "",
  speed = 0.5, // Speed multiplier - higher values = faster scrolling
}: ScrollingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll position relative to the component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Transform scroll progress into horizontal movement
  // The multiplier controls how far the text moves based on scroll
  const multiplier = direction === "left-to-right" ? 1 : -1
  const x = useTransform(scrollYProgress, [0, 1], [`${-50 * multiplier * speed}%`, `${50 * multiplier * speed}%`])

  return (
    <div ref={containerRef} className={`w-full overflow-hidden py-8 ${className}`}>
      <motion.div className={`whitespace-nowrap ${fontSize} ${fontWeight} ${textColor}`} style={{ x }}>
        {text} • {text} • {text}
      </motion.div>
    </div>
  )
}
