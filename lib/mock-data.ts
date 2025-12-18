import type { performanceReportType } from "./types"

export function generateMockReport(url: string): performanceReportType {
  const baseScore = Math.floor(Math.random() * 40) + 60 // 60-100

  return {
    url,
    timestamp: new Date().toISOString(),
    scores: {
      performance: baseScore + Math.floor(Math.random() * 20) - 10,
      accessibility: baseScore + Math.floor(Math.random() * 20) - 10,
      bestPractices: baseScore + Math.floor(Math.random() * 20) - 10,
      seo: baseScore + Math.floor(Math.random() * 20) - 10,
    },
    webVitals: [
      {
        name: "Largest Contentful Paint",
        value: `${Math.floor(Math.random() * 2000) + 500}ms`,
        description: "Measures loading performance",
        status: Math.random() > 0.3 ? "good" : "needs-improvement",
      },
      {
        name: "Cumulative Layout Shift",
        value: `${(Math.random() * 0.3).toFixed(3)}`,
        description: "Measures visual stability",
        status: Math.random() > 0.3 ? "good" : "needs-improvement",
      },
      {
        name: "First Input Delay",
        value: `${Math.floor(Math.random() * 100) + 20}ms`,
        description: "Measures interactivity",
        status: Math.random() > 0.3 ? "good" : "needs-improvement",
      },
      {
        name: "First Contentful Paint",
        value: `${Math.floor(Math.random() * 1500) + 300}ms`,
        description: "Measures when content appears",
        status: Math.random() > 0.3 ? "good" : "needs-improvement",
      },
    ],
    opportunities: [
      {
        title: "Eliminate render-blocking resources",
        description:
          "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles.",
        savings: "~1.2 s",
      },
      {
        title: "Minify JavaScript",
        description: "Minifying JavaScript files can reduce payload sizes and script parse time.",
        savings: "~45 KB",
      },
      {
        title: "Minify CSS",
        description: "Minifying CSS files can reduce network payload sizes.",
        savings: "~12 KB",
      },
      {
        title: "Defer offscreen images",
        description: "Consider lazy-loading offscreen images with a library like lazysizes to improve page speed.",
        savings: "~234 KB",
      },
      {
        title: "Remove unused CSS",
        description: "Unused CSS slows down your page load. Remove unused rules.",
        savings: "~78 KB",
      },
    ],
  }
}
