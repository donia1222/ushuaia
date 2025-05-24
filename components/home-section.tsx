"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Flame, UtensilsCrossed, Headphones } from "@/components/ui-icons"
import Image from "next/image"
import { useEffect, useState } from "react"

// Add this component inside the file, before the HomeSection component
function ClientOnlyParticles() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => {
        const xPos = Math.random() * 100
        const yPos = Math.random() * 100
        const yPos2 = Math.random() * 100
        const duration = Math.random() * 5 + 5
        const delay = Math.random() * 2

        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-500/50"
            initial={{
              x: `${xPos}%`,
              y: `${yPos}%`,
              opacity: 0,
            }}
            animate={{
              y: [`${yPos}%`, `${yPos2}%`],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: duration,
              delay: delay,
            }}
          />
        )
      })}
    </>
  )
}

// Modern scroll animation component
function ScrollAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 0],
        y: [0, 20, 0],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
    >
      <div className="flex flex-col items-center">
        <div className="w-8 h-14 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <motion.div
            className="w-1.5 h-3 bg-purple-400 rounded-full"
            animate={{
              y: [0, 6, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
        <span className="text-white/50 text-xs mt-2 font-light tracking-wider">SCROLL</span>
      </div>
    </motion.div>
  )
}

interface HomeSectionProps {
  scrollIndicator: boolean
}

export default function HomeSection({ scrollIndicator }: HomeSectionProps) {
  // Hero parallax effects
  const { scrollYProgress: heroScrollProgress } = useScroll({
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(heroScrollProgress, [0, 0.5], [1, 0.8])
  const heroY = useTransform(heroScrollProgress, [0, 0.5], [0, -100])

  // Feature items with icons
  const featureItems = [
    {
      title: "QUALITY HOOKAH AND TABAK",
      icon: <Flame className="h-8 w-8 md:h-10 md:w-10 text-purple-400" />,
      color: "from-purple-500/20 to-red-500/20",
    },
    {
      title: "PREMIUM KITCHEN AND FOOD",
      icon: <UtensilsCrossed className="h-8 w-8 md:h-10 md:w-10 text-purple-400" />,
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "UNIQUE ATMOSPHERE AND SOUND",
      icon: <Headphones className="h-8 w-8 md:h-10 md:w-10 text-purple-400" />,
      color: "from-purple-500/20 to-blue-500/20",
    },
  ]

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src="/luxury-shisha-lounge-purple-1.png"
              alt="Ushuaia Shisha Bar"
              fill
              className="object-cover opacity-90"
              priority
            />
          </motion.div>

          {/* Animated overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"
          />

   
        </div>
      </div>

      {/* Hero content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="container mx-auto px-4 z-10 text-center"
      >
        {/* Main title section with better mobile spacing */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8 md:mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent leading-tight"
          >
            Premium Cocktail
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-light mb-6 md:mb-8 text-white/90"
          >
            Hookah & Terrace in Buchs
          </motion.h2>
        </motion.div>

        {/* Feature cards with improved mobile layout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto mb-8 md:mb-12"
        >
          {featureItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 md:p-6 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              <div
                className={`w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center`}
              >
                {item.icon}
              </div>
              <h3 className="text-xs md:text-sm font-medium tracking-wider text-center leading-tight px-2">
                {item.title}
              </h3>
            </div>
          ))}
        </motion.div>

        {/* Call to action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(168, 85, 247, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 md:px-8 py-3 rounded-full font-medium flex items-center group text-sm md:text-base"
          >
            <span className="whitespace-nowrap">Anfrage für Privatveranstaltung</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 flex-shrink-0" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Modern Scroll Indicator */}
      {scrollIndicator && <ScrollAnimation />}
    </section>
  )
}
