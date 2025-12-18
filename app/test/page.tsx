"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TestForm } from "@/components/test-form"
import { ReportDisplay } from "@/components/report-display"
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

export default function TestPage() {
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
    <div className="min-h-screen bg-background flex flex-col transition-smooth">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 animate-slideInDown">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Performance Test</h1>
            <p className="text-muted-foreground text-lg">
              Enter a website URL to run a comprehensive Lighthouse audit and get real-time performance insights.
            </p>
          </div>

          <TestForm onSubmit={handleSubmit} isLoading={isLoading} />

          {error && (
            <div className="mt-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 animate-slideInUp transition-smooth">
              <p className="font-medium">Error: {error}</p>
            </div>
          )}

          {testResult && (
            <div className="mt-12">
              <ReportDisplay result={testResult} />
            </div>
          )}

          {!testResult && !isLoading && !error && (
            <div className="mt-12 text-center py-16 px-6 rounded-lg border-2 border-dashed border-white/10 dark:border-white/5 transition-smooth">
              <p className="text-muted-foreground text-lg">
                Enter a website URL above to see detailed performance metrics
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
