"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"

// Client-only component for smoke elements
function ClientOnlySmokeElements({ isAboutInView }: { isAboutInView: boolean }) {
  const [isMounted, setIsMounted] = useState(false)
  const [elements, setElements] = useState<Array<{ id: number; props: any }>>([])

  useEffect(() => {
    setIsMounted(true)

    // Generate stable smoke element properties with fixed seeds
    const newElements = [
      {
        id: 1,
        props: {
          width: 300,
          height: 300,
          left: "25%",
          top: "20%",
          xOffset: 15,
          yOffset: -20,
          duration: 18,
          delay: 0,
        },
      },
      {
        id: 2,
        props: {
          width: 400,
          height: 400,
          left: "60%",
          top: "50%",
          xOffset: -20,
          yOffset: 15,
          duration: 22,
          delay: 2,
        },
      },
      {
        id: 3,
        props: {
          width: 350,
          height: 350,
          left: "40%",
          top: "70%",
          xOffset: 10,
          yOffset: -10,
          duration: 20,
          delay: 4,
        },
      },
    ]

    setElements(newElements)
  }, [])

  if (!isMounted) return null

  return (
    <>
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-3xl"
          style={{
            width: element.props.width,
            height: element.props.height,
            left: element.props.left,
            top: element.props.top,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isAboutInView ? [0, 0.2, 0] : 0,
            scale: [1, 1.2, 1],
            x: [0, element.props.xOffset],
            y: [0, element.props.yOffset],
          }}
          transition={{
            duration: element.props.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: element.props.delay,
          }}
        />
      ))}
    </>
  )
}

export default function AboutSection() {
  const ref = useRef(null)
  const isAboutInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-gradient-to-b from-purple-950/20 to-black relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isAboutInView ? 0.1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('/abstract-smoke.png')] bg-repeat "
        />

        {/* Animated smoke elements */}
        <ClientOnlySmokeElements isAboutInView={isAboutInView} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isAboutInView ? 1 : 0, y: isAboutInView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isAboutInView ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="px-4 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium">Seit 2016</div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isAboutInView ? 1 : 0, y: isAboutInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-bold mb-4"
          >
            Unsere Geschichte
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isAboutInView ? 1 : 0, y: isAboutInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white/80 text-lg leading-relaxed"
          >
            Sind wir stolz darauf, unsere Gäste mit exzellentem Service und unvergesslichen Erlebnissen zu verwöhnen.
            Heute freuen wir uns, Ihnen den nächsten wichtigen Schritt in unserer gastronomischen Reise vorzustellen:
            unsere brandneue Location.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: 30 }}
            animate={{ opacity: isAboutInView ? 1 : 0, x: isAboutInView ? 0 : -50, rotateY: isAboutInView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div className="relative h-80 rounded-xl overflow-hidden" whileHover={{ scale: 1.03 }}>
              <Image src="/15639.jpg" alt="Ushuaia Interior" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
           
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAboutInView ? 1 : 0, y: isAboutInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-white/80 leading-relaxed"
            >
              Wir haben uns bemüht, jede einzelne Facette dieses Ortes sorgfältig zu gestalten, um Ihnen ein
              unvergleichliches Erlebnis zu bieten. Treten Sie ein und lassen Sie sich von der modernen Eleganz, dem
              raffinierten Design und der warmen Atmosphäre unserer Restaurant Bar Lounge verzaubern.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -30 }}
            animate={{ opacity: isAboutInView ? 1 : 0, x: isAboutInView ? 0 : 50, rotateY: isAboutInView ? 0 : -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAboutInView ? 1 : 0, y: isAboutInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-white/80 leading-relaxed"
            >
              Bei uns dreht sich alles um Qualität. Unser Küchenteam hat sorgfältig eine Premium- Speisekarte
              zusammengestellt, die eine Vielzahl von kulinarischen Genüssen bietet. Von exquisiten Gourmet-Gerichten
              bis hin zu köstlichen Snacks - bei uns wird jeder Geschmack befriedigt.
            </motion.p>

            <motion.div className="relative h-80 rounded-xl overflow-hidden" whileHover={{ scale: 1.03 }}>
              <Image
                src="/young-woman-vaping-from-hookah-bar.jpg"
                alt="Ushuaia Food"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
           
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isAboutInView ? 1 : 0, y: isAboutInView ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <motion.div
            className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12"
            whileHover={{
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.2)",
              scale: 1.02,
            }}
          >
            <motion.p
              className="text-white/90 text-lg leading-relaxed text-center italic"
              animate={{
                opacity: isAboutInView ? [0.7, 1, 0.7] : 0.7,
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              "Wir freuen uns darauf, Sie in unserer neuen Location begrüßen zu dürfen und Ihnen ein unvergessliches
              kulinarisches Erlebnis zu bieten. Tauchen Sie ein in die Welt der Genüsse und des Luxus, den wir für Sie
              geschaffen haben."
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
