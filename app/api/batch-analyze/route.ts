import { type NextRequest, NextResponse } from "next/server"
  export const runtime = 'edge';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { urls } = body

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "URLs array is required" }, { status: 400 })
    }

    if (urls.length > 10) {
      return NextResponse.json({ error: "Maximum 10 URLs per batch" }, { status: 400 })
    }

    // Call individual analyze endpoint for each URL
    const results = await Promise.all(
      urls.map(async (url: string) => {
        try {
          const response = await fetch(`${request.nextUrl.origin}/api/analyze`, {
            method: "POST",
            body: JSON.stringify({ url }),
          })
          return response.json()
        } catch (error) {
          return { error: `Failed to analyze ${url}` }
        }
      }),
    )

    return NextResponse.json({ results })
  } catch (error) {
    console.error("[v0] Batch API error:", error)
    return NextResponse.json({ error: "Failed to process batch" }, { status: 500 })
  }
}
