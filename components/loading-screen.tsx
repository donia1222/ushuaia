"use client"

import { motion } from "framer-motion"
import Image from "next/image" // Make sure Image is imported

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
        className="relative h-48 w-48" // Adjusted size for the image
      >
        <Image
          src="/colibri.png" // Path to your new image
          alt="Loading background image"
          fill // Fills the parent container
          className="object-cover rounded-lg shadow-lg" // Styles for the image
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-8 text-xl font-semibold text-white tracking-wide uppercase"
      >
        Ushuaia
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "80%" }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="mt-4 h-1.5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"
      />
    </motion.div>
  )
}
