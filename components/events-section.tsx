"use client"

import { motion, useInView } from "framer-motion"
import { ArrowRight } from "@/components/ui-icons"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"

function ClientOnlyParticles({ isEventsInView }: { isEventsInView: boolean }) {
  const [isMounted, setIsMounted] = useState(false)
  const [particles, setParticles] = useState<
    Array<{ id: number; top: string; left: string; duration: number; delay: number }>
  >([])

  useEffect(() => {
    setIsMounted(true)

    // Generate stable particle positions
    const newParticles = Array.from({ length: 30 }).map((_, index) => ({
      id: index,
      top: `${(index * 3.33) % 100}%`,
      left: `${(index * 7.77) % 100}%`,
      duration: 2 + (index % 3),
      delay: (index % 5) * 0.5,
    }))

    setParticles(newParticles)
  }, [])

  if (!isMounted) return null

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-purple-500/30"
          style={{
            top: particle.top,
            left: particle.left,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isEventsInView ? [0, 0.8, 0] : 0,
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
          }}
        />
      ))}
    </>
  )
}

// Animated Mexican decorative elements
function MexicanDecorations({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating chili peppers */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          initial={{ opacity: 0, rotate: 0, scale: 0 }}
          animate={{
            opacity: isVisible ? [0, 1, 0.7] : 0,
            rotate: isVisible ? [0, 10, -10, 0] : 0,
            scale: isVisible ? [0, 1.2, 1] : 0,
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          🌶️
        </motion.div>
      ))}

      {/* Floating lime slices */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`lime-${i}`}
          className="absolute text-xl"
          style={{
            right: `${5 + i * 15}%`,
            top: `${30 + (i % 2) * 25}%`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isVisible ? [0, 0.8, 0.6] : 0,
            y: isVisible ? [20, 0, 10, 0] : 20,
            rotate: isVisible ? [0, 360] : 0,
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
        >
          🍋
        </motion.div>
      ))}
    </div>
  )
}

