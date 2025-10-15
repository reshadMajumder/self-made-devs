import { RegistrationForm } from "@/components/registration-form"

export default function RegisterPage() {
  return (
    <main className="light min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Applications Open
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-balance text-slate-900">Join Self Made Devs</h1>
          <p className="text-xl text-slate-600 text-balance max-w-2xl mx-auto">
            Transform your skills and build production-ready projects with industry mentorship
          </p>
        </div>

        <RegistrationForm />
      </div>
    </main>
  )
}
