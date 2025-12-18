"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Zap, Loader2 } from "lucide-react"

interface TestFormProps {
  onSubmit: (url: string) => Promise<void>
  isLoading: boolean
}

export function TestForm({ onSubmit, isLoading }: TestFormProps) {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")

  const validateUrl = (urlString: string): boolean => {
    try {
      new URL(urlString)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!url.trim()) {
      setError("Please enter a URL")
      return
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL (e.g., https://example.com)")
      return
    }

    await onSubmit(url)
  }

  return (
    <Card className="p-6 md:p-8 border-2 border-purple-100 bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
              className="w-full border-2 border-purple-200 focus:border-purple-400 rounded-full px-6 h-12 text-base"
              aria-label="Website URL to test"
            />
            {error && <p className="text-sm text-red-600 mt-2 px-2">{error}</p>}
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white whitespace-nowrap group rounded-full px-8 h-12 shadow-lg"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                Testing...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" aria-hidden="true" />
                Run Test
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-gray-600 text-center">
          Tests include Performance, Accessibility, Best Practices, and SEO audits
        </p>
      </form>
    </Card>
  )
}
