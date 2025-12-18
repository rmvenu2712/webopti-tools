"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log to console in development
        if (process.env.NODE_ENV === "development") {
          console.log(`[Performance] ${entry.name}:`, entry)
        }
      }
    })

    // Observe paint entries (FCP, LCP)
    observer.observe({
      entryTypes: ["paint", "largest-contentful-paint", "layout-shift", "first-input"],
    })

    return () => observer.disconnect()
  }, [])

  return null
}
