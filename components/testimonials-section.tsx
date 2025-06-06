"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function TestimonialsSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-20 bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] bg-repeat opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
    


        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Durchschnittliche Bewertung", value: "4.8" },
              { label: "Zufriedene Kunden", value: "98%" },
              { label: "Google Bewertungen", value: "100+" },
              { label: "Empfehlungsrate", value: "96%" },
            ].map((stat, index) => (
              <motion.div
                key={`stat-${index}`}
                className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.3)" }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: inView ? 1 : 0.8 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
