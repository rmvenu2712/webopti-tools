import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { report } = body

    if (!report) {
      return NextResponse.json({ error: "Report data is required" }, { status: 400 })
    }

    // Generate PDF content as base64
    const pdfContent = Buffer.from(JSON.stringify(report, null, 2)).toString("base64")

    return NextResponse.json({
      filename: `report-${new Date().toISOString().split("T")[0]}.pdf`,
      data: pdfContent,
    })
  } catch (error) {
    console.error("[v0] PDF export error:", error)
    return NextResponse.json({ error: "Failed to export PDF" }, { status: 500 })
  }
}
