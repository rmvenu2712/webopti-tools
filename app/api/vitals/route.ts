import { type NextRequest, NextResponse } from "next/server"
  export const runtime = 'edge';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("Web Vital received:", {
      name: body.name,
      value: body.value,
      url: request.headers.get("referer"),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing vital:", error)
    return NextResponse.json({ error: "Failed to process vital" }, { status: 400 })
  }
}
