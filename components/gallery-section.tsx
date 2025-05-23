"use client"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "@/components/ui-icons"
import Image from "next/image"

export default function GallerySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  // Gallery images - you can replace these with actual images
  const galleryImages = [
    {
      src: "IMG_2709.jpeg",
      alt: "Luxury Shisha Lounge Interior",
      title: "Premium Lounge Atmosphere",
    },
    {
      src: "/IMG_2667.jpeg",
      alt: "Premium Hookah Setup",
      title: "Exquisite Hookah Experience",
    },
    {
      src: "/modern-cocktail-bar-purple-neon.png",
      alt: "Modern Cocktail Bar",
      title: "Craft Cocktails & Mixology",
    },
    {
      src: "/young-woman-vaping-from-hookah-bar.jpg",
      alt: "Outdoor Terrace",
      title: "Relaxing Terrace Views",
    },
    {
      src: "/download-5.png",
      alt: "Gourmet Cuisine",
      title: "Premium Kitchen & Food",
    },
    {
      src: "/download-3.png",
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

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoScrollRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current
          const maxScroll = container.scrollWidth - container.clientWidth
          const currentScroll = container.scrollLeft

          // Si llegamos al final, volvemos al inicio
          if (currentScroll >= maxScroll) {
            container.scrollTo({ left: 0, behavior: "smooth" })
            setCurrentIndex(0)
          } else {
            // Scroll suave y lento (2 píxeles por vez)
            container.scrollTo({
              left: currentScroll + 2,
              behavior: "auto",
            })

            // Actualizar índice actual basado en la posición
            const imageWidth = 400
            const newIndex = Math.round(currentScroll / imageWidth)
            setCurrentIndex(newIndex)
          }
        }
      }, 50) // 50ms = scroll muy suave y lento

      return () => {
        if (autoScrollRef.current) {
          clearInterval(autoScrollRef.current)
        }
      }
    } else {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isAutoPlaying])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  const scrollToImage = (index: number) => {
    if (scrollContainerRef.current) {
      const imageWidth = 400
      scrollContainerRef.current.scrollTo({
        left: index * imageWidth,
        behavior: "smooth",
      })
      setCurrentIndex(index)
    }
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-purple-950/30 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] bg-repeat opacity-5" />

        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl" />

        {/* Animated Bubbles - only when autoplay is active */}
        {isAutoPlaying && (
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => {
              const size = Math.random() * 20 + 10
              const left = Math.random() * 100
              const animationDuration = Math.random() * 10 + 8
              const delay = Math.random() * 5

              return (
                <div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-float"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}%`,
                    bottom: "-50px",
                    animation: `floatUp ${animationDuration}s linear infinite`,
                    animationDelay: `${delay}s`,
                  }}
                />
              )
            })}
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Galerie
          </h2>
          <p className="text-white/80 text-lg">Entdecken Sie die einzigartige Atmosphäre unseres Premium Shisha Bars</p>
        </div>

        {/* Gallery Controls */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-110"
            disabled={isAutoPlaying}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleAutoPlay}
              className={`w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all ${
                isAutoPlaying
                  ? "bg-gradient-to-r from-red-600 to-pink-600 animate-pulse"
                  : "bg-gradient-to-r from-purple-600 to-pink-600"
              }`}
            >
              {isAutoPlaying ? (
                <Pause className="h-4 w-4 text-white" />
              ) : (
                <Play className="h-4 w-4 text-white ml-0.5" />
              )}
            </button>
            <span className="text-white/60 text-sm">{isAutoPlaying ? "Auto Playing..." : "Auto Play"}</span>
          </div>

          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-110"
            disabled={isAutoPlaying}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Horizontal Scrolling Gallery */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-96 h-64 relative group cursor-pointer"
                onClick={() => !isAutoPlaying && scrollToImage(index)}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-white/10">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Image Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold text-lg mb-2">{image.title}</h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-500/50 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Custom Scrollbar */}
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => !isAutoPlaying && scrollToImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 w-8"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  disabled={isAutoPlaying}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { number: "8+", label: "Jahre Erfahrung" },
            { number: "500+", label: "Zufriedene Gäste" },
            { number: "50+", label: "Premium Tabaksorten" },
            { number: "24/7", label: "Unvergessliche Momente" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar and animations */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}
