"use client"

import { motion } from "framer-motion"

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
  return (
    <div className={`w-full overflow-hidden py-8 ${className}`}>
      <motion.div
        className={`whitespace-nowrap ${fontSize} ${fontWeight} ${textColor}`}
        animate={{
          x: direction === "left-to-right" ? ["-50%", "50%"] : ["50%", "-50%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {text} • {text} • {text}
      </motion.div>
    </div>
  )
}
