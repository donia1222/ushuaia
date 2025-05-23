"use client"

import { motion, useInView } from "framer-motion"
import { MapPin } from "@/components/ui-icons"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"

// Add this component inside the file, before the LocationSection component
function ClientOnlyLightBeams() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <motion.div
        className="absolute top-0 left-1/4 w-1 h-[500px] bg-gradient-to-b from-purple-500/0 via-purple-500/30 to-purple-500/0 blur-xl"
        animate={{
          height: ["500px", "700px", "500px"],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-1 h-[600px] bg-gradient-to-b from-pink-500/0 via-pink-500/20 to-pink-500/0 blur-xl"
        animate={{
          height: ["600px", "400px", "600px"],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
      />
    </>
  )
}

export default function LocationSection() {
  const ref = useRef(null)
  const isLocationInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section id="location" ref={ref} className="py-20 bg-black relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLocationInView ? 0.2 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30 mix-blend-overlay" />
        <div className="h-full w-full bg-[url('/header.jpeg')] bg-repeat opacity-10" />

        {/* Animated light beams */}
        <ClientOnlyLightBeams />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLocationInView ? 1 : 0, y: isLocationInView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: isLocationInView ? 1 : 0, rotate: isLocationInView ? 0 : -90 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4"
          >
            <MapPin className="h-6 w-6 text-purple-400" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isLocationInView ? 1 : 0, x: isLocationInView ? 0 : -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold"
          >
            Unser neuer Standort
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isLocationInView ? 1 : 0, x: isLocationInView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <motion.div className="relative h-80 rounded-xl overflow-hidden group" whileHover={{ scale: 1.02 }}>
              <Image
                src="/header.jpeg"
                alt="Ushuaia Location"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <p className="text-white/90 text-sm">Unsere moderne Lounge mit einzigartiger Atmosphäre</p>
              </motion.div>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="relative h-40 rounded-xl overflow-hidden group"
                initial={{ opacity: 0, y: 30, rotateY: 30 }}
                animate={{
                  opacity: isLocationInView ? 1 : 0,
                  y: isLocationInView ? 0 : 30,
                  rotateY: isLocationInView ? 0 : 30,
                }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
              >
                <Image
                  src="/cantina.jpeg"
                  alt="Ushuaia Hookah"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-white/90 text-xs">Premium Shisha Erlebnis</p>
                </motion.div>
              </motion.div>
              <motion.div
                className="relative h-40 rounded-xl overflow-hidden group"
                initial={{ opacity: 0, y: 30, rotateY: -30 }}
                animate={{
                  opacity: isLocationInView ? 1 : 0,
                  y: isLocationInView ? 0 : 30,
                  rotateY: isLocationInView ? 0 : -30,
                }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
              >
                <Image
                  src="/IMG_2667.jpeg"
                  alt="Ushuaia Bar"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-white/90 text-xs">Exklusive Cocktail-Kreationen</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isLocationInView ? 1 : 0, x: isLocationInView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <motion.div
              className="relative h-40 rounded-xl overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLocationInView ? 1 : 0, y: isLocationInView ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/IMG_2709.jpeg"
                alt="Ushuaia Terrace"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <p className="text-white/90 text-xs">Unsere exklusive Terrasse</p>
              </motion.div>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="relative h-80 rounded-xl overflow-hidden group"
                initial={{ opacity: 0, y: 30, rotateY: 30 }}
                animate={{
                  opacity: isLocationInView ? 1 : 0,
                  y: isLocationInView ? 0 : 30,
                  rotateY: isLocationInView ? 0 : 30,
                }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
              >
                <Image
                  src="/IMG_8901.jpeg"
                  alt="Ushuaia Cocktail"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-white/90 text-sm">Handgefertigte Premium-Cocktails</p>
                </motion.div>
              </motion.div>
              <motion.div
                className="relative h-80 rounded-xl overflow-hidden group"
                initial={{ opacity: 0, y: 30, rotateY: -30 }}
                animate={{
                  opacity: isLocationInView ? 1 : 0,
                  y: isLocationInView ? 0 : 30,
                  rotateY: isLocationInView ? 0 : -30,
                }}
                transition={{ duration: 0.8, delay: 0.9 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
              >
                <Image
                  src="/download-3.png"
                  alt="Ushuaia Lounge"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-white/90 text-sm">Komfortable Sitzgelegenheiten</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLocationInView ? 1 : 0, y: isLocationInView ? 0 : 30 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="https://maps.google.com/?q=Bahnhofstrasse+40,+9470+Buchs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-full transition-colors"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <MapPin className="h-5 w-5 text-purple-400 mr-2" />
            <span>Bahnhofstrasse 40, 9470 Buchs</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
