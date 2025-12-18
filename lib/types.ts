export interface performanceReportType {
  url: string
  timestamp: string
  scores: {
    performance: number
    accessibility: number
    bestPractices: number
    seo: number
  }
  webVitals: Array<{
    name: string
    value: string
    description: string
    status: "good" | "needs-improvement" | "poor"
  }>
  opportunities: Array<{
    title: string
    description: string
    savings: string
  }>
}
