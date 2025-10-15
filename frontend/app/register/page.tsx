"use client"

import React from "react"
import { RegistrationForm } from "../../components/registration-form"

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full text-sm font-semibold mb-4">
            Applications Open
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-balance text-white">Join Self Made Devs</h1>
          <p className="text-xl text-slate-300 text-balance max-w-2xl mx-auto">
            Transform your skills and build production-ready projects with industry mentorship
          </p>
        </div>

        <RegistrationForm />
      </div>
    </main>
  )
}
