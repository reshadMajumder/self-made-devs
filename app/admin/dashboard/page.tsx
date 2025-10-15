import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { RegistrationsTable } from "@/components/registrations-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, Calendar } from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch all registrations
  const { data: registrations, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching registrations:", error)
  }

  // Calculate stats
  const totalRegistrations = registrations?.length || 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayRegistrations = registrations?.filter((reg) => new Date(reg.created_at) >= today).length || 0

  const thisWeek = new Date()
  thisWeek.setDate(thisWeek.getDate() - 7)
  const weekRegistrations = registrations?.filter((reg) => new Date(reg.created_at) >= thisWeek).length || 0

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Manage Self Made Devs registrations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Registrations</CardTitle>
              <Users className="w-4 h-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{totalRegistrations}</div>
              <p className="text-xs text-slate-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">This Week</CardTitle>
              <TrendingUp className="w-4 h-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{weekRegistrations}</div>
              <p className="text-xs text-slate-500 mt-1">Last 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Today</CardTitle>
              <Calendar className="w-4 h-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{todayRegistrations}</div>
              <p className="text-xs text-slate-500 mt-1">New applications</p>
            </CardContent>
          </Card>
        </div>

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Registrations</CardTitle>
            <CardDescription>View and manage student applications</CardDescription>
          </CardHeader>
          <CardContent>
            <RegistrationsTable registrations={registrations || []} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
