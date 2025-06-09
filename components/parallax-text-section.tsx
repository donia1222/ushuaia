"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Sparkles, Leaf, Star } from "lucide-react"

export default function NeonImageShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("neon-showcase-section")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="neon-showcase-section"
      className=" relative overflow-hidden flex items-center justify-center py-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-yellow-500/8 to-green-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500/12 to-lime-500/12 rounded-full blur-3xl animate-pulse delay-500" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Floating decorative elements */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${5 + Math.random() * 90}%`,
              animation: `float-gentle ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            {i % 3 === 0 ? (
              <Sparkles className="w-4 h-4 text-yellow-400" />
            ) : i % 3 === 1 ? (
              <Leaf className="w-5 h-5 text-green-400" />
            ) : (
              <Star className="w-3 h-3 text-lime-400" />
            )}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Main Image Container */}
        <div
          className={`relative max-w-5xl mx-auto transition-all duration-1500 delay-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Image Frame with Glow Effect */}
          <div className="relative group">
            {/* Outer glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-yellow-500/20 to-green-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700" />

            {/* Inner frame */}
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8904-jzuP5SgTW2FsZYodiGWSIshnSSnPPl.png"
                  alt="Neon Dreams Sign - If someone dreams alone it's just a dream, when we dream together it is the beginning of a new reality"
                  width={1200}
                  height={600}
                  className={`w-full h-auto transition-all duration-1000 group-hover:scale-105 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  priority
                />

                {/* Loading overlay */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 animate-pulse rounded-xl flex items-center justify-center">
                    <div className="text-white/50 text-lg">Loading inspiration...</div>
                  </div>
                )}

                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-green-400/50 rounded-tl-lg" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-yellow-400/50 rounded-tr-lg" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-yellow-400/50 rounded-bl-lg" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-green-400/50 rounded-br-lg" />
          </div>
        </div>

        {/* Quote Section */}
        <div
          className={`text-center mt-16 max-w-4xl mx-auto transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >

        
        </div>

       
      </div>

      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
      `}</style>
    </section>
  )
}
