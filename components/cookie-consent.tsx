"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if cookie consent has been given before
    const consentGiven = localStorage.getItem("cookieConsentGiven")
    if (!consentGiven) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsentGiven", "true")
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900 to-pink-900 text-white p-4 shadow-lg md:flex md:items-center md:justify-between"
        >
          <div className="mb-4 md:mb-0 md:mr-4">
            <p className="text-sm">
              Wir verwenden Cookies, um Ihr Erlebnis auf unserer Website zu verbessern. Durch die Nutzung unserer
              Website stimmen Sie der Verwendung von Cookies zu. Weitere Informationen finden Sie in unserer{" "}
              <a href="#" className="underline hover:text-purple-300">
                Datenschutzerklärung
              </a>
              .
            </p>
          </div>
          <Button
            onClick={handleAccept}
            className="w-full md:w-auto bg-white text-purple-800 hover:bg-gray-100 hover:text-purple-900 transition-colors"
          >
            Verstanden
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
