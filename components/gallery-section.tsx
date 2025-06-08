"use client"
import { useRef, useState, useEffect } from "react"
import type React from "react"

import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface GalleryImage {
  src: string
  alt: string
  title: string
  category: string
}

export default function ProfessionalGallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Professionelle Kategorien
  const categories = [
    { id: "all", name: "Alle", icon: "🏢" },
    { id: "terraza", name: "Terrasse", icon: "🌿" },
    { id: "restaurante", name: "Restaurant", icon: "🍽️" },
    { id: "shisha", name: "Shisha", icon: "💨" },
    { id: "bar", name: "Bar", icon: "🍸" },
    { id: "cocktails", name: "Cocktails", icon: "🍹" },
  ]

  // Galerie-Bilder nach Kategorien organisiert
  const allGalleryImages: GalleryImage[] = [
    {
      src: "/3f124c1c-3369-4537-bfee-6a8b663daab7.JPG",
      alt: "Luxuriöses Shisha-Lounge Interieur",
      title: "Premium Lounge-Atmosphäre",
      category: "shisha",
    },
    {
      src: "/d638e5b-5f58-4a02-9f51-312062dbcd3b2.JPG",
      alt: "Premium Hookah Setup",
      title: "Exquisites Shisha-Erlebnis",
      category: "shisha",
    },
    {
      src: "/09c60ab4-bae1-4a13-beb3-20b519a099fc 2.JPG",
      alt: "Moderne Cocktailbar",
      title: "Handgefertigte Cocktails",
      category: "cocktails",
    },
        {
      src: "/af4b43e1-f8c8-421b-8e5e-0529984d1e13 2.JPG",
      alt: "Moderne Cocktailbar",
      title: "Handgefertigte Cocktails",
      category: "cocktails",
    },
    {
      src: "/df092763-b4bc-4b51-b40f-8a915dba5b42.JPG",
      alt: "Außenterrasse",
      title: "Terrasse mit entspannender Aussicht",
      category: "terraza",
    },
    
    {
      src: "/jss.png",
      alt: "Professionelles Bar-Setup",
      title: "Professionelle Bar",
      category: "bar",
    },
    
    {
      src: "/99bb6030-1e61-4f03-9511-4d69f4aea9e7.JPG",
      alt: "VIP-Terrassenbereich",
      title: "VIP-Terrassenbereich",
      category: "terraza",
    },
    {
      src: "/24093598-7b93-417c-b731-5460b82ad02c.JPG",
      alt: "Gehobenes Speiseerlebnis",
      title: "Tex-Mex Food",
      category: "restaurante",
    },
  ]

  // Bilder basierend auf aktiver Kategorie filtern
  const filteredImages =
    activeCategory === "all" ? allGalleryImages : allGalleryImages.filter((img) => img.category === activeCategory)

  // Aktuellen Index zurücksetzen, wenn sich die Kategorie ändert
  useEffect(() => {
    setCurrentIndex(0)
  }, [activeCategory])

  // Autoplay-Funktionalität
  useEffect(() => {
    if (isAutoPlaying && filteredImages.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredImages.length)
      }, 3000)

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
  }, [isAutoPlaying, filteredImages.length])

  // Touch-Handler
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
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
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
      className="py-20 bg-gradient-to-b from-slate-900 via-purple-950/20 to-black relative overflow-hidden"
    >
      {/* Hintergrundeffekte */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] bg-repeat opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Überschrift */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Ambiente
          </h2>
       
        </div>

        {/* Professionelle Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>

    
        </div>

        {/* Galerie-Steuerung */}
        {filteredImages.length > 0 && (
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
        )}

        {/* Hauptgalerie-Anzeige */}
        {filteredImages.length > 0 ? (
          <div className="relative max-w-4xl mx-auto">
            <div
              className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing shadow-2xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${currentIndex}`}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={
                      filteredImages[currentIndex]?.src ||
                      "/placeholder.svg?height=500&width=800&query=professional+space" ||
                      "/placeholder.svg"
                    }
                    alt={filteredImages[currentIndex]?.alt || "Professioneller Bereich"}
                    fill
                    className="object-cover"
                  />

                  {/* Farbverlauf-Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Bild-Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-3 mb-3"
                    >
                      <span className="text-2xl">
                        {categories.find((cat) => cat.id === filteredImages[currentIndex]?.category)?.icon}
                      </span>
                      <span className="text-purple-300 font-medium">
                        {categories.find((cat) => cat.id === filteredImages[currentIndex]?.category)?.name}
                      </span>
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-white font-bold text-2xl md:text-3xl mb-3"
                    >
                      {filteredImages[currentIndex]?.title}
                    </motion.h3>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "4rem" }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Fortschrittsanzeige */}
            <div className="flex justify-center mt-6 gap-2">
              {filteredImages.map((_, index) => (
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
        ) : (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">Keine Bilder für diese Kategorie verfügbar</p>
          </div>
        )}

        {/* Professionelle Statistiken */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { number: "9+", label: "Jahre Erfahrung" },
            { number: "8000+", label: "Zufriedene Kunden" },
            { number: "300+", label: "Plätze" },
            { number: "7", label: "Tage geöffnet" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-white/60 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
