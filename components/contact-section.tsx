"use client"
import { MapPin, Mail, Phone } from "lucide-react"
import { useRef } from "react"

export default function ContactSection() {
  const ref = useRef(null)

  // Contact info items
  const contactItems = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Adresse",
      content: "Bahnhofstrasse 40, 9470 Buchs",
      link: "https://maps.google.com/?q=Bahnhofstrasse+40,+9470+Buchs",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "info@ushuaia-bar.ch",
      link: "mailto:info@ushuaia-bar.ch",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Telefon",
      content: "+41 81 756 01 01",
      link: "tel:+41817560101",
    },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 bg-gradient-to-b from-black to-purple-950/30 relative overflow-hidden"
    >
      {/* Static background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] bg-repeat opacity-5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Kontaktieren Sie uns</h2>
          <p className="text-white/80">
            Wir freuen uns darauf, von Ihnen zu hören und Ihnen bei Ihren Anfragen zu helfen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {contactItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 text-purple-400">
                {item.icon}
              </div>
              <h3 className="text-lg font-medium mb-2">{item.title}</h3>
              <p className="text-white/80">{item.content}</p>
            </a>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Ihr Name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Ihre Email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium">
                Betreff
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Betreff Ihrer Nachricht"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">
                Nachricht
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Ihre Nachricht"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity hover:shadow-lg"
            >
              Nachricht senden
            </button>
          </form>
        </div>

        {/* Bildnachweis - Image Credits Section */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto border-t border-white/10 pt-6">
            <p className="text-white/40 text-sm">
              <span className="font-medium text-white/60">Bildnachweis:</span> Einige Bilder stammen von Freepik.
            </p>
            <p className="text-white/40 text-sm mt-1">
              Demo-Webseite vom{" "}
              <a
                href="https://lweb.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                lweb.ch
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
