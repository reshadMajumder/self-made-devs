"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-balance">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
              SelfMade Dev
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white drop-shadow-lg text-balance max-w-2xl mx-auto">
          Build yourself, By yourself
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/register">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105"
              >
                Join the Journey
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 shadow-xl"
            >
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400 drop-shadow-lg">4</div>
              <div className="text-sm text-white/90 drop-shadow">Months</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-400 drop-shadow-lg">1</div>
              <div className="text-sm text-white/90 drop-shadow">Project</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-pink-400 drop-shadow-lg">∞</div>
              <div className="text-sm text-white/90 drop-shadow">Opportunities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
