"use client"
import { useRef, useState, useEffect } from "react"
import type React from "react"

import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false) // Start with manual control
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Gallery images - same as before
  const galleryImages = [
    {
      src: "IMG_3308.png",
      alt: "Luxury Shisha Lounge Interior",
      title: "Premium Lounge Atmosphere",
    },
    {
      src: "/IMG_3302.png",
      alt: "Premium Hookah Setup",
      title: "Exquisite Hookah Experience",
    },
    {
      src: "/IMG_3310.png",
      alt: "Modern Cocktail Bar",
      title: "Craft Cocktails & Mixology",
    },
    {
      src: "/IMG_3306.png",
      alt: "Outdoor Terrace",
      title: "Relaxing Terrace Views",
    },
    {
      src: "/IMG_2709.jpeg",
      alt: "Gourmet Cuisine",
      title: "Premium Kitchen & Food",
    },
    {
      src: "/IMG_3296.png",
      alt: "DJ & Sound System",
      title: "Unique Atmosphere & Sound",
    },
    {
      src: "/download-1.png",
      alt: "VIP Area",
      title: "Exclusive VIP Experience",
    },
    {
      src: "/IMG_8901.jpeg",
      alt: "Social Experience",
      title: "Unforgettable Moments",
    },
  ]

  // Much faster autoplay - 2.5 seconds per image
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
      }, 2500) // Changed from 5000 to 2500 for faster autoplay

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current)
        }
      }
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, galleryImages.length])

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextImage()
    }
    if (isRightSwipe) {
      prevImage()
    }
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  const { ref: galleryRef, inView: isGalleryInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <section
      id="gallery"
      ref={galleryRef}
      className="py-20 bg-gradient-to-b from-purple-950/30 to-black relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] bg-repeat opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-white/80 text-lg">Entdecken Sie die einzigartige Atmosphäre unseres Premium Shisha Bars</p>
        
        </div>

        {/* Gallery Controls */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={prevImage}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={toggleAutoPlay}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center justify-center transition-all hover:scale-110"
          >
            {isAutoPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
          </button>

          <button
            onClick={nextImage}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Main Gallery Display */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={galleryImages[currentIndex].src || "/placeholder.svg"}
                  alt={galleryImages[currentIndex].alt}
                  fill
                  className="object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white font-bold text-2xl md:text-3xl mb-2"
                  >
                    {galleryImages[currentIndex].title}
                  </motion.h3>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "4rem" }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        
          {/* Progress Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 w-8"
                    : "bg-white/30 hover:bg-white/50 w-2"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Gallery Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { number: "9+", label: "Jahre Erfahrung" },
            { number: "5000+", label: "Zufriedene Gäste" },
            { number: "50+", label: "Premium Tabaksorten" },
            { number: "7", label: "Tage geöffnet" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
