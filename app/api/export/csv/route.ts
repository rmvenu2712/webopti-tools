import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reports } = body

    if (!Array.isArray(reports)) {
      return NextResponse.json({ error: "Reports array is required" }, { status: 400 })
    }

    // Convert reports to CSV format
    const headers = ["URL", "Performance", "Accessibility", "Best Practices", "SEO", "Timestamp"]
    const rows = reports.map((r: any) => [
      r.url,
      r.scores.performance,
      r.scores.accessibility,
      r.scores.bestPractices,
      r.scores.seo,
      r.timestamp,
    ])

    const csv = [headers.join(","), ...rows.map((r: string[]) => r.join(","))].join("\n")

    return NextResponse.json({
      filename: `reports-${new Date().toISOString().split("T")[0]}.csv`,
      data: Buffer.from(csv).toString("base64"),
    })
  } catch (error) {
    console.error("[v0] CSV export error:", error)
    return NextResponse.json({ error: "Failed to export CSV" }, { status: 500 })
  }
}
