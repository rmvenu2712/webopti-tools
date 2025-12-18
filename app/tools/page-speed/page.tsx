"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TestForm } from "@/components/test-form"
import { ReportDisplay } from "@/components/report-display"
import { useState } from "react"
import { Sparkles, Zap } from "lucide-react"

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

export default function PageSpeedTestPage() {
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (url: string) => {
    setIsLoading(true)
    setError(null)
    setTestResult(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to analyze URL")
      }

      const result = await response.json()
      setTestResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during testing")
      console.error("[v0] Test error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center animate-slideInDown">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <Zap className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Performance Analysis</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl  font-bold text-purple-900 mb-4">
              Page Speed Test
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Enter a website URL to run a comprehensive Lighthouse audit and get real-time performance insights.
            </p>
          </div>

          <TestForm onSubmit={handleSubmit} isLoading={isLoading} />

          {error && (
            <div className="mt-8 p-6 rounded-3xl bg-red-50 border-2 border-red-200 text-red-700 animate-slideInUp">
              <p className="font-medium">Error: {error}</p>
            </div>
          )}

          {testResult && (
            <div className="mt-12">
              <ReportDisplay result={testResult} />
            </div>
          )}

          {!testResult && !isLoading && !error && (
            <div className="mt-12 text-center py-24 px-6 rounded-3xl border-2 border-dashed border-purple-200 bg-gradient-to-br from-purple-50 to-white">
              <Sparkles className="h-16 w-16 text-purple-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium mb-2">Ready to analyze</p>
              <p className="text-gray-500 text-sm">Enter a website URL above to see detailed performance metrics</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
