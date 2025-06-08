"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function LoadingScreen() {
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // Added a delay to the exit animation to ensure the last text is readable
      exit={{ opacity: 0, transition: { delay: 2, duration: 0.8, ease: "easeOut" } }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 0.3 }}
        transition={{ duration: 3, ease: "easeOut", repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900 rounded-full blur-3xl opacity-20"
      />

      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
        animate={{ scale: 1, opacity: 1, rotate: 0, y: [0, -10, 0] }}
        transition={{
          duration: 1.2,
          delay: 0.2,
          type: "spring",
          stiffness: 80,
          damping: 10,
          y: { repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }, // Subtle hover effect
        }}
        className="relative h-48 w-48 z-10"
      >
        <Image
          src="/4llgo2.jpeg"
          alt="Loading background image"
          fill
          className="object-contain drop-shadow-2xl" // Use object-contain to prevent cropping
        />
      </motion.div>

      <motion.p
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
        className="mt-8 text-6xl font-extrabold text-white tracking-widest uppercase drop-shadow-lg"
        style={{
          textShadow: "0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4)",
        }}
      >
        {"Ushuaia".split("").map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20, letterSpacing: "-0.1em" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
        transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
        className="mt-4 text-2xl font-semibold text-gray-200 tracking-wide"
      >
        Premium Cocktail
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20, letterSpacing: "-0.1em" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
        transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
        className="mt-2 text-2xl font-semibold text-gray-200 tracking-wide"
      >
        Hookah & Terrace in Buchs
      </motion.p>

      {/* Animated Progress Bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "80%" }}
        transition={{ duration: 2, delay: 2.2, ease: "easeOut" }}
        className="mt-8 h-2 rounded-full overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #8B5CF6, #EC4899, #8B5CF6)",
          backgroundSize: "200% 100%",
        }}
      >
        <motion.div
          initial={{ backgroundPositionX: "100%" }}
          animate={{ backgroundPositionX: "0%" }}
          transition={{ duration: 3, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
          className="h-full"
          style={{
            background: "inherit", // Inherit the gradient from the parent
            backgroundSize: "inherit",
          }}
        />
      </motion.div>
    </motion.div>
  )
}
