"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Shield, AlertTriangle } from "lucide-react"

export default function AgeRestrictionModal() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasAccepted = localStorage.getItem("ageRestrictionAccepted")
    if (!hasAccepted) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("ageRestrictionAccepted", "true")
    setIsVisible(false)
  }

  const handleReject = () => {
    window.location.href = "https://www.google.com"
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-purple-500/10"
          >
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Altersbestätigung
                </h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <span className="text-amber-400 font-medium">18+ Erforderlich</span>
                </div>
              </div>

              <div className="space-y-4 text-white/80">
                <p className="text-lg">
                  Der Zutritt zum <span className="text-purple-400 font-semibold">Shisha Bar</span> ist ab 18 Jahren gestattet.
                </p>
                
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                    <X className="h-4 w-4 text-red-400" />
                    Reservierungsrichtlinie
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Im Shisha Bar werden <span className="text-red-400 font-medium">keine Reservierungen</span> angenommen.
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed mt-2">
                    Nur in der <span className="text-purple-400 font-medium">Cantina Tex-Mex</span> sind Reservierungen möglich. 
                    Bei der Ankunft muss ein <span className="text-amber-400 font-medium">gültiger Ausweis</span> vorgelegt werden.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <motion.button
                  onClick={handleReject}
                  className="flex-1 py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Unter 18
                </motion.button>
                <motion.button
                  onClick={handleAccept}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium shadow-lg shadow-purple-500/25 transition-all"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ich bin 18+
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}