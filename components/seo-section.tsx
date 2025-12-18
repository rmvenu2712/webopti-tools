"use client"

import { Card } from "@/components/ui/card"
import Link from "next/link"
import { FileJson, FileText, Zap, BookOpen, Code2, ArrowRight } from "lucide-react"

const seoTools = [
  {
    icon: FileText,
    title: "Robots.txt",
    description: "Create SEO-friendly robots.txt files to control search engine crawling.",
    href: "/tools/robots",
    color: "purple",
  },
  {
    icon: FileJson,
    title: "Sitemap",
    description: "Generate XML sitemaps to help search engines discover your pages.",
    href: "/tools/sitemap",
    color: "green",
  },
  {
    icon: Zap,
    title: "Meta Tags",
    description: "Create and optimize meta tags for better search visibility.",
    href: "/tools/meta",
    color: "purple",
  },
  {
    icon: BookOpen,
    title: "LLM Models",
    description: "Explore AI language models and their performance characteristics.",
    href: "/tools/llms",
    color: "green",
  },
  {
    icon: Code2,
    title: "Markdown",
    description: "Generate professional markdown documentation and README files.",
    href: "/tools/markdown",
    color: "purple",
  },
]

export function SEOSection() {
  return (
    <section id="seo" className="w-full py-20 md:py-28 bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-16 animate-slideInDown">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200">
            <span className="text-sm font-medium text-purple-700">SEO & Web Tools</span>
          </div>
  <h2 className="text-4xl md:text-5xl  font-bold text-purple-900">
    SEO Optimization Tools
  </h2>
          <p className="text-gray-600 max-w-2xl text-balance text-lg leading-relaxed">
            Complete toolkit for SEO optimization, file generation, and web standards compliance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {seoTools.map((tool, index) => {
            const Icon = tool.icon
            const colorClasses =
              tool.color === "purple" ? "from-purple-600 to-purple-700" : "from-green-500 to-green-600"
            return (
              <Link
                key={tool.title}
                href={tool.href}
                className="group h-full"
                style={{
                  animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <Card className="p-6 h-full hover:shadow-2xl transition-all duration-300 border-2 border-purple-100 hover:border-purple-300 bg-white backdrop-blur-sm flex flex-col gap-4 cursor-pointer rounded-3xl hover:-translate-y-2">
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorClasses} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-purple-900 group-hover:text-purple-700 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{tool.description}</p>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>

        <Card className="p-8 bg-white border-2 border-purple-100 backdrop-blur-sm animate-slideInUp rounded-3xl shadow-xl">
          <h3 className="text-xl font-semibold text-purple-900 mb-4">Understanding SEO Optimization</h3>
          <div className="space-y-4 text-gray-600">
            <p className="leading-relaxed">
              Search Engine Optimization (SEO) is the practice of improving your website's visibility in search engine
              results. Our comprehensive toolkit helps you implement SEO best practices.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-900">Robots.txt Management</h4>
                <p className="text-sm leading-relaxed">
                  Control which pages search engines can crawl and index, improving crawl efficiency.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-900">Sitemap Generation</h4>
                <p className="text-sm leading-relaxed">
                  Automatically generate XML sitemaps to help search engines discover all pages efficiently.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-900">Meta Tags Optimization</h4>
                <p className="text-sm leading-relaxed">
                  Create compelling meta titles and descriptions that improve click-through rates.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-900">Technical SEO</h4>
                <p className="text-sm leading-relaxed">
                  Ensure proper canonical tags, structured data, and schema markup for better search understanding.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
