import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PerformanceMonitor } from "@/components/performance-monitor"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "SEO Tools - Professional SEO Analysis & Optimization Platform",
  description:
    "Comprehensive 2` g76 for professionals. Analyze performance, generate sitemaps, optimize meta tags, and boost your website rankings.",
  generator: "v0.app",
  keywords: "SEO tools, website analysis, performance testing, sitemap generator, meta tags, lighthouse audit",
  openGraph: {
    title: "SEO Tools - Professional Platform",
    description: "All-in-One SEO Analysis & Optimization Tools",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jersey+20+Charted&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="">{children}</div>
        <Analytics />
        <PerformanceMonitor />
      </body>
    </html>
  )
}
