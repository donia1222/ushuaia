"use client"
import { MapPin, Mail, Phone, Download } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import handleDownloadVCard from "@/app/utils/downloadVCard"

export default function ContactSection() {
  const { ref: contactRef, inView: isContactInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [openDialog, setOpenDialog] = useState<string | null>(null)

  // Content for the dialogs
  const dialogContent = {
    privacy: {
      title: "Datenschutzrichtlinie",
      description: (
        <>
          <p className="mb-2">
            Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Datenschutzrichtlinie erläutert, wie wir
            Informationen sammeln, verwenden und schützen, die Sie uns über unsere Webseite oder bei der Nutzung unserer
            Dienste zur Verfügung stellen.
          </p>
          <p className="mb-2">
            Wir sammeln Daten, die Sie uns direkt zur Verfügung stellen, wie z.B. Name, E-Mail-Adresse und
            Telefonnummer, wenn Sie uns über das Kontaktformular kontaktieren oder eine Reservierung vornehmen. Diese
            Daten werden ausschließlich zur Bearbeitung Ihrer Anfragen und zur Erbringung unserer Dienstleistungen
            verwendet.
          </p>
          <p className="mb-2">
            Wir verwenden Cookies, um die Benutzerfreundlichkeit unserer Webseite zu verbessern und statistische Daten
            über die Nutzung zu sammeln. Sie können die Verwendung von Cookies in Ihren Browsereinstellungen jederzeit
            deaktivieren.
          </p>
          <p className="mb-2">
            Ihre Daten werden nicht an Dritte weitergegeben, es sei denn, dies ist zur Erfüllung unserer vertraglichen
            Pflichten erforderlich oder gesetzlich vorgeschrieben. Wir treffen angemessene technische und
            organisatorische Maßnahmen, um Ihre Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen.
          </p>
          <p>
            Sie haben das Recht, Auskunft über die von uns gespeicherten Daten zu erhalten, diese zu korrigieren oder
            löschen zu lassen. Bitte kontaktieren Sie uns dazu über die unten angegebenen Kontaktdaten.
          </p>
        </>
      ),
    },
    agb: {
      title: "Allgemeine Geschäftsbedingungen (AGB)",
      description: (
        <>
          <p className="mb-2">
            Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Nutzung der Dienste und Angebote von Ushuaia Bar.
            Mit der Nutzung unserer Webseite oder der Inanspruchnahme unserer Dienstleistungen erklären Sie sich mit
            diesen AGB einverstanden.
          </p>
          <p className="mb-2">
            <strong>1. Reservierungen:</strong> Reservierungen können online oder telefonisch vorgenommen werden. Eine
            Reservierung ist erst verbindlich, wenn sie von uns bestätigt wurde. Bei Nichterscheinen ohne vorherige
            Stornierung behalten wir uns das Recht vor, eine Gebühr zu erheben.
          </p>
          <p className="mb-2">
            <strong>2. Preise und Zahlung:</strong> Alle Preise sind in Schweizer Franken (CHF) angegeben und verstehen
            sich inklusive der gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt vor Ort in bar oder mit gängigen
            Kredit-/Debitkarten.
          </p>
          <p className="mb-2">
            <strong>3. Haftung:</strong> Wir übernehmen keine Haftung für Schäden oder Verluste, die durch die Nutzung
            unserer Dienste oder den Aufenthalt in unseren Räumlichkeiten entstehen, es sei denn, diese sind auf grobe
            Fahrlässigkeit oder Vorsatz unsererseits zurückzuführen.
          </p>
          <p className="mb-2">
            <strong>4. Jugendschutz:</strong> Wir halten uns strikt an die gesetzlichen Bestimmungen zum Jugendschutz.
            Der Verkauf von Alkohol an Minderjährige ist untersagt. Alterskontrollen können durchgeführt werden.
          </p>
          <p className="mb-2">
            <strong>5. Änderungen:</strong> Wir behalten uns das Recht vor, diese AGB jederzeit zu ändern. Die jeweils
            aktuelle Version ist auf unserer Webseite verfügbar.
          </p>
          <p>Für weitere Fragen stehen wir Ihnen gerne zur Verfügung.</p>
        </>
      ),
    },
    impressum: {
      title: "Impressum",
      description: (
        <>
          <p className="mb-1">
            <strong>Flomic GmbH</strong>
          </p>
          <p className="mb-1">Bahnhofstrasse 40</p>
          <p className="mb-1">9470 Buchs</p>
          <p className="mb-1">
            Email:{" "}
            <a href="mailto:info@ushuaia-bar.ch" className="text-purple-400 hover:text-purple-300 transition-colors">
              info@ushuaia-bar.ch
            </a>
          </p>
          <p className="mb-1">
            Telefon:{" "}
            <a href="tel:+41817560101" className="text-purple-400 hover:text-purple-300 transition-colors">
              +41 81 756 01 01
            </a>
          </p>
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
        </>
      ),
    },
  }

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
      ref={contactRef}
      className="py-20 bg-gradient-to-b from-black to-purple-950/30 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isContactInView ? 0.1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[url('/abstract-smoke.png')] bg-repeat"
      />
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

        {/* Improved vCard download button */}
        <div className="max-w-md mx-auto mb-12">
          <motion.button
            id="downloadVCard"
            className="group relative w-full overflow-hidden rounded-xl backdrop-blur-sm bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:border-purple-400/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1"
            onClick={handleDownloadVCard}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative flex items-center justify-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                <Download className="w-6 h-6 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold text-white group-hover:text-purple-100 transition-colors duration-300">
                  Visitenkarte herunterladen
                </div>
                <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                  Kontaktdaten als vCard speichern
                </div>
              </div>
            </div>

            {/* Subtle shine effect */}
            <div className="absolute inset-0 -top-2 -left-2 w-4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </motion.button>
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
          {/* New links for policies and impressum */}
          <div className="max-w-2xl mx-auto border-t border-white/10 pt-6 mt-6 flex flex-wrap justify-center gap-4">
            <Dialog open={openDialog === "privacy"} onOpenChange={(isOpen) => setOpenDialog(isOpen ? "privacy" : null)}>
              <DialogTrigger asChild>
                <Button variant="link" className="text-white/60 hover:text-white transition-colors">
                  Datenschutzrichtlinie
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] sm:max-w-[500px] max-h-[80vh] bg-gray-900 text-white border-white/10 overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{dialogContent.privacy.title}</DialogTitle>
                  <DialogDescription className="text-white/80 max-h-[50vh] overflow-y-auto pr-2">
                    {dialogContent.privacy.description}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Dialog open={openDialog === "agb"} onOpenChange={(isOpen) => setOpenDialog(isOpen ? "agb" : null)}>
              <DialogTrigger asChild>
                <Button variant="link" className="text-white/60 hover:text-white transition-colors">
                  AGB
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] sm:max-w-[500px] max-h-[80vh] bg-gray-900 text-white border-white/10 overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{dialogContent.agb.title}</DialogTitle>
                  <DialogDescription className="text-white/80 max-h-[50vh] overflow-y-auto pr-2">
                    {dialogContent.agb.description}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Dialog
              open={openDialog === "impressum"}
              onOpenChange={(isOpen) => setOpenDialog(isOpen ? "impressum" : null)}
            >
              <DialogTrigger asChild>
                <Button variant="link" className="text-white/60 hover:text-white transition-colors">
                  Impressum
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] sm:max-w-[500px] max-h-[80vh] bg-gray-900 text-white border-white/10 overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{dialogContent.impressum.title}</DialogTitle>
                  <DialogDescription className="text-white/80 max-h-[50vh] overflow-y-auto pr-2">
                    {dialogContent.impressum.description}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  )
}
