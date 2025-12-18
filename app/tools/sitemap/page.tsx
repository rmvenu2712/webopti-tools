"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Copy, ArrowLeft, Loader2, X, Sparkles } from "lucide-react"
import Link from "next/link"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function SitemapGenerator() {
  const [domain, setDomain] = useState("")
  const [sitemapContent, setSitemapContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")
  const [controller, setController] = useState<AbortController | null>(null)

  // Smooth progress animation
  useEffect(() => {
    if (progress > 0 && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((p) => Math.min(p + 5, 100))
      }, 80)
      return () => clearTimeout(timer)
    }
  }, [progress])

  // Generate Sitemap
  const generateSitemap = async () => {
    if (!domain.trim()) {
      setError("Please enter a valid domain")
      return
    }

    setLoading(true)
    setError("")
    setSitemapContent("")
    setProgress(0)

    const abortController = new AbortController()
    setController(abortController)

    try {
      setProgress(10)

      const res = await fetch(`/api/generate-xml?url=${encodeURIComponent(domain.trim())}`, {
        signal: abortController.signal,
      })

      if (!res.ok) {
        const err = await res.text()
        throw new Error(err || "Failed to generate sitemap")
      }

      const text = await res.text()
      setSitemapContent(text)
      setProgress(100)
    } catch (err: any) {
      if (err.name === "AbortError") {
        setError("Generation cancelled")
      } else {
        setError(err.message || "Failed to generate sitemap")
      }
    } finally {
      setLoading(false)
      setController(null)
      setTimeout(() => setProgress(0), 800)
    }
  }

  const cancelGeneration = () => {
    controller?.abort()
    setController(null)
    setLoading(false)
    setProgress(0)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sitemapContent)
  }

  const downloadSitemap = async () => {
    if (!sitemapContent) return

    setDownloading(true)
    setProgress(0)

    try {
      let p = 0
      const interval = setInterval(() => {
        p += 8
        setProgress(p)
        if (p >= 100) {
          clearInterval(interval)
          const blob = new Blob([sitemapContent], { type: "application/xml" })
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = "sitemap.xml"
          a.click()
          URL.revokeObjectURL(url)
          setDownloading(false)
          setTimeout(() => setProgress(0), 500)
        }
      }, 60)
    } catch (err) {
      console.error(err)
      setDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="mb-6 animate-slideInDown">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-4">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Sitemap Generator</span>
            </div>
            <h1 className="text-4xl md:text-5xl  font-bold text-purple-900 mb-4">XML Sitemap Generator</h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              Generate an XML sitemap to help search engines discover and index all pages on your website.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl flex items-center justify-between animate-slideInUp">
              <span className="font-medium">{error}</span>
              <button onClick={() => setError("")} className="text-red-600 hover:text-red-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* PREVIEW CARD */}
          <Card className="mb-6 p-6 bg-white/80 backdrop-blur-sm border-2 border-purple-100 shadow-xl rounded-3xl">
            <h2 className="text-xl font-semibold text-purple-900 mb-4 ">Preview</h2>
            {sitemapContent ? (
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border-2 border-purple-100">
                  <SyntaxHighlighter
                    language="xml"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: "1.5rem",
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      maxHeight: "400px",
                      overflow: "auto",
                      borderRadius: "1rem",
                    }}
                    showLineNumbers
                  >
                    {sitemapContent}
                  </SyntaxHighlighter>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={copyToClipboard}
                    className="flex-1 rounded-full border-2 border-purple-200 hover:bg-purple-50 bg-transparent"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    onClick={downloadSitemap}
                    disabled={downloading}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg"
                    size="sm"
                  >
                    {downloading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-gray-500 space-y-4">
                <div className="bg-purple-50 border-2 border-dashed border-purple-200 rounded-2xl w-20 h-20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium">Enter a domain and generate to see preview</p>
              </div>
            )}
          </Card>

          {/* CONFIGURATION CARD */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-purple-100 shadow-xl rounded-3xl">
            <h2 className="text-xl font-semibold text-purple-900 mb-6 ">Configuration</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Domain</label>
                <Input
                  placeholder="https://example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  disabled={loading}
                  className="border-2 border-purple-200 rounded-full px-6 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>

              {progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600 font-medium">
                    <span>
                      {loading ? "Crawling & generating..." : downloading ? "Preparing download..." : "Processing..."}
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-purple-100 rounded-full h-3 overflow-hidden relative">
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 h-full rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                    <div
                      className="absolute inset-0 bg-white/30 animate-pulse rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={generateSitemap}
                  disabled={loading || !domain.trim()}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full shadow-lg transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Sitemap"
                  )}
                </Button>

                {loading && (
                  <Button
                    variant="outline"
                    onClick={cancelGeneration}
                    className="flex-1 rounded-full border-2 border-purple-200 bg-transparent"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