export default function EventsSection() {
  const ref = useRef(null)
  const isEventsInView = useInView(ref, { once: false, amount: 0.2 })

  // Split title into individual letters for animation
  const title = "Cantina Tex-Mex"
  const titleLetters = title.split("")

  return (
    <section
      id="events"
      ref={ref}
      className="py-20 bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden"
    >
      {/* Animated smoke background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isEventsInView ? 0.1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[url('/abstract-smoke.png')] bg-repeat z-0"
      />

      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isEventsInView ? 0.15 : 0 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/abstract-dark-purple-pattern.png"
          alt="Hintergrundmuster"
          fill
          className="object-cover opacity-20"
        />

        {/* Animated particles */}
        <ClientOnlyParticles isEventsInView={isEventsInView} />

        {/* Mexican decorative elements */}
        <MexicanDecorations isVisible={isEventsInView} />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isEventsInView ? 1 : 0, y: isEventsInView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center mb-16"
        >
          {/* Main animated title */}
          <div className="mb-8">
            {/* Add USHUAIA KITCHEN BY text above */}
            <motion.div
              className="text-2xl md:text-3xl font-light mb-2 text-white/80 tracking-widest"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isEventsInView ? 1 : 0, y: isEventsInView ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontWeight: "300",
              }}
            >
              USHUAIA KITCHEN BY
            </motion.div>

            <motion.div
              className="text-6xl md:text-8xl font-light mb-4 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: isEventsInView ? 1 : 0.8 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {titleLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block text-white"
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{
                    opacity: isEventsInView ? 1 : 0,
                    y: isEventsInView ? 0 : 50,
                    rotateX: isEventsInView ? 0 : -90,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1 + 0.3, // Add slight delay after the "USHUAIA KITCHEN BY" text
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.2,
                    textShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
                    transition: { duration: 0.2 },
                  }}
                  style={{
                    textShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
                    fontFamily: "'Bebas Neue', cursive",
                    fontWeight: "300",
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}

              {/* Decorative elements around title */}
              <motion.div
                className="absolute -top-4 -left-4 text-4xl"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{
                  opacity: isEventsInView ? 1 : 0,
                  rotate: isEventsInView ? [0, 10, -10, 0] : 0,
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 1,
                }}
              >
                🌮
              </motion.div>

              <motion.div
                className="absolute -top-4 -right-4 text-4xl"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{
                  opacity: isEventsInView ? 1 : 0,
                  rotate: isEventsInView ? [0, -10, 10, 0] : 0,
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 1.5,
                }}
              >
                🌯
              </motion.div>
            </motion.div>

            {/* Subtitle with typewriter effect */}
            <motion.div
              className="text-xl md:text-2xl text-red-400 font-light tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: isEventsInView ? 1 : 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: isEventsInView ? "100%" : 0 }}
                transition={{ delay: 2, duration: 2, ease: "easeInOut" }}
                className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-purple-400"
                style={{ borderRight: "2px solid #f87171" }}
              >
                Authentische Mexikanische Geschmäcker
              </motion.span>
            </motion.div>
          </div>

          {/* Feature items with Mexican theme - Changed to red overlays */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { icon: "🌮", text: "Hausgemachte Tacos" },
              { icon: "🍹", text: "Premium Margaritas" },
              { icon: "🌶️", text: "Scharfe Salsas" },
              { icon: "🥑", text: "Frische Guacamole" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                  opacity: isEventsInView ? 1 : 0,
                  scale: isEventsInView ? 1 : 0.8,
                  y: isEventsInView ? 0 : 20,
                }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                className="flex items-center bg-gradient-to-r from-red-900/30 to-red-800/30 backdrop-blur-sm border border-red-500/30 rounded-full px-6 py-3"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)",
                }}
              >
                <motion.span
                  className="text-2xl mr-3"
                  animate={{
                    rotate: isEventsInView ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                >
                  {item.icon}
                </motion.span>
                <span className="text-red-200 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Content grid with Mexican theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateY: 20 }}
            animate={{
              opacity: isEventsInView ? 1 : 0,
              y: isEventsInView ? 0 : 50,
              rotateY: isEventsInView ? 0 : 20,
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden group"
          >
            <Image
              src="/cantina.jpeg"
              alt="Mexikanisches Restaurant Interieur"
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-105"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-red-900/95 via-red-900/80 to-transparent flex flex-col justify-end p-8"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.p
                className="text-red-100 leading-relaxed text-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isEventsInView ? 0 : 20, opacity: isEventsInView ? 1 : 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Erleben Sie die authentische mexikanische Küche in unserem gemütlichen Cantina-Ambiente. Von
                handgemachten Tortillas bis zu traditionellen Mole-Saucen - jedes Gericht wird mit Leidenschaft und
                originalen Rezepten zubereitet.
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, rotateY: -20 }}
            animate={{
              opacity: isEventsInView ? 1 : 0,
              y: isEventsInView ? 0 : 50,
              rotateY: isEventsInView ? 0 : -20,
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative rounded-2xl overflow-hidden group"
          >
            <Image
              src="/cantinacopia.jpeg"
              alt="Mexikanisches Essen und Getränke"
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-105"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-red-800/95 via-red-800/80 to-transparent flex flex-col justify-end p-8"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.p
                className="text-red-100 leading-relaxed text-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isEventsInView ? 0 : 20, opacity: isEventsInView ? 1 : 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Genießen Sie unsere Premium-Margaritas und Tequila-Auswahl, begleitet von frischen Zutaten und
                hausgemachten Salsas. Perfekt für einen entspannten Abend mit Freunden oder ein romantisches Dinner zu
                zweit.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isEventsInView ? 1 : 0, y: isEventsInView ? 0 : 30 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://cantinatexmex.ch"
            target="_blank"
            rel="noopener noreferrer"
            className=" text-white px-10 py-4 rounded-full font-bold text-lg inline-flex items-center group shadow-lg shadow-red-500/30 cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(239, 68, 68, 0.6)",
              textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Reservieren Sie Ihren Tisch!</span>
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
          </motion.a>
        </motion.div>
      </div>

      {/* Custom CSS for fonts */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@300;400&display=swap');
      `}</style>
    </section>
  )
}
