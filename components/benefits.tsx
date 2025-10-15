"use client"

import { Briefcase, GraduationCap, Network, Trophy } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const benefits = [
  {
    icon: Briefcase,
    title: "Career Ready Portfolio",
    description: "Build a production-ready project that impresses recruiters and hiring managers.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: GraduationCap,
    title: "Learn from Experts",
    description: "Get mentored by developers working at top companies like Google, Microsoft, and startups.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Network,
    title: "Industry Connections",
    description: "Network with alumni and industry professionals who can open doors to opportunities.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Trophy,
    title: "Real-World Experience",
    description: "Work on actual projects with real deadlines, code reviews, and production deployments.",
    color: "from-green-500 to-emerald-500",
  },
]

export function Benefits() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            benefits.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index])
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Why Self Made Devs?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            More than just code. Build skills, connections, and confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-8 transition-all duration-500 hover:scale-105 hover:border-white/30 ${
                visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Animated gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}
                >
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                  <p className="text-white/70">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
