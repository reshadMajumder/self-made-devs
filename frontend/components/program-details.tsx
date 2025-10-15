import { Card, CardContent } from "@/components/ui/card"
import { Code2, Users, Rocket, Award } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Learn by Doing",
    description: "No passive learning. Build real projects from day one with hands-on coding challenges.",
  },
  {
    icon: Users,
    title: "Industry Mentors",
    description: "Get guidance from experienced developers and alumni working at top tech companies.",
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description: "Ship your first production-grade project that you can showcase to employers.",
  },
  {
    icon: Award,
    title: "Network & Grow",
    description: "Connect with industry experts, alumni, and fellow developers building their careers.",
  },
]

export function ProgramDetails() {
  return (
    <section className="py-24 px-4 backdrop-blur-sm bg-black/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance text-white">Why Self Made Devs?</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto text-balance">
            We don't just teach. We force you to learn, build, and ship real software.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 border-white/10 bg-white/5 backdrop-blur-md hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
            >
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
