"use client"
import { useEffect, useState } from "react"
import { Users, Award, Sparkles, Rocket } from "lucide-react"

export default function TimelineSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Simple fade in for all items with minimal delay
            timelineEvents.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, index])
              }, index * 120)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("timeline-section")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const timelineEvents = [
    {
      year: "2016",
      subYears: ["2017", "2018"],
      title: "Seit 2016 - Der Anfang",
      description:
        "Gründung der Ushuaia Bar mit der Vision, exzellenten Service und unvergessliche Erlebnisse zu bieten.",
      icon: <Rocket className="h-6 w-6" />,
      image: "/473995058_1149256516903267_1130238879082676197_n.jpg",
    },
    {
      year: "2019",
      subYears: ["2020", "2021"],
      title: "Etablierung & Wachstum",
      description: "8+ Jahre Erfahrung aufgebaut. Über 500+ zufriedene Gäste und 50+ Premium Tabaksorten im Angebot.",
      icon: <Award className="h-6 w-6" />,
      image: "/modern-cocktail-bar-purple-neon.png",
    },
    {
      year: "2022",
      subYears: ["2023", "2024"],
      title: "Premium Experience",
      description:
        "Entwicklung zur Premium Shisha Bar mit Cocktails, Hookah und Lounge. Einzigartige Atmosphäre geschaffen.",
      icon: <Sparkles className="h-6 w-6" />,
      image: "/luxury-shisha-lounge-purple-1.png",
    },
    {
      year: "2025",
      subYears: [], // No sub-years for the last event as it's the current/future one
      title: "Kitchen by Cantina & Zukunft",
      description:
        "Eröffnung der Kitchen by Cantina mit authentischer mexikanischer Küche, Premium-Margaritas und Tequila-Auswahl.",
      icon: <Users className="h-6 w-6" />,
      image: "/IMG_2656.jpeg",
    },
  ]

  return (
    <section
      id="timeline-section"
      className="py-20 bg-gradient-to-b from-purple-950/30 to-black relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] bg-repeat opacity-5" />
        <div
          className={`absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 transition-opacity duration-700 ${
            isVisible ? "opacity-10" : "opacity-0"
          }`}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Logo Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <img
            src="/colibri.png"
            alt="Ushuaia Logo"
            className={`mx-auto mb-8 h-24 object-contain transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          />
          <h2
            className={`text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Unsere Reise durch die Zeit
          </h2>
          <p
            className={`text-white/80 text-lg transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Von den ersten Schritten bis zu unserer Vision für die Zukunft
          </p>
        </div>

        {/* Horizontal Scroll Timeline - Solo fade in, sin escalas ni transformaciones */}
        <div className="flex overflow-x-auto pb-8 space-x-8 scrollbar-hide lg:justify-center">
          {timelineEvents.map((event, index) => (
            <div
              key={event.year}
              className={`flex-none w-[300px] md:w-[350px] backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl overflow-hidden transition-opacity duration-700 hover:shadow-xl hover:shadow-purple-500/20 ${
                visibleItems.includes(index) ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={`${event.title} - ${event.year}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {event.year}
                  </span>
                  {event.subYears && event.subYears.length > 0 && (
                    <div className="mt-1 flex flex-col gap-0.5">
                      {event.subYears.map((subYear) => (
                        <span key={subYear} className="text-white/70 text-xs px-3 py-0.5 rounded-full">
                          {subYear}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2 text-white">
                  {event.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">{event.title}</h3>
                <p className="text-white/80 leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Elementos flotantes estáticos (sin animación) */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl" />
      </div>

      <style jsx>{`
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `}</style>
    </section>
  )
}
