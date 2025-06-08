"use client"

import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"

function SubtleParticles({ isEventsInView }: { isEventsInView: boolean }) {
  const [isMounted, setIsMounted] = useState(false)
  const [particles, setParticles] = useState<
    Array<{ id: number; top: string; left: string; duration: number; delay: number }>
  >([])

  useEffect(() => {
    setIsMounted(true)

    const newParticles = Array.from({ length: 12 }).map((_, index) => ({
      id: index,
      top: `${(index * 8) % 100}%`,
      left: `${(index * 9) % 100}%`,
      duration: 3 + (index % 2),
      delay: (index % 4) * 0.5,
    }))

    setParticles(newParticles)
  }, [])

  if (!isMounted) return null

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-purple-400/20"
          style={{
            top: particle.top,
            left: particle.left,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isEventsInView ? [0, 0.6, 0] : 0,
            scale: [0, 1, 0],
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

function SimpleMexicanLines() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Horizontal zigzag lines - top */}
        <path
          d="M0,100 L50,80 L100,100 L150,80 L200,100 L250,80 L300,100 L350,80 L400,100 L450,80 L500,100 L550,80 L600,100 L650,80 L700,100 L750,80 L800,100 L850,80 L900,100 L950,80 L1000,100 L1050,80 L1100,100 L1150,80 L1200,100"
          stroke="#F59E0B"
          strokeWidth="3"
          opacity="0.6"
          fill="none"
        />

        {/* Horizontal zigzag lines - bottom */}
        <path
          d="M0,700 L50,680 L100,700 L150,680 L200,700 L250,680 L300,700 L350,680 L400,700 L450,680 L500,700 L550,680 L600,700 L650,680 L700,700 L750,680 L800,700 L850,680 L900,700 L950,680 L1000,700 L1050,680 L1100,700 L1150,680 L1200,700"
          stroke="#F59E0B"
          strokeWidth="3"
          opacity="0.6"
          fill="none"
        />

        {/* Vertical zigzag lines - left */}
        <path
          d="M100,0 L80,50 L100,100 L80,150 L100,200 L80,250 L100,300 L80,350 L100,400 L80,450 L100,500 L80,550 L100,600 L80,650 L100,700 L80,750 L100,800"
          stroke="#EF4444"
          strokeWidth="3"
          opacity="0.5"
          fill="none"
        />

        {/* Vertical zigzag lines - right */}
        <path
          d="M1100,0 L1080,50 L1100,100 L1080,150 L1100,200 L1080,250 L1100,300 L1080,350 L1100,400 L1080,450 L1100,500 L1080,550 L1100,600 L1080,650 L1100,700 L1080,750 L1100,800"
          stroke="#EF4444"
          strokeWidth="3"
          opacity="0.5"
          fill="none"
        />

        {/* Diagonal lines - top left to bottom right */}
        <path d="M0,0 L1200,800" stroke="#10B981" strokeWidth="2" strokeDasharray="20,20" opacity="0.4" fill="none" />

        {/* Diagonal lines - top right to bottom left */}
        <path d="M1200,0 L0,800" stroke="#10B981" strokeWidth="2" strokeDasharray="20,20" opacity="0.4" fill="none" />

        {/* Simple triangular pattern - top */}
        <path
          d="M300,50 L350,100 L400,50 L450,100 L500,50 L550,100 L600,50 L650,100 L700,50 L750,100 L800,50 L850,100 L900,50"
          stroke="#8B5CF6"
          strokeWidth="3"
          opacity="0.5"
          fill="none"
        />

        {/* Simple triangular pattern - bottom */}
        <path
          d="M300,750 L350,700 L400,750 L450,700 L500,750 L550,700 L600,750 L650,700 L700,750 L750,700 L800,750 L850,700 L900,750"
          stroke="#8B5CF6"
          strokeWidth="3"
          opacity="0.5"
          fill="none"
        />

        {/* Centered decorative element */}
        <g transform="translate(600, 400)">
          <circle cx="0" cy="0" r="100" stroke="#F59E0B" strokeWidth="2" opacity="0.3" fill="none" />
          <circle cx="0" cy="0" r="80" stroke="#EF4444" strokeWidth="2" opacity="0.3" fill="none" />
          <circle cx="0" cy="0" r="60" stroke="#10B981" strokeWidth="2" opacity="0.3" fill="none" />

          {/* Radiating lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="-120"
              x2="0"
              y2="-100"
              stroke="#F59E0B"
              strokeWidth="2"
              opacity="0.4"
              transform={`rotate(${i * 30})`}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

export default function EventsSection() {
  const ref = useRef(null)
  const isEventsInView = useInView(ref, { once: false, amount: 0.2 })

  const title = "Kitchen by"
  const titleLetters = title.split("")

  return (
    <section id="events" ref={ref} className="py-16 bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent" />

      {/* Simple Mexican Lines Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isEventsInView ? 1 : 0,
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <SimpleMexicanLines />
      </motion.div>

      {/* Minimal particles */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isEventsInView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <SubtleParticles isEventsInView={isEventsInView} />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Clean Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isEventsInView ? 1 : 0, y: isEventsInView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          {/* Elegant title */}
          <motion.div
            className="text-5xl md:text-6xl font-light mb-4 relative"
            initial={{ scale: 0.95 }}
            animate={{ scale: isEventsInView ? 1 : 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {titleLetters.map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isEventsInView ? 1 : 0,
                  y: isEventsInView ? 0 : 20,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: "300",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Logo - smaller size */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: isEventsInView ? 1 : 0,
              scale: isEventsInView ? 1 : 0.9,
            }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Image
              src="/cantina_logocopia.png"
              alt="Cantina Logo"
              width={160}
              height={100}
              className="object-contain"
            />
          </motion.div>

          {/* Simple subtitle */}
          <motion.div
            className="text-lg md:text-xl text-purple-200 font-light mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isEventsInView ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Authentische Mexikanische Geschmäcker
          </motion.div>

          <motion.p
            className="text-slate-300 leading-relaxed max-w-2xl mx-auto"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: isEventsInView ? 0 : 15, opacity: isEventsInView ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Genießen Sie unsere Premium-Margaritas und Tequila-Auswahl, begleitet von frischen Zutaten und hausgemachten
            Salsas.
          </motion.p>
        </motion.div>

        {/* Compact feature items */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { icon: "🌮", text: "Hausgemacht" },
            { icon: "🍹", text: "Premium Margaritas" },
            { icon: "🌶️", text: "Scharfe Salsas" },
            { icon: "🥑", text: "Frische" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{
                opacity: isEventsInView ? 1 : 0,
                scale: isEventsInView ? 1 : 0.9,
                y: isEventsInView ? 0 : 10,
              }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
              className="flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm"
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.2 },
              }}
            >
              <span className="text-lg mr-2">{item.icon}</span>
              <span className="text-slate-200 font-medium">{item.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Moderately sized single image */}
        <div className="flex justify-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{
              opacity: isEventsInView ? 1 : 0,
              y: isEventsInView ? 0 : 30,
              scale: isEventsInView ? 1 : 0.98,
            }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative rounded-xl overflow-hidden group shadow-xl"
          >
            <Image
              src="/IMG_0816.jpeg"
              alt="Restaurante ambiente mexicano"
              width={600}
              height={400}
              className="w-full h-auto rounded-xl transition-transform duration-300 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl" />
          </motion.div>
        </div>

        {/* Compact CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isEventsInView ? 1 : 0, y: isEventsInView ? 0 : 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center"
        >
          <motion.a
            href="https://www.cantinatexmex.ch/reservierung"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center group shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Tisch reservieren</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
