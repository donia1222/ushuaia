"use client"
import { useEffect, useState } from "react"

export default function NeonTextShowcase() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("neon-text-section")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="neon-text-section"
      className=" bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden flex items-center justify-center mb-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Chain-link fence pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(156,163,175,0.1)_40%,rgba(156,163,175,0.1)_60%,transparent_60%),linear-gradient(-45deg,transparent_40%,rgba(156,163,175,0.1)_40%,rgba(156,163,175,0.1)_60%,transparent_60%)] bg-[size:20px_20px]" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Neon Text Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Background frame similar to chain-link fence */}
          <div className="absolute inset-0 border-2 border-gray-600/20 rounded-lg" />
          <div className="absolute inset-2 border border-gray-500/10 rounded-lg" />

          <div className="relative p-8 md:p-16 text-center space-y-6 md:space-y-8">
            {/* First Line - Yellow Neon */}
            <div
              className={`transition-all duration-2000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="neon-text-purple text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wider leading-tight">
                IF SOMEONE DREAMS ALONE
              </h1>
            </div>

            {/* Second Line - Yellow Neon */}
            <div
              className={`transition-all duration-2000 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="neon-text-purple text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wider leading-tight">
                IT'S JUST A DREAM...
              </h2>
            </div>

            {/* Third Line - Green Neon */}
            <div
              className={`transition-all duration-2000 delay-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="neon-text-pink text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wider leading-tight">
                WHEN WE DREAM TOGETHER
              </h3>
            </div>

            {/* Fourth Line - Green Neon */}
            <div
              className={`transition-all duration-2000 delay-1500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h4 className="neon-text-pink text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wider leading-tight">
                IT IS THE BEGINNING OF A NEW REALITY
              </h4>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .neon-text-purple {
          color: #a855f7;
          font-family: 'Arial', sans-serif;
          text-shadow: 
            0 0 5px #a855f7,
            0 0 10px #a855f7,
            0 0 15px #a855f7,
            0 0 20px #7c3aed,
            0 0 35px #7c3aed,
            0 0 40px #7c3aed,
            0 0 50px #7c3aed,
            0 0 75px #7c3aed;
          animation: neon-flicker-purple 3s infinite alternate;
        }

        .neon-text-pink {
          color: #ec4899;
          font-family: 'Arial', sans-serif;
          text-shadow: 
            0 0 5px #ec4899,
            0 0 10px #ec4899,
            0 0 15px #ec4899,
            0 0 20px #db2777,
            0 0 35px #db2777,
            0 0 40px #db2777,
            0 0 50px #db2777,
            0 0 75px #db2777;
          animation: neon-flicker-pink 3.5s infinite alternate;
        }

        @keyframes neon-flicker-purple {
          0%, 18%, 22%, 25%, 53%, 57%, 100% {
            text-shadow: 
              0 0 5px #a855f7,
              0 0 10px #a855f7,
              0 0 15px #a855f7,
              0 0 20px #7c3aed,
              0 0 35px #7c3aed,
              0 0 40px #7c3aed,
              0 0 50px #7c3aed,
              0 0 75px #7c3aed;
          }
          20%, 24%, 55% {
            text-shadow: 
              0 0 2px #a855f7,
              0 0 5px #a855f7,
              0 0 8px #a855f7,
              0 0 12px #7c3aed,
              0 0 18px #7c3aed,
              0 0 25px #7c3aed;
          }
        }

        @keyframes neon-flicker-pink {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            text-shadow: 
              0 0 5px #ec4899,
              0 0 10px #ec4899,
              0 0 15px #ec4899,
              0 0 20px #db2777,
              0 0 35px #db2777,
              0 0 40px #db2777,
              0 0 50px #db2777,
              0 0 75px #db2777;
          }
          20%, 24%, 55% {
            text-shadow: 
              0 0 2px #ec4899,
              0 0 5px #ec4899,
              0 0 8px #ec4899,
              0 0 12px #db2777,
              0 0 18px #db2777,
              0 0 25px #db2777;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .neon-text-purple,
          .neon-text-pink {
            text-shadow: 
              0 0 3px currentColor,
              0 0 6px currentColor,
              0 0 9px currentColor,
              0 0 12px currentColor,
              0 0 20px currentColor,
              0 0 25px currentColor;
          }
        }

        @media (max-width: 768px) {
          .neon-text-purple,
          .neon-text-pink {
            line-height: 1.2;
            text-shadow: 
              0 0 2px currentColor,
              0 0 4px currentColor,
              0 0 6px currentColor,
              0 0 8px currentColor,
              0 0 12px currentColor,
              0 0 16px currentColor;
          }
        }

        @media (max-width: 640px) {
          .neon-text-purple,
          .neon-text-pink {
            line-height: 1.3;
            letter-spacing: 0.05em;
          }
        }
      `}</style>
    </section>
  )
}
