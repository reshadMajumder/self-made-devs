import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const { fullName, email, studentId, interests, skills, whyJoin } = body

    if (!fullName || !email || !studentId || !interests || !skills || !whyJoin) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!Array.isArray(interests) || interests.length === 0) {
      return NextResponse.json({ error: "At least one interest is required" }, { status: 400 })
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json({ error: "At least one skill is required" }, { status: 400 })
    }

    // Create Supabase client
    const supabase = await createClient()

    // Insert registration into database
    const { data, error } = await supabase.from("registrations").insert({
      full_name: fullName,
      email: email,
      student_id: studentId,
      phone: body.phone || null,
      current_semester: body.currentSemester || null,
      current_year: body.currentYear || null,
      interests: interests,
      skills: skills,
      github_url: body.githubUrl || null,
      linkedin_url: body.linkedinUrl || null,
      why_join: whyJoin,
      project_idea: body.projectIdea || null,
    })

    if (error) {
      console.error("[v0] Database error:", error)

      // Handle unique constraint violations
      if (error.code === "23505") {
        if (error.message.includes("email")) {
          return NextResponse.json({ error: "This email is already registered" }, { status: 409 })
        }
        if (error.message.includes("student_id")) {
          return NextResponse.json({ error: "This student ID is already registered" }, { status: 409 })
        }
      }

      return NextResponse.json({ error: "Failed to submit registration. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
