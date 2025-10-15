import { NextResponse } from "next/server"
import * as XLSX from "xlsx"

export async function POST(request: Request) {
  try {
    const { registrations } = await request.json()

    if (!registrations || !Array.isArray(registrations)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }

    // Transform data for Excel
    const excelData = registrations.map((reg) => ({
      "Full Name": reg.full_name,
      Email: reg.email,
      "Student ID": reg.student_id,
      Phone: reg.phone || "",
      "Current Semester": reg.current_semester || "",
      "Current Year": reg.current_year || "",
      Interests: Array.isArray(reg.interests) ? reg.interests.join(", ") : "",
      Skills: Array.isArray(reg.skills) ? reg.skills.join(", ") : "",
      "GitHub URL": reg.github_url || "",
      "LinkedIn URL": reg.linkedin_url || "",
      "Why Join": reg.why_join || "",
      "Project Idea": reg.project_idea || "",
      "Registration Date": new Date(reg.created_at).toLocaleString(),
    }))

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    // Set column widths
    const columnWidths = [
      { wch: 20 }, // Full Name
      { wch: 30 }, // Email
      { wch: 15 }, // Student ID
      { wch: 15 }, // Phone
      { wch: 15 }, // Current Semester
      { wch: 15 }, // Current Year
      { wch: 40 }, // Interests
      { wch: 40 }, // Skills
      { wch: 30 }, // GitHub URL
      { wch: 30 }, // LinkedIn URL
      { wch: 50 }, // Why Join
      { wch: 50 }, // Project Idea
      { wch: 20 }, // Registration Date
    ]
    worksheet["!cols"] = columnWidths

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations")

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    // Return as downloadable file
    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=registrations_${new Date().toISOString().split("T")[0]}.xlsx`,
      },
    })
  } catch (error) {
    console.error("[v0] Export error:", error)
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 })
  }
}
