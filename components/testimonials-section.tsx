"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Star, StarHalf, ChevronLeft, ChevronRight, ExternalLink, Quote } from "lucide-react"

// Tipo para los testimonios
interface Testimonial {
  id: number
  name: string
  title: string
  rating: number
  date: string
  price?: string
  text: string
  image?: string
}

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Lista de testimonios
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Shpetim Xhemaili",
      title: "7 Bewertungen · 3 Fotos",
      rating: 5,
      date: "Vor einem Monat",
      price: "30-40 CHF",
      text: "Beste Shisha im Osten der Schweiz, sehr freundliches und höfliches Servicepersonal, hochwertige Shisha! Preis Leistung stimmt! Bester Hookah Mann: Agon!",
    },
    {
      id: 2,
      name: "Tim Beh",
      title: "5 Bewertungen",
      rating: 5,
      date: "Vor einem Monat",
      price: "40-50 CHF",
      text: "Bester Laden! Wirklich angenehmes Ambiente, man fühlt sich sofort wie zu Hause. Das Personal ist nicht nur super, sondern auch immer für einen Spaß zu haben.",
    },
    {
      id: 3,
      name: "Werner Stocker",
      title: "Local Guide · 285 Bewertungen · 1750 Fotos",
      rating: 5,
      date: "Vor einem Monat",
      text: "Tolles Konzept. Das mexikanische Essen ist einfach der Hammer.",
    },
    {
      id: 4,
      name: "Tugce Atnl",
      title: "10 Bewertungen · 2 Fotos",
      rating: 5,
      date: "Vor einem Monat",
      price: "10-20 CHF",
      text: "Toller Service, wir kommen aus Vorarlberg, hervorragender Service, hervorragende Mitarbeiter, Nik war sehr aufmerksam!",
    },
    {
      id: 5,
      name: "Martin Gajic",
      title: "1 Bewertung",
      rating: 5,
      date: "Vor einem Monat",
      text: "Ushuaia Buchs hat mich durch seine sehr harmonische Lage angezogen, außerdem ist die mexikanische Küche ein Hit und das Essen ist unglaublich. Hier essen auch die Augen mit!",
    },
    {
      id: 6,
      name: "Gentiana Kelmendi",
      title: "1 Bewertung",
      rating: 5,
      date: "Vor einem Monat",
      text: "Wooooow sehr empfehlenswert!",
    },
    {
      id: 7,
      name: "Mirfera",
      title: "Local Guide · 50 Bewertungen",
      rating: 4.5,
      date: "Vor 3 Monaten",
      text: "Sehr gutes Restaurant, freundliches Personal, ausgezeichnete Getränke, gute Musik.",
    },
    {
      id: 8,
      name: "Ajni Kurtaj",
      title: "6 Bewertungen · 1 Foto",
      rating: 4.5,
      date: "Vor einer Woche",
      price: "50-60 CHF",
      text: "Ausgezeichnetes Ambiente und erstklassiger Service.",
    },
    {
      id: 9,
      name: "Hans Jürg Stoffel",
      title: "Local Guide · 23 Bewertungen · 37 Fotos",
      rating: 4.5,
      date: "Vor 2 Tagen",
      price: "70-80 CHF",
      text: "Einzigartiges Ambiente und außergewöhnliche Cocktails.",
    },
  ]

  // Colores para los avatares de letras
  const avatarColors = [
    "bg-purple-500",
    "bg-pink-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-indigo-500",
    "bg-orange-500",
    "bg-teal-500",
  ]

  // Establecer montado
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Autoplay para el carrusel
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoplay) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  // Renderizar estrellas basadas en la calificación
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <motion.span
          key={`star-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        </motion.span>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <motion.span
          key="half-star"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: fullStars * 0.1, duration: 0.3 }}
        >
          <StarHalf className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        </motion.span>,
      )
    }

    return stars
  }

  // Navegar a la siguiente o anterior reseña
  const navigate = (direction: "next" | "prev") => {
    setAutoplay(false)
    if (direction === "next") {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    } else {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  // Seleccionar una reseña específica
  const selectTestimonial = (index: number) => {
    setAutoplay(false)
    setActiveIndex(index)
  }

  // Partículas flotantes para el efecto wow
  const FloatingParticles = () => {
    if (!isMounted) return null

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          // Posiciones fijas para evitar problemas de hidratación
          const positions = [
            { x: 10, y: 20 },
            { x: 25, y: 40 },
            { x: 40, y: 15 },
            { x: 60, y: 30 },
            { x: 75, y: 50 },
            { x: 85, y: 25 },
            { x: 15, y: 60 },
            { x: 30, y: 75 },
            { x: 50, y: 85 },
            { x: 70, y: 65 },
            { x: 90, y: 45 },
            { x: 20, y: 90 },
            { x: 35, y: 10 },
            { x: 55, y: 55 },
            { x: 65, y: 80 },
            { x: 80, y: 35 },
            { x: 5, y: 70 },
            { x: 45, y: 95 },
            { x: 95, y: 5 },
            { x: 38, y: 62 },
          ]

          const pos = positions[i % positions.length]
          const size = 10 + (i % 3) * 5
          const duration = 8 + (i % 5)
          const delay = i * 0.3

          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              animate={{
                y: [0, -100, -200],
                x: [0, i % 2 === 0 ? 30 : -30, i % 2 === 0 ? 60 : -60],
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0.5],
              }}
              transition={{
                duration: duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: delay,
              }}
            />
          )
        })}
      </div>
    )
  }

  // Renderizar avatar con letra inicial
  const renderAvatar = (name: string, index: number) => {
    const initial = name.charAt(0).toUpperCase()
    const colorIndex = index % avatarColors.length
    const colorClass = avatarColors[colorIndex]

    return (
      <div className={`flex items-center justify-center ${colorClass} text-white font-semibold rounded-full`}>
        {initial}
      </div>
    )
  }

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-20 bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden"
    >
      {/* Fondo animado */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.2 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] bg-repeat opacity-10" />

        {/* Gradientes de fondo */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl" />
        </div>

        {/* Partículas flotantes */}
        <FloatingParticles />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Encabezado de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Was unsere Gäste sagen
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: isInView ? "5rem" : 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <motion.p
            className="text-white/80 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Entdecken Sie die Erfahrungen unserer zufriedenen Kunden
          </motion.p>
        </motion.div>

        {/* Carrusel de testimonios */}
        <div className="relative max-w-6xl mx-auto">
          {/* Controles de navegación */}
          <div className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-20">
            <motion.button
              onClick={() => navigate("prev")}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </motion.button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-20">
            <motion.button
              onClick={() => navigate("next")}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </motion.button>
          </div>

          {/* Tarjetas de testimonios */}
          <div className="relative h-[500px] md:h-[400px] overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`testimonial-${activeIndex}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col md:flex-row"
              >
                {/* Tarjeta principal */}
                <div className="w-full md:w-2/3 h-full bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col justify-between">
                  {/* Comillas decorativas */}
                  <div className="absolute -top-6 -left-6 text-purple-500/20 transform rotate-180">
                    <Quote size={80} />
                  </div>

                  {/* Contenido del testimonio */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/50 mr-4">
                        {renderAvatar(testimonials[activeIndex].name, activeIndex)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{testimonials[activeIndex].name}</h3>
                        <p className="text-white/60 text-sm">{testimonials[activeIndex].title}</p>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <div className="flex mr-3">{renderStars(testimonials[activeIndex].rating)}</div>
                      <span className="text-white/60 text-sm">{testimonials[activeIndex].date}</span>
                      {testimonials[activeIndex].price && (
                        <span className="ml-3 px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/70">
                          {testimonials[activeIndex].price}
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <motion.p
                        className="text-white/90 text-lg leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {testimonials[activeIndex].text}
                      </motion.p>
                    </div>
                  </div>

                  {/* Comillas decorativas de cierre */}
                  <div className="absolute -bottom-6 -right-6 text-pink-500/20">
                    <Quote size={80} />
                  </div>
                </div>

                {/* Tarjetas secundarias */}
                <div className="hidden md:flex flex-col w-1/3 ml-6 space-y-6">
                  {[(activeIndex + 1) % testimonials.length, (activeIndex + 2) % testimonials.length].map(
                    (index, i) => (
                      <div
                        key={`side-testimonial-${index}`}
                        className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 cursor-pointer transition-all h-1/2 flex flex-col justify-between"
                        onClick={() => selectTestimonial(index)}
                      >
                        <div>
                          <div className="flex items-center mb-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-purple-500/50 mr-3">
                              {renderAvatar(testimonials[index].name, index)}
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-white">{testimonials[index].name}</h3>
                              <div className="flex mt-1">
                                {Array.from({ length: Math.floor(testimonials[index].rating) }).map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                                {testimonials[index].rating % 1 !== 0 && (
                                  <StarHalf className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-white/80 text-sm line-clamp-3">{testimonials[index].text}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-purple-400 text-xs">{testimonials[index].date}</span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicadores de navegación */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={`indicator-${index}`}
                onClick={() => selectTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Botón para ver más reseñas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="https://www.google.com/search?q=ushuaia+buchs&num=10&client=safari&sca_esv=e833def03aa227c2&channel=iphone_bm&sxsrf=AE3TifMpWzrOuM7XKstSkMvOBRYixp520g%3A1748034667510&ei=a-QwaPb1Hv2J9u8PzKPKgQ8&gs_ssp=eJzj4tVP1zc0TDZLLiwwLTE2YLRSMagwMbdMMjZMtjA1Skk1NzM1tjKoMDe3ME40SkpNS0sxNzZO9uItLc4oTcxMVEgqTc4oBgCEuRP6&oq=ush&gs_lp=Egxnd3Mtd2l6LXNlcnAiA3VzaCoCCAAyEBAuGIAEGMcBGCcYigUYrwEyBBAjGCcyChAuGIAEGEMYigUyChAAGIAEGEMYigUyChAuGIAEGEMYigUyBRAuGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIdEC4YgAQYxwEYigUYrwEYlwUY3AQY3gQY4ATYAQFIrxJQAFjvBXAAeACQAQCYAYsBoAHXAqoBAzEuMrgBAcgBAPgBAZgCA6AC9gLCAgsQLhiABBjRAxjHAZgDALoGBggBEAEYFJIHAzAuM6AHuzyyBwMwLjO4B_YCwgcFMi0yLjHIBxo&sclient=gws-wiz-serp#lrd=0x479b31c852de7653:0x7783a2beffd733c,1,,,,&rlimm=8618464172429172540"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg inline-flex items-center group shadow-lg shadow-purple-500/30 cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
              textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Mehr Bewertungen ansehen</span>
            <ExternalLink className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

        {/* Estadísticas de reseñas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 max-w-4xl mx-auto"
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
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.3)" }}
              >
                <motion.div
                  className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isInView ? 1 : 0.8 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Estilos personalizados para animaciones */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
