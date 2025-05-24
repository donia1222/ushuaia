"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import {
  Menu,
  X,
  Info,
  MapPin,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  ChevronDown,
  Home,
  Camera,
  UtensilsCrossed,
  Star,
} from "@/components/ui-icons"
import { AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

import HomeSection from "@/components/home-section"
import AboutSection from "@/components/about-section"
import LocationSection from "@/components/location-section"
import EventsSection from "@/components/events-section"
import ContactSection from "@/components/contact-section"
import ParallaxTextSection from "@/components/parallax-text-section"
import GallerySection from "@/components/gallery-section"
import TestimonialsSection from "@/components/testimonials-section"

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)

  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const galleryRef = useRef(null)
  const locationRef = useRef(null)
  const eventsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const contactRef = useRef(null)

  // Smooth scroll progress for overall page
  const { scrollYProgress } = useScroll()
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Menu items with icons
  const menuItems = [
    { id: "home", label: "Home", icon: <Home className="h-4 w-4" /> },
    { id: "about", label: "About", icon: <Info className="h-4 w-4" /> },
    { id: "gallery", label: "Gallery", icon: <Camera className="h-4 w-4" /> },
    { id: "location", label: "Location", icon: <MapPin className="h-4 w-4" /> },
    { id: "events", label: "Cantina Tex-Mex", icon: <UtensilsCrossed className="h-4 w-4" /> },
    { id: "contact", label: "Contact", icon: <MessageCircle className="h-4 w-4" /> },
  ]

  // Hide/show header based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Set hasScrolled state for animation
      if (currentScrollY > 50) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }

      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 300) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "gallery", "location", "events", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const height = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 z-50"
        style={{ scaleX: smoothScrollProgress, transformOrigin: "0%" }}
      />
      {/* Modern Scroll Indicator */}
      <AnimatePresence>
        {hasScrolled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-40"
          >
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center cursor-pointer shadow-lg shadow-purple-500/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ChevronDown className="h-6 w-6 text-white transform rotate-180" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Navigation */}
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          hasScrolled ? "bg-black/90 backdrop-blur-md py-2 shadow-lg shadow-purple-900/10" : "bg-transparent py-4",
        )}
        initial={{ y: 0 }}
        animate={{ y: isHeaderVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <img
              src="/logo.png"
              alt="USHUAIA"
              className="h-12 sm:h-16 md:h-20 w-auto rounded-lg shadow-lg shadow-purple-500/20"
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              animate={{ width: hasScrolled ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "text-sm uppercase tracking-wider transition-colors relative flex items-center gap-2 px-3 py-2 rounded-md overflow-hidden",
                  activeSection === item.id
                    ? "text-white bg-white/5"
                    : "text-white/70 hover:text-white hover:bg-white/5",
                )}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.icon}
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            className="md:hidden text-white p-2 rounded-md bg-white/5"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>
      </motion.nav>
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <img
                  src="/logo.png"
                  alt="USHUAIA"
                  className="h-16 sm:h-20 w-auto rounded-lg shadow-lg shadow-purple-500/30"
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  animate={{ width: hasScrolled ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.button
                onClick={() => setMobileMenuOpen(false)}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-md bg-white/5"
              >
                <X className="h-6 w-6 text-white" />
              </motion.button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 p-6">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "text-xl flex items-center gap-3 w-full py-4 px-6 my-1 rounded-lg transition-colors",
                    activeSection === item.id
                      ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white"
                      : "text-white/70 hover:bg-white/5",
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
            <div className="p-6 border-t border-white/10 flex justify-center space-x-4">
              <motion.a
                href="#facebook"
                className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
                whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ y: 0 }}
              >
                <Facebook className="h-5 w-5 text-white/70" />
              </motion.a>
              <motion.a
                href="#instagram"
                className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
                whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ y: 0 }}
              >
                <Instagram className="h-5 w-5 text-white/70" />
              </motion.a>
              <motion.a
                href="#twitter"
                className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
                whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ y: 0 }}
              >
                <Twitter className="h-5 w-5 text-white/70" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Sections */}
      <HomeSection scrollIndicator={false} />
      <AboutSection />
      <ParallaxTextSection />
      <GallerySection />
      <LocationSection />
      <EventsSection />
      <TestimonialsSection />
      <ContactSection />
      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <img src="/logo.png" alt="USHUAIA" className="h-20 w-auto rounded-lg shadow-lg shadow-purple-500/20" />
              </motion.div>
              <p className="text-white/60 text-sm">Premium Cocktail, Hookah & Terrace in Buchs seit 2016.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Kontakt</h3>
              <ul className="space-y-3 text-white/60">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-purple-400 mr-2 shrink-0 mt-0.5" />
                  <span>Bahnhofstrasse 40, 9470 Buchs</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-purple-400 mr-2 shrink-0" />
                  <a href="mailto:info@ushuaia-bar.ch" className="hover:text-white transition-colors">
                    info@ushuaia-bar.ch
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-purple-400 mr-2 shrink-0" />
                  <a href="tel:+41817560101" className="hover:text-white transition-colors">
                    +41 81 756 01 01
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Links</h3>
              <ul className="space-y-2 text-white/60">
                {[
                  { label: "Home", id: "home" },
                  { label: "Über Uns", id: "about" },
                  { label: "Galerie", id: "gallery" },
                  { label: "Cantina Tex-Mex", id: "events" },
                  { label: "Kontakt", id: "contact" },
                ].map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="hover:text-white transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Öffnungszeiten</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li className="flex justify-between">
                  <span>Montag - Donnerstag</span>
                  <span>17:00 - 23:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Freitag</span>
                  <span>17:00 - 01:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Samstag</span>
                  <span>14:00 - 01:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sonntag</span>
                  <span>14:00 - 23:00</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/40 text-sm">© {new Date().getFullYear()} Ushuaia Bar. Alle Rechte vorbehalten.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <motion.a
                href="#facebook"
                className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <Facebook className="h-5 w-5 text-white/70" />
              </motion.a>
              <motion.a
                href="#instagram"
                className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <Instagram className="h-5 w-5 text-white/70" />
              </motion.a>
              <motion.a
                href="#twitter"
                className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <Twitter className="h-5 w-5 text-white/70" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
