"use client"

import { motion, useInView } from "framer-motion"
import { MapPin } from "lucide-react"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"

// Optimized light beams component with better performance
function OptimizedLightBeams() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute top-0 left-1/4 w-1 h-[500px] bg-gradient-to-b from-purple-500/0 via-purple-500/20 to-purple-500/0 blur-sm"
        initial={{ opacity: 0, height: "400px" }}
        animate={{
          height: ["400px", "600px", "400px"],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-1 h-[500px] bg-gradient-to-b from-pink-500/0 via-pink-500/15 to-pink-500/0 blur-sm"
        initial={{ opacity: 0, height: "500px" }}
        animate={{
          height: ["500px", "350px", "500px"],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
          repeatType: "reverse",
        }}
      />
    </div>
  )
}

// Optimized image card component
function ImageCard({
  src,
  alt,
  description,
  className = "",
  delay = 0,
  isInView,
}: {
  src: string
  alt: string
  description: string
  className?: string
  delay?: number
  isInView: boolean
}) {
  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 20,
      }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <p className="text-white/90 text-sm font-medium">{description}</p>
      </motion.div>
    </motion.div>
  )
}

export default function LocationSection() {
  const ref = useRef(null)
  const isLocationInView = useInView(ref, {
    once: true, // Changed to true for better performance
    amount: 0.1, // Reduced threshold
  })

  return (
    <section id="location" ref={ref} className="py-20 bg-black relative overflow-hidden">
      {/* Simplified animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLocationInView ? 0.15 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
        <div className="h-full w-full bg-[url('/header.jpeg')] bg-repeat opacity-5" />
        <OptimizedLightBeams />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLocationInView ? 1 : 0, y: isLocationInView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isLocationInView ? 1 : 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 backdrop-blur-sm border border-purple-500/20"
          >
            <MapPin className="h-6 w-6 text-purple-400" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isLocationInView ? 1 : 0, x: isLocationInView ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-3xl font-bold text-white"
          >
            Unser neuer Standort
          </motion.h2>
        </motion.div>

        {/* Image grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left column */}
          <div className="space-y-4">
   
            <div className="grid grid-cols-2 gap-4">
              <ImageCard
                src="/24093598-7b93-417c-b731-5460b82ad02c.JPG"
                alt="Ushuaia Hookah"
                description="Premium Shisha Erlebnis"
                className="h-40"
                delay={0.5}
                isInView={isLocationInView}
              />
              <ImageCard
                src="/99bb6030-1e61-4f03-9511-4d69f4aea9e7.JPG"
                alt="Ushuaia Bar"
                description="Exklusive Cocktail-Kreationen"
                className="h-40"
                delay={0.6}
                isInView={isLocationInView}
              />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <ImageCard
              src="/95d4a4e5-f14d-4e34-8d9b-201ac64e1f66.JPG"
              alt="Ushuaia Terrace"
              description="Unsere exklusive Bar"
              className="h-40"
              delay={0.7}
              isInView={isLocationInView}
            />
  
          </div>
        </div>

        {/* Address link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLocationInView ? 1 : 0, y: isLocationInView ? 0 : 20 }}
          transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
          className="mt-16 text-center"
        >
          <motion.a
            href="https://maps.google.com/?q=Bahnhofstrasse+40,+9470+Buchs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-full transition-all duration-300 text-white"
            whileHover={{
              scale: 1.05, 
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <MapPin className="h-5 w-5 text-purple-400 mr-2" />
            <span>Bahnhofstrasse 40, 9470 Buchs</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
