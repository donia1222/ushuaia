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
}

export default function ScrollingText({
  text = "USHUAIA • PREMIUM EXPERIENCE • COCKTAILS • HOOKAH • LOUNGE",
  direction = "left-to-right",
  textColor = "text-purple-400",
  fontSize = "text-5xl md:text-7xl",
  fontWeight = "font-bold",
  className = "",
}: ScrollingTextProps) {
  const containerRef = useRef(null)

  // Use scroll progress to control the horizontal position
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
  })

  // Transform scroll progress to x position based on direction
  const xPos = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left-to-right" ? ["-100%", "100%"] : ["100%", "-100%"],
  )

  return (
    <div ref={containerRef} className={`w-full overflow-hidden py-8 ${className}`}>
      <motion.div style={{ x: xPos }} className={`whitespace-nowrap ${fontSize} ${fontWeight} ${textColor}`}>
        {/* Repeat text for continuous effect */}
        <span className="opacity-80">{text}</span>
        <span className="opacity-40 mx-8">•</span>
        <span className="opacity-80">{text}</span>
      </motion.div>
    </div>
  )
}
