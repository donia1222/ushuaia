"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import ScrollingText from "./scrolling-text"

export default function ParallaxTextSection() {
  const ref = useRef(null)

  // Use scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Transform scroll progress to different values for parallax effect
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100])

  return (
    <section ref={ref} className="relative py-20 bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 opacity-30" />

      {/* Animated content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="container mx-auto px-4 flex flex-col items-center justify-center space-y-16"
      >
        {/* First scrolling text - left to right */}
        <ScrollingText
          text="PREMIUM EXPERIENCE • COCKTAILS • HOOKAH • LOUNGE"
          direction="left-to-right"
          textColor="text-purple-400"
          className="border-t border-b border-purple-500/20 bg-black/50 backdrop-blur-sm"
        />

        {/* Second scrolling text - right to left */}
        <ScrollingText
          text="USHUAIA • BUCHS • PREMIUM VENUE • EXCLUSIVE EVENTS"
          direction="right-to-left"
          textColor="text-pink-400"
          className="border-t border-b border-pink-500/20 bg-black/50 backdrop-blur-sm"
        />
      </motion.div>
    </section>
  )
}
