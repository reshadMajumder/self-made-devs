import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, Github, Linkedin, Calendar, User } from "lucide-react"
import Link from "next/link"

export default async function RegistrationDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch registration details
  const { data: registration, error } = await supabase.from("registrations").select("*").eq("id", params.id).single()

  if (error || !registration) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{registration.full_name}</CardTitle>
                <CardDescription>Student ID: {registration.student_id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600">Email</p>
                      <p className="font-medium">{registration.email}</p>
                    </div>
                  </div>

                  {registration.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-600">Phone</p>
                        <p className="font-medium">{registration.phone}</p>
                      </div>
                    </div>
                  )}

                  {registration.current_semester && (
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-600">Current Semester</p>
                        <p className="font-medium">Semester {registration.current_semester}</p>
                      </div>
                    </div>
                  )}

                  {registration.current_year && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-600">Current Year</p>
                        <p className="font-medium">{registration.current_year}</p>
                      </div>
                    </div>
                  )}
                </div>

                {(registration.github_url || registration.linkedin_url) && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-slate-600 mb-3">Social Profiles</p>
                    <div className="flex gap-3">
                      {registration.github_url && (
                        <a
                          href={registration.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-sm font-medium">GitHub</span>
                        </a>
                      )}
                      {registration.linkedin_url && (
                        <a
                          href={registration.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          <span className="text-sm font-medium">LinkedIn</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Motivation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 whitespace-pre-wrap">{registration.why_join}</p>
              </CardContent>
            </Card>

            {registration.project_idea && (
              <Card>
                <CardHeader>
                  <CardTitle>Project Ideas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 whitespace-pre-wrap">{registration.project_idea}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {registration.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {registration.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Registration Date</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">
                  {new Date(registration.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
