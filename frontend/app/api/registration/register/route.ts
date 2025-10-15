import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const upstream = await fetch("https://self-made-devs-api.vercel.app/api/registration/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const text = await upstream.text()
    try {
      const json = JSON.parse(text)
      return NextResponse.json(json, { status: upstream.status })
    } catch {
      return new NextResponse(text, {
        status: upstream.status,
        headers: { "Content-Type": upstream.headers.get("Content-Type") || "text/plain" },
      })
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


