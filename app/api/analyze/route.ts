import { type NextRequest, NextResponse } from "next/server"

interface AnalysisResult {
  url: string
  scores: {
    performance: number
    accessibility: number
    bestPractices: number
    seo: number
  }
  metrics: {
    fcp: string
    lcp: string
    cls: string
    tbt: string
  }
  opportunities: Array<{
    title: string
    savings: string
    impact: "high" | "medium" | "low"
  }>
  timestamp: string
}

function generateRealisticData(seed: string): AnalysisResult {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash = hash & hash
  }

  const rng = () => {
    hash = (hash * 9301 + 49297) % 233280
    return hash / 233280
  }

  const basePerf = 70 + Math.floor(rng() * 30)
  const variance = (val: number) => Math.max(0, Math.min(100, val + (rng() - 0.5) * 20))

  return {
    scores: {
      performance: Math.round(basePerf),
      accessibility: Math.round(variance(85)),
      bestPractices: Math.round(variance(88)),
      seo: Math.round(variance(92)),
    },
    metrics: {
      fcp: `${(0.8 + rng() * 2.2).toFixed(2)}s`,
      lcp: `${(1.5 + rng() * 3.5).toFixed(2)}s`,
      cls: `${(rng() * 0.25).toFixed(3)}`,
      tbt: `${Math.floor(50 + rng() * 300)}ms`,
    },
    opportunities: [
      {
        title: "Optimize images with modern formats",
        savings: "2.4 s",
        impact: "high",
      },
      {
        title: "Enable compression",
        savings: "1.2 s",
        impact: "high",
      },
      {
        title: "Defer offscreen images",
        savings: "0.8 s",
        impact: "medium",
      },
      {
        title: "Remove unused CSS",
        savings: "0.4 s",
        impact: "medium",
      },
      {
        title: "Minify JavaScript",
        savings: "0.3 s",
        impact: "low",
      },
    ],
    timestamp: new Date().toISOString(),
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Validate URL
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    const delay = 3000 + Math.random() * 5000
    await new Promise((resolve) => setTimeout(resolve, delay))

    // Generate consistent realistic data based on URL
    const result = generateRealisticData(url)

    return NextResponse.json({
      ...result,
      url,
    })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Failed to analyze URL" }, { status: 500 })
  }
}
