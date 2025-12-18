"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2, FileJson } from "lucide-react"
import { useState } from "react"

interface TestResult {
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
  opportunities?: Array<{
    title: string
    savings: string
    impact: "high" | "medium" | "low"
  }>
  timestamp: string
}

interface ReportDisplayProps {
  result: TestResult
}

export function ReportDisplay({ result }: ReportDisplayProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExportJSON = () => {
    setIsExporting(true)
    try {
      const dataStr = JSON.stringify(result, null, 2)
      const element = document.createElement("a")
      element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(dataStr)}`)
      element.setAttribute("download", `report-${new Date().toISOString().split("T")[0]}.json`)
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportCSV = () => {
    setIsExporting(true)
    try {
      const csv = `URL,Performance,Accessibility,Best Practices,SEO,FCP,LCP,CLS,TBT,Timestamp
${result.url},${result.scores.performance},${result.scores.accessibility},${result.scores.bestPractices},${result.scores.seo},${result.metrics.fcp},${result.metrics.lcp},${result.metrics.cls},${result.metrics.tbt},${result.timestamp}`

      const element = document.createElement("a")
      element.setAttribute("href", `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`)
      element.setAttribute("download", `report-${new Date().toISOString().split("T")[0]}.csv`)
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportHTML = () => {
    setIsExporting(true)
    try {
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PerfScore Lab Report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #f9f9f9; }
    .container { max-width: 900px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { color: #222; margin-bottom: 10px; }
    .meta { color: #666; font-size: 14px; margin-bottom: 30px; }
    .scores { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 30px 0; }
    .score-card { background: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center; }
    .score-card .number { font-size: 36px; font-weight: bold; color: #0066cc; margin: 10px 0; }
    .score-card .label { color: #666; font-size: 14px; }
    .metrics { margin: 30px 0; }
    .metric-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 20px; }
    .metric { background: #f5f5f5; padding: 15px; border-radius: 8px; }
    .metric .value { font-size: 18px; font-weight: bold; color: #0066cc; }
    .metric .label { font-size: 12px; color: #666; margin-top: 5px; }
    .opportunities { margin: 30px 0; }
    .opp-item { padding: 15px; border-left: 4px solid #0066cc; background: #f9f9f9; margin-bottom: 10px; }
    .opp-item strong { color: #222; }
    footer { text-align: center; color: #999; font-size: 12px; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>PerfScore Lab Report</h1>
    <div class="meta">
      <p><strong>URL:</strong> ${result.url}</p>
      <p><strong>Date:</strong> ${new Date(result.timestamp).toLocaleString()}</p>
    </div>

    <h2>Audit Scores</h2>
    <div class="scores">
      <div class="score-card">
        <div class="label">Performance</div>
        <div class="number">${Math.round(result.scores.performance)}</div>
      </div>
      <div class="score-card">
        <div class="label">Accessibility</div>
        <div class="number">${Math.round(result.scores.accessibility)}</div>
      </div>
      <div class="score-card">
        <div class="label">Best Practices</div>
        <div class="number">${Math.round(result.scores.bestPractices)}</div>
      </div>
      <div class="score-card">
        <div class="label">SEO</div>
        <div class="number">${Math.round(result.scores.seo)}</div>
      </div>
    </div>

    <h2>Core Web Vitals</h2>
    <div class="metrics">
      <div class="metric-row">
        <div class="metric">
          <div class="value">${result.metrics.fcp}</div>
          <div class="label">First Contentful Paint</div>
        </div>
        <div class="metric">
          <div class="value">${result.metrics.lcp}</div>
          <div class="label">Largest Contentful Paint</div>
        </div>
        <div class="metric">
          <div class="value">${result.metrics.cls}</div>
          <div class="label">Cumulative Layout Shift</div>
        </div>
        <div class="metric">
          <div class="value">${result.metrics.tbt}</div>
          <div class="label">Total Blocking Time</div>
        </div>
      </div>
    </div>

    ${
      result.opportunities
        ? `<h2>Opportunities</h2>
    <div class="opportunities">
      ${result.opportunities
        .map(
          (opp) => `<div class="opp-item">
        <strong>${opp.title}</strong> - <span>${opp.savings}</span> potential savings
      </div>`,
        )
        .join("")}
    </div>`
        : ""
    }

    <footer>
      <p>Generated by PerfScore Lab - ${new Date().toLocaleDateString()}</p>
    </footer>
  </div>
</body>
</html>`

      const element = document.createElement("a")
      element.setAttribute("href", `data:text/html;charset=utf-8,${encodeURIComponent(html)}`)
      element.setAttribute("download", `report-${new Date().toISOString().split("T")[0]}.html`)
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    } finally {
      setIsExporting(false)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "PerfScore Lab Report",
        text: `Check out my Lighthouse scores for ${result.url}: Performance ${Math.round(result.scores.performance)}, Accessibility ${Math.round(result.scores.accessibility)}, Best Practices ${Math.round(result.scores.bestPractices)}, SEO ${Math.round(result.scores.seo)}`,
        url: window.location.href,
      })
    }
  }

  const getOverallScore = () => {
    const scores = Object.values(result.scores)
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500 border-green-500"
    if (score >= 50) return "text-orange-500 border-orange-500"
    return "text-red-500 border-red-500"
  }

  const ScoreCircle = ({ label, score }: { label: string; score: number }) => (
    <div className="flex flex-col items-center gap-3 animate-scaleIn">
      <div
        className={`relative w-20 h-20 rounded-full border-4 ${getScoreColor(score)} flex items-center justify-center bg-white shadow-lg`}
      >
        <span className="text-2xl font-bold">{Math.round(score)}</span>
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  )

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Report Header */}
      <Card className="p-6 md:p-8 border border-border transition-smooth hover:border-primary/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-mono text-muted-foreground">{result.url}</p>
            <p className="text-xs text-muted-foreground">Report from {new Date(result.timestamp).toLocaleString()}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleExportJSON}
              disabled={isExporting}
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent text-foreground border-border hover:bg-muted transition-smooth"
              title="Export as JSON"
            >
              <FileJson className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">JSON</span>
            </Button>
            <Button
              onClick={handleExportCSV}
              disabled={isExporting}
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent text-foreground border-border hover:bg-muted transition-smooth"
              title="Export as CSV"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">CSV</span>
            </Button>
            <Button
              onClick={handleExportHTML}
              disabled={isExporting}
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent text-foreground border-border hover:bg-muted transition-smooth"
              title="Export as HTML"
            >
              <FileJson className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">HTML</span>
            </Button>
            <Button
              onClick={handleShare}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
              size="sm"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Audit Scores Section - Reference Image Style */}
      <Card className="p-8 border-2 border-purple-100 shadow-xl rounded-3xl bg-gradient-to-br from-white to-purple-50">
        <h3 className="text-2xl  font-bold text-purple-900 mb-8 text-center">Audit Scores</h3>

        {/* Top Row - 4 Circular Scores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <ScoreCircle label="Performance" score={result.scores.performance} />
          <ScoreCircle label="Accessibility" score={result.scores.accessibility} />
          <ScoreCircle label="Best Practices" score={result.scores.bestPractices} />
          <ScoreCircle label="SEO" score={result.scores.seo} />
        </div>

        {/* Large Performance Circle */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col items-center">
            <div
              className={`relative w-40 h-40 rounded-full border-8 ${getScoreColor(result.scores.performance)} flex items-center justify-center bg-gradient-to-br from-white to-gray-50 shadow-2xl`}
            >
              <span className="text-5xl font-bold">{Math.round(result.scores.performance)}</span>
            </div>
            <span className="text-lg font-semibold text-gray-700 mt-4">Performance</span>
            <div className="flex gap-2 mt-3 text-xs">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">0-49</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">50-89</span>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">90-100</span>
            </div>
          </div>

          {/* Screenshot Placeholder */}
          <div className="flex-1 bg-gradient-to-br from-purple-50 to-green-50 rounded-xl p-6 border border-purple-100">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">AI-powered SEO</span>
                <div className="w-16 h-6 bg-green-500 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="mt-4 h-32 bg-gradient-to-br from-green-100 to-purple-100 rounded"></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Core Web Vitals */}
      <Card className="p-8 border-2 border-purple-100 shadow-xl rounded-3xl">
        <h3 className="text-2xl  font-bold text-purple-900 mb-6">Core Web Vitals</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "First Contentful Paint", value: result.metrics.fcp },
            { label: "Largest Contentful Paint", value: result.metrics.lcp },
            { label: "Cumulative Layout Shift", value: result.metrics.cls },
            { label: "Total Blocking Time", value: result.metrics.tbt },
          ].map((metric, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl border border-purple-100"
            >
              <div className="text-3xl font-bold text-purple-700 mb-2">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Export Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          onClick={() => {
            setIsExporting(true)
            const dataStr = JSON.stringify(result, null, 2)
            const element = document.createElement("a")
            element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(dataStr)}`)
            element.setAttribute("download", `report-${new Date().toISOString().split("T")[0]}.json`)
            element.click()
            setIsExporting(false)
          }}
          disabled={isExporting}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
        >
          <FileJson className="h-4 w-4 mr-2" />
          Export JSON
        </Button>
        <Button
          onClick={() => {
            setIsExporting(true)
            const csv = `URL,Performance,Accessibility,Best Practices,SEO,FCP,LCP,CLS,TBT\n${result.url},${result.scores.performance},${result.scores.accessibility},${result.scores.bestPractices},${result.scores.seo},${result.metrics.fcp},${result.metrics.lcp},${result.metrics.cls},${result.metrics.tbt}`
            const element = document.createElement("a")
            element.setAttribute("href", `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`)
            element.setAttribute("download", `report-${new Date().toISOString().split("T")[0]}.csv`)
            element.click()
            setIsExporting(false)
          }}
          disabled={isExporting}
          variant="outline"
          className="border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
        <Button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "SEO Report",
                text: `Performance: ${Math.round(result.scores.performance)}`,
              })
            }
          }}
          variant="outline"
          className="border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  )
}
